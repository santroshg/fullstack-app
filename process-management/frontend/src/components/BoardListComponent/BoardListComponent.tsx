import * as React from 'react';
import { BoardItem, ProcessManagementState, Board, User, PulseItem } from '../../store/types';
import { Dispatch } from 'redux';
import { getBoardsListAction, addBoardAction, getBoardDetailsAction, addMemberToBoardAction, removeMemberToBoardAction, addPulseAction, deletePulseAction } from '../../store/actions';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsInputAntenna from '@material-ui/icons/SettingsInputAntenna';
import AddBoardDialog from '../BoardDialog/AddBoardDialog';
import { styles } from './BoardListComponentStyle';
import BoardComponent from '../BoardComponent/BoardComponent';

export interface BoardListProps {
    boardList: BoardItem[],
    currentBoard: Board,
    getBoardsListFromSaga: any,
    addBoardFromSaga: any,
    getBoardDetailsSaga: any,
    addMemberToBoardSaga: any,
    removeMemberToBoardSaga: any,
    addPulseSaga: any,
    deletePulseSaga: any
}

export class BoardListComponent extends React.Component<BoardListProps, any> {

    state = {
        currentBoatdId: '',
    }

    componentDidMount() {
        if(!this.props.boardList) {
            this.props.getBoardsListFromSaga();
        }
        // if(!this.props.currentBoard) {
        //     this.props.getBoardDetailsSaga(this.state.currentBoatdId);
        // }
    }

    handleAddNewBoard = () => {

    }

    getBoardAsCurrentBoard = (board: BoardItem) => {
        this.setState({currentBoatdId: board.boardId});
        this.props.getBoardDetailsSaga(board.boardId);
    }

    public render() {
        return (
            // this.props.boardList ? <ul>
            //     {this.props.boardList.map(i => <li key={i.boardId as string}>{i.boardName}</li>)}
            // </ul> : <div>No Board Present</div>

        <div style={styles.WrapSidebarAndBoady}>
        <div style={styles.sideBar}>
            <List>
                <Typography variant="h5" color="inherit" noWrap style={styles.boardList}>
                    <div>
                    <strong>Your Boards</strong>
                    </div>
                    <div>
                        <AddBoardDialog addBoardFromSaga={this.props.addBoardFromSaga} />
                    </div>
                </Typography>
                <Divider />
                {this.props.boardList ? 
                this.props.boardList.map(board => (
                    <ListItem button key={board.boardId as string} onClick={this.getBoardAsCurrentBoard.bind(null, board)}>
                    <ListItemIcon><SettingsInputAntenna /></ListItemIcon>
                    <ListItemText primary={board.boardName} />
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
                deletePulseSaga={this.props.deletePulseSaga}
            />
        </div>
        </div>
        );
    }
}

const connectStateToProps = (state: ProcessManagementState) => ({
    boardList: state.boardList,
    currentBoard: state.currentBoard,
});

const connectDispatchToProps = (dispatch: Dispatch) => ({
    getBoardsListFromSaga: () => dispatch(getBoardsListAction()),
    addBoardFromSaga: (newBoard: BoardItem) => dispatch(addBoardAction(newBoard)),
    getBoardDetailsSaga: (boardId: String) => dispatch(getBoardDetailsAction(boardId)),
    addMemberToBoardSaga: (boardId: String, user: User) => dispatch(addMemberToBoardAction(boardId, user)),
    removeMemberToBoardSaga: (boardId: String, userId: String) => dispatch(removeMemberToBoardAction(boardId, userId)),
    addPulseSaga: (boardId: String, pulse: PulseItem) => dispatch(addPulseAction(boardId, pulse)),
    deletePulseSaga: (boardId: String, pulseId: String) => dispatch(deletePulseAction(boardId, pulseId)),
});

export default connect(connectStateToProps, connectDispatchToProps)(BoardListComponent);
