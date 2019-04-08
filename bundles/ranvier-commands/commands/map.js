module.exports = srcPath => {
  const B = require(srcPath + 'Broadcast');

  return {
    usage: 'map',
    command: state => (args, player) => {
      const playerRoom = player.room;
      if (!playerRoom || !playerRoom.coordinates) {
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

      const coords = playerRoom.coordinates;
      
      let roomExits;
      let testTest = [];
      let here = false;
      let draw = ''; 
      let final = '';
      let north; 
      let south; 
      let east; 
      let west;

      let map = [xSize, xSize];

      for (var i = 0; i < xSize; i++){
        for (var j = 0; j<xSize; j++) {
          map[i, j] = "   ";
          var woom = room.area.getRoomAtCoordinates(i, j, coords.z);
          if (room) {
              map[i*2, j*2] = "[ ]";
              if (room.exits.south) { 
                map[i*2, j*2+1] = " | ";
              }
              if (room.exits.north) { 
                map[i*2, j*2-1] = " | ";
              }
              if (room.exits.east) { 
                map[i*2+1, j*2] = " - ";
              }
              if (room.exits.west) { 
                map[i*2-1, j*2] = " - ";
              }
          }
        }
      }
      B.sayAt(player, map.toString);
      /*

      for (var y = coords.y + size; y >= coords.y - size; y--) {
        //map += '';
        for (var x = coords.x - xSize; x <= coords.x + xSize; x++) {
          room = room.area.getRoomAtCoordinates(x, y, coords.z);
          if (room) {
            woom.push(room);
            roomExits = room.exits;
            roomExits.forEach(exit => {
              testTest.push(exit.direction);
            })
          }

          if (x === coords.x && y === coords.y) {
            here = true;
            //map += '[+]'
          }
          else {
            if (room) {
              here = false;
              //map += '[ ]'
            }
            else {
              map += '   ';
              draw += '   ';
              //return;
            }
          }
          
          if (room) {
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

                  map[x, y] = " \ "
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
          } 
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
      */
     
    }
  };
};