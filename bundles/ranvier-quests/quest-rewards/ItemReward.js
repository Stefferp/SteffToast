'use strict';

const LevelUtil = require('../../ranvier-lib/lib/LevelUtil');
const ItemUtil = require('../../ranvier-lib/lib/ItemUtil');

module.exports = srcPath => {
  const QuestReward = require(srcPath + 'QuestReward');
  const Broadcast = require(srcPath + 'Broadcast');
  /**
   * Quest reward that gives an item
   *
   * Config options:
   *     item: the item that will be awared upon quest completion
   *   amount: number, the amount of the item that will be given, default is always 1 
   * 
   * Examples:
   *
   *   Gives 2x the item limbo:9
   *     item: 'limbo:9'
   *     amount: 2
   *
   */
  return class ItemReward extends QuestReward {

    static reward(GameState, quest, config, player) {

      const amount = this._getAmount(quest, config, player);
    
      
      let i;
      for (i = 0; i < amount; i++){
        let item = this.getItem(GameState, config);
        item.hydrate(GameState);
        player.addItem(item);
        item.emit('get', player);
        item.emit('get', item);
        Broadcast.sayAt(player, i + '. beep');
      }

      if (amount > 1 ) {
        Broadcast.sayAt(player, `<white><b>You received</b></white> <red>${amount}</red> ${ItemUtil.display(item)}<white><b>!</b><white>`);
      }
      else {
        Broadcast.sayAt(player, `<white><b>You received</b></white> ${ItemUtil.display(item)}<white><b>!</b><white>`);
      }

    }

    static display(GameState, quest, config, player) {
      return config.amount + ' ' + this.getItem(GameState, config).name;
    }

    static getItem(GameState, config) {
      let area = GameState.AreaManager.getAreaByReference(config.item.split(':')[0]);
      let item = GameState.ItemFactory.create( area, config.item );
      return item;
    }

    static _getAmount(quest, config, player) {
      config = Object.assign({
        amount: 1,
      }, config);

      let amount = config.amount;
      return amount;
    }

  };
};