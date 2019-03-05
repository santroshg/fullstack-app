import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { should } from 'chai';
import sinon from 'sinon';
should();

import BoardListComponent from '../../BoardListComponent/BoardListComponent';
import BoardListData from './BoardListData.json';
import { GoogleUser } from '../../../store/types';
configure({ adapter: new Adapter() });

describe('<BoardListComponent/>', function () {

    xit('should render BoardListComponent', function (done) {
        const reducer = sinon.fake((currentState: any, action: any) => {
            reducer.calledOnce.should.be.true;
            done();
            return currentState;
        });
        const loggedinUser = {
            'userId': '5c74cd44fb768611b7f0b96e',
            'userDisplayName': 'Santosh Kumar',
            'userEmail': 'santroshg@gmail.com',
            'profileImgUrl': ''
        }
        const store = createStore(reducer, { BoardListData});
        console.log('store', store);
        const wrapper = mount(<Provider store={store}> <BoardListComponent /></Provider>);
        
    });
});