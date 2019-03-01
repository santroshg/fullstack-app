import React, { Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Pulse } from '../../store/types';
import { styles } from './PulseComponentStyle';
import PulseCell from './PulseCell/PulseCell';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { TextField } from '@material-ui/core';


interface PulseComponentProps {
    pulse?: Pulse,
    editPulseSaga? : any,
    deletePulseSaga?: any,
    selectedBoardId: String,
    editCellSaga: any,
    addNewLabelSaga?: any,
    editLabelSaga?:any,
    deleteLabelSaga?: any,

}
interface PulseComponentState {
    showPulseCellEdit: boolean,
    pulseCellEditText: String,
}
export default class PulseComponent extends React.Component<PulseComponentProps, PulseComponentState> {
    constructor(props: PulseComponentProps) {
        super(props);
       // console.log('PulseComponentProps', this.props.pulse);
        this.state = {
            showPulseCellEdit: false,
            pulseCellEditText: this.props.pulse.pulseTxt,
        }
    }
    handleShowPulseCellEdit = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        this.setState({ showPulseCellEdit: true });
    }
    handlePulseCellEditText = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ pulseCellEditText: e.target.value })
    }
    handlePulseCellEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const boardId = this.props.selectedBoardId;
            const pulseId = this.props.pulse.pulseId;
            const pulseText = this.state.pulseCellEditText;
            this.props.editPulseSaga(boardId, pulseId, pulseText);
            this.setState({ showPulseCellEdit: false });
        }
    }
    handleDeletePulse = (pulseId: any) => {
        // alert(pulseId);
        if (pulseId) {
            console.log('pulseId', pulseId)
            const boardId = this.props.selectedBoardId;
            this.props.deletePulseSaga(boardId, pulseId);
            this.setState({ showPulseCellEdit: false });
        }
    }

    render() {
        return (
            <Fragment>
                <div className='pulse-wrapper'>
                    <div className='pulse-cell-wrapper'>
                        <div className='pulse-cell'>
                            {this.state.showPulseCellEdit ? (<TextField
                                id="standard-bare"
                                type="text"
                                name="PulseCellEdit"
                                margin="normal"
                                fullWidth
                                value={this.state.pulseCellEditText as string}
                                onChange={this.handlePulseCellEditText}
                                onKeyPress={this.handlePulseCellEdit} />) 
                            : (
                                <span onDoubleClick={this.handleShowPulseCellEdit} className='pulse-cell-edit'>{this.props.pulse.pulseTxt}</span>
                            )}
                        </div>
                        {this.props.pulse.cells.map(cell => (
                            <PulseCell key={cell.cellId as string} cellData={cell} selectedBoardId={this.props.selectedBoardId} selectedPulseId={this.props.pulse.pulseId} editCellSaga={this.props.editCellSaga} addNewLabelSaga={this.props.addNewLabelSaga}  editLabelSaga={this.props.editLabelSaga} deleteLabelSaga={this.props.deleteLabelSaga} />
                        ))}
                    </div>
                    <div className='pulse-delete'>
                        <Tooltip title="Delete pulse">
                            <IconButton aria-label="Delete" onClick={() => this.handleDeletePulse(this.props.pulse.pulseId)}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </Fragment>
        );
    }
}