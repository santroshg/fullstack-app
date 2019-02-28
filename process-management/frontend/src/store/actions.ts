import { action } from 'typesafe-actions';
import { ProcessMgtActionType, BoardItem, Board, ProgressHeader, PulseItem, CellItem, Label, User, Pulse } from './types';

export const getBoardsListAction = () => action(ProcessMgtActionType.GET_BOARDS_LIST_SAGA);
export const setBoardsListAction = (boardList: BoardItem[]) => action(ProcessMgtActionType.SET_BOARDS_LIST, boardList);
export const getBoardDetailsAction = (boardId: String) => action(ProcessMgtActionType.GET_BOARD_DETAILS_SAGA, boardId);
export const setBoardDetailsAction = (currentBoard: Board) => action(ProcessMgtActionType.SET_BOARD_DETAILS, currentBoard);


export const addBoardAction = (newBoard: BoardItem) => action(ProcessMgtActionType.ADD_BOARD_SAGA, newBoard);
export const setAddBoardAction = (newBoard: BoardItem) => action(ProcessMgtActionType.SET_ADD_BOARD, newBoard);

export const editBoardAction = (updatedBoard: BoardItem) => action(ProcessMgtActionType.EDIT_BOARD_SAGA, updatedBoard);
export const setEditBoardAction = (updatedBoard: BoardItem) => action(ProcessMgtActionType.SET_EDIT_BOARD, updatedBoard);
export const deleteBoardAction = (boardId: String) => action(ProcessMgtActionType.DELETE_BOARD_SAGA, boardId);
export const setDeleteBoardAction = (boardId: String) => action(ProcessMgtActionType.SET_DELETE_BOARD, boardId);
export const addColumnAction = (boardId: String, progressHeader: ProgressHeader) => action(ProcessMgtActionType.ADD_COLUMN_SAGA, {boardId, progressHeader});
export const setAddColumnAction = (boardId: String, progressHeader: ProgressHeader) => action(ProcessMgtActionType.SET_ADD_COLUMN, {boardId, progressHeader});
export const editColumnAction = (boardId: String, headerId: String, headerTxt: String) => action(ProcessMgtActionType.EDIT_COLUMN_SAGA, {boardId, headerId, headerTxt});
export const setEditColumnAction = (boardId: String, progressHeader: ProgressHeader) => action(ProcessMgtActionType.SET_EDIT_COLUMN, {boardId, progressHeader});
export const deleteColumnAction = (boardId: String, headerId: String) => action(ProcessMgtActionType.DELETE_COLUMN_SAGA, {boardId, headerId});
export const setDeleteColumnAction = (boardId: String, headerId: String) => action(ProcessMgtActionType.SET_DELETE_COLUMN, {boardId, headerId});
export const addPulseAction = (boardId: String, pulse: PulseItem) => action(ProcessMgtActionType.ADD_PULSE_SAGA, {boardId, pulse});
export const setAddPulseAction = (boardId: String, pulse: PulseItem) => action(ProcessMgtActionType.SET_ADD_PULSE, {boardId, pulse});
export const editPulseAction = (boardId: String, pulseId: String, pulseTxt: String) => action(ProcessMgtActionType.EDIT_PULSE_SAGA, {boardId, pulseId, pulseTxt});
export const setEditPulseAction = (boardId: String, pulse: Pulse) => action(ProcessMgtActionType.SET_EDIT_PULSE, {boardId, pulse});
export const deletePulseAction = (boardId: String, pulseId: String) => action(ProcessMgtActionType.DELETE_PULSE_SAGA, {boardId, pulseId});
export const setDeletePulseAction = (boardId: String, pulse: Pulse) => action(ProcessMgtActionType.SET_DELETE_PULSE, {boardId, pulse});
export const editCellAction = (boardId: String, pulseId: String, cell: CellItem) => action(ProcessMgtActionType.EDIT_CELL_SAGA, {boardId, pulseId, cell});
export const setEditCellAction = (boardId: String, pulseId: String, cell: CellItem) => action(ProcessMgtActionType.SET_EDIT_CELL, {boardId, pulseId, cell});
// create new label in selected cell lebel list 
export const addNewLabelAction = (boardId: String, pulseId: String, cellId: String, label: Label) => action(ProcessMgtActionType.ADD_NEW_LABEL_SAGA, {boardId, pulseId, cellId, label});
export const setAddNewLabelAction = (boardId: String, pulseId: String, cellId: String, label: Label) => action(ProcessMgtActionType.SET_ADD_NEW_LABEL, {boardId, pulseId, cellId, label});
export const editLabelAction = (boardId: String, pulseId: String, cellId: String, label: Label) => action(ProcessMgtActionType.EDIT_LABEL_SAGA, {boardId, pulseId, cellId, label});
export const setEditLabelAction = (boardId: String, pulseId: String, cellId: String, label: Label) => action(ProcessMgtActionType.SET_EDIT_LABEL, {boardId, pulseId, cellId, label});
export const deleteLabelAction = (boardId: String, pulseId: String, cellId: String, labelId: String) => action(ProcessMgtActionType.DELETE_LABEL_SAGA, {boardId, pulseId, cellId, labelId});
export const setDeleteLabelAction = (boardId: String, pulseId: String, cellId: String, labelId: String) => action(ProcessMgtActionType.SET_DELETE_LABEL, {boardId, pulseId, cellId, labelId});

export const addMemberToBoardAction = (boardId: String, user: User) => action(ProcessMgtActionType.ADD_MEMBER_TO_BOARD_SAGA, {boardId, user});
export const setAddMemberToBoardAction = (boardId: String, user: User) => action(ProcessMgtActionType.SET_ADD_MEMBER_TO_BOARD, {boardId, user});
export const removeMemberToBoardAction = (boardId: String, userId: String) => action(ProcessMgtActionType.REMOVE_MEMBER_FROM_BOARD_SAGA, {boardId, userId});
export const setRemoveMemberToBoardAction = (boardId: String, members: User[]) => action(ProcessMgtActionType.SET_REMOVE_MEMBER_FROM_BOARD, {boardId, members});

export const getLoggedinUserAction = () => action(ProcessMgtActionType.GET_LOGGEDIN_USER_SAGA);
export const setLoggedinUserAction = (loggedinUser: User) => action(ProcessMgtActionType.SET_LOGGEDIN_USER, loggedinUser);
