import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { styles } from './PulseCellStyle';
import { Cells } from '../../../store/types';
import { Popover, Button } from '@material-ui/core';
import LabelComponent from '../LabelComponent/LabelComponent';
import { any } from 'prop-types';

interface PulseCellProps {
    cellData?: Cells,
    selectedBoardId: String,
    selectedPulseId: String,
    addNewLabelSaga: any,
}

interface PulseCellState {
    anchorEl: any,
}
export default class PulseCell extends React.Component<PulseCellProps, PulseCellState> {
    constructor(props: PulseCellProps) {
        super(props);
        this.state = {
            anchorEl: null,
        }
        console.log('this.props.cellData.', this.props.cellData)
    }
    handleClick = (event: any) => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    setCellColor = (cellColor: String) => {
        let names = ['cell-wrapper'];
        if (cellColor === '') names.push('color-gray-shadow');
        return names.join(' ');
    }
    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl)
        return (
            <React.Fragment>
                <div className={this.setCellColor(this.props.cellData.color)} aria-owns={open ? 'simple-popper' : undefined} onClick={this.handleClick}>
                    <div className='cell-label-wrapper' aria-haspopup="true">
                        <div className='cell-label'>
                            {this.props.cellData.cellLabelTxt}
                        </div>
                    </div>
                </div>
                <Popover
                    id="simple-popper"
                    open={open}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <LabelComponent labels={this.props.cellData.labels} selectedBoardId={this.props.selectedBoardId} selectedPulseId={this.props. selectedPulseId} selectedCellId={this.props.cellData.cellId} addNewLabelSaga={this.props.addNewLabelSaga}/>
                </Popover>
            </React.Fragment>



        );
    }
}