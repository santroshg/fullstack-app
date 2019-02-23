import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { ProgressHeader } from '../../store/types';



import { styles } from './ProgressHeaderStyle';

interface ProgressHeaderComponentProps {
    progressHeader?: ProgressHeader,
}

export default class ProgressHeaderComponent extends React.Component<ProgressHeaderComponentProps> {
    render() {
        return (
            // <div>{this.props.progressHeader.headerTxt}</div>
            <Typography variant="title" noWrap style={styles.header}>
                {this.props.progressHeader.headerTxt} 
            </Typography>
        );
    }
}