import chai from 'chai';
import { call } from 'redux-saga/effects';
// import store from '.';
import { ProcessMgtActionType, BoardItem, Board, ProgressHeader, PulseItem, CellItem, Label, User } from './types';
import { getBoardsListAPI, getBoardDetailsAPI, addBoardAPI, editBoardAPI, deleteBoardAPI, addColumnAPI, deleteColumnAPI, addPulseAPI, editPulseAPI, deletePulseAPI, editCellAPI, addNewLabelAPI, editLabelAPI, deleteLabelAPI, addMemberToBoardAPI, removeMemberToBoardAPI } from './api-services';
import { getBoardsList, getBoardDetails } from './sagas';

chai.should();

describe('ServiceManagementStoreSaga', () => {
    describe('getBoardsList', () => {
        // const newBoard: BoardItem = {
        //     boardId: '8y8ydbf8y89yfb89nsdhfghjsdgf',
        //     boardName: 'Test board',
        //     boardDesc: 'Board From Test'
        // };

        it('It should call getBoardsListAPI()', () => {
            const getBoardsListSaga = getBoardsList();
            getBoardsListSaga.next().value.should.deep.equal(call(getBoardsListAPI));
        });

        it('It should call getBoardDetailsAPI()', () => {
            const boardId: String = '1';
            const getBoardDetailsSaga = getBoardDetails(boardId);
            getBoardDetailsSaga.next().value.should.deep.equal(call(getBoardDetailsAPI));
        })
    });

});
