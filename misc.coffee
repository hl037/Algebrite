#include "stdafx.h"
#include "defs.h"

# s is a string
new_string = (s) ->
	save();
	p1 = new U();
	p1.k = STR;
	p1.str = s;
	push(p1);
	restore();

out_of_memory = ->
	stop("out of memory");

# both ints
push_zero_matrix = (i,j) ->
	push(alloc_tensor(i * j));
	stack[tos - 1].tensor.ndim = 2;
	stack[tos - 1].tensor.dim[0] = i;
	stack[tos - 1].tensor.dim[1] = j;

push_identity_matrix = (n) ->
	push_zero_matrix(n, n);
	for i in [0...n]
		stack[tos - 1].tensor.elem[i * n + i] = one;

push_cars = (p) ->
	while (iscons(p))
		push(car(p));
		p = cdr(p);

peek = ->
	save();
	p1 = pop();
	push(p1);
	printline(p1);
	restore();

peek2 = ->
	print_lisp(stack[tos - 2]);
	print_lisp(stack[tos - 1]);

equal = (p1,p2) ->
	if (cmp_expr(p1, p2) == 0)
		return 1;
	else
		return 0;

lessp = (p1,p2) ->
	if (cmp_expr(p1, p2) < 0)
		return 1;
	else
		return 0;

sign = (n) ->
	if (n < 0)
		return -1;
	else if (n > 0)
		return 1;
	else
		return 0;

cmp_expr = (p1, p2) ->
	n = 0

	if (p1 == p2)
		return 0;

	if (p1 == symbol(NIL))
		return -1;

	if (p2 == symbol(NIL))
		return 1;

	if (isnum(p1) && isnum(p2))
		return sign(compare_numbers(p1, p2));

	if (isnum(p1))
		return -1;

	if (isnum(p2))
		return 1;

	if (isstr(p1) && isstr(p2))
		return sign(p1.str.localeCompare(p2.str));

	if (isstr(p1))
		return -1;

	if (isstr(p2))
		return 1;

	if (issymbol(p1) && issymbol(p2))
		return sign(get_printname(p1).localeCompare(get_printname(p2)));

	if (issymbol(p1))
		return -1;

	if (issymbol(p2))
		return 1;

	if (istensor(p1) && istensor(p2))
		return compare_tensors(p1, p2);

	if (istensor(p1))
		return -1;

	if (istensor(p2))
		return 1;

	while (iscons(p1) && iscons(p2))
		n = cmp_expr(car(p1), car(p2));
		if (n != 0)
			return n;
		p1 = cdr(p1);
		p2 = cdr(p2);

	if (iscons(p2))
		return -1;

	if (iscons(p1))
		return 1;

	return 0;

length = (p) ->
	n = 0;
	while (iscons(p))
		p = cdr(p);
		n++;
	return n;

unique = (p) ->
	save();
	p1 = symbol(NIL);
	p2 = symbol(NIL);
	unique_f(p);
	if (p2 != symbol(NIL))
		p1 = symbol(NIL);
	p = p1;
	restore();
	return p;

unique_f = (p) ->
	if (isstr(p))
		if (p1 == symbol(NIL))
			p1 = p;
		else if (p != p1)
			p2 = p;
		return;
	while (iscons(p))
		unique_f(car(p));
		if (p2 != symbol(NIL))
			return;
		p = cdr(p);


#if 0
###
void
check_endianess(void)
{
	int tmp = 1;
	if (((char *) &tmp)[0] == 1 && Y_LITTLE_ENDIAN == 0) {
		printf("Please change Y_LITTLE_ENDIAN to 1 in defs.h and recompile.\n");
		Exit(1);
	}
	if (((char *) &tmp)[0] == 0 && Y_LITTLE_ENDIAN != 0) {
		printf("Please change Y_LITTLE_ENDIAN to 0 in defs.h and recompile.\n");
		Exit(1);
	}
}
###
#endif

ssqrt = ->
	push_rational(1, 2);
	power();

yyexpand = ->
	int x;
	x = expanding;
	expanding = 1;
	eval();
	expanding = x;

exponential = ->
	push_symbol(E);
	swap();
	power();

square = ->
	push_integer(2);
	power();

__cmp = (p1, p2) ->
	# !!!! this is likely to be mangles
	console.log "__cmp(p1, p2) likely to be mangled"
	return cmp_expr(p1, p2);

# n an integer
sort_stack = (n) ->
	# !!!!! not yet translated
	console.log "!!! sort_stack not yet translated"
	qsort(stack[tos - n], n, aaa , __cmp);
