import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Pulse } from '../../store/types';
import { styles } from './PulseComponentStyle';
import PulseCell from './PulseCell/PulseCell';
import Typography from '@material-ui/core/Typography';

interface PulseComponentProps {
    pulse?: Pulse,

}
export default class PulseComponent extends React.Component<PulseComponentProps> {
    constructor(props: PulseComponentProps) {
        super(props);
        console.log('PulseComponentProps', this.props.pulse);
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
            </div>
        );
    }
}