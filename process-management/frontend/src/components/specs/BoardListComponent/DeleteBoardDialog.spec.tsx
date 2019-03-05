import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { should } from 'chai';
import sinon from 'sinon';
import DeleteBoardDialog from '../../BoardListComponent/DeleteBoardDialog';
import Delete from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import BoardData from './BoardData.json';
should();

configure({ adapter: new Adapter() });

describe('<DeleteBoardDialog/>', function () {
    it('should delete board ', function (done) {
      const deleteBoardResponse = sinon.fake();
      const wrapper = shallow(<DeleteBoardDialog board={BoardData}  deleteBoardResponse={deleteBoardResponse}/>)
      wrapper.find(Delete).length.should.be.equal(1);
      wrapper.find(Dialog).length.should.be.equal(1);
      wrapper.find(Button).length.should.be.equal(2);
      deleteBoardResponse.calledOnce.should.be.false; 
      wrapper.find(Button).at(0).simulate('click');
      deleteBoardResponse.calledOnce.should.be.true; 
      wrapper.find(Button).at(1).simulate('click');
      deleteBoardResponse.calledOnce.should.be.false; 
      done();   
    });
}); 