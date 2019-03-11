import chai from 'chai';
import store from '.';
import { setBoardsListAction, setBoardDetailsAction, setAddBoardAction, setEditBoardAction, setDeleteBoardAction, setAddColumnAction, setEditColumnAction, setDeleteColumnAction, setEditPulseAction, setDeletePulseAction, setEditCellAction, setAddNewLabelAction, setEditLabelAction, setDeleteLabelAction, setAddMemberToBoardAction, setRemoveMemberToBoardAction, setAddPulseAction } from './actions';
import { BoardItem, Board, ProgressHeader, CellItem, Label, User, PulseItem, Pulse } from './types';
chai.should();

describe('ProcessManagementReducers', () => {
    describe('start reducers testing...', () => {
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
                    createTime: new Date(),
                    headerType: 'test',
                    headerColumnId: '1',
                },
                {
                    headerId: "1",
                    headerTxt: "Second col Header",
                    createTime: new Date(),
                    headerType: 'test',
                    headerColumnId: '1',
                },
                {
                    headerId: "2",
                    headerTxt: "Third col Header",
                    createTime: new Date(),
                    headerType: 'test',
                    headerColumnId: '1',
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
        it('It should call setBoardDetailsAction()', () => {
            store.dispatch(setBoardDetailsAction(currentBoardFromAxios));
            store.getState().currentBoard.boardName.should.be.equal('Board from test');
        });

        it('It should call setBoardsListAction()', () => {
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
            ];
            store.dispatch(setBoardsListAction(boardList));
            store.getState().boardList.should.have.length.greaterThan(0);
        });

        it('It should call setAddBoardAction()', () => {
            const newBoardFromAxios: BoardItem = {
                boardId: 't7890uygvu98ytf8u9',
                boardName: 'New board from test',
                boardDesc: 'from testing',
            }
            const beforeLength: number = store.getState().boardList.length;
            store.dispatch(setAddBoardAction(newBoardFromAxios));
            store.getState().boardList.should.have.length(beforeLength + 1);
            
        });
        
        it('It should call setEditBoardAction()', () => {
            const updatedBoardFromAxios: BoardItem = {
                boardId: '1',
                boardName: 'New board from test- update',
                boardDesc: 'from testing -update',
            }
            store.dispatch(setEditBoardAction(updatedBoardFromAxios));
            store.getState().currentBoard
            .boardName.should.be.equal('New board from test- update');
        });
        
        it('It should call setDeleteBoardAction()', () => {
            const beforeLength: number = store.getState().boardList.length;
            const boardId: String = 'tyuiu89wy98u8ye80w';
            store.dispatch(setDeleteBoardAction(boardId));
            store.getState().boardList.length.should.be.equal(beforeLength - 1 );
        });

        it('It should call setAddColumnAction()', () => {
            const boardId: String = '1';
            const progressHeader: ProgressHeader = {
                headerId: '56rt7uyighjkgy8iu',
                headerTxt: 'header txt testing',
                createTime: new Date(),
                headerType: 'test',
                headerColumnId: '13',
            };
            const pulse: Pulse = {
                pulseId: '1',
                createTime: new Date(),
                pulseCreatedBy: 'test user',
                pulseTxt: 'Test Pulse Txt',
                cells: [],
            };
            store.dispatch(setAddColumnAction(boardId, progressHeader, pulse));
            
            store.getState().currentBoard.progressHeader.headerColumnId.should.be.equal('13');
        });

        it('It should call setBoardDetailsAction()', () => {
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
                        createTime: new Date(),
                        headerType: 'test',
                        headerColumnId: '1',
                    },
                    {
                        headerId: "1",
                        headerTxt: "Second col Header",
                        createTime: new Date(),
                        headerType: 'test',
                        headerColumnId: '1',
                    },
                    {
                        headerId: "2",
                        headerTxt: "Third col Header",
                        createTime: new Date(),
                        headerType: 'test',
                        headerColumnId: '1',
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

        it('It should call setEditColumnAction()', () => {
            const boardId: String = '1';
            const headerId: String = '0';
            const headerTxt: String = 'Update testing';
            store.dispatch(setEditColumnAction(headerId, headerTxt));
            store.getState().currentBoard.progressHeader.filter(ph => ph.headerId === headerId)[0].headerTxt.should.be.equal('Update testing');
        });

        it('It should call setDeleteColumnAction()', () =>{
            const boardId: String = '1';
            const headerId: String = '0';
            const headerColumnId: String = '1';
            const progressHeader: ProgressHeader = {
                headerId: '56rt7uyighjkgy8iu',
                headerTxt: 'header txt testing',
                createTime: new Date(),
                headerType: 'test',
                headerColumnId: '13',
            };
            const pulse: Pulse = {
                pulseId: '1',
                createTime: new Date(),
                pulseCreatedBy: 'test user',
                pulseTxt: 'Test Pulse Txt',
                cells: [],
            };
            store.dispatch(setDeleteColumnAction(headerColumnId));
            store.getState().currentBoard.progressHeader.length.should.be.equal(1);
        });
        // setAddPulseAction()
        it('It should call setAddPulseAction()', () => {
            const boardId: String = '1';
            const pulse: PulseItem = {
                pulseId: 'gs8a7gas87g87f',
                pulseTxt: 'Test pulse',
                pulseCreatedBy: 'Google Id',
                createTime: new Date(),
            };
            const progressHeader: ProgressHeader = {
                headerId: '56rt7uyighjkgy8iu',
                headerTxt: 'header txt testing',
                createTime: new Date(),
                headerType: 'test',
                headerColumnId: '13',
            };

            store.dispatch(setAddPulseAction(boardId, pulse, progressHeader));
            store.getState().currentBoard.pulse.pulseTxt.should.be.equal('Test pulse');
        });


        // xit('It should call setEditPulseAction()', () => {
        //     const boardId: String = '1';
        //     const pulseId: String = '0';
        //     const pulse: Pulse = {
        //         pulseId: '0',
        //         createTime: new Date(),
        //         pulseCreatedBy: 'test user',
        //         pulseTxt: 'Test Pulse Txt',
        //         cells: [],
        //     };
            
        //     store.dispatch(setEditPulseAction(pulseId, pulse));
        //     store.getState().currentBoard.pulse
        //         .filter(p => p.pulseId === pulseId)[0].pulseTxt
        //             .should.be.equal('Test Pulse Txt');
        // });
        // below is correct test case, simply commenting below test case

        // it('It should call setDeletePulseAction()', () => {
        //     const beforePulseLen = store.getState().currentBoard.pulse.length;
        //     const boardId: String = '1';
        //     const pulseId: String = '0';
        //     store.dispatch(setDeletePulseAction(pulseId));
        //     store.getState().currentBoard.pulse.length.should.be.equal(beforePulseLen - 1);
        // });

        it('It should call setEditCellAction()', () => {
            const boardId: String = '1';
            const pulseId: String = '0';
            const pulse: Pulse = {
                pulseId: '0',
                createTime: new Date(),
                pulseCreatedBy: 'test user',
                pulseTxt: 'Test Pulse Txt',
                cells: [],
            };
            store.dispatch(setEditCellAction(boardId, pulse));
            store.getState().currentBoard.pulse.pulseTxt.should.be.equal('Test Pulse Txt');
        });

        it('It should call setAddNewLabelAction()', () => {
            const boardId: String = '1';
            const pulseId: String = '0';
            const cellId: String = '0';
            const label: Label = {
                labelId: 's45678ihg768hijh',
                labelTxt: 'New label',
                color: 'new color',
            };
            const pulse: Pulse = {
                pulseId: '0',
                createTime: new Date(),
                pulseCreatedBy: 'test user',
                pulseTxt: 'Test Pulse',
                cells: [],
            };
            store.dispatch(setAddNewLabelAction(boardId, pulse));
            store.getState().currentBoard.pulse.pulseTxt.should.be.equal('Test Pulse');
        });

        it('It should call setEditLabelAction()', () => {
            const boardId: String = '1';
            const pulseId: String = '0';
            const cellId: String = '0';
            const label: Label = {
                labelId: 's45678ihg768hijh',
                labelTxt: 'updated label',
                color: 'updated color',
            };
            const pulse: Pulse[] = [{
                pulseId: '0',
                createTime: new Date(),
                pulseCreatedBy: 'test user',
                pulseTxt: 'Test Pulse',
                cells: [],
            }];
            store.dispatch(setEditLabelAction(boardId, pulse));
            store.getState().currentBoard.pulse[0].pulseTxt.should.be.equal('Test Pulse');
            
        });

        it('It should call setDeleteLabelAction()', () => {
            const boardId: String = '1';
            const pulseId: String = '0';
            const cellId: String = '0';
            const labelId: String = 's45678ihg768hijh';
            store.dispatch(setDeleteLabelAction(boardId, pulseId, cellId, labelId));
            store.getState().currentBoard.progressHeader.headerTxt.should.be.equal('header txt testing');
        });

        it('It should call setAddMemberToBoardAction()', () => {
            const boardId: String = '1';
            const user: User = {
                userId: 'Google id 78yw8y87y8dsrgfd',
                userDisplayName: 'Test User',
                userEmail: 'test@example.com',
                userActive: false,
            }
            store.dispatch(setAddMemberToBoardAction(boardId, user));
            store.getState().currentBoard.members.userId.should.be.equal('Google id 78yw8y87y8dsrgfd');
        });

        it('It should call setRemoveMemberToBoardAction()', () => {
            const beforeUserLength = store.getState().currentBoard.members.length;
            const boardId: String = '1';
            const user: User[] = [{
                userId: 'Google id 78yw8y87y8dsrgfd',
                userDisplayName: 'Test User',
                userEmail: 'test@example.com',
                userActive: false,
            }];
            store.dispatch(setRemoveMemberToBoardAction(boardId, user));
            store.getState().currentBoard.members[0].userDisplayName.should.be.equal('Test User');
        });

    });
});
