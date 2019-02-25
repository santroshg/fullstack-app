import { takeLatest, call, put } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { ProcessMgtActionType, BoardItem, Board } from './types';
import { getBoardsListAPI, getBoardDetailsAPI, addBoardAPI, editBoardAPI, deleteBoardAPI, addColumnAPI, deleteColumnAPI, addPulseAPI, editPulseAPI, deletePulseAPI, editCellAPI, addNewLabelAPI, editLabelAPI, deleteLabelAPI, addMemberToBoardAPI, removeMemberToBoardAPI, editColumnAPI, getLoggedinUserAPI } from './api-services';
import { setBoardsListAction, setBoardDetailsAction, addBoardAction, editBoardAction,
    deleteBoardAction, addColumnAction, deleteColumnAction, addPulseAction,
    deletePulseAction, editCellAction, addNewLabelAction, editLabelAction, 
    deleteLabelAction, editPulseAction, addMemberToBoardAction, 
    removeMemberToBoardAction, editColumnAction, setAddBoardAction, 
    setAddMemberToBoardAction, setRemoveMemberToBoardAction, setAddPulseAction, setLoggedinUserAction } from './actions';

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
  yield put(editBoardAction(updatedBoard));
}

export function* deleteBoard(action: AnyAction) {
  const deletedBoard: BoardItem = yield call(deleteBoardAPI, action.payload);
  yield put(deleteBoardAction(deletedBoard.boardId));
}

export function* addColumn(action: AnyAction) {
  console.log('addColumn saga action',action);
  const boardAfterAddedColumn = yield call(addColumnAPI, action.payload);
  console.log('boardAfterAddedColumn', boardAfterAddedColumn);
  yield put(addColumnAction(boardAfterAddedColumn.boardId, boardAfterAddedColumn.progressHeader));
}

export function* editColumn(action: AnyAction) {
  const boardAftereditColumn = yield call(editColumnAPI, action.payload);
  yield put(editColumnAction(boardAftereditColumn.boardId, boardAftereditColumn.headerId, boardAftereditColumn.headerTxt));
}

export function* deleteColumn(action: AnyAction) {
  const boardAfterDeleteColumn = yield call(deleteColumnAPI, action.payload);
  yield put(deleteColumnAction(boardAfterDeleteColumn.boardId, boardAfterDeleteColumn.headerId));
}

export function* addPulse(action: AnyAction) {
  const boardAfterAddPulse = yield call(addPulseAPI, action.payload);
  yield put(setAddPulseAction(boardAfterAddPulse.boardId, boardAfterAddPulse.pulse));
}

export function* editPulse(action: AnyAction) {
  const boardAftereditPulse = yield call(editPulseAPI, action.payload);
  yield put(editPulseAction(boardAftereditPulse.boardId, boardAftereditPulse.pulseId, boardAftereditPulse.pulseTxt));
}

export function* deletePulse(action: AnyAction) {
  console.log('deletePulse-saga ', action.payload);
  const boardAfterDeletePulse = yield call(deletePulseAPI, action.payload);
  yield put(deletePulseAction(boardAfterDeletePulse.boardId, boardAfterDeletePulse.pulseId));
}

export function* editCell(action: AnyAction) {
  const boardAfterEditCell = yield call(editCellAPI, action.payload);
  yield put(editCellAction(boardAfterEditCell.boardId, boardAfterEditCell.pulseId, boardAfterEditCell.cell));
}

export function* addNewLabel(action: AnyAction) {
  const boardAfterAddNewLabel = yield call(addNewLabelAPI, action.payload);
  yield put(addNewLabelAction(boardAfterAddNewLabel.boardId, boardAfterAddNewLabel.pulseId, boardAfterAddNewLabel.cellId, boardAfterAddNewLabel.label));
}

export function* editLabel(action: AnyAction) {
  const boardAfterEditLabel = yield call(editLabelAPI, action.payload);
  yield put(editLabelAction(boardAfterEditLabel.boardId, boardAfterEditLabel.pulseId, boardAfterEditLabel.cellId, boardAfterEditLabel.label));
}

export function* deleteLabel(action: AnyAction) {
  const boardAfterDeleteLabel = yield call(deleteLabelAPI, action.payload);
  yield put(deleteLabelAction(boardAfterDeleteLabel.boardId, boardAfterDeleteLabel.pulseId, boardAfterDeleteLabel.cellId, boardAfterDeleteLabel.labelId));
}

export function* addMemberToBoard(action: AnyAction) {
  console.log('hiting saga----------------', action.payload);
  const boardAfterAddMember = yield call(addMemberToBoardAPI, action.payload);
  console.log('boardAfterAddMember----', boardAfterAddMember);
  yield put(setAddMemberToBoardAction(boardAfterAddMember.boardId, boardAfterAddMember.user));
}

export function* removeMemberToBoard(action: AnyAction) {
  console.log('calling remove----saga --------------------', action.payload);
  const boardAfterRemoveMember = yield call(removeMemberToBoardAPI, action.payload);
  yield put(setRemoveMemberToBoardAction(boardAfterRemoveMember.boardId, boardAfterRemoveMember.userId));
}

export function* getLoggedinUser(action: AnyAction) {
  console.log('sssssssagaaaaaaaaa-----called--------------');
  const loggedinUser = yield call(getLoggedinUserAPI);
  yield put(setLoggedinUserAction(loggedinUser));
}

export default function* sagas() {
  yield takeLatest(ProcessMgtActionType.GET_BOARDS_LIST, getBoardsList);
  yield takeLatest(ProcessMgtActionType.GET_BOARD_DETAILS, getBoardDetails);
  yield takeLatest(ProcessMgtActionType.ADD_BOARD, addBoard);
  yield takeLatest(ProcessMgtActionType.EDIT_BOARD, editBoard);
  yield takeLatest(ProcessMgtActionType.DELETE_BOARD, deleteBoard);
  yield takeLatest(ProcessMgtActionType.ADD_COLUMN, addColumn);
  yield takeLatest(ProcessMgtActionType.EDIT_COLUMN, editColumn);
  yield takeLatest(ProcessMgtActionType.DELETE_COLUMN, deleteColumn);
  yield takeLatest(ProcessMgtActionType.ADD_PULSE, addPulse);
  yield takeLatest(ProcessMgtActionType.EDIT_PULSE, editPulse);
  yield takeLatest(ProcessMgtActionType.DELETE_PULSE, deletePulse);
  yield takeLatest(ProcessMgtActionType.EDIT_CELL, editCell);
  yield takeLatest(ProcessMgtActionType.ADD_NEW_LABEL, addNewLabel);
  yield takeLatest(ProcessMgtActionType.EDIT_LABEL, editLabel);
  yield takeLatest(ProcessMgtActionType.DELETE_LABEL, deleteLabel);
  yield takeLatest(ProcessMgtActionType.ADD_MEMBER_TO_BOARD, addMemberToBoard);
  yield takeLatest(ProcessMgtActionType.REMOVE_MEMBER_FROM_BOARD, removeMemberToBoard);
  yield takeLatest(ProcessMgtActionType.GET_LOGGEDIN_USER, getLoggedinUser);
}