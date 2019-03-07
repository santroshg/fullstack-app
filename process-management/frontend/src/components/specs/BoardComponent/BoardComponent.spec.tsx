import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { should } from 'chai';
import sinon from 'sinon';
import BoardComponent from '../../BoardComponent/BoardComponent';
import currentBoardData from  './currentBoardData.json';
import MembersDialog from '../../BoardComponent/Members/MembersDialog';
import ProgressHeaderComponent from '../../ProgressHeader/ProgressHeaderComponent';
import PulseComponent from '../../PulseComponent/PulseComponent';
import { TextField, Button } from '@material-ui/core';
should();
configure({ adapter: new Adapter() });

describe('<BoardComponent/>', function () {
    it('should show BoardComponent ', function (done) {
        const addMemberToBoardSaga = sinon.fake();
        const removeMemberToBoardSaga = sinon.fake();
        const addPulseSaga = sinon.fake();
        const editPulseSaga = sinon.fake();
        const deletePulseSaga = sinon.fake();
        const addColumnSaga = sinon.fake();
        const editColumnSaga  = sinon.fake();
        const deleteColumnSaga = sinon.fake();
        const editCellSaga = sinon.fake();
        const addNewLabelSaga = sinon.fake();
        const editLabelSaga = sinon.fake();
        const deleteLabelSaga = sinon.fake();

        const wrapper = shallow(<BoardComponent currentBoard={currentBoardData}
            addMemberToBoardSaga={addMemberToBoardSaga}
            removeMemberToBoardSaga={removeMemberToBoardSaga}
            addPulseSaga={addPulseSaga}
            editPulseSaga={editPulseSaga}
            deletePulseSaga={deletePulseSaga}
            addColumnSaga={addColumnSaga}
            editColumnSaga={editColumnSaga}
            deleteColumnSaga={deleteColumnSaga}
            editCellSaga={editCellSaga}
            addNewLabelSaga={addNewLabelSaga}
            editLabelSaga={editLabelSaga}
            deleteLabelSaga={deleteLabelSaga}
        />);

        wrapper.find('.board-header-text h3').text().should.be.equal('test board');
        wrapper.find('.board-header-desc').text().should.be.equal('test board desc');
        wrapper.find(MembersDialog).length.should.be.equal(1);
        done();
    });
});