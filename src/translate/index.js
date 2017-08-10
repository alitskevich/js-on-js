import { ASSIGN } from '../core/object_reflect';
import { FUNCTION } from '../core/function';
import { Apply } from '../core/context';

const acorn = require("acorn")
const walk = require("acorn/dist/walk")

/**
 *
 * @see https://github.com/ternjs/acorn
 *
 * @param Source
 * @param Fn
 * @returns {*}
 */
export function translate(Source, Fn) {

  var LocalVariables = [];
  let Parameters = [];
  let Statements = [];

  var ast = typeof Source === 'object' ? Source : acorn.parse(Source, {
    // collect ranges for each node
    // ranges: true,
    // collect comments in Esprima's format
    // onComment: comments,
    // collect token ranges
    // onToken: tokens
  });
  console.log(ast)
  walk.recursive(ast, {}, {
    VariableDeclarator(n) {
      const name = n.id.name;
      LocalVariables.push(name);
    },
    FunctionDeclaration(n, state, c) {
      const name = n.id.name;
      LocalVariables.push(name);
      const fn = FUNCTION({
        Name: name
      });
      translate(n.body, fn);
      Statements.push(() => ASSIGN(name, fn));
    }
  });

  const Code = () => {
    Statements.forEach(st => st.apply())
  }

  return Object.assign(Fn, { LocalVariables, Parameters, Code });
}

export function compileTryCatch(Try, Catch, Finally) {

  const context = ApplyFunction(Try);

  // check for exception
  if (context.Exception) {
    const Exception = context.Exception;

    if (Fn.Catch) {
      context.Result = ApplyFunction(Fn.Catch, context.This, [ Exception ]);
    } else {
      Object.assign(Context.Top, { Exit: true, Exception });
    }
  }

  // Apply Final block if any
  if (Fn.Finally) {
    context.Result = ApplyFunction(Fn.Finally, context.This);
  }

}
