import chai from 'chai';
import store from '.';
import { setBoardsListAction } from './actions';
import { BoardItem, Board } from './types';
chai.should();

describe('ProcessManagementReducers', () => {
    describe('start reducers testing...', () => {
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
            ]
            const beforeLength: number = store.getState().boardList.length;
            store.dispatch(setBoardsListAction(boardList));
            store.getState().boardList.should.have.length(beforeLength + 2);
        });

        it('It should call setBoardDetailsAction()', () => {
            const currentBoardFromAxios:Board = {
                boardId: "1",
                boardName: "nisi deserunt",
                boardDesc: "board discription",
                boardCreatedBy: "google id",
                createTime: new Date(),

                members: [
                    {
                        userId: "google id ghjgsjdhggdfsu",
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






        });
    });
});
