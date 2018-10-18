'use strict';

module.exports = (srcPath) => {
  const Broadcast = require(srcPath + 'Broadcast');
  const Parser = require(srcPath + 'CommandParser').CommandParser;
  const Player = require(srcPath + 'Player');
  const EventUtil = require(srcPath + 'EventUtil');
  const Data = require(srcPath + 'Data');
  const Account = require(srcPath + 'Account');

  return {
    usage: 'message <message> <player>',
    aliases: [':'],
    command: (state) => (args, player) => {
      args = args.trim();

      if (!args.length) {
        return Broadcast.sayAt(player, 'Enter a message');
      }

      let targetName    = args.split(' ')[0];
      let targetMessage = args.split(' ')[1];

      if (Data.exists('player', targetName)) {
        let targetPlayer = state.PlayerManager.loadPlayer(state, new Account({username: targetName}), targetName, false);
        targetPlayer.setMeta('messages', targetMessage);
        targetPlayer.save();
        Broadcast.sayAt(player, 'Sent a message to ' + targetPlayer.name);
      }
      else { 
        return Broadcast.sayAt(player, "That person could not be found");
      }
    }
  };
};
