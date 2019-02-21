import axios from 'axios';
import { BoardItem } from './types';

export function getBoardsListAPI() {
  console.log('api call getBoardsListAPI----------------');
  return axios.get('http://localhost:3000/boards')
    .then((res: any) => Promise.resolve(res.data));
}

export function getBoardDetailsAPI(boardId: String) {
  console.log('in api-----------------------------boardId-', boardId);
  return axios.get(`http://localhost:3000/boards/${boardId}`)
    .then((res: any) => {
      console.log('iiiiiiiii--------------------------');
      Promise.resolve(res.data)
    });
}

export function addBoardAPI(boardItem: BoardItem) {
  return axios.post('url')
    .then((res: any) => {
      console.log('addBoardAPI before response');
      Promise.resolve(res.data)
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

export function addMemberToBoardAPI(dummy: String) {

}

export function removeMemberToBoardAPI(dummy: String) {

}
