import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';

import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { styles } from './AddBoardDialogStyle';

interface AddBoardDialogProps {
  addBoardFromSaga?: any
}

export default class AddBoardDialog extends React.Component<AddBoardDialogProps> {
    constructor(props: AddBoardDialogProps) {
      super(props);
    }

    state = {
      openModal: false,
      newBoardName: '',
      newBoardDesc: '',
  };
  

  handleClickOpen = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ newBoardName: '' });
    this.setState({ newBoardDesc: '' });
    this.setState({ openModal: false });
  };

  handleAddBoard = () => {
      if (this.state.newBoardName !== '') {
        console.log('newBoardName-----', this.state.newBoardName);
        console.log('newBoardDesc-----', this.state.newBoardDesc);
          this.props.addBoardFromSaga(
                  {
                    boardName: this.state.newBoardName, 
                    boardDesc: this.state.newBoardDesc,
                  });
          this.setState({ openModal: false });
      }
      this.setState({ newBoardName: '' });
      this.setState({ newBoardDesc: '' });
  };

  handleChangeBoardName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newBoardName: e.target.value });
  };

  handleChangeBoardDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newBoardDesc: e.target.value });
  }

  render() {
    return (
      <div>
        <Fab variant="extended" aria-label="Add" style={styles.FabClass} onClick={this.handleClickOpen}>
            <AddIcon />
        </Fab>
        <Dialog
          open={this.state.openModal}
          onClose={this.handleClose}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle id="draggable-dialog-title">Add new board</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Board Name"
              required
              fullWidth
              onChange={ this.handleChangeBoardName.bind(this) }
            />
            <TextField
              margin="dense"
              label="Board Description"
              fullWidth
              onChange={ this.handleChangeBoardDesc.bind(this) }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAddBoard.bind(this)} color="primary">
              Add Board
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
