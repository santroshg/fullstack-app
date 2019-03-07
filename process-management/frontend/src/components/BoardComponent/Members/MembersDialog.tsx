import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import { Board } from '../../../store/types';
import { sendMail } from '../../../service/mail-service.js';

interface MembersDialogProps {
  currentBoard?: Board,
  addMemberToBoardSaga?: any,
  removeMemberToBoardSaga?: any,
}

export default class MembersDialog extends React.PureComponent<MembersDialogProps> {
  constructor(props: MembersDialogProps) {
    super(props);
  }

  state = {
    openModal: false,
    newUser: '',
    isNewuserTxtbox: false,
  };


  handleClickOpen = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  handleAddUserTxtBox = () => {
    this.setState({ isNewuserTxtbox: true });
  }

  handleAddUser = (boardId: String, e: any) => {
    if (this.state.newUser !== '' && e.key === 'Enter') {
      const tempUserId: String = Math.random() * 34567 + ''; // once user accept request, this id will be updated with googleid.
      this.props.addMemberToBoardSaga(
        boardId, {
          userId: tempUserId,
          userDisplayName: this.state.newUser,
          userEmail: this.state.newUser,
          userActive: false,
        }
      );
      sendMail(this.state.newUser, boardId, tempUserId);
      this.setState({ openModal: false, isNewuserTxtbox: false });
    }
    this.setState({ newUser: '' });
  };

  handleNewUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newUser: e.target.value });
  };

  handleDeleteUser = (userId: String, boardId: String) => {
    this.props.removeMemberToBoardSaga(boardId, userId);
  }

  setColor = (userActive: Boolean) => {
    if (!userActive) {
      return 'disable-member';
    } else {
     return null;
    }
  }


  render() {
    return (
      <div>
        <Button color="primary" onClick={this.handleClickOpen}>
          Members
        </Button>
        <Dialog
          open={this.state.openModal}
          onClose={this.handleClose}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle id="draggable-dialog-title">Add/Remove members from board</DialogTitle>
          <DialogContent>
            {this.props.currentBoard.members ? (
              this.props.currentBoard.members.map(m => (
                <List key={m.userId as string} >
                  <ListItem className={this.setColor(m.userActive)} >
                    <ListItemText
                      primary={m.userDisplayName}
                    />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Delete"
                        onClick={e => this.handleDeleteUser(m.userId, this.props.currentBoard.boardId)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              ))) : (<div>anok</div>)}

          </DialogContent>
          <DialogActions>
            {this.state.isNewuserTxtbox ? (
              <TextField
                required
                fullWidth
                autoFocus
                type="email"
                id="standard-required"
                label="User E-mail Id"
                margin="normal"
                onChange={this.handleNewUserName.bind(this)}
                onKeyPress={e => this.handleAddUser(this.props.currentBoard.boardId, e)}
              />
            ) : (
                <div>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                </Button>
                  <Button onClick={this.handleAddUserTxtBox.bind(this)} color="primary">
                    Add User
                </Button>
                </div>
              )}

          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
