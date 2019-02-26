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

interface PulseComponentProps {
    pulse?: Pulse,
    deletePulseSaga?: any,
    selectedBoardId: String,

}
export default class PulseComponent extends React.Component<PulseComponentProps> {
    constructor(props: PulseComponentProps) {
        super(props);
        console.log('PulseComponentProps', this.props.pulse);
    }
    handleDeletePulse = (pulseId: any) => {
        // alert(pulseId);
        if (pulseId) {
            console.log('pulseId', pulseId)
            const boardId = this.props.selectedBoardId;
            this.props.deletePulseSaga(boardId, pulseId);
        }
    }
    render() {
        return (
            <Fragment>
                <div className='pulse-wrapper'>
                    <div className='pulse-cell-wrapper'>
                        <div className='pulse-cell'>{this.props.pulse.pulseTxt}</div>
                        {this.props.pulse.cells.map(cell => (
                            <PulseCell key={cell.cellId as string} cellData={cell} />
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