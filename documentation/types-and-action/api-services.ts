import axios from 'axios';

export function getBoardsListAPI() {
  return axios.get('http://localhost/api/bordlist')
    .then((res: any) => Promise.resolve(res.data));
}

export function getBoardDetailsAPI(boardId: String) {
  return axios.get(`http://localhost/api/borddetails/${boardId}`)
    .then((res: any) => Promise.resolve(res.data));
}

export function addBoardAPI() {
  return axios.post('url')
    .then((res: any) => Promise.resolve(res.data));
}

