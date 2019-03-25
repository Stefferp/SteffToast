module.exports = srcPath => {
  const B = require(srcPath + 'Broadcast');

  return {
    usage: 'map',
    command: state => (args, player) => {
      const room = player.room;
      if (!room || !room.coordinates) {
        return B.sayAt(player, "You can't see a map in this room.");
      }

      let size = parseInt(args, 10);
      // always make size an even number so the player is centered
      size = isNaN(size) ? 4 : size - (size % 2);
      // monospace fonts, eh?
      let xSize = Math.ceil(size * 2);
      xSize = Math.max(2, xSize - (xSize % 2));

      if (!size || size > 14) {
        size = 1;
      }

      function oddOrEven(num) {
        num = Math.abs(num);
        return (num & 1) ? "odd" : "even";
      }

      const coords = room.coordinates;
      let map = ''//'.' + ('-'.repeat(xSize * 2 + 1)) + '.\r\n';
      let woom = []; let test;
      let testExits; let testTest = []; let here = false;
      let draw = ''; let final = '';
      let north; let south; let east; let west;

      for (var y = coords.y + size; y >= coords.y - size; y--) {
        //map += '';
        for (var x = coords.x - xSize; x <= coords.x + xSize; x++) {
          test = room.area.getRoomAtCoordinates(x, y, coords.z);
          if (test) {
            woom.push(test);
            testExits = test.exits;
            testExits.forEach(exit => {
              testTest.push(exit.direction);
            })
          }

          if (x === coords.x && y === coords.y) {
            here = true;
            //map += '[+]'
          }
          else {
            if (test) {
              here = false;
              //map += '[ ]'
            }
            else {
              map += '   ';
              draw += '   ';
              //return;
            }
          }
          
          if (test) {
          if (testTest.includes('north')) {
            north = true;
          }
          if (testTest.includes('south')) {
            south = true;
          }
          if (testTest.includes('east')) {
            east = true;
          }
          if (testTest.includes('west')) {
            west = true;
          }

          if (south || east || north || west) {
            
            if (south && east) {
              //map = map.slice(3);
              if (here) { map += '[+] - '} 
             else { map += '[ ] k '};
              draw += ' : ';
              
              //south = false;
              //east = false;
              tesTest = [];
            }
            else if (east || west) {
              if (east) {
                if (here) {
                  map += '[+] e ';
                }
                else {
                  map += '[ ] e ';
                }
              east = false;
              testTest = [];
              }
            
             if (west) {
                if (here) { map += '[+]'} else {
                  map += '[ ]'
              }
              //map += '[ ]';
              west = false;
              testTest = [];
            }
            }
            else if (south) {
              if (here) { map += '   [+]   '} 
              else { map += '   [ ]   '};
              draw += '    s    '; 
              south = false;
            }
            else if (north) {
              draw += '    |    ';
              if (here) { map += '   [+]   '} 
              else { map += '   [ ]   '};
              //draw += '    s    '; 
              north = false;
            }
            
            south = false;
            east = false;
            west = false;
            north = false;

          }
        }
          /*
          if (x === coords.x && y === coords.y) {
            map += '[+]';
          } else if (room.area.getRoomAtCoordinates(x, y, coords.z)) {
            const hasUp = room.area.getRoomAtCoordinates(x, y, coords.z + 1);
            const hasDown = room.area.getRoomAtCoordinates(x, y, coords.z - 1);
            if (hasUp && hasDown) {
              map += '%';
            } else if (hasUp) {
              map += '<';
            } else if (hasDown) {
              map += '>';
            } 
            else {
              map += '[ ]';
            }
          } else {
            map += ' <blue>~</blue> ';
          } */
        }
        map += '\r\n';
        if (draw != '') {
        draw += '\r\n';
        }
        if (draw.includes('|')) {
          final += draw + map;
        }else {
          draw = draw.replace('s', '|')
          final += map + draw;
        }
        map = ''; draw = '';
        testTest = [];
        south = false;
        east = false;
        west = false;
        north = false;
      }

      //map += "'" + ('-'.repeat(xSize * 2 + 1)) + "'";

      B.sayAt(player, final);
      woom.forEach( room => {
        B.sayAt(player, `ID: ${room.id} | Title: ${room.title}`);
      })

    }
  };
};
