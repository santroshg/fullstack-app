import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { should } from 'chai';
import sinon from 'sinon';
import AddBoardDialog from '../../BoardListComponent/AddBoardDialog';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { Tooltip, IconButton, TextField } from '@material-ui/core';
should();

configure({ adapter: new Adapter() });

describe('<AddBoardDialog/>', function () {
    it('should add board ', function (done) {
      const addBoardFromSaga = sinon.fake();
      const loggedinUser = sinon.stub({});
      const wrapper = shallow(<AddBoardDialog addBoardFromSaga={addBoardFromSaga} loggedinUser={loggedinUser} />);
      wrapper.find(AddIcon).length.should.be.equal(1);
      wrapper.find(Dialog).length.should.be.equal(1);
      wrapper.find(Button).length.should.be.equal(2);
      wrapper.state('openModal').should.be.false;
      wrapper.find(IconButton).simulate('click');
      wrapper.state('openModal').should.be.true;
      wrapper.find(TextField).length.should.equal(2);
      wrapper.find(TextField).at(0).simulate('change', {target:{value:'test board'}});
      wrapper.state('newBoardName').should.be.equal('test board');
      wrapper.find(TextField).at(1).simulate('change', {target:{value:'test board desc'}});
      wrapper.state('newBoardDesc').should.be.equal('test board desc');
      wrapper.find(Button).at(1).simulate('click');
      addBoardFromSaga.calledOnce.should.be.true; 
      wrapper.state('openModal').should.be.false;
      done();
    });
});