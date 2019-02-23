import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { styles } from './PulseCellStyle';
import { Cells } from '../../../store/types';

interface PulseCellProps {
    cellData?: Cells,
}

export default class PulseCell extends React.Component<PulseCellProps> {
    render() {
        return (
            <Typography variant="body2" gutterBottom style={styles.cell}>
                {this.props.cellData.cellLabelTxt}
            </Typography>
        );
    }
}