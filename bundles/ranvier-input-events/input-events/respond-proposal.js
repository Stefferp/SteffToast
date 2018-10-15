'use strict';

/**
 * Player creation event
 */
module.exports = (srcPath) => {
  const EventUtil = require(srcPath + 'EventUtil');
  const CommonFunctions = require('../lib/CommonFunctions');

  return {
    event : (state) => (socket, args) => {
      const say    = EventUtil.genSay(socket);
      const write  = EventUtil.genWrite(socket);

	  write("<bold>Say something about your character</bold> ");
      socket.once('data', description => {
        say('');
        description = description.toString().trim();
        args.description = description;
		    return socket.emit('choose-class', socket, args);
      });
    }
  };
};
