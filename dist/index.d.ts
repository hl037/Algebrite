import { BigInteger } from 'big-integer';
import { caaddr, caadr, caar, cadaddr, cadadr, cadar, caddaddr, caddadr, caddar, caddddr, cadddr, caddr, cadr, car, cdaddr, cdadr, cdar, cddaddr, cddar, cdddaddr, cddddr, cdddr, cddr, cdr, Cons, Double, isadd, iscons, isdouble, isfactorial, ismultiply, isNumericAtom, ispower, isrational, isstr, issymbol, istensor, Num, Str, Sym, Tensor, U } from './runtime/defs';
import { Find } from './runtime/find';
import { init } from './runtime/init';
import { run } from './runtime/run';
import { collectUserSymbols, get_binding, iskeyword, set_binding, symbol, usr_symbol } from './runtime/symbol';
import { exec, parse } from './runtime/zombocom';
import { approxAll, approxRadicals, approxRationalsOfLogs, testApprox } from './sources/approxratio';
import { make_hashed_itab } from './sources/integral';
import { iscomplexnumber, iseveninteger, isfloating, isfraction, isimaginarynumber, isimaginaryunit, isinteger, isintegerfactor, isminusone, isminusoneoversqrttwo, isnegative, isnegativenumber, isnegativeterm, isnonnegativeinteger, isnpi, isoneover, isoneoversqrttwo, isplusone, isposint, isquarterturn, issymbolic, isZeroAtomOrTensor } from './sources/is';
import { equal, length } from './sources/misc';
import { scan } from './sources/scan';
declare const functions: {
    version: string;
    isadd: typeof isadd;
    ismultiply: typeof ismultiply;
    ispower: typeof ispower;
    isfactorial: typeof isfactorial;
    car: typeof car;
    cdr: typeof cdr;
    caar: typeof caar;
    cadr: typeof cadr;
    cdar: typeof cdar;
    cddr: typeof cddr;
    caadr: typeof caadr;
    caddr: typeof caddr;
    cadar: typeof cadar;
    cdadr: typeof cdadr;
    cddar: typeof cddar;
    cdddr: typeof cdddr;
    caaddr: typeof caaddr;
    cadadr: typeof cadadr;
    caddar: typeof caddar;
    cdaddr: typeof cdaddr;
    cadddr: typeof cadddr;
    cddddr: typeof cddddr;
    caddddr: typeof caddddr;
    cadaddr: typeof cadaddr;
    cddaddr: typeof cddaddr;
    caddadr: typeof caddadr;
    cdddaddr: typeof cdddaddr;
    caddaddr: typeof caddaddr;
    symbol: typeof symbol;
    iscons: typeof iscons;
    isrational: typeof isrational;
    isdouble: typeof isdouble;
    isNumericAtom: typeof isNumericAtom;
    isstr: typeof isstr;
    istensor: typeof istensor;
    issymbol: typeof issymbol;
    iskeyword: typeof iskeyword;
    CONS: number;
    Cons: typeof Cons;
    NUM: number;
    Num: typeof Num;
    DOUBLE: number;
    Double: typeof Double;
    STR: number;
    Str: typeof Str;
    TENSOR: number;
    Tensor: typeof Tensor;
    SYM: number;
    Sym: typeof Sym;
    approxRadicals: typeof approxRadicals;
    approxRationalsOfLogs: typeof approxRationalsOfLogs;
    approxAll: typeof approxAll;
    testApprox: typeof testApprox;
    make_hashed_itab: typeof make_hashed_itab;
    isZeroAtomOrTensor: typeof isZeroAtomOrTensor;
    isnegativenumber: typeof isnegativenumber;
    isplusone: typeof isplusone;
    isminusone: typeof isminusone;
    isinteger: typeof isinteger;
    isnonnegativeinteger: typeof isnonnegativeinteger;
    isposint: typeof isposint;
    isnegativeterm: typeof isnegativeterm;
    isimaginarynumber: typeof isimaginarynumber;
    iscomplexnumber: typeof iscomplexnumber;
    iseveninteger: typeof iseveninteger;
    isnegative: typeof isnegative;
    issymbolic: typeof issymbolic;
    isintegerfactor: typeof isintegerfactor;
    isoneover: typeof isoneover;
    isfraction: typeof isfraction;
    isoneoversqrttwo: typeof isoneoversqrttwo;
    isminusoneoversqrttwo: typeof isminusoneoversqrttwo;
    isfloating: typeof isfloating;
    isimaginaryunit: typeof isimaginaryunit;
    isquarterturn: typeof isquarterturn;
    isnpi: typeof isnpi;
    equal: typeof equal;
    length: typeof length;
    scan: typeof scan;
    Find: typeof Find;
    get_binding: typeof get_binding;
    set_binding: typeof set_binding;
    usr_symbol: typeof usr_symbol;
    collectUserSymbols: typeof collectUserSymbols;
    init: typeof init;
    exec: typeof exec;
    parse: typeof parse;
    run: typeof run;
};
declare type builtInKeys = 'abs' | 'add' | 'adj' | 'and' | 'approxratio' | 'arccos' | 'arccosh' | 'arcsin' | 'arcsinh' | 'arctan' | 'arctanh' | 'arg' | 'atomize' | 'besselj' | 'bessely' | 'binding' | 'binomial' | 'ceiling' | 'check' | 'choose' | 'circexp' | 'clear' | 'clearall' | 'clearpatterns' | 'clock' | 'coeff' | 'cofactor' | 'condense' | 'conj' | 'contract' | 'cos' | 'cosh' | 'decomp' | 'defint' | 'deg' | 'denominator' | 'det' | 'derivative' | 'dim' | 'dirac' | 'divisors' | 'do' | 'dot' | 'draw' | 'dsolve' | 'eigen' | 'eigenval' | 'eigenvec' | 'erf' | 'erfc' | 'eval' | 'exp' | 'expand' | 'expcos' | 'expsin' | 'factor' | 'factorial' | 'factorpoly' | 'filter' | 'float' | 'floor' | 'for' | 'Gamma' | 'gcd' | 'hermite' | 'hilbert' | 'imag' | 'component' | 'inner' | 'integral' | 'inv' | 'invg' | 'isinteger' | 'isprime' | 'laguerre' | 'lcm' | 'leading' | 'legendre' | 'log' | 'mod' | 'multiply' | 'not' | 'nroots' | 'number' | 'numerator' | 'operator' | 'or' | 'outer' | 'pattern' | 'patternsinfo' | 'polar' | 'power' | 'prime' | 'print' | 'print2dascii' | 'printcomputer' | 'printlatex' | 'printlist' | 'printhuman' | 'product' | 'quote' | 'quotient' | 'rank' | 'rationalize' | 'real' | 'rect' | 'roots' | 'round' | 'equals' | 'shape' | 'sgn' | 'silentpattern' | 'simplify' | 'sin' | 'sinh' | 'sqrt' | 'stop' | 'subst' | 'sum' | 'symbolsinfo' | 'tan' | 'tanh' | 'taylor' | 'test' | 'testeq' | 'testge' | 'testgt' | 'testle' | 'testlt' | 'transpose' | 'unit' | 'zero';
declare type Ux = U | number | string | BigInteger;
declare const $: typeof functions & {
    [key in builtInKeys]: (...args: Ux[]) => U;
};
export default $;
