'use strict';

module.exports = (srcPath) => {
  const Broadcast = require(srcPath + 'Broadcast');
  const PlayerRoles = require(srcPath + 'PlayerRoles');

  return {
    aliases: ['trans'],
    usage: 'transport <player>',
    requiredRole: PlayerRoles.ADMIN,
    command: (state) => (args, player) => {
      if (!args || !args.length) {
        return Broadcast.sayAt(player, 'You must specify which player you want to transport to you.');
      }

      const target = args;
      const targetPlayer = state.PlayerManager.getPlayer(target);
        if (!targetPlayer) {
          return Broadcast.sayAt(player, 'No such player online.');
        } else if (targetPlayer === player || targetPlayer.room === player.room) {
          return Broadcast.sayAt(player, 'You try really hard to teleport before realizing you\'re already at your destination.');
        }

      if (player.isInCombat()) {
        player.removeFromCombat();
      }

      const oldRoom = targetPlayer.room;

      targetPlayer.moveTo(player.room, () => {
        Broadcast.sayAt(player, `<b><green>You snap your finger and instantly yank ${targetPlayer.name} here.`);
        state.CommandManager.get('look').execute('', player);
      });

      Broadcast.sayAt(oldRoom, `${targetPlayer.name} has been yanked away!`);
      state.CommandManager.get('look').execute('', targetPlayer);
      Broadcast.sayAtExcept(player.room, `You have been yanked here by ${player.name}.`, [player, player.room]);
      Broadcast.sayAtExcept(player.room, `${targetPlayer.name} has been yanked here.`, [targetPlayer, player]);
    }
  }
};