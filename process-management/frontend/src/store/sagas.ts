import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { ProcessMgtActionType, BoardItem, Board } from './types';
import { getBoardsListAPI, getBoardDetailsAPI, addBoardAPI, editBoardAPI, deleteBoardAPI, addColumnAPI, deleteColumnAPI, addPulseAPI, editPulseAPI, deletePulseAPI, editCellAPI, addNewLabelAPI, editLabelAPI, deleteLabelAPI, addMemberToBoardAPI, removeMemberToBoardAPI, editColumnAPI, getLoggedinUserAPI } from './api-services';
import { setBoardsListAction, setBoardDetailsAction, addBoardAction, editBoardAction,
    deleteBoardAction, addColumnAction, deleteColumnAction, addPulseAction,
    deletePulseAction, editCellAction, addNewLabelAction, editLabelAction, 
    deleteLabelAction, editPulseAction, addMemberToBoardAction, 
    removeMemberToBoardAction, editColumnAction, setAddBoardAction, 
    setAddMemberToBoardAction, setRemoveMemberToBoardAction, setAddPulseAction, setLoggedinUserAction, setDeletePulseAction, setEditPulseAction, setEditCellAction, setAddNewLabelAction, setEditLabelAction, setDeleteLabelAction, setDeleteColumnAction, setEditColumnAction, setAddColumnAction, setDeleteBoardAction, setEditBoardAction } from './actions';

export function* getBoardsList(action: AnyAction) {
  const boardList: BoardItem[] = yield call(getBoardsListAPI);
  // console.log('boardList---------',  boardList);
  yield put(setBoardsListAction(boardList));
}

export function* getBoardDetails(action: AnyAction) {
  // console.log('getBoardDetails in saga---------', action.payload);
  const currentBoard: Board = yield call(getBoardDetailsAPI, action.payload);
  yield put(setBoardDetailsAction(currentBoard));
}

export function* addBoard(action: AnyAction) {
  const addedBoard: BoardItem = yield call(addBoardAPI, action.payload);
  yield put(setAddBoardAction(addedBoard));
}

export function* editBoard(action: AnyAction) {
  const updatedBoard: BoardItem = yield call(editBoardAPI, action.payload);
  yield put(setEditBoardAction(updatedBoard));
}

export function* deleteBoard(action: AnyAction) {
  const deletedBoard: BoardItem = yield call(deleteBoardAPI, action.payload);
  yield put(setDeleteBoardAction(deletedBoard.boardId));
}

export function* addColumn(action: AnyAction) {
  console.log('addColumn saga action',action);
  const boardAfterAddedColumn = yield call(addColumnAPI, action.payload);
  console.log('boardAfterAddedColumn', boardAfterAddedColumn);
  yield put(setAddColumnAction(boardAfterAddedColumn.boardId, boardAfterAddedColumn.progressHeader));
}

export function* editColumn(action: AnyAction) {
  console.log('editColumn saga action',action);
  const boardAftereditColumn = yield call(editColumnAPI, action.payload);
  console.log('boardAftereditColumn', boardAftereditColumn);
  yield put(setEditColumnAction(boardAftereditColumn.boardId, boardAftereditColumn.progressHeader));
}

export function* deleteColumn(action: AnyAction) {
  const boardAfterDeleteColumn = yield call(deleteColumnAPI, action.payload);
  yield put(setDeleteColumnAction(boardAfterDeleteColumn.boardId, boardAfterDeleteColumn.headerId));
}

export function* addPulse(action: AnyAction) {
  const boardAfterAddPulse = yield call(addPulseAPI, action.payload);
  yield put(setAddPulseAction(boardAfterAddPulse.boardId, boardAfterAddPulse.pulse));
}

export function* editPulse(action: AnyAction) {
  console.log(' editPulse- AnyAction', action);
  const boardAftereditPulse = yield call(editPulseAPI, action.payload);
  console.log('boardAftereditPulse', boardAftereditPulse);
  yield put(setEditPulseAction(boardAftereditPulse.pulseId, boardAftereditPulse.pulseTxt));
}

export function* deletePulse(action: AnyAction) {
  console.log('deletePulse-saga ', action.payload);
  const boardAfterDeletePulse = yield call(deletePulseAPI, action.payload);
  console.log('boardAfterDeletePulse', boardAfterDeletePulse);
  yield put(setDeletePulseAction(boardAfterDeletePulse.boardId, boardAfterDeletePulse.pulse));
}

export function* editCell(action: AnyAction) {
  console.log('editCell-saga ', action.payload);
  const boardAfterEditCell = yield call(editCellAPI, action.payload);
  yield put(setEditCellAction(boardAfterEditCell.boardId, boardAfterEditCell.pulse));
}

