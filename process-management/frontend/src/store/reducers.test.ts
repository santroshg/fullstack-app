import chai from 'chai';
import store from '.';
import { setBoardsListAction, setBoardDetailsAction, setAddBoardAction, setEditBoardAction, setDeleteBoardAction, setAddColumnAction, setEditColumnAction, setDeleteColumnAction, setEditPulseAction, setDeletePulseAction, setEditCellAction, setAddNewLabelAction, setEditLabelAction, setDeleteLabelAction, setAddMemberToBoardAction, setRemoveMemberToBoardAction, setAddPulseAction } from './actions';
import { BoardItem, Board, ProgressHeader, CellItem, Label, User, PulseItem, Pulse } from './types';
chai.should();

describe('ProcessManagementReducers', () => {
    describe('start reducers testing...', () => {
        xit('It should call setBoardsListAction()', () => {
            // below boardList will come from axios call in saga generator.
            const boardList: BoardItem[]= [
                {
                    boardId: 'tyuiu89wy98u8ye89w',
                    boardName: 'Board 1 test',
                    boardDesc: 'Board 1 desc test'
                },
                {
                    boardId: 'tyuiu89wy98u8ye80w',
                    boardName: 'Board 2 test',
                    boardDesc: 'Board 2 desc test'
                },
            ]
            const beforeLength: number = store.getState().boardList.length;
            store.dispatch(setBoardsListAction(boardList));
            store.getState().boardList.should.have.length(beforeLength + 2);
        });

        xit('It should call setBoardDetailsAction()', () => {
            const currentBoardFromAxios:Board = {
                boardId: "1",
                boardName: "Board from test",
                boardDesc: "board discription test",
                boardCreatedBy: "google id test",
                createTime: new Date(),

                members: [
                    {
                        userId: "google id test",
                        userDisplayName: "User 1",
                        userEmail: "user1@example.com",
                        userActive: true
                    }
                ],
                progressHeader: [
                    {
                        headerId: "0",
                        headerTxt: "Item",
                        createTime: new Date()
                    },
                    {
                        headerId: "1",
                        headerTxt: "Second col Header",
                        createTime: new Date()
                    },
                    {
                        headerId: "2",
                        headerTxt: "Third col Header",
                        createTime: new Date()
                    }
                ],
                pulse: [
                    {
                        pulseId: "0",
                        pulseTxt: "pulse text",
                        createTime: new Date(),
                        pulseCreatedBy: "bec5839f3d699bef073df03",
                        
                        cells: [
                            {
                                cellId: "0",
                                headerId: "0",
                                cellLabelTxt: "Completed",
                                color: "red",
                                createTime: new Date(),
                                labels: [
                                    {   
                                        labelId: "1",
                                        labelTxt: "Completed",
                                        color: "red"   
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
            store.dispatch(setBoardDetailsAction(currentBoardFromAxios));
            store.getState().currentBoard.boardName.should.be.equal('Board from test');
        });

        xit('It should call setAddBoardAction()', () => {
            const newBoardFromAxios: BoardItem = {
                boardId: 't7890uygvu98ytf8u9',
                boardName: 'New board from test',
                boardDesc: 'from testing',
            }
            const beforeLength: number = store.getState().boardList.length;
            store.dispatch(setAddBoardAction(newBoardFromAxios));
            store.getState().boardList.should.have.length(beforeLength + 1);

        });

        xit('It should call setEditBoardAction()', () => {
            const updatedBoardFromAxios: BoardItem = {
                boardId: '1',
                boardName: 'New board from test- update',
                boardDesc: 'from testing -update',
            }
            store.dispatch(setEditBoardAction(updatedBoardFromAxios));
            store.getState().boardList.filter(b => b.boardId === updatedBoardFromAxios.boardId)[0]
                .boardName.should.be.equal('New board from test- update');
        });

        xit('It should call setDeleteBoardAction()', () => {
            const beforeLength: number = store.getState().boardList.length;
            const boardId: String = '2';
            store.dispatch(setDeleteBoardAction(boardId));
            store.getState().boardList.length.should.be.equal(beforeLength - 1);
        });

        xit('It should call setAddColumnAction()', () => {
            const beforeColLen = store.getState().currentBoard.progressHeader.length;
            const boardId: String = '1';
            const progressHeader: ProgressHeader = {
                headerId: '56rt7uyighjkgy8iu',
                headerTxt: 'header txt testing',
                createTime: new Date(),
            };
            store.dispatch(setAddColumnAction(boardId, progressHeader));
            // console.log('beforeColLen----', beforeColLen);
            // console.log('uuuuuuuuuuuu---------', store.getState().currentBoard.progressHeader);
            store.getState().currentBoard.progressHeader.length.should.be.equal(beforeColLen + 1);
        });

        xit('It should call setEditColumnAction()', () => {
            const boardId: String = '1';
            const headerId: String = '0';
            const headerTxt: String = 'Update testing';
            store.dispatch(setEditColumnAction(boardId, headerId, headerTxt));
            store.getState().currentBoard.progressHeader.filter(ph => ph.headerId === headerId)[0].headerTxt.should.be.equal('Update testing');
        });

        xit('It should call setDeleteColumnAction()', () =>{
            const boardId: String = '1';
            const headerId: String = '0'
            store.dispatch(setDeleteColumnAction(boardId, headerId));
        });
        // setAddPulseAction()
        xit('It should call setAddPulseAction()', () => {
            const beforePulseAdd: number = store.getState().currentBoard.pulse.length;
            const boardId: String = '1';
            const pulse: PulseItem = {
                pulseId: 'gs8a7gas87g87f',
                pulseTxt: 'Test pulse',
                pulseCreatedBy: 'Google Id',
                createTime: new Date(),
            }
            store.dispatch(setAddPulseAction(boardId, pulse));
            store.getState().currentBoard.pulse.length.should.be.equal(beforePulseAdd + 1);
        });


        xit('It should call setEditPulseAction()', () => {
            const boardId: String = '1';
            const pulseId: String = '0';
            const pulseTxt: String = 'update pulse text';
            store.dispatch(setEditPulseAction(boardId, pulseId, pulseTxt));
            store.getState().currentBoard.pulse
                .filter(p => p.pulseId === pulseId)[0].pulseTxt
                    .should.be.equal('update pulse text');
        });
        // below is correct test case, simply commenting below test case

        // xit('It should call setDeletePulseAction()', () => {
        //     const beforePulseLen = store.getState().currentBoard.pulse.length;
        //     const boardId: String = '1';
        //     const pulseId: String = '0';
        //     store.dispatch(setDeletePulseAction(boardId, pulseId));
        //     store.getState().currentBoard.pulse.length.should.be.equal(beforePulseLen - 1);
        // });

        xit('It should call setEditCellAction()', () => {
            const boardId: String = '1';
            const pulseId: String = '0';
            const cell: CellItem = {
                cellId: '0',
                headerId: '1',
                cellLabelTxt: 'changed txt testing',
                color: 'change color testing',
                createTime: new Date(),
            }
            store.dispatch(setEditCellAction(boardId, pulseId, cell));
            store.getState().currentBoard.pulse.filter(p => p.pulseId === pulseId)[0]
                .cells.filter(c => c.cellId === cell.cellId)[0].cellLabelTxt.should.be.equal('changed txt testing');
        });

        xit('It should call setAddNewLabelAction()', () => {
            const boardId: String = '1';
            const pulseId: String = '0';
            const cellId: String = '0';
            const label: Label = {
                labelId: 's45678ihg768hijh',
                labelTxt: 'New label',
                color: 'new color',
            };
            store.dispatch(setAddNewLabelAction(boardId, pulseId, cellId, label));
            store.getState().currentBoard.pulse
                .filter(p => p.pulseId === pulseId)[0].cells
                    .filter(c => c.cellId === cellId)[0].labels
                        .filter(l => l.labelId === label.labelId)[0].labelTxt
                        .should.be.equal('New label');
        });

        xit('It should call setEditLabelAction()', () => {
            const boardId: String = '1';
            const pulseId: String = '0';
            const cellId: String = '0';
            const label: Label = {
                labelId: 's45678ihg768hijh',
                labelTxt: 'updated label',
                color: 'updated color',
            };
            store.dispatch(setEditLabelAction(boardId, pulseId, cellId, label));
            store.getState().currentBoard.pulse
                .filter(p => p.pulseId === pulseId)[0].cells
                    .filter(c => c.cellId === cellId)[0].labels
                        .filter(l => l.labelId === label.labelId)[0].labelTxt
                            .should.be.equal('updated label');
        });

        xit('It should call setDeleteLabelAction()', () => {
            const boardId: String = '1';
            const pulseId: String = '0';
            const cellId: String = '0';
            const labelId: String = 's45678ihg768hijh';

            const beforeLen: number = store.getState().currentBoard.pulse.filter(p => p.pulseId === pulseId)[0]
                .cells.filter(c => c.cellId === cellId)[0]
                    .labels.length;

            store.dispatch(setDeleteLabelAction(boardId, pulseId, cellId, labelId));
            store.getState().currentBoard.pulse.filter(p => p.pulseId === pulseId)[0]
                .cells.filter(c => c.cellId === cellId)[0]
                    .labels.length.should.be.equal(beforeLen -1);
        });

        xit('It should call setAddMemberToBoardAction()', () => {
            const boardId: String = '1';
            const user: User = {
                userId: 'Google id 78yw8y87y8dsrgfd',
                userDisplayName: 'Test User',
                userEmail: 'test@example.com',
                userActive: false,
            }
            store.dispatch(setAddMemberToBoardAction(boardId, user));
            store.getState().currentBoard.members.filter(m => m.userId === user.userId)[0]
                .userId.should.be.equal('Google id 78yw8y87y8dsrgfd');
        });

        xit('It should call setRemoveMemberToBoardAction()', () => {
            const beforeUserLength = store.getState().currentBoard.members.length;
            const boardId: String = '1';
            const userId: String = 'Google id 78yw8y87y8dsrgfd';
            store.dispatch(setRemoveMemberToBoardAction(boardId, userId));
            store.getState().currentBoard.members.length.should.be.equal(beforeUserLength - 1);
        });

    });
});
