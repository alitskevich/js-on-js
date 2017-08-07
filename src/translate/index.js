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
  let Code = () => 1;

  var ast = typeof Source === 'object' ? Source : acorn.parse(Source, {
    // collect ranges for each node
    // ranges: true,
    // collect comments in Esprima's format
    // onComment: comments,
    // collect token ranges
    // onToken: tokens
  });

  walk.recursive(ast, {}, {
    FunctionDeclaration(n, state, c) {
      LocalVariables.push(n.id)
      console.log(`Found a literal: `, n)
    }
  });

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
