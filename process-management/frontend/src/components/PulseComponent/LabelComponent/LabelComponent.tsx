import React, { Component, Fragment } from 'react';
import { Label } from '../../../store/types';
import { TextField, Button } from '@material-ui/core';
import LabelItemComponent from './LabelItemComponent';

interface LabelComponentProps {
    labels: Label[],
    selectedBoardId: String,
    selectedPulseId: String,
    selectedCellId: String,
    addNewLabelSaga: any,
    editLabelSaga: any,
}
interface LabelComponentState {
    addLabelText: String,
    showAddLabel: Boolean,
}

export default class LabelComponent extends Component<LabelComponentProps, LabelComponentState> {
    constructor(props: LabelComponentProps) {
        super(props);
        this.state = {
            addLabelText: '',
            showAddLabel: false
        }
        console.log('labels data ', this.props.labels);
    }
    handelShowAddLabel = () => {
        this.setState({ showAddLabel: true });
    }

    handelAddLabelText = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ addLabelText: e.target.value });
    }

    handelAddLabel = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const boardId = this.props.selectedBoardId;
            const pulseId = this.props.selectedPulseId;
            const cellId = this.props.selectedCellId;
            console.log('LabelComponent', boardId, pulseId, cellId);
            const label = {
                labelTxt: this.state.addLabelText,
                color: 'green',
            }
            this.props.addNewLabelSaga(boardId, pulseId, cellId, label);
            this.setState({ showAddLabel: false });
        }
    }

    render() {
        return (
            <Fragment>
                <div className='label-component-container'>
                    <div className='label-component-wrapper'>

                        <div className='label-item-component'>
                        {this.props.labels.map((label) => (
                             <LabelItemComponent key={label.labelId as string} label={label} selectedBoardId={this.props.selectedBoardId} selectedPulseId={this.props.selectedPulseId} selectedCellId={this.props.selectedPulseId} editLabelSaga={this.props.editLabelSaga} />
                        ))}
                        </div>
                        <div className='add-label-wrapper'>
                            {this.state.showAddLabel ? (
                                <TextField
                                    required
                                    autoFocus
                                    id="standard-required"
                                    label="Required"
                                    placeholder="add label"
                                    margin="normal"
                                    fullWidth
                                    value={this.state.addLabelText as string}
                                    onChange={this.handelAddLabelText}
                                    onKeyPress={this.handelAddLabel}
                                />
                            ) : (
                                    <Button onClick={this.handelShowAddLabel}>Add Label</Button>
                                )}
                        </div>
                    </div>

                </div>
            </Fragment>
        )
    }
}