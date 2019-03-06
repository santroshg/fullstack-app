import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { Board } from '../../store/types';
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
    editPulseSaga?: any,
    deletePulseSaga?: any,
    addColumnSaga?: any,
    editColumnSaga?: any,
    deleteColumnSaga?: any,
    currentBoardId?: String,
    editCellSaga: any,
    addNewLabelSaga: any,
    editLabelSaga: any,
    deleteLabelSaga?: any,
}

export default class BoardComponent extends React.Component<BoardProps, any> {
    constructor(props: BoardProps) {
        super(props);
        this.state = {
            needPulseCreateTxtBox: false,
            newPulseTxt: '',
            addColumnDialog: false,
        }
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
        return (

            this.props.currentBoard ? (
                <div className='borad-component-wrapper'>
                    <div className='board-header-component'>
                        <div className='board-header-wrapper'>
                            <div className='board-header-text'>
                            <h3>{this.props.currentBoard.boardName}</h3>
                            </div>
                            <div className='board-header-members'>

                                <MembersDialog currentBoard={this.props.currentBoard}
                                    addMemberToBoardSaga={this.props.addMemberToBoardSaga}
                                    removeMemberToBoardSaga={this.props.removeMemberToBoardSaga} />
                            </div>
                        </div>
                    </div>

                    <div className="board-pulse-component">
                        {this.props.currentBoard.pulse.length > 0 ? (
                            <div className='progress-header-component'>
                                <div className='progress-header-wrapper'>
                                    {this.props.currentBoard.progressHeader.map((header, i) =>
                                        <ProgressHeaderComponent key={i} progressHeader={header} currentBoardId={this.props.currentBoard.boardId} editColumnSaga={this.props.editColumnSaga} deleteColumnSaga={this.props.deleteColumnSaga} />
                                    )}
                                </div>
                                <div className='progress-header-add'>
                                    <AddColumnComponent currentBoardId={this.props.currentBoard.boardId} addColumnSaga={this.props.addColumnSaga} />
                                </div>
                            </div>
                        ) : (null)}

                        <div className='pulse-component'>
                            {this.props.currentBoard.pulse.map((pulse, i) => (
                                <PulseComponent key={i} pulse={pulse} editPulseSaga={this.props.editPulseSaga} deletePulseSaga={this.props.deletePulseSaga} selectedBoardId={this.props.currentBoard.boardId} editCellSaga={this.props.editCellSaga} addNewLabelSaga={this.props.addNewLabelSaga} editLabelSaga={this.props.editLabelSaga} deleteLabelSaga={this.props.deleteLabelSaga} />
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