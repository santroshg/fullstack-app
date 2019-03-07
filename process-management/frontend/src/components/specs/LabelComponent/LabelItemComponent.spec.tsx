import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { should } from 'chai';
should();
import sinon from 'sinon';
import labelItemData from './LabelItemData.json'
import LabelItemComponent from '../../PulseComponent/LabelComponent/LabelItemComponent';
import { TextField, Button, IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
configure({ adapter: new Adapter() });

describe('<LabelItemComponent/>', function () {
    let wrapper: any;
    const handlePopoverClose = sinon.fake();
    const deletePulseSaga = sinon.fake();
    const selectedBoardId = '5c7e1a3437fccd472f16d05d';
    const selectedPulseId = '7c7e1a3437fccd472f16d08d';
    const selectedCellId = '8d7e1a3437fccd472f16d08d';
    const editCellSaga = sinon.fake();
    const addNewLabelSaga = sinon.fake();
    const editLabelSaga = sinon.fake();
    const deleteLabelSaga = sinon.fake();
    beforeEach(() => {
        wrapper = shallow(<LabelItemComponent handlePopoverClose= {handlePopoverClose} label={labelItemData} selectedBoardId={selectedBoardId} selectedPulseId={selectedPulseId} selectedCellId={selectedCellId} editCellSaga={editCellSaga} addNewLabelSaga={addNewLabelSaga} editLabelSaga={editLabelSaga} deleteLabelSaga={deleteLabelSaga}/>);
    });
    it('should render LabelItemComponent ', function (done) {
        wrapper.state('editLabelText').should.be.equal('new');
        wrapper.state('showEditLabel').should.be.false;
        wrapper.find('.label-item-text').text().should.be.equal('new');
        wrapper.find(Tooltip).length.should.be.equal(1);
        wrapper.find(IconButton).length.should.be.equal(1);
        wrapper.find(DeleteIcon).length.should.be.equal(1);
        done();
    });
    it('should edit label ', function (done) {
        wrapper.find('.label-item-text').simulate('doubleclick');
        wrapper.state('showEditLabel').should.be.true;
        wrapper.find(TextField).length.should.be.equal(1);
        wrapper.find(TextField).simulate('keypress', {key: 'Enter'});
        editLabelSaga.calledOnce.should.be.true;
        wrapper.state('showEditLabel').should.be.false;
        wrapper.find(TextField).length.should.equal(0);
        done();
    });

    it('should delete label ', function (done) {
        wrapper.find(IconButton).length.should.be.equal(1);
        deletePulseSaga.calledOnce.should.be.false; 
        wrapper.find(IconButton).simulate('click');
        deleteLabelSaga.calledOnce.should.be.true; 
        wrapper.state('showEditLabel').should.be.false;
        done();
    });
});