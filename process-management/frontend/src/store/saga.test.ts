import chai from 'chai';
import { call } from 'redux-saga/effects';
// import store from '.';
import { ProcessMgtActionType, BoardItem, Board, ProgressHeader, PulseItem, CellItem, Label, User, GoogleUser } from './types';
import { getBoardsListAPI, getBoardDetailsAPI, addBoardAPI, editBoardAPI, deleteBoardAPI, addColumnAPI, deleteColumnAPI, addPulseAPI, editPulseAPI, deletePulseAPI, editCellAPI, addNewLabelAPI, editLabelAPI, deleteLabelAPI, addMemberToBoardAPI, removeMemberToBoardAPI, editColumnAPI } from './api-services';
import { getBoardsList, getBoardDetails, addBoard, editBoard, deleteBoard, 
        addColumn, editColumn, deleteColumn, addPulse, editPulse, deletePulse, editCell,
        addNewLabel, editLabel, deleteLabel, addMemberToBoard, removeMemberToBoard } from './sagas';
import { getBoardDetailsAction, addBoardAction, editBoardAction, deleteBoardAction, 
    addColumnAction, editColumnAction, deleteColumnAction, addPulseAction, editPulseAction, deletePulseAction,
    editCellAction, addNewLabelAction, editLabelAction, deleteLabelAction, addMemberToBoardAction,
    removeMemberToBoardAction, 
    getBoardsListAction} from './actions';

chai.should();

