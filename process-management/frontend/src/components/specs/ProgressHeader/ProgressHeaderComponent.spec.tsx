import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { should } from 'chai';
should();
import sinon from 'sinon';
import ProgressHeaderComponent from '../../ProgressHeader/ProgressHeaderComponent';
import headerData from './HeaderData.json';

configure({ adapter: new Adapter() });
import DeleteIcon from '@material-ui/icons/Delete';
import { TextField, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions } from '@material-ui/core';

describe('<ProgressHeaderComponent/>', function () {
    let wrapper: any;
    const editColumnSaga = sinon.fake();
    const deleteColumnSaga = sinon.fake();
    const boardId = '5c7e1a3437fccd472f16d05d';

    beforeEach(() => {
        wrapper = shallow(<ProgressHeaderComponent progressHeader={headerData} currentBoardId={boardId} editColumnSaga={editColumnSaga} deleteColumnSaga={deleteColumnSaga} />);
    });

    it('should render ProgressHeaderComponent ', function (done) {
        wrapper.state('showProgressHeaderEdit').should.be.false;
        wrapper.state('deleteHeaderDialogOpen').should.be.false;
        wrapper.state('progressHeaderEditText').should.be.equal('Task Header');
        wrapper.find(Tooltip).length.should.be.equal(1);
        wrapper.find(IconButton).length.should.be.equal(1);
        wrapper.find(DeleteIcon).length.should.be.equal(1);
        wrapper.find(Dialog).length.should.be.equal(1);
        wrapper.find('.edit-column-header__text').text().should.be.equal(' Task Header');
        done();
    });

    it('should  edit header ', function (done) {
        wrapper.find('.edit-column-header__text').simulate('doubleclick');
        wrapper.state('showProgressHeaderEdit').should.be.true;
        wrapper.find(TextField).length.should.be.equal(1);
        wrapper.find(TextField).simulate('keypress', { key: 'Enter' });
        editColumnSaga.calledOnce.should.be.true;
        wrapper.state('showProgressHeaderEdit').should.be.false;
        wrapper.find(TextField).length.should.equal(0);
        done();
    });

    it('should  delete header ', function (done) {
        wrapper.find(DeleteIcon).length.should.be.equal(1);
        wrapper.find(DeleteIcon).simulate('click');
        wrapper.state('deleteHeaderDialogOpen').should.be.true;
        deleteColumnSaga.calledOnce.should.be.false;
        wrapper.find(Button).at(1).simulate('click');
        deleteColumnSaga.calledOnce.should.be.true;
        done();
    });
});