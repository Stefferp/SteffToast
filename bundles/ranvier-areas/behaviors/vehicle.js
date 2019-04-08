'use strict';


module.exports = (srcPath) => {
  const Logger = require(srcPath + 'Logger');
  return  {
    listeners: {
      spawn: state => function () {
        Logger.log(`${this.name} spawned into room ${this.room.title}`);
      },

      playerEnter: state => function (player) {
        B.sayAt(player, 'wow! You have entered the vehicle.');
      },

      playerLeave: state => function (target, destination) {
        Logger.log(`${target.name} left ${this.room.title} towards ${destination.title}`);
      },
      
    }
  };
};
