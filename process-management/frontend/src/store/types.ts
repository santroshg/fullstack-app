export enum ProcessMgtActionType {
  ADD_BOARD = '@@types/ADD_BOARD',
  GET_BOARDS_LIST = '@@types/GET_BOARDS_LIST',
  SET_BOARDS_LIST = '@@types/SET_BOARDS_LIST',
  EDIT_BOARD = '@@types/EDIT_BOARD',
  DELETE_BOARD = '@@types/DELETE_BOARD',
  GET_BOARD_DETAILS = '@@types/GET_BOARD_DETAILS',
  SET_BOARD_DETAILS = '@@types/SET_BOARD_DETAILS',
  ADD_COLUMN = '@@types/ADD_COLUMN',
  DELETE_COLUMN = '@@types/DELETE_COLUMN',
  ADD_PULSE = '@@types/ADD_PULSE',
  EDIT_PULSE = '@@types/EDIT_PULSE',
  DELETE_PULSE = '@@types/DELETE_PULSE',
  EDIT_CELL = '@@types/EDIT_CELL',
  ADD_NEW_LABEL = '@@types/ADD_NEW_LABEL',
  EDIT_LABEL = '@@types/EDIT_LABEL',
  DELETE_LABEL = '@@types/DELETE_LABEL',
  ADD_MEMBER_TO_BOARD = '@@types/ADD_MEMBER_TO_BOARD',
  REMOVE_MEMBER_FROM_BOARD = '@@types/REMOVE_MEMBER_FROM_BOARD'
}

export interface User {
  userId: String,
  userDisplayName: String,
  userEmail: String,
  userActive: boolean,
}

export interface ProgressHeader {
  headerId: String,
  headerTxt: String,
  headerCreateTime: String,
}

export interface Label {
  labelId: String,
  labelTxt: String,
  color: String,
}

export interface Cells {
  cellId: String,
  headerId: String,
  cellLabelTxt: String,
  color: String,
  createOrUpdateTime: Date,
  labels: Label[],
}

export interface Pulse {
  pulseId: String,
  pulseTxt: String,
  pulseCreateTime: String,
  cells: Cells[],
}

export interface Board {
  boardId: String,
  boardName: String,
  boardDesc: String,
  members: User[],
  progressHeader: ProgressHeader[],
  pulse: Pulse[],
  createTime: Date,
}

export interface BoardItem {
  boardId: String,
  boardName: String,
  boardDesc: String,
}

export interface PulseItem {
  pulseId: String,
  pulseTxt: String,
  pulseCreateTime: String,
}

export interface CellItem {
  cellId: String,
  headerId: String,
  cellLabelTxt: String,
  color: String,
  createOrUpdateTime: Date,
}