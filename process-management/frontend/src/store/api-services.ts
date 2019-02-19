import axios from 'axios';

export function getBoardsListAPI() {
  return axios.get('http://localhost:3000/boardlist')
    .then((res: any) => Promise.resolve(res.data));
}

export function getBoardDetailsAPI(boardId: String) {
  console.log('in api-----------------------------boardId-', boardId);
  return axios.get(`http://localhost:3000/currentBoard?boardId=${boardId}`)
    .then((res: any) => {
      console.log('iiiiiiiii--------------------------');
      Promise.resolve(res.data)
    });
}

export function addBoardAPI() {
  return axios.post('url')
    .then((res: any) => Promise.resolve(res.data));
}

export function editBoardAPI() {

}

export function deleteBoardAPI() {

}

export function addColumnAPI() {

}

export function deleteColumnAPI() {

}

export function addPulseAPI() {

}

export function editPulseAPI() {

}

export function deletePulseAPI() {

}

export function editCellAPI() {

}

export function addNewLabelAPI() {

}

export function editLabelAPI() {

}

export function deleteLabelAPI() {

}

export function addMemberToBoardAPI() {

}

export function removeMemberToBoardAPI() {

}
