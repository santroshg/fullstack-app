import * as React from 'react';
import { BoardItem, ProcessManagementState } from '../../store/types';
import { Dispatch } from 'redux';
import { getBoardsListAction, addBoardAction } from '../../store/actions';
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



export interface BoardListProps {
    boardList: BoardItem[],
    getBoardsListFromSaga: any,
    addBoardFromSaga: any,
}

export class BoardListComponent extends React.Component<BoardListProps, any> {

    componentDidMount() {
        if(!this.props.boardList) {
            this.props.getBoardsListFromSaga();
        }
    }

    handleAddNewBoard = () => {

    }

    makeCurrentBoard = (board: BoardItem) => {
        console.log('clicked board-', board);
    }

    public render() {
        return (
            // this.props.boardList ? <ul>
            //     {this.props.boardList.map(i => <li key={i.boardId as string}>{i.boardName}</li>)}
            // </ul> : <div>No Board Present</div>


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
                <ListItem button key={board.boardId as string} onClick={this.makeCurrentBoard.bind(null, board)}>
                  <ListItemIcon><SettingsInputAntenna /></ListItemIcon>
                  <ListItemText primary={board.boardName} />
                </ListItem>
              )) : <p>No Boards, Please create</p>
            }
          
        </List>
        <Divider />
      </div>
        );
    }
}

const connectStateToProps = (state: ProcessManagementState) => ({
    boardList: state.boardList,
});

const connectDispatchToProps = (dispatch: Dispatch) => ({
    getBoardsListFromSaga: () => dispatch(getBoardsListAction()),
    addBoardFromSaga: (newBoard: BoardItem) => dispatch(addBoardAction(newBoard)),
})

export default connect(connectStateToProps, connectDispatchToProps)(BoardListComponent);