'use strict';

module.exports = (srcPath, bundlePath) => {
  const B = require(srcPath + 'Broadcast');
  const Data = require(srcPath + 'Data');
const fs = require('fs');



  return {
    usage: 'blarp <blarped> <whatever>',
    command: (state) => (args, player) => {
      if (!args) {
        return B.sayAt(player, 'Need a valid character name.')
      }
    
      let foo = args.split(' ');

      let target = foo[0];
      target = target[0].toUpperCase() + target.slice(1);
      let msg = foo.splice(1)
      msg = msg.join()

      let findPlayer = state.PlayerManager.exists(target);

      if (!findPlayer) {
        return B.sayAt(player, 'That character does not exist.')
      }

      let targetF = Data.load('player', target);

      if (!targetF.metadata.messages) {
        targetF.metadata.messages = [];
      }

      targetF.metadata.messages.push(msg);
      Data.save('player', target, targetF, callBack())

      function callBack() {
          return B.sayAt(player, 'Sent message to ' + target + ': ' + msg);
      }

  }
 }
}
