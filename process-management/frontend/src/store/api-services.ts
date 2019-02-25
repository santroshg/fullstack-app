import axios from 'axios';
import { BoardItem, User } from './types';

export function getBoardsListAPI() {
  // console.log('api call getBoardsListAPI----------------');
  return axios.get('http://localhost:3000/api/boards')
    .then((res: any) => {
      // console.log('res------------------', res.data);
      return res.data.map((d: any) => {
        return {
          boardId: d._id,
          boardName: d.boardName,
          boardDesc: d.boardDesc,
        };
      });
      // return Promise.resolve(res.data)
    });
}

export function getBoardDetailsAPI(boardId: String) {
  return axios.get(`http://localhost:3000/api/boards/${boardId}`)
    .then((res: any) => {
      res.data.boardId = res.data._id;
      return Promise.resolve(res.data);
    });
}

export function addBoardAPI(boardItem: BoardItem) {
  const notNeededBoardObject: BoardItem = {
    boardId: Math.random() * 23456 + '',
    boardName: boardItem.boardName,
    boardDesc: boardItem.boardDesc
  }
  console.log('boardItem---starting saving-----', notNeededBoardObject);
  return axios.post('http://localhost:3000/api/boards', notNeededBoardObject)
    .then((res: any) => {
      console.log('addBoardAPI before response---', res.data);
      res.data.boardId = res.data._id;
      return Promise.resolve(res.data);
    });
}

export function editBoardAPI(dummy: String) {

}

export function deleteBoardAPI(dummy: String) {

}

export function addColumnAPI(dummy: String) {

}

export function editColumnAPI(dummy: String) {
  
}

export function deleteColumnAPI(dummy: String) {

}

export function addPulseAPI(dummy: String) {

}

export function editPulseAPI(dummy: String) {

}

export function deletePulseAPI(dummy: String) {

}

export function editCellAPI(dummy: String) {

}

export function addNewLabelAPI(dummy: String) {

}

export function editLabelAPI(dummy: String) {

}

export function deleteLabelAPI(dummy: String) {

}

export function addMemberToBoardAPI(action: any) {
  console.log('------------boardId---', action.user);
  const newUser: User = {
    userId: action.user.userId,
    userDisplayName: action.user.userDisplayName,
    userEmail: action.user.userEmail,
    userActive: false,
  }

  return axios.post(`http://localhost:3000/api/members/${action.boardId}`, newUser)
    .then((res: any) => {
      console.log('addBoardAPI before response--------', res.data);
      return Promise.resolve(res.data);
    });
}

export function removeMemberToBoardAPI(payload: any) {
  console.log('removeMemberToBoardAPI---', payload);
  return axios.delete(`http://localhost:3000/api/members/${payload.boardId}/${payload.userId}`)
    .then((res: any) => {
      console.log('removeMemberToBoardAPI before response--------', res.data);
      return Promise.resolve(res.data);
    });
}
