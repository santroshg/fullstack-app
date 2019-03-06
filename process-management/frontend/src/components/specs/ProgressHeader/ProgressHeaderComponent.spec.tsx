import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { should } from 'chai';
import sinon from 'sinon';

configure({ adapter: new Adapter() });

describe('<ProgressHeaderComponent/>', function () {
    it('should show ProgressHeaderComponent ', function (done) {
        done();
    });
});