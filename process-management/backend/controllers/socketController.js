/* eslint-disable no-underscore-dangle */
const BoardModel = require('../models/boardModel');

exports.socketIo = (io) => {
  io.sockets.on('connection', (socket) => {
    socket.on('updateBoard', (data) => {
      try {
        const { boardId } = data;
        if (boardId) {
          BoardModel.findOneAndUpdate({ boardId },
            {
              $set: {
                boardName: data.boardName,
                boardDesc: data.boardDesc,
              },
            }, { new: true }, (err, updatedBoard) => {
              if (err) {
                throw err;
              } else {
                io.emit('updatedSuccess', {
                  boardId: updatedBoard.boardId,
                  boardName: updatedBoard.boardName,
                  boardDesc: updatedBoard.boardDesc,
                });
              }
            });
        }
      } catch (error) {
        io.emit('serverError', error);
      }
    });
  });
};
