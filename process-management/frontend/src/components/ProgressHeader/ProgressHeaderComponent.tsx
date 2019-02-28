import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import { ProgressHeader } from '../../store/types';



import { styles } from './ProgressHeaderStyle';
import { Fragment } from 'react';
import { TextField } from '@material-ui/core';

interface ProgressHeaderComponentProps {
    progressHeader?: ProgressHeader,
    currentBoardId: String,
    editColumnSaga?: any,
}
interface ProgressHeaderComponentState {
    showProgressHeaderEdit: boolean,
    progressHeaderEditText: String,
}

export default class ProgressHeaderComponent extends React.Component<ProgressHeaderComponentProps, ProgressHeaderComponentState> {
    constructor(props: ProgressHeaderComponentProps) {
        super(props);
        this.state = {
            showProgressHeaderEdit: false,
            progressHeaderEditText: this.props.progressHeader.headerTxt,
        }
        console.log('this.props.progressHeader.', this.props.progressHeader)
    }

    setColumHeaderClass = (headerType: String) => {
        let names = ['column-header'];
        if (headerType === 'default') names.push('column-header-default');
        return names.join(' ');
    }
    handleshowProgressHeaderEdit = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        this.setState({ showProgressHeaderEdit: true });
    }
    handleProgressHeaderEditText = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ progressHeaderEditText: e.target.value })
    }
    handleProgressHeaderEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const boardId = this.props.currentBoardId;
            const headerTxt = this.state.progressHeaderEditText;
            const headerId = this.props.progressHeader.headerId;
            console.log('headerId=========', headerId)
            this.props.editColumnSaga(boardId, headerId, headerTxt);
            this.setState({ showProgressHeaderEdit: false });
        }
    }

    render() {
        return (
            <React.Fragment>

                <div className={this.setColumHeaderClass(this.props.progressHeader.headerType)}>
                    {this.state.showProgressHeaderEdit ? (<TextField
                        id="standard-bare"
                        type="text"
                        name="ProgressHeaderEdit"
                        margin="normal"
                        fullWidth
                        value={this.state.progressHeaderEditText as string}
                        onChange={this.handleProgressHeaderEditText}
                        onKeyPress={this.handleProgressHeaderEdit} />)
                        : (
                            <span onDoubleClick={this.handleshowProgressHeaderEdit} className='column-header-edit'> {this.props.progressHeader.headerTxt}</span>
                        )}

                </div>
            </React.Fragment>
        );
    }
}