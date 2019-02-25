import * as React from 'react';
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
            <div className='pulse-wrapper'>
                <div className='pulse-cell'>{this.props.pulse.pulseTxt}</div>

                {/* <Typography variant="caption" gutterBottom align="center" style={styles.pulseTxt}>
                    {this.props.pulse.pulseTxt}
                </Typography> */}

                {this.props.pulse.cells.map(cell => (
                    <PulseCell key={cell.cellId as string} cellData={cell} />
                ))}

                <div className='pulse-delete'>
                    <Tooltip title="Delete pulse">
                        <IconButton aria-label="Delete">
                            <DeleteIcon fontSize="small" onClick={() => this.handleDeletePulse(this.props.pulse.pulseId)} />
                        </IconButton>
                    </Tooltip>

                </div>
            </div>
        );
    }
}