describe('ServiceManagementStoreSaga', () => {
    describe('getBoardsList', () => {
        it('It should call getBoardsList()', () => {
            const userId: String = '102904972876830892777';
            const getBoardsListSaga = getBoardsList(getBoardsListAction(userId));
            getBoardsListSaga.next().value.should.deep.equal(call(getBoardsListAPI, userId));
        });

        it('It should call getBoardDetails()', () => {
            const boardId: String = '1';
            const getBoardDetailsSaga = getBoardDetails(getBoardDetailsAction(boardId));
            getBoardDetailsSaga.next().value.should.deep.equal(call(getBoardDetailsAPI, boardId));
        });

        xit('It should call addBoard()', () => {
            const newBoard: BoardItem = {
                boardId: '8y8ydbf8y89yfb89nsdhfghjsdgf',
                boardName: 'Test board',
                boardDesc: 'Board From Test'
            };
            
            const loggedinUser: GoogleUser = {
                userId: '102904972876830892777', 
                userDisplayName: 'Brajesh Anokha',
                userEmail: 'anokha777@gmail.com',
                profileImgUrl: 'https://lh5.googleusercontent.com/-OZJ_D3ukIFE/AAAAAAAAAAI/AAAAAAAAAqA/NO-M1jCdueo/photo.jpg?sz=50',
            }
              
            const addBoardSaga = addBoard(addBoardAction(newBoard, loggedinUser));
            // console.log('addBoardSaga-------------------------', addBoardSaga.next().value.payload.action.payload.boardName);
            addBoardSaga.next().value.should.deep.equal(call(addBoardAPI, {loggedinUser, newBoard}));
        });

        it('It should call editBoard()', () => {
            const updateBoard: BoardItem = {
                boardId: '8y8ydbf8y89yfb89nsdhfghjsdgf',
                boardName: 'Test board update',
                boardDesc: 'Board From Test update'
            };
            const editBoardSaga = editBoard(editBoardAction(updateBoard));
            editBoardSaga.next().value.should.deep.equal(call(editBoardAPI, updateBoard));
        });

        it('It should call deleteBoard()', () => {
            const boardId: String = '1';
            const deleteBoardSaga = deleteBoard(deleteBoardAction(boardId));
            deleteBoardSaga.next().value.should.deep.equal(call(deleteBoardAPI, boardId));
        });

        it('It should call addColumn()', () => {
            const boardId: String = '1';
            const progressHeader: ProgressHeader = {
                headerId: '1',
                headerTxt: 'Header Teaxt',
                createTime: new Date(),
                headerType: 'String',
                headerColumnId: '1173.0030844298499',
            }
            const addColumnSaga = addColumn(addColumnAction(boardId, progressHeader));
            addColumnSaga.next().value.should.deep.equal(call(addColumnAPI, {boardId, progressHeader}));
        });

        it('It should call editColumn()', () => {
            const boardId: String = '1';
            const headerId: String = '1';
            const headerTxt: String = 'update Header Text';
            const editColumnSaga = editColumn(editColumnAction(boardId, headerId, headerTxt));
            editColumnSaga.next().value.should.deep.equal(call(editColumnAPI, {boardId, headerId, headerTxt}));
        });

        it('It should call deleteColumn()', () => {
            const boardId: String = '1';
            const headerId: String = '1';
            const headerColumnId: String = '1173.0030844298499';
            const deleteColumnSaga = deleteColumn(deleteColumnAction(boardId, headerId, headerColumnId));
            deleteColumnSaga.next().value.should.deep.equal(call(deleteColumnAPI, { boardId, headerId, headerColumnId }));
        });

        it('It should call addPulse()', () => {
            const boardId: String = '1';
            const pulse: PulseItem = {
                pulseId: 't78uh78iokbvgyuioytf',
                pulseTxt: 'New pulse',
                pulseCreatedBy: 'String',
                createTime: new Date(),
            }
            const addPulseSaga = addPulse(addPulseAction(boardId, pulse));
            addPulseSaga.next().value.should.deep.equal(call(addPulseAPI, {boardId, pulse}));
        });
        
        it('It should call editPulse()', () => {
            const boardId: String = '1';
            const pulseId: String = '1';
            const pulseTxt: String = 'pulse text update'
            const editPulseSaga = editPulse(editPulseAction(boardId, pulseId, pulseTxt));
            editPulseSaga.next().value.should.deep.equal(call(editPulseAPI, {boardId, pulseId, pulseTxt}));
        });

        it('It should call deletePulse()', () => {
            const boardId: String = '1';
            const pulseId: String = '1';
            const deletePulseSaga = deletePulse(deletePulseAction(boardId, pulseId));
            deletePulseSaga.next().value.should.deep.equal(call(deletePulseAPI, {boardId, pulseId}));
        });
        
        it('It should call editCell()', () => {
            const boardId: String = '1';
            const pulseId: String = '0';
            const cellId: String = '1';
            const cell: CellItem = {
                cellId: '1',
                headerId: '1',
                cellLabelTxt: 'updated cell label txt',
                color: 'red',
                createTime: new Date(),
            }
            const editCellSaga = editCell(editCellAction(boardId, pulseId, cellId, cell));
            editCellSaga.next().value.should.deep.equal(call(editCellAPI, {boardId, pulseId, cellId, cell}));
        });

        it('It should call addNewLabel()', () => {
            const boardId: String = '1';
            const pulseId: String = '0';
            const cellId: String = '1';
            const label: String = 'Test label'
            // const label: Label = {
            //     labelId: 'dfyui9087ytfdcghio',
            //     labelTxt: 'Label txt',
            //     color: 'blue',
            // }
            
            const addNewLabelSaga = addNewLabel(addNewLabelAction(boardId, pulseId, cellId, label));
            addNewLabelSaga.next().value.should.deep.equal(call(addNewLabelAPI, {boardId, pulseId, cellId, label}));
        });

        it('It should call editLabel()', () => {
            const boardId: String = '1';
            const pulseId: String = '0';
            const cellId: String = '1';
            const labelId: String = 'dfyui9087ytfdcghio';
            const label: Label = {
                labelId: 'dfyui9087ytfdcghio',
                labelTxt: 'Label txt',
                color: 'blue',
            }
            const editLabelSaga = editLabel(editLabelAction(boardId, pulseId, cellId, labelId, label));
            editLabelSaga.next().value.should.deep.equal(call(editLabelAPI, {boardId, pulseId, cellId, labelId, label}));
        });

        it('It should call deleteLabel()', () => {
            const boardId: String = '1';
            const pulseId: String = '0';
            const cellId: String = '1';
            const labelId: String = '1';
            const deleteLabelSaga = deleteLabel(deleteLabelAction(boardId, pulseId, cellId, labelId));
            deleteLabelSaga.next().value.should.deep.equal(call(deleteLabelAPI, {boardId, pulseId, cellId, labelId}));
        });

        it('It should call addMemberToBoard()', () => {
            const boardId: String = '1';
            const user: User = {
                userId: 'cftyuiojhgsxt78yuiokjvg',
                userDisplayName: 'User 1',
                userEmail: 'test@example.com',
                userActive: false,
            };
            const addMemberToBoardSaga = addMemberToBoard(addMemberToBoardAction(boardId, user));
            addMemberToBoardSaga.next().value.should.deep.equal(call(addMemberToBoardAPI, {boardId, user}));
        });

        it('It should call removeMemberToBoard()', () => {
            const boardId: String = '1';
            const userId: String = 'fxcghjopiuyfcvbnmkjhguyu';
            const removeMemberToBoardSaga = removeMemberToBoard(removeMemberToBoardAction(boardId, userId));
            removeMemberToBoardSaga.next().value.should.deep.equal(call(removeMemberToBoardAPI, {boardId, userId}));
        });
    });
});
