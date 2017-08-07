import assert from 'assert'
import { APPLY } from '../../src/core/context';
import { RETURN, VAR } from '../../src/core/index';
import { ASSIGN } from '../../src/core/index';

describe('APPLY', () => {

  it('BASIC', () => {

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

  it('Params', () => {

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

  it('Params/Locals', () => {

    const Fn = {

      Parameters: [ 'a' ],
      LocalVariables: [ 'b' ],
      Name: 'test',
      Code: () => {
        ASSIGN('b', 45)
        RETURN(VAR('a') + VAR('b'));
      }
    }

    const R = APPLY(Fn, null, [ 31 ]);

    assert.equal(R, 76);
  });

});
