import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export interface NoboardSelectedMsgProps {}

export default class NoboardSelectedMsg extends React.PureComponent<NoboardSelectedMsgProps> {
    render() {
        return (
                <div className="empty-board">
                    <Typography variant="h5" component="h3">
                        Please select or create a board.
                    </Typography>
                </div>
        );
    }
}