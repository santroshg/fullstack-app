import axios from 'axios';
import socketIOClient from 'socket.io-client';
import { ObjectID } from 'bson';

import { BoardItem, User, PulseItem } from './types';
import { backtendHost } from '../constants/constants'
import { setEditBoardAction } from './actions';


export function getBoardsListAPI(userId: String) {
  return axios.get(`${backtendHost}/api/boards/?userId=${userId}`, {withCredentials: true})
    .then((res: any) => {
      // return res.data.map((d: any) => {
      //   return {
      //     boardId: d._id,
      //     boardName: d.boardName,
      //     boardDesc: d.boardDesc,
      //   };
      // });
      return Promise.resolve(res.data)
    });
}

export function getBoardDetailsAPI(boardId: String) {
  return axios.get(`${backtendHost}/api/boards/${boardId}`, {withCredentials: true})
    .then((res: any) => {
      // res.data.boardId = res.data._id;
      return Promise.resolve(res.data);
    });
}

export function addBoardAPI(action: any) {
  const boardId  = new ObjectID();
  const loggedinUser: User = {
    userId: action.loggedinUser.userId,
    userDisplayName: action.loggedinUser.userDisplayName,
    userEmail: action.loggedinUser.userEmail,
    userActive: true,
  }
  const notNeededBoardObject: BoardItem = {
    boardId: boardId.toString(),
    boardName: action.newBoard.boardName,
    boardDesc: action.newBoard.boardDesc
  }
  return axios.post(`${backtendHost}/api/boards`, {notNeededBoardObject, loggedinUser}, {withCredentials: true})
    .then((res: any) => {
      // res.data.boardId = res.data._id;
      return Promise.resolve(res.data);
    });
}

// const socket = socketIOClient(backtendHost);
export function editBoardAPI(action: any) {
  // socket.emit('updateBoard', action);
  return axios.put(`${backtendHost}/api/boards/${action.boardId}`, {board: action}, {withCredentials: true})
    .then((res: any) => {
      // res.data.boardId = res.data._id;
      return Promise.resolve(res.data);
    });
}

// const socket = socketIOClient(backtendHost);
// export function editBoardAPI(action: any) {
//   // console.log('action.payload-------------', action);
//   socket.emit('updateBoard', action);
// }



export function deleteBoardAPI(boardId: String) {
  return axios.delete(`${backtendHost}/api/boards/${boardId}`, {withCredentials: true})
  .then((res: any) => {
    return Promise.resolve(res.data.deletedBoardId);
  });
}

export function addColumnAPI(action: any) {
  // const headerId  = (new ObjectID()).toString();
  action.progressHeader.headerId = (new ObjectID()).toString();
  action.progressHeader.headerColumnId = (new ObjectID()).toString();
  return axios.post(`${backtendHost}/api/headers/${action.boardId}`, action.progressHeader, {withCredentials: true})
  .then((res: any) => {
    // res.data.boardId = res.data._id;
    return Promise.resolve(res.data);
  });
}

export function editColumnAPI(action: any) {
  return axios.put(`${backtendHost}/api/headers/${action.boardId}/${action.headerId}`, {headerTxt: action.headerTxt})
    .then((res: any) => {
      // res.data.boardId = res.data._id;
      return Promise.resolve(res.data);
    });
}

export function deleteColumnAPI(action: any) {
  return axios.delete(`${backtendHost}/api/headers/${action.boardId}/${action.headerId}/${action.headerColumnId}`, {withCredentials: true})
    .then((res: any) => {
      return Promise.resolve(res.data);
    });
}

export function addPulseAPI(action: any) {
  const pulseId  = (new ObjectID()).toString();
  action.pulse.pulseId = pulseId;
  action.pulse.headerColumnId = (new ObjectID()).toString();
  action.pulse.headerId = (new ObjectID()).toString();
  return axios.post(`${backtendHost}/api/pulse/${action.boardId}`, action.pulse, {withCredentials: true})
  .then((res: any) => {
      // res.data.boardId = res.data._id;
      return Promise.resolve(res.data);
    });
}

export function editPulseAPI(action: any) {
  return axios.put(`${backtendHost}/api/pulse/${action.boardId}/${action.pulseId}`, {pulseTxt: action.pulseTxt})
    .then((res: any) => {
      // res.data.boardId = res.data._id;
      return Promise.resolve(res.data);
    });
}

export function deletePulseAPI(action: any) {
  return axios.delete(`${backtendHost}/api/pulse/${action.boardId}/${action.pulseId}`, {withCredentials: true})
    .then((res: any) => {
      return Promise.resolve(res.data);
    });
}

export function editCellAPI(action: any) {
  return axios.put(`${backtendHost}/api/labels/${action.boardId}/${action.pulseId}/${action.cellId}`, action.cell, {withCredentials: true})
    .then((res: any) => {
     // res.data.boardId = res.data._id;
      return Promise.resolve(res.data);
    });
}

export function addNewLabelAPI(action: any) {
  action.label.labelId = (new ObjectID()).toString();
  return axios.post(`${backtendHost}/api/labels/${action.boardId}/${action.pulseId}/${action.cellId}`, action.label, {withCredentials: true})
    .then((res: any) => {
      res.data.boardId = res.data._id;
      return Promise.resolve(res.data);
    });
}

export function editLabelAPI(action: any) {
  return axios.put(`${backtendHost}/api/labels/${action.boardId}/${action.pulseId}/${action.cellId}/${action.labelId}`, action.label, {withCredentials: true})
    .then((res: any) => {
      res.data.boardId = res.data._id;
      return Promise.resolve(res.data);
    });
}

export function deleteLabelAPI(action: any) {
  return axios.delete(`${backtendHost}/api/labels/${action.boardId}/${action.pulseId}/${action.cellId}/${action.labelId}`, {withCredentials: true})
    .then((res: any) => {
      res.data.boardId = res.data._id;
      return Promise.resolve(res.data);
    });
}

export function addMemberToBoardAPI(action: any) {
  const newUser: User = {
    userId: action.user.userId,
    userDisplayName: action.user.userDisplayName,
    userEmail: action.user.userEmail,
    userActive: false,
  }

  return axios.post(`${backtendHost}/api/members/${action.boardId}`, newUser, {withCredentials: true})
    .then((res: any) => {
      return Promise.resolve(res.data);
    });
}

export function removeMemberToBoardAPI(payload: any) {
  return axios.delete(`${backtendHost}/api/members/${payload.boardId}/${payload.userId}`, {withCredentials: true})
    .then((res: any) => {
      return Promise.resolve(res.data);
    });
}

export function getLoggedinUserAPI() {
  return axios.get(`${backtendHost}/users/api/current_user`, {withCredentials: true})
    .then((res: any) => {
      return Promise.resolve(res.data);
    });
}
