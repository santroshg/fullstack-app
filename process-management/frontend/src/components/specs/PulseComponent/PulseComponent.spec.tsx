import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { should } from 'chai';
should();
import sinon from 'sinon';
import PulseComponent from '../../PulseComponent/PulseComponent';
import pulseData from './PulseData.json';
import PulseCell from '../../PulseComponent/PulseCell/PulseCell';
import { TextField } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DeleteIcon from '@material-ui/icons/Delete';
configure({ adapter: new Adapter() });

describe('<PulseComponent/>', function () {
    let wrapper: any;
    const editPulseSaga = sinon.fake();
    const deletePulseSaga = sinon.fake();
    const boardId = '5c7e1a3437fccd472f16d05d';
    const editCellSaga = sinon.fake();
    const addNewLabelSaga = sinon.fake();
    const editLabelSaga = sinon.fake();
    const deleteLabelSaga = sinon.fake();
    beforeEach(() => {
        wrapper = shallow(<PulseComponent pulse={pulseData} editPulseSaga={editPulseSaga} deletePulseSaga={deletePulseSaga} selectedBoardId={boardId} editCellSaga={editCellSaga} addNewLabelSaga={addNewLabelSaga} editLabelSaga={editLabelSaga} deleteLabelSaga={deleteLabelSaga} />);
    });

    it('should render PulseComponent ', function (done) {
        wrapper.state('showPulseCellEdit').should.be.false;
        wrapper.find(PulseCell).length.should.be.equal(1);
        done();
    });

    it('should edit pulse ', function (done) {
        wrapper.find('.pulse-cell-edit').simulate('doubleclick');
        wrapper.state('showPulseCellEdit').should.be.true;
        wrapper.find(TextField).length.should.be.equal(1);
        wrapper.find(TextField).simulate('keypress', {key: 'Enter'});
        editPulseSaga.calledOnce.should.be.true;
        wrapper.state('showPulseCellEdit').should.be.false;
        wrapper.find(TextField).length.should.equal(0);
        done();
    });

    it('should delete pulse ', function (done) {
        wrapper.state('deletePulseDialogOpen').should.be.false;
        wrapper.find(DeleteIcon).length.should.be.equal(1);
        wrapper.find(Dialog).length.should.be.equal(1);
        wrapper.find(Button).length.should.be.equal(2);
        wrapper.find(DeleteIcon).simulate('click');
        wrapper.state('deletePulseDialogOpen').should.be.true;
        deletePulseSaga.calledOnce.should.be.false; 
        wrapper.find(Button).at(1).simulate('click');
        deletePulseSaga.calledOnce.should.be.true; 
        done();
    });
});