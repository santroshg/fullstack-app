import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { should } from 'chai';
import sinon from 'sinon';

configure({ adapter: new Adapter() });

describe('<AddColumnComponent/>', function () {
    it('should show AddColumnComponent ', function (done) {
        done();
    });
});