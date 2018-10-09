'use strict';

const LevelUtil = require('../../ranvier-lib/lib/LevelUtil');

module.exports = srcPath => {
  const QuestReward = require(srcPath + 'QuestReward');
  const Broadcast = require(srcPath + 'Broadcast');
  /**
   * Quest reward that gives experience
   *
   * Config options:
   *   amount: number, default: 0, Either a static amount or a multipler to use for leveledTo
   *   leveledTo: "PLAYER"|"QUEST", default: null, If set scale the amount to either the quest's or player's level
   *
   * Examples:
   *
   *   Gives equivalent to 5 times mob xp for a mob of the quests level
   *     amount: 5
   *     leveledTo: quest
   *
   *   Gives a static 500 xp
   *     amount: 500
   */
  return class ItemReward extends QuestReward {

    static reward(GameState, quest, config, player) {
      const item = this.getItem(GameState, config);
      item.hydrate(GameState);
      player.addItem(item);
      Broadcast.sayAt(player, `You got ${item.name}`);
      item.emit('get', player);
      player.emit('get', item);
    }

    static display(GameState, quest, config, player) {
      return this.getItem(GameState, config).name;
    }

    static getItem(GameState, config) {
      let area = GameState.AreaManager.getAreaByReference(config.item.split(':')[0]);
      let item = GameState.ItemFactory.create( area, config.item );
      return item;
    }

  };
};