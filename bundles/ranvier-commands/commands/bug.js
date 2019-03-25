'use strict';

module.exports = srcPath => {
  const B = require(srcPath + 'Broadcast');
  const Data = require(srcPath + 'Data');
  const fs = require('fs');

  return {
    usage: 'bug <description>',
    aliases: ['typo', 'suggestion'],
    command: state => (args, player, arg0) => {
      //if (!args) {
        //return Broadcast.sayAt(player, '<b><yellow>Please describe the bug you have found.</yellow></b>');
      //}

      /*
      player.emit('bugReport', {
        description: args,
        type: arg0
      });
      */

    if (!args) {
      return B.sayAt(player, 'Please describe the bug in details, which should include how to recreate it.');
    }

  

     const bugFile = srcPath + '../log/bugs.json';
     const bugList = Data.parseFile(bugFile);

     let id = bugList.length + 1;

     let reportedBug = { 'id': id, 'player':player.name, 'description': args}


     bugList.push(reportedBug);
     Data.saveFile(bugFile, bugList);
     B.sayAt(player, 'Thank you. Your bug has been submitted.');

      

      //.sayAt(player, `<b>Your ${arg0} report has been submitted as:</b>\n${args}`);
      //.sayAt(player, '<b>Thanks!</b>');
    }
  };
};