import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

interface AddColumnComponentProps {
    currentBoardId: String,
    addColumnSaga?: any,
}
export default class AddColumnComponent extends Component <AddColumnComponentProps, any> {
    state = {
        open: false,
        addColumnText: '',
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
        this.setState({addColumnText: ''});
    };

    handleAddColumn = (e: any) => {
        const headerData = {
            "headerTxt": this.state.addColumnText
        }
        this.props.addColumnSaga(this.props.currentBoardId, headerData);
        this.setState({ open: false });
        this.setState({addColumnText: ''});
    }

    handleAddColumnText = (e: any) => {
        e.preventDefault();
        if(e.target.value){
            this.setState({addColumnText: e.target.value});
        }
    }
    render() {
        return (
            <div>
                <Tooltip title="Add coloumn">
                    <IconButton aria-label="Add coloumn" onClick={this.handleClickOpen}>
                        <AddIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add Column Header</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="AddColumnID"
                            label="Column header name"
                            type="text"
                            onChange={this.handleAddColumnText}
                            fullWidth
                            value={this.state.addColumnText}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={this.handleAddColumn} color="primary">
                            Add
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}