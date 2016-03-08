// @flow
import React from 'react'; //eslint-disable-line
import test from 'tape';
import { shallow } from 'enzyme';
import Component from '../src/index';

test('correct class', (assert: Assert) => {
  const msg = 'should render component with correct class';

  let expected = '<div>1 + 2 = 3</div>';

  const $ = shallow(<Component first={1} second={2} />);
  const output = $.html();

  assert.equal(output, expected, msg);

  assert.end();
});
