'use strict';

module.exports = (srcPath) => {
  const Broadcast = require(srcPath + 'Broadcast');
  const Parser = require(srcPath + 'CommandParser').CommandParser;
  const Player = require(srcPath + 'Player');
  const EventUtil = require(srcPath + 'EventUtil');

  return {
    usage: 'describe me <message>',
    aliases: [':'],
    command: (state) => (args, player) => {
      args = args.trim();

      if (!args.length) {
        return Broadcast.sayAt(player, 'Enter a description');
      }
	  else {
		player.setMeta('description', args);
		player.save();
		return Broadcast.sayAt(player, `You changed your description: ${args}`);
	  }
    }
  };

};
