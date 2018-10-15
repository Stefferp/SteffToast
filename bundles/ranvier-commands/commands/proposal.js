'use strict';

module.exports = (srcPath) => {
  const Broadcast = require(srcPath + 'Broadcast');
  const Parser = require(srcPath + 'CommandParser').CommandParser;
  const Player = require(srcPath + 'Player');
  const EventUtil = require(srcPath + 'EventUtil');
  const { CommandParser } = require(srcPath + 'CommandParser');
  const dot = CommandParser.parseDot;

  return {
    usage: 'proposal <answer>',
    aliases: [':'],
    command: (state) => (args, player) => {
      args = args.trim();
      if (player.proprosed) {
        if (args == 'yes') {
          Broadcast.sayAt(player, "u married now");
          Broadcast.sayAt(player.proposed, "they said yes");
        }
        else {
          Broadcast.sayAt(player.proposed, "they dont want u cuz ur a total fattypatty");
        }
      }
    }
  };
};