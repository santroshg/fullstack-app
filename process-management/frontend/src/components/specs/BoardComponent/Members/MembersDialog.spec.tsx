import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { should } from 'chai';
import sinon from 'sinon';
import MembersDialog from '../../../BoardComponent/Members/MembersDialog';
import currentBoardData from '../currentBoardData.json';
import { Button, Dialog, TextField, IconButton } from '@material-ui/core';
should();
configure({ adapter: new Adapter() });

describe('<MembersDialog/>', function () {
  let wrapper: any;
  const addMemberToBoardSaga = sinon.fake();
  const removeMemberToBoardSaga = sinon.fake();

  beforeEach(() => {
    wrapper = shallow(<MembersDialog currentBoard={currentBoardData}
      addMemberToBoardSaga={addMemberToBoardSaga}
      removeMemberToBoardSaga={removeMemberToBoardSaga} />);
  });

  it('should render MembersDialog ', function (done) {
    wrapper.find(Button).length.should.be.equal(3);
    wrapper.find(Dialog).length.should.be.equal(1);
    wrapper.state('openModal').should.be.false;
    wrapper.find(Button).at(0).simulate('click');
    wrapper.state('openModal').should.be.true;
    done();
  });

  it('should add member ', function (done) {
    wrapper.find(Button).at(2).simulate('click');
    wrapper.find(TextField).length.should.equal(1);
    wrapper.find(TextField).simulate('change', { target: { value: 'email@gmail.com' } });
    wrapper.state('newUser').should.be.equal('email@gmail.com');
    wrapper.find('TextField').simulate('keypress', { key: 'Enter' });
    addMemberToBoardSaga.calledOnce.should.be.true;
    done();
  });

  it('should delete member ', function (done) {
    wrapper.find(IconButton).simulate('click');
    removeMemberToBoardSaga.calledOnce.should.be.true;
    done();
  });

});