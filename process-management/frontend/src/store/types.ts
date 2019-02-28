export enum ProcessMgtActionType {
  ADD_BOARD_SAGA = '@@types/ADD_BOARD_SAGA',
  SET_ADD_BOARD = '@@types/SET_ADD_BOARD',
  GET_BOARDS_LIST_SAGA = '@@types/GET_BOARDS_LIST_SAGA',
  SET_BOARDS_LIST = '@@types/SET_BOARDS_LIST',
  EDIT_BOARD_SAGA = '@@types/EDIT_BOARD_SAGA',
  SET_EDIT_BOARD = '@@types/SET_EDIT_BOARD',
  DELETE_BOARD_SAGA = '@@types/DELETE_BOARD_SAGA',
  SET_DELETE_BOARD = '@@types/SET_DELETE_BOARD',
  GET_BOARD_DETAILS_SAGA = '@@types/GET_BOARD_DETAILS_SAGA',
  SET_BOARD_DETAILS = '@@types/SET_BOARD_DETAILS',
  ADD_COLUMN_SAGA = '@@types/ADD_COLUMN_SAGA',
  SET_ADD_COLUMN = '@@types/SET_ADD_COLUMN',
  EDIT_COLUMN_SAGA = '@@types/EDIT_COLUMN_SAGA',
  SET_EDIT_COLUMN = '@@types/SET_EDIT_COLUMN',
  DELETE_COLUMN_SAGA = '@@types/DELETE_COLUMN_SAGA',
  SET_DELETE_COLUMN = '@@types/SET_DELETE_COLUMN',
  ADD_PULSE_SAGA = '@@types/ADD_PULSE_SAGA',
  SET_ADD_PULSE = '@@types/SET_ADD_PULSE',
  EDIT_PULSE_SAGA = '@@types/EDIT_PULSE_SAGA',
  SET_EDIT_PULSE = '@@types/SET_EDIT_PULSE',
  DELETE_PULSE_SAGA = '@@types/DELETE_PULSE_SAGA',
  SET_DELETE_PULSE = '@@types/SET_DELETE_PULSE',
  EDIT_CELL_SAGA = '@@types/EDIT_CELL_SAGA',
  SET_EDIT_CELL = '@@types/SET_EDIT_CELL',
  ADD_NEW_LABEL_SAGA = '@@types/ADD_NEW_LABEL_SAGA',
  SET_ADD_NEW_LABEL = '@@types/SET_ADD_NEW_LABEL',
  EDIT_LABEL_SAGA = '@@types/EDIT_LABEL_SAGA',
  SET_EDIT_LABEL = '@@types/SET_EDIT_LABEL',
  DELETE_LABEL_SAGA = '@@types/DELETE_LABEL_SAGA',
  SET_DELETE_LABEL = '@@types/SET_DELETE_LABEL',
  ADD_MEMBER_TO_BOARD_SAGA = '@@types/ADD_MEMBER_TO_BOARD_SAGA',
  SET_ADD_MEMBER_TO_BOARD = '@@types/SET_ADD_MEMBER_TO_BOARD',
  REMOVE_MEMBER_FROM_BOARD_SAGA = '@@types/REMOVE_MEMBER_FROM_BOARD_SAGA',
  SET_REMOVE_MEMBER_FROM_BOARD = '@@types/SET_REMOVE_MEMBER_FROM_BOARD',
  GET_LOGGEDIN_USER_SAGA = '@@types/GET_LOGGEDIN_USER_SAGA',
  SET_LOGGEDIN_USER = '@@types/SET_LOGGEDIN_USER'
}

export interface User {
  userId: String,
  userDisplayName: String,
  userEmail: String,
  userActive: Boolean,
}

export interface GoogleUser {
  userId: String,
  userDisplayName: String,
  userEmail: String,
  profileImgUrl: String,
}

export interface ProgressHeader {
  headerId: String,
  headerTxt: String,
  createTime: Date,
  headerType: String,
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
  createTime: Date,
  labels: Label[],
}

export interface Pulse {
  pulseId: String,
  createTime: Date,
  pulseCreatedBy: String,
  pulseTxt: String,
  cells: Cells[],
}

export interface Board {
  boardId: String,
  boardName: String,
  boardDesc: String,
  boardCreatedBy: String,
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
  pulseCreatedBy: String,
  createTime: Date,
}

export interface CellItem {
  cellId: String,
  headerId: String,
  cellLabelTxt: String,
  color: String,
  createTime: Date,
}

export interface ProcessManagementState {
  loggedinUser?: GoogleUser,
  boardList?: BoardItem[],
  currentBoard?: Board,
}