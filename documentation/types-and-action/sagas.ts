import { takeLatest, call, put } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { ProcessMgtActionType, BoardItem, Board } from './types';
import { getBoardsListAPI, getBoardDetailsAPI, addBoardAPI, editBoardAPI, deleteBoardAPI, addColumnAPI, deleteColumnAPI, addPulseAPI, editPulseAPI, deletePulseAPI, editCellAPI, addNewLabelAPI, editLabelAPI, deleteLabelAPI, addMemberToBoardAPI, removeMemberToBoardAPI } from './api-services';
import { setBoardsListAction, setBoardDetailsAction, addBoardAction, editBoardAction, deleteBoardAction, addColumnAction, deleteColumnAction, addPulseAction, deletePulseAction, editCellAction, addNewLabelAction, editLabelAction, deleteLabelAction, editPulseAction, addMemberToBoardAction, removeMemberToBoardAction } from './actions';

function* getBoardsList(action: AnyAction) {
  const boardList: BoardItem[] = yield call(getBoardsListAPI);
  yield put(setBoardsListAction(boardList));
}

function* getBoardDetails(action: AnyAction) {
  const currentBoard: Board = yield call(getBoardDetailsAPI, action.payload);
  yield put(setBoardDetailsAction(currentBoard));
}

function* addBoard(action: AnyAction) {
  const addedBoard: BoardItem = yield call(addBoardAPI, action.payload);
  yield put(addBoardAction(addedBoard));
}

function* editBoard(action: AnyAction) {
  const updatedBoard: BoardItem = yield call(editBoardAPI, action.payload);
  yield put(editBoardAction(updatedBoard));
}

function* deleteBoard(action: AnyAction) {
  const deletedBoard: BoardItem = yield call(deleteBoardAPI, action.payload);
  yield put(deleteBoardAction(deletedBoard.boardId));
}

function* addColumn(action: AnyAction) {
  const boardAfterAddedColumn = yield call(addColumnAPI, action.payload);
  yield put(addColumnAction(boardAfterAddedColumn.boardId, boardAfterAddedColumn.progressHeader));
}

function* deleteColumn(action: AnyAction) {
  const boardAfterDeleteColumn = yield call(deleteColumnAPI, action.payload);
  yield put(deleteColumnAction(boardAfterDeleteColumn.boardId, boardAfterDeleteColumn.headerId));
}

function* addPulse(action: AnyAction) {
  const boardAfterAddPulse = yield call(addPulseAPI, action.payload);
  yield put(addPulseAction(boardAfterAddPulse.boardId, boardAfterAddPulse.pulse));
}

function* editPulse(action: AnyAction) {
  const boardAftereditPulse = yield call(editPulseAPI, action.payload);
  yield put(editPulseAction(boardAftereditPulse.boardId, boardAftereditPulse.pulseId, boardAftereditPulse.pulseTxt));
}

function* deletePulse(action: AnyAction) {
  const boardAfterDeletePulse = yield call(deletePulseAPI, action.payload);
  yield put(deletePulseAction(boardAfterDeletePulse.boardId, boardAfterDeletePulse.pulseId));
}

function* editCell(action: AnyAction) {
  const boardAfterEditCell = yield call(editCellAPI, action.payload);
  yield put(editCellAction(boardAfterEditCell.boardId, boardAfterEditCell.cell));
}

function* addNewLabel(action: AnyAction) {
  const boardAfterAddNewLabel = yield call(addNewLabelAPI, action.payload);
  yield put(addNewLabelAction(boardAfterAddNewLabel.boardId, boardAfterAddNewLabel.cellId, boardAfterAddNewLabel.label));
}

function* editLabel(action: AnyAction) {
  const boardAfterEditLabel = yield call(editLabelAPI, action.payload);
  yield put(editLabelAction(boardAfterEditLabel.boardId, boardAfterEditLabel.cellId, boardAfterEditLabel.label));
}

function* deleteLabel(action: AnyAction) {
  const boardAfterDeleteLabel = yield call(deleteLabelAPI, action.payload);
  yield put(deleteLabelAction(boardAfterDeleteLabel.boardId, boardAfterDeleteLabel.cellId, boardAfterDeleteLabel.labelId));
}

function* addMemberToBoard(action: AnyAction) {
  const boardAfterAddMember = yield call(addMemberToBoardAPI, action.payload);
  yield put(addMemberToBoardAction(boardAfterAddMember.boardId, boardAfterAddMember.user));
}

function* removeMemberToBoard(action: AnyAction) {
  const boardAfterRemoveMember = yield call(removeMemberToBoardAPI, action.payload);
  yield put(removeMemberToBoardAction(boardAfterRemoveMember.boardId, boardAfterRemoveMember.userId));
}

export default function* sagas() {
  yield takeLatest(ProcessMgtActionType.GET_BOARDS_LIST, getBoardsList);
  yield takeLatest(ProcessMgtActionType.GET_BOARD_DETAILS, getBoardDetails);
  yield takeLatest(ProcessMgtActionType.ADD_BOARD, addBoard);
  yield takeLatest(ProcessMgtActionType.EDIT_BOARD, editBoard);
  yield takeLatest(ProcessMgtActionType.DELETE_BOARD, deleteBoard);
  yield takeLatest(ProcessMgtActionType.ADD_COLUMN, addColumn);
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
}