import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Delete from '@material-ui/icons/Delete';
import { BoardItem } from '../../../store/types';
import { Tooltip, IconButton } from '@material-ui/core';

interface DeleteAlertProps {
  board: BoardItem,
  deleteBoardResponse?: any,
}

export default class DeleteAlert extends React.PureComponent<DeleteAlertProps> {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.deleteBoardResponse(false, this.props.board.boardId);
  };

  handleConfirm = () => {
    this.setState({ open: false });
    this.props.deleteBoardResponse(true, this.props.board.boardId);
  }

  render() {
    return (
      <div>
        
        <Tooltip title="Delete board">
          <IconButton aria-label="Delete board" onClick={this.handleClickOpen}>
                <Delete fontSize="small" />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Do you want to delete Confirm?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action will delete bord- "{this.props.board.boardName}", and you will no longer have access to this board.
              Please hit Confirm to delete.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleConfirm.bind(this)} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
