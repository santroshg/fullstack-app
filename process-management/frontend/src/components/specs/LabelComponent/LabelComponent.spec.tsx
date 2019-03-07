import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { should } from 'chai';
should();
import sinon from 'sinon';
import labelsData from './LabelsData.json';
import LabelComponent from '../../PulseComponent/LabelComponent/LabelComponent';
import LabelItemComponent from '../../PulseComponent/LabelComponent/LabelItemComponent';
import { TextField, Button, Radio } from '@material-ui/core';

configure({ adapter: new Adapter() });

describe('<LabelComponent/>', function () {
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
        wrapper = shallow(<LabelComponent handlePopoverClose={handlePopoverClose} labels={labelsData} selectedBoardId={selectedBoardId} selectedPulseId={selectedPulseId} selectedCellId={selectedCellId} editCellSaga={editCellSaga} addNewLabelSaga={addNewLabelSaga} editLabelSaga={editLabelSaga} deleteLabelSaga={deleteLabelSaga}/>);
    });
    it('should render LabelComponent ', function (done) {
        wrapper.state('addLabelText').should.be.equal('');
        wrapper.state('showAddLabel').should.be.false;
        wrapper.state('selectedColor').should.be.equal('');
        wrapper.find(LabelItemComponent).length.should.be.equal(2);
        wrapper.find(Button).length.should.be.equal(1);
        done();
    });

    it('should show add label ', function (done) {
        wrapper.find(Button).simulate('click');
        wrapper.find(TextField).length.should.equal(1);
        wrapper.find(TextField).simulate('change', {target:{value:'new label'}});
        wrapper.state('addLabelText').should.be.equal('new label');
        wrapper.find('TextField').simulate('keypress', {key: 'Enter'});
        addNewLabelSaga.calledOnce.should.be.true; 
        done();
    });
});