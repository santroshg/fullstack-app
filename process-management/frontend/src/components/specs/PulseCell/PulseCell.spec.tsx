import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { should } from 'chai';
should();
import sinon from 'sinon';
import PulseCell from '../../PulseComponent/PulseCell/PulseCell';
import cellData from './CellData.json';
import { Popover } from '@material-ui/core';
import LabelComponent from '../../PulseComponent/LabelComponent/LabelComponent';

configure({ adapter: new Adapter() });

describe('<PulseCell/>', function () {
    let wrapper: any;
    const selectedBoardId = '5c7e1a3437fccd472f16d05d';
    const pulseId = '5c7e1a3437fccd472f16d05d'; 
    const editCellSaga = sinon.fake();
    beforeEach(() => {
        wrapper = shallow(<PulseCell cellData={cellData} />)
    });

    it('should render PulseCell ', function (done) {
        wrapper.find('.cell-label').text().should.be.equal('');
        wrapper.find(Popover).length.should.be.equal(1);
        wrapper.find(LabelComponent).length.should.be.equal(1);
        done();
    });
});