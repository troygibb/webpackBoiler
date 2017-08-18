import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import CustomProvider from '../utils/customProvider';
import HelloWorld from '../../client/helloWorld';

describe('Client tests', () => {
	const wrapper = mount(
    <CustomProvider>
      <HelloWorld />
    </CustomProvider>
  );
	it("Should be able to find the HelloWorld component", function() {
    expect(wrapper.children()).to.have.length(1);
  });
});