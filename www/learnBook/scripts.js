/*JavaScript*/

"use strict";

function foo(a, b = 'y', c = 'z') {
	console.log(arguments.length);
	console.log(a === arguments[0]);
	console.log(b === arguments[1]);
	console.log(arguments[1]);
	console.log(b);
	a = 'c';
	b = 'd';
	console.log(a === arguments[0]);
	console.log(b === arguments[1]);
}

foo('a');