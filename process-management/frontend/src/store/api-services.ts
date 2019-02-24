import axios from 'axios';
import { BoardItem, User } from './types';

export function getBoardsListAPI() {
  // console.log('api call getBoardsListAPI----------------');
  return axios.get('http://localhost:3000/boardList')
    .then((res: any) => {
      // console.log('res------------------', res.data);
      return Promise.resolve(res.data)
      // return res.data;
    });
}

export function getBoardDetailsAPI(boardId: String) {
  return axios.get('http://localhost:3000/currentBoard')
    .then((res: any) => {
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
  return axios.post('http://localhost:3000/boardList', notNeededBoardObject)
    .then((res: any) => {
      console.log('addBoardAPI before response');
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
    userId: 'asad',
    userDisplayName: 'String',
    userEmail: 'String',
    userActive: false,
  }

  return axios.post('http://localhost:3000/members', newUser)
    .then((res: any) => {
      console.log('addBoardAPI before response--------', res.data);
      return Promise.resolve(res.data);
    });
}

export function removeMemberToBoardAPI(payload: any) {
  console.log('removeMemberToBoardAPI---', payload);
  return axios.delete('http://localhost:3000/members', payload)
    .then((res: any) => {
      console.log('removeMemberToBoardAPI before response--------', res.data);
      return Promise.resolve(res.data);
    });
}
