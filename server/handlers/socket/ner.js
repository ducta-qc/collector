const NERInterface = require('../../database/ner-interface');
var io = global.io;

module.exports = {
  setup: function (socket){
    // handler import untagged sentence
    socket.on('recv_untagged_sentence', function (untaggedSens){
      //console.log(untaggedSens);
      NERInterface.importUntaggedSen(
        {untaggedSens: untaggedSens},
        function (err, results){
          socket.emit(
            'confirm_recv_untagged_sentence', 
            {error: err, info: results, length: untaggedSens.length});
        });
    });
  }
};