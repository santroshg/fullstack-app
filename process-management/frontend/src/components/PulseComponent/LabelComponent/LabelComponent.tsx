import React, { Component, Fragment } from 'react';
import { Label } from '../../../store/types';
import { TextField, Button, Radio } from '@material-ui/core';
import LabelItemComponent from './LabelItemComponent';
import { CirclePicker } from 'react-color';

interface LabelComponentProps {
    labels: Label[],
    selectedBoardId: String,
    selectedPulseId: String,
    selectedCellId: String,
    addNewLabelSaga: any,
    editLabelSaga: any,
    deleteLabelSaga: any,
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
                color: this.state.selectedColor,
            }
            console.log('label', label);
            this.props.addNewLabelSaga(boardId, pulseId, cellId, label);
            this.setState({ showAddLabel: false });
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
                                <LabelItemComponent key={label.labelId as string} label={label} selectedBoardId={this.props.selectedBoardId} selectedPulseId={this.props.selectedPulseId} selectedCellId={this.props.selectedCellId} editLabelSaga={this.props.editLabelSaga} deleteLabelSaga={this.props.deleteLabelSaga}/>
                            ))}
                        </div>
                        <div className='add-label-wrapper'>
                            {this.state.showAddLabel ? (
                                <div>

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
                                    <Radio
                                        checked={this.state.selectedColor === 'green'}
                                        onChange={this.handleColorChange}
                                        value="green"
                                        className="radio-button-green"
                                        name="radio-button-demo"
                                        aria-label="Green"
                                    /> : Green
                                    <Radio
                                        checked={this.state.selectedColor === 'red'}
                                        onChange={this.handleColorChange}
                                        value="red"
                                        name="radio-button-demo"
                                        aria-label="red"
                                    /> : Red
                                    <Radio
                                        checked={this.state.selectedColor === 'orange'}
                                        onChange={this.handleColorChange}
                                        value="orange"
                                        name="radio-button-demo"
                                        aria-label="orange"
                                    />: Orange
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