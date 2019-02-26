export enum ProcessMgtActionType {
  ADD_BOARD = '@@types/ADD_BOARD',
  SET_ADD_BOARD = '@@types/SET_ADD_BOARD',
  GET_BOARDS_LIST = '@@types/GET_BOARDS_LIST',
  SET_BOARDS_LIST = '@@types/SET_BOARDS_LIST',
  EDIT_BOARD = '@@types/EDIT_BOARD',
  SET_EDIT_BOARD = '@@types/SET_EDIT_BOARD',
  DELETE_BOARD = '@@types/DELETE_BOARD',
  SET_DELETE_BOARD = '@@types/SET_DELETE_BOARD',
  GET_BOARD_DETAILS = '@@types/GET_BOARD_DETAILS',
  SET_BOARD_DETAILS = '@@types/SET_BOARD_DETAILS',
  ADD_COLUMN = '@@types/ADD_COLUMN',
  SET_ADD_COLUMN = '@@types/SET_ADD_COLUMN',
  EDIT_COLUMN = '@@types/EDIT_COLUMN',
  SET_EDIT_COLUMN = '@@types/SET_EDIT_COLUMN',
  DELETE_COLUMN = '@@types/DELETE_COLUMN',
  SET_DELETE_COLUMN = '@@types/SET_DELETE_COLUMN',
  ADD_PULSE = '@@types/ADD_PULSE',
  SET_ADD_PULSE = '@@types/SET_ADD_PULSE',
  EDIT_PULSE = '@@types/EDIT_PULSE',
  SET_EDIT_PULSE = '@@types/SET_EDIT_PULSE',
  DELETE_PULSE = '@@types/DELETE_PULSE',
  SET_DELETE_PULSE = '@@types/SET_DELETE_PULSE',
  EDIT_CELL = '@@types/EDIT_CELL',
  SET_EDIT_CELL = '@@types/SET_EDIT_CELL',
  ADD_NEW_LABEL = '@@types/ADD_NEW_LABEL',
  SET_ADD_NEW_LABEL = '@@types/SET_ADD_NEW_LABEL',
  EDIT_LABEL = '@@types/EDIT_LABEL',
  SET_EDIT_LABEL = '@@types/SET_EDIT_LABEL',
  DELETE_LABEL = '@@types/DELETE_LABEL',
  SET_DELETE_LABEL = '@@types/SET_DELETE_LABEL',
  ADD_MEMBER_TO_BOARD = '@@types/ADD_MEMBER_TO_BOARD',
  SET_ADD_MEMBER_TO_BOARD = '@@types/SET_ADD_MEMBER_TO_BOARD',
  REMOVE_MEMBER_FROM_BOARD = '@@types/REMOVE_MEMBER_FROM_BOARD',
  SET_REMOVE_MEMBER_FROM_BOARD = '@@types/SET_REMOVE_MEMBER_FROM_BOARD',
  GET_LOGGEDIN_USER = '@@types/GET_LOGGEDIN_USER',
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
  loggedinUser?: User,
  boardList?: BoardItem[],
  currentBoard?: Board,
}