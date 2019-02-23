import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Board } from '../../store/types';
import { styles } from './BoardComponentStyle';
import ProgressHeaderComponent from '../ProgressHeader/ProgressHeaderComponent';
import PulseComponent from '../PulseComponent/PulseComponent';

export interface BoardProps {
    currentBoard?: Board,
}

export default class BoardComponent extends React.Component<BoardProps, any> {
    public render() {
        return (
            this.props.currentBoard ? (
                <div>
                    <Grid style={styles.boardHeader}>
                        <Paper>
                            <Typography variant="h5" gutterBottom style={styles.boardEmptyMsg}>
                                {this.props.currentBoard.boardName}
                            </Typography>
                            
                        </Paper>
                    </Grid>
                    
                    {/* <Divider /> */}
                    <div style={styles.progressHeaderLine}>
                        <ul style={styles.progressHraderTxtUL}>
                            <li style={styles.FirstCol}>
                            
                            <Typography variant="title" noWrap>
                                Items
                            </Typography>
                            </li>
                            {this.props.currentBoard.progressHeader
                                .map(ph => 
                                    <li style={styles.progressHraderTxtLI} key={ph.headerId as string}>
                                        <ProgressHeaderComponent progressHeader={ph}/>
                                    </li>
                            )}
                        </ul>
                        <Fab variant="extended" size="small" color="secondary" aria-label="Add">
                            <AddIcon />
                        </Fab>
                    </div>
                    <div>
                        <ul style={styles.pulseUL}>
                            {this.props.currentBoard.pulse.map(pl => (
                                <li key={pl.pulseId as string} style={styles.pulseLI}>
                                    <PulseComponent currentBoardPulse={pl}/>
                                </li>
                            ))}
                        </ul>
                        
                    </div>
                </div>
            ) : (<div><br /></div>)
            
        );
    }
}