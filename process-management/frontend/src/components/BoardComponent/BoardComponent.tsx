import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { Board } from '../../store/types';
import { styles } from './BoardComponentStyle';
import ProgressHeaderComponent from '../ProgressHeader/ProgressHeaderComponent';
import PulseComponent from '../PulseComponent/PulseComponent';
import MembersDialog from './Members/MembersDialog';
import { Button } from '@material-ui/core';
import { timingSafeEqual } from 'crypto';
import AddColumnComponent from '../ProgressHeader/AddColumnComponent';

export interface BoardProps {
    currentBoard?: Board,
    addMemberToBoardSaga?: any,
    removeMemberToBoardSaga?: any,
    addPulseSaga?: any,
    deletePulseSaga?: any,
    addColumnSaga?: any,
}

export default class BoardComponent extends React.PureComponent<BoardProps, any> {
    constructor(props: BoardProps) {
        super(props);
        this.state = {
            needPulseCreateTxtBox: false,
            newPulseTxt: '',
            addColumnDialog: false,
        }
        // console.log('currentBoard', this.props.currentBoard);
        // console.log('this.props.currentBoard.pulse', this.props.currentBoard);
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
        if (e.key === 'Enter' && this.state.newPulseTxt !== '') {
            const addPulseData = {
                "pulseCreatedBy": "",
                "pulseTxt": this.state.newPulseTxt,
            }
            this.props.addPulseSaga(this.props.currentBoard.boardId, addPulseData)
            this.setState({
                newPulseTxt: '',
                needPulseCreateTxtBox: false,
            });
        }
    }

    public render() {
        {console.log('this.props.currentBoard', this.props.currentBoard)}
        return (

            this.props.currentBoard ? (
                <div className='borad-component-wrapper'>
                    <Grid className='board-header-component'>
                        <Paper style={styles.boardHeaderFlex}>
                            <Typography variant="h5" gutterBottom style={styles.boardEmptyMsg}>
                                {this.props.currentBoard.boardName}
                            </Typography>

                            <MembersDialog currentBoard={this.props.currentBoard}
                                addMemberToBoardSaga={this.props.addMemberToBoardSaga}
                                removeMemberToBoardSaga={this.props.removeMemberToBoardSaga} />

                        </Paper>
                    </Grid>

                    <div className="board-pulse-component">
                        {this.props.currentBoard.pulse.length > 0 ? (
                            <div className='progress-header-component'>
                                <div className='progress-header-wrapper'>
                                    {this.props.currentBoard.progressHeader.map((header, i) =>
                                        <ProgressHeaderComponent key={i} progressHeader={header} />
                                    )}
                                </div>
                                <div className='progress-header-add'>
                                    <AddColumnComponent currentBoardId={this.props.currentBoard.boardId} addColumnSaga={this.props.addColumnSaga} />
                                </div>
                            </div>
                        ) : (null)}

                        <div className='pulse-component'>
                            {this.props.currentBoard.pulse.map((pulse, i) => (
                                <PulseComponent key={i} pulse={pulse} deletePulseSaga={this.props.deletePulseSaga} selectedBoardId={this.props.currentBoard.boardId} />
                            ))}
                            <div className='add-pulse-wrapper'>
                                {this.state.needPulseCreateTxtBox ? (
                                    <TextField
                                        required
                                        autoFocus
                                        id="standard-required"
                                        label="Required"
                                        placeholder="New Item/Pulse name"
                                        margin="normal"
                                        fullWidth
                                        value={this.state.newPulseTxt}
                                        onChange={this.handlePulseTxtEntered.bind(this)}
                                        onKeyPress={this.handleAddNewPulse.bind(this)}
                                    />
                                ) : (
                                        <Button onClick={this.handlePulseAddTextBox.bind(this)}>Add New Pulse</Button>
                                    )}
                            </div>
                        </div>
                    </div>

                    {/* <div style={styles.progressHeaderLine}>
                        <ul style={styles.progressHraderTxtUL}>
                            <li style={styles.FirstCol}>

                                <Typography variant="title" noWrap>
                                    Items
                            </Typography>
                            </li>
                            {this.props.currentBoard.progressHeader
                                .map(ph =>
                                    <li style={styles.progressHraderTxtLI} key={ph.headerId as string}>
                                        <ProgressHeaderComponent progressHeader={ph} />
                                    </li>
                                )}
                        </ul>
                        <Fab variant="extended" size="small" color="secondary" aria-label="Add">
                            <AddIcon />
                        </Fab>
                    </div> */}
                    {/* <div>
                        <ul style={styles.pulseUL}>
                            {this.props.currentBoard.pulse.map(pl => (
                                <li key={pl.pulseId as string} style={styles.pulseLI}>
                                    <PulseComponent currentBoardPulse={pl} />
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



                    </div> */}
                </div>
            ) : (null)

        );
    }
}