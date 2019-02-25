import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import { ProgressHeader } from '../../store/types';



import { styles } from './ProgressHeaderStyle';
import { Fragment } from 'react';

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
            <React.Fragment>
                <div className='column-header'>
                    {this.props.progressHeader.headerTxt}
                </div>
            </React.Fragment>
        );
    }
}