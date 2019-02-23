import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { Board } from '../../store/types';
import { styles } from './BoardComponentStyle';

export interface BoardProps {
    currentBoard?: Board,
}

export default class BoardComponent extends React.Component<BoardProps, any> {
    public render() {
        {console.log('cur-----------', this.props.currentBoard)}
        return (
            this.props.currentBoard ? (
                <div style={styles.boardEmptyMsg}>
                    <Typography variant="h5" gutterBottom>
                    {this.props.currentBoard.boardName}
                    </Typography>
                </div>
            ) : (<div >Please select any boaed or create...</div>)
            
        );
    }
}