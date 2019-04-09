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

      const coords = room.coordinates;
     //let map = ''//'.' + ('-'.repeat(xSize * 2 + 1)) + '.\r\n';

      function create2DArray(numRows, numColumns) {
        let array = new Array(numRows); 
        for(let i = 0; i < numColumns; i++) {
          array[i] = new Array(numColumns); 
        }
        return array; 
      }
      xSize = 10;
      var map = create2DArray(xSize, xSize); 

      for (var i=0; i<map.length; i++) {
        for (var j=0; j<map.length; j++) {
          map[i][j] = "   ";
      }
    }

      for (var y = coords.y + size; y >= coords.y - size; y--) {
        for (var x = coords.x - xSize; x <= coords.x + xSize; x++) {
          if (x === coords.x && y === coords.y) {
            let xx = x - coords.x + xSize/2;
            let yy = y - coords.y + xSize/2;
            console.log("x: "+xx+". y:"+yy);

            map[y - coords.y + xSize/2][x - coords.x + xSize/2] = "[+]";

          } else if (room.area.getRoomAtCoordinates(x, y, coords.z)) {
            const hasUp = room.area.getRoomAtCoordinates(x, y, coords.z + 1);
            const hasDown = room.area.getRoomAtCoordinates(x, y, coords.z - 1);
            if (hasUp && hasDown) {
              //map[x - coords.x + xSize-1][y - coords.y + size-1]  = '%';
            } else if (hasUp) {
              //map[x - coords.x + xSize-1][y - coords.y + size-1]  = '<';
            } else if (hasDown) {
              //map[x - coords.x + xSize-1][y - coords.y + size-1] = '>';
            } else {
              map[y - coords.y + xSize/2][x - coords.x + xSize/2] = "[ ]";
            }
          } else {
            //map += '   ';
            //map[x - coords.x + xSize-1][y - coords.y + size-1] = '';
          }
        }

        //map += '\r\n';
      }

      //map += "'" + ('-'.repeat(xSize * 2 + 1)) + "'";

      //B.sayAt(player, map);
      //B.sayAt(player, map.toString());
      let count = 0;
      let stringbuilder = "";
      for (var y=map.length-1; y>0; y--) {
        for (var x=0; x<map.length; x++) {
          count++;
          console.log(x);
          console.log(y);
          stringbuilder += map[y][x];
          if (count>=xSize) {
            count=0;
            stringbuilder+='\r\n';
          }
      }
    }
    
    B.sayAt(player, stringbuilder);

    }
  };
};