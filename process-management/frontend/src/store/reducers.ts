import { Reducer, AnyAction } from 'redux';
import { ProcessManagementState, ProcessMgtActionType, BoardItem, User, GoogleUser } from './types';

const initialState: ProcessManagementState = {
  loggedinUser: undefined,
  boardList: undefined,
  currentBoard: undefined,
  errorMessage: '',
  showLoader: false,
};

const ProcessManagementReducer = (currentState: ProcessManagementState = initialState, action: AnyAction) => {

  switch (action.type) {
    case ProcessMgtActionType.SET_BOARDS_LIST:
      if (currentState.boardList !== undefined) {
        return { ...currentState, boardList: [...currentState.boardList, ...action.payload] };
      } else {
       return { ...currentState, boardList: [...action.payload] };
      }

    case ProcessMgtActionType.SET_BOARD_DETAILS:
      return { ...currentState, currentBoard: action.payload };

    case ProcessMgtActionType.SET_ADD_BOARD:
      return { ...currentState, boardList: [...currentState.boardList, action.payload], errorMessage: '' };

    case ProcessMgtActionType.ADD_BOARD_ERROR:
      const oldBoardList = [...currentState.boardList];
      const errorBoardName = oldBoardList.filter(ol => ol.boardId === action.payload)[0].boardName;
      if(oldBoardList.length > 1) {
        const newBoardList = oldBoardList.filter(ol => ol.boardId !== action.payload);
        return { ...currentState, boardList: newBoardList, errorMessage: `Previous board- "${errorBoardName}" not added successfully due to technical issue, please try again.`};
      } else {
        return { ...currentState, boardList: [], errorMessage: `Previous board- "${errorBoardName}" not added successfully due to technical issue, please try again.` };
      }
      
    
    case ProcessMgtActionType.RESET_ERROR_MESSAGE:
      return { ...currentState, errorMessage: '' }

    case ProcessMgtActionType.SET_EDIT_BOARD:
    if(currentState.currentBoard && currentState.currentBoard.boardId === action.payload.boardId ) {
      return { ...currentState,
        boardList: currentState.boardList.map(b => b.boardId !== action.payload.boardId ? b : action.payload),
        currentBoard: {...currentState.currentBoard, boardName: action.payload.boardName, boardDesc: action.payload.boardDesc} };
    } else {
      return { ...currentState,
        boardList: currentState.boardList.map(b => b.boardId !== action.payload.boardId ? b : action.payload) };
    }
      
    case ProcessMgtActionType.SET_DELETE_BOARD:
      return { ...currentState, currentBoard: undefined, boardList: currentState.boardList.filter(b => b.boardId !== action.payload) };

    case ProcessMgtActionType.SET_ADD_COLUMN:
      // this is incorrect, need handle row and column both
      return { ...currentState, ...{ currentBoard: { ...currentState.currentBoard, ...{ progressHeader: action.payload.progressHeader }, ...{ pulse: action.payload.pulse } } } };

    case ProcessMgtActionType.SET_EDIT_COLUMN:
      const updatedColumnHeader = currentState.currentBoard.progressHeader
        .map(ph => ph.headerId === action.payload.headerId ? {
          headerId: action.payload.headerId,
          headerTxt: action.payload.headerTxt,
          createTime: ph.createTime
        } : ph);
      return { ...currentState, ...{ currentBoard: { ...currentState.currentBoard, ...{ progressHeader: updatedColumnHeader } } } };
      //return { ...currentState, ...{ currentBoard: { ...currentState.currentBoard, ...{ progressHeader: action.payload.progressHeader } } } };
      
    case ProcessMgtActionType.SET_DELETE_COLUMN:
      // need to write correct reducers for delete column
      // return { ...currentState, ...{ currentBoard: { ...currentState.currentBoard, ...{ progressHeader: action.payload.progressHeader }, ...{ pulse: action.payload.pulse } } } };
     const newProgressHeader = currentState.currentBoard.progressHeader.filter(p => p.headerColumnId !== action.payload.headerColumnId);
     const oldPulseAfterDelete = [...currentState.currentBoard.pulse];
    //  const newPulseAfterDelete = oldPulseAfterDelete.map((pl) => {
    //    return pl.cells.filter(c => c.headerColumnId !== action.payload.headerColumnId );
    //  })
    for(let i = 0; i < oldPulseAfterDelete.length; i++) {
      for(let j = 0; j < oldPulseAfterDelete[i].cells.length; j++) {
        // oldPulseAfterDelete[i].cells.
          if (oldPulseAfterDelete[i].cells[j].headerColumnId === action.payload.headerColumnId) {
            oldPulseAfterDelete[i].cells.splice(j,1);
        }
      }
    }
    return { ...currentState, ...{ currentBoard: { ...currentState.currentBoard, ...{ progressHeader: newProgressHeader }, ...{ pulse: oldPulseAfterDelete } } } };

    // issue may occure in below reducers due to pulse structure 
    //=> right now PulseItem, it should Pulse
    case ProcessMgtActionType.SET_ADD_PULSE:
    return { ...currentState, ...{ currentBoard: { ...currentState.currentBoard, ...{ progressHeader: action.payload.progressHeader }, ...{ pulse: action.payload.pulse } } } };

      // if(action.payload.pulse.length === 1 ) {
      //   return { ...currentState, ...{ currentBoard: { ...currentState.currentBoard, ...{ pulse: action.payload.pulse} } } };
      // //  return { ...oldPulse, ...{ currentBoard: { ...oldPulse.currentBoard, ...{ progressHeader: action.payload.progressHeader} } } };
      // } else {
      //   return { ...currentState, ...{ currentBoard: { ...currentState.currentBoard, ...{ pulse: action.payload.pulse } } } }
      // }
      



    case ProcessMgtActionType.SET_EDIT_PULSE:
      const oldPulse = currentState.currentBoard.pulse.filter(p => p.pulseId === action.payload.pulseId)[0];
      const newPulse = { ...oldPulse, pulseTxt: action.payload.pulseTxt };
      const newPulseList = currentState.currentBoard.pulse.map(p => p.pulseId === action.payload.pulseId ? newPulse : p);
      return { ...currentState, ...{ currentBoard: { ...currentState.currentBoard, ...{ pulse: newPulseList } } } }
      // return { ...currentState, ...{ currentBoard: { ...currentState.currentBoard, ...{ pulse: action.payload.pulse } } } }

    case ProcessMgtActionType.SET_DELETE_PULSE:
      const afterDeleteNewPulseList = currentState.currentBoard.pulse.filter(p => p.pulseId !== action.payload.pulseId);
      return {...currentState, ...{currentBoard: {...currentState.currentBoard, ...{pulse: afterDeleteNewPulseList}}}}
      // return { ...currentState, ...{ currentBoard: { ...currentState.currentBoard, ...{ pulse: action.payload.pulse } } } }

    case ProcessMgtActionType.SET_EDIT_CELL:
      const tempPulse = [...currentState.currentBoard.pulse];
      const oldCell = tempPulse.filter(p => p.pulseId === action.payload.pulseId)[0]
        .cells.filter(c => c.cellId === action.payload.cellId)[0];
      const newCell = { ...oldCell, cellLabelTxt: action.payload.cell.cellLabelTxt, color: action.payload.cell.color };
      const newPulse_cells_SET_EDIT_CELL = tempPulse.filter(p => p.pulseId === action.payload.pulseId)[0]
        .cells.map(c => c.cellId === action.payload.cellId ? newCell : c);
      const oldPulse_one = tempPulse.filter(op => op.pulseId === action.payload.pulseId)[0];
      const newPulse_one = { ...oldPulse_one, cells: newPulse_cells_SET_EDIT_CELL };
      const newpulseList = tempPulse
        .map(p => p.pulseId === action.payload.pulseId ? newPulse_one : p);
      return { ...currentState, ...{ currentBoard: { ...currentState.currentBoard, ...{ pulse: newpulseList }} } };
      // return { ...currentState, ...{ currentBoard: { ...currentState.currentBoard, ...{ pulse: action.payload.pulse } } } }
      // const targetCell = currentState.currentBoard.pulse.filter(p => p.pulseId === action.payload.pulseId)[0]
      //   .cells.filter(c => c.cellId === action.payload.cell.cellId)[0];
      // const updatedCell = Object.assign(targetCell, {
      //   cellId: action.payload.cell.cellId,
      //   headerId: action.payload.cell.headerId,
      //   cellLabelTxt: action.payload.cell.cellLabelTxt,
      //   color: action.payload.cell.color,
      //   createTime: targetCell.createTime
      // });
      // const oldPulse1 = currentState.currentBoard.pulse.filter(p => p.pulseId === action.payload.pulseId)[0];
      // const oldCellsList1 = currentState.currentBoard.pulse.filter(p => p.pulseId === action.payload.pulseId)[0]
      //   .cells;
      // const newCellsList1 = oldCellsList1.map(oc => oc.cellId === action.payload.cell.cellId ? updatedCell : oc);
      // const newPulse1 = { ...oldPulse1, cells: newCellsList1 };
      // const newPulseList1 = currentState.currentBoard.pulse.map(p => p.pulseId === action.payload.pulseId ? newPulse1 : p);
      // return { ...currentState, ...{ currentBoard: { ...currentState.currentBoard, ...{ pulse: newPulseList1 } } } };

    case ProcessMgtActionType.SET_ADD_NEW_LABEL:
      const oldPulseList_label = [...currentState.currentBoard.pulse];
      const oldPulse_One_label = oldPulseList_label.filter(opl => opl.pulseId === action.payload.pulseId)[0];
      const oldCellOne_label = oldPulse_One_label.cells.filter(c => c.cellId === action.payload.cellId)[0];
      const newCellOne_label = { ...oldCellOne_label, labels: [...oldCellOne_label.labels, action.payload.label] };
      const newCellList_One_label = oldPulse_One_label.cells.map(c => c.cellId === action.payload.cellId ? newCellOne_label : c);
      const newPulse_One_label = { ...oldPulse_One_label, cells: newCellList_One_label };
      const newPulseList_label = oldPulseList_label.map(o => o.pulseId === action.payload.pulseId ? newPulse_One_label : o);
      return { ...currentState, ...{ currentBoard: { ...currentState.currentBoard, ...{ pulse: newPulseList_label } } } };

      // return { ...currentState, ...{ currentBoard: { ...currentState.currentBoard, ...{ pulse: action.payload.pulse } } } };
      // const targetCell_ = currentState.currentBoard.pulse.filter(p => p.pulseId === action.payload.pulseId)[0]
      //   .cells.filter(c => c.cellId === action.payload.cellId)[0];
      // const targetCell_With_newLables = { ...targetCell_, labels: [...targetCell_.labels, action.payload.label] };
      // const oldPulse_ = currentState.currentBoard.pulse.filter(p => p.pulseId === action.payload.pulseId)[0];
      // const newPulse_with_new_label_and_cell = oldPulse_.cells.map(op => op.cellId === action.payload.cellId ? targetCell_With_newLables : op);
      // const newPulse_ = { ...oldPulse_, cells: newPulse_with_new_label_and_cell };
      // const newPulseList_ = currentState.currentBoard.pulse.map(p => p.pulseId === action.payload.pulseId ? newPulse_ : p);
      // return { ...currentState, ...{ currentBoard: { ...currentState.currentBoard, ...{ pulse: newPulseList_ } } } };

    case ProcessMgtActionType.SET_EDIT_LABEL:
      const tempPulsesList = [...currentState.currentBoard.pulse];
      const oldSinglePulse = tempPulsesList.filter(tp => tp.pulseId === action.payload.pulseId)[0];
      const oldSingleCell = oldSinglePulse.cells.filter(oc => oc.cellId === action.payload.cellId)[0];
      const oldSingleLabel = oldSingleCell.labels.filter(ol => ol.labelId === action.payload.labelId)[0];
      const newSingleLabel = {...oldSingleLabel, labelTxt: action.payload.label.labelTxt };
      const newSingleCell_withOnlyLabels = oldSingleCell.labels.map(l => l.labelId === action.payload.labelId ? newSingleLabel : l);
      const newSingleCell = {...oldSingleCell, labels: newSingleCell_withOnlyLabels};

      const newSinglePulse_WithOnlyCells = oldSinglePulse.cells.map(c => c.cellId === action.payload.cellId ? newSingleCell : c);
      const newSinglePulse = {...oldSinglePulse, cells: newSinglePulse_WithOnlyCells };     

      const newPulseList_AtEnd = tempPulsesList.map(p => p.pulseId === action.payload.pulseId ? newSinglePulse : p);
      return { ...currentState, ...{ currentBoard: { ...currentState.currentBoard, ...{ pulse: newPulseList_AtEnd } } } };
      // const targetCell__ = currentState.currentBoard.pulse.filter(p => p.pulseId === action.payload.pulseId)[0]
      //   .cells.filter(c => c.cellId === action.payload.cellId)[0];
      // const updatedLables = targetCell__.labels.map(l => l.labelId === action.payload.label.labelId ? action.payload.label : l);
      // const updatedTargetCell = { ...targetCell__, labels: updatedLables }
      // const oldPulse__ = currentState.currentBoard.pulse.filter(p => p.pulseId === action.payload.pulseId)[0];
      // const updatedTargetCellWithPulse = oldPulse__.cells.map(op => op.cellId === action.payload.cellId ? updatedTargetCell : op);
      // const newPulse__ = { ...oldPulse__, cells: updatedTargetCellWithPulse };
      // const newPulseList__ = currentState.currentBoard.pulse.map(p => p.pulseId === action.payload.pulseId ? newPulse__ : p);
      // return { ...currentState, ...{ currentBoard: { ...currentState.currentBoard, ...{ pulse: newPulseList__ } } } };

      // return { ...currentState, ...{ currentBoard: { ...currentState.currentBoard, ...{ pulse: action.payload.pulse } } } };

    case ProcessMgtActionType.SET_DELETE_LABEL:
      const newLabelList = currentState.currentBoard.pulse.filter(p => p.pulseId === action.payload.pulseId)[0]
        .cells.filter(c => c.cellId === action.payload.cellId)[0]
        .labels.filter(l => l.labelId !== action.payload.labelId);
      const oldCell1 = currentState.currentBoard.pulse.filter(p => p.pulseId === action.payload.pulseId)[0]
        .cells.filter(c => c.cellId === action.payload.cellId)[0];
      const newCell1 = { ...oldCell1, labels: newLabelList };
      const newCellsList = currentState.currentBoard.pulse.filter(p => p.pulseId === action.payload.pulseId)[0]
        .cells.map(c => c.cellId === action.payload.cellId ? newCell1 : c);
      const oldPulse_before_delete_label = currentState.currentBoard.pulse.filter(p => p.pulseId === action.payload.pulseId)[0];
      const newPulse_after_delete_label = { ...oldPulse_before_delete_label, cells: newCellsList };
      const newPulseList_after_delete_label = currentState.currentBoard.pulse.map(p => p.pulseId === action.payload.pulseId ? newPulse_after_delete_label : p);
      return { ...currentState, ...{ currentBoard: { ...currentState.currentBoard, ...{ pulse: newPulseList_after_delete_label } } } };
      // return { ...currentState, ...{ currentBoard: { ...currentState.currentBoard, ...{ pulse: action.payload.pulse } } } };

    case ProcessMgtActionType.SET_ADD_MEMBER_TO_BOARD:
      return { ...currentState, ...{ currentBoard: { ...currentState.currentBoard, ...{ members: action.payload.user } } } };

    case ProcessMgtActionType.SET_REMOVE_MEMBER_FROM_BOARD:
      return { ...currentState, ...{ currentBoard: { ...currentState.currentBoard, ...{ members: action.payload.members } } } };

    case ProcessMgtActionType.SET_LOGGEDIN_USER:
      const currentUser: GoogleUser = {
        userId: action.payload.googleId,
        userDisplayName: action.payload.userDisplayName,
        userEmail: action.payload.userEmail,
        profileImgUrl: action.payload.profileImgUrl,
      }
      return {...currentState, ...{loggedinUser: currentUser}};
    
    case ProcessMgtActionType.SHOW_LOADING_ACTION:
      return { ...currentState, showLoader: true };
    case ProcessMgtActionType.REMOVE_LOADING_ACTION:
      return { ...currentState, showLoader: false };

    default:
      return currentState;

  }
};

export default ProcessManagementReducer;