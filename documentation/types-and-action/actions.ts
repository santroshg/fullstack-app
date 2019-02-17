import { action } from 'typesafe-actions';
import { ProcessMgtActionType, BoardItem, Board, ProgressHeader, PulseItem, CellItem, Label, User } from './types';

export const getBoardsListAction = () => action(ProcessMgtActionType.GET_BOARDS_LIST);
export const setBoardsListAction = (boardList: BoardItem[]) => action(ProcessMgtActionType.SET_BOARDS_LIST, boardList);
export const getBoardDetailsAction = (boardId: String) => action(ProcessMgtActionType.GET_BOARD_DETAILS, boardId);
export const setBoardDetailsAction = (currentBoard: Board) => action(ProcessMgtActionType.SET_BOARD_DETAILS, currentBoard);


export const addBoardAction = (newBoard: BoardItem) => action(ProcessMgtActionType.ADD_BOARD, newBoard);
export const editBoardAction = (updatedBoard: BoardItem) => action(ProcessMgtActionType.EDIT_BOARD, updatedBoard);
export const deleteBoardAction = (boardId: String) => action(ProcessMgtActionType.DELETE_BOARD, boardId);
export const addColumnAction = (boardId: String, progressHeader: ProgressHeader) => action(ProcessMgtActionType.ADD_COLUMN, boardId, progressHeader);
export const deleteColumnAction = (boardId: String, headerId: String) => action(ProcessMgtActionType.DELETE_COLUMN, boardId, headerId);
export const addPulseAction = (boardId: String, pulse: PulseItem) => action(ProcessMgtActionType.ADD_PULSE, boardId, pulse);
export const editPulseAction = (boardId: String, pulseId: String, pulseTxt: String) => action(ProcessMgtActionType.ADD_PULSE, boardId, pulseId, pulseTxt);
export const deletePulseAction = (boardId: String, pulseId: String) => action(ProcessMgtActionType.DELETE_PULSE, boardId, pulseId);
export const editCellAction = (boardId: String, cell: CellItem) => action(ProcessMgtActionType.EDIT_CELL, boardId, cell);
// create new label in selected cell lebel list
export const addNewLabelAction = (boardId: String, cellId: String, label: Label) => action(ProcessMgtActionType.ADD_NEW_LABEL, boardId, cellId, label);
export const editLabelAction = (boardId: String, cellId: String, label: Label) => action(ProcessMgtActionType.EDIT_LABEL, boardId, cellId, label);
export const deleteLabelAction = (boardId: String, cellId: String, labelId: String) => action(ProcessMgtActionType.DELETE_LABEL, boardId, cellId, labelId);

export const addMemberToBoardAction = (boardId: String, user: User) => action(ProcessMgtActionType.ADD_MEMBER_TO_BOARD, boardId, user);
export const removeMemberToBoardAction = (boardId: String, userId: String) => action(ProcessMgtActionType.ADD_MEMBER_TO_BOARD, boardId, userId);
