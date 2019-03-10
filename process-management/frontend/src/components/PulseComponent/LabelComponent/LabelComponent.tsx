import React, { Component, Fragment } from 'react';
import { Label } from '../../../store/types';
import { TextField, Button, Radio } from '@material-ui/core';
import LabelItemComponent from './LabelItemComponent';

interface LabelComponentProps {
    labels: Label[],
    selectedBoardId: String,
    selectedPulseId: String,
    selectedCellId: String,
    editCellSaga: any,
    addNewLabelSaga: any,
    editLabelSaga: any,
    deleteLabelSaga: any,
    handlePopoverClose: any,
}
interface LabelComponentState {
    addLabelText: String,
    showAddLabel: Boolean,
    selectedColor: String,
}

export default class LabelComponent extends Component<LabelComponentProps, LabelComponentState> {
    constructor(props: LabelComponentProps) {
        super(props);
        this.state = {
            addLabelText: '',
            showAddLabel: false,
            selectedColor: '',
        }
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
            const label = {
                labelTxt: this.state.addLabelText,
                color: this.state.selectedColor,
            }
            this.props.addNewLabelSaga(boardId, pulseId, cellId, label);
            this.setState({ showAddLabel: false });
            this.setState({ addLabelText: '' });
        }
    }
    handleColorChange = (e: any) => {
        this.setState({ selectedColor: e.target.value });
    };

    render() {
        return (
            <Fragment>
                <div className='label-component-container'>
                    <div className='label-component-wrapper'>
                        <div className='label-item-component'>
                            {this.props.labels.map((label) => (
                                <LabelItemComponent key={label.labelId as string} label={label} handlePopoverClose={this.props.handlePopoverClose} selectedBoardId={this.props.selectedBoardId} selectedPulseId={this.props.selectedPulseId} selectedCellId={this.props.selectedCellId} editCellSaga={this.props.editCellSaga} editLabelSaga={this.props.editLabelSaga} deleteLabelSaga={this.props.deleteLabelSaga} />
                            ))}
                        </div>
                        <div className='add-label-wrapper'>
                            {this.state.showAddLabel ? (
                                <div>
                                    Color:
                                    G<Radio
                                        checked={this.state.selectedColor === 'green'}
                                        onChange={this.handleColorChange}
                                        value="green"
                                        className="radio-button-green"
                                        name="radio-button-demo"
                                        aria-label="Green"
                                    /> 
                                    R<Radio
                                        checked={this.state.selectedColor === 'red'}
                                        onChange={this.handleColorChange}
                                        value="red"
                                        name="radio-button-demo"
                                        aria-label="red"
                                    />
                                    O<Radio
                                        checked={this.state.selectedColor === 'orange'}
                                        onChange={this.handleColorChange}
                                        value="orange"
                                        name="radio-button-demo"
                                        aria-label="orange"
                                    />
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
                                    {/* <CirclePicker /> */}

                                </div>


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