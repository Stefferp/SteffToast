'use strict';

module.exports = (srcPath) => {
  const Broadcast = require(srcPath + 'Broadcast');
  const Parser = require(srcPath + 'CommandParser').CommandParser;
  const Player = require(srcPath + 'Player');
  const EventUtil = require(srcPath + 'EventUtil');
  const { CommandParser } = require(srcPath + 'CommandParser');
  const dot = CommandParser.parseDot;

  return {
    usage: 'propose <victim>',
    aliases: [':'],
    command: (state) => (args, player) => {
      args = args.trim();
      
      if (!args.length) return Broadcast.sayAt(player, 'Who will be the victim tho? (and is she THICC?)');
      
      let victim = dot(args, player.room.players);
      if (!victim) return Broadcast.sayAt(player,'they aint there');

      Broadcast.sayAt(player, 'You attempt to ensnare your victim with a wedding ring');
      victim.emit('proposed', player);
    }
  };
};