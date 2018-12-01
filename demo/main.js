const dungeoneer = require('../lib/generator')
const packageJSON = require('../package')

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

ctx.imageSmoothingEnabled = false

var create = function(width, height) {
  var cellSize = 4;
  var dungeon = dungeoneer.generate({
    width: width,
    height: height
  })

  canvas.width = width * cellSize
  canvas.height = height * cellSize

  canvas.style.width = width * cellSize + 'px'
  canvas.style.height = height * cellSize + 'px'

  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  ctx.fillStyle = 'red'

  dungeon.rooms.forEach((room) => {
    ctx.fillStyle = 'red'
    ctx.fillRect(room.x * cellSize, room.y * cellSize, room.width * cellSize, room.height * cellSize)
  })

  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
  for (var i = 0; i < dungeon.tiles.length; i++) {
    for (var j = 0; j < dungeon.tiles.length; j++) {
      if (dungeon.tiles[i][j].type === 'floor') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
      }
      if (dungeon.tiles[i][j].type === 'door') {
        ctx.fillStyle = 'yellow'
        ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
      }
    }
  }
}

document.querySelector('#dice-svg svg').addEventListener('mousedown', function () {
  document.querySelector('#dice-svg svg').classList.add('mousedown')
  console.log('mousedown')
}, false)

document.querySelector('#dice-svg svg').addEventListener('mouseup', function () {
  document.querySelector('#dice-svg svg').classList.remove('mousedown')
  create(51, 51)
}, false)

create(51, 51)

const $version = document.createElement('div')
$version.innerText = `v${packageJSON.version}`
$version.style = `
  color: white;
  position: absolute;
  bottom: 16px;
  left: 16px;
  font-family: monospace;
`
document.body.appendChild($version)