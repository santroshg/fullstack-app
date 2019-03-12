import * as React from 'react';
import { BoardItem, ProcessManagementState, Board, User, PulseItem, ProgressHeader, Label, GoogleUser, CellItem } from '../../store/types';
import { Dispatch } from 'redux';
import { getBoardsListAction, addBoardAction, getBoardDetailsAction, addMemberToBoardAction, removeMemberToBoardAction, addPulseAction, deletePulseAction, addColumnAction, editPulseAction, setEditPulseAction, editColumnAction, addNewLabelAction, editLabelAction, deleteLabelAction, deleteBoardAction, editBoardAction, editCellAction, deleteColumnAction, resetErrorMessageAction } from '../../store/actions';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Edit from '@material-ui/icons/Edit';
import AddBoardDialog from '../BoardListComponent/AddBoardDialog';
import BoardComponent from '../BoardComponent/BoardComponent';
import { addColumn } from '../../store/sagas';
import DeleteBoardDialog from '../BoardListComponent/DeleteBoardDialog';
import Assignment from '@material-ui/icons/Assignment';
import { TextField, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions } from '@material-ui/core';
import NoboardSelectedMsg from './NoboardSelectedMsg';

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
    deleteColumnSaga: any,
    editCellSaga: any,
    addNewLabelSaga: any,
    editLabelSaga: any,
    deleteLabelSaga: any,
    loggedinUser: GoogleUser,
    deleteBoardSaga: any,
    editBoardSaga: any,
    errorMessage: String,
    resetErrorMessage: any,
    showLoader: Boolean,
}

export class BoardListComponent extends React.PureComponent<BoardListProps, any> {

    state = {
        currentBoatdId: '',
        showBoardEditbox: false,
        targetEditBoardid: '',
        updateBoardName: '',
        open: true,
    }

    componentDidMount() {
        if (!this.props.boardList) {
            this.props.getBoardsListFromSaga(this.props.loggedinUser.userId);
        }
    }

    handleAddNewBoard = () => {

    }

    getBoardAsCurrentBoard = (board: BoardItem) => {
        this.setState({ currentBoatdId: board.boardId });
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
        this.setState({ updateBoardName: e.target.value });
    }

    updateBoardName = (e: any, board: BoardItem) => {
        if (e.key === 'Enter' && this.state.updateBoardName !== '') {
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

    handleOk = () => {
        this.props.resetErrorMessage();
        this.setState({ open: true });
    }

    public render() {
        // console.log('this.props.currentBoard--------------', this.props.currentBoard);
        return (
            <div className='board-list-component'>
                <div className='board-list-wrapper'>

                    <List>
                        <ListItem className=''>
                            <ListItemIcon>
                                <Assignment />
                            </ListItemIcon>
                            <ListItemText>
                                <h3>Boards</h3>
                            </ListItemText>
                            <AddBoardDialog addBoardFromSaga={this.props.addBoardFromSaga} loggedinUser={this.props.loggedinUser} />
                        </ListItem>
                        <Divider />
                        {this.props.boardList ?
                            this.props.boardList.map(board => (
                                <ListItem  className='board-list-item' button key={board.boardId as string} onClick={this.getBoardAsCurrentBoard.bind(null, board)}>
                                    {/* <ListItemIcon><SettingsInputAntenna /></ListItemIcon> */}
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
                                                <ListItemText className='board-list-item-text' primary={board.boardName} />
                                                <div className="board-action">
                                                    <Tooltip title="edit board">
                                                        <IconButton aria-label="edit board" onClick={e => this.handleEditBoardBox(board)}>
                                                            <Edit fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <DeleteBoardDialog board={board} deleteBoardResponse={this.deleteBoardResponse.bind(this)} />
                                                </div>
                                            </React.Fragment>
                                        )
                                    }
                                </ListItem>
                            )) : <p>No Boards, Please create</p>
                        }

                    </List>
                    {/* <Divider /> */}

                </div>
                <div className='board-component'>
                {this.props.showLoader ? (
                    // <div className="loader"></div>
                    <div className="lds-hourglass"></div>
                ) : (
                    <div className="main-board">
                        {this.props.currentBoard ? (
                            <BoardComponent currentBoard={this.props.currentBoard}
                            addMemberToBoardSaga={this.props.addMemberToBoardSaga}
                            removeMemberToBoardSaga={this.props.removeMemberToBoardSaga}
                            addPulseSaga={this.props.addPulseSaga}
                            editPulseSaga={this.props.editPulseSaga}
                            deletePulseSaga={this.props.deletePulseSaga}
                            addColumnSaga={this.props.addColumnSaga}
                            editColumnSaga={this.props.editColumnSaga}
                            deleteColumnSaga={this.props.deleteColumnSaga}
                            editCellSaga={this.props.editCellSaga}
                            addNewLabelSaga={this.props.addNewLabelSaga}
                            editLabelSaga={this.props.editLabelSaga}
                            deleteLabelSaga={this.props.deleteLabelSaga}
                            />
                        ) : (
                            <NoboardSelectedMsg />
                        )}
                </div>
                )}
                </div>
                {this.props.errorMessage !== '' ? (
                    <Dialog
                        disableBackdropClick
                        disableEscapeKeyDown
                        open={this.state.open}
                        onClose={this.handleOk}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Add board error</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.errorMessage}
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleOk} color="primary">
                            Ok
                        </Button>
                        </DialogActions>
                    </Dialog>
                ) : (
                    <React.Fragment />
                ) }
            </div>
        );
    }
}

const connectStateToProps = (state: ProcessManagementState) => ({
    boardList: state.boardList,
    currentBoard: state.currentBoard,
    loggedinUser: state.loggedinUser,
    errorMessage: state.errorMessage,
    showLoader: state.showLoader,
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
    deleteColumnSaga: (boardId: String, headerId: String, headerColumnId: String) => dispatch(deleteColumnAction(boardId, headerId, headerColumnId)),
    //  editPulse : (boardId: String, pulseId: String, pulseTxt: String) => dispatch(setEditPulseAction(boardId, pulseId, pulseTxt)),
    editPulseSaga: (boardId: String, pulseId: String, pulseTxt: String) => dispatch(editPulseAction(boardId, pulseId, pulseTxt)),
    editCellSaga: (boardId: String, pulseId: String, cellId: String, cell: CellItem) => dispatch(editCellAction(boardId, pulseId, cellId, cell)),
    addNewLabelSaga: (boardId: String, pulseId: String, cellId: String, label: String) => dispatch(addNewLabelAction(boardId, pulseId, cellId, label)),
    editLabelSaga: (boardId: String, pulseId: String, cellId: String, labelId: String, label: Label) => dispatch(editLabelAction(boardId, pulseId, cellId, labelId, label)),
    deleteLabelSaga: (boardId: String, pulseId: String, cellId: String, labelId: String) => dispatch(deleteLabelAction(boardId, pulseId, cellId, labelId)),
    deleteBoardSaga: (boardId: String) => dispatch(deleteBoardAction(boardId)),
    editBoardSaga: (updatedBoard: BoardItem) => dispatch(editBoardAction(updatedBoard)),
    resetErrorMessage: () => dispatch(resetErrorMessageAction()),
});

export default connect(connectStateToProps, connectDispatchToProps)(BoardListComponent);