import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { ProgressHeader } from '../../store/types';



import { styles } from './ProgressHeaderStyle';

interface ProgressHeaderComponentProps {
    progressHeader?: ProgressHeader,
}

export default class ProgressHeaderComponent extends React.Component<ProgressHeaderComponentProps> {
    constructor(props: any) {
        super(props);
        console.log('this.props.progressHeader.', this.props.progressHeader)
    }

    render() {
        return (

            <div className='column-header'>
               { this.props.progressHeader.headerTxt} 
            </div>
            // <div>{this.props.progressHeader.headerTxt}</div>
            // <Typography variant="title" noWrap style={styles.header}>
            //     {this.props.progressHeader.headerTxt} 
            // </Typography>
        );
    }
}