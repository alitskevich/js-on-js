import assert from 'assert'
import { APPLY } from '../core/context';
import { RETURN, VAR } from '../core/API';

describe('FUNCTION', () => {

  it('APPLY', () => {

    const Fn = {
      Parameters: [ 'a' ],
      LocalVariables: [],
      Name: 'test',
      Code: () => {
        RETURN(3)
      }
    };

    const R = APPLY(Fn);

    assert.equal(R, 3);
  });

  it('APPLY w/Params', () => {

    const Fn = {
      Parameters: [ 'a' ],
      LocalVariables: [],

      Name: 'test',
      Code: () => {
        RETURN(VAR('a'));
      }
    }

    const R = APPLY(Fn, null, [ 31 ]);

    assert.equal(R, 31);
  });

});
