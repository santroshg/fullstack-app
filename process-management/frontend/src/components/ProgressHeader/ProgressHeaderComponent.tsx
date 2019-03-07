import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { ProgressHeader } from '../../store/types';
import { Fragment } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { TextField, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions } from '@material-ui/core';

interface ProgressHeaderComponentProps {
    progressHeader?: ProgressHeader,
    currentBoardId: String,
    editColumnSaga?: any,
    deleteColumnSaga?: any,
}
interface ProgressHeaderComponentState {
    showProgressHeaderEdit: boolean,
    progressHeaderEditText: String,
    deleteHeaderDialogOpen: boolean,
}

export default class ProgressHeaderComponent extends React.Component<ProgressHeaderComponentProps, ProgressHeaderComponentState> {
    constructor(props: ProgressHeaderComponentProps) {
        super(props);
        this.state = {
            showProgressHeaderEdit: false,
            progressHeaderEditText: this.props.progressHeader.headerTxt,
            deleteHeaderDialogOpen: false,
        }
    }

    setColumHeaderClass = (headerType: String) => {
        let names = ['column-header'];
        if (headerType === 'default') names.push('column-header-default');
        return names.join(' ');
    }
    handleshowProgressHeaderEdit = (e: React.MouseEvent<HTMLElement>) => {
        this.setState({ showProgressHeaderEdit: true });
    }
    handleProgressHeaderEditText = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ progressHeaderEditText: e.target.value })
    }
    handleProgressHeaderEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const boardId = this.props.currentBoardId;
            const headerTxt = this.state.progressHeaderEditText;
            const headerId = this.props.progressHeader.headerId;
            this.props.editColumnSaga(boardId, headerId, headerTxt);
            this.setState({ showProgressHeaderEdit: false });
        }
    }
    handleDeleteHeader = (headerId: any, headerColumnId: any) => {
        if (headerId && headerColumnId) {
            const boardId = this.props.currentBoardId;
            this.props.deleteColumnSaga(boardId, headerId, headerColumnId);
            this.setState({ showProgressHeaderEdit: false });
            this.setState({ deleteHeaderDialogOpen: false });
        }
    }

    handleDeleteHeaderDialogOpen = () => {
        this.setState({ deleteHeaderDialogOpen: true });
    }

    handleDeleteHeaderDialogClose = () => {
        this.setState({ deleteHeaderDialogOpen: false });
    }

    render() {
        return (
            <React.Fragment>

                <div className={this.setColumHeaderClass(this.props.progressHeader.headerType)}>
                    <div className='edit-column-header'>
                        {this.state.showProgressHeaderEdit ? (<TextField
                            id="standard-bare"
                            type="text"
                            name="ProgressHeaderEdit"
                            margin="normal"
                            fullWidth
                            value={this.state.progressHeaderEditText as string}
                            onChange={this.handleProgressHeaderEditText}
                            onKeyPress={this.handleProgressHeaderEdit} />)
                            : (
                                <span onDoubleClick={this.handleshowProgressHeaderEdit} className='edit-column-header__text'> {this.props.progressHeader.headerTxt}</span>
                            )}
                    </div>

                    {this.props.progressHeader.headerType !== 'default' ? (
                        <div className='delete-column-header'>
                            <Tooltip title="delete column header">
                                <IconButton aria-label="Delete">
                                    <DeleteIcon fontSize="small" onClick={this.handleDeleteHeaderDialogOpen} />
                                    <Dialog
                                        open={this.state.deleteHeaderDialogOpen}
                                        onClose={this.handleDeleteHeaderDialogClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">Confirm delete - {this.props.progressHeader.headerTxt} header</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Are you sure to delete this header?
                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.handleDeleteHeaderDialogClose} color="primary">
                                                Cancel
                                     </Button>
                                            <Button onClick={() => this.handleDeleteHeader(this.props.progressHeader.headerId, this.props.progressHeader.headerColumnId)} color="primary" autoFocus>
                                                Ok
                                     </Button>
                                        </DialogActions>
                                    </Dialog>
                                </IconButton>
                            </Tooltip>
                        </div>
                    ) : (null)}
                </div>
            </React.Fragment>
        );
    }
}