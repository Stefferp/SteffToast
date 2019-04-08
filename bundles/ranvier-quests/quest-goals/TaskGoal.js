'use strict';

module.exports = srcPath => {
  const QuestGoal = require(srcPath + 'QuestGoal');
  /**
   * A quest goal requiring the player picks up a certain number of a particular item
   */
  return class TaskGoal extends QuestGoal {
    constructor(quest, config, player) {
      config = Object.assign({
        title: 'Do A Task',
        npc: null,
        task: null,
        count: 1
      }, config);

      super(quest, config, player);

      this.state = {
        count: 0
      };

      this.on('task', this._getTask);
    }

    getProgress() {
      const amount = Math.min(this.config.count, this.state.count);
      const percent = (amount / this.config.count) * 100;
      const display = `${this.config.title}: [${amount}/${this.config.count}]`;
      return { percent, display };
    }

    complete() {
      if (this.state.count >= this.config.count) {
        return;
      }
      super.complete();
    }

    _getTask(task) {
      if (task !== this.config.task) {
        return;
      }

      this.state.count = (this.state.count || 0) + 1;

      if (this.state.count > this.config.count) {
        return;
      }

      this.emit('progress', this.getProgress());
    }

  
  };
};
