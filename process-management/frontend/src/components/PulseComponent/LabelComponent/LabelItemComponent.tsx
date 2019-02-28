import React, {Component, Fragment} from 'react';
import { Label } from '../../../store/types';
import { TextField, Button } from '@material-ui/core';

interface LabelItemComponentProps {
    label: Label,
    selectedBoardId: String,
    selectedPulseId: String,
    selectedCellId: String,
   editLabelSaga: any,
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
    handelShowEditLabel= () => {
        this.setState({showEditLabel: true});
    }
   
    handelEditLabelText =(e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ editLabelText: e.target.value });
    }

    handelEditLabel= (e: React.KeyboardEvent<HTMLInputElement>) => {
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
        }
    }

    setLabelColor = (labelColor: String) => {
        let names = ['label-item'];
        (labelColor === '')  ? names.push('color-gray-shadow') : names.push(`color-${labelColor}-shadow`);
        return names.join(' ');
    }


    render () {
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
                                <span onDoubleClick={this.handelShowEditLabel}>{this.props.label.labelTxt}</span> 
                            )}
                </div>

               </div>
            </Fragment>
        )
    }
 }