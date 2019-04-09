module.exports = srcPath => {
  const B = require(srcPath + 'Broadcast');

  return {
    usage: 'map',
    command: state => (args, player) => {
      const room = player.room;
      if (!room || !room.coordinates) {
        return B.sayAt(player, "You can't see a map in this room.");
      }

      const coords = room.coordinates;

      function create2DArray(numRows, numColumns) {
        let array = new Array(numRows); 
        for(let i = 0; i < numColumns; i++) {
          array[i] = new Array(numColumns); 
        }
        return array; 
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

      xSize = 10; //size of map
      var map = create2DArray(xSize*2, xSize*2); //create array for the map

      //fill the entire map with whitespaces first
      for (var i=0; i<map.length; i++) {
        for (var j=0; j<map.length; j++) {
          map[i][j] = "   ";
        }
      }

      //now we add detail to the map
      for (var y = coords.y + size; y >= coords.y - size; y--) {
        for (var x = coords.x - xSize; x <= coords.x + xSize; x++) {
          if (x === coords.x && y === coords.y) {
            myX = (x - coords.x + xSize/2)*2;
            myY = (y - coords.y + xSize/2)*2;
            map[myY][myX] = "[+]";
          } 
          else if (room.area.getRoomAtCoordinates(x, y, coords.z)) 
          {
            myX = (x - coords.x + xSize/2)*2;
            myY = (y - coords.y + xSize/2)*2;
            let roomLoop = room.area.getRoomAtCoordinates(x, y, coords.z);

            roomLoop.exits.forEach(exit => { //add cool connections for all the exits
              switch (exit.direction) {
                case "south": map[myY-1][myX] = " | "; break;
                case "north": map[myY+1][myX] = " | "; break;
                case "east":  map[myY][myX+1] = "---"; break;
                case "west":  map[myY][myX-1] = "---"; break;
                case "northwest":  map[myY+1][myX-1] = " \ "; break;
                case "northeast":  map[myY+1][myX+1] = " / "; break;
                case "southwest":  map[myY-1][myX-1] = " / "; break;
                case "southeast":  map[myY-1][myX+1] = " \ "; break;
              }
            });

            const hasUp = room.area.getRoomAtCoordinates(x, y, coords.z + 1);
            const hasDown = room.area.getRoomAtCoordinates(x, y, coords.z - 1);
            if (hasUp && hasDown) {
              //map[x - coords.x + xSize-1][y - coords.y + size-1]  = '%';
            } else if (hasUp) {
              //map[x - coords.x + xSize-1][y - coords.y + size-1]  = '<';
            } else if (hasDown) {
              //map[x - coords.x + xSize-1][y - coords.y + size-1] = '>';
            } else {
              map[myY][myX] = "[ ]";
            }
          }
        }
      }

      //Make a nice looking string out of that whole mess
      let count = 0;
      let stringbuilder = "";
      for (var y=map.length-1; y>0; y--) {
        for (var x=0; x<map.length; x++) {
          count++;
          stringbuilder += map[y][x];
          if (count>=xSize*2) {
            count=0;
            stringbuilder+='\r\n';
          }
      }
    }
    //spit it out at the player
    B.sayAt(player, stringbuilder); 
    }
  };
};