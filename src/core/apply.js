import { PUSH_CONTEXT, POP_CONTEXT } from "./context.js"
import { GET, SIZE } from '../impl/alloc';

const REALM = {
  '6': (ctx) => {
    console.log('RR');
    ctx.Result = 3
  },
  '9': (ctx) => {
    console.log('RR');
    ctx.Result = 3
  }
}

export function FUNCTION_APPLY(Fn, This, Arguments) {


  // create a new execution context for this invocation
  // and push it into execution stack
  const context = PUSH_CONTEXT(Fn, This, Arguments);

  // Evaluate binary code
  const code = Fn.Code;
  const size = SIZE(code);
  for (let i = 0; i < size; i++) {
    let e = GET(code, i);
    let opCode = '' + e;
    console.log('opCode', opCode, size);

    REALM[ opCode ](context);
  }

  POP_CONTEXT();

  // to provide context.Result outside
  return context.Result;
}
