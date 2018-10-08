'use strict';

module.exports = (srcPath) => {
  const Broadcast = require(srcPath + 'Broadcast');
  const PlayerRoles = require(srcPath + 'PlayerRoles');

  return {
    requiredRole: PlayerRoles.ADMIN,
    usage: 'giveitem <item>',
    command: (state) => (args, player) => {

      if (!args) {
        return Broadcast.sayAt(player, 'What item do you want to create?');
      }

      let isValid = args.includes(":")

      if (!isValid) {
        return Broadcast.sayAt(player, "This is not a valid item to create. Include the semi colon. I.E. GIVEITEM LIMB0:1")
      }
      let [ area, ref] = string.split(':');
      const item = state.ItemFactory.create(area, ref);
      item.hydrate(state);
      player.addItem(item);
      Broadcast.sayAt(player, "Item: " + item + " has been added to your inventory.");

    }
  };
};
