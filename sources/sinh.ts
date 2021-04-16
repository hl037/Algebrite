import {
  ARCSINH,
  cadr,
  car,
  Constants,
  isdouble,
  SINH,
  symbol,
  U,
} from '../runtime/defs';
import { pop, push } from '../runtime/stack';
import { double } from './bignum';
import { Eval } from './eval';
import { isZeroAtomOrTensor } from './is';
import { makeList } from './list';

//            exp(x) - exp(-x)
//  sinh(x) = ----------------
//                   2
export function Eval_sinh(p1: U) {
  push(cadr(p1));
  Eval();
  push(ysinh(pop()));
}

export function ysinh(p1: U): U {
  return yysinh(p1);
}

function yysinh(p1: U): U {
  if (car(p1) === symbol(ARCSINH)) {
    return cadr(p1);
  }
  if (isdouble(p1)) {
    let d = Math.sinh(p1.d);
    if (Math.abs(d) < 1e-10) {
      d = 0.0;
    }
    return double(d);
  }
  if (isZeroAtomOrTensor(p1)) {
    return Constants.zero;
  }
  return makeList(symbol(SINH), p1);
}
