import * as React from 'react';
import { BoardItem, ProcessManagementState, Board, User, PulseItem, ProgressHeader, Label, GoogleUser, CellItem } from '../../store/types';
import { Dispatch } from 'redux';
import { getBoardsListAction, addBoardAction, getBoardDetailsAction, addMemberToBoardAction, removeMemberToBoardAction, addPulseAction, deletePulseAction, addColumnAction, editPulseAction, setEditPulseAction, editColumnAction, addNewLabelAction, editLabelAction, deleteLabelAction, deleteBoardAction, editBoardAction, editCellAction } from '../../store/actions';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsInputAntenna from '@material-ui/icons/SettingsInputAntenna';
import Edit from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import AddBoardDialog from '../BoardDialog/AddBoardDialog';
import { styles } from './BoardListComponentStyle';
import BoardComponent from '../BoardComponent/BoardComponent';
import { addColumn } from '../../store/sagas';
import DeleteAlert from './DeleteAlert/DeleteAlert';

export interface BoardListProps {
    boardList: BoardItem[],
    currentBoard: Board,
    getBoardsListFromSaga: any,
    addBoardFromSaga: any,
    getBoardDetailsSaga: any,
    addMemberToBoardSaga: any,
    removeMemberToBoardSaga: any,
    addPulseSaga: any,
    editPulseSaga: any,
    deletePulseSaga: any,
    addColumnSaga: any,
    editColumnSaga: any,
    editCellSaga: any,
    addNewLabelSaga: any,
    editLabelSaga: any,
    deleteLabelSaga: any,
    loggedinUser: GoogleUser,
    deleteBoardSaga: any,
    editBoardSaga: any,
}

export class BoardListComponent extends React.PureComponent<BoardListProps, any> {

    state = {
        currentBoatdId: '',
        showBoardEditbox: false,
        targetEditBoardid: '',
        updateBoardName: '',
    }

    componentDidMount() {
        if(!this.props.boardList) {
            this.props.getBoardsListFromSaga(this.props.loggedinUser.userId);
        }
    }

    handleAddNewBoard = () => {

    }

    getBoardAsCurrentBoard = (board: BoardItem) => {
        this.setState({currentBoatdId: board.boardId});
        this.props.getBoardDetailsSaga(board.boardId);
    }

    handleEditBoardBox = (board: BoardItem) => {
        this.setState({
            showBoardEditbox: true,
            targetEditBoardid: board.boardId,
            updateBoardName: board.boardName
        });
    }

    handleChangeBoardName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({updateBoardName: e.target.value});
    }

    updateBoardName = (e: any, board: BoardItem) => {
        if(e.key === 'Enter' && this.state.updateBoardName !== '') {
            // saga call
            this.props.editBoardSaga({
                boardId: board.boardId,
                boardName: this.state.updateBoardName,
                boardDesc: board.boardDesc
            });
            this.setState({
                showBoardEditbox: false,
                targetEditBoardid: '',
                updateBoardName: '',
            });
        }
    }

    deleteBoardResponse = (response: Boolean, boardId: String) => {
        if (response) {
            this.props.deleteBoardSaga(boardId);
        }
    }

    public render() {
        return (
        <div style={styles.WrapSidebarAndBoady}>
        <div style={styles.sideBar}>
            <List>
                <Typography variant="h5" color="inherit" noWrap style={styles.boardList}>
                    <div>
                    <strong>Your Boards</strong>
                    </div>
                    <div>
                        <AddBoardDialog addBoardFromSaga={this.props.addBoardFromSaga}
                            loggedinUser={this.props.loggedinUser} />
                    </div>
                </Typography>
                <Divider />
                {this.props.boardList ? 
                this.props.boardList.map(board => (
                    <ListItem button key={board.boardId as string} onClick={this.getBoardAsCurrentBoard.bind(null, board)}>
                        <ListItemIcon><SettingsInputAntenna /></ListItemIcon>
                        {this.state.showBoardEditbox && this.state.targetEditBoardid === board.boardId ? (
                            <TextField
                                placeholder="Board Name"
                                fullWidth
                                autoFocus
                                margin="normal"
                                value={this.state.updateBoardName}
                                onChange={this.handleChangeBoardName.bind(this)}
                                onKeyPress={e => this.updateBoardName(e, board)}
                            />
                        ) : (
                            <React.Fragment>
                            <ListItemText primary={board.boardName}  /> 
                            <div className="board-action">
                                <Edit onClick={e => this.handleEditBoardBox(board)} />
                                
                                <DeleteAlert board={board} deleteBoardResponse={this.deleteBoardResponse.bind(this)} />
                                
                            </div>
                            </React.Fragment>
                        )
                        }
                    </ListItem>
                )) : <p>No Boards, Please create</p>
                }
            
            </List>
            <Divider />
        </div>
        <div className='board-component'>
            <BoardComponent currentBoard={this.props.currentBoard}
                addMemberToBoardSaga={this.props.addMemberToBoardSaga}
                removeMemberToBoardSaga={this.props.removeMemberToBoardSaga}
                addPulseSaga={this.props.addPulseSaga} 
                editPulseSaga={this.props.editPulseSaga}
                deletePulseSaga={this.props.deletePulseSaga}
                addColumnSaga={this.props.addColumnSaga}
                editColumnSaga={this.props.editColumnSaga}
                editCellSaga={this.props.editCellSaga}
                addNewLabelSaga={this.props.addNewLabelSaga}
                editLabelSaga={this.props.editLabelSaga}
                deleteLabelSaga={this.props.deleteLabelSaga}
            />
        </div>
        </div>
        );
    }
}

