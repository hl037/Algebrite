import {
  cadddr,
  caddr,
  cadr,
  Constants,
  defs,
  NIL,
  symbol,
  SYMBOL_X,
  U,
} from '../runtime/defs';
import { pop, push } from '../runtime/stack';
import { equal } from '../sources/misc';
import { subtract } from './add';
import { Eval } from './eval';
import { filter } from './filter';
import { divide } from './multiply';
import { power } from './power';
import { subst } from './subst';

/* coeff =====================================================================

Tags
----
scripting, JS, internal, treenode, general concept

Parameters
----------
p,x,n

General description
-------------------
Returns the coefficient of x^n in polynomial p. The x argument can be omitted for polynomials in x.

*/
export function Eval_coeff(p1: U) {
  push(cadr(p1));
  Eval();

  push(caddr(p1));
  Eval();

  push(cadddr(p1));
  Eval();

  let N = pop();
  let X = pop();
  const P = pop();

  if (N === symbol(NIL)) {
    // only 2 args?
    N = X;
    X = symbol(SYMBOL_X);
  }

  // divide p by x^n, keep the constant part
  push(filter(divide(P, power(X, N)), X));
}

//-----------------------------------------------------------------------------
//
//  Get polynomial coefficients
//
//  Input:  p(x) (the polynomial)
//
//          x (the variable)
//
//  Output:    Returns the array of coefficients:
//
//      [Coefficient of x^0, ..., Coefficient of x^(n-1)]
//
//-----------------------------------------------------------------------------

export function coeff(p: U, x: U): U[] {
  const coefficients = [];

  while (true) {
    push(subst(p, x, Constants.zero));
    Eval();

    const c = pop();
    coefficients.push(c);

    p = subtract(p, c);

    if (equal(p, Constants.zero)) {
      return coefficients;
    }

    const prev_expanding = defs.expanding;
    defs.expanding = true;
    p = divide(p, x);
    defs.expanding = prev_expanding;
    //console.log("just divided: " + stack[tos-1].toString())
  }
}
