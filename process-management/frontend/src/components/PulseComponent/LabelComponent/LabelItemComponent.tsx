import React, { Component, Fragment } from 'react';
import { Label } from '../../../store/types';
import { TextField, Button, IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

interface LabelItemComponentProps {
    label: Label,
    selectedBoardId: String,
    selectedPulseId: String,
    selectedCellId: String,
    editCellSaga: any,
    editLabelSaga: any,
    deleteLabelSaga: any,
    handlePopoverClose: any,
}
interface LabelItemComponentState {
    editLabelText: String,
    showEditLabel: Boolean,
}

export default class LabelItemComponent extends Component<LabelItemComponentProps, LabelItemComponentState> {
    constructor(props: LabelItemComponentProps) {
        super(props);
        this.state = {
            editLabelText: this.props.label.labelTxt,
            showEditLabel: false
        }
        console.log('labelItem data ', this.props.label);
    }
    handelShowEditLabel = () => {
        this.setState({ showEditLabel: true });
    }

    handelEditLabelText = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ editLabelText: e.target.value });
    }

    handelEditLabel = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const boardId = this.props.selectedBoardId;
            const pulseId = this.props.selectedPulseId;
            const cellId = this.props.selectedCellId;
            const labelId = this.props.label.labelId;
            console.log('LabelItemComponent', boardId, pulseId, cellId);
            const label = {
                labelTxt: this.state.editLabelText,
                color: 'green',
            }
            this.props.editLabelSaga(boardId, pulseId, cellId, labelId, label);
            this.setState({ showEditLabel: false });
            this.setState({ editLabelText: this.props.label.labelTxt });
            this.props.handlePopoverClose();
        }
    }

    setLabelColor = (labelColor: String) => {
        let names = ['label-item'];
        (labelColor === '') ? names.push('color-gray-shadow') : names.push(`color-${labelColor}-shadow`);
        return names.join(' ');
    }

    handleDeleteLabel = (labelId: any) => {
        // alert(labelId);
        if (labelId) {
            const boardId = this.props.selectedBoardId;
            const pulseId = this.props.selectedPulseId;
            const cellId = this.props.selectedCellId;
            this.props.deleteLabelSaga(boardId, pulseId, cellId, labelId);
            this.setState({ showEditLabel: false });
            this.props.handlePopoverClose();
        }
    }

    handelEditCell = (label: any) => {
        const boardId = this.props.selectedBoardId;
        const pulseId = this.props.selectedPulseId;
        const cellId = this.props.selectedCellId;
        const cellData = {
            cellLabelTxt: label.labelTxt,
            color: label.color
        }
        console.log('label', label);
        this.props.editCellSaga(boardId, pulseId, cellId, cellData);
    }

    render() {
        return (
            <Fragment>
                <div className='label-item-wrapper'>
                    <div className={this.setLabelColor(this.props.label.color)}>
                        {this.state.showEditLabel ? (<TextField
                            id="standard-bare"
                            type="text"
                            name="editLabel"
                            margin="normal"
                            fullWidth
                            value={this.state.editLabelText as string}
                            onChange={this.handelEditLabelText}
                            onKeyPress={this.handelEditLabel} />)
                            : (
                                <div className='label-item-text' onClick={() => this.handelEditCell(this.props.label)} onDoubleClick={this.handelShowEditLabel}>{this.props.label.labelTxt}</div>
                            )}
                        <div className='label-item-delete'>
                            <Tooltip title="delete label">
                                <IconButton aria-label="delete label" onClick={() => this.handleDeleteLabel(this.props.label.labelId)}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>

                </div>
            </Fragment>
        )
    }
}