const connectStateToProps = (state: ProcessManagementState) => ({
    boardList: state.boardList,
    currentBoard: state.currentBoard,
    loggedinUser: state.loggedinUser,
});

const connectDispatchToProps = (dispatch: Dispatch) => ({
    getBoardsListFromSaga: (userId: String) => dispatch(getBoardsListAction(userId)),
    addBoardFromSaga: (newBoard: BoardItem, loggedinUser: GoogleUser) => dispatch(addBoardAction(newBoard, loggedinUser)),
    getBoardDetailsSaga: (boardId: String) => dispatch(getBoardDetailsAction(boardId)),
    addMemberToBoardSaga: (boardId: String, user: User) => dispatch(addMemberToBoardAction(boardId, user)),
    removeMemberToBoardSaga: (boardId: String, userId: String) => dispatch(removeMemberToBoardAction(boardId, userId)),
    addPulseSaga: (boardId: String, pulse: PulseItem) => dispatch(addPulseAction(boardId, pulse)),
    deletePulseSaga: (boardId: String, pulseId: String) => dispatch(deletePulseAction(boardId, pulseId)),
    addColumnSaga: (boardId: String, progressHeader: ProgressHeader) => dispatch(addColumnAction(boardId, progressHeader)),
    editColumnSaga: (boardId: String, headerId: String, headerTxt: String) => dispatch(editColumnAction(boardId, headerId, headerTxt)),
  //  editPulse : (boardId: String, pulseId: String, pulseTxt: String) => dispatch(setEditPulseAction(boardId, pulseId, pulseTxt)),
    editPulseSaga : (boardId: String, pulseId: String, pulseTxt: String) => dispatch(editPulseAction(boardId, pulseId, pulseTxt)),
    editCellSaga: (boardId: String, pulseId: String, cellId: String, cell:CellItem) => dispatch(editCellAction(boardId, pulseId, cellId, cell)),
    addNewLabelSaga: (boardId: String, pulseId: String, cellId: String, label: String) => dispatch(addNewLabelAction(boardId, pulseId, cellId, label)),
    editLabelSaga: (boardId: String, pulseId: String, cellId: String, labelId: String, label: Label) => dispatch(editLabelAction(boardId, pulseId, cellId, labelId, label)),
    deleteLabelSaga: (boardId: String, pulseId: String, cellId: String, labelId: String) => dispatch(deleteLabelAction(boardId, pulseId, cellId, labelId)),
    deleteBoardSaga: (boardId: String) => dispatch(deleteBoardAction(boardId)),
    editBoardSaga: (updatedBoard: BoardItem) => dispatch(editBoardAction(updatedBoard)),
});

export default connect(connectStateToProps, connectDispatchToProps)(BoardListComponent);