import { FUNCTION_APPLY } from './apply.js';
import { struct } from '../impl';
import assert from 'assert'
import { CURRENT_SCOPE } from './vars';
import { OBJECT } from './object';
import { CURRENT_CONTEXT } from './context';
import { MAKE } from '../impl/alloc';

describe('FUNCTION_APPLY', () => {

  it('BASIC', () => {

    const Fn = struct.Function({
      Parameters: [],
      Name: 'test',
      Code: MAKE(0, 6, 9),
      // to be parent for a new variable scope in Apply()
      LexicalScope: CURRENT_SCOPE(),
    })
    console.log(Fn)
    const R = FUNCTION_APPLY(Fn);

    assert.equal(R, 3);
  });

});