export function* addNewLabel(action: AnyAction) {
  console.log('addNewLabel-saga ', action.payload);
  const boardAfterAddNewLabel = yield call(addNewLabelAPI, action.payload);
  console.log('boardAfterAddNewLabel', boardAfterAddNewLabel);
  // const pulse = boardAfterAddNewLabel.pulse.filter((p:any) => p.pulseId === action.payload.pulseId)[0];
  // console.log('boardAfterAddNewLabel', pulse);
 //yield put(setAddNewLabelAction(action.payload.boardId, action.payload.pulseId, action.payload.cellId, boardAfterAddNewLabel.label));
 yield put(setAddNewLabelAction(boardAfterAddNewLabel.boardId, boardAfterAddNewLabel.pulse));
}

export function* editLabel(action: AnyAction) {
  console.log('editLabel-saga ', action.payload);
  const boardAfterEditLabel = yield call(editLabelAPI, action.payload);
  yield put(setEditLabelAction(boardAfterEditLabel.boardId, boardAfterEditLabel.pulseId, boardAfterEditLabel.cellId, boardAfterEditLabel.label));
}

export function* deleteLabel(action: AnyAction) {
  console.log('deleteLabel-saga ', action.payload);
  const boardAfterDeleteLabel = yield call(deleteLabelAPI, action.payload);
  console.log('boardAfterDeleteLabel', boardAfterDeleteLabel);
  yield put(setAddNewLabelAction(boardAfterDeleteLabel.boardId, boardAfterDeleteLabel.pulse));
 // yield put(setDeleteLabelAction(boardAfterDeleteLabel.boardId, boardAfterDeleteLabel.pulseId, boardAfterDeleteLabel.cellId, boardAfterDeleteLabel.labelId));
}

export function* addMemberToBoard(action: AnyAction) {
  const boardAfterAddMember = yield call(addMemberToBoardAPI, action.payload);
  yield put(setAddMemberToBoardAction(boardAfterAddMember.boardId, boardAfterAddMember.members));
}

export function* removeMemberToBoard(action: AnyAction) {
  const boardAfterRemoveMember = yield call(removeMemberToBoardAPI, action.payload);
  yield put(setRemoveMemberToBoardAction(boardAfterRemoveMember.boardId, boardAfterRemoveMember.members));
}

export function* getLoggedinUser(action: AnyAction) {
  const loggedinUser = yield call(getLoggedinUserAPI);
  yield put(setLoggedinUserAction(loggedinUser));
}

export default function* sagas() {
  yield takeEvery(ProcessMgtActionType.GET_BOARDS_LIST_SAGA, getBoardsList);
  yield takeLatest(ProcessMgtActionType.GET_BOARD_DETAILS_SAGA, getBoardDetails);
  yield takeEvery(ProcessMgtActionType.ADD_BOARD_SAGA, addBoard);
  yield takeLatest(ProcessMgtActionType.EDIT_BOARD_SAGA, editBoard);
  yield takeLatest(ProcessMgtActionType.DELETE_BOARD_SAGA, deleteBoard);
  yield takeLatest(ProcessMgtActionType.ADD_COLUMN_SAGA, addColumn);
  yield takeLatest(ProcessMgtActionType.EDIT_COLUMN_SAGA, editColumn);
  yield takeEvery(ProcessMgtActionType.DELETE_COLUMN_SAGA, deleteColumn);
  yield takeEvery(ProcessMgtActionType.ADD_PULSE_SAGA, addPulse);
  yield takeLatest(ProcessMgtActionType.EDIT_PULSE_SAGA, editPulse);
  yield takeEvery(ProcessMgtActionType.DELETE_PULSE_SAGA, deletePulse);
  yield takeLatest(ProcessMgtActionType.EDIT_CELL_SAGA, editCell);
  yield takeEvery(ProcessMgtActionType.ADD_NEW_LABEL_SAGA, addNewLabel);
  yield takeLatest(ProcessMgtActionType.EDIT_LABEL_SAGA, editLabel);
  yield takeEvery(ProcessMgtActionType.DELETE_LABEL_SAGA, deleteLabel);
  yield takeEvery(ProcessMgtActionType.ADD_MEMBER_TO_BOARD_SAGA, addMemberToBoard);
  yield takeLatest(ProcessMgtActionType.REMOVE_MEMBER_FROM_BOARD_SAGA, removeMemberToBoard);
  yield takeEvery(ProcessMgtActionType.GET_LOGGEDIN_USER_SAGA, getLoggedinUser);
}