import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { ObjectID } from 'bson';
import { ProcessMgtActionType, BoardItem, Board, User } from './types';
import { getBoardsListAPI, getBoardDetailsAPI, addBoardAPI, editBoardAPI, deleteBoardAPI, addColumnAPI, deleteColumnAPI, addPulseAPI, editPulseAPI, deletePulseAPI, editCellAPI, addNewLabelAPI, editLabelAPI, deleteLabelAPI, addMemberToBoardAPI, removeMemberToBoardAPI, editColumnAPI, getLoggedinUserAPI } from './api-services';
import { setBoardsListAction, setBoardDetailsAction, setAddBoardAction, 
    setAddMemberToBoardAction, setRemoveMemberToBoardAction, setAddPulseAction, setLoggedinUserAction, setDeletePulseAction, setEditPulseAction, setEditCellAction, setAddNewLabelAction, setEditLabelAction, setDeleteColumnAction, setEditColumnAction, setAddColumnAction, setDeleteBoardAction, setEditBoardAction, undoAddBoardAction, showLoadingAction, removeLoadingAction } from './actions';

export function* getBoardsList(action: AnyAction) {
  const boardList: BoardItem[] = yield call(getBoardsListAPI, action.payload);
  // console.log('boardList---------',  boardList);
  yield put(setBoardsListAction(boardList));
}

export function* getBoardDetails(action: AnyAction) {
  // console.log('getBoardDetails in saga---------', action.payload);
  const currentBoard: Board = yield call(getBoardDetailsAPI, action.payload);
  yield put(setBoardDetailsAction(currentBoard));
}

export function* addBoard(action: AnyAction) {
  const loggedinUser: User = {
    userId: action.payload.loggedinUser.userId,
    userDisplayName: action.payload.loggedinUser.userDisplayName,
    userEmail: action.payload.loggedinUser.userEmail,
    userActive: true,
  }
  const notNeededBoardObject: BoardItem = {
    boardId: (new ObjectID()).toString(),
    boardName: action.payload.newBoard.boardName,
    boardDesc: action.payload.newBoard.boardDesc
  }
  yield put(setAddBoardAction(notNeededBoardObject));
  const addedBoard: any = yield call(addBoardAPI, {loggedinUser, notNeededBoardObject});
  if(addedBoard.error === 'ADD_BOARD_ERROR') {
    yield put(undoAddBoardAction(addedBoard.boardId));
  } 
  // yield put(setAddBoardAction(addedBoard));
}

export function* editBoard(action: AnyAction) {
  const updatedBoard: BoardItem = yield call(editBoardAPI, action.payload);
  // yield put(setEditBoardAction(updatedBoard));
}

export function* deleteBoard(action: AnyAction) {
  yield put(setDeleteBoardAction(action.payload));
  const deletedBoardId: String = yield call(deleteBoardAPI, action.payload);
  // yield put(setDeleteBoardAction(deletedBoardId));
}

export function* addColumn(action: AnyAction) {
  yield put(showLoadingAction());
  const boardAfterAddedColumn = yield call(addColumnAPI, action.payload);
  yield put(setAddColumnAction(boardAfterAddedColumn.boardId, boardAfterAddedColumn.progressHeader, boardAfterAddedColumn.pulse));
  yield put(removeLoadingAction());
}

export function* editColumn(action: AnyAction) {
  const boardAftereditColumn = yield call(editColumnAPI, action.payload);
  yield put(setEditColumnAction(boardAftereditColumn.headerId, boardAftereditColumn.headerTxt));
}

export function* deleteColumn(action: AnyAction) {
  // console.log('action.payload ----- deleteColumn---------------', action.payload);
  yield put(setDeleteColumnAction(action.payload.headerColumnId));
  const boardAfterDeleteColumn = yield call(deleteColumnAPI, action.payload);
  // console.log('boardAfterDeleteColumn-------------------', boardAfterDeleteColumn);
  // yield put(setDeleteColumnAction(boardAfterDeleteColumn.progressHeader, boardAfterDeleteColumn.pulse));
}

export function* addPulse(action: AnyAction) {
  yield put(showLoadingAction());
  const boardAfterAddPulse = yield call(addPulseAPI, action.payload);
  yield put(setAddPulseAction(boardAfterAddPulse.boardId, boardAfterAddPulse.pulse, boardAfterAddPulse.progressHeader));
  yield put(removeLoadingAction());
}

export function* editPulse(action: AnyAction) {
  yield put(setEditPulseAction(action.payload.pulseId, action.payload.pulseTxt));
  const boardAftereditPulse = yield call(editPulseAPI, action.payload);
}

export function* deletePulse(action: AnyAction) {
  yield put(setDeletePulseAction(action.payload.pulseId));
  const boardAfterDeletePulse = yield call(deletePulseAPI, action.payload);
}

export function* editCell(action: AnyAction) {
  yield put(setEditCellAction(action.payload.pulseId, action.payload.cellId, action.payload.cell));
  const boardAfterEditCell = yield call(editCellAPI, action.payload);
  // yield put(setEditCellAction(boardAfterEditCell.boardId, boardAfterEditCell.pulse));
}

export function* addNewLabel(action: AnyAction) {
  console.log('addNewLabel--------------------------------', action.payload);
  yield put(setAddNewLabelAction(action.payload.pulseId, action.payload.cellId, action.payload.label));
  const boardAfterAddNewLabel = yield call(addNewLabelAPI, action.payload);
  // const pulse = boardAfterAddNewLabel.pulse.filter((p:any) => p.pulseId === action.payload.pulseId)[0];
  // yield put(setAddNewLabelAction(boardAfterAddNewLabel.boardId, boardAfterAddNewLabel.pulse));
}

export function* editLabel(action: AnyAction) {
  const boardAfterEditLabel = yield call(editLabelAPI, action.payload);
  yield put(setEditLabelAction(boardAfterEditLabel.boardId, boardAfterEditLabel.pulse));
}

export function* deleteLabel(action: AnyAction) {
  const boardAfterDeleteLabel = yield call(deleteLabelAPI, action.payload);
  // yield put(setAddNewLabelAction(boardAfterDeleteLabel.boardId, boardAfterDeleteLabel.pulse));
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