'use strict';

module.exports = (srcPath, bundlePath) => {
  const B = require(srcPath + 'Broadcast');
  const Data = require(srcPath + 'Data');
const fs = require('fs');



  return {
    usage: 'blarp <whatever>',
    command: (state) => (args, player) => {
      if (!args) {
        return B.sayAt(player, 'Need a valid character name.')
      }
      args = args.trim();
      args = args[0].toUpperCase() + args.slice(1);
    
      let findPlayer = state.PlayerManager.exists(args);

      if (!findPlayer) {
        return B.sayAt(player, 'That character does not exist.')
      }

      let accountName;
      state.AccountManager.accounts.forEach((account) => {
        for (const key in account.characters) {
          const val = account.characters[key];
          if (val.username == args) {
            accountName = account.username;
            return B.sayAt(player, "We got a match! Wah wooo! and the account username is" + account.username);
          }
        }
      });

      let actualAccount = state.AccountManager.getAccount(accountName);

      if (!actualAccount) {
        B.sayAt(player,'whattt')
      }

      let target = args;
      let targetF = Data.load('player', target);

      if (!targetF.metadata.messages) {
        targetF.metadata.messages = [];
      }

      targetF.metadata.messages.push('Hahahahaha this works!');
      Data.save('player', target, targetF, callBack())

      function callBack() {
          return B.sayAt(player, "Sent message.");
      }

  }
 }
}
