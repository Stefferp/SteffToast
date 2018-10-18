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

      // actualAccount = state.AccountManager.loadAccount(accountName, false);
      //let target = state.PlayerManager.loadPlayer(state,actualAccount,args,false);
      
      let target = Data.load('player', args);

      B.sayAt(player, target.name);

      let money = target.metadata.description;
      //let money = target.getMeta('description')
      //let money = target.getMeta('currencies.gold') || 0;

      B.sayAt(player, 'why wont yo work?')
      B.sayAt(player, 'Money is ' + money);

      //target.setMeta('description', 'I\'m a fattypatty.');
      target.metadata.description = 'fatty patty'
      B.sayAt(player, target.metadata.description);

      //let myFunc = function() {return;}
      //Data.saveFile(target.name + '.json', target.serialize(), myFunc);
      //fs.writeFileSync(target.getDataFilePath('player', target.name), JSON.stringify(target, null, 2), 'utf8');
      Data.save('player',target.name, JSON.stringify(target, null, 2,), 'nah')
      B.sayAt(player, target.metadata.description);



  }
 }
}
