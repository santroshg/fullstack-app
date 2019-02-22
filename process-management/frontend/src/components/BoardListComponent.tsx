import * as React from 'react';
import { BoardItem, ProcessManagementState } from '../store/types';
import { Dispatch } from 'redux';
import { getBoardsListAction } from '../store/actions';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsInputAntenna from '@material-ui/icons/SettingsInputAntenna';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


export interface BoardListProps {
    boardList: BoardItem[],
    getBoardsListFromSaga: any,
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


        <div style={{width: '22%', height: '100vh', border: '1px solid blue', overflowY: 'auto'}}>
        
        <List>
            <Typography variant="h5" color="inherit" noWrap style={{marginLeft: 10, color: 'blue'}}>
              <strong>Your Boards</strong>
                <Fab variant="extended" aria-label="Add" style={{marginLeft: 80, marginBottom: 10}}>
                    <AddIcon onClick={this.handleAddNewBoard.bind(this)} />
                </Fab>
              
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
    getBoardsListFromSaga: () => dispatch(getBoardsListAction())
})

export default connect(connectStateToProps, connectDispatchToProps)(BoardListComponent);