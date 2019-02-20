import { Reducer, AnyAction } from 'redux';
import { ProcessManagementState, ProcessMgtActionType, BoardItem } from './types';

const initialState: ProcessManagementState = {
  loggedinUser: undefined,
  boardList: undefined,
  currentBoard: undefined,
};

const ProcessManagementReducer = (currentState: ProcessManagementState = initialState, action: AnyAction) => {
  switch(action.type) {
    case ProcessMgtActionType.SET_BOARDS_LIST:
      return {...currentState, boardList: [...currentState.boardList, ...action.payload]};

    default:
      return currentState;

  }
};

export default ProcessManagementReducer;