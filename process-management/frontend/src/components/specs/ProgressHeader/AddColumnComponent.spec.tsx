import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { should } from 'chai';
should();
import sinon from 'sinon';
import AddColumnComponent from '../../ProgressHeader/AddColumnComponent';
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

configure({ adapter: new Adapter() });

describe('<AddColumnComponent/>', function () {
    let wrapper: any;
    const boardId = '';
    const addColumnSaga =  sinon.fake();
    beforeEach(() => { 
        wrapper= shallow(<AddColumnComponent currentBoardId={boardId} addColumnSaga={addColumnSaga} />)
    });
    it('should render AddColumnComponent ', function (done) {
        wrapper.state('open').should.be.false;
        wrapper.find(Tooltip).length.should.be.equal(1);
        wrapper.find(IconButton).length.should.be.equal(1);
        wrapper.find(AddIcon).length.should.be.equal(1);
        wrapper.find(Dialog).length.should.be.equal(1);
        done();
    });

    it('should render add column ', function (done) {
        wrapper.find(IconButton).simulate('click');
        wrapper.state('open').should.be.true;
        wrapper.find(Button).at(1).simulate('click');
        addColumnSaga.calledOnce.should.be.true; 
        done();
    });
});