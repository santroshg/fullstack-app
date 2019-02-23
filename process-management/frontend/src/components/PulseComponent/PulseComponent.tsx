import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Pulse } from '../../store/types';
import { styles } from './PulseComponentStyle';
import PulseCell from './PulseCell/PulseCell';
import Typography from '@material-ui/core/Typography';

interface PulseComponentProps {
    currentBoardPulse?: Pulse,

}
export default class PulseComponent extends React.Component<PulseComponentProps> {
    render() {
        return (
            <div style={styles.mainPulse}>
                <Typography variant="caption" gutterBottom align="center" style={styles.pulseTxt}>
                    {this.props.currentBoardPulse.pulseTxt}
                </Typography>
                {this.props.currentBoardPulse.cells.map(c => (
                   <PulseCell key={c.cellId as string} cellData={c} />
                ))}
            </div>
        );
    }
}