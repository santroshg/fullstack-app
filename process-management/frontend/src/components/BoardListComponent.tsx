import * as React from 'react';
import { BoardItem, ProcessManagementState } from '../store/types';
import { Dispatch } from 'redux';
import { getBoardsListAction } from '../store/actions';
import { connect } from 'react-redux';

export interface BoardListProps {
    boardList: BoardItem[],
    getBoardsList: any,
}

export class BoardListComponent extends React.Component<BoardListProps, any> {
    componentDidMount() {
        if(!this.props.boardList) {
            this.props.getBoardsList();
        }
    }

    public render() {
        return (
            this.props.boardList ? <ul>
                {this.props.boardList.map(i => <li key={i.boardId as string}>{i.boardName}</li>)}
            </ul> : <div>No Board Present</div>
        );
    }
}

const connectStateToProps = (state: ProcessManagementState) => ({
    boardList: state.boardList,
});

const connectDispatchToProps = (dispatch: Dispatch) => ({
    getBoardsList: () => dispatch(getBoardsListAction())
})

export default connect(connectStateToProps, connectDispatchToProps)(BoardListComponent);