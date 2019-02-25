import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

import { Board } from '../../store/types';
import { styles } from './BoardComponentStyle';
import ProgressHeaderComponent from '../ProgressHeader/ProgressHeaderComponent';
import PulseComponent from '../PulseComponent/PulseComponent';
import MembersDialog from './Members/MembersDialog';
import { Button } from '@material-ui/core';

export interface BoardProps {
    currentBoard?: Board,
    addMemberToBoardSaga?: any,
    removeMemberToBoardSaga?: any,
}

export default class BoardComponent extends React.Component<BoardProps, any> {
    state = {
        needPulseCreateTxtBox: false,
        newPulseTxt: '',
    }

    handlePulseAddTextBox = () => {
        this.setState({
            needPulseCreateTxtBox: true,
        });
    };

    handlePulseTxtEntered = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newPulseTxt: e.target.value,
        });
    };

    handleAddNewPulse = (e: any) => {
        if(e.key === 'Enter' && this.state.newPulseTxt !== '') {

            this.setState({
                newPulseTxt: '',
                needPulseCreateTxtBox: false,
            });
        }
    }

    public render() {
        return (
            this.props.currentBoard ? (
                <div>
                    <Grid style={styles.boardHeader}>
                        <Paper style={styles.boardHeaderFlex}>
                            <Typography variant="h5" gutterBottom style={styles.boardEmptyMsg}>
                                {this.props.currentBoard.boardName}
                            </Typography>

                            <MembersDialog currentBoard={this.props.currentBoard}
                              addMemberToBoardSaga={this.props.addMemberToBoardSaga}
                              removeMemberToBoardSaga={this.props.removeMemberToBoardSaga} />
                            
                        </Paper>
                    </Grid>

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
                        
                        {this.state.needPulseCreateTxtBox ? (
                            <TextField
                                required
                                autoFocus
                                id="standard-required"
                                label="Required"
                                placeholder="New Item/Pulse name"
                                margin="normal"
                                value={this.state.newPulseTxt}
                                onChange={this.handlePulseTxtEntered.bind(this)}
                                onKeyPress={this.handleAddNewPulse.bind(this)}
                            />
                        ) : (
                            <Button onClick={this.handlePulseAddTextBox.bind(this)}>Add New Pulse</Button>
                        )}




                    </div>
                </div>
            ) : (<div><br /></div>)
            
        );
    }
}