// Require vendor files here, using sprockets or snockets directives

/*!

 * jQuery JavaScript Library v3.4.1

 * https://jquery.com/

 *

 * Includes Sizzle.js

 * https://sizzlejs.com/

 *

 * Copyright JS Foundation and other contributors

 * Released under the MIT license

 * https://jquery.org/license

 *

 * Date: 2019-05-01T21:04Z

 */

( function( global, factory ) {



	"use strict";



	if ( typeof module === "object" && typeof module.exports === "object" ) {



		// For CommonJS and CommonJS-like environments where a proper `window`

		// is present, execute the factory and get jQuery.

		// For environments that do not have a `window` with a `document`

		// (such as Node.js), expose a factory as module.exports.

		// This accentuates the need for the creation of a real `window`.

		// e.g. var jQuery = require("jquery")(window);

		// See ticket #14549 for more info.

		module.exports = global.document ?

			factory( global, true ) :

			function( w ) {

				if ( !w.document ) {

					throw new Error( "jQuery requires a window with a document" );

				}

				return factory( w );

			};

	} else {

		factory( global );

	}



// Pass this if window is not defined yet

} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {



// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1

// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode

// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common

// enough that all such attempts are guarded in a try block.

"use strict";



var arr = [];



var document = window.document;



var getProto = Object.getPrototypeOf;



var slice = arr.slice;



var concat = arr.concat;



var push = arr.push;



var indexOf = arr.indexOf;



var class2type = {};



var toString = class2type.toString;



var hasOwn = class2type.hasOwnProperty;



var fnToString = hasOwn.toString;



var ObjectFunctionString = fnToString.call( Object );



var support = {};



var isFunction = function isFunction( obj ) {



      // Support: Chrome <=57, Firefox <=52

      // In some browsers, typeof returns "function" for HTML <object> elements

      // (i.e., `typeof document.createElement( "object" ) === "function"`).

      // We don't want to classify *any* DOM node as a function.

      return typeof obj === "function" && typeof obj.nodeType !== "number";

  };





var isWindow = function isWindow( obj ) {

		return obj != null && obj === obj.window;

	};









	var preservedScriptAttributes = {

		type: true,

		src: true,

		nonce: true,

		noModule: true

	};



	function DOMEval( code, node, doc ) {

		doc = doc || document;



		var i, val,

			script = doc.createElement( "script" );



		script.text = code;

		if ( node ) {

			for ( i in preservedScriptAttributes ) {



				// Support: Firefox 64+, Edge 18+

				// Some browsers don't support the "nonce" property on scripts.

				// On the other hand, just using `getAttribute` is not enough as

				// the `nonce` attribute is reset to an empty string whenever it

				// becomes browsing-context connected.

				// See https://github.com/whatwg/html/issues/2369

				// See https://html.spec.whatwg.org/#nonce-attributes

				// The `node.getAttribute` check was added for the sake of

				// `jQuery.globalEval` so that it can fake a nonce-containing node

				// via an object.

				val = node[ i ] || node.getAttribute && node.getAttribute( i );

				if ( val ) {

					script.setAttribute( i, val );

				}

			}

		}

		doc.head.appendChild( script ).parentNode.removeChild( script );

	}





function toType( obj ) {

	if ( obj == null ) {

		return obj + "";

	}



	// Support: Android <=2.3 only (functionish RegExp)

	return typeof obj === "object" || typeof obj === "function" ?

		class2type[ toString.call( obj ) ] || "object" :

		typeof obj;

}

/* global Symbol */

// Defining this global in .eslintrc.json would create a danger of using the global

// unguarded in another place, it seems safer to define global only for this module







var

	version = "3.4.1",



	// Define a local copy of jQuery

	jQuery = function( selector, context ) {



		// The jQuery object is actually just the init constructor 'enhanced'

		// Need init if jQuery is called (just allow error to be thrown if not included)

		return new jQuery.fn.init( selector, context );

	},



	// Support: Android <=4.0 only

	// Make sure we trim BOM and NBSP

	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;



jQuery.fn = jQuery.prototype = {



	// The current version of jQuery being used

	jquery: version,



	constructor: jQuery,



	// The default length of a jQuery object is 0

	length: 0,



	toArray: function() {

		return slice.call( this );

	},



	// Get the Nth element in the matched element set OR

	// Get the whole matched element set as a clean array

	get: function( num ) {



		// Return all the elements in a clean array

		if ( num == null ) {

			return slice.call( this );

		}



		// Return just the one element from the set

		return num < 0 ? this[ num + this.length ] : this[ num ];

	},



	// Take an array of elements and push it onto the stack

	// (returning the new matched element set)

	pushStack: function( elems ) {



		// Build a new jQuery matched element set

		var ret = jQuery.merge( this.constructor(), elems );



		// Add the old object onto the stack (as a reference)

		ret.prevObject = this;



		// Return the newly-formed element set

		return ret;

	},



	// Execute a callback for every element in the matched set.

	each: function( callback ) {

		return jQuery.each( this, callback );

	},



	map: function( callback ) {

		return this.pushStack( jQuery.map( this, function( elem, i ) {

			return callback.call( elem, i, elem );

		} ) );

	},



	slice: function() {

		return this.pushStack( slice.apply( this, arguments ) );

	},



	first: function() {

		return this.eq( 0 );

	},



	last: function() {

		return this.eq( -1 );

	},



	eq: function( i ) {

		var len = this.length,

			j = +i + ( i < 0 ? len : 0 );

		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );

	},



	end: function() {

		return this.prevObject || this.constructor();

	},



	// For internal use only.

	// Behaves like an Array's method, not like a jQuery method.

	push: push,

	sort: arr.sort,

	splice: arr.splice

};



jQuery.extend = jQuery.fn.extend = function() {

	var options, name, src, copy, copyIsArray, clone,

		target = arguments[ 0 ] || {},

		i = 1,

		length = arguments.length,

		deep = false;



	// Handle a deep copy situation

	if ( typeof target === "boolean" ) {

		deep = target;



		// Skip the boolean and the target

		target = arguments[ i ] || {};

		i++;

	}



	// Handle case when target is a string or something (possible in deep copy)

	if ( typeof target !== "object" && !isFunction( target ) ) {

		target = {};

	}



	// Extend jQuery itself if only one argument is passed

	if ( i === length ) {

		target = this;

		i--;

	}



	for ( ; i < length; i++ ) {



		// Only deal with non-null/undefined values

		if ( ( options = arguments[ i ] ) != null ) {



			// Extend the base object

			for ( name in options ) {

				copy = options[ name ];



				// Prevent Object.prototype pollution

				// Prevent never-ending loop

				if ( name === "__proto__" || target === copy ) {

					continue;

				}



				// Recurse if we're merging plain objects or arrays

				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||

					( copyIsArray = Array.isArray( copy ) ) ) ) {

					src = target[ name ];



					// Ensure proper type for the source value

					if ( copyIsArray && !Array.isArray( src ) ) {

						clone = [];

					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {

						clone = {};

					} else {

						clone = src;

					}

					copyIsArray = false;



					// Never move original objects, clone them

					target[ name ] = jQuery.extend( deep, clone, copy );



				// Don't bring in undefined values

				} else if ( copy !== undefined ) {

					target[ name ] = copy;

				}

			}

		}

	}



	// Return the modified object

	return target;

};



jQuery.extend( {



	// Unique for each copy of jQuery on the page

	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),



	// Assume jQuery is ready without the ready module

	isReady: true,



	error: function( msg ) {

		throw new Error( msg );

	},



	noop: function() {},



	isPlainObject: function( obj ) {

		var proto, Ctor;



		// Detect obvious negatives

		// Use toString instead of jQuery.type to catch host objects

		if ( !obj || toString.call( obj ) !== "[object Object]" ) {

			return false;

		}



		proto = getProto( obj );



		// Objects with no prototype (e.g., `Object.create( null )`) are plain

		if ( !proto ) {

			return true;

		}



		// Objects with prototype are plain iff they were constructed by a global Object function

		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;

		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;

	},



	isEmptyObject: function( obj ) {

		var name;



		for ( name in obj ) {

			return false;

		}

		return true;

	},



	// Evaluates a script in a global context

	globalEval: function( code, options ) {

		DOMEval( code, { nonce: options && options.nonce } );

	},



	each: function( obj, callback ) {

		var length, i = 0;



		if ( isArrayLike( obj ) ) {

			length = obj.length;

			for ( ; i < length; i++ ) {

				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {

					break;

				}

			}

		} else {

			for ( i in obj ) {

				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {

					break;

				}

			}

		}



		return obj;

	},



	// Support: Android <=4.0 only

	trim: function( text ) {

		return text == null ?

			"" :

			( text + "" ).replace( rtrim, "" );

	},



	// results is for internal usage only

	makeArray: function( arr, results ) {

		var ret = results || [];



		if ( arr != null ) {

			if ( isArrayLike( Object( arr ) ) ) {

				jQuery.merge( ret,

					typeof arr === "string" ?

					[ arr ] : arr

				);

			} else {

				push.call( ret, arr );

			}

		}



		return ret;

	},



	inArray: function( elem, arr, i ) {

		return arr == null ? -1 : indexOf.call( arr, elem, i );

	},



	// Support: Android <=4.0 only, PhantomJS 1 only

	// push.apply(_, arraylike) throws on ancient WebKit

	merge: function( first, second ) {

		var len = +second.length,

			j = 0,

			i = first.length;



		for ( ; j < len; j++ ) {

			first[ i++ ] = second[ j ];

		}



		first.length = i;



		return first;

	},



	grep: function( elems, callback, invert ) {

		var callbackInverse,

			matches = [],

			i = 0,

			length = elems.length,

			callbackExpect = !invert;



		// Go through the array, only saving the items

		// that pass the validator function

		for ( ; i < length; i++ ) {

			callbackInverse = !callback( elems[ i ], i );

			if ( callbackInverse !== callbackExpect ) {

				matches.push( elems[ i ] );

			}

		}



		return matches;

	},



	// arg is for internal usage only

	map: function( elems, callback, arg ) {

		var length, value,

			i = 0,

			ret = [];



		// Go through the array, translating each of the items to their new values

		if ( isArrayLike( elems ) ) {

			length = elems.length;

			for ( ; i < length; i++ ) {

				value = callback( elems[ i ], i, arg );



				if ( value != null ) {

					ret.push( value );

				}

			}



		// Go through every key on the object,

		} else {

			for ( i in elems ) {

				value = callback( elems[ i ], i, arg );



				if ( value != null ) {

					ret.push( value );

				}

			}

		}



		// Flatten any nested arrays

		return concat.apply( [], ret );

	},



	// A global GUID counter for objects

	guid: 1,



	// jQuery.support is not used in Core but other projects attach their

	// properties to it so it needs to exist.

	support: support

} );



if ( typeof Symbol === "function" ) {

	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];

}



// Populate the class2type map

jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),

function( i, name ) {

	class2type[ "[object " + name + "]" ] = name.toLowerCase();

} );



function isArrayLike( obj ) {



	// Support: real iOS 8.2 only (not reproducible in simulator)

	// `in` check used to prevent JIT error (gh-2145)

	// hasOwn isn't used here due to false negatives

	// regarding Nodelist length in IE

	var length = !!obj && "length" in obj && obj.length,

		type = toType( obj );



	if ( isFunction( obj ) || isWindow( obj ) ) {

		return false;

	}



	return type === "array" || length === 0 ||

		typeof length === "number" && length > 0 && ( length - 1 ) in obj;

}

var Sizzle =

/*!

 * Sizzle CSS Selector Engine v2.3.4

 * https://sizzlejs.com/

 *

 * Copyright JS Foundation and other contributors

 * Released under the MIT license

 * https://js.foundation/

 *

 * Date: 2019-04-08

 */

(function( window ) {



var i,

	support,

	Expr,

	getText,

	isXML,

	tokenize,

	compile,

	select,

	outermostContext,

	sortInput,

	hasDuplicate,



	// Local document vars

	setDocument,

	document,

	docElem,

	documentIsHTML,

	rbuggyQSA,

	rbuggyMatches,

	matches,

	contains,



	// Instance-specific data

	expando = "sizzle" + 1 * new Date(),

	preferredDoc = window.document,

	dirruns = 0,

	done = 0,

	classCache = createCache(),

	tokenCache = createCache(),

	compilerCache = createCache(),

	nonnativeSelectorCache = createCache(),

	sortOrder = function( a, b ) {

		if ( a === b ) {

			hasDuplicate = true;

		}

		return 0;

	},



	// Instance methods

	hasOwn = ({}).hasOwnProperty,

	arr = [],

	pop = arr.pop,

	push_native = arr.push,

	push = arr.push,

	slice = arr.slice,

	// Use a stripped-down indexOf as it's faster than native

	// https://jsperf.com/thor-indexof-vs-for/5

	indexOf = function( list, elem ) {

		var i = 0,

			len = list.length;

		for ( ; i < len; i++ ) {

			if ( list[i] === elem ) {

				return i;

			}

		}

		return -1;

	},



	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",



	// Regular expressions



	// http://www.w3.org/TR/css3-selectors/#whitespace

	whitespace = "[\\x20\\t\\r\\n\\f]",



	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier

	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",



	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors

	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)

		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"

		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +

		"*\\]",



	pseudos = ":(" + identifier + ")(?:\\((" +

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:

		// 1. quoted (capture 3; capture 4 or capture 5)

		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

		// 2. simple (capture 6)

		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

		// 3. anything else (capture 2)

		".*" +

		")\\)|)",



	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter

	rwhitespace = new RegExp( whitespace + "+", "g" ),

	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),



	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),

	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rdescend = new RegExp( whitespace + "|>" ),



	rpseudo = new RegExp( pseudos ),

	ridentifier = new RegExp( "^" + identifier + "$" ),



	matchExpr = {

		"ID": new RegExp( "^#(" + identifier + ")" ),

		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),

		"TAG": new RegExp( "^(" + identifier + "|[*])" ),

		"ATTR": new RegExp( "^" + attributes ),

		"PSEUDO": new RegExp( "^" + pseudos ),

		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +

			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +

			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),

		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()

		// We use this for POS matching in `select`

		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +

			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )

	},



	rhtml = /HTML$/i,

	rinputs = /^(?:input|select|textarea|button)$/i,

	rheader = /^h\d$/i,



	rnative = /^[^{]+\{\s*\[native \w/,



	// Easily-parseable/retrievable ID or TAG or CLASS selectors

	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,



	rsibling = /[+~]/,



	// CSS escapes

	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters

	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),

	funescape = function( _, escaped, escapedWhitespace ) {

		var high = "0x" + escaped - 0x10000;

		// NaN means non-codepoint

		// Support: Firefox<24

		// Workaround erroneous numeric interpretation of +"0x"

		return high !== high || escapedWhitespace ?

			escaped :

			high < 0 ?

				// BMP codepoint

				String.fromCharCode( high + 0x10000 ) :

				// Supplemental Plane codepoint (surrogate pair)

				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );

	},



	// CSS string/identifier serialization

	// https://drafts.csswg.org/cssom/#common-serializing-idioms

	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,

	fcssescape = function( ch, asCodePoint ) {

		if ( asCodePoint ) {



			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER

			if ( ch === "\0" ) {

				return "\uFFFD";

			}



			// Control characters and (dependent upon position) numbers get escaped as code points

			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";

		}



		// Other potentially-special ASCII characters get backslash-escaped

		return "\\" + ch;

	},



	// Used for iframes

	// See setDocument()

	// Removing the function wrapper causes a "Permission Denied"

	// error in IE

	unloadHandler = function() {

		setDocument();

	},



	inDisabledFieldset = addCombinator(

		function( elem ) {

			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";

		},

		{ dir: "parentNode", next: "legend" }

	);



// Optimize for push.apply( _, NodeList )

try {

	push.apply(

		(arr = slice.call( preferredDoc.childNodes )),

		preferredDoc.childNodes

	);

	// Support: Android<4.0

	// Detect silently failing push.apply

	arr[ preferredDoc.childNodes.length ].nodeType;

} catch ( e ) {

	push = { apply: arr.length ?



		// Leverage slice if possible

		function( target, els ) {

			push_native.apply( target, slice.call(els) );

		} :



		// Support: IE<9

		// Otherwise append directly

		function( target, els ) {

			var j = target.length,

				i = 0;

			// Can't trust NodeList.length

			while ( (target[j++] = els[i++]) ) {}

			target.length = j - 1;

		}

	};

}



function Sizzle( selector, context, results, seed ) {

	var m, i, elem, nid, match, groups, newSelector,

		newContext = context && context.ownerDocument,



		// nodeType defaults to 9, since context defaults to document

		nodeType = context ? context.nodeType : 9;



	results = results || [];



	// Return early from calls with invalid selector or context

	if ( typeof selector !== "string" || !selector ||

		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {



		return results;

	}



	// Try to shortcut find operations (as opposed to filters) in HTML documents

	if ( !seed ) {



		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {

			setDocument( context );

		}

		context = context || document;



		if ( documentIsHTML ) {



			// If the selector is sufficiently simple, try using a "get*By*" DOM method

			// (excepting DocumentFragment context, where the methods don't exist)

			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {



				// ID selector

				if ( (m = match[1]) ) {



					// Document context

					if ( nodeType === 9 ) {

						if ( (elem = context.getElementById( m )) ) {



							// Support: IE, Opera, Webkit

							// TODO: identify versions

							// getElementById can match elements by name instead of ID

							if ( elem.id === m ) {

								results.push( elem );

								return results;

							}

						} else {

							return results;

						}



					// Element context

					} else {



						// Support: IE, Opera, Webkit

						// TODO: identify versions

						// getElementById can match elements by name instead of ID

						if ( newContext && (elem = newContext.getElementById( m )) &&

							contains( context, elem ) &&

							elem.id === m ) {



							results.push( elem );

							return results;

						}

					}



				// Type selector

				} else if ( match[2] ) {

					push.apply( results, context.getElementsByTagName( selector ) );

					return results;



				// Class selector

				} else if ( (m = match[3]) && support.getElementsByClassName &&

					context.getElementsByClassName ) {



					push.apply( results, context.getElementsByClassName( m ) );

					return results;

				}

			}



			// Take advantage of querySelectorAll

			if ( support.qsa &&

				!nonnativeSelectorCache[ selector + " " ] &&

				(!rbuggyQSA || !rbuggyQSA.test( selector )) &&



				// Support: IE 8 only

				// Exclude object elements

				(nodeType !== 1 || context.nodeName.toLowerCase() !== "object") ) {



				newSelector = selector;

				newContext = context;



				// qSA considers elements outside a scoping root when evaluating child or

				// descendant combinators, which is not what we want.

				// In such cases, we work around the behavior by prefixing every selector in the

				// list with an ID selector referencing the scope context.

				// Thanks to Andrew Dupont for this technique.

				if ( nodeType === 1 && rdescend.test( selector ) ) {



					// Capture the context ID, setting it first if necessary

					if ( (nid = context.getAttribute( "id" )) ) {

						nid = nid.replace( rcssescape, fcssescape );

					} else {

						context.setAttribute( "id", (nid = expando) );

					}



					// Prefix every selector in the list

					groups = tokenize( selector );

					i = groups.length;

					while ( i-- ) {

						groups[i] = "#" + nid + " " + toSelector( groups[i] );

					}

					newSelector = groups.join( "," );



					// Expand context for sibling selectors

					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||

						context;

				}



				try {

					push.apply( results,

						newContext.querySelectorAll( newSelector )

					);

					return results;

				} catch ( qsaError ) {

					nonnativeSelectorCache( selector, true );

				} finally {

					if ( nid === expando ) {

						context.removeAttribute( "id" );

					}

				}

			}

		}

	}



	// All others

	return select( selector.replace( rtrim, "$1" ), context, results, seed );

}



/**

 * Create key-value caches of limited size

 * @returns {function(string, object)} Returns the Object data after storing it on itself with

 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)

 *	deleting the oldest entry

 */

function createCache() {

	var keys = [];



	function cache( key, value ) {

		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)

		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Only keep the most recent entries

			delete cache[ keys.shift() ];

		}

		return (cache[ key + " " ] = value);

	}

	return cache;

}



/**

 * Mark a function for special use by Sizzle

 * @param {Function} fn The function to mark

 */

function markFunction( fn ) {

	fn[ expando ] = true;

	return fn;

}



/**

 * Support testing using an element

 * @param {Function} fn Passed the created element and returns a boolean result

 */

function assert( fn ) {

	var el = document.createElement("fieldset");



	try {

		return !!fn( el );

	} catch (e) {

		return false;

	} finally {

		// Remove from its parent by default

		if ( el.parentNode ) {

			el.parentNode.removeChild( el );

		}

		// release memory in IE

		el = null;

	}

}



/**

 * Adds the same handler for all of the specified attrs

 * @param {String} attrs Pipe-separated list of attributes

 * @param {Function} handler The method that will be applied

 */

function addHandle( attrs, handler ) {

	var arr = attrs.split("|"),

		i = arr.length;



	while ( i-- ) {

		Expr.attrHandle[ arr[i] ] = handler;

	}

}



/**

 * Checks document order of two siblings

 * @param {Element} a

 * @param {Element} b

 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b

 */

function siblingCheck( a, b ) {

	var cur = b && a,

		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&

			a.sourceIndex - b.sourceIndex;



	// Use IE sourceIndex if available on both nodes

	if ( diff ) {

		return diff;

	}



	// Check if b follows a

	if ( cur ) {

		while ( (cur = cur.nextSibling) ) {

			if ( cur === b ) {

				return -1;

			}

		}

	}



	return a ? 1 : -1;

}



/**

 * Returns a function to use in pseudos for input types

 * @param {String} type

 */

function createInputPseudo( type ) {

	return function( elem ) {

		var name = elem.nodeName.toLowerCase();

		return name === "input" && elem.type === type;

	};

}



/**

 * Returns a function to use in pseudos for buttons

 * @param {String} type

 */

function createButtonPseudo( type ) {

	return function( elem ) {

		var name = elem.nodeName.toLowerCase();

		return (name === "input" || name === "button") && elem.type === type;

	};

}



/**

 * Returns a function to use in pseudos for :enabled/:disabled

 * @param {Boolean} disabled true for :disabled; false for :enabled

 */

function createDisabledPseudo( disabled ) {



	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable

	return function( elem ) {



		// Only certain elements can match :enabled or :disabled

		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled

		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled

		if ( "form" in elem ) {



			// Check for inherited disabledness on relevant non-disabled elements:

			// * listed form-associated elements in a disabled fieldset

			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed

			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled

			// * option elements in a disabled optgroup

			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled

			// All such elements have a "form" property.

			if ( elem.parentNode && elem.disabled === false ) {



				// Option elements defer to a parent optgroup if present

				if ( "label" in elem ) {

					if ( "label" in elem.parentNode ) {

						return elem.parentNode.disabled === disabled;

					} else {

						return elem.disabled === disabled;

					}

				}



				// Support: IE 6 - 11

				// Use the isDisabled shortcut property to check for disabled fieldset ancestors

				return elem.isDisabled === disabled ||



					// Where there is no isDisabled, check manually

					/* jshint -W018 */

					elem.isDisabled !== !disabled &&

						inDisabledFieldset( elem ) === disabled;

			}



			return elem.disabled === disabled;



		// Try to winnow out elements that can't be disabled before trusting the disabled property.

		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't

		// even exist on them, let alone have a boolean value.

		} else if ( "label" in elem ) {

			return elem.disabled === disabled;

		}



		// Remaining elements are neither :enabled nor :disabled

		return false;

	};

}



/**

 * Returns a function to use in pseudos for positionals

 * @param {Function} fn

 */

function createPositionalPseudo( fn ) {

	return markFunction(function( argument ) {

		argument = +argument;

		return markFunction(function( seed, matches ) {

			var j,

				matchIndexes = fn( [], seed.length, argument ),

				i = matchIndexes.length;



			// Match elements found at the specified indexes

			while ( i-- ) {

				if ( seed[ (j = matchIndexes[i]) ] ) {

					seed[j] = !(matches[j] = seed[j]);

				}

			}

		});

	});

}



/**

 * Checks a node for validity as a Sizzle context

 * @param {Element|Object=} context

 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value

 */

function testContext( context ) {

	return context && typeof context.getElementsByTagName !== "undefined" && context;

}



// Expose support vars for convenience

support = Sizzle.support = {};



/**

 * Detects XML nodes

 * @param {Element|Object} elem An element or a document

 * @returns {Boolean} True iff elem is a non-HTML XML node

 */

isXML = Sizzle.isXML = function( elem ) {

	var namespace = elem.namespaceURI,

		docElem = (elem.ownerDocument || elem).documentElement;



	// Support: IE <=8

	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes

	// https://bugs.jquery.com/ticket/4833

	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );

};



/**

 * Sets document-related variables once based on the current document

 * @param {Element|Object} [doc] An element or document object to use to set the document

 * @returns {Object} Returns the current document

 */

setDocument = Sizzle.setDocument = function( node ) {

	var hasCompare, subWindow,

		doc = node ? node.ownerDocument || node : preferredDoc;



	// Return early if doc is invalid or already selected

	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {

		return document;

	}



	// Update global variables

	document = doc;

	docElem = document.documentElement;

	documentIsHTML = !isXML( document );



	// Support: IE 9-11, Edge

	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)

	if ( preferredDoc !== document &&

		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {



		// Support: IE 11, Edge

		if ( subWindow.addEventListener ) {

			subWindow.addEventListener( "unload", unloadHandler, false );



		// Support: IE 9 - 10 only

		} else if ( subWindow.attachEvent ) {

			subWindow.attachEvent( "onunload", unloadHandler );

		}

	}



	/* Attributes

	---------------------------------------------------------------------- */



	// Support: IE<8

	// Verify that getAttribute really returns attributes and not properties

	// (excepting IE8 booleans)

	support.attributes = assert(function( el ) {

		el.className = "i";

		return !el.getAttribute("className");

	});



	/* getElement(s)By*

	---------------------------------------------------------------------- */



	// Check if getElementsByTagName("*") returns only elements

	support.getElementsByTagName = assert(function( el ) {

		el.appendChild( document.createComment("") );

		return !el.getElementsByTagName("*").length;

	});



	// Support: IE<9

	support.getElementsByClassName = rnative.test( document.getElementsByClassName );



	// Support: IE<10

	// Check if getElementById returns elements by name

	// The broken getElementById methods don't pick up programmatically-set names,

	// so use a roundabout getElementsByName test

	support.getById = assert(function( el ) {

		docElem.appendChild( el ).id = expando;

		return !document.getElementsByName || !document.getElementsByName( expando ).length;

	});



	// ID filter and find

	if ( support.getById ) {

		Expr.filter["ID"] = function( id ) {

			var attrId = id.replace( runescape, funescape );

			return function( elem ) {

				return elem.getAttribute("id") === attrId;

			};

		};

		Expr.find["ID"] = function( id, context ) {

			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {

				var elem = context.getElementById( id );

				return elem ? [ elem ] : [];

			}

		};

	} else {

		Expr.filter["ID"] =  function( id ) {

			var attrId = id.replace( runescape, funescape );

			return function( elem ) {

				var node = typeof elem.getAttributeNode !== "undefined" &&

					elem.getAttributeNode("id");

				return node && node.value === attrId;

			};

		};



		// Support: IE 6 - 7 only

		// getElementById is not reliable as a find shortcut

		Expr.find["ID"] = function( id, context ) {

			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {

				var node, i, elems,

					elem = context.getElementById( id );



				if ( elem ) {



					// Verify the id attribute

					node = elem.getAttributeNode("id");

					if ( node && node.value === id ) {

						return [ elem ];

					}



					// Fall back on getElementsByName

					elems = context.getElementsByName( id );

					i = 0;

					while ( (elem = elems[i++]) ) {

						node = elem.getAttributeNode("id");

						if ( node && node.value === id ) {

							return [ elem ];

						}

					}

				}



				return [];

			}

		};

	}



	// Tag

	Expr.find["TAG"] = support.getElementsByTagName ?

		function( tag, context ) {

			if ( typeof context.getElementsByTagName !== "undefined" ) {

				return context.getElementsByTagName( tag );



			// DocumentFragment nodes don't have gEBTN

			} else if ( support.qsa ) {

				return context.querySelectorAll( tag );

			}

		} :



		function( tag, context ) {

			var elem,

				tmp = [],

				i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too

				results = context.getElementsByTagName( tag );



			// Filter out possible comments

			if ( tag === "*" ) {

				while ( (elem = results[i++]) ) {

					if ( elem.nodeType === 1 ) {

						tmp.push( elem );

					}

				}



				return tmp;

			}

			return results;

		};



	// Class

	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {

		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {

			return context.getElementsByClassName( className );

		}

	};



	/* QSA/matchesSelector

	---------------------------------------------------------------------- */



	// QSA and matchesSelector support



	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)

	rbuggyMatches = [];



	// qSa(:focus) reports false when true (Chrome 21)

	// We allow this because of a bug in IE8/9 that throws an error

	// whenever `document.activeElement` is accessed on an iframe

	// So, we allow :focus to pass through QSA all the time to avoid the IE error

	// See https://bugs.jquery.com/ticket/13378

	rbuggyQSA = [];



	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {

		// Build QSA regex

		// Regex strategy adopted from Diego Perini

		assert(function( el ) {

			// Select is set to empty string on purpose

			// This is to test IE's treatment of not explicitly

			// setting a boolean content attribute,

			// since its presence should be enough

			// https://bugs.jquery.com/ticket/12359

			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +

				"<select id='" + expando + "-\r\\' msallowcapture=''>" +

				"<option selected=''></option></select>";



			// Support: IE8, Opera 11-12.16

			// Nothing should be selected when empty strings follow ^= or $= or *=

			// The test attribute must be unknown in Opera but "safe" for WinRT

			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section

			if ( el.querySelectorAll("[msallowcapture^='']").length ) {

				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );

			}



			// Support: IE8

			// Boolean attributes and "value" are not treated correctly

			if ( !el.querySelectorAll("[selected]").length ) {

				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );

			}



			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+

			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {

				rbuggyQSA.push("~=");

			}



			// Webkit/Opera - :checked should return selected option elements

			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked

			// IE8 throws error here and will not see later tests

			if ( !el.querySelectorAll(":checked").length ) {

				rbuggyQSA.push(":checked");

			}



			// Support: Safari 8+, iOS 8+

			// https://bugs.webkit.org/show_bug.cgi?id=136851

			// In-page `selector#id sibling-combinator selector` fails

			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {

				rbuggyQSA.push(".#.+[+~]");

			}

		});



		assert(function( el ) {

			el.innerHTML = "<a href='' disabled='disabled'></a>" +

				"<select disabled='disabled'><option/></select>";



			// Support: Windows 8 Native Apps

			// The type and name attributes are restricted during .innerHTML assignment

			var input = document.createElement("input");

			input.setAttribute( "type", "hidden" );

			el.appendChild( input ).setAttribute( "name", "D" );



			// Support: IE8

			// Enforce case-sensitivity of name attribute

			if ( el.querySelectorAll("[name=d]").length ) {

				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );

			}



			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)

			// IE8 throws error here and will not see later tests

			if ( el.querySelectorAll(":enabled").length !== 2 ) {

				rbuggyQSA.push( ":enabled", ":disabled" );

			}



			// Support: IE9-11+

			// IE's :disabled selector does not pick up the children of disabled fieldsets

			docElem.appendChild( el ).disabled = true;

			if ( el.querySelectorAll(":disabled").length !== 2 ) {

				rbuggyQSA.push( ":enabled", ":disabled" );

			}



			// Opera 10-11 does not throw on post-comma invalid pseudos

			el.querySelectorAll("*,:x");

			rbuggyQSA.push(",.*:");

		});

	}



	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||

		docElem.webkitMatchesSelector ||

		docElem.mozMatchesSelector ||

		docElem.oMatchesSelector ||

		docElem.msMatchesSelector) )) ) {



		assert(function( el ) {

			// Check to see if it's possible to do matchesSelector

			// on a disconnected node (IE 9)

			support.disconnectedMatch = matches.call( el, "*" );



			// This should fail with an exception

			// Gecko does not error, returns false instead

			matches.call( el, "[s!='']:x" );

			rbuggyMatches.push( "!=", pseudos );

		});

	}



	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );

	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );



	/* Contains

	---------------------------------------------------------------------- */

	hasCompare = rnative.test( docElem.compareDocumentPosition );



	// Element contains another

	// Purposefully self-exclusive

	// As in, an element does not contain itself

	contains = hasCompare || rnative.test( docElem.contains ) ?

		function( a, b ) {

			var adown = a.nodeType === 9 ? a.documentElement : a,

				bup = b && b.parentNode;

			return a === bup || !!( bup && bup.nodeType === 1 && (

				adown.contains ?

					adown.contains( bup ) :

					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16

			));

		} :

		function( a, b ) {

			if ( b ) {

				while ( (b = b.parentNode) ) {

					if ( b === a ) {

						return true;

					}

				}

			}

			return false;

		};



	/* Sorting

	---------------------------------------------------------------------- */



	// Document order sorting

	sortOrder = hasCompare ?

	function( a, b ) {



		// Flag for duplicate removal

		if ( a === b ) {

			hasDuplicate = true;

			return 0;

		}



		// Sort on method existence if only one input has compareDocumentPosition

		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;

		if ( compare ) {

			return compare;

		}



		// Calculate position if both inputs belong to the same document

		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?

			a.compareDocumentPosition( b ) :



			// Otherwise we know they are disconnected

			1;



		// Disconnected nodes

		if ( compare & 1 ||

			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {



			// Choose the first element that is related to our preferred document

			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {

				return -1;

			}

			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {

				return 1;

			}



			// Maintain original order

			return sortInput ?

				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :

				0;

		}



		return compare & 4 ? -1 : 1;

	} :

	function( a, b ) {

		// Exit early if the nodes are identical

		if ( a === b ) {

			hasDuplicate = true;

			return 0;

		}



		var cur,

			i = 0,

			aup = a.parentNode,

			bup = b.parentNode,

			ap = [ a ],

			bp = [ b ];



		// Parentless nodes are either documents or disconnected

		if ( !aup || !bup ) {

			return a === document ? -1 :

				b === document ? 1 :

				aup ? -1 :

				bup ? 1 :

				sortInput ?

				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :

				0;



		// If the nodes are siblings, we can do a quick check

		} else if ( aup === bup ) {

			return siblingCheck( a, b );

		}



		// Otherwise we need full lists of their ancestors for comparison

		cur = a;

		while ( (cur = cur.parentNode) ) {

			ap.unshift( cur );

		}

		cur = b;

		while ( (cur = cur.parentNode) ) {

			bp.unshift( cur );

		}



		// Walk down the tree looking for a discrepancy

		while ( ap[i] === bp[i] ) {

			i++;

		}



		return i ?

			// Do a sibling check if the nodes have a common ancestor

			siblingCheck( ap[i], bp[i] ) :



			// Otherwise nodes in our document sort first

			ap[i] === preferredDoc ? -1 :

			bp[i] === preferredDoc ? 1 :

			0;

	};



	return document;

};



Sizzle.matches = function( expr, elements ) {

	return Sizzle( expr, null, null, elements );

};



Sizzle.matchesSelector = function( elem, expr ) {

	// Set document vars if needed

	if ( ( elem.ownerDocument || elem ) !== document ) {

		setDocument( elem );

	}



	if ( support.matchesSelector && documentIsHTML &&

		!nonnativeSelectorCache[ expr + " " ] &&

		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&

		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {



		try {

			var ret = matches.call( elem, expr );



			// IE 9's matchesSelector returns false on disconnected nodes

			if ( ret || support.disconnectedMatch ||

					// As well, disconnected nodes are said to be in a document

					// fragment in IE 9

					elem.document && elem.document.nodeType !== 11 ) {

				return ret;

			}

		} catch (e) {

			nonnativeSelectorCache( expr, true );

		}

	}



	return Sizzle( expr, document, null, [ elem ] ).length > 0;

};



Sizzle.contains = function( context, elem ) {

	// Set document vars if needed

	if ( ( context.ownerDocument || context ) !== document ) {

		setDocument( context );

	}

	return contains( context, elem );

};



Sizzle.attr = function( elem, name ) {

	// Set document vars if needed

	if ( ( elem.ownerDocument || elem ) !== document ) {

		setDocument( elem );

	}



	var fn = Expr.attrHandle[ name.toLowerCase() ],

		// Don't get fooled by Object.prototype properties (jQuery #13807)

		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?

			fn( elem, name, !documentIsHTML ) :

			undefined;



	return val !== undefined ?

		val :

		support.attributes || !documentIsHTML ?

			elem.getAttribute( name ) :

			(val = elem.getAttributeNode(name)) && val.specified ?

				val.value :

				null;

};



Sizzle.escape = function( sel ) {

	return (sel + "").replace( rcssescape, fcssescape );

};



Sizzle.error = function( msg ) {

	throw new Error( "Syntax error, unrecognized expression: " + msg );

};



/**

 * Document sorting and removing duplicates

 * @param {ArrayLike} results

 */

Sizzle.uniqueSort = function( results ) {

	var elem,

		duplicates = [],

		j = 0,

		i = 0;



	// Unless we *know* we can detect duplicates, assume their presence

	hasDuplicate = !support.detectDuplicates;

	sortInput = !support.sortStable && results.slice( 0 );

	results.sort( sortOrder );



	if ( hasDuplicate ) {

		while ( (elem = results[i++]) ) {

			if ( elem === results[ i ] ) {

				j = duplicates.push( i );

			}

		}

		while ( j-- ) {

			results.splice( duplicates[ j ], 1 );

		}

	}



	// Clear input after sorting to release objects

	// See https://github.com/jquery/sizzle/pull/225

	sortInput = null;



	return results;

};



/**

 * Utility function for retrieving the text value of an array of DOM nodes

 * @param {Array|Element} elem

 */

getText = Sizzle.getText = function( elem ) {

	var node,

		ret = "",

		i = 0,

		nodeType = elem.nodeType;



	if ( !nodeType ) {

		// If no nodeType, this is expected to be an array

		while ( (node = elem[i++]) ) {

			// Do not traverse comment nodes

			ret += getText( node );

		}

	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

		// Use textContent for elements

		// innerText usage removed for consistency of new lines (jQuery #11153)

		if ( typeof elem.textContent === "string" ) {

			return elem.textContent;

		} else {

			// Traverse its children

			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {

				ret += getText( elem );

			}

		}

	} else if ( nodeType === 3 || nodeType === 4 ) {

		return elem.nodeValue;

	}

	// Do not include comment or processing instruction nodes



	return ret;

};



Expr = Sizzle.selectors = {



	// Can be adjusted by the user

	cacheLength: 50,



	createPseudo: markFunction,



	match: matchExpr,



	attrHandle: {},



	find: {},



	relative: {

		">": { dir: "parentNode", first: true },

		" ": { dir: "parentNode" },

		"+": { dir: "previousSibling", first: true },

		"~": { dir: "previousSibling" }

	},



	preFilter: {

		"ATTR": function( match ) {

			match[1] = match[1].replace( runescape, funescape );



			// Move the given value to match[3] whether quoted or unquoted

			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );



			if ( match[2] === "~=" ) {

				match[3] = " " + match[3] + " ";

			}



			return match.slice( 0, 4 );

		},



		"CHILD": function( match ) {

			/* matches from matchExpr["CHILD"]

				1 type (only|nth|...)

				2 what (child|of-type)

				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)

				4 xn-component of xn+y argument ([+-]?\d*n|)

				5 sign of xn-component

				6 x of xn-component

				7 sign of y-component

				8 y of y-component

			*/

			match[1] = match[1].toLowerCase();



			if ( match[1].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument

				if ( !match[3] ) {

					Sizzle.error( match[0] );

				}



				// numeric x and y parameters for Expr.filter.CHILD

				// remember that false/true cast respectively to 0/1

				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );

				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );



			// other types prohibit arguments

			} else if ( match[3] ) {

				Sizzle.error( match[0] );

			}



			return match;

		},



		"PSEUDO": function( match ) {

			var excess,

				unquoted = !match[6] && match[2];



			if ( matchExpr["CHILD"].test( match[0] ) ) {

				return null;

			}



			// Accept quoted arguments as-is

			if ( match[3] ) {

				match[2] = match[4] || match[5] || "";



			// Strip excess characters from unquoted arguments

			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)

				(excess = tokenize( unquoted, true )) &&

				// advance to the next closing parenthesis

				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {



				// excess is a negative index

				match[0] = match[0].slice( 0, excess );

				match[2] = unquoted.slice( 0, excess );

			}



			// Return only captures needed by the pseudo filter method (type and argument)

			return match.slice( 0, 3 );

		}

	},



	filter: {



		"TAG": function( nodeNameSelector ) {

			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();

			return nodeNameSelector === "*" ?

				function() { return true; } :

				function( elem ) {

					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;

				};

		},



		"CLASS": function( className ) {

			var pattern = classCache[ className + " " ];



			return pattern ||

				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&

				classCache( className, function( elem ) {

					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );

				});

		},



		"ATTR": function( name, operator, check ) {

			return function( elem ) {

				var result = Sizzle.attr( elem, name );



				if ( result == null ) {

					return operator === "!=";

				}

				if ( !operator ) {

					return true;

				}



				result += "";



				return operator === "=" ? result === check :

					operator === "!=" ? result !== check :

					operator === "^=" ? check && result.indexOf( check ) === 0 :

					operator === "*=" ? check && result.indexOf( check ) > -1 :

					operator === "$=" ? check && result.slice( -check.length ) === check :

					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :

					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :

					false;

			};

		},



		"CHILD": function( type, what, argument, first, last ) {

			var simple = type.slice( 0, 3 ) !== "nth",

				forward = type.slice( -4 ) !== "last",

				ofType = what === "of-type";



			return first === 1 && last === 0 ?



				// Shortcut for :nth-*(n)

				function( elem ) {

					return !!elem.parentNode;

				} :



				function( elem, context, xml ) {

					var cache, uniqueCache, outerCache, node, nodeIndex, start,

						dir = simple !== forward ? "nextSibling" : "previousSibling",

						parent = elem.parentNode,

						name = ofType && elem.nodeName.toLowerCase(),

						useCache = !xml && !ofType,

						diff = false;



					if ( parent ) {



						// :(first|last|only)-(child|of-type)

						if ( simple ) {

							while ( dir ) {

								node = elem;

								while ( (node = node[ dir ]) ) {

									if ( ofType ?

										node.nodeName.toLowerCase() === name :

										node.nodeType === 1 ) {



										return false;

									}

								}

								// Reverse direction for :only-* (if we haven't yet done so)

								start = dir = type === "only" && !start && "nextSibling";

							}

							return true;

						}



						start = [ forward ? parent.firstChild : parent.lastChild ];



						// non-xml :nth-child(...) stores cache data on `parent`

						if ( forward && useCache ) {



							// Seek `elem` from a previously-cached index



							// ...in a gzip-friendly way

							node = parent;

							outerCache = node[ expando ] || (node[ expando ] = {});



							// Support: IE <9 only

							// Defend against cloned attroperties (jQuery gh-1709)

							uniqueCache = outerCache[ node.uniqueID ] ||

								(outerCache[ node.uniqueID ] = {});



							cache = uniqueCache[ type ] || [];

							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];

							diff = nodeIndex && cache[ 2 ];

							node = nodeIndex && parent.childNodes[ nodeIndex ];



							while ( (node = ++nodeIndex && node && node[ dir ] ||



								// Fallback to seeking `elem` from the start

								(diff = nodeIndex = 0) || start.pop()) ) {



								// When found, cache indexes on `parent` and break

								if ( node.nodeType === 1 && ++diff && node === elem ) {

									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];

									break;

								}

							}



						} else {

							// Use previously-cached element index if available

							if ( useCache ) {

								// ...in a gzip-friendly way

								node = elem;

								outerCache = node[ expando ] || (node[ expando ] = {});



								// Support: IE <9 only

								// Defend against cloned attroperties (jQuery gh-1709)

								uniqueCache = outerCache[ node.uniqueID ] ||

									(outerCache[ node.uniqueID ] = {});



								cache = uniqueCache[ type ] || [];

								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];

								diff = nodeIndex;

							}



							// xml :nth-child(...)

							// or :nth-last-child(...) or :nth(-last)?-of-type(...)

							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									(diff = nodeIndex = 0) || start.pop()) ) {



									if ( ( ofType ?

										node.nodeName.toLowerCase() === name :

										node.nodeType === 1 ) &&

										++diff ) {



										// Cache the index of each encountered element

										if ( useCache ) {

											outerCache = node[ expando ] || (node[ expando ] = {});



											// Support: IE <9 only

											// Defend against cloned attroperties (jQuery gh-1709)

											uniqueCache = outerCache[ node.uniqueID ] ||

												(outerCache[ node.uniqueID ] = {});



											uniqueCache[ type ] = [ dirruns, diff ];

										}



										if ( node === elem ) {

											break;

										}

									}

								}

							}

						}



						// Incorporate the offset, then check against cycle size

						diff -= last;

						return diff === first || ( diff % first === 0 && diff / first >= 0 );

					}

				};

		},



		"PSEUDO": function( pseudo, argument ) {

			// pseudo-class names are case-insensitive

			// http://www.w3.org/TR/selectors/#pseudo-classes

			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters

			// Remember that setFilters inherits from pseudos

			var args,

				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||

					Sizzle.error( "unsupported pseudo: " + pseudo );



			// The user may use createPseudo to indicate that

			// arguments are needed to create the filter function

			// just as Sizzle does

			if ( fn[ expando ] ) {

				return fn( argument );

			}



			// But maintain support for old signatures

			if ( fn.length > 1 ) {

				args = [ pseudo, pseudo, "", argument ];

				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?

					markFunction(function( seed, matches ) {

						var idx,

							matched = fn( seed, argument ),

							i = matched.length;

						while ( i-- ) {

							idx = indexOf( seed, matched[i] );

							seed[ idx ] = !( matches[ idx ] = matched[i] );

						}

					}) :

					function( elem ) {

						return fn( elem, 0, args );

					};

			}



			return fn;

		}

	},



	pseudos: {

		// Potentially complex pseudos

		"not": markFunction(function( selector ) {

			// Trim the selector passed to compile

			// to avoid treating leading and trailing

			// spaces as combinators

			var input = [],

				results = [],

				matcher = compile( selector.replace( rtrim, "$1" ) );



			return matcher[ expando ] ?

				markFunction(function( seed, matches, context, xml ) {

					var elem,

						unmatched = matcher( seed, null, xml, [] ),

						i = seed.length;



					// Match elements unmatched by `matcher`

					while ( i-- ) {

						if ( (elem = unmatched[i]) ) {

							seed[i] = !(matches[i] = elem);

						}

					}

				}) :

				function( elem, context, xml ) {

					input[0] = elem;

					matcher( input, null, xml, results );

					// Don't keep the element (issue #299)

					input[0] = null;

					return !results.pop();

				};

		}),



		"has": markFunction(function( selector ) {

			return function( elem ) {

				return Sizzle( selector, elem ).length > 0;

			};

		}),



		"contains": markFunction(function( text ) {

			text = text.replace( runescape, funescape );

			return function( elem ) {

				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;

			};

		}),



		// "Whether an element is represented by a :lang() selector

		// is based solely on the element's language value

		// being equal to the identifier C,

		// or beginning with the identifier C immediately followed by "-".

		// The matching of C against the element's language value is performed case-insensitively.

		// The identifier C does not have to be a valid language name."

		// http://www.w3.org/TR/selectors/#lang-pseudo

		"lang": markFunction( function( lang ) {

			// lang value must be a valid identifier

			if ( !ridentifier.test(lang || "") ) {

				Sizzle.error( "unsupported lang: " + lang );

			}

			lang = lang.replace( runescape, funescape ).toLowerCase();

			return function( elem ) {

				var elemLang;

				do {

					if ( (elemLang = documentIsHTML ?

						elem.lang :

						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {



						elemLang = elemLang.toLowerCase();

						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;

					}

				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );

				return false;

			};

		}),



		// Miscellaneous

		"target": function( elem ) {

			var hash = window.location && window.location.hash;

			return hash && hash.slice( 1 ) === elem.id;

		},



		"root": function( elem ) {

			return elem === docElem;

		},



		"focus": function( elem ) {

			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);

		},



		// Boolean properties

		"enabled": createDisabledPseudo( false ),

		"disabled": createDisabledPseudo( true ),



		"checked": function( elem ) {

			// In CSS3, :checked should return both checked and selected elements

			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked

			var nodeName = elem.nodeName.toLowerCase();

			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);

		},



		"selected": function( elem ) {

			// Accessing this property makes selected-by-default

			// options in Safari work properly

			if ( elem.parentNode ) {

				elem.parentNode.selectedIndex;

			}



			return elem.selected === true;

		},



		// Contents

		"empty": function( elem ) {

			// http://www.w3.org/TR/selectors/#empty-pseudo

			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),

			//   but not by others (comment: 8; processing instruction: 7; etc.)

			// nodeType < 6 works because attributes (2) do not appear as children

			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {

				if ( elem.nodeType < 6 ) {

					return false;

				}

			}

			return true;

		},



		"parent": function( elem ) {

			return !Expr.pseudos["empty"]( elem );

		},



		// Element/input types

		"header": function( elem ) {

			return rheader.test( elem.nodeName );

		},



		"input": function( elem ) {

			return rinputs.test( elem.nodeName );

		},



		"button": function( elem ) {

			var name = elem.nodeName.toLowerCase();

			return name === "input" && elem.type === "button" || name === "button";

		},



		"text": function( elem ) {

			var attr;

			return elem.nodeName.toLowerCase() === "input" &&

				elem.type === "text" &&



				// Support: IE<8

				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"

				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );

		},



		// Position-in-collection

		"first": createPositionalPseudo(function() {

			return [ 0 ];

		}),



		"last": createPositionalPseudo(function( matchIndexes, length ) {

			return [ length - 1 ];

		}),



		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {

			return [ argument < 0 ? argument + length : argument ];

		}),



		"even": createPositionalPseudo(function( matchIndexes, length ) {

			var i = 0;

			for ( ; i < length; i += 2 ) {

				matchIndexes.push( i );

			}

			return matchIndexes;

		}),



		"odd": createPositionalPseudo(function( matchIndexes, length ) {

			var i = 1;

			for ( ; i < length; i += 2 ) {

				matchIndexes.push( i );

			}

			return matchIndexes;

		}),



		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {

			var i = argument < 0 ?

				argument + length :

				argument > length ?

					length :

					argument;

			for ( ; --i >= 0; ) {

				matchIndexes.push( i );

			}

			return matchIndexes;

		}),



		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {

			var i = argument < 0 ? argument + length : argument;

			for ( ; ++i < length; ) {

				matchIndexes.push( i );

			}

			return matchIndexes;

		})

	}

};



Expr.pseudos["nth"] = Expr.pseudos["eq"];



// Add button/input type pseudos

for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {

	Expr.pseudos[ i ] = createInputPseudo( i );

}

for ( i in { submit: true, reset: true } ) {

	Expr.pseudos[ i ] = createButtonPseudo( i );

}



// Easy API for creating new setFilters

function setFilters() {}

setFilters.prototype = Expr.filters = Expr.pseudos;

Expr.setFilters = new setFilters();



tokenize = Sizzle.tokenize = function( selector, parseOnly ) {

	var matched, match, tokens, type,

		soFar, groups, preFilters,

		cached = tokenCache[ selector + " " ];



	if ( cached ) {

		return parseOnly ? 0 : cached.slice( 0 );

	}



	soFar = selector;

	groups = [];

	preFilters = Expr.preFilter;



	while ( soFar ) {



		// Comma and first run

		if ( !matched || (match = rcomma.exec( soFar )) ) {

			if ( match ) {

				// Don't consume trailing commas as valid

				soFar = soFar.slice( match[0].length ) || soFar;

			}

			groups.push( (tokens = []) );

		}



		matched = false;



		// Combinators

		if ( (match = rcombinators.exec( soFar )) ) {

			matched = match.shift();

			tokens.push({

				value: matched,

				// Cast descendant combinators to space

				type: match[0].replace( rtrim, " " )

			});

			soFar = soFar.slice( matched.length );

		}



		// Filters

		for ( type in Expr.filter ) {

			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||

				(match = preFilters[ type ]( match ))) ) {

				matched = match.shift();

				tokens.push({

					value: matched,

					type: type,

					matches: match

				});

				soFar = soFar.slice( matched.length );

			}

		}



		if ( !matched ) {

			break;

		}

	}



	// Return the length of the invalid excess

	// if we're just parsing

	// Otherwise, throw an error or return tokens

	return parseOnly ?

		soFar.length :

		soFar ?

			Sizzle.error( selector ) :

			// Cache the tokens

			tokenCache( selector, groups ).slice( 0 );

};



function toSelector( tokens ) {

	var i = 0,

		len = tokens.length,

		selector = "";

	for ( ; i < len; i++ ) {

		selector += tokens[i].value;

	}

	return selector;

}



function addCombinator( matcher, combinator, base ) {

	var dir = combinator.dir,

		skip = combinator.next,

		key = skip || dir,

		checkNonElements = base && key === "parentNode",

		doneName = done++;



	return combinator.first ?

		// Check against closest ancestor/preceding element

		function( elem, context, xml ) {

			while ( (elem = elem[ dir ]) ) {

				if ( elem.nodeType === 1 || checkNonElements ) {

					return matcher( elem, context, xml );

				}

			}

			return false;

		} :



		// Check against all ancestor/preceding elements

		function( elem, context, xml ) {

			var oldCache, uniqueCache, outerCache,

				newCache = [ dirruns, doneName ];



			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching

			if ( xml ) {

				while ( (elem = elem[ dir ]) ) {

					if ( elem.nodeType === 1 || checkNonElements ) {

						if ( matcher( elem, context, xml ) ) {

							return true;

						}

					}

				}

			} else {

				while ( (elem = elem[ dir ]) ) {

					if ( elem.nodeType === 1 || checkNonElements ) {

						outerCache = elem[ expando ] || (elem[ expando ] = {});



						// Support: IE <9 only

						// Defend against cloned attroperties (jQuery gh-1709)

						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});



						if ( skip && skip === elem.nodeName.toLowerCase() ) {

							elem = elem[ dir ] || elem;

						} else if ( (oldCache = uniqueCache[ key ]) &&

							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {



							// Assign to newCache so results back-propagate to previous elements

							return (newCache[ 2 ] = oldCache[ 2 ]);

						} else {

							// Reuse newcache so results back-propagate to previous elements

							uniqueCache[ key ] = newCache;



							// A match means we're done; a fail means we have to keep checking

							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {

								return true;

							}

						}

					}

				}

			}

			return false;

		};

}



function elementMatcher( matchers ) {

	return matchers.length > 1 ?

		function( elem, context, xml ) {

			var i = matchers.length;

			while ( i-- ) {

				if ( !matchers[i]( elem, context, xml ) ) {

					return false;

				}

			}

			return true;

		} :

		matchers[0];

}



function multipleContexts( selector, contexts, results ) {

	var i = 0,

		len = contexts.length;

	for ( ; i < len; i++ ) {

		Sizzle( selector, contexts[i], results );

	}

	return results;

}



function condense( unmatched, map, filter, context, xml ) {

	var elem,

		newUnmatched = [],

		i = 0,

		len = unmatched.length,

		mapped = map != null;



	for ( ; i < len; i++ ) {

		if ( (elem = unmatched[i]) ) {

			if ( !filter || filter( elem, context, xml ) ) {

				newUnmatched.push( elem );

				if ( mapped ) {

					map.push( i );

				}

			}

		}

	}



	return newUnmatched;

}



function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {

	if ( postFilter && !postFilter[ expando ] ) {

		postFilter = setMatcher( postFilter );

	}

	if ( postFinder && !postFinder[ expando ] ) {

		postFinder = setMatcher( postFinder, postSelector );

	}

	return markFunction(function( seed, results, context, xml ) {

		var temp, i, elem,

			preMap = [],

			postMap = [],

			preexisting = results.length,



			// Get initial elements from seed or context

			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),



			// Prefilter to get matcher input, preserving a map for seed-results synchronization

			matcherIn = preFilter && ( seed || !selector ) ?

				condense( elems, preMap, preFilter, context, xml ) :

				elems,



			matcherOut = matcher ?

				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,

				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?



					// ...intermediate processing is necessary

					[] :



					// ...otherwise use results directly

					results :

				matcherIn;



		// Find primary matches

		if ( matcher ) {

			matcher( matcherIn, matcherOut, context, xml );

		}



		// Apply postFilter

		if ( postFilter ) {

			temp = condense( matcherOut, postMap );

			postFilter( temp, [], context, xml );



			// Un-match failing elements by moving them back to matcherIn

			i = temp.length;

			while ( i-- ) {

				if ( (elem = temp[i]) ) {

					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);

				}

			}

		}



		if ( seed ) {

			if ( postFinder || preFilter ) {

				if ( postFinder ) {

					// Get the final matcherOut by condensing this intermediate into postFinder contexts

					temp = [];

					i = matcherOut.length;

					while ( i-- ) {

						if ( (elem = matcherOut[i]) ) {

							// Restore matcherIn since elem is not yet a final match

							temp.push( (matcherIn[i] = elem) );

						}

					}

					postFinder( null, (matcherOut = []), temp, xml );

				}



				// Move matched elements from seed to results to keep them synchronized

				i = matcherOut.length;

				while ( i-- ) {

					if ( (elem = matcherOut[i]) &&

						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {



						seed[temp] = !(results[temp] = elem);

					}

				}

			}



		// Add elements to results, through postFinder if defined

		} else {

			matcherOut = condense(

				matcherOut === results ?

					matcherOut.splice( preexisting, matcherOut.length ) :

					matcherOut

			);

			if ( postFinder ) {

				postFinder( null, results, matcherOut, xml );

			} else {

				push.apply( results, matcherOut );

			}

		}

	});

}



function matcherFromTokens( tokens ) {

	var checkContext, matcher, j,

		len = tokens.length,

		leadingRelative = Expr.relative[ tokens[0].type ],

		implicitRelative = leadingRelative || Expr.relative[" "],

		i = leadingRelative ? 1 : 0,



		// The foundational matcher ensures that elements are reachable from top-level context(s)

		matchContext = addCombinator( function( elem ) {

			return elem === checkContext;

		}, implicitRelative, true ),

		matchAnyContext = addCombinator( function( elem ) {

			return indexOf( checkContext, elem ) > -1;

		}, implicitRelative, true ),

		matchers = [ function( elem, context, xml ) {

			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (

				(checkContext = context).nodeType ?

					matchContext( elem, context, xml ) :

					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element (issue #299)

			checkContext = null;

			return ret;

		} ];



	for ( ; i < len; i++ ) {

		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {

			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];

		} else {

			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );



			// Return special upon seeing a positional matcher

			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling

				j = ++i;

				for ( ; j < len; j++ ) {

					if ( Expr.relative[ tokens[j].type ] ) {

						break;

					}

				}

				return setMatcher(

					i > 1 && elementMatcher( matchers ),

					i > 1 && toSelector(

						// If the preceding token was a descendant combinator, insert an implicit any-element `*`

						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })

					).replace( rtrim, "$1" ),

					matcher,

					i < j && matcherFromTokens( tokens.slice( i, j ) ),

					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),

					j < len && toSelector( tokens )

				);

			}

			matchers.push( matcher );

		}

	}



	return elementMatcher( matchers );

}



function matcherFromGroupMatchers( elementMatchers, setMatchers ) {

	var bySet = setMatchers.length > 0,

		byElement = elementMatchers.length > 0,

		superMatcher = function( seed, context, xml, results, outermost ) {

			var elem, j, matcher,

				matchedCount = 0,

				i = "0",

				unmatched = seed && [],

				setMatched = [],

				contextBackup = outermostContext,

				// We must always have either seed elements or outermost context

				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher

				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),

				len = elems.length;



			if ( outermost ) {

				outermostContext = context === document || context || outermost;

			}



			// Add elements passing elementMatchers directly to results

			// Support: IE<9, Safari

			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id

			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {

				if ( byElement && elem ) {

					j = 0;

					if ( !context && elem.ownerDocument !== document ) {

						setDocument( elem );

						xml = !documentIsHTML;

					}

					while ( (matcher = elementMatchers[j++]) ) {

						if ( matcher( elem, context || document, xml) ) {

							results.push( elem );

							break;

						}

					}

					if ( outermost ) {

						dirruns = dirrunsUnique;

					}

				}



				// Track unmatched elements for set filters

				if ( bySet ) {

					// They will have gone through all possible matchers

					if ( (elem = !matcher && elem) ) {

						matchedCount--;

					}



					// Lengthen the array for every element, matched or not

					if ( seed ) {

						unmatched.push( elem );

					}

				}

			}



			// `i` is now the count of elements visited above, and adding it to `matchedCount`

			// makes the latter nonnegative.

			matchedCount += i;



			// Apply set filters to unmatched elements

			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`

			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have

			// no element matchers and no seed.

			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that

			// case, which will result in a "00" `matchedCount` that differs from `i` but is also

			// numerically zero.

			if ( bySet && i !== matchedCount ) {

				j = 0;

				while ( (matcher = setMatchers[j++]) ) {

					matcher( unmatched, setMatched, context, xml );

				}



				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting

					if ( matchedCount > 0 ) {

						while ( i-- ) {

							if ( !(unmatched[i] || setMatched[i]) ) {

								setMatched[i] = pop.call( results );

							}

						}

					}



					// Discard index placeholder values to get only actual matches

					setMatched = condense( setMatched );

				}



				// Add matches to results

				push.apply( results, setMatched );



				// Seedless set matches succeeding multiple successful matchers stipulate sorting

				if ( outermost && !seed && setMatched.length > 0 &&

					( matchedCount + setMatchers.length ) > 1 ) {



					Sizzle.uniqueSort( results );

				}

			}



			// Override manipulation of globals by nested matchers

			if ( outermost ) {

				dirruns = dirrunsUnique;

				outermostContext = contextBackup;

			}



			return unmatched;

		};



	return bySet ?

		markFunction( superMatcher ) :

		superMatcher;

}



compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {

	var i,

		setMatchers = [],

		elementMatchers = [],

		cached = compilerCache[ selector + " " ];



	if ( !cached ) {

		// Generate a function of recursive functions that can be used to check each element

		if ( !match ) {

			match = tokenize( selector );

		}

		i = match.length;

		while ( i-- ) {

			cached = matcherFromTokens( match[i] );

			if ( cached[ expando ] ) {

				setMatchers.push( cached );

			} else {

				elementMatchers.push( cached );

			}

		}



		// Cache the compiled function

		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );



		// Save selector and tokenization

		cached.selector = selector;

	}

	return cached;

};



/**

 * A low-level selection function that works with Sizzle's compiled

 *  selector functions

 * @param {String|Function} selector A selector or a pre-compiled

 *  selector function built with Sizzle.compile

 * @param {Element} context

 * @param {Array} [results]

 * @param {Array} [seed] A set of elements to match against

 */

select = Sizzle.select = function( selector, context, results, seed ) {

	var i, tokens, token, type, find,

		compiled = typeof selector === "function" && selector,

		match = !seed && tokenize( (selector = compiled.selector || selector) );



	results = results || [];



	// Try to minimize operations if there is only one selector in the list and no seed

	// (the latter of which guarantees us context)

	if ( match.length === 1 ) {



		// Reduce context if the leading compound selector is an ID

		tokens = match[0] = match[0].slice( 0 );

		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&

				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {



			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];

			if ( !context ) {

				return results;



			// Precompiled matchers will still verify ancestry, so step up a level

			} else if ( compiled ) {

				context = context.parentNode;

			}



			selector = selector.slice( tokens.shift().value.length );

		}



		// Fetch a seed set for right-to-left matching

		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;

		while ( i-- ) {

			token = tokens[i];



			// Abort if we hit a combinator

			if ( Expr.relative[ (type = token.type) ] ) {

				break;

			}

			if ( (find = Expr.find[ type ]) ) {

				// Search, expanding context for leading sibling combinators

				if ( (seed = find(

					token.matches[0].replace( runescape, funescape ),

					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context

				)) ) {



					// If seed is empty or no tokens remain, we can return early

					tokens.splice( i, 1 );

					selector = seed.length && toSelector( tokens );

					if ( !selector ) {

						push.apply( results, seed );

						return results;

					}



					break;

				}

			}

		}

	}



	// Compile and execute a filtering function if one is not provided

	// Provide `match` to avoid retokenization if we modified the selector above

	( compiled || compile( selector, match ) )(

		seed,

		context,

		!documentIsHTML,

		results,

		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context

	);

	return results;

};



// One-time assignments



// Sort stability

support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;



// Support: Chrome 14-35+

// Always assume duplicates if they aren't passed to the comparison function

support.detectDuplicates = !!hasDuplicate;



// Initialize against the default document

setDocument();



// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)

// Detached nodes confoundingly follow *each other*

support.sortDetached = assert(function( el ) {

	// Should return 1, but returns 4 (following)

	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;

});



// Support: IE<8

// Prevent attribute/property "interpolation"

// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx

if ( !assert(function( el ) {

	el.innerHTML = "<a href='#'></a>";

	return el.firstChild.getAttribute("href") === "#" ;

}) ) {

	addHandle( "type|href|height|width", function( elem, name, isXML ) {

		if ( !isXML ) {

			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );

		}

	});

}



// Support: IE<9

// Use defaultValue in place of getAttribute("value")

if ( !support.attributes || !assert(function( el ) {

	el.innerHTML = "<input/>";

	el.firstChild.setAttribute( "value", "" );

	return el.firstChild.getAttribute( "value" ) === "";

}) ) {

	addHandle( "value", function( elem, name, isXML ) {

		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {

			return elem.defaultValue;

		}

	});

}



// Support: IE<9

// Use getAttributeNode to fetch booleans when getAttribute lies

if ( !assert(function( el ) {

	return el.getAttribute("disabled") == null;

}) ) {

	addHandle( booleans, function( elem, name, isXML ) {

		var val;

		if ( !isXML ) {

			return elem[ name ] === true ? name.toLowerCase() :

					(val = elem.getAttributeNode( name )) && val.specified ?

					val.value :

				null;

		}

	});

}



return Sizzle;



})( window );







jQuery.find = Sizzle;

jQuery.expr = Sizzle.selectors;



// Deprecated

jQuery.expr[ ":" ] = jQuery.expr.pseudos;

jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;

jQuery.text = Sizzle.getText;

jQuery.isXMLDoc = Sizzle.isXML;

jQuery.contains = Sizzle.contains;

jQuery.escapeSelector = Sizzle.escape;









var dir = function( elem, dir, until ) {

	var matched = [],

		truncate = until !== undefined;



	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {

		if ( elem.nodeType === 1 ) {

			if ( truncate && jQuery( elem ).is( until ) ) {

				break;

			}

			matched.push( elem );

		}

	}

	return matched;

};





var siblings = function( n, elem ) {

	var matched = [];



	for ( ; n; n = n.nextSibling ) {

		if ( n.nodeType === 1 && n !== elem ) {

			matched.push( n );

		}

	}



	return matched;

};





var rneedsContext = jQuery.expr.match.needsContext;







function nodeName( elem, name ) {



  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();



};

var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );







// Implement the identical functionality for filter and not

function winnow( elements, qualifier, not ) {

	if ( isFunction( qualifier ) ) {

		return jQuery.grep( elements, function( elem, i ) {

			return !!qualifier.call( elem, i, elem ) !== not;

		} );

	}



	// Single element

	if ( qualifier.nodeType ) {

		return jQuery.grep( elements, function( elem ) {

			return ( elem === qualifier ) !== not;

		} );

	}



	// Arraylike of elements (jQuery, arguments, Array)

	if ( typeof qualifier !== "string" ) {

		return jQuery.grep( elements, function( elem ) {

			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;

		} );

	}



	// Filtered directly for both simple and complex selectors

	return jQuery.filter( qualifier, elements, not );

}



jQuery.filter = function( expr, elems, not ) {

	var elem = elems[ 0 ];



	if ( not ) {

		expr = ":not(" + expr + ")";

	}



	if ( elems.length === 1 && elem.nodeType === 1 ) {

		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];

	}



	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {

		return elem.nodeType === 1;

	} ) );

};



jQuery.fn.extend( {

	find: function( selector ) {

		var i, ret,

			len = this.length,

			self = this;



		if ( typeof selector !== "string" ) {

			return this.pushStack( jQuery( selector ).filter( function() {

				for ( i = 0; i < len; i++ ) {

					if ( jQuery.contains( self[ i ], this ) ) {

						return true;

					}

				}

			} ) );

		}



		ret = this.pushStack( [] );



		for ( i = 0; i < len; i++ ) {

			jQuery.find( selector, self[ i ], ret );

		}



		return len > 1 ? jQuery.uniqueSort( ret ) : ret;

	},

	filter: function( selector ) {

		return this.pushStack( winnow( this, selector || [], false ) );

	},

	not: function( selector ) {

		return this.pushStack( winnow( this, selector || [], true ) );

	},

	is: function( selector ) {

		return !!winnow(

			this,



			// If this is a positional/relative selector, check membership in the returned set

			// so $("p:first").is("p:last") won't return true for a doc with two "p".

			typeof selector === "string" && rneedsContext.test( selector ) ?

				jQuery( selector ) :

				selector || [],

			false

		).length;

	}

} );





// Initialize a jQuery object





// A central reference to the root jQuery(document)

var rootjQuery,



	// A simple way to check for HTML strings

	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)

	// Strict HTML recognition (#11290: must start with <)

	// Shortcut simple #id case for speed

	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,



	init = jQuery.fn.init = function( selector, context, root ) {

		var match, elem;



		// HANDLE: $(""), $(null), $(undefined), $(false)

		if ( !selector ) {

			return this;

		}



		// Method init() accepts an alternate rootjQuery

		// so migrate can support jQuery.sub (gh-2101)

		root = root || rootjQuery;



		// Handle HTML strings

		if ( typeof selector === "string" ) {

			if ( selector[ 0 ] === "<" &&

				selector[ selector.length - 1 ] === ">" &&

				selector.length >= 3 ) {



				// Assume that strings that start and end with <> are HTML and skip the regex check

				match = [ null, selector, null ];



			} else {

				match = rquickExpr.exec( selector );

			}



			// Match html or make sure no context is specified for #id

			if ( match && ( match[ 1 ] || !context ) ) {



				// HANDLE: $(html) -> $(array)

				if ( match[ 1 ] ) {

					context = context instanceof jQuery ? context[ 0 ] : context;



					// Option to run scripts is true for back-compat

					// Intentionally let the error be thrown if parseHTML is not present

					jQuery.merge( this, jQuery.parseHTML(

						match[ 1 ],

						context && context.nodeType ? context.ownerDocument || context : document,

						true

					) );



					// HANDLE: $(html, props)

					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {

						for ( match in context ) {



							// Properties of context are called as methods if possible

							if ( isFunction( this[ match ] ) ) {

								this[ match ]( context[ match ] );



							// ...and otherwise set as attributes

							} else {

								this.attr( match, context[ match ] );

							}

						}

					}



					return this;



				// HANDLE: $(#id)

				} else {

					elem = document.getElementById( match[ 2 ] );



					if ( elem ) {



						// Inject the element directly into the jQuery object

						this[ 0 ] = elem;

						this.length = 1;

					}

					return this;

				}



			// HANDLE: $(expr, $(...))

			} else if ( !context || context.jquery ) {

				return ( context || root ).find( selector );



			// HANDLE: $(expr, context)

			// (which is just equivalent to: $(context).find(expr)

			} else {

				return this.constructor( context ).find( selector );

			}



		// HANDLE: $(DOMElement)

		} else if ( selector.nodeType ) {

			this[ 0 ] = selector;

			this.length = 1;

			return this;



		// HANDLE: $(function)

		// Shortcut for document ready

		} else if ( isFunction( selector ) ) {

			return root.ready !== undefined ?

				root.ready( selector ) :



				// Execute immediately if ready is not present

				selector( jQuery );

		}



		return jQuery.makeArray( selector, this );

	};



// Give the init function the jQuery prototype for later instantiation

init.prototype = jQuery.fn;



// Initialize central reference

rootjQuery = jQuery( document );





var rparentsprev = /^(?:parents|prev(?:Until|All))/,



	// Methods guaranteed to produce a unique set when starting from a unique set

	guaranteedUnique = {

		children: true,

		contents: true,

		next: true,

		prev: true

	};



jQuery.fn.extend( {

	has: function( target ) {

		var targets = jQuery( target, this ),

			l = targets.length;



		return this.filter( function() {

			var i = 0;

			for ( ; i < l; i++ ) {

				if ( jQuery.contains( this, targets[ i ] ) ) {

					return true;

				}

			}

		} );

	},



	closest: function( selectors, context ) {

		var cur,

			i = 0,

			l = this.length,

			matched = [],

			targets = typeof selectors !== "string" && jQuery( selectors );



		// Positional selectors never match, since there's no _selection_ context

		if ( !rneedsContext.test( selectors ) ) {

			for ( ; i < l; i++ ) {

				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {



					// Always skip document fragments

					if ( cur.nodeType < 11 && ( targets ?

						targets.index( cur ) > -1 :



						// Don't pass non-elements to Sizzle

						cur.nodeType === 1 &&

							jQuery.find.matchesSelector( cur, selectors ) ) ) {



						matched.push( cur );

						break;

					}

				}

			}

		}



		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );

	},



	// Determine the position of an element within the set

	index: function( elem ) {



		// No argument, return index in parent

		if ( !elem ) {

			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;

		}



		// Index in selector

		if ( typeof elem === "string" ) {

			return indexOf.call( jQuery( elem ), this[ 0 ] );

		}



		// Locate the position of the desired element

		return indexOf.call( this,



			// If it receives a jQuery object, the first element is used

			elem.jquery ? elem[ 0 ] : elem

		);

	},



	add: function( selector, context ) {

		return this.pushStack(

			jQuery.uniqueSort(

				jQuery.merge( this.get(), jQuery( selector, context ) )

			)

		);

	},



	addBack: function( selector ) {

		return this.add( selector == null ?

			this.prevObject : this.prevObject.filter( selector )

		);

	}

} );



function sibling( cur, dir ) {

	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}

	return cur;

}



jQuery.each( {

	parent: function( elem ) {

		var parent = elem.parentNode;

		return parent && parent.nodeType !== 11 ? parent : null;

	},

	parents: function( elem ) {

		return dir( elem, "parentNode" );

	},

	parentsUntil: function( elem, i, until ) {

		return dir( elem, "parentNode", until );

	},

	next: function( elem ) {

		return sibling( elem, "nextSibling" );

	},

	prev: function( elem ) {

		return sibling( elem, "previousSibling" );

	},

	nextAll: function( elem ) {

		return dir( elem, "nextSibling" );

	},

	prevAll: function( elem ) {

		return dir( elem, "previousSibling" );

	},

	nextUntil: function( elem, i, until ) {

		return dir( elem, "nextSibling", until );

	},

	prevUntil: function( elem, i, until ) {

		return dir( elem, "previousSibling", until );

	},

	siblings: function( elem ) {

		return siblings( ( elem.parentNode || {} ).firstChild, elem );

	},

	children: function( elem ) {

		return siblings( elem.firstChild );

	},

	contents: function( elem ) {

		if ( typeof elem.contentDocument !== "undefined" ) {

			return elem.contentDocument;

		}



		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only

		// Treat the template element as a regular one in browsers that

		// don't support it.

		if ( nodeName( elem, "template" ) ) {

			elem = elem.content || elem;

		}



		return jQuery.merge( [], elem.childNodes );

	}

}, function( name, fn ) {

	jQuery.fn[ name ] = function( until, selector ) {

		var matched = jQuery.map( this, fn, until );



		if ( name.slice( -5 ) !== "Until" ) {

			selector = until;

		}



		if ( selector && typeof selector === "string" ) {

			matched = jQuery.filter( selector, matched );

		}



		if ( this.length > 1 ) {



			// Remove duplicates

			if ( !guaranteedUnique[ name ] ) {

				jQuery.uniqueSort( matched );

			}



			// Reverse order for parents* and prev-derivatives

			if ( rparentsprev.test( name ) ) {

				matched.reverse();

			}

		}



		return this.pushStack( matched );

	};

} );

var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );







// Convert String-formatted options into Object-formatted ones

function createOptions( options ) {

	var object = {};

	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {

		object[ flag ] = true;

	} );

	return object;

}



/*

 * Create a callback list using the following parameters:

 *

 *	options: an optional list of space-separated options that will change how

 *			the callback list behaves or a more traditional option object

 *

 * By default a callback list will act like an event callback list and can be

 * "fired" multiple times.

 *

 * Possible options:

 *

 *	once:			will ensure the callback list can only be fired once (like a Deferred)

 *

 *	memory:			will keep track of previous values and will call any callback added

 *					after the list has been fired right away with the latest "memorized"

 *					values (like a Deferred)

 *

 *	unique:			will ensure a callback can only be added once (no duplicate in the list)

 *

 *	stopOnFalse:	interrupt callings when a callback returns false

 *

 */

jQuery.Callbacks = function( options ) {



	// Convert options from String-formatted to Object-formatted if needed

	// (we check in cache first)

	options = typeof options === "string" ?

		createOptions( options ) :

		jQuery.extend( {}, options );



	var // Flag to know if list is currently firing

		firing,



		// Last fire value for non-forgettable lists

		memory,



		// Flag to know if list was already fired

		fired,



		// Flag to prevent firing

		locked,



		// Actual callback list

		list = [],



		// Queue of execution data for repeatable lists

		queue = [],



		// Index of currently firing callback (modified by add/remove as needed)

		firingIndex = -1,



		// Fire callbacks

		fire = function() {



			// Enforce single-firing

			locked = locked || options.once;



			// Execute callbacks for all pending executions,

			// respecting firingIndex overrides and runtime changes

			fired = firing = true;

			for ( ; queue.length; firingIndex = -1 ) {

				memory = queue.shift();

				while ( ++firingIndex < list.length ) {



					// Run callback and check for early termination

					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&

						options.stopOnFalse ) {



						// Jump to end and forget the data so .add doesn't re-fire

						firingIndex = list.length;

						memory = false;

					}

				}

			}



			// Forget the data if we're done with it

			if ( !options.memory ) {

				memory = false;

			}



			firing = false;



			// Clean up if we're done firing for good

			if ( locked ) {



				// Keep an empty list if we have data for future add calls

				if ( memory ) {

					list = [];



				// Otherwise, this object is spent

				} else {

					list = "";

				}

			}

		},



		// Actual Callbacks object

		self = {



			// Add a callback or a collection of callbacks to the list

			add: function() {

				if ( list ) {



					// If we have memory from a past run, we should fire after adding

					if ( memory && !firing ) {

						firingIndex = list.length - 1;

						queue.push( memory );

					}



					( function add( args ) {

						jQuery.each( args, function( _, arg ) {

							if ( isFunction( arg ) ) {

								if ( !options.unique || !self.has( arg ) ) {

									list.push( arg );

								}

							} else if ( arg && arg.length && toType( arg ) !== "string" ) {



								// Inspect recursively

								add( arg );

							}

						} );

					} )( arguments );



					if ( memory && !firing ) {

						fire();

					}

				}

				return this;

			},



			// Remove a callback from the list

			remove: function() {

				jQuery.each( arguments, function( _, arg ) {

					var index;

					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {

						list.splice( index, 1 );



						// Handle firing indexes

						if ( index <= firingIndex ) {

							firingIndex--;

						}

					}

				} );

				return this;

			},



			// Check if a given callback is in the list.

			// If no argument is given, return whether or not list has callbacks attached.

			has: function( fn ) {

				return fn ?

					jQuery.inArray( fn, list ) > -1 :

					list.length > 0;

			},



			// Remove all callbacks from the list

			empty: function() {

				if ( list ) {

					list = [];

				}

				return this;

			},



			// Disable .fire and .add

			// Abort any current/pending executions

			// Clear all callbacks and values

			disable: function() {

				locked = queue = [];

				list = memory = "";

				return this;

			},

			disabled: function() {

				return !list;

			},



			// Disable .fire

			// Also disable .add unless we have memory (since it would have no effect)

			// Abort any pending executions

			lock: function() {

				locked = queue = [];

				if ( !memory && !firing ) {

					list = memory = "";

				}

				return this;

			},

			locked: function() {

				return !!locked;

			},



			// Call all callbacks with the given context and arguments

			fireWith: function( context, args ) {

				if ( !locked ) {

					args = args || [];

					args = [ context, args.slice ? args.slice() : args ];

					queue.push( args );

					if ( !firing ) {

						fire();

					}

				}

				return this;

			},



			// Call all the callbacks with the given arguments

			fire: function() {

				self.fireWith( this, arguments );

				return this;

			},



			// To know if the callbacks have already been called at least once

			fired: function() {

				return !!fired;

			}

		};



	return self;

};





function Identity( v ) {

	return v;

}

function Thrower( ex ) {

	throw ex;

}



function adoptValue( value, resolve, reject, noValue ) {

	var method;



	try {



		// Check for promise aspect first to privilege synchronous behavior

		if ( value && isFunction( ( method = value.promise ) ) ) {

			method.call( value ).done( resolve ).fail( reject );



		// Other thenables

		} else if ( value && isFunction( ( method = value.then ) ) ) {

			method.call( value, resolve, reject );



		// Other non-thenables

		} else {



			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:

			// * false: [ value ].slice( 0 ) => resolve( value )

			// * true: [ value ].slice( 1 ) => resolve()

			resolve.apply( undefined, [ value ].slice( noValue ) );

		}



	// For Promises/A+, convert exceptions into rejections

	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in

	// Deferred#then to conditionally suppress rejection.

	} catch ( value ) {



		// Support: Android 4.0 only

		// Strict mode functions invoked without .call/.apply get global-object context

		reject.apply( undefined, [ value ] );

	}

}



jQuery.extend( {



	Deferred: function( func ) {

		var tuples = [



				// action, add listener, callbacks,

				// ... .then handlers, argument index, [final state]

				[ "notify", "progress", jQuery.Callbacks( "memory" ),

					jQuery.Callbacks( "memory" ), 2 ],

				[ "resolve", "done", jQuery.Callbacks( "once memory" ),

					jQuery.Callbacks( "once memory" ), 0, "resolved" ],

				[ "reject", "fail", jQuery.Callbacks( "once memory" ),

					jQuery.Callbacks( "once memory" ), 1, "rejected" ]

			],

			state = "pending",

			promise = {

				state: function() {

					return state;

				},

				always: function() {

					deferred.done( arguments ).fail( arguments );

					return this;

				},

				"catch": function( fn ) {

					return promise.then( null, fn );

				},



				// Keep pipe for back-compat

				pipe: function( /* fnDone, fnFail, fnProgress */ ) {

					var fns = arguments;



					return jQuery.Deferred( function( newDefer ) {

						jQuery.each( tuples, function( i, tuple ) {



							// Map tuples (progress, done, fail) to arguments (done, fail, progress)

							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];



							// deferred.progress(function() { bind to newDefer or newDefer.notify })

							// deferred.done(function() { bind to newDefer or newDefer.resolve })

							// deferred.fail(function() { bind to newDefer or newDefer.reject })

							deferred[ tuple[ 1 ] ]( function() {

								var returned = fn && fn.apply( this, arguments );

								if ( returned && isFunction( returned.promise ) ) {

									returned.promise()

										.progress( newDefer.notify )

										.done( newDefer.resolve )

										.fail( newDefer.reject );

								} else {

									newDefer[ tuple[ 0 ] + "With" ](

										this,

										fn ? [ returned ] : arguments

									);

								}

							} );

						} );

						fns = null;

					} ).promise();

				},

				then: function( onFulfilled, onRejected, onProgress ) {

					var maxDepth = 0;

					function resolve( depth, deferred, handler, special ) {

						return function() {

							var that = this,

								args = arguments,

								mightThrow = function() {

									var returned, then;



									// Support: Promises/A+ section 2.3.3.3.3

									// https://promisesaplus.com/#point-59

									// Ignore double-resolution attempts

									if ( depth < maxDepth ) {

										return;

									}



									returned = handler.apply( that, args );



									// Support: Promises/A+ section 2.3.1

									// https://promisesaplus.com/#point-48

									if ( returned === deferred.promise() ) {

										throw new TypeError( "Thenable self-resolution" );

									}



									// Support: Promises/A+ sections 2.3.3.1, 3.5

									// https://promisesaplus.com/#point-54

									// https://promisesaplus.com/#point-75

									// Retrieve `then` only once

									then = returned &&



										// Support: Promises/A+ section 2.3.4

										// https://promisesaplus.com/#point-64

										// Only check objects and functions for thenability

										( typeof returned === "object" ||

											typeof returned === "function" ) &&

										returned.then;



									// Handle a returned thenable

									if ( isFunction( then ) ) {



										// Special processors (notify) just wait for resolution

										if ( special ) {

											then.call(

												returned,

												resolve( maxDepth, deferred, Identity, special ),

												resolve( maxDepth, deferred, Thrower, special )

											);



										// Normal processors (resolve) also hook into progress

										} else {



											// ...and disregard older resolution values

											maxDepth++;



											then.call(

												returned,

												resolve( maxDepth, deferred, Identity, special ),

												resolve( maxDepth, deferred, Thrower, special ),

												resolve( maxDepth, deferred, Identity,

													deferred.notifyWith )

											);

										}



									// Handle all other returned values

									} else {



										// Only substitute handlers pass on context

										// and multiple values (non-spec behavior)

										if ( handler !== Identity ) {

											that = undefined;

											args = [ returned ];

										}



										// Process the value(s)

										// Default process is resolve

										( special || deferred.resolveWith )( that, args );

									}

								},



								// Only normal processors (resolve) catch and reject exceptions

								process = special ?

									mightThrow :

									function() {

										try {

											mightThrow();

										} catch ( e ) {



											if ( jQuery.Deferred.exceptionHook ) {

												jQuery.Deferred.exceptionHook( e,

													process.stackTrace );

											}



											// Support: Promises/A+ section 2.3.3.3.4.1

											// https://promisesaplus.com/#point-61

											// Ignore post-resolution exceptions

											if ( depth + 1 >= maxDepth ) {



												// Only substitute handlers pass on context

												// and multiple values (non-spec behavior)

												if ( handler !== Thrower ) {

													that = undefined;

													args = [ e ];

												}



												deferred.rejectWith( that, args );

											}

										}

									};



							// Support: Promises/A+ section 2.3.3.3.1

							// https://promisesaplus.com/#point-57

							// Re-resolve promises immediately to dodge false rejection from

							// subsequent errors

							if ( depth ) {

								process();

							} else {



								// Call an optional hook to record the stack, in case of exception

								// since it's otherwise lost when execution goes async

								if ( jQuery.Deferred.getStackHook ) {

									process.stackTrace = jQuery.Deferred.getStackHook();

								}

								window.setTimeout( process );

							}

						};

					}



					return jQuery.Deferred( function( newDefer ) {



						// progress_handlers.add( ... )

						tuples[ 0 ][ 3 ].add(

							resolve(

								0,

								newDefer,

								isFunction( onProgress ) ?

									onProgress :

									Identity,

								newDefer.notifyWith

							)

						);



						// fulfilled_handlers.add( ... )

						tuples[ 1 ][ 3 ].add(

							resolve(

								0,

								newDefer,

								isFunction( onFulfilled ) ?

									onFulfilled :

									Identity

							)

						);



						// rejected_handlers.add( ... )

						tuples[ 2 ][ 3 ].add(

							resolve(

								0,

								newDefer,

								isFunction( onRejected ) ?

									onRejected :

									Thrower

							)

						);

					} ).promise();

				},



				// Get a promise for this deferred

				// If obj is provided, the promise aspect is added to the object

				promise: function( obj ) {

					return obj != null ? jQuery.extend( obj, promise ) : promise;

				}

			},

			deferred = {};



		// Add list-specific methods

		jQuery.each( tuples, function( i, tuple ) {

			var list = tuple[ 2 ],

				stateString = tuple[ 5 ];



			// promise.progress = list.add

			// promise.done = list.add

			// promise.fail = list.add

			promise[ tuple[ 1 ] ] = list.add;



			// Handle state

			if ( stateString ) {

				list.add(

					function() {



						// state = "resolved" (i.e., fulfilled)

						// state = "rejected"

						state = stateString;

					},



					// rejected_callbacks.disable

					// fulfilled_callbacks.disable

					tuples[ 3 - i ][ 2 ].disable,



					// rejected_handlers.disable

					// fulfilled_handlers.disable

					tuples[ 3 - i ][ 3 ].disable,



					// progress_callbacks.lock

					tuples[ 0 ][ 2 ].lock,



					// progress_handlers.lock

					tuples[ 0 ][ 3 ].lock

				);

			}



			// progress_handlers.fire

			// fulfilled_handlers.fire

			// rejected_handlers.fire

			list.add( tuple[ 3 ].fire );



			// deferred.notify = function() { deferred.notifyWith(...) }

			// deferred.resolve = function() { deferred.resolveWith(...) }

			// deferred.reject = function() { deferred.rejectWith(...) }

			deferred[ tuple[ 0 ] ] = function() {

				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );

				return this;

			};



			// deferred.notifyWith = list.fireWith

			// deferred.resolveWith = list.fireWith

			// deferred.rejectWith = list.fireWith

			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;

		} );



		// Make the deferred a promise

		promise.promise( deferred );



		// Call given func if any

		if ( func ) {

			func.call( deferred, deferred );

		}



		// All done!

		return deferred;

	},



	// Deferred helper

	when: function( singleValue ) {

		var



			// count of uncompleted subordinates

			remaining = arguments.length,



			// count of unprocessed arguments

			i = remaining,



			// subordinate fulfillment data

			resolveContexts = Array( i ),

			resolveValues = slice.call( arguments ),



			// the master Deferred

			master = jQuery.Deferred(),



			// subordinate callback factory

			updateFunc = function( i ) {

				return function( value ) {

					resolveContexts[ i ] = this;

					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;

					if ( !( --remaining ) ) {

						master.resolveWith( resolveContexts, resolveValues );

					}

				};

			};



		// Single- and empty arguments are adopted like Promise.resolve

		if ( remaining <= 1 ) {

			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,

				!remaining );



			// Use .then() to unwrap secondary thenables (cf. gh-3000)

			if ( master.state() === "pending" ||

				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {



				return master.then();

			}

		}



		// Multiple arguments are aggregated like Promise.all array elements

		while ( i-- ) {

			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );

		}



		return master.promise();

	}

} );





// These usually indicate a programmer mistake during development,

// warn about them ASAP rather than swallowing them by default.

var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;



jQuery.Deferred.exceptionHook = function( error, stack ) {



	// Support: IE 8 - 9 only

	// Console exists when dev tools are open, which can happen at any time

	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {

		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );

	}

};









jQuery.readyException = function( error ) {

	window.setTimeout( function() {

		throw error;

	} );

};









// The deferred used on DOM ready

var readyList = jQuery.Deferred();



jQuery.fn.ready = function( fn ) {



	readyList

		.then( fn )



		// Wrap jQuery.readyException in a function so that the lookup

		// happens at the time of error handling instead of callback

		// registration.

		.catch( function( error ) {

			jQuery.readyException( error );

		} );



	return this;

};



jQuery.extend( {



	// Is the DOM ready to be used? Set to true once it occurs.

	isReady: false,



	// A counter to track how many items to wait for before

	// the ready event fires. See #6781

	readyWait: 1,



	// Handle when the DOM is ready

	ready: function( wait ) {



		// Abort if there are pending holds or we're already ready

		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {

			return;

		}



		// Remember that the DOM is ready

		jQuery.isReady = true;



		// If a normal DOM Ready event fired, decrement, and wait if need be

		if ( wait !== true && --jQuery.readyWait > 0 ) {

			return;

		}



		// If there are functions bound, to execute

		readyList.resolveWith( document, [ jQuery ] );

	}

} );



jQuery.ready.then = readyList.then;



// The ready event handler and self cleanup method

function completed() {

	document.removeEventListener( "DOMContentLoaded", completed );

	window.removeEventListener( "load", completed );

	jQuery.ready();

}



// Catch cases where $(document).ready() is called

// after the browser event has already occurred.

// Support: IE <=9 - 10 only

// Older IE sometimes signals "interactive" too soon

if ( document.readyState === "complete" ||

	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {



	// Handle it asynchronously to allow scripts the opportunity to delay ready

	window.setTimeout( jQuery.ready );



} else {



	// Use the handy event callback

	document.addEventListener( "DOMContentLoaded", completed );



	// A fallback to window.onload, that will always work

	window.addEventListener( "load", completed );

}









// Multifunctional method to get and set values of a collection

// The value/s can optionally be executed if it's a function

var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {

	var i = 0,

		len = elems.length,

		bulk = key == null;



	// Sets many values

	if ( toType( key ) === "object" ) {

		chainable = true;

		for ( i in key ) {

			access( elems, fn, i, key[ i ], true, emptyGet, raw );

		}



	// Sets one value

	} else if ( value !== undefined ) {

		chainable = true;



		if ( !isFunction( value ) ) {

			raw = true;

		}



		if ( bulk ) {



			// Bulk operations run against the entire set

			if ( raw ) {

				fn.call( elems, value );

				fn = null;



			// ...except when executing function values

			} else {

				bulk = fn;

				fn = function( elem, key, value ) {

					return bulk.call( jQuery( elem ), value );

				};

			}

		}



		if ( fn ) {

			for ( ; i < len; i++ ) {

				fn(

					elems[ i ], key, raw ?

					value :

					value.call( elems[ i ], i, fn( elems[ i ], key ) )

				);

			}

		}

	}



	if ( chainable ) {

		return elems;

	}



	// Gets

	if ( bulk ) {

		return fn.call( elems );

	}



	return len ? fn( elems[ 0 ], key ) : emptyGet;

};





// Matches dashed string for camelizing

var rmsPrefix = /^-ms-/,

	rdashAlpha = /-([a-z])/g;



// Used by camelCase as callback to replace()

function fcamelCase( all, letter ) {

	return letter.toUpperCase();

}



// Convert dashed to camelCase; used by the css and data modules

// Support: IE <=9 - 11, Edge 12 - 15

// Microsoft forgot to hump their vendor prefix (#9572)

function camelCase( string ) {

	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );

}

var acceptData = function( owner ) {



	// Accepts only:

	//  - Node

	//    - Node.ELEMENT_NODE

	//    - Node.DOCUMENT_NODE

	//  - Object

	//    - Any

	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );

};









function Data() {

	this.expando = jQuery.expando + Data.uid++;

}



Data.uid = 1;



Data.prototype = {



	cache: function( owner ) {



		// Check if the owner object already has a cache

		var value = owner[ this.expando ];



		// If not, create one

		if ( !value ) {

			value = {};



			// We can accept data for non-element nodes in modern browsers,

			// but we should not, see #8335.

			// Always return an empty object.

			if ( acceptData( owner ) ) {



				// If it is a node unlikely to be stringify-ed or looped over

				// use plain assignment

				if ( owner.nodeType ) {

					owner[ this.expando ] = value;



				// Otherwise secure it in a non-enumerable property

				// configurable must be true to allow the property to be

				// deleted when data is removed

				} else {

					Object.defineProperty( owner, this.expando, {

						value: value,

						configurable: true

					} );

				}

			}

		}



		return value;

	},

	set: function( owner, data, value ) {

		var prop,

			cache = this.cache( owner );



		// Handle: [ owner, key, value ] args

		// Always use camelCase key (gh-2257)

		if ( typeof data === "string" ) {

			cache[ camelCase( data ) ] = value;



		// Handle: [ owner, { properties } ] args

		} else {



			// Copy the properties one-by-one to the cache object

			for ( prop in data ) {

				cache[ camelCase( prop ) ] = data[ prop ];

			}

		}

		return cache;

	},

	get: function( owner, key ) {

		return key === undefined ?

			this.cache( owner ) :



			// Always use camelCase key (gh-2257)

			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];

	},

	access: function( owner, key, value ) {



		// In cases where either:

		//

		//   1. No key was specified

		//   2. A string key was specified, but no value provided

		//

		// Take the "read" path and allow the get method to determine

		// which value to return, respectively either:

		//

		//   1. The entire cache object

		//   2. The data stored at the key

		//

		if ( key === undefined ||

				( ( key && typeof key === "string" ) && value === undefined ) ) {



			return this.get( owner, key );

		}



		// When the key is not a string, or both a key and value

		// are specified, set or extend (existing objects) with either:

		//

		//   1. An object of properties

		//   2. A key and value

		//

		this.set( owner, key, value );



		// Since the "set" path can have two possible entry points

		// return the expected data based on which path was taken[*]

		return value !== undefined ? value : key;

	},

	remove: function( owner, key ) {

		var i,

			cache = owner[ this.expando ];



		if ( cache === undefined ) {

			return;

		}



		if ( key !== undefined ) {



			// Support array or space separated string of keys

			if ( Array.isArray( key ) ) {



				// If key is an array of keys...

				// We always set camelCase keys, so remove that.

				key = key.map( camelCase );

			} else {

				key = camelCase( key );



				// If a key with the spaces exists, use it.

				// Otherwise, create an array by matching non-whitespace

				key = key in cache ?

					[ key ] :

					( key.match( rnothtmlwhite ) || [] );

			}



			i = key.length;



			while ( i-- ) {

				delete cache[ key[ i ] ];

			}

		}



		// Remove the expando if there's no more data

		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {



			// Support: Chrome <=35 - 45

			// Webkit & Blink performance suffers when deleting properties

			// from DOM nodes, so set to undefined instead

			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)

			if ( owner.nodeType ) {

				owner[ this.expando ] = undefined;

			} else {

				delete owner[ this.expando ];

			}

		}

	},

	hasData: function( owner ) {

		var cache = owner[ this.expando ];

		return cache !== undefined && !jQuery.isEmptyObject( cache );

	}

};

var dataPriv = new Data();



var dataUser = new Data();







//	Implementation Summary

//

//	1. Enforce API surface and semantic compatibility with 1.9.x branch

//	2. Improve the module's maintainability by reducing the storage

//		paths to a single mechanism.

//	3. Use the same single mechanism to support "private" and "user" data.

//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)

//	5. Avoid exposing implementation details on user objects (eg. expando properties)

//	6. Provide a clear path for implementation upgrade to WeakMap in 2014



var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,

	rmultiDash = /[A-Z]/g;



function getData( data ) {

	if ( data === "true" ) {

		return true;

	}



	if ( data === "false" ) {

		return false;

	}



	if ( data === "null" ) {

		return null;

	}



	// Only convert to a number if it doesn't change the string

	if ( data === +data + "" ) {

		return +data;

	}



	if ( rbrace.test( data ) ) {

		return JSON.parse( data );

	}



	return data;

}



function dataAttr( elem, key, data ) {

	var name;



	// If nothing was found internally, try to fetch any

	// data from the HTML5 data-* attribute

	if ( data === undefined && elem.nodeType === 1 ) {

		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();

		data = elem.getAttribute( name );



		if ( typeof data === "string" ) {

			try {

				data = getData( data );

			} catch ( e ) {}



			// Make sure we set the data so it isn't changed later

			dataUser.set( elem, key, data );

		} else {

			data = undefined;

		}

	}

	return data;

}



jQuery.extend( {

	hasData: function( elem ) {

		return dataUser.hasData( elem ) || dataPriv.hasData( elem );

	},



	data: function( elem, name, data ) {

		return dataUser.access( elem, name, data );

	},



	removeData: function( elem, name ) {

		dataUser.remove( elem, name );

	},



	// TODO: Now that all calls to _data and _removeData have been replaced

	// with direct calls to dataPriv methods, these can be deprecated.

	_data: function( elem, name, data ) {

		return dataPriv.access( elem, name, data );

	},



	_removeData: function( elem, name ) {

		dataPriv.remove( elem, name );

	}

} );



jQuery.fn.extend( {

	data: function( key, value ) {

		var i, name, data,

			elem = this[ 0 ],

			attrs = elem && elem.attributes;



		// Gets all values

		if ( key === undefined ) {

			if ( this.length ) {

				data = dataUser.get( elem );



				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {

					i = attrs.length;

					while ( i-- ) {



						// Support: IE 11 only

						// The attrs elements can be null (#14894)

						if ( attrs[ i ] ) {

							name = attrs[ i ].name;

							if ( name.indexOf( "data-" ) === 0 ) {

								name = camelCase( name.slice( 5 ) );

								dataAttr( elem, name, data[ name ] );

							}

						}

					}

					dataPriv.set( elem, "hasDataAttrs", true );

				}

			}



			return data;

		}



		// Sets multiple values

		if ( typeof key === "object" ) {

			return this.each( function() {

				dataUser.set( this, key );

			} );

		}



		return access( this, function( value ) {

			var data;



			// The calling jQuery object (element matches) is not empty

			// (and therefore has an element appears at this[ 0 ]) and the

			// `value` parameter was not undefined. An empty jQuery object

			// will result in `undefined` for elem = this[ 0 ] which will

			// throw an exception if an attempt to read a data cache is made.

			if ( elem && value === undefined ) {



				// Attempt to get data from the cache

				// The key will always be camelCased in Data

				data = dataUser.get( elem, key );

				if ( data !== undefined ) {

					return data;

				}



				// Attempt to "discover" the data in

				// HTML5 custom data-* attrs

				data = dataAttr( elem, key );

				if ( data !== undefined ) {

					return data;

				}



				// We tried really hard, but the data doesn't exist.

				return;

			}



			// Set the data...

			this.each( function() {



				// We always store the camelCased key

				dataUser.set( this, key, value );

			} );

		}, null, value, arguments.length > 1, null, true );

	},



	removeData: function( key ) {

		return this.each( function() {

			dataUser.remove( this, key );

		} );

	}

} );





jQuery.extend( {

	queue: function( elem, type, data ) {

		var queue;



		if ( elem ) {

			type = ( type || "fx" ) + "queue";

			queue = dataPriv.get( elem, type );



			// Speed up dequeue by getting out quickly if this is just a lookup

			if ( data ) {

				if ( !queue || Array.isArray( data ) ) {

					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );

				} else {

					queue.push( data );

				}

			}

			return queue || [];

		}

	},



	dequeue: function( elem, type ) {

		type = type || "fx";



		var queue = jQuery.queue( elem, type ),

			startLength = queue.length,

			fn = queue.shift(),

			hooks = jQuery._queueHooks( elem, type ),

			next = function() {

				jQuery.dequeue( elem, type );

			};



		// If the fx queue is dequeued, always remove the progress sentinel

		if ( fn === "inprogress" ) {

			fn = queue.shift();

			startLength--;

		}



		if ( fn ) {



			// Add a progress sentinel to prevent the fx queue from being

			// automatically dequeued

			if ( type === "fx" ) {

				queue.unshift( "inprogress" );

			}



			// Clear up the last queue stop function

			delete hooks.stop;

			fn.call( elem, next, hooks );

		}



		if ( !startLength && hooks ) {

			hooks.empty.fire();

		}

	},



	// Not public - generate a queueHooks object, or return the current one

	_queueHooks: function( elem, type ) {

		var key = type + "queueHooks";

		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {

			empty: jQuery.Callbacks( "once memory" ).add( function() {

				dataPriv.remove( elem, [ type + "queue", key ] );

			} )

		} );

	}

} );



jQuery.fn.extend( {

	queue: function( type, data ) {

		var setter = 2;



		if ( typeof type !== "string" ) {

			data = type;

			type = "fx";

			setter--;

		}



		if ( arguments.length < setter ) {

			return jQuery.queue( this[ 0 ], type );

		}



		return data === undefined ?

			this :

			this.each( function() {

				var queue = jQuery.queue( this, type, data );



				// Ensure a hooks for this queue

				jQuery._queueHooks( this, type );



				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {

					jQuery.dequeue( this, type );

				}

			} );

	},

	dequeue: function( type ) {

		return this.each( function() {

			jQuery.dequeue( this, type );

		} );

	},

	clearQueue: function( type ) {

		return this.queue( type || "fx", [] );

	},



	// Get a promise resolved when queues of a certain type

	// are emptied (fx is the type by default)

	promise: function( type, obj ) {

		var tmp,

			count = 1,

			defer = jQuery.Deferred(),

			elements = this,

			i = this.length,

			resolve = function() {

				if ( !( --count ) ) {

					defer.resolveWith( elements, [ elements ] );

				}

			};



		if ( typeof type !== "string" ) {

			obj = type;

			type = undefined;

		}

		type = type || "fx";



		while ( i-- ) {

			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );

			if ( tmp && tmp.empty ) {

				count++;

				tmp.empty.add( resolve );

			}

		}

		resolve();

		return defer.promise( obj );

	}

} );

var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;



var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );





var cssExpand = [ "Top", "Right", "Bottom", "Left" ];



var documentElement = document.documentElement;







	var isAttached = function( elem ) {

			return jQuery.contains( elem.ownerDocument, elem );

		},

		composed = { composed: true };



	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only

	// Check attachment across shadow DOM boundaries when possible (gh-3504)

	// Support: iOS 10.0-10.2 only

	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,

	// leading to errors. We need to check for `getRootNode`.

	if ( documentElement.getRootNode ) {

		isAttached = function( elem ) {

			return jQuery.contains( elem.ownerDocument, elem ) ||

				elem.getRootNode( composed ) === elem.ownerDocument;

		};

	}

var isHiddenWithinTree = function( elem, el ) {



		// isHiddenWithinTree might be called from jQuery#filter function;

		// in that case, element will be second argument

		elem = el || elem;



		// Inline style trumps all

		return elem.style.display === "none" ||

			elem.style.display === "" &&



			// Otherwise, check computed style

			// Support: Firefox <=43 - 45

			// Disconnected elements can have computed display: none, so first confirm that elem is

			// in the document.

			isAttached( elem ) &&



			jQuery.css( elem, "display" ) === "none";

	};



var swap = function( elem, options, callback, args ) {

	var ret, name,

		old = {};



	// Remember the old values, and insert the new ones

	for ( name in options ) {

		old[ name ] = elem.style[ name ];

		elem.style[ name ] = options[ name ];

	}



	ret = callback.apply( elem, args || [] );



	// Revert the old values

	for ( name in options ) {

		elem.style[ name ] = old[ name ];

	}



	return ret;

};









function adjustCSS( elem, prop, valueParts, tween ) {

	var adjusted, scale,

		maxIterations = 20,

		currentValue = tween ?

			function() {

				return tween.cur();

			} :

			function() {

				return jQuery.css( elem, prop, "" );

			},

		initial = currentValue(),

		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),



		// Starting value computation is required for potential unit mismatches

		initialInUnit = elem.nodeType &&

			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&

			rcssNum.exec( jQuery.css( elem, prop ) );



	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {



		// Support: Firefox <=54

		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)

		initial = initial / 2;



		// Trust units reported by jQuery.css

		unit = unit || initialInUnit[ 3 ];



		// Iteratively approximate from a nonzero starting point

		initialInUnit = +initial || 1;



		while ( maxIterations-- ) {



			// Evaluate and update our best guess (doubling guesses that zero out).

			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).

			jQuery.style( elem, prop, initialInUnit + unit );

			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {

				maxIterations = 0;

			}

			initialInUnit = initialInUnit / scale;



		}



		initialInUnit = initialInUnit * 2;

		jQuery.style( elem, prop, initialInUnit + unit );



		// Make sure we update the tween properties later on

		valueParts = valueParts || [];

	}



	if ( valueParts ) {

		initialInUnit = +initialInUnit || +initial || 0;



		// Apply relative offset (+=/-=) if specified

		adjusted = valueParts[ 1 ] ?

			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :

			+valueParts[ 2 ];

		if ( tween ) {

			tween.unit = unit;

			tween.start = initialInUnit;

			tween.end = adjusted;

		}

	}

	return adjusted;

}





var defaultDisplayMap = {};



function getDefaultDisplay( elem ) {

	var temp,

		doc = elem.ownerDocument,

		nodeName = elem.nodeName,

		display = defaultDisplayMap[ nodeName ];



	if ( display ) {

		return display;

	}



	temp = doc.body.appendChild( doc.createElement( nodeName ) );

	display = jQuery.css( temp, "display" );



	temp.parentNode.removeChild( temp );



	if ( display === "none" ) {

		display = "block";

	}

	defaultDisplayMap[ nodeName ] = display;



	return display;

}



function showHide( elements, show ) {

	var display, elem,

		values = [],

		index = 0,

		length = elements.length;



	// Determine new display value for elements that need to change

	for ( ; index < length; index++ ) {

		elem = elements[ index ];

		if ( !elem.style ) {

			continue;

		}



		display = elem.style.display;

		if ( show ) {



			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)

			// check is required in this first loop unless we have a nonempty display value (either

			// inline or about-to-be-restored)

			if ( display === "none" ) {

				values[ index ] = dataPriv.get( elem, "display" ) || null;

				if ( !values[ index ] ) {

					elem.style.display = "";

				}

			}

			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {

				values[ index ] = getDefaultDisplay( elem );

			}

		} else {

			if ( display !== "none" ) {

				values[ index ] = "none";



				// Remember what we're overwriting

				dataPriv.set( elem, "display", display );

			}

		}

	}



	// Set the display of the elements in a second loop to avoid constant reflow

	for ( index = 0; index < length; index++ ) {

		if ( values[ index ] != null ) {

			elements[ index ].style.display = values[ index ];

		}

	}



	return elements;

}



jQuery.fn.extend( {

	show: function() {

		return showHide( this, true );

	},

	hide: function() {

		return showHide( this );

	},

	toggle: function( state ) {

		if ( typeof state === "boolean" ) {

			return state ? this.show() : this.hide();

		}



		return this.each( function() {

			if ( isHiddenWithinTree( this ) ) {

				jQuery( this ).show();

			} else {

				jQuery( this ).hide();

			}

		} );

	}

} );

var rcheckableType = ( /^(?:checkbox|radio)$/i );



var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );



var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );







// We have to close these tags to support XHTML (#13200)

var wrapMap = {



	// Support: IE <=9 only

	option: [ 1, "<select multiple='multiple'>", "</select>" ],



	// XHTML parsers do not magically insert elements in the

	// same way that tag soup parsers do. So we cannot shorten

	// this by omitting <tbody> or other required elements.

	thead: [ 1, "<table>", "</table>" ],

	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],

	tr: [ 2, "<table><tbody>", "</tbody></table>" ],

	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],



	_default: [ 0, "", "" ]

};



// Support: IE <=9 only

wrapMap.optgroup = wrapMap.option;



wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;

wrapMap.th = wrapMap.td;





function getAll( context, tag ) {



	// Support: IE <=9 - 11 only

	// Use typeof to avoid zero-argument method invocation on host objects (#15151)

	var ret;



	if ( typeof context.getElementsByTagName !== "undefined" ) {

		ret = context.getElementsByTagName( tag || "*" );



	} else if ( typeof context.querySelectorAll !== "undefined" ) {

		ret = context.querySelectorAll( tag || "*" );



	} else {

		ret = [];

	}



	if ( tag === undefined || tag && nodeName( context, tag ) ) {

		return jQuery.merge( [ context ], ret );

	}



	return ret;

}





// Mark scripts as having already been evaluated

function setGlobalEval( elems, refElements ) {

	var i = 0,

		l = elems.length;



	for ( ; i < l; i++ ) {

		dataPriv.set(

			elems[ i ],

			"globalEval",

			!refElements || dataPriv.get( refElements[ i ], "globalEval" )

		);

	}

}





var rhtml = /<|&#?\w+;/;



function buildFragment( elems, context, scripts, selection, ignored ) {

	var elem, tmp, tag, wrap, attached, j,

		fragment = context.createDocumentFragment(),

		nodes = [],

		i = 0,

		l = elems.length;



	for ( ; i < l; i++ ) {

		elem = elems[ i ];



		if ( elem || elem === 0 ) {



			// Add nodes directly

			if ( toType( elem ) === "object" ) {



				// Support: Android <=4.0 only, PhantomJS 1 only

				// push.apply(_, arraylike) throws on ancient WebKit

				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );



			// Convert non-html into a text node

			} else if ( !rhtml.test( elem ) ) {

				nodes.push( context.createTextNode( elem ) );



			// Convert html into DOM nodes

			} else {

				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );



				// Deserialize a standard representation

				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();

				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];



				// Descend through wrappers to the right content

				j = wrap[ 0 ];

				while ( j-- ) {

					tmp = tmp.lastChild;

				}



				// Support: Android <=4.0 only, PhantomJS 1 only

				// push.apply(_, arraylike) throws on ancient WebKit

				jQuery.merge( nodes, tmp.childNodes );



				// Remember the top-level container

				tmp = fragment.firstChild;



				// Ensure the created nodes are orphaned (#12392)

				tmp.textContent = "";

			}

		}

	}



	// Remove wrapper from fragment

	fragment.textContent = "";



	i = 0;

	while ( ( elem = nodes[ i++ ] ) ) {



		// Skip elements already in the context collection (trac-4087)

		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {

			if ( ignored ) {

				ignored.push( elem );

			}

			continue;

		}



		attached = isAttached( elem );



		// Append to fragment

		tmp = getAll( fragment.appendChild( elem ), "script" );



		// Preserve script evaluation history

		if ( attached ) {

			setGlobalEval( tmp );

		}



		// Capture executables

		if ( scripts ) {

			j = 0;

			while ( ( elem = tmp[ j++ ] ) ) {

				if ( rscriptType.test( elem.type || "" ) ) {

					scripts.push( elem );

				}

			}

		}

	}



	return fragment;

}





( function() {

	var fragment = document.createDocumentFragment(),

		div = fragment.appendChild( document.createElement( "div" ) ),

		input = document.createElement( "input" );



	// Support: Android 4.0 - 4.3 only

	// Check state lost if the name is set (#11217)

	// Support: Windows Web Apps (WWA)

	// `name` and `type` must use .setAttribute for WWA (#14901)

	input.setAttribute( "type", "radio" );

	input.setAttribute( "checked", "checked" );

	input.setAttribute( "name", "t" );



	div.appendChild( input );



	// Support: Android <=4.1 only

	// Older WebKit doesn't clone checked state correctly in fragments

	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;



	// Support: IE <=11 only

	// Make sure textarea (and checkbox) defaultValue is properly cloned

	div.innerHTML = "<textarea>x</textarea>";

	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

} )();





var

	rkeyEvent = /^key/,

	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,

	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;



function returnTrue() {

	return true;

}



function returnFalse() {

	return false;

}



// Support: IE <=9 - 11+

// focus() and blur() are asynchronous, except when they are no-op.

// So expect focus to be synchronous when the element is already active,

// and blur to be synchronous when the element is not already active.

// (focus and blur are always synchronous in other supported browsers,

// this just defines when we can count on it).

function expectSync( elem, type ) {

	return ( elem === safeActiveElement() ) === ( type === "focus" );

}



// Support: IE <=9 only

// Accessing document.activeElement can throw unexpectedly

// https://bugs.jquery.com/ticket/13393

function safeActiveElement() {

	try {

		return document.activeElement;

	} catch ( err ) { }

}



function on( elem, types, selector, data, fn, one ) {

	var origFn, type;



	// Types can be a map of types/handlers

	if ( typeof types === "object" ) {



		// ( types-Object, selector, data )

		if ( typeof selector !== "string" ) {



			// ( types-Object, data )

			data = data || selector;

			selector = undefined;

		}

		for ( type in types ) {

			on( elem, type, selector, data, types[ type ], one );

		}

		return elem;

	}



	if ( data == null && fn == null ) {



		// ( types, fn )

		fn = selector;

		data = selector = undefined;

	} else if ( fn == null ) {

		if ( typeof selector === "string" ) {



			// ( types, selector, fn )

			fn = data;

			data = undefined;

		} else {



			// ( types, data, fn )

			fn = data;

			data = selector;

			selector = undefined;

		}

	}

	if ( fn === false ) {

		fn = returnFalse;

	} else if ( !fn ) {

		return elem;

	}



	if ( one === 1 ) {

		origFn = fn;

		fn = function( event ) {



			// Can use an empty set, since event contains the info

			jQuery().off( event );

			return origFn.apply( this, arguments );

		};



		// Use same guid so caller can remove using origFn

		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );

	}

	return elem.each( function() {

		jQuery.event.add( this, types, fn, data, selector );

	} );

}



/*

 * Helper functions for managing events -- not part of the public interface.

 * Props to Dean Edwards' addEvent library for many of the ideas.

 */

jQuery.event = {



	global: {},



	add: function( elem, types, handler, data, selector ) {



		var handleObjIn, eventHandle, tmp,

			events, t, handleObj,

			special, handlers, type, namespaces, origType,

			elemData = dataPriv.get( elem );



		// Don't attach events to noData or text/comment nodes (but allow plain objects)

		if ( !elemData ) {

			return;

		}



		// Caller can pass in an object of custom data in lieu of the handler

		if ( handler.handler ) {

			handleObjIn = handler;

			handler = handleObjIn.handler;

			selector = handleObjIn.selector;

		}



		// Ensure that invalid selectors throw exceptions at attach time

		// Evaluate against documentElement in case elem is a non-element node (e.g., document)

		if ( selector ) {

			jQuery.find.matchesSelector( documentElement, selector );

		}



		// Make sure that the handler has a unique ID, used to find/remove it later

		if ( !handler.guid ) {

			handler.guid = jQuery.guid++;

		}



		// Init the element's event structure and main handler, if this is the first

		if ( !( events = elemData.events ) ) {

			events = elemData.events = {};

		}

		if ( !( eventHandle = elemData.handle ) ) {

			eventHandle = elemData.handle = function( e ) {



				// Discard the second event of a jQuery.event.trigger() and

				// when an event is called after a page has unloaded

				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?

					jQuery.event.dispatch.apply( elem, arguments ) : undefined;

			};

		}



		// Handle multiple events separated by a space

		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];

		t = types.length;

		while ( t-- ) {

			tmp = rtypenamespace.exec( types[ t ] ) || [];

			type = origType = tmp[ 1 ];

			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();



			// There *must* be a type, no attaching namespace-only handlers

			if ( !type ) {

				continue;

			}



			// If event changes its type, use the special event handlers for the changed type

			special = jQuery.event.special[ type ] || {};



			// If selector defined, determine special event api type, otherwise given type

			type = ( selector ? special.delegateType : special.bindType ) || type;



			// Update special based on newly reset type

			special = jQuery.event.special[ type ] || {};



			// handleObj is passed to all event handlers

			handleObj = jQuery.extend( {

				type: type,

				origType: origType,

				data: data,

				handler: handler,

				guid: handler.guid,

				selector: selector,

				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),

				namespace: namespaces.join( "." )

			}, handleObjIn );



			// Init the event handler queue if we're the first

			if ( !( handlers = events[ type ] ) ) {

				handlers = events[ type ] = [];

				handlers.delegateCount = 0;



				// Only use addEventListener if the special events handler returns false

				if ( !special.setup ||

					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {



					if ( elem.addEventListener ) {

						elem.addEventListener( type, eventHandle );

					}

				}

			}



			if ( special.add ) {

				special.add.call( elem, handleObj );



				if ( !handleObj.handler.guid ) {

					handleObj.handler.guid = handler.guid;

				}

			}



			// Add to the element's handler list, delegates in front

			if ( selector ) {

				handlers.splice( handlers.delegateCount++, 0, handleObj );

			} else {

				handlers.push( handleObj );

			}



			// Keep track of which events have ever been used, for event optimization

			jQuery.event.global[ type ] = true;

		}



	},



	// Detach an event or set of events from an element

	remove: function( elem, types, handler, selector, mappedTypes ) {



		var j, origCount, tmp,

			events, t, handleObj,

			special, handlers, type, namespaces, origType,

			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );



		if ( !elemData || !( events = elemData.events ) ) {

			return;

		}



		// Once for each type.namespace in types; type may be omitted

		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];

		t = types.length;

		while ( t-- ) {

			tmp = rtypenamespace.exec( types[ t ] ) || [];

			type = origType = tmp[ 1 ];

			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();



			// Unbind all events (on this namespace, if provided) for the element

			if ( !type ) {

				for ( type in events ) {

					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );

				}

				continue;

			}



			special = jQuery.event.special[ type ] || {};

			type = ( selector ? special.delegateType : special.bindType ) || type;

			handlers = events[ type ] || [];

			tmp = tmp[ 2 ] &&

				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );



			// Remove matching events

			origCount = j = handlers.length;

			while ( j-- ) {

				handleObj = handlers[ j ];



				if ( ( mappedTypes || origType === handleObj.origType ) &&

					( !handler || handler.guid === handleObj.guid ) &&

					( !tmp || tmp.test( handleObj.namespace ) ) &&

					( !selector || selector === handleObj.selector ||

						selector === "**" && handleObj.selector ) ) {

					handlers.splice( j, 1 );



					if ( handleObj.selector ) {

						handlers.delegateCount--;

					}

					if ( special.remove ) {

						special.remove.call( elem, handleObj );

					}

				}

			}



			// Remove generic event handler if we removed something and no more handlers exist

			// (avoids potential for endless recursion during removal of special event handlers)

			if ( origCount && !handlers.length ) {

				if ( !special.teardown ||

					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {



					jQuery.removeEvent( elem, type, elemData.handle );

				}



				delete events[ type ];

			}

		}



		// Remove data and the expando if it's no longer used

		if ( jQuery.isEmptyObject( events ) ) {

			dataPriv.remove( elem, "handle events" );

		}

	},



	dispatch: function( nativeEvent ) {



		// Make a writable jQuery.Event from the native event object

		var event = jQuery.event.fix( nativeEvent );



		var i, j, ret, matched, handleObj, handlerQueue,

			args = new Array( arguments.length ),

			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],

			special = jQuery.event.special[ event.type ] || {};



		// Use the fix-ed jQuery.Event rather than the (read-only) native event

		args[ 0 ] = event;



		for ( i = 1; i < arguments.length; i++ ) {

			args[ i ] = arguments[ i ];

		}



		event.delegateTarget = this;



		// Call the preDispatch hook for the mapped type, and let it bail if desired

		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {

			return;

		}



		// Determine handlers

		handlerQueue = jQuery.event.handlers.call( this, event, handlers );



		// Run delegates first; they may want to stop propagation beneath us

		i = 0;

		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {

			event.currentTarget = matched.elem;



			j = 0;

			while ( ( handleObj = matched.handlers[ j++ ] ) &&

				!event.isImmediatePropagationStopped() ) {



				// If the event is namespaced, then each handler is only invoked if it is

				// specially universal or its namespaces are a superset of the event's.

				if ( !event.rnamespace || handleObj.namespace === false ||

					event.rnamespace.test( handleObj.namespace ) ) {



					event.handleObj = handleObj;

					event.data = handleObj.data;



					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||

						handleObj.handler ).apply( matched.elem, args );



					if ( ret !== undefined ) {

						if ( ( event.result = ret ) === false ) {

							event.preventDefault();

							event.stopPropagation();

						}

					}

				}

			}

		}



		// Call the postDispatch hook for the mapped type

		if ( special.postDispatch ) {

			special.postDispatch.call( this, event );

		}



		return event.result;

	},



	handlers: function( event, handlers ) {

		var i, handleObj, sel, matchedHandlers, matchedSelectors,

			handlerQueue = [],

			delegateCount = handlers.delegateCount,

			cur = event.target;



		// Find delegate handlers

		if ( delegateCount &&



			// Support: IE <=9

			// Black-hole SVG <use> instance trees (trac-13180)

			cur.nodeType &&



			// Support: Firefox <=42

			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)

			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click

			// Support: IE 11 only

			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)

			!( event.type === "click" && event.button >= 1 ) ) {



			for ( ; cur !== this; cur = cur.parentNode || this ) {



				// Don't check non-elements (#13208)

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)

				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {

					matchedHandlers = [];

					matchedSelectors = {};

					for ( i = 0; i < delegateCount; i++ ) {

						handleObj = handlers[ i ];



						// Don't conflict with Object.prototype properties (#13203)

						sel = handleObj.selector + " ";



						if ( matchedSelectors[ sel ] === undefined ) {

							matchedSelectors[ sel ] = handleObj.needsContext ?

								jQuery( sel, this ).index( cur ) > -1 :

								jQuery.find( sel, this, null, [ cur ] ).length;

						}

						if ( matchedSelectors[ sel ] ) {

							matchedHandlers.push( handleObj );

						}

					}

					if ( matchedHandlers.length ) {

						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );

					}

				}

			}

		}



		// Add the remaining (directly-bound) handlers

		cur = this;

		if ( delegateCount < handlers.length ) {

			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );

		}



		return handlerQueue;

	},



	addProp: function( name, hook ) {

		Object.defineProperty( jQuery.Event.prototype, name, {

			enumerable: true,

			configurable: true,



			get: isFunction( hook ) ?

				function() {

					if ( this.originalEvent ) {

							return hook( this.originalEvent );

					}

				} :

				function() {

					if ( this.originalEvent ) {

							return this.originalEvent[ name ];

					}

				},



			set: function( value ) {

				Object.defineProperty( this, name, {

					enumerable: true,

					configurable: true,

					writable: true,

					value: value

				} );

			}

		} );

	},



	fix: function( originalEvent ) {

		return originalEvent[ jQuery.expando ] ?

			originalEvent :

			new jQuery.Event( originalEvent );

	},



	special: {

		load: {



			// Prevent triggered image.load events from bubbling to window.load

			noBubble: true

		},

		click: {



			// Utilize native event to ensure correct state for checkable inputs

			setup: function( data ) {



				// For mutual compressibility with _default, replace `this` access with a local var.

				// `|| data` is dead code meant only to preserve the variable through minification.

				var el = this || data;



				// Claim the first handler

				if ( rcheckableType.test( el.type ) &&

					el.click && nodeName( el, "input" ) ) {



					// dataPriv.set( el, "click", ... )

					leverageNative( el, "click", returnTrue );

				}



				// Return false to allow normal processing in the caller

				return false;

			},

			trigger: function( data ) {



				// For mutual compressibility with _default, replace `this` access with a local var.

				// `|| data` is dead code meant only to preserve the variable through minification.

				var el = this || data;



				// Force setup before triggering a click

				if ( rcheckableType.test( el.type ) &&

					el.click && nodeName( el, "input" ) ) {



					leverageNative( el, "click" );

				}



				// Return non-false to allow normal event-path propagation

				return true;

			},



			// For cross-browser consistency, suppress native .click() on links

			// Also prevent it if we're currently inside a leveraged native-event stack

			_default: function( event ) {

				var target = event.target;

				return rcheckableType.test( target.type ) &&

					target.click && nodeName( target, "input" ) &&

					dataPriv.get( target, "click" ) ||

					nodeName( target, "a" );

			}

		},



		beforeunload: {

			postDispatch: function( event ) {



				// Support: Firefox 20+

				// Firefox doesn't alert if the returnValue field is not set.

				if ( event.result !== undefined && event.originalEvent ) {

					event.originalEvent.returnValue = event.result;

				}

			}

		}

	}

};



// Ensure the presence of an event listener that handles manually-triggered

// synthetic events by interrupting progress until reinvoked in response to

// *native* events that it fires directly, ensuring that state changes have

// already occurred before other listeners are invoked.

function leverageNative( el, type, expectSync ) {



	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add

	if ( !expectSync ) {

		if ( dataPriv.get( el, type ) === undefined ) {

			jQuery.event.add( el, type, returnTrue );

		}

		return;

	}



	// Register the controller as a special universal handler for all event namespaces

	dataPriv.set( el, type, false );

	jQuery.event.add( el, type, {

		namespace: false,

		handler: function( event ) {

			var notAsync, result,

				saved = dataPriv.get( this, type );



			if ( ( event.isTrigger & 1 ) && this[ type ] ) {



				// Interrupt processing of the outer synthetic .trigger()ed event

				// Saved data should be false in such cases, but might be a leftover capture object

				// from an async native handler (gh-4350)

				if ( !saved.length ) {



					// Store arguments for use when handling the inner native event

					// There will always be at least one argument (an event object), so this array

					// will not be confused with a leftover capture object.

					saved = slice.call( arguments );

					dataPriv.set( this, type, saved );



					// Trigger the native event and capture its result

					// Support: IE <=9 - 11+

					// focus() and blur() are asynchronous

					notAsync = expectSync( this, type );

					this[ type ]();

					result = dataPriv.get( this, type );

					if ( saved !== result || notAsync ) {

						dataPriv.set( this, type, false );

					} else {

						result = {};

					}

					if ( saved !== result ) {



						// Cancel the outer synthetic event

						event.stopImmediatePropagation();

						event.preventDefault();

						return result.value;

					}



				// If this is an inner synthetic event for an event with a bubbling surrogate

				// (focus or blur), assume that the surrogate already propagated from triggering the

				// native event and prevent that from happening again here.

				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the

				// bubbling surrogate propagates *after* the non-bubbling base), but that seems

				// less bad than duplication.

				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {

					event.stopPropagation();

				}



			// If this is a native event triggered above, everything is now in order

			// Fire an inner synthetic event with the original arguments

			} else if ( saved.length ) {



				// ...and capture the result

				dataPriv.set( this, type, {

					value: jQuery.event.trigger(



						// Support: IE <=9 - 11+

						// Extend with the prototype to reset the above stopImmediatePropagation()

						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),

						saved.slice( 1 ),

						this

					)

				} );



				// Abort handling of the native event

				event.stopImmediatePropagation();

			}

		}

	} );

}



jQuery.removeEvent = function( elem, type, handle ) {



	// This "if" is needed for plain objects

	if ( elem.removeEventListener ) {

		elem.removeEventListener( type, handle );

	}

};



jQuery.Event = function( src, props ) {



	// Allow instantiation without the 'new' keyword

	if ( !( this instanceof jQuery.Event ) ) {

		return new jQuery.Event( src, props );

	}



	// Event object

	if ( src && src.type ) {

		this.originalEvent = src;

		this.type = src.type;



		// Events bubbling up the document may have been marked as prevented

		// by a handler lower down the tree; reflect the correct value.

		this.isDefaultPrevented = src.defaultPrevented ||

				src.defaultPrevented === undefined &&



				// Support: Android <=2.3 only

				src.returnValue === false ?

			returnTrue :

			returnFalse;



		// Create target properties

		// Support: Safari <=6 - 7 only

		// Target should not be a text node (#504, #13143)

		this.target = ( src.target && src.target.nodeType === 3 ) ?

			src.target.parentNode :

			src.target;



		this.currentTarget = src.currentTarget;

		this.relatedTarget = src.relatedTarget;



	// Event type

	} else {

		this.type = src;

	}



	// Put explicitly provided properties onto the event object

	if ( props ) {

		jQuery.extend( this, props );

	}



	// Create a timestamp if incoming event doesn't have one

	this.timeStamp = src && src.timeStamp || Date.now();



	// Mark it as fixed

	this[ jQuery.expando ] = true;

};



// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding

// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html

jQuery.Event.prototype = {

	constructor: jQuery.Event,

	isDefaultPrevented: returnFalse,

	isPropagationStopped: returnFalse,

	isImmediatePropagationStopped: returnFalse,

	isSimulated: false,



	preventDefault: function() {

		var e = this.originalEvent;



		this.isDefaultPrevented = returnTrue;



		if ( e && !this.isSimulated ) {

			e.preventDefault();

		}

	},

	stopPropagation: function() {

		var e = this.originalEvent;



		this.isPropagationStopped = returnTrue;



		if ( e && !this.isSimulated ) {

			e.stopPropagation();

		}

	},

	stopImmediatePropagation: function() {

		var e = this.originalEvent;



		this.isImmediatePropagationStopped = returnTrue;



		if ( e && !this.isSimulated ) {

			e.stopImmediatePropagation();

		}



		this.stopPropagation();

	}

};



// Includes all common event props including KeyEvent and MouseEvent specific props

jQuery.each( {

	altKey: true,

	bubbles: true,

	cancelable: true,

	changedTouches: true,

	ctrlKey: true,

	detail: true,

	eventPhase: true,

	metaKey: true,

	pageX: true,

	pageY: true,

	shiftKey: true,

	view: true,

	"char": true,

	code: true,

	charCode: true,

	key: true,

	keyCode: true,

	button: true,

	buttons: true,

	clientX: true,

	clientY: true,

	offsetX: true,

	offsetY: true,

	pointerId: true,

	pointerType: true,

	screenX: true,

	screenY: true,

	targetTouches: true,

	toElement: true,

	touches: true,



	which: function( event ) {

		var button = event.button;



		// Add which for key events

		if ( event.which == null && rkeyEvent.test( event.type ) ) {

			return event.charCode != null ? event.charCode : event.keyCode;

		}



		// Add which for click: 1 === left; 2 === middle; 3 === right

		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {

			if ( button & 1 ) {

				return 1;

			}



			if ( button & 2 ) {

				return 3;

			}



			if ( button & 4 ) {

				return 2;

			}



			return 0;

		}



		return event.which;

	}

}, jQuery.event.addProp );



jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {

	jQuery.event.special[ type ] = {



		// Utilize native event if possible so blur/focus sequence is correct

		setup: function() {



			// Claim the first handler

			// dataPriv.set( this, "focus", ... )

			// dataPriv.set( this, "blur", ... )

			leverageNative( this, type, expectSync );



			// Return false to allow normal processing in the caller

			return false;

		},

		trigger: function() {



			// Force setup before trigger

			leverageNative( this, type );



			// Return non-false to allow normal event-path propagation

			return true;

		},



		delegateType: delegateType

	};

} );



// Create mouseenter/leave events using mouseover/out and event-time checks

// so that event delegation works in jQuery.

// Do the same for pointerenter/pointerleave and pointerover/pointerout

//

// Support: Safari 7 only

// Safari sends mouseenter too often; see:

// https://bugs.chromium.org/p/chromium/issues/detail?id=470258

// for the description of the bug (it existed in older Chrome versions as well).

jQuery.each( {

	mouseenter: "mouseover",

	mouseleave: "mouseout",

	pointerenter: "pointerover",

	pointerleave: "pointerout"

}, function( orig, fix ) {

	jQuery.event.special[ orig ] = {

		delegateType: fix,

		bindType: fix,



		handle: function( event ) {

			var ret,

				target = this,

				related = event.relatedTarget,

				handleObj = event.handleObj;



			// For mouseenter/leave call the handler if related is outside the target.

			// NB: No relatedTarget if the mouse left/entered the browser window

			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {

				event.type = handleObj.origType;

				ret = handleObj.handler.apply( this, arguments );

				event.type = fix;

			}

			return ret;

		}

	};

} );



jQuery.fn.extend( {



	on: function( types, selector, data, fn ) {

		return on( this, types, selector, data, fn );

	},

	one: function( types, selector, data, fn ) {

		return on( this, types, selector, data, fn, 1 );

	},

	off: function( types, selector, fn ) {

		var handleObj, type;

		if ( types && types.preventDefault && types.handleObj ) {



			// ( event )  dispatched jQuery.Event

			handleObj = types.handleObj;

			jQuery( types.delegateTarget ).off(

				handleObj.namespace ?

					handleObj.origType + "." + handleObj.namespace :

					handleObj.origType,

				handleObj.selector,

				handleObj.handler

			);

			return this;

		}

		if ( typeof types === "object" ) {



			// ( types-object [, selector] )

			for ( type in types ) {

				this.off( type, selector, types[ type ] );

			}

			return this;

		}

		if ( selector === false || typeof selector === "function" ) {



			// ( types [, fn] )

			fn = selector;

			selector = undefined;

		}

		if ( fn === false ) {

			fn = returnFalse;

		}

		return this.each( function() {

			jQuery.event.remove( this, types, fn, selector );

		} );

	}

} );





var



	/* eslint-disable max-len */



	// See https://github.com/eslint/eslint/issues/3229

	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,



	/* eslint-enable */



	// Support: IE <=10 - 11, Edge 12 - 13 only

	// In IE/Edge using regex groups here causes severe slowdowns.

	// See https://connect.microsoft.com/IE/feedback/details/1736512/

	rnoInnerhtml = /<script|<style|<link/i,



	// checked="checked" or checked

	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,

	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;



// Prefer a tbody over its parent table for containing new rows

function manipulationTarget( elem, content ) {

	if ( nodeName( elem, "table" ) &&

		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {



		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;

	}



	return elem;

}



// Replace/restore the type attribute of script elements for safe DOM manipulation

function disableScript( elem ) {

	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;

	return elem;

}

function restoreScript( elem ) {

	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {

		elem.type = elem.type.slice( 5 );

	} else {

		elem.removeAttribute( "type" );

	}



	return elem;

}



function cloneCopyEvent( src, dest ) {

	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;



	if ( dest.nodeType !== 1 ) {

		return;

	}



	// 1. Copy private data: events, handlers, etc.

	if ( dataPriv.hasData( src ) ) {

		pdataOld = dataPriv.access( src );

		pdataCur = dataPriv.set( dest, pdataOld );

		events = pdataOld.events;



		if ( events ) {

			delete pdataCur.handle;

			pdataCur.events = {};



			for ( type in events ) {

				for ( i = 0, l = events[ type ].length; i < l; i++ ) {

					jQuery.event.add( dest, type, events[ type ][ i ] );

				}

			}

		}

	}



	// 2. Copy user data

	if ( dataUser.hasData( src ) ) {

		udataOld = dataUser.access( src );

		udataCur = jQuery.extend( {}, udataOld );



		dataUser.set( dest, udataCur );

	}

}



// Fix IE bugs, see support tests

function fixInput( src, dest ) {

	var nodeName = dest.nodeName.toLowerCase();



	// Fails to persist the checked state of a cloned checkbox or radio button.

	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		dest.checked = src.checked;



	// Fails to return the selected option to the default selected state when cloning options

	} else if ( nodeName === "input" || nodeName === "textarea" ) {

		dest.defaultValue = src.defaultValue;

	}

}



function domManip( collection, args, callback, ignored ) {



	// Flatten any nested arrays

	args = concat.apply( [], args );



	var fragment, first, scripts, hasScripts, node, doc,

		i = 0,

		l = collection.length,

		iNoClone = l - 1,

		value = args[ 0 ],

		valueIsFunction = isFunction( value );



	// We can't cloneNode fragments that contain checked, in WebKit

	if ( valueIsFunction ||

			( l > 1 && typeof value === "string" &&

				!support.checkClone && rchecked.test( value ) ) ) {

		return collection.each( function( index ) {

			var self = collection.eq( index );

			if ( valueIsFunction ) {

				args[ 0 ] = value.call( this, index, self.html() );

			}

			domManip( self, args, callback, ignored );

		} );

	}



	if ( l ) {

		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );

		first = fragment.firstChild;



		if ( fragment.childNodes.length === 1 ) {

			fragment = first;

		}



		// Require either new content or an interest in ignored elements to invoke the callback

		if ( first || ignored ) {

			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );

			hasScripts = scripts.length;



			// Use the original fragment for the last item

			// instead of the first because it can end up

			// being emptied incorrectly in certain situations (#8070).

			for ( ; i < l; i++ ) {

				node = fragment;



				if ( i !== iNoClone ) {

					node = jQuery.clone( node, true, true );



					// Keep references to cloned scripts for later restoration

					if ( hasScripts ) {



						// Support: Android <=4.0 only, PhantomJS 1 only

						// push.apply(_, arraylike) throws on ancient WebKit

						jQuery.merge( scripts, getAll( node, "script" ) );

					}

				}



				callback.call( collection[ i ], node, i );

			}



			if ( hasScripts ) {

				doc = scripts[ scripts.length - 1 ].ownerDocument;



				// Reenable scripts

				jQuery.map( scripts, restoreScript );



				// Evaluate executable scripts on first document insertion

				for ( i = 0; i < hasScripts; i++ ) {

					node = scripts[ i ];

					if ( rscriptType.test( node.type || "" ) &&

						!dataPriv.access( node, "globalEval" ) &&

						jQuery.contains( doc, node ) ) {



						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {



							// Optional AJAX dependency, but won't run scripts if not present

							if ( jQuery._evalUrl && !node.noModule ) {

								jQuery._evalUrl( node.src, {

									nonce: node.nonce || node.getAttribute( "nonce" )

								} );

							}

						} else {

							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );

						}

					}

				}

			}

		}

	}



	return collection;

}



function remove( elem, selector, keepData ) {

	var node,

		nodes = selector ? jQuery.filter( selector, elem ) : elem,

		i = 0;



	for ( ; ( node = nodes[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {

			jQuery.cleanData( getAll( node ) );

		}



		if ( node.parentNode ) {

			if ( keepData && isAttached( node ) ) {

				setGlobalEval( getAll( node, "script" ) );

			}

			node.parentNode.removeChild( node );

		}

	}



	return elem;

}



jQuery.extend( {

	htmlPrefilter: function( html ) {

		return html.replace( rxhtmlTag, "<$1></$2>" );

	},



	clone: function( elem, dataAndEvents, deepDataAndEvents ) {

		var i, l, srcElements, destElements,

			clone = elem.cloneNode( true ),

			inPage = isAttached( elem );



		// Fix IE cloning issues

		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&

				!jQuery.isXMLDoc( elem ) ) {



			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2

			destElements = getAll( clone );

			srcElements = getAll( elem );



			for ( i = 0, l = srcElements.length; i < l; i++ ) {

				fixInput( srcElements[ i ], destElements[ i ] );

			}

		}



		// Copy the events from the original to the clone

		if ( dataAndEvents ) {

			if ( deepDataAndEvents ) {

				srcElements = srcElements || getAll( elem );

				destElements = destElements || getAll( clone );



				for ( i = 0, l = srcElements.length; i < l; i++ ) {

					cloneCopyEvent( srcElements[ i ], destElements[ i ] );

				}

			} else {

				cloneCopyEvent( elem, clone );

			}

		}



		// Preserve script evaluation history

		destElements = getAll( clone, "script" );

		if ( destElements.length > 0 ) {

			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );

		}



		// Return the cloned set

		return clone;

	},



	cleanData: function( elems ) {

		var data, elem, type,

			special = jQuery.event.special,

			i = 0;



		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {

			if ( acceptData( elem ) ) {

				if ( ( data = elem[ dataPriv.expando ] ) ) {

					if ( data.events ) {

						for ( type in data.events ) {

							if ( special[ type ] ) {

								jQuery.event.remove( elem, type );



							// This is a shortcut to avoid jQuery.event.remove's overhead

							} else {

								jQuery.removeEvent( elem, type, data.handle );

							}

						}

					}



					// Support: Chrome <=35 - 45+

					// Assign undefined instead of using delete, see Data#remove

					elem[ dataPriv.expando ] = undefined;

				}

				if ( elem[ dataUser.expando ] ) {



					// Support: Chrome <=35 - 45+

					// Assign undefined instead of using delete, see Data#remove

					elem[ dataUser.expando ] = undefined;

				}

			}

		}

	}

} );



jQuery.fn.extend( {

	detach: function( selector ) {

		return remove( this, selector, true );

	},



	remove: function( selector ) {

		return remove( this, selector );

	},



	text: function( value ) {

		return access( this, function( value ) {

			return value === undefined ?

				jQuery.text( this ) :

				this.empty().each( function() {

					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {

						this.textContent = value;

					}

				} );

		}, null, value, arguments.length );

	},



	append: function() {

		return domManip( this, arguments, function( elem ) {

			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {

				var target = manipulationTarget( this, elem );

				target.appendChild( elem );

			}

		} );

	},



	prepend: function() {

		return domManip( this, arguments, function( elem ) {

			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {

				var target = manipulationTarget( this, elem );

				target.insertBefore( elem, target.firstChild );

			}

		} );

	},



	before: function() {

		return domManip( this, arguments, function( elem ) {

			if ( this.parentNode ) {

				this.parentNode.insertBefore( elem, this );

			}

		} );

	},



	after: function() {

		return domManip( this, arguments, function( elem ) {

			if ( this.parentNode ) {

				this.parentNode.insertBefore( elem, this.nextSibling );

			}

		} );

	},



	empty: function() {

		var elem,

			i = 0;



		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			if ( elem.nodeType === 1 ) {



				// Prevent memory leaks

				jQuery.cleanData( getAll( elem, false ) );



				// Remove any remaining nodes

				elem.textContent = "";

			}

		}



		return this;

	},



	clone: function( dataAndEvents, deepDataAndEvents ) {

		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;

		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;



		return this.map( function() {

			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );

		} );

	},



	html: function( value ) {

		return access( this, function( value ) {

			var elem = this[ 0 ] || {},

				i = 0,

				l = this.length;



			if ( value === undefined && elem.nodeType === 1 ) {

				return elem.innerHTML;

			}



			// See if we can take a shortcut and just use innerHTML

			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&

				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {



				value = jQuery.htmlPrefilter( value );



				try {

					for ( ; i < l; i++ ) {

						elem = this[ i ] || {};



						// Remove element nodes and prevent memory leaks

						if ( elem.nodeType === 1 ) {

							jQuery.cleanData( getAll( elem, false ) );

							elem.innerHTML = value;

						}

					}



					elem = 0;



				// If using innerHTML throws an exception, use the fallback method

				} catch ( e ) {}

			}



			if ( elem ) {

				this.empty().append( value );

			}

		}, null, value, arguments.length );

	},



	replaceWith: function() {

		var ignored = [];



		// Make the changes, replacing each non-ignored context element with the new content

		return domManip( this, arguments, function( elem ) {

			var parent = this.parentNode;



			if ( jQuery.inArray( this, ignored ) < 0 ) {

				jQuery.cleanData( getAll( this ) );

				if ( parent ) {

					parent.replaceChild( elem, this );

				}

			}



		// Force callback invocation

		}, ignored );

	}

} );



jQuery.each( {

	appendTo: "append",

	prependTo: "prepend",

	insertBefore: "before",

	insertAfter: "after",

	replaceAll: "replaceWith"

}, function( name, original ) {

	jQuery.fn[ name ] = function( selector ) {

		var elems,

			ret = [],

			insert = jQuery( selector ),

			last = insert.length - 1,

			i = 0;



		for ( ; i <= last; i++ ) {

			elems = i === last ? this : this.clone( true );

			jQuery( insert[ i ] )[ original ]( elems );



			// Support: Android <=4.0 only, PhantomJS 1 only

			// .get() because push.apply(_, arraylike) throws on ancient WebKit

			push.apply( ret, elems.get() );

		}



		return this.pushStack( ret );

	};

} );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles = function( elem ) {



		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)

		// IE throws on elements created in popups

		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"

		var view = elem.ownerDocument.defaultView;



		if ( !view || !view.opener ) {

			view = window;

		}



		return view.getComputedStyle( elem );

	};



var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );







( function() {



	// Executing both pixelPosition & boxSizingReliable tests require only one layout

	// so they're executed at the same time to save the second computation.

	function computeStyleTests() {



		// This is a singleton, we need to execute it only once

		if ( !div ) {

			return;

		}



		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +

			"margin-top:1px;padding:0;border:0";

		div.style.cssText =

			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +

			"margin:auto;border:1px;padding:1px;" +

			"width:60%;top:1%";

		documentElement.appendChild( container ).appendChild( div );



		var divStyle = window.getComputedStyle( div );

		pixelPositionVal = divStyle.top !== "1%";



		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44

		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;



		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3

		// Some styles come back with percentage values, even though they shouldn't

		div.style.right = "60%";

		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;



		// Support: IE 9 - 11 only

		// Detect misreporting of content dimensions for box-sizing:border-box elements

		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;



		// Support: IE 9 only

		// Detect overflow:scroll screwiness (gh-3699)

		// Support: Chrome <=64

		// Don't get tricked when zoom affects offsetWidth (gh-4029)

		div.style.position = "absolute";

		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;



		documentElement.removeChild( container );



		// Nullify the div so it wouldn't be stored in the memory and

		// it will also be a sign that checks already performed

		div = null;

	}



	function roundPixelMeasures( measure ) {

		return Math.round( parseFloat( measure ) );

	}



	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,

		reliableMarginLeftVal,

		container = document.createElement( "div" ),

		div = document.createElement( "div" );



	// Finish early in limited (non-browser) environments

	if ( !div.style ) {

		return;

	}



	// Support: IE <=9 - 11 only

	// Style of cloned element affects source element cloned (#8908)

	div.style.backgroundClip = "content-box";

	div.cloneNode( true ).style.backgroundClip = "";

	support.clearCloneStyle = div.style.backgroundClip === "content-box";



	jQuery.extend( support, {

		boxSizingReliable: function() {

			computeStyleTests();

			return boxSizingReliableVal;

		},

		pixelBoxStyles: function() {

			computeStyleTests();

			return pixelBoxStylesVal;

		},

		pixelPosition: function() {

			computeStyleTests();

			return pixelPositionVal;

		},

		reliableMarginLeft: function() {

			computeStyleTests();

			return reliableMarginLeftVal;

		},

		scrollboxSize: function() {

			computeStyleTests();

			return scrollboxSizeVal;

		}

	} );

} )();





function curCSS( elem, name, computed ) {

	var width, minWidth, maxWidth, ret,



		// Support: Firefox 51+

		// Retrieving style before computed somehow

		// fixes an issue with getting wrong values

		// on detached elements

		style = elem.style;



	computed = computed || getStyles( elem );



	// getPropertyValue is needed for:

	//   .css('filter') (IE 9 only, #12537)

	//   .css('--customProperty) (#3144)

	if ( computed ) {

		ret = computed.getPropertyValue( name ) || computed[ name ];



		if ( ret === "" && !isAttached( elem ) ) {

			ret = jQuery.style( elem, name );

		}



		// A tribute to the "awesome hack by Dean Edwards"

		// Android Browser returns percentage for some values,

		// but width seems to be reliably pixels.

		// This is against the CSSOM draft spec:

		// https://drafts.csswg.org/cssom/#resolved-values

		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {



			// Remember the original values

			width = style.width;

			minWidth = style.minWidth;

			maxWidth = style.maxWidth;



			// Put in the new values to get a computed value out

			style.minWidth = style.maxWidth = style.width = ret;

			ret = computed.width;



			// Revert the changed values

			style.width = width;

			style.minWidth = minWidth;

			style.maxWidth = maxWidth;

		}

	}



	return ret !== undefined ?



		// Support: IE <=9 - 11 only

		// IE returns zIndex value as an integer.

		ret + "" :

		ret;

}





function addGetHookIf( conditionFn, hookFn ) {



	// Define the hook, we'll check on the first run if it's really needed.

	return {

		get: function() {

			if ( conditionFn() ) {



				// Hook not needed (or it's not possible to use it due

				// to missing dependency), remove it.

				delete this.get;

				return;

			}



			// Hook needed; redefine it so that the support test is not executed again.

			return ( this.get = hookFn ).apply( this, arguments );

		}

	};

}





var cssPrefixes = [ "Webkit", "Moz", "ms" ],

	emptyStyle = document.createElement( "div" ).style,

	vendorProps = {};



// Return a vendor-prefixed property or undefined

function vendorPropName( name ) {



	// Check for vendor prefixed names

	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),

		i = cssPrefixes.length;



	while ( i-- ) {

		name = cssPrefixes[ i ] + capName;

		if ( name in emptyStyle ) {

			return name;

		}

	}

}



// Return a potentially-mapped jQuery.cssProps or vendor prefixed property

function finalPropName( name ) {

	var final = jQuery.cssProps[ name ] || vendorProps[ name ];



	if ( final ) {

		return final;

	}

	if ( name in emptyStyle ) {

		return name;

	}

	return vendorProps[ name ] = vendorPropName( name ) || name;

}





var



	// Swappable if display is none or starts with table

	// except "table", "table-cell", or "table-caption"

	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display

	rdisplayswap = /^(none|table(?!-c[ea]).+)/,

	rcustomProp = /^--/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },

	cssNormalTransform = {

		letterSpacing: "0",

		fontWeight: "400"

	};



function setPositiveNumber( elem, value, subtract ) {



	// Any relative (+/-) values have already been

	// normalized at this point

	var matches = rcssNum.exec( value );

	return matches ?



		// Guard against undefined "subtract", e.g., when used as in cssHooks

		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :

		value;

}



function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {

	var i = dimension === "width" ? 1 : 0,

		extra = 0,

		delta = 0;



	// Adjustment may not be necessary

	if ( box === ( isBorderBox ? "border" : "content" ) ) {

		return 0;

	}



	for ( ; i < 4; i += 2 ) {



		// Both box models exclude margin

		if ( box === "margin" ) {

			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );

		}



		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"

		if ( !isBorderBox ) {



			// Add padding

			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );



			// For "border" or "margin", add border

			if ( box !== "padding" ) {

				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );



			// But still keep track of it otherwise

			} else {

				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			}



		// If we get here with a border-box (content + padding + border), we're seeking "content" or

		// "padding" or "margin"

		} else {



			// For "content", subtract padding

			if ( box === "content" ) {

				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			}



			// For "content" or "padding", subtract border

			if ( box !== "margin" ) {

				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			}

		}

	}



	// Account for positive content-box scroll gutter when requested by providing computedVal

	if ( !isBorderBox && computedVal >= 0 ) {



		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border

		// Assuming integer scroll gutter, subtract the rest and round down

		delta += Math.max( 0, Math.ceil(

			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -

			computedVal -

			delta -

			extra -

			0.5



		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter

		// Use an explicit zero to avoid NaN (gh-3964)

		) ) || 0;

	}



	return delta;

}



function getWidthOrHeight( elem, dimension, extra ) {



	// Start with computed style

	var styles = getStyles( elem ),



		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).

		// Fake content-box until we know it's needed to know the true value.

		boxSizingNeeded = !support.boxSizingReliable() || extra,

		isBorderBox = boxSizingNeeded &&

			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",

		valueIsBorderBox = isBorderBox,



		val = curCSS( elem, dimension, styles ),

		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );



	// Support: Firefox <=54

	// Return a confounding non-pixel value or feign ignorance, as appropriate.

	if ( rnumnonpx.test( val ) ) {

		if ( !extra ) {

			return val;

		}

		val = "auto";

	}





	// Fall back to offsetWidth/offsetHeight when value is "auto"

	// This happens for inline elements with no explicit setting (gh-3571)

	// Support: Android <=4.1 - 4.3 only

	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)

	// Support: IE 9-11 only

	// Also use offsetWidth/offsetHeight for when box sizing is unreliable

	// We use getClientRects() to check for hidden/disconnected.

	// In those cases, the computed value can be trusted to be border-box

	if ( ( !support.boxSizingReliable() && isBorderBox ||

		val === "auto" ||

		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		elem.getClientRects().length ) {



		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";



		// Where available, offsetWidth/offsetHeight approximate border box dimensions.

		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the

		// retrieved value as a content box dimension.

		valueIsBorderBox = offsetProp in elem;

		if ( valueIsBorderBox ) {

			val = elem[ offsetProp ];

		}

	}



	// Normalize "" and auto

	val = parseFloat( val ) || 0;



	// Adjust for the element's box model

	return ( val +

		boxModelAdjustment(

			elem,

			dimension,

			extra || ( isBorderBox ? "border" : "content" ),

			valueIsBorderBox,

			styles,



			// Provide the current computed size to request scroll gutter calculation (gh-3589)

			val

		)

	) + "px";

}



jQuery.extend( {



	// Add in style property hooks for overriding the default

	// behavior of getting and setting a style property

	cssHooks: {

		opacity: {

			get: function( elem, computed ) {

				if ( computed ) {



					// We should always get a number back from opacity

					var ret = curCSS( elem, "opacity" );

					return ret === "" ? "1" : ret;

				}

			}

		}

	},



	// Don't automatically add "px" to these possibly-unitless properties

	cssNumber: {

		"animationIterationCount": true,

		"columnCount": true,

		"fillOpacity": true,

		"flexGrow": true,

		"flexShrink": true,

		"fontWeight": true,

		"gridArea": true,

		"gridColumn": true,

		"gridColumnEnd": true,

		"gridColumnStart": true,

		"gridRow": true,

		"gridRowEnd": true,

		"gridRowStart": true,

		"lineHeight": true,

		"opacity": true,

		"order": true,

		"orphans": true,

		"widows": true,

		"zIndex": true,

		"zoom": true

	},



	// Add in properties whose names you wish to fix before

	// setting or getting the value

	cssProps: {},



	// Get and set the style property on a DOM Node

	style: function( elem, name, value, extra ) {



		// Don't set styles on text and comment nodes

		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {

			return;

		}



		// Make sure that we're working with the right name

		var ret, type, hooks,

			origName = camelCase( name ),

			isCustomProp = rcustomProp.test( name ),

			style = elem.style;



		// Make sure that we're working with the right name. We don't

		// want to query the value if it is a CSS custom property

		// since they are user-defined.

		if ( !isCustomProp ) {

			name = finalPropName( origName );

		}



		// Gets hook for the prefixed version, then unprefixed version

		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];



		// Check if we're setting a value

		if ( value !== undefined ) {

			type = typeof value;



			// Convert "+=" or "-=" to relative numbers (#7345)

			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {

				value = adjustCSS( elem, name, ret );



				// Fixes bug #9237

				type = "number";

			}



			// Make sure that null and NaN values aren't set (#7116)

			if ( value == null || value !== value ) {

				return;

			}



			// If a number was passed in, add the unit (except for certain CSS properties)

			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append

			// "px" to a few hardcoded values.

			if ( type === "number" && !isCustomProp ) {

				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );

			}



			// background-* props affect original clone's values

			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {

				style[ name ] = "inherit";

			}



			// If a hook was provided, use that value, otherwise just set the specified value

			if ( !hooks || !( "set" in hooks ) ||

				( value = hooks.set( elem, value, extra ) ) !== undefined ) {



				if ( isCustomProp ) {

					style.setProperty( name, value );

				} else {

					style[ name ] = value;

				}

			}



		} else {



			// If a hook was provided get the non-computed value from there

			if ( hooks && "get" in hooks &&

				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {



				return ret;

			}



			// Otherwise just get the value from the style object

			return style[ name ];

		}

	},



	css: function( elem, name, extra, styles ) {

		var val, num, hooks,

			origName = camelCase( name ),

			isCustomProp = rcustomProp.test( name );



		// Make sure that we're working with the right name. We don't

		// want to modify the value if it is a CSS custom property

		// since they are user-defined.

		if ( !isCustomProp ) {

			name = finalPropName( origName );

		}



		// Try prefixed name followed by the unprefixed name

		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];



		// If a hook was provided get the computed value from there

		if ( hooks && "get" in hooks ) {

			val = hooks.get( elem, true, extra );

		}



		// Otherwise, if a way to get the computed value exists, use that

		if ( val === undefined ) {

			val = curCSS( elem, name, styles );

		}



		// Convert "normal" to computed value

		if ( val === "normal" && name in cssNormalTransform ) {

			val = cssNormalTransform[ name ];

		}



		// Make numeric if forced or a qualifier was provided and val looks numeric

		if ( extra === "" || extra ) {

			num = parseFloat( val );

			return extra === true || isFinite( num ) ? num || 0 : val;

		}



		return val;

	}

} );



jQuery.each( [ "height", "width" ], function( i, dimension ) {

	jQuery.cssHooks[ dimension ] = {

		get: function( elem, computed, extra ) {

			if ( computed ) {



				// Certain elements can have dimension info if we invisibly show them

				// but it must have a current display style that would benefit

				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&



					// Support: Safari 8+

					// Table columns in Safari have non-zero offsetWidth & zero

					// getBoundingClientRect().width unless display is changed.

					// Support: IE <=11 only

					// Running getBoundingClientRect on a disconnected node

					// in IE throws an error.

					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?

						swap( elem, cssShow, function() {

							return getWidthOrHeight( elem, dimension, extra );

						} ) :

						getWidthOrHeight( elem, dimension, extra );

			}

		},



		set: function( elem, value, extra ) {

			var matches,

				styles = getStyles( elem ),



				// Only read styles.position if the test has a chance to fail

				// to avoid forcing a reflow.

				scrollboxSizeBuggy = !support.scrollboxSize() &&

					styles.position === "absolute",



				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)

				boxSizingNeeded = scrollboxSizeBuggy || extra,

				isBorderBox = boxSizingNeeded &&

					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",

				subtract = extra ?

					boxModelAdjustment(

						elem,

						dimension,

						extra,

						isBorderBox,

						styles

					) :

					0;



			// Account for unreliable border-box dimensions by comparing offset* to computed and

			// faking a content-box to get border and padding (gh-3699)

			if ( isBorderBox && scrollboxSizeBuggy ) {

				subtract -= Math.ceil(

					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -

					parseFloat( styles[ dimension ] ) -

					boxModelAdjustment( elem, dimension, "border", false, styles ) -

					0.5

				);

			}



			// Convert to pixels if value adjustment is needed

			if ( subtract && ( matches = rcssNum.exec( value ) ) &&

				( matches[ 3 ] || "px" ) !== "px" ) {



				elem.style[ dimension ] = value;

				value = jQuery.css( elem, dimension );

			}



			return setPositiveNumber( elem, value, subtract );

		}

	};

} );



jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,

	function( elem, computed ) {

		if ( computed ) {

			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||

				elem.getBoundingClientRect().left -

					swap( elem, { marginLeft: 0 }, function() {

						return elem.getBoundingClientRect().left;

					} )

				) + "px";

		}

	}

);



// These hooks are used by animate to expand properties

jQuery.each( {

	margin: "",

	padding: "",

	border: "Width"

}, function( prefix, suffix ) {

	jQuery.cssHooks[ prefix + suffix ] = {

		expand: function( value ) {

			var i = 0,

				expanded = {},



				// Assumes a single number if not a string

				parts = typeof value === "string" ? value.split( " " ) : [ value ];



			for ( ; i < 4; i++ ) {

				expanded[ prefix + cssExpand[ i ] + suffix ] =

					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];

			}



			return expanded;

		}

	};



	if ( prefix !== "margin" ) {

		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;

	}

} );



jQuery.fn.extend( {

	css: function( name, value ) {

		return access( this, function( elem, name, value ) {

			var styles, len,

				map = {},

				i = 0;



			if ( Array.isArray( name ) ) {

				styles = getStyles( elem );

				len = name.length;



				for ( ; i < len; i++ ) {

					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );

				}



				return map;

			}



			return value !== undefined ?

				jQuery.style( elem, name, value ) :

				jQuery.css( elem, name );

		}, name, value, arguments.length > 1 );

	}

} );





function Tween( elem, options, prop, end, easing ) {

	return new Tween.prototype.init( elem, options, prop, end, easing );

}

jQuery.Tween = Tween;



Tween.prototype = {

	constructor: Tween,

	init: function( elem, options, prop, end, easing, unit ) {

		this.elem = elem;

		this.prop = prop;

		this.easing = easing || jQuery.easing._default;

		this.options = options;

		this.start = this.now = this.cur();

		this.end = end;

		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );

	},

	cur: function() {

		var hooks = Tween.propHooks[ this.prop ];



		return hooks && hooks.get ?

			hooks.get( this ) :

			Tween.propHooks._default.get( this );

	},

	run: function( percent ) {

		var eased,

			hooks = Tween.propHooks[ this.prop ];



		if ( this.options.duration ) {

			this.pos = eased = jQuery.easing[ this.easing ](

				percent, this.options.duration * percent, 0, 1, this.options.duration

			);

		} else {

			this.pos = eased = percent;

		}

		this.now = ( this.end - this.start ) * eased + this.start;



		if ( this.options.step ) {

			this.options.step.call( this.elem, this.now, this );

		}



		if ( hooks && hooks.set ) {

			hooks.set( this );

		} else {

			Tween.propHooks._default.set( this );

		}

		return this;

	}

};



Tween.prototype.init.prototype = Tween.prototype;



Tween.propHooks = {

	_default: {

		get: function( tween ) {

			var result;



			// Use a property on the element directly when it is not a DOM element,

			// or when there is no matching style property that exists.

			if ( tween.elem.nodeType !== 1 ||

				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {

				return tween.elem[ tween.prop ];

			}



			// Passing an empty string as a 3rd parameter to .css will automatically

			// attempt a parseFloat and fallback to a string if the parse fails.

			// Simple values such as "10px" are parsed to Float;

			// complex values such as "rotate(1rad)" are returned as-is.

			result = jQuery.css( tween.elem, tween.prop, "" );



			// Empty strings, null, undefined and "auto" are converted to 0.

			return !result || result === "auto" ? 0 : result;

		},

		set: function( tween ) {



			// Use step hook for back compat.

			// Use cssHook if its there.

			// Use .style if available and use plain properties where available.

			if ( jQuery.fx.step[ tween.prop ] ) {

				jQuery.fx.step[ tween.prop ]( tween );

			} else if ( tween.elem.nodeType === 1 && (

					jQuery.cssHooks[ tween.prop ] ||

					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {

				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );

			} else {

				tween.elem[ tween.prop ] = tween.now;

			}

		}

	}

};



// Support: IE <=9 only

// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {

	set: function( tween ) {

		if ( tween.elem.nodeType && tween.elem.parentNode ) {

			tween.elem[ tween.prop ] = tween.now;

		}

	}

};



jQuery.easing = {

	linear: function( p ) {

		return p;

	},

	swing: function( p ) {

		return 0.5 - Math.cos( p * Math.PI ) / 2;

	},

	_default: "swing"

};



jQuery.fx = Tween.prototype.init;



// Back compat <1.8 extension point

jQuery.fx.step = {};









var

	fxNow, inProgress,

	rfxtypes = /^(?:toggle|show|hide)$/,

	rrun = /queueHooks$/;



function schedule() {

	if ( inProgress ) {

		if ( document.hidden === false && window.requestAnimationFrame ) {

			window.requestAnimationFrame( schedule );

		} else {

			window.setTimeout( schedule, jQuery.fx.interval );

		}



		jQuery.fx.tick();

	}

}



// Animations created synchronously will run synchronously

function createFxNow() {

	window.setTimeout( function() {

		fxNow = undefined;

	} );

	return ( fxNow = Date.now() );

}



// Generate parameters to create a standard animation

function genFx( type, includeWidth ) {

	var which,

		i = 0,

		attrs = { height: type };



	// If we include width, step value is 1 to do all cssExpand values,

	// otherwise step value is 2 to skip over Left and Right

	includeWidth = includeWidth ? 1 : 0;

	for ( ; i < 4; i += 2 - includeWidth ) {

		which = cssExpand[ i ];

		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;

	}



	if ( includeWidth ) {

		attrs.opacity = attrs.width = type;

	}



	return attrs;

}



function createTween( value, prop, animation ) {

	var tween,

		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),

		index = 0,

		length = collection.length;

	for ( ; index < length; index++ ) {

		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {



			// We're done with this property

			return tween;

		}

	}

}



function defaultPrefilter( elem, props, opts ) {

	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,

		isBox = "width" in props || "height" in props,

		anim = this,

		orig = {},

		style = elem.style,

		hidden = elem.nodeType && isHiddenWithinTree( elem ),

		dataShow = dataPriv.get( elem, "fxshow" );



	// Queue-skipping animations hijack the fx hooks

	if ( !opts.queue ) {

		hooks = jQuery._queueHooks( elem, "fx" );

		if ( hooks.unqueued == null ) {

			hooks.unqueued = 0;

			oldfire = hooks.empty.fire;

			hooks.empty.fire = function() {

				if ( !hooks.unqueued ) {

					oldfire();

				}

			};

		}

		hooks.unqueued++;



		anim.always( function() {



			// Ensure the complete handler is called before this completes

			anim.always( function() {

				hooks.unqueued--;

				if ( !jQuery.queue( elem, "fx" ).length ) {

					hooks.empty.fire();

				}

			} );

		} );

	}



	// Detect show/hide animations

	for ( prop in props ) {

		value = props[ prop ];

		if ( rfxtypes.test( value ) ) {

			delete props[ prop ];

			toggle = toggle || value === "toggle";

			if ( value === ( hidden ? "hide" : "show" ) ) {



				// Pretend to be hidden if this is a "show" and

				// there is still data from a stopped show/hide

				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {

					hidden = true;



				// Ignore all other no-op show/hide data

				} else {

					continue;

				}

			}

			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		}

	}



	// Bail out if this is a no-op like .hide().hide()

	propTween = !jQuery.isEmptyObject( props );

	if ( !propTween && jQuery.isEmptyObject( orig ) ) {

		return;

	}



	// Restrict "overflow" and "display" styles during box animations

	if ( isBox && elem.nodeType === 1 ) {



		// Support: IE <=9 - 11, Edge 12 - 15

		// Record all 3 overflow attributes because IE does not infer the shorthand

		// from identically-valued overflowX and overflowY and Edge just mirrors

		// the overflowX value there.

		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];



		// Identify a display type, preferring old show/hide data over the CSS cascade

		restoreDisplay = dataShow && dataShow.display;

		if ( restoreDisplay == null ) {

			restoreDisplay = dataPriv.get( elem, "display" );

		}

		display = jQuery.css( elem, "display" );

		if ( display === "none" ) {

			if ( restoreDisplay ) {

				display = restoreDisplay;

			} else {



				// Get nonempty value(s) by temporarily forcing visibility

				showHide( [ elem ], true );

				restoreDisplay = elem.style.display || restoreDisplay;

				display = jQuery.css( elem, "display" );

				showHide( [ elem ] );

			}

		}



		// Animate inline elements as inline-block

		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {

			if ( jQuery.css( elem, "float" ) === "none" ) {



				// Restore the original display value at the end of pure show/hide animations

				if ( !propTween ) {

					anim.done( function() {

						style.display = restoreDisplay;

					} );

					if ( restoreDisplay == null ) {

						display = style.display;

						restoreDisplay = display === "none" ? "" : display;

					}

				}

				style.display = "inline-block";

			}

		}

	}



	if ( opts.overflow ) {

		style.overflow = "hidden";

		anim.always( function() {

			style.overflow = opts.overflow[ 0 ];

			style.overflowX = opts.overflow[ 1 ];

			style.overflowY = opts.overflow[ 2 ];

		} );

	}



	// Implement show/hide animations

	propTween = false;

	for ( prop in orig ) {



		// General show/hide setup for this element animation

		if ( !propTween ) {

			if ( dataShow ) {

				if ( "hidden" in dataShow ) {

					hidden = dataShow.hidden;

				}

			} else {

				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );

			}



			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"

			if ( toggle ) {

				dataShow.hidden = !hidden;

			}



			// Show elements before animating them

			if ( hidden ) {

				showHide( [ elem ], true );

			}



			/* eslint-disable no-loop-func */



			anim.done( function() {



			/* eslint-enable no-loop-func */



				// The final step of a "hide" animation is actually hiding the element

				if ( !hidden ) {

					showHide( [ elem ] );

				}

				dataPriv.remove( elem, "fxshow" );

				for ( prop in orig ) {

					jQuery.style( elem, prop, orig[ prop ] );

				}

			} );

		}



		// Per-property setup

		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

		if ( !( prop in dataShow ) ) {

			dataShow[ prop ] = propTween.start;

			if ( hidden ) {

				propTween.end = propTween.start;

				propTween.start = 0;

			}

		}

	}

}



function propFilter( props, specialEasing ) {

	var index, name, easing, value, hooks;



	// camelCase, specialEasing and expand cssHook pass

	for ( index in props ) {

		name = camelCase( index );

		easing = specialEasing[ name ];

		value = props[ index ];

		if ( Array.isArray( value ) ) {

			easing = value[ 1 ];

			value = props[ index ] = value[ 0 ];

		}



		if ( index !== name ) {

			props[ name ] = value;

			delete props[ index ];

		}



		hooks = jQuery.cssHooks[ name ];

		if ( hooks && "expand" in hooks ) {

			value = hooks.expand( value );

			delete props[ name ];



			// Not quite $.extend, this won't overwrite existing keys.

			// Reusing 'index' because we have the correct "name"

			for ( index in value ) {

				if ( !( index in props ) ) {

					props[ index ] = value[ index ];

					specialEasing[ index ] = easing;

				}

			}

		} else {

			specialEasing[ name ] = easing;

		}

	}

}



function Animation( elem, properties, options ) {

	var result,

		stopped,

		index = 0,

		length = Animation.prefilters.length,

		deferred = jQuery.Deferred().always( function() {



			// Don't match elem in the :animated selector

			delete tick.elem;

		} ),

		tick = function() {

			if ( stopped ) {

				return false;

			}

			var currentTime = fxNow || createFxNow(),

				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),



				// Support: Android 2.3 only

				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)

				temp = remaining / animation.duration || 0,

				percent = 1 - temp,

				index = 0,

				length = animation.tweens.length;



			for ( ; index < length; index++ ) {

				animation.tweens[ index ].run( percent );

			}



			deferred.notifyWith( elem, [ animation, percent, remaining ] );



			// If there's more to do, yield

			if ( percent < 1 && length ) {

				return remaining;

			}



			// If this was an empty animation, synthesize a final progress notification

			if ( !length ) {

				deferred.notifyWith( elem, [ animation, 1, 0 ] );

			}



			// Resolve the animation and report its conclusion

			deferred.resolveWith( elem, [ animation ] );

			return false;

		},

		animation = deferred.promise( {

			elem: elem,

			props: jQuery.extend( {}, properties ),

			opts: jQuery.extend( true, {

				specialEasing: {},

				easing: jQuery.easing._default

			}, options ),

			originalProperties: properties,

			originalOptions: options,

			startTime: fxNow || createFxNow(),

			duration: options.duration,

			tweens: [],

			createTween: function( prop, end ) {

				var tween = jQuery.Tween( elem, animation.opts, prop, end,

						animation.opts.specialEasing[ prop ] || animation.opts.easing );

				animation.tweens.push( tween );

				return tween;

			},

			stop: function( gotoEnd ) {

				var index = 0,



					// If we are going to the end, we want to run all the tweens

					// otherwise we skip this part

					length = gotoEnd ? animation.tweens.length : 0;

				if ( stopped ) {

					return this;

				}

				stopped = true;

				for ( ; index < length; index++ ) {

					animation.tweens[ index ].run( 1 );

				}



				// Resolve when we played the last frame; otherwise, reject

				if ( gotoEnd ) {

					deferred.notifyWith( elem, [ animation, 1, 0 ] );

					deferred.resolveWith( elem, [ animation, gotoEnd ] );

				} else {

					deferred.rejectWith( elem, [ animation, gotoEnd ] );

				}

				return this;

			}

		} ),

		props = animation.props;



	propFilter( props, animation.opts.specialEasing );



	for ( ; index < length; index++ ) {

		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );

		if ( result ) {

			if ( isFunction( result.stop ) ) {

				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =

					result.stop.bind( result );

			}

			return result;

		}

	}



	jQuery.map( props, createTween, animation );



	if ( isFunction( animation.opts.start ) ) {

		animation.opts.start.call( elem, animation );

	}



	// Attach callbacks from options

	animation

		.progress( animation.opts.progress )

		.done( animation.opts.done, animation.opts.complete )

		.fail( animation.opts.fail )

		.always( animation.opts.always );



	jQuery.fx.timer(

		jQuery.extend( tick, {

			elem: elem,

			anim: animation,

			queue: animation.opts.queue

		} )

	);



	return animation;

}



jQuery.Animation = jQuery.extend( Animation, {



	tweeners: {

		"*": [ function( prop, value ) {

			var tween = this.createTween( prop, value );

			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );

			return tween;

		} ]

	},



	tweener: function( props, callback ) {

		if ( isFunction( props ) ) {

			callback = props;

			props = [ "*" ];

		} else {

			props = props.match( rnothtmlwhite );

		}



		var prop,

			index = 0,

			length = props.length;



		for ( ; index < length; index++ ) {

			prop = props[ index ];

			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];

			Animation.tweeners[ prop ].unshift( callback );

		}

	},



	prefilters: [ defaultPrefilter ],



	prefilter: function( callback, prepend ) {

		if ( prepend ) {

			Animation.prefilters.unshift( callback );

		} else {

			Animation.prefilters.push( callback );

		}

	}

} );



jQuery.speed = function( speed, easing, fn ) {

	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {

		complete: fn || !fn && easing ||

			isFunction( speed ) && speed,

		duration: speed,

		easing: fn && easing || easing && !isFunction( easing ) && easing

	};



	// Go to the end state if fx are off

	if ( jQuery.fx.off ) {

		opt.duration = 0;



	} else {

		if ( typeof opt.duration !== "number" ) {

			if ( opt.duration in jQuery.fx.speeds ) {

				opt.duration = jQuery.fx.speeds[ opt.duration ];



			} else {

				opt.duration = jQuery.fx.speeds._default;

			}

		}

	}



	// Normalize opt.queue - true/undefined/null -> "fx"

	if ( opt.queue == null || opt.queue === true ) {

		opt.queue = "fx";

	}



	// Queueing

	opt.old = opt.complete;



	opt.complete = function() {

		if ( isFunction( opt.old ) ) {

			opt.old.call( this );

		}



		if ( opt.queue ) {

			jQuery.dequeue( this, opt.queue );

		}

	};



	return opt;

};



jQuery.fn.extend( {

	fadeTo: function( speed, to, easing, callback ) {



		// Show any hidden elements after setting opacity to 0

		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()



			// Animate to the value specified

			.end().animate( { opacity: to }, speed, easing, callback );

	},

	animate: function( prop, speed, easing, callback ) {

		var empty = jQuery.isEmptyObject( prop ),

			optall = jQuery.speed( speed, easing, callback ),

			doAnimation = function() {



				// Operate on a copy of prop so per-property easing won't be lost

				var anim = Animation( this, jQuery.extend( {}, prop ), optall );



				// Empty animations, or finishing resolves immediately

				if ( empty || dataPriv.get( this, "finish" ) ) {

					anim.stop( true );

				}

			};

			doAnimation.finish = doAnimation;



		return empty || optall.queue === false ?

			this.each( doAnimation ) :

			this.queue( optall.queue, doAnimation );

	},

	stop: function( type, clearQueue, gotoEnd ) {

		var stopQueue = function( hooks ) {

			var stop = hooks.stop;

			delete hooks.stop;

			stop( gotoEnd );

		};



		if ( typeof type !== "string" ) {

			gotoEnd = clearQueue;

			clearQueue = type;

			type = undefined;

		}

		if ( clearQueue && type !== false ) {

			this.queue( type || "fx", [] );

		}



		return this.each( function() {

			var dequeue = true,

				index = type != null && type + "queueHooks",

				timers = jQuery.timers,

				data = dataPriv.get( this );



			if ( index ) {

				if ( data[ index ] && data[ index ].stop ) {

					stopQueue( data[ index ] );

				}

			} else {

				for ( index in data ) {

					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {

						stopQueue( data[ index ] );

					}

				}

			}



			for ( index = timers.length; index--; ) {

				if ( timers[ index ].elem === this &&

					( type == null || timers[ index ].queue === type ) ) {



					timers[ index ].anim.stop( gotoEnd );

					dequeue = false;

					timers.splice( index, 1 );

				}

			}



			// Start the next in the queue if the last step wasn't forced.

			// Timers currently will call their complete callbacks, which

			// will dequeue but only if they were gotoEnd.

			if ( dequeue || !gotoEnd ) {

				jQuery.dequeue( this, type );

			}

		} );

	},

	finish: function( type ) {

		if ( type !== false ) {

			type = type || "fx";

		}

		return this.each( function() {

			var index,

				data = dataPriv.get( this ),

				queue = data[ type + "queue" ],

				hooks = data[ type + "queueHooks" ],

				timers = jQuery.timers,

				length = queue ? queue.length : 0;



			// Enable finishing flag on private data

			data.finish = true;



			// Empty the queue first

			jQuery.queue( this, type, [] );



			if ( hooks && hooks.stop ) {

				hooks.stop.call( this, true );

			}



			// Look for any active animations, and finish them

			for ( index = timers.length; index--; ) {

				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {

					timers[ index ].anim.stop( true );

					timers.splice( index, 1 );

				}

			}



			// Look for any animations in the old queue and finish them

			for ( index = 0; index < length; index++ ) {

				if ( queue[ index ] && queue[ index ].finish ) {

					queue[ index ].finish.call( this );

				}

			}



			// Turn off finishing flag

			delete data.finish;

		} );

	}

} );



jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {

	var cssFn = jQuery.fn[ name ];

	jQuery.fn[ name ] = function( speed, easing, callback ) {

		return speed == null || typeof speed === "boolean" ?

			cssFn.apply( this, arguments ) :

			this.animate( genFx( name, true ), speed, easing, callback );

	};

} );



// Generate shortcuts for custom animations

jQuery.each( {

	slideDown: genFx( "show" ),

	slideUp: genFx( "hide" ),

	slideToggle: genFx( "toggle" ),

	fadeIn: { opacity: "show" },

	fadeOut: { opacity: "hide" },

	fadeToggle: { opacity: "toggle" }

}, function( name, props ) {

	jQuery.fn[ name ] = function( speed, easing, callback ) {

		return this.animate( props, speed, easing, callback );

	};

} );



jQuery.timers = [];

jQuery.fx.tick = function() {

	var timer,

		i = 0,

		timers = jQuery.timers;



	fxNow = Date.now();



	for ( ; i < timers.length; i++ ) {

		timer = timers[ i ];



		// Run the timer and safely remove it when done (allowing for external removal)

		if ( !timer() && timers[ i ] === timer ) {

			timers.splice( i--, 1 );

		}

	}



	if ( !timers.length ) {

		jQuery.fx.stop();

	}

	fxNow = undefined;

};



jQuery.fx.timer = function( timer ) {

	jQuery.timers.push( timer );

	jQuery.fx.start();

};



jQuery.fx.interval = 13;

jQuery.fx.start = function() {

	if ( inProgress ) {

		return;

	}



	inProgress = true;

	schedule();

};



jQuery.fx.stop = function() {

	inProgress = null;

};



jQuery.fx.speeds = {

	slow: 600,

	fast: 200,



	// Default speed

	_default: 400

};





// Based off of the plugin by Clint Helfers, with permission.

// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/

jQuery.fn.delay = function( time, type ) {

	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;

	type = type || "fx";



	return this.queue( type, function( next, hooks ) {

		var timeout = window.setTimeout( next, time );

		hooks.stop = function() {

			window.clearTimeout( timeout );

		};

	} );

};





( function() {

	var input = document.createElement( "input" ),

		select = document.createElement( "select" ),

		opt = select.appendChild( document.createElement( "option" ) );



	input.type = "checkbox";



	// Support: Android <=4.3 only

	// Default value for a checkbox should be "on"

	support.checkOn = input.value !== "";



	// Support: IE <=11 only

	// Must access selectedIndex to make default options select

	support.optSelected = opt.selected;



	// Support: IE <=11 only

	// An input loses its value after becoming a radio

	input = document.createElement( "input" );

	input.value = "t";

	input.type = "radio";

	support.radioValue = input.value === "t";

} )();





var boolHook,

	attrHandle = jQuery.expr.attrHandle;



jQuery.fn.extend( {

	attr: function( name, value ) {

		return access( this, jQuery.attr, name, value, arguments.length > 1 );

	},



	removeAttr: function( name ) {

		return this.each( function() {

			jQuery.removeAttr( this, name );

		} );

	}

} );



jQuery.extend( {

	attr: function( elem, name, value ) {

		var ret, hooks,

			nType = elem.nodeType;



		// Don't get/set attributes on text, comment and attribute nodes

		if ( nType === 3 || nType === 8 || nType === 2 ) {

			return;

		}



		// Fallback to prop when attributes are not supported

		if ( typeof elem.getAttribute === "undefined" ) {

			return jQuery.prop( elem, name, value );

		}



		// Attribute hooks are determined by the lowercase version

		// Grab necessary hook if one is defined

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||

				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );

		}



		if ( value !== undefined ) {

			if ( value === null ) {

				jQuery.removeAttr( elem, name );

				return;

			}



			if ( hooks && "set" in hooks &&

				( ret = hooks.set( elem, value, name ) ) !== undefined ) {

				return ret;

			}



			elem.setAttribute( name, value + "" );

			return value;

		}



		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {

			return ret;

		}



		ret = jQuery.find.attr( elem, name );



		// Non-existent attributes return null, we normalize to undefined

		return ret == null ? undefined : ret;

	},



	attrHooks: {

		type: {

			set: function( elem, value ) {

				if ( !support.radioValue && value === "radio" &&

					nodeName( elem, "input" ) ) {

					var val = elem.value;

					elem.setAttribute( "type", value );

					if ( val ) {

						elem.value = val;

					}

					return value;

				}

			}

		}

	},



	removeAttr: function( elem, value ) {

		var name,

			i = 0,



			// Attribute names can contain non-HTML whitespace characters

			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2

			attrNames = value && value.match( rnothtmlwhite );



		if ( attrNames && elem.nodeType === 1 ) {

			while ( ( name = attrNames[ i++ ] ) ) {

				elem.removeAttribute( name );

			}

		}

	}

} );



// Hooks for boolean attributes

boolHook = {

	set: function( elem, value, name ) {

		if ( value === false ) {



			// Remove boolean attributes when set to false

			jQuery.removeAttr( elem, name );

		} else {

			elem.setAttribute( name, name );

		}

		return name;

	}

};



jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;



	attrHandle[ name ] = function( elem, name, isXML ) {

		var ret, handle,

			lowercaseName = name.toLowerCase();



		if ( !isXML ) {



			// Avoid an infinite loop by temporarily removing this function from the getter

			handle = attrHandle[ lowercaseName ];

			attrHandle[ lowercaseName ] = ret;

			ret = getter( elem, name, isXML ) != null ?

				lowercaseName :

				null;

			attrHandle[ lowercaseName ] = handle;

		}

		return ret;

	};

} );









var rfocusable = /^(?:input|select|textarea|button)$/i,

	rclickable = /^(?:a|area)$/i;



jQuery.fn.extend( {

	prop: function( name, value ) {

		return access( this, jQuery.prop, name, value, arguments.length > 1 );

	},



	removeProp: function( name ) {

		return this.each( function() {

			delete this[ jQuery.propFix[ name ] || name ];

		} );

	}

} );



jQuery.extend( {

	prop: function( elem, name, value ) {

		var ret, hooks,

			nType = elem.nodeType;



		// Don't get/set properties on text, comment and attribute nodes

		if ( nType === 3 || nType === 8 || nType === 2 ) {

			return;

		}



		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {



			// Fix name and attach hooks

			name = jQuery.propFix[ name ] || name;

			hooks = jQuery.propHooks[ name ];

		}



		if ( value !== undefined ) {

			if ( hooks && "set" in hooks &&

				( ret = hooks.set( elem, value, name ) ) !== undefined ) {

				return ret;

			}



			return ( elem[ name ] = value );

		}



		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {

			return ret;

		}



		return elem[ name ];

	},



	propHooks: {

		tabIndex: {

			get: function( elem ) {



				// Support: IE <=9 - 11 only

				// elem.tabIndex doesn't always return the

				// correct value when it hasn't been explicitly set

				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/

				// Use proper attribute retrieval(#12072)

				var tabindex = jQuery.find.attr( elem, "tabindex" );



				if ( tabindex ) {

					return parseInt( tabindex, 10 );

				}



				if (

					rfocusable.test( elem.nodeName ) ||

					rclickable.test( elem.nodeName ) &&

					elem.href

				) {

					return 0;

				}



				return -1;

			}

		}

	},



	propFix: {

		"for": "htmlFor",

		"class": "className"

	}

} );



// Support: IE <=11 only

// Accessing the selectedIndex property

// forces the browser to respect setting selected

// on the option

// The getter ensures a default option is selected

// when in an optgroup

// eslint rule "no-unused-expressions" is disabled for this code

// since it considers such accessions noop

if ( !support.optSelected ) {

	jQuery.propHooks.selected = {

		get: function( elem ) {



			/* eslint no-unused-expressions: "off" */



			var parent = elem.parentNode;

			if ( parent && parent.parentNode ) {

				parent.parentNode.selectedIndex;

			}

			return null;

		},

		set: function( elem ) {



			/* eslint no-unused-expressions: "off" */



			var parent = elem.parentNode;

			if ( parent ) {

				parent.selectedIndex;



				if ( parent.parentNode ) {

					parent.parentNode.selectedIndex;

				}

			}

		}

	};

}



jQuery.each( [

	"tabIndex",

	"readOnly",

	"maxLength",

	"cellSpacing",

	"cellPadding",

	"rowSpan",

	"colSpan",

	"useMap",

	"frameBorder",

	"contentEditable"

], function() {

	jQuery.propFix[ this.toLowerCase() ] = this;

} );









	// Strip and collapse whitespace according to HTML spec

	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace

	function stripAndCollapse( value ) {

		var tokens = value.match( rnothtmlwhite ) || [];

		return tokens.join( " " );

	}





function getClass( elem ) {

	return elem.getAttribute && elem.getAttribute( "class" ) || "";

}



function classesToArray( value ) {

	if ( Array.isArray( value ) ) {

		return value;

	}

	if ( typeof value === "string" ) {

		return value.match( rnothtmlwhite ) || [];

	}

	return [];

}



jQuery.fn.extend( {

	addClass: function( value ) {

		var classes, elem, cur, curValue, clazz, j, finalValue,

			i = 0;



		if ( isFunction( value ) ) {

			return this.each( function( j ) {

				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );

			} );

		}



		classes = classesToArray( value );



		if ( classes.length ) {

			while ( ( elem = this[ i++ ] ) ) {

				curValue = getClass( elem );

				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );



				if ( cur ) {

					j = 0;

					while ( ( clazz = classes[ j++ ] ) ) {

						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {

							cur += clazz + " ";

						}

					}



					// Only assign if different to avoid unneeded rendering.

					finalValue = stripAndCollapse( cur );

					if ( curValue !== finalValue ) {

						elem.setAttribute( "class", finalValue );

					}

				}

			}

		}



		return this;

	},



	removeClass: function( value ) {

		var classes, elem, cur, curValue, clazz, j, finalValue,

			i = 0;



		if ( isFunction( value ) ) {

			return this.each( function( j ) {

				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );

			} );

		}



		if ( !arguments.length ) {

			return this.attr( "class", "" );

		}



		classes = classesToArray( value );



		if ( classes.length ) {

			while ( ( elem = this[ i++ ] ) ) {

				curValue = getClass( elem );



				// This expression is here for better compressibility (see addClass)

				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );



				if ( cur ) {

					j = 0;

					while ( ( clazz = classes[ j++ ] ) ) {



						// Remove *all* instances

						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {

							cur = cur.replace( " " + clazz + " ", " " );

						}

					}



					// Only assign if different to avoid unneeded rendering.

					finalValue = stripAndCollapse( cur );

					if ( curValue !== finalValue ) {

						elem.setAttribute( "class", finalValue );

					}

				}

			}

		}



		return this;

	},



	toggleClass: function( value, stateVal ) {

		var type = typeof value,

			isValidValue = type === "string" || Array.isArray( value );



		if ( typeof stateVal === "boolean" && isValidValue ) {

			return stateVal ? this.addClass( value ) : this.removeClass( value );

		}



		if ( isFunction( value ) ) {

			return this.each( function( i ) {

				jQuery( this ).toggleClass(

					value.call( this, i, getClass( this ), stateVal ),

					stateVal

				);

			} );

		}



		return this.each( function() {

			var className, i, self, classNames;



			if ( isValidValue ) {



				// Toggle individual class names

				i = 0;

				self = jQuery( this );

				classNames = classesToArray( value );



				while ( ( className = classNames[ i++ ] ) ) {



					// Check each className given, space separated list

					if ( self.hasClass( className ) ) {

						self.removeClass( className );

					} else {

						self.addClass( className );

					}

				}



			// Toggle whole class name

			} else if ( value === undefined || type === "boolean" ) {

				className = getClass( this );

				if ( className ) {



					// Store className if set

					dataPriv.set( this, "__className__", className );

				}



				// If the element has a class name or if we're passed `false`,

				// then remove the whole classname (if there was one, the above saved it).

				// Otherwise bring back whatever was previously saved (if anything),

				// falling back to the empty string if nothing was stored.

				if ( this.setAttribute ) {

					this.setAttribute( "class",

						className || value === false ?

						"" :

						dataPriv.get( this, "__className__" ) || ""

					);

				}

			}

		} );

	},



	hasClass: function( selector ) {

		var className, elem,

			i = 0;



		className = " " + selector + " ";

		while ( ( elem = this[ i++ ] ) ) {

			if ( elem.nodeType === 1 &&

				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {

					return true;

			}

		}



		return false;

	}

} );









var rreturn = /\r/g;



jQuery.fn.extend( {

	val: function( value ) {

		var hooks, ret, valueIsFunction,

			elem = this[ 0 ];



		if ( !arguments.length ) {

			if ( elem ) {

				hooks = jQuery.valHooks[ elem.type ] ||

					jQuery.valHooks[ elem.nodeName.toLowerCase() ];



				if ( hooks &&

					"get" in hooks &&

					( ret = hooks.get( elem, "value" ) ) !== undefined

				) {

					return ret;

				}



				ret = elem.value;



				// Handle most common string cases

				if ( typeof ret === "string" ) {

					return ret.replace( rreturn, "" );

				}



				// Handle cases where value is null/undef or number

				return ret == null ? "" : ret;

			}



			return;

		}



		valueIsFunction = isFunction( value );



		return this.each( function( i ) {

			var val;



			if ( this.nodeType !== 1 ) {

				return;

			}



			if ( valueIsFunction ) {

				val = value.call( this, i, jQuery( this ).val() );

			} else {

				val = value;

			}



			// Treat null/undefined as ""; convert numbers to string

			if ( val == null ) {

				val = "";



			} else if ( typeof val === "number" ) {

				val += "";



			} else if ( Array.isArray( val ) ) {

				val = jQuery.map( val, function( value ) {

					return value == null ? "" : value + "";

				} );

			}



			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];



			// If set returns undefined, fall back to normal setting

			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {

				this.value = val;

			}

		} );

	}

} );



jQuery.extend( {

	valHooks: {

		option: {

			get: function( elem ) {



				var val = jQuery.find.attr( elem, "value" );

				return val != null ?

					val :



					// Support: IE <=10 - 11 only

					// option.text throws exceptions (#14686, #14858)

					// Strip and collapse whitespace

					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace

					stripAndCollapse( jQuery.text( elem ) );

			}

		},

		select: {

			get: function( elem ) {

				var value, option, i,

					options = elem.options,

					index = elem.selectedIndex,

					one = elem.type === "select-one",

					values = one ? null : [],

					max = one ? index + 1 : options.length;



				if ( index < 0 ) {

					i = max;



				} else {

					i = one ? index : 0;

				}



				// Loop through all the selected options

				for ( ; i < max; i++ ) {

					option = options[ i ];



					// Support: IE <=9 only

					// IE8-9 doesn't update selected after form reset (#2551)

					if ( ( option.selected || i === index ) &&



							// Don't return options that are disabled or in a disabled optgroup

							!option.disabled &&

							( !option.parentNode.disabled ||

								!nodeName( option.parentNode, "optgroup" ) ) ) {



						// Get the specific value for the option

						value = jQuery( option ).val();



						// We don't need an array for one selects

						if ( one ) {

							return value;

						}



						// Multi-Selects return an array

						values.push( value );

					}

				}



				return values;

			},



			set: function( elem, value ) {

				var optionSet, option,

					options = elem.options,

					values = jQuery.makeArray( value ),

					i = options.length;



				while ( i-- ) {

					option = options[ i ];



					/* eslint-disable no-cond-assign */



					if ( option.selected =

						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1

					) {

						optionSet = true;

					}



					/* eslint-enable no-cond-assign */

				}



				// Force browsers to behave consistently when non-matching value is set

				if ( !optionSet ) {

					elem.selectedIndex = -1;

				}

				return values;

			}

		}

	}

} );



// Radios and checkboxes getter/setter

jQuery.each( [ "radio", "checkbox" ], function() {

	jQuery.valHooks[ this ] = {

		set: function( elem, value ) {

			if ( Array.isArray( value ) ) {

				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );

			}

		}

	};

	if ( !support.checkOn ) {

		jQuery.valHooks[ this ].get = function( elem ) {

			return elem.getAttribute( "value" ) === null ? "on" : elem.value;

		};

	}

} );









// Return jQuery for attributes-only inclusion





support.focusin = "onfocusin" in window;





var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,

	stopPropagationCallback = function( e ) {

		e.stopPropagation();

	};



jQuery.extend( jQuery.event, {



	trigger: function( event, data, elem, onlyHandlers ) {



		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,

			eventPath = [ elem || document ],

			type = hasOwn.call( event, "type" ) ? event.type : event,

			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];



		cur = lastElement = tmp = elem = elem || document;



		// Don't do events on text and comment nodes

		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {

			return;

		}



		// focus/blur morphs to focusin/out; ensure we're not firing them right now

		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {

			return;

		}



		if ( type.indexOf( "." ) > -1 ) {



			// Namespaced trigger; create a regexp to match event type in handle()

			namespaces = type.split( "." );

			type = namespaces.shift();

			namespaces.sort();

		}

		ontype = type.indexOf( ":" ) < 0 && "on" + type;



		// Caller can pass in a jQuery.Event object, Object, or just an event type string

		event = event[ jQuery.expando ] ?

			event :

			new jQuery.Event( type, typeof event === "object" && event );



		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)

		event.isTrigger = onlyHandlers ? 2 : 3;

		event.namespace = namespaces.join( "." );

		event.rnamespace = event.namespace ?

			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :

			null;



		// Clean up the event in case it is being reused

		event.result = undefined;

		if ( !event.target ) {

			event.target = elem;

		}



		// Clone any incoming data and prepend the event, creating the handler arg list

		data = data == null ?

			[ event ] :

			jQuery.makeArray( data, [ event ] );



		// Allow special events to draw outside the lines

		special = jQuery.event.special[ type ] || {};

		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {

			return;

		}



		// Determine event propagation path in advance, per W3C events spec (#9951)

		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)

		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {



			bubbleType = special.delegateType || type;

			if ( !rfocusMorph.test( bubbleType + type ) ) {

				cur = cur.parentNode;

			}

			for ( ; cur; cur = cur.parentNode ) {

				eventPath.push( cur );

				tmp = cur;

			}



			// Only add window if we got to document (e.g., not plain obj or detached DOM)

			if ( tmp === ( elem.ownerDocument || document ) ) {

				eventPath.push( tmp.defaultView || tmp.parentWindow || window );

			}

		}



		// Fire handlers on the event path

		i = 0;

		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			lastElement = cur;

			event.type = i > 1 ?

				bubbleType :

				special.bindType || type;



			// jQuery handler

			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&

				dataPriv.get( cur, "handle" );

			if ( handle ) {

				handle.apply( cur, data );

			}



			// Native handler

			handle = ontype && cur[ ontype ];

			if ( handle && handle.apply && acceptData( cur ) ) {

				event.result = handle.apply( cur, data );

				if ( event.result === false ) {

					event.preventDefault();

				}

			}

		}

		event.type = type;



		// If nobody prevented the default action, do it now

		if ( !onlyHandlers && !event.isDefaultPrevented() ) {



			if ( ( !special._default ||

				special._default.apply( eventPath.pop(), data ) === false ) &&

				acceptData( elem ) ) {



				// Call a native DOM method on the target with the same name as the event.

				// Don't do default actions on window, that's where global variables be (#6170)

				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {



					// Don't re-trigger an onFOO event when we call its FOO() method

					tmp = elem[ ontype ];



					if ( tmp ) {

						elem[ ontype ] = null;

					}



					// Prevent re-triggering of the same event, since we already bubbled it above

					jQuery.event.triggered = type;



					if ( event.isPropagationStopped() ) {

						lastElement.addEventListener( type, stopPropagationCallback );

					}



					elem[ type ]();



					if ( event.isPropagationStopped() ) {

						lastElement.removeEventListener( type, stopPropagationCallback );

					}



					jQuery.event.triggered = undefined;



					if ( tmp ) {

						elem[ ontype ] = tmp;

					}

				}

			}

		}



		return event.result;

	},



	// Piggyback on a donor event to simulate a different one

	// Used only for `focus(in | out)` events

	simulate: function( type, elem, event ) {

		var e = jQuery.extend(

			new jQuery.Event(),

			event,

			{

				type: type,

				isSimulated: true

			}

		);



		jQuery.event.trigger( e, null, elem );

	}



} );



jQuery.fn.extend( {



	trigger: function( type, data ) {

		return this.each( function() {

			jQuery.event.trigger( type, data, this );

		} );

	},

	triggerHandler: function( type, data ) {

		var elem = this[ 0 ];

		if ( elem ) {

			return jQuery.event.trigger( type, data, elem, true );

		}

	}

} );





// Support: Firefox <=44

// Firefox doesn't have focus(in | out) events

// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787

//

// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1

// focus(in | out) events fire after focus & blur events,

// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order

// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857

if ( !support.focusin ) {

	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {



		// Attach a single capturing handler on the document while someone wants focusin/focusout

		var handler = function( event ) {

			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );

		};



		jQuery.event.special[ fix ] = {

			setup: function() {

				var doc = this.ownerDocument || this,

					attaches = dataPriv.access( doc, fix );



				if ( !attaches ) {

					doc.addEventListener( orig, handler, true );

				}

				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );

			},

			teardown: function() {

				var doc = this.ownerDocument || this,

					attaches = dataPriv.access( doc, fix ) - 1;



				if ( !attaches ) {

					doc.removeEventListener( orig, handler, true );

					dataPriv.remove( doc, fix );



				} else {

					dataPriv.access( doc, fix, attaches );

				}

			}

		};

	} );

}

var location = window.location;



var nonce = Date.now();



var rquery = ( /\?/ );







// Cross-browser xml parsing

jQuery.parseXML = function( data ) {

	var xml;

	if ( !data || typeof data !== "string" ) {

		return null;

	}



	// Support: IE 9 - 11 only

	// IE throws on parseFromString with invalid input.

	try {

		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );

	} catch ( e ) {

		xml = undefined;

	}



	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {

		jQuery.error( "Invalid XML: " + data );

	}

	return xml;

};





var

	rbracket = /\[\]$/,

	rCRLF = /\r?\n/g,

	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,

	rsubmittable = /^(?:input|select|textarea|keygen)/i;



function buildParams( prefix, obj, traditional, add ) {

	var name;



	if ( Array.isArray( obj ) ) {



		// Serialize array item.

		jQuery.each( obj, function( i, v ) {

			if ( traditional || rbracket.test( prefix ) ) {



				// Treat each array item as a scalar.

				add( prefix, v );



			} else {



				// Item is non-scalar (array or object), encode its numeric index.

				buildParams(

					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",

					v,

					traditional,

					add

				);

			}

		} );



	} else if ( !traditional && toType( obj ) === "object" ) {



		// Serialize object item.

		for ( name in obj ) {

			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );

		}



	} else {



		// Serialize scalar item.

		add( prefix, obj );

	}

}



// Serialize an array of form elements or a set of

// key/values into a query string

jQuery.param = function( a, traditional ) {

	var prefix,

		s = [],

		add = function( key, valueOrFunction ) {



			// If value is a function, invoke it and use its return value

			var value = isFunction( valueOrFunction ) ?

				valueOrFunction() :

				valueOrFunction;



			s[ s.length ] = encodeURIComponent( key ) + "=" +

				encodeURIComponent( value == null ? "" : value );

		};



	if ( a == null ) {

		return "";

	}



	// If an array was passed in, assume that it is an array of form elements.

	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {



		// Serialize the form elements

		jQuery.each( a, function() {

			add( this.name, this.value );

		} );



	} else {



		// If traditional, encode the "old" way (the way 1.3.2 or older

		// did it), otherwise encode params recursively.

		for ( prefix in a ) {

			buildParams( prefix, a[ prefix ], traditional, add );

		}

	}



	// Return the resulting serialization

	return s.join( "&" );

};



jQuery.fn.extend( {

	serialize: function() {

		return jQuery.param( this.serializeArray() );

	},

	serializeArray: function() {

		return this.map( function() {



			// Can add propHook for "elements" to filter or add form elements

			var elements = jQuery.prop( this, "elements" );

			return elements ? jQuery.makeArray( elements ) : this;

		} )

		.filter( function() {

			var type = this.type;



			// Use .is( ":disabled" ) so that fieldset[disabled] works

			return this.name && !jQuery( this ).is( ":disabled" ) &&

				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&

				( this.checked || !rcheckableType.test( type ) );

		} )

		.map( function( i, elem ) {

			var val = jQuery( this ).val();



			if ( val == null ) {

				return null;

			}



			if ( Array.isArray( val ) ) {

				return jQuery.map( val, function( val ) {

					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };

				} );

			}



			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };

		} ).get();

	}

} );





var

	r20 = /%20/g,

	rhash = /#.*$/,

	rantiCache = /([?&])_=[^&]*/,

	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,



	// #7653, #8125, #8152: local protocol detection

	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,

	rnoContent = /^(?:GET|HEAD)$/,

	rprotocol = /^\/\//,



	/* Prefilters

	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)

	 * 2) These are called:

	 *    - BEFORE asking for a transport

	 *    - AFTER param serialization (s.data is a string if s.processData is true)

	 * 3) key is the dataType

	 * 4) the catchall symbol "*" can be used

	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed

	 */

	prefilters = {},



	/* Transports bindings

	 * 1) key is the dataType

	 * 2) the catchall symbol "*" can be used

	 * 3) selection will start with transport dataType and THEN go to "*" if needed

	 */

	transports = {},



	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression

	allTypes = "*/".concat( "*" ),



	// Anchor tag for parsing the document origin

	originAnchor = document.createElement( "a" );

	originAnchor.href = location.href;



// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport

function addToPrefiltersOrTransports( structure ) {



	// dataTypeExpression is optional and defaults to "*"

	return function( dataTypeExpression, func ) {



		if ( typeof dataTypeExpression !== "string" ) {

			func = dataTypeExpression;

			dataTypeExpression = "*";

		}



		var dataType,

			i = 0,

			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];



		if ( isFunction( func ) ) {



			// For each dataType in the dataTypeExpression

			while ( ( dataType = dataTypes[ i++ ] ) ) {



				// Prepend if requested

				if ( dataType[ 0 ] === "+" ) {

					dataType = dataType.slice( 1 ) || "*";

					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );



				// Otherwise append

				} else {

					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );

				}

			}

		}

	};

}



// Base inspection function for prefilters and transports

function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {



	var inspected = {},

		seekingTransport = ( structure === transports );



	function inspect( dataType ) {

		var selected;

		inspected[ dataType ] = true;

		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {

			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );

			if ( typeof dataTypeOrTransport === "string" &&

				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {



				options.dataTypes.unshift( dataTypeOrTransport );

				inspect( dataTypeOrTransport );

				return false;

			} else if ( seekingTransport ) {

				return !( selected = dataTypeOrTransport );

			}

		} );

		return selected;

	}



	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );

}



// A special extend for ajax options

// that takes "flat" options (not to be deep extended)

// Fixes #9887

function ajaxExtend( target, src ) {

	var key, deep,

		flatOptions = jQuery.ajaxSettings.flatOptions || {};



	for ( key in src ) {

		if ( src[ key ] !== undefined ) {

			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];

		}

	}

	if ( deep ) {

		jQuery.extend( true, target, deep );

	}



	return target;

}



/* Handles responses to an ajax request:

 * - finds the right dataType (mediates between content-type and expected dataType)

 * - returns the corresponding response

 */

function ajaxHandleResponses( s, jqXHR, responses ) {



	var ct, type, finalDataType, firstDataType,

		contents = s.contents,

		dataTypes = s.dataTypes;



	// Remove auto dataType and get content-type in the process

	while ( dataTypes[ 0 ] === "*" ) {

		dataTypes.shift();

		if ( ct === undefined ) {

			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );

		}

	}



	// Check if we're dealing with a known content-type

	if ( ct ) {

		for ( type in contents ) {

			if ( contents[ type ] && contents[ type ].test( ct ) ) {

				dataTypes.unshift( type );

				break;

			}

		}

	}



	// Check to see if we have a response for the expected dataType

	if ( dataTypes[ 0 ] in responses ) {

		finalDataType = dataTypes[ 0 ];

	} else {



		// Try convertible dataTypes

		for ( type in responses ) {

			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {

				finalDataType = type;

				break;

			}

			if ( !firstDataType ) {

				firstDataType = type;

			}

		}



		// Or just use first one

		finalDataType = finalDataType || firstDataType;

	}



	// If we found a dataType

	// We add the dataType to the list if needed

	// and return the corresponding response

	if ( finalDataType ) {

		if ( finalDataType !== dataTypes[ 0 ] ) {

			dataTypes.unshift( finalDataType );

		}

		return responses[ finalDataType ];

	}

}



/* Chain conversions given the request and the original response

 * Also sets the responseXXX fields on the jqXHR instance

 */

function ajaxConvert( s, response, jqXHR, isSuccess ) {

	var conv2, current, conv, tmp, prev,

		converters = {},



		// Work with a copy of dataTypes in case we need to modify it for conversion

		dataTypes = s.dataTypes.slice();



	// Create converters map with lowercased keys

	if ( dataTypes[ 1 ] ) {

		for ( conv in s.converters ) {

			converters[ conv.toLowerCase() ] = s.converters[ conv ];

		}

	}



	current = dataTypes.shift();



	// Convert to each sequential dataType

	while ( current ) {



		if ( s.responseFields[ current ] ) {

			jqXHR[ s.responseFields[ current ] ] = response;

		}



		// Apply the dataFilter if provided

		if ( !prev && isSuccess && s.dataFilter ) {

			response = s.dataFilter( response, s.dataType );

		}



		prev = current;

		current = dataTypes.shift();



		if ( current ) {



			// There's only work to do if current dataType is non-auto

			if ( current === "*" ) {



				current = prev;



			// Convert response if prev dataType is non-auto and differs from current

			} else if ( prev !== "*" && prev !== current ) {



				// Seek a direct converter

				conv = converters[ prev + " " + current ] || converters[ "* " + current ];



				// If none found, seek a pair

				if ( !conv ) {

					for ( conv2 in converters ) {



						// If conv2 outputs current

						tmp = conv2.split( " " );

						if ( tmp[ 1 ] === current ) {



							// If prev can be converted to accepted input

							conv = converters[ prev + " " + tmp[ 0 ] ] ||

								converters[ "* " + tmp[ 0 ] ];

							if ( conv ) {



								// Condense equivalence converters

								if ( conv === true ) {

									conv = converters[ conv2 ];



								// Otherwise, insert the intermediate dataType

								} else if ( converters[ conv2 ] !== true ) {

									current = tmp[ 0 ];

									dataTypes.unshift( tmp[ 1 ] );

								}

								break;

							}

						}

					}

				}



				// Apply converter (if not an equivalence)

				if ( conv !== true ) {



					// Unless errors are allowed to bubble, catch and return them

					if ( conv && s.throws ) {

						response = conv( response );

					} else {

						try {

							response = conv( response );

						} catch ( e ) {

							return {

								state: "parsererror",

								error: conv ? e : "No conversion from " + prev + " to " + current

							};

						}

					}

				}

			}

		}

	}



	return { state: "success", data: response };

}



jQuery.extend( {



	// Counter for holding the number of active queries

	active: 0,



	// Last-Modified header cache for next request

	lastModified: {},

	etag: {},



	ajaxSettings: {

		url: location.href,

		type: "GET",

		isLocal: rlocalProtocol.test( location.protocol ),

		global: true,

		processData: true,

		async: true,

		contentType: "application/x-www-form-urlencoded; charset=UTF-8",



		/*

		timeout: 0,

		data: null,

		dataType: null,

		username: null,

		password: null,

		cache: null,

		throws: false,

		traditional: false,

		headers: {},

		*/



		accepts: {

			"*": allTypes,

			text: "text/plain",

			html: "text/html",

			xml: "application/xml, text/xml",

			json: "application/json, text/javascript"

		},



		contents: {

			xml: /\bxml\b/,

			html: /\bhtml/,

			json: /\bjson\b/

		},



		responseFields: {

			xml: "responseXML",

			text: "responseText",

			json: "responseJSON"

		},



		// Data converters

		// Keys separate source (or catchall "*") and destination types with a single space

		converters: {



			// Convert anything to text

			"* text": String,



			// Text to html (true = no transformation)

			"text html": true,



			// Evaluate text as a json expression

			"text json": JSON.parse,



			// Parse text as xml

			"text xml": jQuery.parseXML

		},



		// For options that shouldn't be deep extended:

		// you can add your own custom options here if

		// and when you create one that shouldn't be

		// deep extended (see ajaxExtend)

		flatOptions: {

			url: true,

			context: true

		}

	},



	// Creates a full fledged settings object into target

	// with both ajaxSettings and settings fields.

	// If target is omitted, writes into ajaxSettings.

	ajaxSetup: function( target, settings ) {

		return settings ?



			// Building a settings object

			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :



			// Extending ajaxSettings

			ajaxExtend( jQuery.ajaxSettings, target );

	},



	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),

	ajaxTransport: addToPrefiltersOrTransports( transports ),



	// Main method

	ajax: function( url, options ) {



		// If url is an object, simulate pre-1.5 signature

		if ( typeof url === "object" ) {

			options = url;

			url = undefined;

		}



		// Force options to be an object

		options = options || {};



		var transport,



			// URL without anti-cache param

			cacheURL,



			// Response headers

			responseHeadersString,

			responseHeaders,



			// timeout handle

			timeoutTimer,



			// Url cleanup var

			urlAnchor,



			// Request state (becomes false upon send and true upon completion)

			completed,



			// To know if global events are to be dispatched

			fireGlobals,



			// Loop variable

			i,



			// uncached part of the url

			uncached,



			// Create the final options object

			s = jQuery.ajaxSetup( {}, options ),



			// Callbacks context

			callbackContext = s.context || s,



			// Context for global events is callbackContext if it is a DOM node or jQuery collection

			globalEventContext = s.context &&

				( callbackContext.nodeType || callbackContext.jquery ) ?

					jQuery( callbackContext ) :

					jQuery.event,



			// Deferreds

			deferred = jQuery.Deferred(),

			completeDeferred = jQuery.Callbacks( "once memory" ),



			// Status-dependent callbacks

			statusCode = s.statusCode || {},



			// Headers (they are sent all at once)

			requestHeaders = {},

			requestHeadersNames = {},



			// Default abort message

			strAbort = "canceled",



			// Fake xhr

			jqXHR = {

				readyState: 0,



				// Builds headers hashtable if needed

				getResponseHeader: function( key ) {

					var match;

					if ( completed ) {

						if ( !responseHeaders ) {

							responseHeaders = {};

							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {

								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =

									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )

										.concat( match[ 2 ] );

							}

						}

						match = responseHeaders[ key.toLowerCase() + " " ];

					}

					return match == null ? null : match.join( ", " );

				},



				// Raw string

				getAllResponseHeaders: function() {

					return completed ? responseHeadersString : null;

				},



				// Caches the header

				setRequestHeader: function( name, value ) {

					if ( completed == null ) {

						name = requestHeadersNames[ name.toLowerCase() ] =

							requestHeadersNames[ name.toLowerCase() ] || name;

						requestHeaders[ name ] = value;

					}

					return this;

				},



				// Overrides response content-type header

				overrideMimeType: function( type ) {

					if ( completed == null ) {

						s.mimeType = type;

					}

					return this;

				},



				// Status-dependent callbacks

				statusCode: function( map ) {

					var code;

					if ( map ) {

						if ( completed ) {



							// Execute the appropriate callbacks

							jqXHR.always( map[ jqXHR.status ] );

						} else {



							// Lazy-add the new callbacks in a way that preserves old ones

							for ( code in map ) {

								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];

							}

						}

					}

					return this;

				},



				// Cancel the request

				abort: function( statusText ) {

					var finalText = statusText || strAbort;

					if ( transport ) {

						transport.abort( finalText );

					}

					done( 0, finalText );

					return this;

				}

			};



		// Attach deferreds

		deferred.promise( jqXHR );



		// Add protocol if not provided (prefilters might expect it)

		// Handle falsy url in the settings object (#10093: consistency with old signature)

		// We also use the url parameter if available

		s.url = ( ( url || s.url || location.href ) + "" )

			.replace( rprotocol, location.protocol + "//" );



		// Alias method option to type as per ticket #12004

		s.type = options.method || options.type || s.method || s.type;



		// Extract dataTypes list

		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];



		// A cross-domain request is in order when the origin doesn't match the current origin.

		if ( s.crossDomain == null ) {

			urlAnchor = document.createElement( "a" );



			// Support: IE <=8 - 11, Edge 12 - 15

			// IE throws exception on accessing the href property if url is malformed,

			// e.g. http://example.com:80x/

			try {

				urlAnchor.href = s.url;



				// Support: IE <=8 - 11 only

				// Anchor's host property isn't correctly set when s.url is relative

				urlAnchor.href = urlAnchor.href;

				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==

					urlAnchor.protocol + "//" + urlAnchor.host;

			} catch ( e ) {



				// If there is an error parsing the URL, assume it is crossDomain,

				// it can be rejected by the transport if it is invalid

				s.crossDomain = true;

			}

		}



		// Convert data if not already a string

		if ( s.data && s.processData && typeof s.data !== "string" ) {

			s.data = jQuery.param( s.data, s.traditional );

		}



		// Apply prefilters

		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );



		// If request was aborted inside a prefilter, stop there

		if ( completed ) {

			return jqXHR;

		}



		// We can fire global events as of now if asked to

		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)

		fireGlobals = jQuery.event && s.global;



		// Watch for a new set of requests

		if ( fireGlobals && jQuery.active++ === 0 ) {

			jQuery.event.trigger( "ajaxStart" );

		}



		// Uppercase the type

		s.type = s.type.toUpperCase();



		// Determine if request has content

		s.hasContent = !rnoContent.test( s.type );



		// Save the URL in case we're toying with the If-Modified-Since

		// and/or If-None-Match header later on

		// Remove hash to simplify url manipulation

		cacheURL = s.url.replace( rhash, "" );



		// More options handling for requests with no content

		if ( !s.hasContent ) {



			// Remember the hash so we can put it back

			uncached = s.url.slice( cacheURL.length );



			// If data is available and should be processed, append data to url

			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {

				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;



				// #9682: remove data so that it's not used in an eventual retry

				delete s.data;

			}



			// Add or update anti-cache param if needed

			if ( s.cache === false ) {

				cacheURL = cacheURL.replace( rantiCache, "$1" );

				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;

			}



			// Put hash and anti-cache on the URL that will be requested (gh-1732)

			s.url = cacheURL + uncached;



		// Change '%20' to '+' if this is encoded form body content (gh-2658)

		} else if ( s.data && s.processData &&

			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {

			s.data = s.data.replace( r20, "+" );

		}



		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.

		if ( s.ifModified ) {

			if ( jQuery.lastModified[ cacheURL ] ) {

				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );

			}

			if ( jQuery.etag[ cacheURL ] ) {

				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );

			}

		}



		// Set the correct header, if data is being sent

		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {

			jqXHR.setRequestHeader( "Content-Type", s.contentType );

		}



		// Set the Accepts header for the server, depending on the dataType

		jqXHR.setRequestHeader(

			"Accept",

			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?

				s.accepts[ s.dataTypes[ 0 ] ] +

					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :

				s.accepts[ "*" ]

		);



		// Check for headers option

		for ( i in s.headers ) {

			jqXHR.setRequestHeader( i, s.headers[ i ] );

		}



		// Allow custom headers/mimetypes and early abort

		if ( s.beforeSend &&

			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {



			// Abort if not done already and return

			return jqXHR.abort();

		}



		// Aborting is no longer a cancellation

		strAbort = "abort";



		// Install callbacks on deferreds

		completeDeferred.add( s.complete );

		jqXHR.done( s.success );

		jqXHR.fail( s.error );



		// Get transport

		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );



		// If no transport, we auto-abort

		if ( !transport ) {

			done( -1, "No Transport" );

		} else {

			jqXHR.readyState = 1;



			// Send global event

			if ( fireGlobals ) {

				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );

			}



			// If request was aborted inside ajaxSend, stop there

			if ( completed ) {

				return jqXHR;

			}



			// Timeout

			if ( s.async && s.timeout > 0 ) {

				timeoutTimer = window.setTimeout( function() {

					jqXHR.abort( "timeout" );

				}, s.timeout );

			}



			try {

				completed = false;

				transport.send( requestHeaders, done );

			} catch ( e ) {



				// Rethrow post-completion exceptions

				if ( completed ) {

					throw e;

				}



				// Propagate others as results

				done( -1, e );

			}

		}



		// Callback for when everything is done

		function done( status, nativeStatusText, responses, headers ) {

			var isSuccess, success, error, response, modified,

				statusText = nativeStatusText;



			// Ignore repeat invocations

			if ( completed ) {

				return;

			}



			completed = true;



			// Clear timeout if it exists

			if ( timeoutTimer ) {

				window.clearTimeout( timeoutTimer );

			}



			// Dereference transport for early garbage collection

			// (no matter how long the jqXHR object will be used)

			transport = undefined;



			// Cache response headers

			responseHeadersString = headers || "";



			// Set readyState

			jqXHR.readyState = status > 0 ? 4 : 0;



			// Determine if successful

			isSuccess = status >= 200 && status < 300 || status === 304;



			// Get response data

			if ( responses ) {

				response = ajaxHandleResponses( s, jqXHR, responses );

			}



			// Convert no matter what (that way responseXXX fields are always set)

			response = ajaxConvert( s, response, jqXHR, isSuccess );



			// If successful, handle type chaining

			if ( isSuccess ) {



				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.

				if ( s.ifModified ) {

					modified = jqXHR.getResponseHeader( "Last-Modified" );

					if ( modified ) {

						jQuery.lastModified[ cacheURL ] = modified;

					}

					modified = jqXHR.getResponseHeader( "etag" );

					if ( modified ) {

						jQuery.etag[ cacheURL ] = modified;

					}

				}



				// if no content

				if ( status === 204 || s.type === "HEAD" ) {

					statusText = "nocontent";



				// if not modified

				} else if ( status === 304 ) {

					statusText = "notmodified";



				// If we have data, let's convert it

				} else {

					statusText = response.state;

					success = response.data;

					error = response.error;

					isSuccess = !error;

				}

			} else {



				// Extract error from statusText and normalize for non-aborts

				error = statusText;

				if ( status || !statusText ) {

					statusText = "error";

					if ( status < 0 ) {

						status = 0;

					}

				}

			}



			// Set data for the fake xhr object

			jqXHR.status = status;

			jqXHR.statusText = ( nativeStatusText || statusText ) + "";



			// Success/Error

			if ( isSuccess ) {

				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );

			} else {

				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );

			}



			// Status-dependent callbacks

			jqXHR.statusCode( statusCode );

			statusCode = undefined;



			if ( fireGlobals ) {

				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",

					[ jqXHR, s, isSuccess ? success : error ] );

			}



			// Complete

			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );



			if ( fireGlobals ) {

				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );



				// Handle the global AJAX counter

				if ( !( --jQuery.active ) ) {

					jQuery.event.trigger( "ajaxStop" );

				}

			}

		}



		return jqXHR;

	},



	getJSON: function( url, data, callback ) {

		return jQuery.get( url, data, callback, "json" );

	},



	getScript: function( url, callback ) {

		return jQuery.get( url, undefined, callback, "script" );

	}

} );



jQuery.each( [ "get", "post" ], function( i, method ) {

	jQuery[ method ] = function( url, data, callback, type ) {



		// Shift arguments if data argument was omitted

		if ( isFunction( data ) ) {

			type = type || callback;

			callback = data;

			data = undefined;

		}



		// The url can be an options object (which then must have .url)

		return jQuery.ajax( jQuery.extend( {

			url: url,

			type: method,

			dataType: type,

			data: data,

			success: callback

		}, jQuery.isPlainObject( url ) && url ) );

	};

} );





jQuery._evalUrl = function( url, options ) {

	return jQuery.ajax( {

		url: url,



		// Make this explicit, since user can override this through ajaxSetup (#11264)

		type: "GET",

		dataType: "script",

		cache: true,

		async: false,

		global: false,



		// Only evaluate the response if it is successful (gh-4126)

		// dataFilter is not invoked for failure responses, so using it instead

		// of the default converter is kludgy but it works.

		converters: {

			"text script": function() {}

		},

		dataFilter: function( response ) {

			jQuery.globalEval( response, options );

		}

	} );

};





jQuery.fn.extend( {

	wrapAll: function( html ) {

		var wrap;



		if ( this[ 0 ] ) {

			if ( isFunction( html ) ) {

				html = html.call( this[ 0 ] );

			}



			// The elements to wrap the target around

			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );



			if ( this[ 0 ].parentNode ) {

				wrap.insertBefore( this[ 0 ] );

			}



			wrap.map( function() {

				var elem = this;



				while ( elem.firstElementChild ) {

					elem = elem.firstElementChild;

				}



				return elem;

			} ).append( this );

		}



		return this;

	},



	wrapInner: function( html ) {

		if ( isFunction( html ) ) {

			return this.each( function( i ) {

				jQuery( this ).wrapInner( html.call( this, i ) );

			} );

		}



		return this.each( function() {

			var self = jQuery( this ),

				contents = self.contents();



			if ( contents.length ) {

				contents.wrapAll( html );



			} else {

				self.append( html );

			}

		} );

	},



	wrap: function( html ) {

		var htmlIsFunction = isFunction( html );



		return this.each( function( i ) {

			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );

		} );

	},



	unwrap: function( selector ) {

		this.parent( selector ).not( "body" ).each( function() {

			jQuery( this ).replaceWith( this.childNodes );

		} );

		return this;

	}

} );





jQuery.expr.pseudos.hidden = function( elem ) {

	return !jQuery.expr.pseudos.visible( elem );

};

jQuery.expr.pseudos.visible = function( elem ) {

	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );

};









jQuery.ajaxSettings.xhr = function() {

	try {

		return new window.XMLHttpRequest();

	} catch ( e ) {}

};



var xhrSuccessStatus = {



		// File protocol always yields status code 0, assume 200

		0: 200,



		// Support: IE <=9 only

		// #1450: sometimes IE returns 1223 when it should be 204

		1223: 204

	},

	xhrSupported = jQuery.ajaxSettings.xhr();



support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );

support.ajax = xhrSupported = !!xhrSupported;



jQuery.ajaxTransport( function( options ) {

	var callback, errorCallback;



	// Cross domain only allowed if supported through XMLHttpRequest

	if ( support.cors || xhrSupported && !options.crossDomain ) {

		return {

			send: function( headers, complete ) {

				var i,

					xhr = options.xhr();



				xhr.open(

					options.type,

					options.url,

					options.async,

					options.username,

					options.password

				);



				// Apply custom fields if provided

				if ( options.xhrFields ) {

					for ( i in options.xhrFields ) {

						xhr[ i ] = options.xhrFields[ i ];

					}

				}



				// Override mime type if needed

				if ( options.mimeType && xhr.overrideMimeType ) {

					xhr.overrideMimeType( options.mimeType );

				}



				// X-Requested-With header

				// For cross-domain requests, seeing as conditions for a preflight are

				// akin to a jigsaw puzzle, we simply never set it to be sure.

				// (it can always be set on a per-request basis or even using ajaxSetup)

				// For same-domain requests, won't change header if already provided.

				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {

					headers[ "X-Requested-With" ] = "XMLHttpRequest";

				}



				// Set headers

				for ( i in headers ) {

					xhr.setRequestHeader( i, headers[ i ] );

				}



				// Callback

				callback = function( type ) {

					return function() {

						if ( callback ) {

							callback = errorCallback = xhr.onload =

								xhr.onerror = xhr.onabort = xhr.ontimeout =

									xhr.onreadystatechange = null;



							if ( type === "abort" ) {

								xhr.abort();

							} else if ( type === "error" ) {



								// Support: IE <=9 only

								// On a manual native abort, IE9 throws

								// errors on any property access that is not readyState

								if ( typeof xhr.status !== "number" ) {

									complete( 0, "error" );

								} else {

									complete(



										// File: protocol always yields status 0; see #8605, #14207

										xhr.status,

										xhr.statusText

									);

								}

							} else {

								complete(

									xhrSuccessStatus[ xhr.status ] || xhr.status,

									xhr.statusText,



									// Support: IE <=9 only

									// IE9 has no XHR2 but throws on binary (trac-11426)

									// For XHR2 non-text, let the caller handle it (gh-2498)

									( xhr.responseType || "text" ) !== "text"  ||

									typeof xhr.responseText !== "string" ?

										{ binary: xhr.response } :

										{ text: xhr.responseText },

									xhr.getAllResponseHeaders()

								);

							}

						}

					};

				};



				// Listen to events

				xhr.onload = callback();

				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );



				// Support: IE 9 only

				// Use onreadystatechange to replace onabort

				// to handle uncaught aborts

				if ( xhr.onabort !== undefined ) {

					xhr.onabort = errorCallback;

				} else {

					xhr.onreadystatechange = function() {



						// Check readyState before timeout as it changes

						if ( xhr.readyState === 4 ) {



							// Allow onerror to be called first,

							// but that will not handle a native abort

							// Also, save errorCallback to a variable

							// as xhr.onerror cannot be accessed

							window.setTimeout( function() {

								if ( callback ) {

									errorCallback();

								}

							} );

						}

					};

				}



				// Create the abort callback

				callback = callback( "abort" );



				try {



					// Do send the request (this may raise an exception)

					xhr.send( options.hasContent && options.data || null );

				} catch ( e ) {



					// #14683: Only rethrow if this hasn't been notified as an error yet

					if ( callback ) {

						throw e;

					}

				}

			},



			abort: function() {

				if ( callback ) {

					callback();

				}

			}

		};

	}

} );









// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)

jQuery.ajaxPrefilter( function( s ) {

	if ( s.crossDomain ) {

		s.contents.script = false;

	}

} );



// Install script dataType

jQuery.ajaxSetup( {

	accepts: {

		script: "text/javascript, application/javascript, " +

			"application/ecmascript, application/x-ecmascript"

	},

	contents: {

		script: /\b(?:java|ecma)script\b/

	},

	converters: {

		"text script": function( text ) {

			jQuery.globalEval( text );

			return text;

		}

	}

} );



// Handle cache's special case and crossDomain

jQuery.ajaxPrefilter( "script", function( s ) {

	if ( s.cache === undefined ) {

		s.cache = false;

	}

	if ( s.crossDomain ) {

		s.type = "GET";

	}

} );



// Bind script tag hack transport

jQuery.ajaxTransport( "script", function( s ) {



	// This transport only deals with cross domain or forced-by-attrs requests

	if ( s.crossDomain || s.scriptAttrs ) {

		var script, callback;

		return {

			send: function( _, complete ) {

				script = jQuery( "<script>" )

					.attr( s.scriptAttrs || {} )

					.prop( { charset: s.scriptCharset, src: s.url } )

					.on( "load error", callback = function( evt ) {

						script.remove();

						callback = null;

						if ( evt ) {

							complete( evt.type === "error" ? 404 : 200, evt.type );

						}

					} );



				// Use native DOM manipulation to avoid our domManip AJAX trickery

				document.head.appendChild( script[ 0 ] );

			},

			abort: function() {

				if ( callback ) {

					callback();

				}

			}

		};

	}

} );









var oldCallbacks = [],

	rjsonp = /(=)\?(?=&|$)|\?\?/;



// Default jsonp settings

jQuery.ajaxSetup( {

	jsonp: "callback",

	jsonpCallback: function() {

		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );

		this[ callback ] = true;

		return callback;

	}

} );



// Detect, normalize options and install callbacks for jsonp requests

jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {



	var callbackName, overwritten, responseContainer,

		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?

			"url" :

			typeof s.data === "string" &&

				( s.contentType || "" )

					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&

				rjsonp.test( s.data ) && "data"

		);



	// Handle iff the expected data type is "jsonp" or we have a parameter to set

	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {



		// Get callback name, remembering preexisting value associated with it

		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?

			s.jsonpCallback() :

			s.jsonpCallback;



		// Insert callback into url or form data

		if ( jsonProp ) {

			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );

		} else if ( s.jsonp !== false ) {

			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;

		}



		// Use data converter to retrieve json after script execution

		s.converters[ "script json" ] = function() {

			if ( !responseContainer ) {

				jQuery.error( callbackName + " was not called" );

			}

			return responseContainer[ 0 ];

		};



		// Force json dataType

		s.dataTypes[ 0 ] = "json";



		// Install callback

		overwritten = window[ callbackName ];

		window[ callbackName ] = function() {

			responseContainer = arguments;

		};



		// Clean-up function (fires after converters)

		jqXHR.always( function() {



			// If previous value didn't exist - remove it

			if ( overwritten === undefined ) {

				jQuery( window ).removeProp( callbackName );



			// Otherwise restore preexisting value

			} else {

				window[ callbackName ] = overwritten;

			}



			// Save back as free

			if ( s[ callbackName ] ) {



				// Make sure that re-using the options doesn't screw things around

				s.jsonpCallback = originalSettings.jsonpCallback;



				// Save the callback name for future use

				oldCallbacks.push( callbackName );

			}



			// Call if it was a function and we have a response

			if ( responseContainer && isFunction( overwritten ) ) {

				overwritten( responseContainer[ 0 ] );

			}



			responseContainer = overwritten = undefined;

		} );



		// Delegate to script

		return "script";

	}

} );









// Support: Safari 8 only

// In Safari 8 documents created via document.implementation.createHTMLDocument

// collapse sibling forms: the second one becomes a child of the first one.

// Because of that, this security measure has to be disabled in Safari 8.

// https://bugs.webkit.org/show_bug.cgi?id=137337

support.createHTMLDocument = ( function() {

	var body = document.implementation.createHTMLDocument( "" ).body;

	body.innerHTML = "<form></form><form></form>";

	return body.childNodes.length === 2;

} )();





// Argument "data" should be string of html

// context (optional): If specified, the fragment will be created in this context,

// defaults to document

// keepScripts (optional): If true, will include scripts passed in the html string

jQuery.parseHTML = function( data, context, keepScripts ) {

	if ( typeof data !== "string" ) {

		return [];

	}

	if ( typeof context === "boolean" ) {

		keepScripts = context;

		context = false;

	}



	var base, parsed, scripts;



	if ( !context ) {



		// Stop scripts or inline event handlers from being executed immediately

		// by using document.implementation

		if ( support.createHTMLDocument ) {

			context = document.implementation.createHTMLDocument( "" );



			// Set the base href for the created document

			// so any parsed elements with URLs

			// are based on the document's URL (gh-2965)

			base = context.createElement( "base" );

			base.href = document.location.href;

			context.head.appendChild( base );

		} else {

			context = document;

		}

	}



	parsed = rsingleTag.exec( data );

	scripts = !keepScripts && [];



	// Single tag

	if ( parsed ) {

		return [ context.createElement( parsed[ 1 ] ) ];

	}



	parsed = buildFragment( [ data ], context, scripts );



	if ( scripts && scripts.length ) {

		jQuery( scripts ).remove();

	}



	return jQuery.merge( [], parsed.childNodes );

};





/**

 * Load a url into a page

 */

jQuery.fn.load = function( url, params, callback ) {

	var selector, type, response,

		self = this,

		off = url.indexOf( " " );



	if ( off > -1 ) {

		selector = stripAndCollapse( url.slice( off ) );

		url = url.slice( 0, off );

	}



	// If it's a function

	if ( isFunction( params ) ) {



		// We assume that it's the callback

		callback = params;

		params = undefined;



	// Otherwise, build a param string

	} else if ( params && typeof params === "object" ) {

		type = "POST";

	}



	// If we have elements to modify, make the request

	if ( self.length > 0 ) {

		jQuery.ajax( {

			url: url,



			// If "type" variable is undefined, then "GET" method will be used.

			// Make value of this field explicit since

			// user can override it through ajaxSetup method

			type: type || "GET",

			dataType: "html",

			data: params

		} ).done( function( responseText ) {



			// Save response for use in complete callback

			response = arguments;



			self.html( selector ?



				// If a selector was specified, locate the right elements in a dummy div

				// Exclude scripts to avoid IE 'Permission Denied' errors

				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :



				// Otherwise use the full result

				responseText );



		// If the request succeeds, this function gets "data", "status", "jqXHR"

		// but they are ignored because response was set above.

		// If it fails, this function gets "jqXHR", "status", "error"

		} ).always( callback && function( jqXHR, status ) {

			self.each( function() {

				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );

			} );

		} );

	}



	return this;

};









// Attach a bunch of functions for handling common AJAX events

jQuery.each( [

	"ajaxStart",

	"ajaxStop",

	"ajaxComplete",

	"ajaxError",

	"ajaxSuccess",

	"ajaxSend"

], function( i, type ) {

	jQuery.fn[ type ] = function( fn ) {

		return this.on( type, fn );

	};

} );









jQuery.expr.pseudos.animated = function( elem ) {

	return jQuery.grep( jQuery.timers, function( fn ) {

		return elem === fn.elem;

	} ).length;

};









jQuery.offset = {

	setOffset: function( elem, options, i ) {

		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,

			position = jQuery.css( elem, "position" ),

			curElem = jQuery( elem ),

			props = {};



		// Set position first, in-case top/left are set even on static elem

		if ( position === "static" ) {

			elem.style.position = "relative";

		}



		curOffset = curElem.offset();

		curCSSTop = jQuery.css( elem, "top" );

		curCSSLeft = jQuery.css( elem, "left" );

		calculatePosition = ( position === "absolute" || position === "fixed" ) &&

			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;



		// Need to be able to calculate position if either

		// top or left is auto and position is either absolute or fixed

		if ( calculatePosition ) {

			curPosition = curElem.position();

			curTop = curPosition.top;

			curLeft = curPosition.left;



		} else {

			curTop = parseFloat( curCSSTop ) || 0;

			curLeft = parseFloat( curCSSLeft ) || 0;

		}



		if ( isFunction( options ) ) {



			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)

			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );

		}



		if ( options.top != null ) {

			props.top = ( options.top - curOffset.top ) + curTop;

		}

		if ( options.left != null ) {

			props.left = ( options.left - curOffset.left ) + curLeft;

		}



		if ( "using" in options ) {

			options.using.call( elem, props );



		} else {

			curElem.css( props );

		}

	}

};



jQuery.fn.extend( {



	// offset() relates an element's border box to the document origin

	offset: function( options ) {



		// Preserve chaining for setter

		if ( arguments.length ) {

			return options === undefined ?

				this :

				this.each( function( i ) {

					jQuery.offset.setOffset( this, options, i );

				} );

		}



		var rect, win,

			elem = this[ 0 ];



		if ( !elem ) {

			return;

		}



		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)

		// Support: IE <=11 only

		// Running getBoundingClientRect on a

		// disconnected node in IE throws an error

		if ( !elem.getClientRects().length ) {

			return { top: 0, left: 0 };

		}



		// Get document-relative position by adding viewport scroll to viewport-relative gBCR

		rect = elem.getBoundingClientRect();

		win = elem.ownerDocument.defaultView;

		return {

			top: rect.top + win.pageYOffset,

			left: rect.left + win.pageXOffset

		};

	},



	// position() relates an element's margin box to its offset parent's padding box

	// This corresponds to the behavior of CSS absolute positioning

	position: function() {

		if ( !this[ 0 ] ) {

			return;

		}



		var offsetParent, offset, doc,

			elem = this[ 0 ],

			parentOffset = { top: 0, left: 0 };



		// position:fixed elements are offset from the viewport, which itself always has zero offset

		if ( jQuery.css( elem, "position" ) === "fixed" ) {



			// Assume position:fixed implies availability of getBoundingClientRect

			offset = elem.getBoundingClientRect();



		} else {

			offset = this.offset();



			// Account for the *real* offset parent, which can be the document or its root element

			// when a statically positioned element is identified

			doc = elem.ownerDocument;

			offsetParent = elem.offsetParent || doc.documentElement;

			while ( offsetParent &&

				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&

				jQuery.css( offsetParent, "position" ) === "static" ) {



				offsetParent = offsetParent.parentNode;

			}

			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {



				// Incorporate borders into its offset, since they are outside its content origin

				parentOffset = jQuery( offsetParent ).offset();

				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );

				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );

			}

		}



		// Subtract parent offsets and element margins

		return {

			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),

			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )

		};

	},



	// This method will return documentElement in the following cases:

	// 1) For the element inside the iframe without offsetParent, this method will return

	//    documentElement of the parent window

	// 2) For the hidden or detached element

	// 3) For body or html element, i.e. in case of the html node - it will return itself

	//

	// but those exceptions were never presented as a real life use-cases

	// and might be considered as more preferable results.

	//

	// This logic, however, is not guaranteed and can change at any point in the future

	offsetParent: function() {

		return this.map( function() {

			var offsetParent = this.offsetParent;



			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.offsetParent;

			}



			return offsetParent || documentElement;

		} );

	}

} );



// Create scrollLeft and scrollTop methods

jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {

	var top = "pageYOffset" === prop;



	jQuery.fn[ method ] = function( val ) {

		return access( this, function( elem, method, val ) {



			// Coalesce documents and windows

			var win;

			if ( isWindow( elem ) ) {

				win = elem;

			} else if ( elem.nodeType === 9 ) {

				win = elem.defaultView;

			}



			if ( val === undefined ) {

				return win ? win[ prop ] : elem[ method ];

			}



			if ( win ) {

				win.scrollTo(

					!top ? val : win.pageXOffset,

					top ? val : win.pageYOffset

				);



			} else {

				elem[ method ] = val;

			}

		}, method, val, arguments.length );

	};

} );



// Support: Safari <=7 - 9.1, Chrome <=37 - 49

// Add the top/left cssHooks using jQuery.fn.position

// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084

// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347

// getComputedStyle returns percent when specified for top/left/bottom/right;

// rather than make the css module depend on the offset module, just check for it here

jQuery.each( [ "top", "left" ], function( i, prop ) {

	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,

		function( elem, computed ) {

			if ( computed ) {

				computed = curCSS( elem, prop );



				// If curCSS returns percentage, fallback to offset

				return rnumnonpx.test( computed ) ?

					jQuery( elem ).position()[ prop ] + "px" :

					computed;

			}

		}

	);

} );





// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods

jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {

	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },

		function( defaultExtra, funcName ) {



		// Margin is only for outerHeight, outerWidth

		jQuery.fn[ funcName ] = function( margin, value ) {

			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),

				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );



			return access( this, function( elem, type, value ) {

				var doc;



				if ( isWindow( elem ) ) {



					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)

					return funcName.indexOf( "outer" ) === 0 ?

						elem[ "inner" + name ] :

						elem.document.documentElement[ "client" + name ];

				}



				// Get document width or height

				if ( elem.nodeType === 9 ) {

					doc = elem.documentElement;



					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],

					// whichever is greatest

					return Math.max(

						elem.body[ "scroll" + name ], doc[ "scroll" + name ],

						elem.body[ "offset" + name ], doc[ "offset" + name ],

						doc[ "client" + name ]

					);

				}



				return value === undefined ?



					// Get width or height on the element, requesting but not forcing parseFloat

					jQuery.css( elem, type, extra ) :



					// Set width or height on the element

					jQuery.style( elem, type, value, extra );

			}, type, chainable ? margin : undefined, chainable );

		};

	} );

} );





jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +

	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +

	"change select submit keydown keypress keyup contextmenu" ).split( " " ),

	function( i, name ) {



	// Handle event binding

	jQuery.fn[ name ] = function( data, fn ) {

		return arguments.length > 0 ?

			this.on( name, null, data, fn ) :

			this.trigger( name );

	};

} );



jQuery.fn.extend( {

	hover: function( fnOver, fnOut ) {

		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );

	}

} );









jQuery.fn.extend( {



	bind: function( types, data, fn ) {

		return this.on( types, null, data, fn );

	},

	unbind: function( types, fn ) {

		return this.off( types, null, fn );

	},



	delegate: function( selector, types, data, fn ) {

		return this.on( types, selector, data, fn );

	},

	undelegate: function( selector, types, fn ) {



		// ( namespace ) or ( selector, types [, fn] )

		return arguments.length === 1 ?

			this.off( selector, "**" ) :

			this.off( types, selector || "**", fn );

	}

} );



// Bind a function to a context, optionally partially applying any

// arguments.

// jQuery.proxy is deprecated to promote standards (specifically Function#bind)

// However, it is not slated for removal any time soon

jQuery.proxy = function( fn, context ) {

	var tmp, args, proxy;



	if ( typeof context === "string" ) {

		tmp = fn[ context ];

		context = fn;

		fn = tmp;

	}



	// Quick check to determine if target is callable, in the spec

	// this throws a TypeError, but we will just return undefined.

	if ( !isFunction( fn ) ) {

		return undefined;

	}



	// Simulated bind

	args = slice.call( arguments, 2 );

	proxy = function() {

		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );

	};



	// Set the guid of unique handler to the same of original handler, so it can be removed

	proxy.guid = fn.guid = fn.guid || jQuery.guid++;



	return proxy;

};



jQuery.holdReady = function( hold ) {

	if ( hold ) {

		jQuery.readyWait++;

	} else {

		jQuery.ready( true );

	}

};

jQuery.isArray = Array.isArray;

jQuery.parseJSON = JSON.parse;

jQuery.nodeName = nodeName;

jQuery.isFunction = isFunction;

jQuery.isWindow = isWindow;

jQuery.camelCase = camelCase;

jQuery.type = toType;



jQuery.now = Date.now;



jQuery.isNumeric = function( obj ) {



	// As of jQuery 3.0, isNumeric is limited to

	// strings and numbers (primitives or objects)

	// that can be coerced to finite numbers (gh-2662)

	var type = jQuery.type( obj );

	return ( type === "number" || type === "string" ) &&



		// parseFloat NaNs numeric-cast false positives ("")

		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")

		// subtraction forces infinities to NaN

		!isNaN( obj - parseFloat( obj ) );

};









// Register as a named AMD module, since jQuery can be concatenated with other

// files that may use define, but not via a proper concatenation script that

// understands anonymous AMD modules. A named AMD is safest and most robust

// way to register. Lowercase jquery is used because AMD module names are

// derived from file names, and jQuery is normally delivered in a lowercase

// file name. Do this after creating the global so that if an AMD module wants

// to call noConflict to hide this version of jQuery, it will work.



// Note that for maximum portability, libraries that are not jQuery should

// declare themselves as anonymous modules, and avoid setting a global if an

// AMD loader is present. jQuery is a special case. For more information, see

// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon



if ( typeof define === "function" && define.amd ) {

	define( "jquery", [], function() {

		return jQuery;

	} );

}









var



	// Map over jQuery in case of overwrite

	_jQuery = window.jQuery,



	// Map over the $ in case of overwrite

	_$ = window.$;



jQuery.noConflict = function( deep ) {

	if ( window.$ === jQuery ) {

		window.$ = _$;

	}



	if ( deep && window.jQuery === jQuery ) {

		window.jQuery = _jQuery;

	}



	return jQuery;

};



// Expose jQuery and $ identifiers, even in AMD

// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)

// and CommonJS for browser emulators (#13566)

if ( !noGlobal ) {

	window.jQuery = window.$ = jQuery;

}









return jQuery;

} );


/*!
  * Bootstrap v4.4.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
  (global = global || self, factory(global.bootstrap = {}, global.jQuery, global.Popper));
}(this, (function (exports, $, Popper) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.4.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined; // eslint-disable-line no-undefined
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $.fn.emulateTransitionEnd = transitionEndEmulator;
    $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $(element).css('transition-duration');
      var transitionDelay = $(element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(TRANSITION_END);
    },
    // TODO: Remove in v5
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    },
    jQueryDetection: function jQueryDetection() {
      if (typeof $ === 'undefined') {
        throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
      }

      var version = $.fn.jquery.split(' ')[0].split('.');
      var minMajor = 1;
      var ltMajor = 2;
      var minMinor = 9;
      var minPatch = 1;
      var maxMajor = 4;

      if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
        throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
      }
    }
  };
  Util.jQueryDetection();
  setTransitionEndSupport();

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.4.1';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };
  var Event = {
    CLOSE: "close" + EVENT_KEY,
    CLOSED: "closed" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert =
  /*#__PURE__*/
  function () {
    function Alert(element) {
      this._element = element;
    } // Getters


    var _proto = Alert.prototype;

    // Public
    _proto.close = function close(element) {
      var rootElement = this._element;

      if (element) {
        rootElement = this._getRootElement(element);
      }

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    } // Private
    ;

    _proto._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = document.querySelector(selector);
      }

      if (!parent) {
        parent = $(element).closest("." + ClassName.ALERT)[0];
      }

      return parent;
    };

    _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $.Event(Event.CLOSE);
      $(element).trigger(closeEvent);
      return closeEvent;
    };

    _proto._removeElement = function _removeElement(element) {
      var _this = this;

      $(element).removeClass(ClassName.SHOW);

      if (!$(element).hasClass(ClassName.FADE)) {
        this._destroyElement(element);

        return;
      }

      var transitionDuration = Util.getTransitionDurationFromElement(element);
      $(element).one(Util.TRANSITION_END, function (event) {
        return _this._destroyElement(element, event);
      }).emulateTransitionEnd(transitionDuration);
    };

    _proto._destroyElement = function _destroyElement(element) {
      $(element).detach().trigger(Event.CLOSED).remove();
    } // Static
    ;

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$1 = 'button';
  var VERSION$1 = '4.4.1';
  var DATA_KEY$1 = 'bs.button';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var DATA_API_KEY$1 = '.data-api';
  var JQUERY_NO_CONFLICT$1 = $.fn[NAME$1];
  var ClassName$1 = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };
  var Selector$1 = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLES: '[data-toggle="buttons"]',
    DATA_TOGGLE: '[data-toggle="button"]',
    DATA_TOGGLES_BUTTONS: '[data-toggle="buttons"] .btn',
    INPUT: 'input:not([type="hidden"])',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };
  var Event$1 = {
    CLICK_DATA_API: "click" + EVENT_KEY$1 + DATA_API_KEY$1,
    FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY$1 + DATA_API_KEY$1 + " " + ("blur" + EVENT_KEY$1 + DATA_API_KEY$1),
    LOAD_DATA_API: "load" + EVENT_KEY$1 + DATA_API_KEY$1
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button =
  /*#__PURE__*/
  function () {
    function Button(element) {
      this._element = element;
    } // Getters


    var _proto = Button.prototype;

    // Public
    _proto.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = $(this._element).closest(Selector$1.DATA_TOGGLES)[0];

      if (rootElement) {
        var input = this._element.querySelector(Selector$1.INPUT);

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && this._element.classList.contains(ClassName$1.ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = rootElement.querySelector(Selector$1.ACTIVE);

              if (activeElement) {
                $(activeElement).removeClass(ClassName$1.ACTIVE);
              }
            }
          } else if (input.type === 'checkbox') {
            if (this._element.tagName === 'LABEL' && input.checked === this._element.classList.contains(ClassName$1.ACTIVE)) {
              triggerChangeEvent = false;
            }
          } else {
            // if it's not a radio button or checkbox don't add a pointless/invalid checked property to the input
            triggerChangeEvent = false;
          }

          if (triggerChangeEvent) {
            input.checked = !this._element.classList.contains(ClassName$1.ACTIVE);
            $(input).trigger('change');
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (!(this._element.hasAttribute('disabled') || this._element.classList.contains('disabled'))) {
        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName$1.ACTIVE));
        }

        if (triggerChangeEvent) {
          $(this._element).toggleClass(ClassName$1.ACTIVE);
        }
      }
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$1);
      this._element = null;
    } // Static
    ;

    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$1);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY$1, data);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$1;
      }
    }]);

    return Button;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$1.CLICK_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
    var button = event.target;

    if (!$(button).hasClass(ClassName$1.BUTTON)) {
      button = $(button).closest(Selector$1.BUTTON)[0];
    }

    if (!button || button.hasAttribute('disabled') || button.classList.contains('disabled')) {
      event.preventDefault(); // work around Firefox bug #1540995
    } else {
      var inputBtn = button.querySelector(Selector$1.INPUT);

      if (inputBtn && (inputBtn.hasAttribute('disabled') || inputBtn.classList.contains('disabled'))) {
        event.preventDefault(); // work around Firefox bug #1540995

        return;
      }

      Button._jQueryInterface.call($(button), 'toggle');
    }
  }).on(Event$1.FOCUS_BLUR_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector$1.BUTTON)[0];
    $(button).toggleClass(ClassName$1.FOCUS, /^focus(in)?$/.test(event.type));
  });
  $(window).on(Event$1.LOAD_DATA_API, function () {
    // ensure correct active class is set to match the controls' actual values/states
    // find all checkboxes/readio buttons inside data-toggle groups
    var buttons = [].slice.call(document.querySelectorAll(Selector$1.DATA_TOGGLES_BUTTONS));

    for (var i = 0, len = buttons.length; i < len; i++) {
      var button = buttons[i];
      var input = button.querySelector(Selector$1.INPUT);

      if (input.checked || input.hasAttribute('checked')) {
        button.classList.add(ClassName$1.ACTIVE);
      } else {
        button.classList.remove(ClassName$1.ACTIVE);
      }
    } // find all button toggles


    buttons = [].slice.call(document.querySelectorAll(Selector$1.DATA_TOGGLE));

    for (var _i = 0, _len = buttons.length; _i < _len; _i++) {
      var _button = buttons[_i];

      if (_button.getAttribute('aria-pressed') === 'true') {
        _button.classList.add(ClassName$1.ACTIVE);
      } else {
        _button.classList.remove(ClassName$1.ACTIVE);
      }
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$1] = Button._jQueryInterface;
  $.fn[NAME$1].Constructor = Button;

  $.fn[NAME$1].noConflict = function () {
    $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return Button._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$2 = 'carousel';
  var VERSION$2 = '4.4.1';
  var DATA_KEY$2 = 'bs.carousel';
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var DATA_API_KEY$2 = '.data-api';
  var JQUERY_NO_CONFLICT$2 = $.fn[NAME$2];
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };
  var Event$2 = {
    SLIDE: "slide" + EVENT_KEY$2,
    SLID: "slid" + EVENT_KEY$2,
    KEYDOWN: "keydown" + EVENT_KEY$2,
    MOUSEENTER: "mouseenter" + EVENT_KEY$2,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$2,
    TOUCHSTART: "touchstart" + EVENT_KEY$2,
    TOUCHMOVE: "touchmove" + EVENT_KEY$2,
    TOUCHEND: "touchend" + EVENT_KEY$2,
    POINTERDOWN: "pointerdown" + EVENT_KEY$2,
    POINTERUP: "pointerup" + EVENT_KEY$2,
    DRAG_START: "dragstart" + EVENT_KEY$2,
    LOAD_DATA_API: "load" + EVENT_KEY$2 + DATA_API_KEY$2,
    CLICK_DATA_API: "click" + EVENT_KEY$2 + DATA_API_KEY$2
  };
  var ClassName$2 = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item',
    POINTER_EVENT: 'pointer-event'
  };
  var Selector$2 = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    ITEM_IMG: '.carousel-item img',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel =
  /*#__PURE__*/
  function () {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._element = element;
      this._indicatorsElement = this._element.querySelector(Selector$2.INDICATORS);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

      this._addEventListeners();
    } // Getters


    var _proto = Carousel.prototype;

    // Public
    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(Direction.NEXT);
      }
    };

    _proto.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && $(this._element).is(':visible') && $(this._element).css('visibility') !== 'hidden') {
        this.next();
      }
    };

    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(Direction.PREV);
      }
    };

    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (this._element.querySelector(Selector$2.NEXT_PREV)) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    _proto.to = function to(index) {
      var _this = this;

      this._activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $(this._element).one(Event$2.SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

      this._slide(direction, this._items[index]);
    };

    _proto.dispose = function dispose() {
      $(this._element).off(EVENT_KEY$2);
      $.removeData(this._element, DATA_KEY$2);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, Default, {}, config);
      Util.typeCheckConfig(NAME$2, config, DefaultType);
      return config;
    };

    _proto._handleSwipe = function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      var direction = absDeltax / this.touchDeltaX;
      this.touchDeltaX = 0; // swipe left

      if (direction > 0) {
        this.prev();
      } // swipe right


      if (direction < 0) {
        this.next();
      }
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        $(this._element).on(Event$2.KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        $(this._element).on(Event$2.MOUSEENTER, function (event) {
          return _this2.pause(event);
        }).on(Event$2.MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });
      }

      if (this._config.touch) {
        this._addTouchEventListeners();
      }
    };

    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this3 = this;

      if (!this._touchSupported) {
        return;
      }

      var start = function start(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchStartX = event.originalEvent.clientX;
        } else if (!_this3._pointerEvent) {
          _this3.touchStartX = event.originalEvent.touches[0].clientX;
        }
      };

      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
          _this3.touchDeltaX = 0;
        } else {
          _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
        }
      };

      var end = function end(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
        }

        _this3._handleSwipe();

        if (_this3._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this3.pause();

          if (_this3.touchTimeout) {
            clearTimeout(_this3.touchTimeout);
          }

          _this3.touchTimeout = setTimeout(function (event) {
            return _this3.cycle(event);
          }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
        }
      };

      $(this._element.querySelectorAll(Selector$2.ITEM_IMG)).on(Event$2.DRAG_START, function (e) {
        return e.preventDefault();
      });

      if (this._pointerEvent) {
        $(this._element).on(Event$2.POINTERDOWN, function (event) {
          return start(event);
        });
        $(this._element).on(Event$2.POINTERUP, function (event) {
          return end(event);
        });

        this._element.classList.add(ClassName$2.POINTER_EVENT);
      } else {
        $(this._element).on(Event$2.TOUCHSTART, function (event) {
          return start(event);
        });
        $(this._element).on(Event$2.TOUCHMOVE, function (event) {
          return move(event);
        });
        $(this._element).on(Event$2.TOUCHEND, function (event) {
          return end(event);
        });
      }
    };

    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;
      }
    };

    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector$2.ITEM)) : [];
      return this._items.indexOf(element);
    };

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === Direction.PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex(this._element.querySelector(Selector$2.ACTIVE_ITEM));

      var slideEvent = $.Event(Event$2.SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
      $(this._element).trigger(slideEvent);
      return slideEvent;
    };

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector$2.ACTIVE));
        $(indicators).removeClass(ClassName$2.ACTIVE);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $(nextIndicator).addClass(ClassName$2.ACTIVE);
        }
      }
    };

    _proto._slide = function _slide(direction, element) {
      var _this4 = this;

      var activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName$2.LEFT;
        orderClassName = ClassName$2.NEXT;
        eventDirectionName = Direction.LEFT;
      } else {
        directionalClassName = ClassName$2.RIGHT;
        orderClassName = ClassName$2.PREV;
        eventDirectionName = Direction.RIGHT;
      }

      if (nextElement && $(nextElement).hasClass(ClassName$2.ACTIVE)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $.Event(Event$2.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if ($(this._element).hasClass(ClassName$2.SLIDE)) {
        $(nextElement).addClass(orderClassName);
        Util.reflow(nextElement);
        $(activeElement).addClass(directionalClassName);
        $(nextElement).addClass(directionalClassName);
        var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

        if (nextElementInterval) {
          this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
          this._config.interval = nextElementInterval;
        } else {
          this._config.interval = this._config.defaultInterval || this._config.interval;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
        $(activeElement).one(Util.TRANSITION_END, function () {
          $(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName$2.ACTIVE);
          $(activeElement).removeClass(ClassName$2.ACTIVE + " " + orderClassName + " " + directionalClassName);
          _this4._isSliding = false;
          setTimeout(function () {
            return $(_this4._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        $(activeElement).removeClass(ClassName$2.ACTIVE);
        $(nextElement).addClass(ClassName$2.ACTIVE);
        this._isSliding = false;
        $(this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    } // Static
    ;

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$2);

        var _config = _objectSpread2({}, Default, {}, $(this).data());

        if (typeof config === 'object') {
          _config = _objectSpread2({}, _config, {}, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $(this).data(DATA_KEY$2, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new TypeError("No method named \"" + action + "\"");
          }

          data[action]();
        } else if (_config.interval && _config.ride) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $(selector)[0];

      if (!target || !$(target).hasClass(ClassName$2.CAROUSEL)) {
        return;
      }

      var config = _objectSpread2({}, $(target).data(), {}, $(this).data());

      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($(target), config);

      if (slideIndex) {
        $(target).data(DATA_KEY$2).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$2;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$2.CLICK_DATA_API, Selector$2.DATA_SLIDE, Carousel._dataApiClickHandler);
  $(window).on(Event$2.LOAD_DATA_API, function () {
    var carousels = [].slice.call(document.querySelectorAll(Selector$2.DATA_RIDE));

    for (var i = 0, len = carousels.length; i < len; i++) {
      var $carousel = $(carousels[i]);

      Carousel._jQueryInterface.call($carousel, $carousel.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$2] = Carousel._jQueryInterface;
  $.fn[NAME$2].Constructor = Carousel;

  $.fn[NAME$2].noConflict = function () {
    $.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return Carousel._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$3 = 'collapse';
  var VERSION$3 = '4.4.1';
  var DATA_KEY$3 = 'bs.collapse';
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var DATA_API_KEY$3 = '.data-api';
  var JQUERY_NO_CONFLICT$3 = $.fn[NAME$3];
  var Default$1 = {
    toggle: true,
    parent: ''
  };
  var DefaultType$1 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var Event$3 = {
    SHOW: "show" + EVENT_KEY$3,
    SHOWN: "shown" + EVENT_KEY$3,
    HIDE: "hide" + EVENT_KEY$3,
    HIDDEN: "hidden" + EVENT_KEY$3,
    CLICK_DATA_API: "click" + EVENT_KEY$3 + DATA_API_KEY$3
  };
  var ClassName$3 = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };
  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };
  var Selector$3 = {
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse =
  /*#__PURE__*/
  function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
      var toggleList = [].slice.call(document.querySelectorAll(Selector$3.DATA_TOGGLE));

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = Util.getSelectorFromElement(elem);
        var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
          return foundElem === element;
        });

        if (selector !== null && filterElement.length > 0) {
          this._selector = selector;

          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters


    var _proto = Collapse.prototype;

    // Public
    _proto.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName$3.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || $(this._element).hasClass(ClassName$3.SHOW)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = [].slice.call(this._parent.querySelectorAll(Selector$3.ACTIVES)).filter(function (elem) {
          if (typeof _this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === _this._config.parent;
          }

          return elem.classList.contains(ClassName$3.COLLAPSE);
        });

        if (actives.length === 0) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).not(this._selector).data(DATA_KEY$3);

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(Event$3.SHOW);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide');

        if (!activesData) {
          $(actives).data(DATA_KEY$3, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName$3.COLLAPSE).addClass(ClassName$3.COLLAPSING);
      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName$3.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).addClass(ClassName$3.SHOW);
        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $(_this._element).trigger(Event$3.SHOWN);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$(this._element).hasClass(ClassName$3.SHOW)) {
        return;
      }

      var startEvent = $.Event(Event$3.HIDE);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      Util.reflow(this._element);
      $(this._element).addClass(ClassName$3.COLLAPSING).removeClass(ClassName$3.COLLAPSE).removeClass(ClassName$3.SHOW);
      var triggerArrayLength = this._triggerArray.length;

      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) {
            var $elem = $([].slice.call(document.querySelectorAll(selector)));

            if (!$elem.hasClass(ClassName$3.SHOW)) {
              $(trigger).addClass(ClassName$3.COLLAPSED).attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);

        $(_this2._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).trigger(Event$3.HIDDEN);
      };

      this._element.style[dimension] = '';
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$3);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, Default$1, {}, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      Util.typeCheckConfig(NAME$3, config, DefaultType$1);
      return config;
    };

    _proto._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    _proto._getParent = function _getParent() {
      var _this3 = this;

      var parent;

      if (Util.isElement(this._config.parent)) {
        parent = this._config.parent; // It's a jQuery object

        if (typeof this._config.parent.jquery !== 'undefined') {
          parent = this._config.parent[0];
        }
      } else {
        parent = document.querySelector(this._config.parent);
      }

      var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
      var children = [].slice.call(parent.querySelectorAll(selector));
      $(children).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });
      return parent;
    };

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      var isOpen = $(element).hasClass(ClassName$3.SHOW);

      if (triggerArray.length) {
        $(triggerArray).toggleClass(ClassName$3.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
      }
    } // Static
    ;

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? document.querySelector(selector) : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY$3);

        var _config = _objectSpread2({}, Default$1, {}, $this.data(), {}, typeof config === 'object' && config ? config : {});

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY$3, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$3;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$1;
      }
    }]);

    return Collapse;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$3.CLICK_DATA_API, Selector$3.DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    var $trigger = $(this);
    var selector = Util.getSelectorFromElement(this);
    var selectors = [].slice.call(document.querySelectorAll(selector));
    $(selectors).each(function () {
      var $target = $(this);
      var data = $target.data(DATA_KEY$3);
      var config = data ? 'toggle' : $trigger.data();

      Collapse._jQueryInterface.call($target, config);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$3] = Collapse._jQueryInterface;
  $.fn[NAME$3].Constructor = Collapse;

  $.fn[NAME$3].noConflict = function () {
    $.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return Collapse._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$4 = 'dropdown';
  var VERSION$4 = '4.4.1';
  var DATA_KEY$4 = 'bs.dropdown';
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var DATA_API_KEY$4 = '.data-api';
  var JQUERY_NO_CONFLICT$4 = $.fn[NAME$4];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
  var Event$4 = {
    HIDE: "hide" + EVENT_KEY$4,
    HIDDEN: "hidden" + EVENT_KEY$4,
    SHOW: "show" + EVENT_KEY$4,
    SHOWN: "shown" + EVENT_KEY$4,
    CLICK: "click" + EVENT_KEY$4,
    CLICK_DATA_API: "click" + EVENT_KEY$4 + DATA_API_KEY$4,
    KEYDOWN_DATA_API: "keydown" + EVENT_KEY$4 + DATA_API_KEY$4,
    KEYUP_DATA_API: "keyup" + EVENT_KEY$4 + DATA_API_KEY$4
  };
  var ClassName$4 = {
    DISABLED: 'disabled',
    SHOW: 'show',
    DROPUP: 'dropup',
    DROPRIGHT: 'dropright',
    DROPLEFT: 'dropleft',
    MENURIGHT: 'dropdown-menu-right',
    MENULEFT: 'dropdown-menu-left',
    POSITION_STATIC: 'position-static'
  };
  var Selector$4 = {
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    MENU: '.dropdown-menu',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
  };
  var AttachmentMap = {
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end',
    RIGHT: 'right-start',
    RIGHTEND: 'right-end',
    LEFT: 'left-start',
    LEFTEND: 'left-end'
  };
  var Default$2 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic',
    popperConfig: null
  };
  var DefaultType$2 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string',
    popperConfig: '(null|object)'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown =
  /*#__PURE__*/
  function () {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    } // Getters


    var _proto = Dropdown.prototype;

    // Public
    _proto.toggle = function toggle() {
      if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED)) {
        return;
      }

      var isActive = $(this._menu).hasClass(ClassName$4.SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      }

      this.show(true);
    };

    _proto.show = function show(usePopper) {
      if (usePopper === void 0) {
        usePopper = false;
      }

      if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || $(this._menu).hasClass(ClassName$4.SHOW)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $.Event(Event$4.SHOW, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      } // Disable totally Popper.js for Dropdown in Navbar


      if (!this._inNavbar && usePopper) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
        }

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (Util.isElement(this._config.reference)) {
          referenceElement = this._config.reference; // Check if it's jQuery element

          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        } // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251


        if (this._config.boundary !== 'scrollParent') {
          $(parent).addClass(ClassName$4.POSITION_STATIC);
        }

        this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && $(parent).closest(Selector$4.NAVBAR_NAV).length === 0) {
        $(document.body).children().on('mouseover', null, $.noop);
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
    };

    _proto.hide = function hide() {
      if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || !$(this._menu).hasClass(ClassName$4.SHOW)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var hideEvent = $.Event(Event$4.HIDE, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $(parent).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      if (this._popper) {
        this._popper.destroy();
      }

      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$4);
      $(this._element).off(EVENT_KEY$4);
      this._element = null;
      this._menu = null;

      if (this._popper !== null) {
        this._popper.destroy();

        this._popper = null;
      }
    };

    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Private
    ;

    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;

      $(this._element).on(Event$4.CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();

        _this.toggle();
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, this.constructor.Default, {}, $(this._element).data(), {}, config);
      Util.typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
      return config;
    };

    _proto._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);

        if (parent) {
          this._menu = parent.querySelector(Selector$4.MENU);
        }
      }

      return this._menu;
    };

    _proto._getPlacement = function _getPlacement() {
      var $parentDropdown = $(this._element.parentNode);
      var placement = AttachmentMap.BOTTOM; // Handle dropup

      if ($parentDropdown.hasClass(ClassName$4.DROPUP)) {
        placement = AttachmentMap.TOP;

        if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
          placement = AttachmentMap.TOPEND;
        }
      } else if ($parentDropdown.hasClass(ClassName$4.DROPRIGHT)) {
        placement = AttachmentMap.RIGHT;
      } else if ($parentDropdown.hasClass(ClassName$4.DROPLEFT)) {
        placement = AttachmentMap.LEFT;
      } else if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
        placement = AttachmentMap.BOTTOMEND;
      }

      return placement;
    };

    _proto._detectNavbar = function _detectNavbar() {
      return $(this._element).closest('.navbar').length > 0;
    };

    _proto._getOffset = function _getOffset() {
      var _this2 = this;

      var offset = {};

      if (typeof this._config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _objectSpread2({}, data.offsets, {}, _this2._config.offset(data.offsets, _this2._element) || {});
          return data;
        };
      } else {
        offset.offset = this._config.offset;
      }

      return offset;
    };

    _proto._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        }
      }; // Disable Popper.js if we have a static display

      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }

      return _objectSpread2({}, popperConfig, {}, this._config.popperConfig);
    } // Static
    ;

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$4);

        var _config = typeof config === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
          $(this).data(DATA_KEY$4, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = [].slice.call(document.querySelectorAll(Selector$4.DATA_TOGGLE));

      for (var i = 0, len = toggles.length; i < len; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);

        var context = $(toggles[i]).data(DATA_KEY$4);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;

        if (!$(parent).hasClass(ClassName$4.SHOW)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $.Event(Event$4.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          continue;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().off('mouseover', null, $.noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        if (context._popper) {
          context._popper.destroy();
        }

        $(dropdownMenu).removeClass(ClassName$4.SHOW);
        $(parent).removeClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = document.querySelector(selector);
      }

      return parent || element.parentNode;
    } // eslint-disable-next-line complexity
    ;

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $(event.target).closest(Selector$4.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $(this).hasClass(ClassName$4.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);

      var isActive = $(parent).hasClass(ClassName$4.SHOW);

      if (!isActive && event.which === ESCAPE_KEYCODE) {
        return;
      }

      if (!isActive || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
        if (event.which === ESCAPE_KEYCODE) {
          var toggle = parent.querySelector(Selector$4.DATA_TOGGLE);
          $(toggle).trigger('focus');
        }

        $(this).trigger('click');
        return;
      }

      var items = [].slice.call(parent.querySelectorAll(Selector$4.VISIBLE_ITEMS)).filter(function (item) {
        return $(item).is(':visible');
      });

      if (items.length === 0) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // Up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // Down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$4;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$2;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$2;
      }
    }]);

    return Dropdown;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$4.KEYDOWN_DATA_API, Selector$4.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event$4.KEYDOWN_DATA_API, Selector$4.MENU, Dropdown._dataApiKeydownHandler).on(Event$4.CLICK_DATA_API + " " + Event$4.KEYUP_DATA_API, Dropdown._clearMenus).on(Event$4.CLICK_DATA_API, Selector$4.DATA_TOGGLE, function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($(this), 'toggle');
  }).on(Event$4.CLICK_DATA_API, Selector$4.FORM_CHILD, function (e) {
    e.stopPropagation();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$4] = Dropdown._jQueryInterface;
  $.fn[NAME$4].Constructor = Dropdown;

  $.fn[NAME$4].noConflict = function () {
    $.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return Dropdown._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$5 = 'modal';
  var VERSION$5 = '4.4.1';
  var DATA_KEY$5 = 'bs.modal';
  var EVENT_KEY$5 = "." + DATA_KEY$5;
  var DATA_API_KEY$5 = '.data-api';
  var JQUERY_NO_CONFLICT$5 = $.fn[NAME$5];
  var ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default$3 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType$3 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var Event$5 = {
    HIDE: "hide" + EVENT_KEY$5,
    HIDE_PREVENTED: "hidePrevented" + EVENT_KEY$5,
    HIDDEN: "hidden" + EVENT_KEY$5,
    SHOW: "show" + EVENT_KEY$5,
    SHOWN: "shown" + EVENT_KEY$5,
    FOCUSIN: "focusin" + EVENT_KEY$5,
    RESIZE: "resize" + EVENT_KEY$5,
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$5,
    KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY$5,
    MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY$5,
    MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY$5,
    CLICK_DATA_API: "click" + EVENT_KEY$5 + DATA_API_KEY$5
  };
  var ClassName$5 = {
    SCROLLABLE: 'modal-dialog-scrollable',
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show',
    STATIC: 'modal-static'
  };
  var Selector$5 = {
    DIALOG: '.modal-dialog',
    MODAL_BODY: '.modal-body',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    STICKY_CONTENT: '.sticky-top'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal =
  /*#__PURE__*/
  function () {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = element.querySelector(Selector$5.DIALOG);
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollbarWidth = 0;
    } // Getters


    var _proto = Modal.prototype;

    // Public
    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isShown || this._isTransitioning) {
        return;
      }

      if ($(this._element).hasClass(ClassName$5.FADE)) {
        this._isTransitioning = true;
      }

      var showEvent = $.Event(Event$5.SHOW, {
        relatedTarget: relatedTarget
      });
      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      $(this._element).on(Event$5.CLICK_DISMISS, Selector$5.DATA_DISMISS, function (event) {
        return _this.hide(event);
      });
      $(this._dialog).on(Event$5.MOUSEDOWN_DISMISS, function () {
        $(_this._element).one(Event$5.MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return;
      }

      var hideEvent = $.Event(Event$5.HIDE);
      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;
      var transition = $(this._element).hasClass(ClassName$5.FADE);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      $(document).off(Event$5.FOCUSIN);
      $(this._element).removeClass(ClassName$5.SHOW);
      $(this._element).off(Event$5.CLICK_DISMISS);
      $(this._dialog).off(Event$5.MOUSEDOWN_DISMISS);

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        this._hideModal();
      }
    };

    _proto.dispose = function dispose() {
      [window, this._element, this._dialog].forEach(function (htmlElement) {
        return $(htmlElement).off(EVENT_KEY$5);
      });
      /**
       * `document` has 2 events `Event.FOCUSIN` and `Event.CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `Event.CLICK_DATA_API` event that should remain
       */

      $(document).off(Event$5.FOCUSIN);
      $.removeData(this._element, DATA_KEY$5);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    };

    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, Default$3, {}, config);
      Util.typeCheckConfig(NAME$5, config, DefaultType$3);
      return config;
    };

    _proto._triggerBackdropTransition = function _triggerBackdropTransition() {
      var _this3 = this;

      if (this._config.backdrop === 'static') {
        var hideEventPrevented = $.Event(Event$5.HIDE_PREVENTED);
        $(this._element).trigger(hideEventPrevented);

        if (hideEventPrevented.defaultPrevented) {
          return;
        }

        this._element.classList.add(ClassName$5.STATIC);

        var modalTransitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, function () {
          _this3._element.classList.remove(ClassName$5.STATIC);
        }).emulateTransitionEnd(modalTransitionDuration);

        this._element.focus();
      } else {
        this.hide();
      }
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this4 = this;

      var transition = $(this._element).hasClass(ClassName$5.FADE);
      var modalBody = this._dialog ? this._dialog.querySelector(Selector$5.MODAL_BODY) : null;

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      if ($(this._dialog).hasClass(ClassName$5.SCROLLABLE) && modalBody) {
        modalBody.scrollTop = 0;
      } else {
        this._element.scrollTop = 0;
      }

      if (transition) {
        Util.reflow(this._element);
      }

      $(this._element).addClass(ClassName$5.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $.Event(Event$5.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this4._config.focus) {
          _this4._element.focus();
        }

        _this4._isTransitioning = false;
        $(_this4._element).trigger(shownEvent);
      };

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
        $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
      } else {
        transitionComplete();
      }
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this5 = this;

      $(document).off(Event$5.FOCUSIN) // Guard against infinite focus loop
      .on(Event$5.FOCUSIN, function (event) {
        if (document !== event.target && _this5._element !== event.target && $(_this5._element).has(event.target).length === 0) {
          _this5._element.focus();
        }
      });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this6 = this;

      if (this._isShown && this._config.keyboard) {
        $(this._element).on(Event$5.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE$1) {
            _this6._triggerBackdropTransition();
          }
        });
      } else if (!this._isShown) {
        $(this._element).off(Event$5.KEYDOWN_DISMISS);
      }
    };

    _proto._setResizeEvent = function _setResizeEvent() {
      var _this7 = this;

      if (this._isShown) {
        $(window).on(Event$5.RESIZE, function (event) {
          return _this7.handleUpdate(event);
        });
      } else {
        $(window).off(Event$5.RESIZE);
      }
    };

    _proto._hideModal = function _hideModal() {
      var _this8 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._isTransitioning = false;

      this._showBackdrop(function () {
        $(document.body).removeClass(ClassName$5.OPEN);

        _this8._resetAdjustments();

        _this8._resetScrollbar();

        $(_this8._element).trigger(Event$5.HIDDEN);
      });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this9 = this;

      var animate = $(this._element).hasClass(ClassName$5.FADE) ? ClassName$5.FADE : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName$5.BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        }

        $(this._backdrop).appendTo(document.body);
        $(this._element).on(Event$5.CLICK_DISMISS, function (event) {
          if (_this9._ignoreBackdropClick) {
            _this9._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          _this9._triggerBackdropTransition();
        });

        if (animate) {
          Util.reflow(this._backdrop);
        }

        $(this._backdrop).addClass(ClassName$5.SHOW);

        if (!callback) {
          return;
        }

        if (!animate) {
          callback();
          return;
        }

        var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName$5.SHOW);

        var callbackRemove = function callbackRemove() {
          _this9._removeBackdrop();

          if (callback) {
            callback();
          }
        };

        if ($(this._element).hasClass(ClassName$5.FADE)) {
          var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

          $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------
    ;

    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
      var _this10 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
        var stickyContent = [].slice.call(document.querySelectorAll(Selector$5.STICKY_CONTENT)); // Adjust fixed content padding

        $(fixedContent).each(function (index, element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = $(element).css('padding-right');
          $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this10._scrollbarWidth + "px");
        }); // Adjust sticky content margin

        $(stickyContent).each(function (index, element) {
          var actualMargin = element.style.marginRight;
          var calculatedMargin = $(element).css('margin-right');
          $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this10._scrollbarWidth + "px");
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = $(document.body).css('padding-right');
        $(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
      }

      $(document.body).addClass(ClassName$5.OPEN);
    };

    _proto._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
      $(fixedContent).each(function (index, element) {
        var padding = $(element).data('padding-right');
        $(element).removeData('padding-right');
        element.style.paddingRight = padding ? padding : '';
      }); // Restore sticky content

      var elements = [].slice.call(document.querySelectorAll("" + Selector$5.STICKY_CONTENT));
      $(elements).each(function (index, element) {
        var margin = $(element).data('margin-right');

        if (typeof margin !== 'undefined') {
          $(element).css('margin-right', margin).removeData('margin-right');
        }
      }); // Restore body padding

      var padding = $(document.body).data('padding-right');
      $(document.body).removeData('padding-right');
      document.body.style.paddingRight = padding ? padding : '';
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName$5.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    } // Static
    ;

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$5);

        var _config = _objectSpread2({}, Default$3, {}, $(this).data(), {}, typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new Modal(this, _config);
          $(this).data(DATA_KEY$5, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$5;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$3;
      }
    }]);

    return Modal;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$5.CLICK_DATA_API, Selector$5.DATA_TOGGLE, function (event) {
    var _this11 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = document.querySelector(selector);
    }

    var config = $(target).data(DATA_KEY$5) ? 'toggle' : _objectSpread2({}, $(target).data(), {}, $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $(target).one(Event$5.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event$5.HIDDEN, function () {
        if ($(_this11).is(':visible')) {
          _this11.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$5] = Modal._jQueryInterface;
  $.fn[NAME$5].Constructor = Modal;

  $.fn[NAME$5].noConflict = function () {
    $.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return Modal._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.4.1): tools/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

  function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, l = regExp.length; i < l; i++) {
      if (attrName.match(regExp[i])) {
        return true;
      }
    }

    return false;
  }

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var whitelistKeys = Object.keys(whiteList);
    var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

    var _loop = function _loop(i, len) {
      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }

      var attributeList = [].slice.call(el.attributes);
      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$6 = 'tooltip';
  var VERSION$6 = '4.4.1';
  var DATA_KEY$6 = 'bs.tooltip';
  var EVENT_KEY$6 = "." + DATA_KEY$6;
  var JQUERY_NO_CONFLICT$6 = $.fn[NAME$6];
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
  var DefaultType$4 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    whiteList: 'object',
    popperConfig: '(null|object)'
  };
  var AttachmentMap$1 = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default$4 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist,
    popperConfig: null
  };
  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };
  var Event$6 = {
    HIDE: "hide" + EVENT_KEY$6,
    HIDDEN: "hidden" + EVENT_KEY$6,
    SHOW: "show" + EVENT_KEY$6,
    SHOWN: "shown" + EVENT_KEY$6,
    INSERTED: "inserted" + EVENT_KEY$6,
    CLICK: "click" + EVENT_KEY$6,
    FOCUSIN: "focusin" + EVENT_KEY$6,
    FOCUSOUT: "focusout" + EVENT_KEY$6,
    MOUSEENTER: "mouseenter" + EVENT_KEY$6,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$6
  };
  var ClassName$6 = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$6 = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner',
    ARROW: '.arrow'
  };
  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip =
  /*#__PURE__*/
  function () {
    function Tooltip(element, config) {
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');
      } // private


      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // Protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    } // Getters


    var _proto = Tooltip.prototype;

    // Public
    _proto.enable = function enable() {
      this._isEnabled = true;
    };

    _proto.disable = function disable() {
      this._isEnabled = false;
    };

    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if ($(this.getTipElement()).hasClass(ClassName$6.SHOW)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      $.removeData(this.element, this.constructor.DATA_KEY);
      $(this.element).off(this.constructor.EVENT_KEY);
      $(this.element).closest('.modal').off('hide.bs.modal', this._hideModalHandler);

      if (this.tip) {
        $(this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;

      if (this._popper) {
        this._popper.destroy();
      }

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    };

    _proto.show = function show() {
      var _this = this;

      if ($(this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $.Event(this.constructor.Event.SHOW);

      if (this.isWithContent() && this._isEnabled) {
        $(this.element).trigger(showEvent);
        var shadowRoot = Util.findShadowRoot(this.element);
        var isInTheDom = $.contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();

        if (this.config.animation) {
          $(tip).addClass(ClassName$6.FADE);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        this.addAttachmentClass(attachment);

        var container = this._getContainer();

        $(tip).data(this.constructor.DATA_KEY, this);

        if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
          $(tip).appendTo(container);
        }

        $(this.element).trigger(this.constructor.Event.INSERTED);
        this._popper = new Popper(this.element, tip, this._getPopperConfig(attachment));
        $(tip).addClass(ClassName$6.SHOW); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().on('mouseover', null, $.noop);
        }

        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          }

          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          $(_this.element).trigger(_this.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            _this._leave(null, _this);
          }
        };

        if ($(this.tip).hasClass(ClassName$6.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
          $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      }
    };

    _proto.hide = function hide(callback) {
      var _this2 = this;

      var tip = this.getTipElement();
      var hideEvent = $.Event(this.constructor.Event.HIDE);

      var complete = function complete() {
        if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2._cleanTipClass();

        _this2.element.removeAttribute('aria-describedby');

        $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

        if (_this2._popper !== null) {
          _this2._popper.destroy();
        }

        if (callback) {
          callback();
        }
      };

      $(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(tip).removeClass(ClassName$6.SHOW); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        $(document.body).children().off('mouseover', null, $.noop);
      }

      this._activeTrigger[Trigger.CLICK] = false;
      this._activeTrigger[Trigger.FOCUS] = false;
      this._activeTrigger[Trigger.HOVER] = false;

      if ($(this.tip).hasClass(ClassName$6.FADE)) {
        var transitionDuration = Util.getTransitionDurationFromElement(tip);
        $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Protected
    ;

    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $(this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var tip = this.getTipElement();
      this.setElementContent($(tip.querySelectorAll(Selector$6.TOOLTIP_INNER)), this.getTitle());
      $(tip).removeClass(ClassName$6.FADE + " " + ClassName$6.SHOW);
    };

    _proto.setElementContent = function setElementContent($element, content) {
      if (typeof content === 'object' && (content.nodeType || content.jquery)) {
        // Content is a DOM node or a jQuery
        if (this.config.html) {
          if (!$(content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($(content).text());
        }

        return;
      }

      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
        }

        $element.html(content);
      } else {
        $element.text(content);
      }
    };

    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    } // Private
    ;

    _proto._getPopperConfig = function _getPopperConfig(attachment) {
      var _this3 = this;

      var defaultBsConfig = {
        placement: attachment,
        modifiers: {
          offset: this._getOffset(),
          flip: {
            behavior: this.config.fallbackPlacement
          },
          arrow: {
            element: Selector$6.ARROW
          },
          preventOverflow: {
            boundariesElement: this.config.boundary
          }
        },
        onCreate: function onCreate(data) {
          if (data.originalPlacement !== data.placement) {
            _this3._handlePopperPlacementChange(data);
          }
        },
        onUpdate: function onUpdate(data) {
          return _this3._handlePopperPlacementChange(data);
        }
      };
      return _objectSpread2({}, defaultBsConfig, {}, this.config.popperConfig);
    };

    _proto._getOffset = function _getOffset() {
      var _this4 = this;

      var offset = {};

      if (typeof this.config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _objectSpread2({}, data.offsets, {}, _this4.config.offset(data.offsets, _this4.element) || {});
          return data;
        };
      } else {
        offset.offset = this.config.offset;
      }

      return offset;
    };

    _proto._getContainer = function _getContainer() {
      if (this.config.container === false) {
        return document.body;
      }

      if (Util.isElement(this.config.container)) {
        return $(this.config.container);
      }

      return $(document).find(this.config.container);
    };

    _proto._getAttachment = function _getAttachment(placement) {
      return AttachmentMap$1[placement.toUpperCase()];
    };

    _proto._setListeners = function _setListeners() {
      var _this5 = this;

      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $(_this5.element).on(_this5.constructor.Event.CLICK, _this5.config.selector, function (event) {
            return _this5.toggle(event);
          });
        } else if (trigger !== Trigger.MANUAL) {
          var eventIn = trigger === Trigger.HOVER ? _this5.constructor.Event.MOUSEENTER : _this5.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.HOVER ? _this5.constructor.Event.MOUSELEAVE : _this5.constructor.Event.FOCUSOUT;
          $(_this5.element).on(eventIn, _this5.config.selector, function (event) {
            return _this5._enter(event);
          }).on(eventOut, _this5.config.selector, function (event) {
            return _this5._leave(event);
          });
        }
      });

      this._hideModalHandler = function () {
        if (_this5.element) {
          _this5.hide();
        }
      };

      $(this.element).closest('.modal').on('hide.bs.modal', this._hideModalHandler);

      if (this.config.selector) {
        this.config = _objectSpread2({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    _proto._fixTitle = function _fixTitle() {
      var titleType = typeof this.element.getAttribute('data-original-title');

      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    _proto._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
      }

      if ($(context.getTipElement()).hasClass(ClassName$6.SHOW) || context._hoverState === HoverState.SHOW) {
        context._hoverState = HoverState.SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HoverState.SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    _proto._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    _proto._getConfig = function _getConfig(config) {
      var dataAttributes = $(this.element).data();
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
          delete dataAttributes[dataAttr];
        }
      });
      config = _objectSpread2({}, this.constructor.Default, {}, dataAttributes, {}, typeof config === 'object' && config ? config : {});

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      Util.typeCheckConfig(NAME$6, config, this.constructor.DefaultType);

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
      }

      return config;
    };

    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length) {
        $tip.removeClass(tabClass.join(''));
      }
    };

    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
      var popperInstance = popperData.instance;
      this.tip = popperInstance.popper;

      this._cleanTipClass();

      this.addAttachmentClass(this._getAttachment(popperData.placement));
    };

    _proto._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) {
        return;
      }

      $(tip).removeClass(ClassName$6.FADE);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    } // Static
    ;

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$6);

        var _config = typeof config === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $(this).data(DATA_KEY$6, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$6;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$4;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$6;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$6;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$6;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$6;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$4;
      }
    }]);

    return Tooltip;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$6] = Tooltip._jQueryInterface;
  $.fn[NAME$6].Constructor = Tooltip;

  $.fn[NAME$6].noConflict = function () {
    $.fn[NAME$6] = JQUERY_NO_CONFLICT$6;
    return Tooltip._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$7 = 'popover';
  var VERSION$7 = '4.4.1';
  var DATA_KEY$7 = 'bs.popover';
  var EVENT_KEY$7 = "." + DATA_KEY$7;
  var JQUERY_NO_CONFLICT$7 = $.fn[NAME$7];
  var CLASS_PREFIX$1 = 'bs-popover';
  var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');

  var Default$5 = _objectSpread2({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultType$5 = _objectSpread2({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName$7 = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$7 = {
    TITLE: '.popover-header',
    CONTENT: '.popover-body'
  };
  var Event$7 = {
    HIDE: "hide" + EVENT_KEY$7,
    HIDDEN: "hidden" + EVENT_KEY$7,
    SHOW: "show" + EVENT_KEY$7,
    SHOWN: "shown" + EVENT_KEY$7,
    INSERTED: "inserted" + EVENT_KEY$7,
    CLICK: "click" + EVENT_KEY$7,
    FOCUSIN: "focusin" + EVENT_KEY$7,
    FOCUSOUT: "focusout" + EVENT_KEY$7,
    MOUSEENTER: "mouseenter" + EVENT_KEY$7,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$7
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover =
  /*#__PURE__*/
  function (_Tooltip) {
    _inheritsLoose(Popover, _Tooltip);

    function Popover() {
      return _Tooltip.apply(this, arguments) || this;
    }

    var _proto = Popover.prototype;

    // Overrides
    _proto.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX$1 + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $(this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var $tip = $(this.getTipElement()); // We use append for html objects to maintain js events

      this.setElementContent($tip.find(Selector$7.TITLE), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this.element);
      }

      this.setElementContent($tip.find(Selector$7.CONTENT), content);
      $tip.removeClass(ClassName$7.FADE + " " + ClassName$7.SHOW);
    } // Private
    ;

    _proto._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || this.config.content;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);

      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    } // Static
    ;

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$7);

        var _config = typeof config === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $(this).data(DATA_KEY$7, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: "VERSION",
      // Getters
      get: function get() {
        return VERSION$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$5;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$7;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$7;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$7;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$7;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$5;
      }
    }]);

    return Popover;
  }(Tooltip);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$7] = Popover._jQueryInterface;
  $.fn[NAME$7].Constructor = Popover;

  $.fn[NAME$7].noConflict = function () {
    $.fn[NAME$7] = JQUERY_NO_CONFLICT$7;
    return Popover._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$8 = 'scrollspy';
  var VERSION$8 = '4.4.1';
  var DATA_KEY$8 = 'bs.scrollspy';
  var EVENT_KEY$8 = "." + DATA_KEY$8;
  var DATA_API_KEY$6 = '.data-api';
  var JQUERY_NO_CONFLICT$8 = $.fn[NAME$8];
  var Default$6 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType$6 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var Event$8 = {
    ACTIVATE: "activate" + EVENT_KEY$8,
    SCROLL: "scroll" + EVENT_KEY$8,
    LOAD_DATA_API: "load" + EVENT_KEY$8 + DATA_API_KEY$6
  };
  var ClassName$8 = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active'
  };
  var Selector$8 = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    NAV_LIST_GROUP: '.nav, .list-group',
    NAV_LINKS: '.nav-link',
    NAV_ITEMS: '.nav-item',
    LIST_ITEMS: '.list-group-item',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };
  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy =
  /*#__PURE__*/
  function () {
    function ScrollSpy(element, config) {
      var _this = this;

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + Selector$8.NAV_LINKS + "," + (this._config.target + " " + Selector$8.LIST_ITEMS + ",") + (this._config.target + " " + Selector$8.DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      $(this._scrollElement).on(Event$8.SCROLL, function (event) {
        return _this._process(event);
      });
      this.refresh();

      this._process();
    } // Getters


    var _proto = ScrollSpy.prototype;

    // Public
    _proto.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = [].slice.call(document.querySelectorAll(this._selector));
      targets.map(function (element) {
        var target;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = document.querySelector(targetSelector);
        }

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            // TODO (fat): remove sketch reliance on jQuery position/offset
            return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      });
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$8);
      $(this._scrollElement).off(EVENT_KEY$8);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, Default$6, {}, typeof config === 'object' && config ? config : {});

      if (typeof config.target !== 'string') {
        var id = $(config.target).attr('id');

        if (!id) {
          id = Util.getUID(NAME$8);
          $(config.target).attr('id', id);
        }

        config.target = "#" + id;
      }

      Util.typeCheckConfig(NAME$8, config, DefaultType$6);
      return config;
    };

    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      var offsetLength = this._offsets.length;

      for (var i = offsetLength; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    _proto._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function (selector) {
        return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
      });

      var $link = $([].slice.call(document.querySelectorAll(queries.join(','))));

      if ($link.hasClass(ClassName$8.DROPDOWN_ITEM)) {
        $link.closest(Selector$8.DROPDOWN).find(Selector$8.DROPDOWN_TOGGLE).addClass(ClassName$8.ACTIVE);
        $link.addClass(ClassName$8.ACTIVE);
      } else {
        // Set triggered link as active
        $link.addClass(ClassName$8.ACTIVE); // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

        $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_LINKS + ", " + Selector$8.LIST_ITEMS).addClass(ClassName$8.ACTIVE); // Handle special case when .nav-link is inside .nav-item

        $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_ITEMS).children(Selector$8.NAV_LINKS).addClass(ClassName$8.ACTIVE);
      }

      $(this._scrollElement).trigger(Event$8.ACTIVATE, {
        relatedTarget: target
      });
    };

    _proto._clear = function _clear() {
      [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
        return node.classList.contains(ClassName$8.ACTIVE);
      }).forEach(function (node) {
        return node.classList.remove(ClassName$8.ACTIVE);
      });
    } // Static
    ;

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$8);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $(this).data(DATA_KEY$8, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$8;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$6;
      }
    }]);

    return ScrollSpy;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(window).on(Event$8.LOAD_DATA_API, function () {
    var scrollSpys = [].slice.call(document.querySelectorAll(Selector$8.DATA_SPY));
    var scrollSpysLength = scrollSpys.length;

    for (var i = scrollSpysLength; i--;) {
      var $spy = $(scrollSpys[i]);

      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$8] = ScrollSpy._jQueryInterface;
  $.fn[NAME$8].Constructor = ScrollSpy;

  $.fn[NAME$8].noConflict = function () {
    $.fn[NAME$8] = JQUERY_NO_CONFLICT$8;
    return ScrollSpy._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$9 = 'tab';
  var VERSION$9 = '4.4.1';
  var DATA_KEY$9 = 'bs.tab';
  var EVENT_KEY$9 = "." + DATA_KEY$9;
  var DATA_API_KEY$7 = '.data-api';
  var JQUERY_NO_CONFLICT$9 = $.fn[NAME$9];
  var Event$9 = {
    HIDE: "hide" + EVENT_KEY$9,
    HIDDEN: "hidden" + EVENT_KEY$9,
    SHOW: "show" + EVENT_KEY$9,
    SHOWN: "shown" + EVENT_KEY$9,
    CLICK_DATA_API: "click" + EVENT_KEY$9 + DATA_API_KEY$7
  };
  var ClassName$9 = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$9 = {
    DROPDOWN: '.dropdown',
    NAV_LIST_GROUP: '.nav, .list-group',
    ACTIVE: '.active',
    ACTIVE_UL: '> li > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab =
  /*#__PURE__*/
  function () {
    function Tab(element) {
      this._element = element;
    } // Getters


    var _proto = Tab.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName$9.ACTIVE) || $(this._element).hasClass(ClassName$9.DISABLED)) {
        return;
      }

      var target;
      var previous;
      var listElement = $(this._element).closest(Selector$9.NAV_LIST_GROUP)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? Selector$9.ACTIVE_UL : Selector$9.ACTIVE;
        previous = $.makeArray($(listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $.Event(Event$9.HIDE, {
        relatedTarget: this._element
      });
      var showEvent = $.Event(Event$9.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $(previous).trigger(hideEvent);
      }

      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = document.querySelector(selector);
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $.Event(Event$9.HIDDEN, {
          relatedTarget: _this._element
        });
        var shownEvent = $.Event(Event$9.SHOWN, {
          relatedTarget: previous
        });
        $(previous).trigger(hiddenEvent);
        $(_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$9);
      this._element = null;
    } // Private
    ;

    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $(container).find(Selector$9.ACTIVE_UL) : $(container).children(Selector$9.ACTIVE);
      var active = activeElements[0];
      var isTransitioning = callback && active && $(active).hasClass(ClassName$9.FADE);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        var transitionDuration = Util.getTransitionDurationFromElement(active);
        $(active).removeClass(ClassName$9.SHOW).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        $(active).removeClass(ClassName$9.ACTIVE);
        var dropdownChild = $(active.parentNode).find(Selector$9.DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $(dropdownChild).removeClass(ClassName$9.ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      $(element).addClass(ClassName$9.ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      Util.reflow(element);

      if (element.classList.contains(ClassName$9.FADE)) {
        element.classList.add(ClassName$9.SHOW);
      }

      if (element.parentNode && $(element.parentNode).hasClass(ClassName$9.DROPDOWN_MENU)) {
        var dropdownElement = $(element).closest(Selector$9.DROPDOWN)[0];

        if (dropdownElement) {
          var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector$9.DROPDOWN_TOGGLE));
          $(dropdownToggleList).addClass(ClassName$9.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static
    ;

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY$9);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY$9, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$9;
      }
    }]);

    return Tab;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$9.CLICK_DATA_API, Selector$9.DATA_TOGGLE, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($(this), 'show');
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$9] = Tab._jQueryInterface;
  $.fn[NAME$9].Constructor = Tab;

  $.fn[NAME$9].noConflict = function () {
    $.fn[NAME$9] = JQUERY_NO_CONFLICT$9;
    return Tab._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$a = 'toast';
  var VERSION$a = '4.4.1';
  var DATA_KEY$a = 'bs.toast';
  var EVENT_KEY$a = "." + DATA_KEY$a;
  var JQUERY_NO_CONFLICT$a = $.fn[NAME$a];
  var Event$a = {
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$a,
    HIDE: "hide" + EVENT_KEY$a,
    HIDDEN: "hidden" + EVENT_KEY$a,
    SHOW: "show" + EVENT_KEY$a,
    SHOWN: "shown" + EVENT_KEY$a
  };
  var ClassName$a = {
    FADE: 'fade',
    HIDE: 'hide',
    SHOW: 'show',
    SHOWING: 'showing'
  };
  var DefaultType$7 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default$7 = {
    animation: true,
    autohide: true,
    delay: 500
  };
  var Selector$a = {
    DATA_DISMISS: '[data-dismiss="toast"]'
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Toast =
  /*#__PURE__*/
  function () {
    function Toast(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._timeout = null;

      this._setListeners();
    } // Getters


    var _proto = Toast.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      var showEvent = $.Event(Event$a.SHOW);
      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      if (this._config.animation) {
        this._element.classList.add(ClassName$a.FADE);
      }

      var complete = function complete() {
        _this._element.classList.remove(ClassName$a.SHOWING);

        _this._element.classList.add(ClassName$a.SHOW);

        $(_this._element).trigger(Event$a.SHOWN);

        if (_this._config.autohide) {
          _this._timeout = setTimeout(function () {
            _this.hide();
          }, _this._config.delay);
        }
      };

      this._element.classList.remove(ClassName$a.HIDE);

      Util.reflow(this._element);

      this._element.classList.add(ClassName$a.SHOWING);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto.hide = function hide() {
      if (!this._element.classList.contains(ClassName$a.SHOW)) {
        return;
      }

      var hideEvent = $.Event(Event$a.HIDE);
      $(this._element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      this._close();
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      this._timeout = null;

      if (this._element.classList.contains(ClassName$a.SHOW)) {
        this._element.classList.remove(ClassName$a.SHOW);
      }

      $(this._element).off(Event$a.CLICK_DISMISS);
      $.removeData(this._element, DATA_KEY$a);
      this._element = null;
      this._config = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, Default$7, {}, $(this._element).data(), {}, typeof config === 'object' && config ? config : {});
      Util.typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
      return config;
    };

    _proto._setListeners = function _setListeners() {
      var _this2 = this;

      $(this._element).on(Event$a.CLICK_DISMISS, Selector$a.DATA_DISMISS, function () {
        return _this2.hide();
      });
    };

    _proto._close = function _close() {
      var _this3 = this;

      var complete = function complete() {
        _this3._element.classList.add(ClassName$a.HIDE);

        $(_this3._element).trigger(Event$a.HIDDEN);
      };

      this._element.classList.remove(ClassName$a.SHOW);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    } // Static
    ;

    Toast._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY$a);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new Toast(this, _config);
          $element.data(DATA_KEY$a, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](this);
        }
      });
    };

    _createClass(Toast, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$a;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$7;
      }
    }]);

    return Toast;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$a] = Toast._jQueryInterface;
  $.fn[NAME$a].Constructor = Toast;

  $.fn[NAME$a].noConflict = function () {
    $.fn[NAME$a] = JQUERY_NO_CONFLICT$a;
    return Toast._jQueryInterface;
  };

  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Toast = Toast;
  exports.Tooltip = Tooltip;
  exports.Util = Util;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bootstrap.js.map

!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});

/*!
 * Bootstrap-select v1.13.12 (https://developer.snapappointments.com/bootstrap-select)
 *
 * Copyright 2012-2019 SnapAppointments, LLC
 * Licensed under MIT (https://github.com/snapappointments/bootstrap-select/blob/master/LICENSE)
 */

!function(e,t){void 0===e&&void 0!==window&&(e=window),"function"==typeof define&&define.amd?define(["jquery"],function(e){return t(e)}):"object"==typeof module&&module.exports?module.exports=t(require("jquery")):t(e.jQuery)}(this,function(e){!function(z){"use strict";var d=["sanitize","whiteList","sanitizeFn"],r=["background","cite","href","itemtype","longdesc","poster","src","xlink:href"],e={"*":["class","dir","id","lang","role","tabindex","style",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},l=/^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,a=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;function v(e,t){var i=e.nodeName.toLowerCase();if(-1!==z.inArray(i,t))return-1===z.inArray(i,r)||Boolean(e.nodeValue.match(l)||e.nodeValue.match(a));for(var s=z(t).filter(function(e,t){return t instanceof RegExp}),n=0,o=s.length;n<o;n++)if(i.match(s[n]))return!0;return!1}function P(e,t,i){if(i&&"function"==typeof i)return i(e);for(var s=Object.keys(t),n=0,o=e.length;n<o;n++)for(var r=e[n].querySelectorAll("*"),l=0,a=r.length;l<a;l++){var c=r[l],d=c.nodeName.toLowerCase();if(-1!==s.indexOf(d))for(var h=[].slice.call(c.attributes),p=[].concat(t["*"]||[],t[d]||[]),u=0,f=h.length;u<f;u++){var m=h[u];v(m,p)||c.removeAttribute(m.nodeName)}else c.parentNode.removeChild(c)}}"classList"in document.createElement("_")||function(e){if("Element"in e){var t="classList",i="prototype",s=e.Element[i],n=Object,o=function(){var i=z(this);return{add:function(e){return e=Array.prototype.slice.call(arguments).join(" "),i.addClass(e)},remove:function(e){return e=Array.prototype.slice.call(arguments).join(" "),i.removeClass(e)},toggle:function(e,t){return i.toggleClass(e,t)},contains:function(e){return i.hasClass(e)}}};if(n.defineProperty){var r={get:o,enumerable:!0,configurable:!0};try{n.defineProperty(s,t,r)}catch(e){void 0!==e.number&&-2146823252!==e.number||(r.enumerable=!1,n.defineProperty(s,t,r))}}else n[i].__defineGetter__&&s.__defineGetter__(t,o)}}(window);var t,c,i=document.createElement("_");if(i.classList.add("c1","c2"),!i.classList.contains("c2")){var s=DOMTokenList.prototype.add,n=DOMTokenList.prototype.remove;DOMTokenList.prototype.add=function(){Array.prototype.forEach.call(arguments,s.bind(this))},DOMTokenList.prototype.remove=function(){Array.prototype.forEach.call(arguments,n.bind(this))}}if(i.classList.toggle("c3",!1),i.classList.contains("c3")){var o=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(e,t){return 1 in arguments&&!this.contains(e)==!t?t:o.call(this,e)}}function h(e){if(null==this)throw new TypeError;var t=String(this);if(e&&"[object RegExp]"==c.call(e))throw new TypeError;var i=t.length,s=String(e),n=s.length,o=1<arguments.length?arguments[1]:void 0,r=o?Number(o):0;r!=r&&(r=0);var l=Math.min(Math.max(r,0),i);if(i<n+l)return!1;for(var a=-1;++a<n;)if(t.charCodeAt(l+a)!=s.charCodeAt(a))return!1;return!0}function O(e,t){var i,s=e.selectedOptions,n=[];if(t){for(var o=0,r=s.length;o<r;o++)(i=s[o]).disabled||"OPTGROUP"===i.parentNode.tagName&&i.parentNode.disabled||n.push(i);return n}return s}function T(e,t){for(var i,s=[],n=t||e.selectedOptions,o=0,r=n.length;o<r;o++)(i=n[o]).disabled||"OPTGROUP"===i.parentNode.tagName&&i.parentNode.disabled||s.push(i.value||i.text);return e.multiple?s:s.length?s[0]:null}i=null,String.prototype.startsWith||(t=function(){try{var e={},t=Object.defineProperty,i=t(e,e,e)&&t}catch(e){}return i}(),c={}.toString,t?t(String.prototype,"startsWith",{value:h,configurable:!0,writable:!0}):String.prototype.startsWith=h),Object.keys||(Object.keys=function(e,t,i){for(t in i=[],e)i.hasOwnProperty.call(e,t)&&i.push(t);return i}),HTMLSelectElement&&!HTMLSelectElement.prototype.hasOwnProperty("selectedOptions")&&Object.defineProperty(HTMLSelectElement.prototype,"selectedOptions",{get:function(){return this.querySelectorAll(":checked")}});var p={useDefault:!1,_set:z.valHooks.select.set};z.valHooks.select.set=function(e,t){return t&&!p.useDefault&&z(e).data("selected",!0),p._set.apply(this,arguments)};var A=null,u=function(){try{return new Event("change"),!0}catch(e){return!1}}();function k(e,t,i,s){for(var n=["display","subtext","tokens"],o=!1,r=0;r<n.length;r++){var l=n[r],a=e[l];if(a&&(a=a.toString(),"display"===l&&(a=a.replace(/<[^>]+>/g,"")),s&&(a=w(a)),a=a.toUpperCase(),o="contains"===i?0<=a.indexOf(t):a.startsWith(t)))break}return o}function L(e){return parseInt(e,10)||0}z.fn.triggerNative=function(e){var t,i=this[0];i.dispatchEvent?(u?t=new Event(e,{bubbles:!0}):(t=document.createEvent("Event")).initEvent(e,!0,!1),i.dispatchEvent(t)):i.fireEvent?((t=document.createEventObject()).eventType=e,i.fireEvent("on"+e,t)):this.trigger(e)};var f={"\xc0":"A","\xc1":"A","\xc2":"A","\xc3":"A","\xc4":"A","\xc5":"A","\xe0":"a","\xe1":"a","\xe2":"a","\xe3":"a","\xe4":"a","\xe5":"a","\xc7":"C","\xe7":"c","\xd0":"D","\xf0":"d","\xc8":"E","\xc9":"E","\xca":"E","\xcb":"E","\xe8":"e","\xe9":"e","\xea":"e","\xeb":"e","\xcc":"I","\xcd":"I","\xce":"I","\xcf":"I","\xec":"i","\xed":"i","\xee":"i","\xef":"i","\xd1":"N","\xf1":"n","\xd2":"O","\xd3":"O","\xd4":"O","\xd5":"O","\xd6":"O","\xd8":"O","\xf2":"o","\xf3":"o","\xf4":"o","\xf5":"o","\xf6":"o","\xf8":"o","\xd9":"U","\xda":"U","\xdb":"U","\xdc":"U","\xf9":"u","\xfa":"u","\xfb":"u","\xfc":"u","\xdd":"Y","\xfd":"y","\xff":"y","\xc6":"Ae","\xe6":"ae","\xde":"Th","\xfe":"th","\xdf":"ss","\u0100":"A","\u0102":"A","\u0104":"A","\u0101":"a","\u0103":"a","\u0105":"a","\u0106":"C","\u0108":"C","\u010a":"C","\u010c":"C","\u0107":"c","\u0109":"c","\u010b":"c","\u010d":"c","\u010e":"D","\u0110":"D","\u010f":"d","\u0111":"d","\u0112":"E","\u0114":"E","\u0116":"E","\u0118":"E","\u011a":"E","\u0113":"e","\u0115":"e","\u0117":"e","\u0119":"e","\u011b":"e","\u011c":"G","\u011e":"G","\u0120":"G","\u0122":"G","\u011d":"g","\u011f":"g","\u0121":"g","\u0123":"g","\u0124":"H","\u0126":"H","\u0125":"h","\u0127":"h","\u0128":"I","\u012a":"I","\u012c":"I","\u012e":"I","\u0130":"I","\u0129":"i","\u012b":"i","\u012d":"i","\u012f":"i","\u0131":"i","\u0134":"J","\u0135":"j","\u0136":"K","\u0137":"k","\u0138":"k","\u0139":"L","\u013b":"L","\u013d":"L","\u013f":"L","\u0141":"L","\u013a":"l","\u013c":"l","\u013e":"l","\u0140":"l","\u0142":"l","\u0143":"N","\u0145":"N","\u0147":"N","\u014a":"N","\u0144":"n","\u0146":"n","\u0148":"n","\u014b":"n","\u014c":"O","\u014e":"O","\u0150":"O","\u014d":"o","\u014f":"o","\u0151":"o","\u0154":"R","\u0156":"R","\u0158":"R","\u0155":"r","\u0157":"r","\u0159":"r","\u015a":"S","\u015c":"S","\u015e":"S","\u0160":"S","\u015b":"s","\u015d":"s","\u015f":"s","\u0161":"s","\u0162":"T","\u0164":"T","\u0166":"T","\u0163":"t","\u0165":"t","\u0167":"t","\u0168":"U","\u016a":"U","\u016c":"U","\u016e":"U","\u0170":"U","\u0172":"U","\u0169":"u","\u016b":"u","\u016d":"u","\u016f":"u","\u0171":"u","\u0173":"u","\u0174":"W","\u0175":"w","\u0176":"Y","\u0177":"y","\u0178":"Y","\u0179":"Z","\u017b":"Z","\u017d":"Z","\u017a":"z","\u017c":"z","\u017e":"z","\u0132":"IJ","\u0133":"ij","\u0152":"Oe","\u0153":"oe","\u0149":"'n","\u017f":"s"},m=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,g=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\u1ab0-\\u1aff\\u1dc0-\\u1dff]","g");function b(e){return f[e]}function w(e){return(e=e.toString())&&e.replace(m,b).replace(g,"")}var I,x,$,y,S=(I={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},x="(?:"+Object.keys(I).join("|")+")",$=RegExp(x),y=RegExp(x,"g"),function(e){return e=null==e?"":""+e,$.test(e)?e.replace(y,E):e});function E(e){return I[e]}var C={32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9"},N=27,D=13,H=32,W=9,B=38,M=40,R={success:!1,major:"3"};try{R.full=(z.fn.dropdown.Constructor.VERSION||"").split(" ")[0].split("."),R.major=R.full[0],R.success=!0}catch(e){}var U=0,j=".bs.select",V={DISABLED:"disabled",DIVIDER:"divider",SHOW:"open",DROPUP:"dropup",MENU:"dropdown-menu",MENURIGHT:"dropdown-menu-right",MENULEFT:"dropdown-menu-left",BUTTONCLASS:"btn-default",POPOVERHEADER:"popover-title",ICONBASE:"glyphicon",TICKICON:"glyphicon-ok"},F={MENU:"."+V.MENU},_={span:document.createElement("span"),i:document.createElement("i"),subtext:document.createElement("small"),a:document.createElement("a"),li:document.createElement("li"),whitespace:document.createTextNode("\xa0"),fragment:document.createDocumentFragment()};_.a.setAttribute("role","option"),_.subtext.className="text-muted",_.text=_.span.cloneNode(!1),_.text.className="text",_.checkMark=_.span.cloneNode(!1);var G=new RegExp(B+"|"+M),q=new RegExp("^"+W+"$|"+N),K=function(e,t,i){var s=_.li.cloneNode(!1);return e&&(1===e.nodeType||11===e.nodeType?s.appendChild(e):s.innerHTML=e),void 0!==t&&""!==t&&(s.className=t),null!=i&&s.classList.add("optgroup-"+i),s},Y=function(e,t,i){var s=_.a.cloneNode(!0);return e&&(11===e.nodeType?s.appendChild(e):s.insertAdjacentHTML("beforeend",e)),void 0!==t&&""!==t&&(s.className=t),"4"===R.major&&s.classList.add("dropdown-item"),i&&s.setAttribute("style",i),s},Z=function(e,t){var i,s,n=_.text.cloneNode(!1);if(e.content)n.innerHTML=e.content;else{if(n.textContent=e.text,e.icon){var o=_.whitespace.cloneNode(!1);(s=(!0===t?_.i:_.span).cloneNode(!1)).className=e.iconBase+" "+e.icon,_.fragment.appendChild(s),_.fragment.appendChild(o)}e.subtext&&((i=_.subtext.cloneNode(!1)).textContent=e.subtext,n.appendChild(i))}if(!0===t)for(;0<n.childNodes.length;)_.fragment.appendChild(n.childNodes[0]);else _.fragment.appendChild(n);return _.fragment},J=function(e){var t,i,s=_.text.cloneNode(!1);if(s.innerHTML=e.label,e.icon){var n=_.whitespace.cloneNode(!1);(i=_.span.cloneNode(!1)).className=e.iconBase+" "+e.icon,_.fragment.appendChild(i),_.fragment.appendChild(n)}return e.subtext&&((t=_.subtext.cloneNode(!1)).textContent=e.subtext,s.appendChild(t)),_.fragment.appendChild(s),_.fragment},Q=function(e,t){var i=this;p.useDefault||(z.valHooks.select.set=p._set,p.useDefault=!0),this.$element=z(e),this.$newElement=null,this.$button=null,this.$menu=null,this.options=t,this.selectpicker={main:{},search:{},current:{},view:{},keydown:{keyHistory:"",resetKeyHistory:{start:function(){return setTimeout(function(){i.selectpicker.keydown.keyHistory=""},800)}}}},null===this.options.title&&(this.options.title=this.$element.attr("title"));var s=this.options.windowPadding;"number"==typeof s&&(this.options.windowPadding=[s,s,s,s]),this.val=Q.prototype.val,this.render=Q.prototype.render,this.refresh=Q.prototype.refresh,this.setStyle=Q.prototype.setStyle,this.selectAll=Q.prototype.selectAll,this.deselectAll=Q.prototype.deselectAll,this.destroy=Q.prototype.destroy,this.remove=Q.prototype.remove,this.show=Q.prototype.show,this.hide=Q.prototype.hide,this.init()};function X(e){var l,a=arguments,c=e;if([].shift.apply(a),!R.success){try{R.full=(z.fn.dropdown.Constructor.VERSION||"").split(" ")[0].split(".")}catch(e){Q.BootstrapVersion?R.full=Q.BootstrapVersion.split(" ")[0].split("."):(R.full=[R.major,"0","0"],console.warn("There was an issue retrieving Bootstrap's version. Ensure Bootstrap is being loaded before bootstrap-select and there is no namespace collision. If loading Bootstrap asynchronously, the version may need to be manually specified via $.fn.selectpicker.Constructor.BootstrapVersion.",e))}R.major=R.full[0],R.success=!0}if("4"===R.major){var t=[];Q.DEFAULTS.style===V.BUTTONCLASS&&t.push({name:"style",className:"BUTTONCLASS"}),Q.DEFAULTS.iconBase===V.ICONBASE&&t.push({name:"iconBase",className:"ICONBASE"}),Q.DEFAULTS.tickIcon===V.TICKICON&&t.push({name:"tickIcon",className:"TICKICON"}),V.DIVIDER="dropdown-divider",V.SHOW="show",V.BUTTONCLASS="btn-light",V.POPOVERHEADER="popover-header",V.ICONBASE="",V.TICKICON="bs-ok-default";for(var i=0;i<t.length;i++){e=t[i];Q.DEFAULTS[e.name]=V[e.className]}}var s=this.each(function(){var e=z(this);if(e.is("select")){var t=e.data("selectpicker"),i="object"==typeof c&&c;if(t){if(i)for(var s in i)i.hasOwnProperty(s)&&(t.options[s]=i[s])}else{var n=e.data();for(var o in n)n.hasOwnProperty(o)&&-1!==z.inArray(o,d)&&delete n[o];var r=z.extend({},Q.DEFAULTS,z.fn.selectpicker.defaults||{},n,i);r.template=z.extend({},Q.DEFAULTS.template,z.fn.selectpicker.defaults?z.fn.selectpicker.defaults.template:{},n.template,i.template),e.data("selectpicker",t=new Q(this,r))}"string"==typeof c&&(l=t[c]instanceof Function?t[c].apply(t,a):t.options[c])}});return void 0!==l?l:s}Q.VERSION="1.13.12",Q.DEFAULTS={noneSelectedText:"Nothing selected",noneResultsText:"No results matched {0}",countSelectedText:function(e,t){return 1==e?"{0} item selected":"{0} items selected"},maxOptionsText:function(e,t){return[1==e?"Limit reached ({n} item max)":"Limit reached ({n} items max)",1==t?"Group limit reached ({n} item max)":"Group limit reached ({n} items max)"]},selectAllText:"Select All",deselectAllText:"Deselect All",doneButton:!1,doneButtonText:"Close",multipleSeparator:", ",styleBase:"btn",style:V.BUTTONCLASS,size:"auto",title:null,selectedTextFormat:"values",width:!1,container:!1,hideDisabled:!1,showSubtext:!1,showIcon:!0,showContent:!0,dropupAuto:!0,header:!1,liveSearch:!1,liveSearchPlaceholder:null,liveSearchNormalize:!1,liveSearchStyle:"contains",actionsBox:!1,iconBase:V.ICONBASE,tickIcon:V.TICKICON,showTick:!1,template:{caret:'<span class="caret"></span>'},maxOptions:!1,mobile:!1,selectOnTab:!1,dropdownAlignRight:!1,windowPadding:0,virtualScroll:600,display:!1,sanitize:!0,sanitizeFn:null,whiteList:e},Q.prototype={constructor:Q,init:function(){var i=this,e=this.$element.attr("id");U++,this.selectId="bs-select-"+U,this.$element[0].classList.add("bs-select-hidden"),this.multiple=this.$element.prop("multiple"),this.autofocus=this.$element.prop("autofocus"),this.$element[0].classList.contains("show-tick")&&(this.options.showTick=!0),this.$newElement=this.createDropdown(),this.$element.after(this.$newElement).prependTo(this.$newElement),this.$button=this.$newElement.children("button"),this.$menu=this.$newElement.children(F.MENU),this.$menuInner=this.$menu.children(".inner"),this.$searchbox=this.$menu.find("input"),this.$element[0].classList.remove("bs-select-hidden"),!0===this.options.dropdownAlignRight&&this.$menu[0].classList.add(V.MENURIGHT),void 0!==e&&this.$button.attr("data-id",e),this.checkDisabled(),this.clickListener(),this.options.liveSearch?(this.liveSearchListener(),this.focusedParent=this.$searchbox[0]):this.focusedParent=this.$menuInner[0],this.setStyle(),this.render(),this.setWidth(),this.options.container?this.selectPosition():this.$element.on("hide"+j,function(){if(i.isVirtual()){var e=i.$menuInner[0],t=e.firstChild.cloneNode(!1);e.replaceChild(t,e.firstChild),e.scrollTop=0}}),this.$menu.data("this",this),this.$newElement.data("this",this),this.options.mobile&&this.mobile(),this.$newElement.on({"hide.bs.dropdown":function(e){i.$element.trigger("hide"+j,e)},"hidden.bs.dropdown":function(e){i.$element.trigger("hidden"+j,e)},"show.bs.dropdown":function(e){i.$element.trigger("show"+j,e)},"shown.bs.dropdown":function(e){i.$element.trigger("shown"+j,e)}}),i.$element[0].hasAttribute("required")&&this.$element.on("invalid"+j,function(){i.$button[0].classList.add("bs-invalid"),i.$element.on("shown"+j+".invalid",function(){i.$element.val(i.$element.val()).off("shown"+j+".invalid")}).on("rendered"+j,function(){this.validity.valid&&i.$button[0].classList.remove("bs-invalid"),i.$element.off("rendered"+j)}),i.$button.on("blur"+j,function(){i.$element.trigger("focus").trigger("blur"),i.$button.off("blur"+j)})}),setTimeout(function(){i.createLi(),i.$element.trigger("loaded"+j)})},createDropdown:function(){var e=this.multiple||this.options.showTick?" show-tick":"",t=this.multiple?' aria-multiselectable="true"':"",i="",s=this.autofocus?" autofocus":"";R.major<4&&this.$element.parent().hasClass("input-group")&&(i=" input-group-btn");var n,o="",r="",l="",a="";return this.options.header&&(o='<div class="'+V.POPOVERHEADER+'"><button type="button" class="close" aria-hidden="true">&times;</button>'+this.options.header+"</div>"),this.options.liveSearch&&(r='<div class="bs-searchbox"><input type="search" class="form-control" autocomplete="off"'+(null===this.options.liveSearchPlaceholder?"":' placeholder="'+S(this.options.liveSearchPlaceholder)+'"')+' role="combobox" aria-label="Search" aria-controls="'+this.selectId+'" aria-autocomplete="list"></div>'),this.multiple&&this.options.actionsBox&&(l='<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn '+V.BUTTONCLASS+'">'+this.options.selectAllText+'</button><button type="button" class="actions-btn bs-deselect-all btn '+V.BUTTONCLASS+'">'+this.options.deselectAllText+"</button></div></div>"),this.multiple&&this.options.doneButton&&(a='<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm '+V.BUTTONCLASS+'">'+this.options.doneButtonText+"</button></div></div>"),n='<div class="dropdown bootstrap-select'+e+i+'"><button type="button" class="'+this.options.styleBase+' dropdown-toggle" '+("static"===this.options.display?'data-display="static"':"")+'data-toggle="dropdown"'+s+' role="combobox" aria-owns="'+this.selectId+'" aria-haspopup="listbox" aria-expanded="false"><div class="filter-option"><div class="filter-option-inner"><div class="filter-option-inner-inner"></div></div> </div>'+("4"===R.major?"":'<span class="bs-caret">'+this.options.template.caret+"</span>")+'</button><div class="'+V.MENU+" "+("4"===R.major?"":V.SHOW)+'">'+o+r+l+'<div class="inner '+V.SHOW+'" role="listbox" id="'+this.selectId+'" tabindex="-1" '+t+'><ul class="'+V.MENU+" inner "+("4"===R.major?V.SHOW:"")+'" role="presentation"></ul></div>'+a+"</div></div>",z(n)},setPositionData:function(){this.selectpicker.view.canHighlight=[];for(var e=this.selectpicker.view.size=0;e<this.selectpicker.current.data.length;e++){var t=this.selectpicker.current.data[e],i=!0;"divider"===t.type?(i=!1,t.height=this.sizeInfo.dividerHeight):"optgroup-label"===t.type?(i=!1,t.height=this.sizeInfo.dropdownHeaderHeight):t.height=this.sizeInfo.liHeight,t.disabled&&(i=!1),this.selectpicker.view.canHighlight.push(i),i&&(this.selectpicker.view.size++,t.posinset=this.selectpicker.view.size),t.position=(0===e?0:this.selectpicker.current.data[e-1].position)+t.height}},isVirtual:function(){return!1!==this.options.virtualScroll&&this.selectpicker.main.elements.length>=this.options.virtualScroll||!0===this.options.virtualScroll},createView:function(A,e,t){var L,N,D=this,i=0,H=[];if(this.selectpicker.current=A?this.selectpicker.search:this.selectpicker.main,this.setPositionData(),e)if(t)i=this.$menuInner[0].scrollTop;else if(!D.multiple){var s=D.$element[0],n=(s.options[s.selectedIndex]||{}).liIndex;if("number"==typeof n&&!1!==D.options.size){var o=D.selectpicker.main.data[n],r=o&&o.position;r&&(i=r-(D.sizeInfo.menuInnerHeight+D.sizeInfo.liHeight)/2)}}function l(e,t){var i,s,n,o,r,l,a,c,d=D.selectpicker.current.elements.length,h=[],p=!0,u=D.isVirtual();D.selectpicker.view.scrollTop=e,i=Math.ceil(D.sizeInfo.menuInnerHeight/D.sizeInfo.liHeight*1.5),s=Math.round(d/i)||1;for(var f=0;f<s;f++){var m=(f+1)*i;if(f===s-1&&(m=d),h[f]=[f*i+(f?1:0),m],!d)break;void 0===r&&e-1<=D.selectpicker.current.data[m-1].position-D.sizeInfo.menuInnerHeight&&(r=f)}if(void 0===r&&(r=0),l=[D.selectpicker.view.position0,D.selectpicker.view.position1],n=Math.max(0,r-1),o=Math.min(s-1,r+1),D.selectpicker.view.position0=!1===u?0:Math.max(0,h[n][0])||0,D.selectpicker.view.position1=!1===u?d:Math.min(d,h[o][1])||0,a=l[0]!==D.selectpicker.view.position0||l[1]!==D.selectpicker.view.position1,void 0!==D.activeIndex&&(N=D.selectpicker.main.elements[D.prevActiveIndex],H=D.selectpicker.main.elements[D.activeIndex],L=D.selectpicker.main.elements[D.selectedIndex],t&&(D.activeIndex!==D.selectedIndex&&D.defocusItem(H),D.activeIndex=void 0),D.activeIndex&&D.activeIndex!==D.selectedIndex&&D.defocusItem(L)),void 0!==D.prevActiveIndex&&D.prevActiveIndex!==D.activeIndex&&D.prevActiveIndex!==D.selectedIndex&&D.defocusItem(N),(t||a)&&(c=D.selectpicker.view.visibleElements?D.selectpicker.view.visibleElements.slice():[],D.selectpicker.view.visibleElements=!1===u?D.selectpicker.current.elements:D.selectpicker.current.elements.slice(D.selectpicker.view.position0,D.selectpicker.view.position1),D.setOptionStatus(),(A||!1===u&&t)&&(p=!function(e,i){return e.length===i.length&&e.every(function(e,t){return e===i[t]})}(c,D.selectpicker.view.visibleElements)),(t||!0===u)&&p)){var v,g,b=D.$menuInner[0],w=document.createDocumentFragment(),I=b.firstChild.cloneNode(!1),x=D.selectpicker.view.visibleElements,k=[];b.replaceChild(I,b.firstChild);f=0;for(var $=x.length;f<$;f++){var y,S,E=x[f];D.options.sanitize&&(y=E.lastChild)&&(S=D.selectpicker.current.data[f+D.selectpicker.view.position0])&&S.content&&!S.sanitized&&(k.push(y),S.sanitized=!0),w.appendChild(E)}if(D.options.sanitize&&k.length&&P(k,D.options.whiteList,D.options.sanitizeFn),!0===u?(v=0===D.selectpicker.view.position0?0:D.selectpicker.current.data[D.selectpicker.view.position0-1].position,g=D.selectpicker.view.position1>d-1?0:D.selectpicker.current.data[d-1].position-D.selectpicker.current.data[D.selectpicker.view.position1-1].position,b.firstChild.style.marginTop=v+"px",b.firstChild.style.marginBottom=g+"px"):(b.firstChild.style.marginTop=0,b.firstChild.style.marginBottom=0),b.firstChild.appendChild(w),!0===u&&D.sizeInfo.hasScrollBar){var C=b.firstChild.offsetWidth;if(t&&C<D.sizeInfo.menuInnerInnerWidth&&D.sizeInfo.totalMenuWidth>D.sizeInfo.selectWidth)b.firstChild.style.minWidth=D.sizeInfo.menuInnerInnerWidth+"px";else if(C>D.sizeInfo.menuInnerInnerWidth){D.$menu[0].style.minWidth=0;var O=b.firstChild.offsetWidth;O>D.sizeInfo.menuInnerInnerWidth&&(D.sizeInfo.menuInnerInnerWidth=O,b.firstChild.style.minWidth=D.sizeInfo.menuInnerInnerWidth+"px"),D.$menu[0].style.minWidth=""}}}if(D.prevActiveIndex=D.activeIndex,D.options.liveSearch){if(A&&t){var z,T=0;D.selectpicker.view.canHighlight[T]||(T=1+D.selectpicker.view.canHighlight.slice(1).indexOf(!0)),z=D.selectpicker.view.visibleElements[T],D.defocusItem(D.selectpicker.view.currentActive),D.activeIndex=(D.selectpicker.current.data[T]||{}).index,D.focusItem(z)}}else D.$menuInner.trigger("focus")}l(i,!0),this.$menuInner.off("scroll.createView").on("scroll.createView",function(e,t){D.noScroll||l(this.scrollTop,t),D.noScroll=!1}),z(window).off("resize"+j+"."+this.selectId+".createView").on("resize"+j+"."+this.selectId+".createView",function(){D.$newElement.hasClass(V.SHOW)&&l(D.$menuInner[0].scrollTop)})},focusItem:function(e,t,i){if(e){t=t||this.selectpicker.main.data[this.activeIndex];var s=e.firstChild;s&&(s.setAttribute("aria-setsize",this.selectpicker.view.size),s.setAttribute("aria-posinset",t.posinset),!0!==i&&(this.focusedParent.setAttribute("aria-activedescendant",s.id),e.classList.add("active"),s.classList.add("active")))}},defocusItem:function(e){e&&(e.classList.remove("active"),e.firstChild&&e.firstChild.classList.remove("active"))},setPlaceholder:function(){var e=!1;if(this.options.title&&!this.multiple){this.selectpicker.view.titleOption||(this.selectpicker.view.titleOption=document.createElement("option")),e=!0;var t=this.$element[0],i=!1,s=!this.selectpicker.view.titleOption.parentNode;if(s)this.selectpicker.view.titleOption.className="bs-title-option",this.selectpicker.view.titleOption.value="",i=void 0===z(t.options[t.selectedIndex]).attr("selected")&&void 0===this.$element.data("selected");!s&&0===this.selectpicker.view.titleOption.index||t.insertBefore(this.selectpicker.view.titleOption,t.firstChild),i&&(t.selectedIndex=0)}return e},createLi:function(){var c=this,f=this.options.iconBase,m=':not([hidden]):not([data-hidden="true"])',v=[],g=[],d=0,b=0,e=this.setPlaceholder()?1:0;this.options.hideDisabled&&(m+=":not(:disabled)"),!c.options.showTick&&!c.multiple||_.checkMark.parentNode||(_.checkMark.className=f+" "+c.options.tickIcon+" check-mark",_.a.appendChild(_.checkMark));var t=this.$element[0].querySelectorAll("select > *"+m);function w(e){var t=g[g.length-1];t&&"divider"===t.type&&(t.optID||e.optID)||((e=e||{}).type="divider",v.push(K(!1,V.DIVIDER,e.optID?e.optID+"div":void 0)),g.push(e))}function I(e,t){if((t=t||{}).divider="true"===e.getAttribute("data-divider"),t.divider)w({optID:t.optID});else{var i=g.length,s=e.style.cssText,n=s?S(s):"",o=(e.className||"")+(t.optgroupClass||"");t.optID&&(o="opt "+o),t.text=e.textContent,t.content=e.getAttribute("data-content"),t.tokens=e.getAttribute("data-tokens"),t.subtext=e.getAttribute("data-subtext"),t.icon=e.getAttribute("data-icon"),t.iconBase=f;var r=Z(t),l=K(Y(r,o,n),"",t.optID);l.firstChild&&(l.firstChild.id=c.selectId+"-"+i),v.push(l),e.liIndex=i,t.display=t.content||t.text,t.type="option",t.index=i,t.option=e,t.disabled=t.disabled||e.disabled,g.push(t);var a=0;t.display&&(a+=t.display.length),t.subtext&&(a+=t.subtext.length),t.icon&&(a+=1),d<a&&(d=a,c.selectpicker.view.widestOption=v[v.length-1])}}function i(e,t){var i=t[e],s=t[e-1],n=t[e+1],o=i.querySelectorAll("option"+m);if(o.length){var r,l,a={label:S(i.label),subtext:i.getAttribute("data-subtext"),icon:i.getAttribute("data-icon"),iconBase:f},c=" "+(i.className||"");b++,s&&w({optID:b});var d=J(a);v.push(K(d,"dropdown-header"+c,b)),g.push({display:a.label,subtext:a.subtext,type:"optgroup-label",optID:b});for(var h=0,p=o.length;h<p;h++){var u=o[h];0===h&&(l=(r=g.length-1)+p),I(u,{headerIndex:r,lastIndex:l,optID:b,optgroupClass:c,disabled:i.disabled})}n&&w({optID:b})}}for(var s=t.length;e<s;e++){var n=t[e];"OPTGROUP"!==n.tagName?I(n,{}):i(e,t)}this.selectpicker.main.elements=v,this.selectpicker.main.data=g,this.selectpicker.current=this.selectpicker.main},findLis:function(){return this.$menuInner.find(".inner > li")},render:function(){this.setPlaceholder();var e,t=this,i=this.$element[0],s=O(i,this.options.hideDisabled),n=s.length,o=this.$button[0],r=o.querySelector(".filter-option-inner-inner"),l=document.createTextNode(this.options.multipleSeparator),a=_.fragment.cloneNode(!1),c=!1;if(o.classList.toggle("bs-placeholder",t.multiple?!n:!T(i,s)),this.tabIndex(),"static"===this.options.selectedTextFormat)a=Z({text:this.options.title},!0);else if(!1===(this.multiple&&-1!==this.options.selectedTextFormat.indexOf("count")&&1<n&&(1<(e=this.options.selectedTextFormat.split(">")).length&&n>e[1]||1===e.length&&2<=n))){for(var d=0;d<n&&d<50;d++){var h=s[d],p={},u={content:h.getAttribute("data-content"),subtext:h.getAttribute("data-subtext"),icon:h.getAttribute("data-icon")};this.multiple&&0<d&&a.appendChild(l.cloneNode(!1)),h.title?p.text=h.title:u.content&&t.options.showContent?(p.content=u.content.toString(),c=!0):(t.options.showIcon&&(p.icon=u.icon,p.iconBase=this.options.iconBase),t.options.showSubtext&&!t.multiple&&u.subtext&&(p.subtext=" "+u.subtext),p.text=h.textContent.trim()),a.appendChild(Z(p,!0))}49<n&&a.appendChild(document.createTextNode("..."))}else{var f=':not([hidden]):not([data-hidden="true"]):not([data-divider="true"])';this.options.hideDisabled&&(f+=":not(:disabled)");var m=this.$element[0].querySelectorAll("select > option"+f+", optgroup"+f+" option"+f).length,v="function"==typeof this.options.countSelectedText?this.options.countSelectedText(n,m):this.options.countSelectedText;a=Z({text:v.replace("{0}",n.toString()).replace("{1}",m.toString())},!0)}if(null==this.options.title&&(this.options.title=this.$element.attr("title")),a.childNodes.length||(a=Z({text:void 0!==this.options.title?this.options.title:this.options.noneSelectedText},!0)),o.title=a.textContent.replace(/<[^>]*>?/g,"").trim(),this.options.sanitize&&c&&P([a],t.options.whiteList,t.options.sanitizeFn),r.innerHTML="",r.appendChild(a),R.major<4&&this.$newElement[0].classList.contains("bs3-has-addon")){var g=o.querySelector(".filter-expand"),b=r.cloneNode(!0);b.className="filter-expand",g?o.replaceChild(b,g):o.appendChild(b)}this.$element.trigger("rendered"+j)},setStyle:function(e,t){var i,s=this.$button[0],n=this.$newElement[0],o=this.options.style.trim();this.$element.attr("class")&&this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi,"")),R.major<4&&(n.classList.add("bs3"),n.parentNode.classList.contains("input-group")&&(n.previousElementSibling||n.nextElementSibling)&&(n.previousElementSibling||n.nextElementSibling).classList.contains("input-group-addon")&&n.classList.add("bs3-has-addon")),i=e?e.trim():o,"add"==t?i&&s.classList.add.apply(s.classList,i.split(" ")):"remove"==t?i&&s.classList.remove.apply(s.classList,i.split(" ")):(o&&s.classList.remove.apply(s.classList,o.split(" ")),i&&s.classList.add.apply(s.classList,i.split(" ")))},liHeight:function(e){if(e||!1!==this.options.size&&!this.sizeInfo){this.sizeInfo||(this.sizeInfo={});var t=document.createElement("div"),i=document.createElement("div"),s=document.createElement("div"),n=document.createElement("ul"),o=document.createElement("li"),r=document.createElement("li"),l=document.createElement("li"),a=document.createElement("a"),c=document.createElement("span"),d=this.options.header&&0<this.$menu.find("."+V.POPOVERHEADER).length?this.$menu.find("."+V.POPOVERHEADER)[0].cloneNode(!0):null,h=this.options.liveSearch?document.createElement("div"):null,p=this.options.actionsBox&&this.multiple&&0<this.$menu.find(".bs-actionsbox").length?this.$menu.find(".bs-actionsbox")[0].cloneNode(!0):null,u=this.options.doneButton&&this.multiple&&0<this.$menu.find(".bs-donebutton").length?this.$menu.find(".bs-donebutton")[0].cloneNode(!0):null,f=this.$element.find("option")[0];if(this.sizeInfo.selectWidth=this.$newElement[0].offsetWidth,c.className="text",a.className="dropdown-item "+(f?f.className:""),t.className=this.$menu[0].parentNode.className+" "+V.SHOW,t.style.width=0,"auto"===this.options.width&&(i.style.minWidth=0),i.className=V.MENU+" "+V.SHOW,s.className="inner "+V.SHOW,n.className=V.MENU+" inner "+("4"===R.major?V.SHOW:""),o.className=V.DIVIDER,r.className="dropdown-header",c.appendChild(document.createTextNode("\u200b")),a.appendChild(c),l.appendChild(a),r.appendChild(c.cloneNode(!0)),this.selectpicker.view.widestOption&&n.appendChild(this.selectpicker.view.widestOption.cloneNode(!0)),n.appendChild(l),n.appendChild(o),n.appendChild(r),d&&i.appendChild(d),h){var m=document.createElement("input");h.className="bs-searchbox",m.className="form-control",h.appendChild(m),i.appendChild(h)}p&&i.appendChild(p),s.appendChild(n),i.appendChild(s),u&&i.appendChild(u),t.appendChild(i),document.body.appendChild(t);var v,g=l.offsetHeight,b=r?r.offsetHeight:0,w=d?d.offsetHeight:0,I=h?h.offsetHeight:0,x=p?p.offsetHeight:0,k=u?u.offsetHeight:0,$=z(o).outerHeight(!0),y=!!window.getComputedStyle&&window.getComputedStyle(i),S=i.offsetWidth,E=y?null:z(i),C={vert:L(y?y.paddingTop:E.css("paddingTop"))+L(y?y.paddingBottom:E.css("paddingBottom"))+L(y?y.borderTopWidth:E.css("borderTopWidth"))+L(y?y.borderBottomWidth:E.css("borderBottomWidth")),horiz:L(y?y.paddingLeft:E.css("paddingLeft"))+L(y?y.paddingRight:E.css("paddingRight"))+L(y?y.borderLeftWidth:E.css("borderLeftWidth"))+L(y?y.borderRightWidth:E.css("borderRightWidth"))},O={vert:C.vert+L(y?y.marginTop:E.css("marginTop"))+L(y?y.marginBottom:E.css("marginBottom"))+2,horiz:C.horiz+L(y?y.marginLeft:E.css("marginLeft"))+L(y?y.marginRight:E.css("marginRight"))+2};s.style.overflowY="scroll",v=i.offsetWidth-S,document.body.removeChild(t),this.sizeInfo.liHeight=g,this.sizeInfo.dropdownHeaderHeight=b,this.sizeInfo.headerHeight=w,this.sizeInfo.searchHeight=I,this.sizeInfo.actionsHeight=x,this.sizeInfo.doneButtonHeight=k,this.sizeInfo.dividerHeight=$,this.sizeInfo.menuPadding=C,this.sizeInfo.menuExtras=O,this.sizeInfo.menuWidth=S,this.sizeInfo.menuInnerInnerWidth=S-C.horiz,this.sizeInfo.totalMenuWidth=this.sizeInfo.menuWidth,this.sizeInfo.scrollBarWidth=v,this.sizeInfo.selectHeight=this.$newElement[0].offsetHeight,this.setPositionData()}},getSelectPosition:function(){var e,t=z(window),i=this.$newElement.offset(),s=z(this.options.container);this.options.container&&s.length&&!s.is("body")?((e=s.offset()).top+=parseInt(s.css("borderTopWidth")),e.left+=parseInt(s.css("borderLeftWidth"))):e={top:0,left:0};var n=this.options.windowPadding;this.sizeInfo.selectOffsetTop=i.top-e.top-t.scrollTop(),this.sizeInfo.selectOffsetBot=t.height()-this.sizeInfo.selectOffsetTop-this.sizeInfo.selectHeight-e.top-n[2],this.sizeInfo.selectOffsetLeft=i.left-e.left-t.scrollLeft(),this.sizeInfo.selectOffsetRight=t.width()-this.sizeInfo.selectOffsetLeft-this.sizeInfo.selectWidth-e.left-n[1],this.sizeInfo.selectOffsetTop-=n[0],this.sizeInfo.selectOffsetLeft-=n[3]},setMenuSize:function(e){this.getSelectPosition();var t,i,s,n,o,r,l,a=this.sizeInfo.selectWidth,c=this.sizeInfo.liHeight,d=this.sizeInfo.headerHeight,h=this.sizeInfo.searchHeight,p=this.sizeInfo.actionsHeight,u=this.sizeInfo.doneButtonHeight,f=this.sizeInfo.dividerHeight,m=this.sizeInfo.menuPadding,v=0;if(this.options.dropupAuto&&(l=c*this.selectpicker.current.elements.length+m.vert,this.$newElement.toggleClass(V.DROPUP,this.sizeInfo.selectOffsetTop-this.sizeInfo.selectOffsetBot>this.sizeInfo.menuExtras.vert&&l+this.sizeInfo.menuExtras.vert+50>this.sizeInfo.selectOffsetBot)),"auto"===this.options.size)n=3<this.selectpicker.current.elements.length?3*this.sizeInfo.liHeight+this.sizeInfo.menuExtras.vert-2:0,i=this.sizeInfo.selectOffsetBot-this.sizeInfo.menuExtras.vert,s=n+d+h+p+u,r=Math.max(n-m.vert,0),this.$newElement.hasClass(V.DROPUP)&&(i=this.sizeInfo.selectOffsetTop-this.sizeInfo.menuExtras.vert),t=(o=i)-d-h-p-u-m.vert;else if(this.options.size&&"auto"!=this.options.size&&this.selectpicker.current.elements.length>this.options.size){for(var g=0;g<this.options.size;g++)"divider"===this.selectpicker.current.data[g].type&&v++;t=(i=c*this.options.size+v*f+m.vert)-m.vert,o=i+d+h+p+u,s=r=""}this.$menu.css({"max-height":o+"px",overflow:"hidden","min-height":s+"px"}),this.$menuInner.css({"max-height":t+"px","overflow-y":"auto","min-height":r+"px"}),this.sizeInfo.menuInnerHeight=Math.max(t,1),this.selectpicker.current.data.length&&this.selectpicker.current.data[this.selectpicker.current.data.length-1].position>this.sizeInfo.menuInnerHeight&&(this.sizeInfo.hasScrollBar=!0,this.sizeInfo.totalMenuWidth=this.sizeInfo.menuWidth+this.sizeInfo.scrollBarWidth),"auto"===this.options.dropdownAlignRight&&this.$menu.toggleClass(V.MENURIGHT,this.sizeInfo.selectOffsetLeft>this.sizeInfo.selectOffsetRight&&this.sizeInfo.selectOffsetRight<this.sizeInfo.totalMenuWidth-a),this.dropdown&&this.dropdown._popper&&this.dropdown._popper.update()},setSize:function(e){if(this.liHeight(e),this.options.header&&this.$menu.css("padding-top",0),!1!==this.options.size){var t=this,i=z(window);this.setMenuSize(),this.options.liveSearch&&this.$searchbox.off("input.setMenuSize propertychange.setMenuSize").on("input.setMenuSize propertychange.setMenuSize",function(){return t.setMenuSize()}),"auto"===this.options.size?i.off("resize"+j+"."+this.selectId+".setMenuSize scroll"+j+"."+this.selectId+".setMenuSize").on("resize"+j+"."+this.selectId+".setMenuSize scroll"+j+"."+this.selectId+".setMenuSize",function(){return t.setMenuSize()}):this.options.size&&"auto"!=this.options.size&&this.selectpicker.current.elements.length>this.options.size&&i.off("resize"+j+"."+this.selectId+".setMenuSize scroll"+j+"."+this.selectId+".setMenuSize"),t.createView(!1,!0,e)}},setWidth:function(){var i=this;"auto"===this.options.width?requestAnimationFrame(function(){i.$menu.css("min-width","0"),i.$element.on("loaded"+j,function(){i.liHeight(),i.setMenuSize();var e=i.$newElement.clone().appendTo("body"),t=e.css("width","auto").children("button").outerWidth();e.remove(),i.sizeInfo.selectWidth=Math.max(i.sizeInfo.totalMenuWidth,t),i.$newElement.css("width",i.sizeInfo.selectWidth+"px")})}):"fit"===this.options.width?(this.$menu.css("min-width",""),this.$newElement.css("width","").addClass("fit-width")):this.options.width?(this.$menu.css("min-width",""),this.$newElement.css("width",this.options.width)):(this.$menu.css("min-width",""),this.$newElement.css("width","")),this.$newElement.hasClass("fit-width")&&"fit"!==this.options.width&&this.$newElement[0].classList.remove("fit-width")},selectPosition:function(){this.$bsContainer=z('<div class="bs-container" />');function e(e){var t={},i=r.options.display||!!z.fn.dropdown.Constructor.Default&&z.fn.dropdown.Constructor.Default.display;r.$bsContainer.addClass(e.attr("class").replace(/form-control|fit-width/gi,"")).toggleClass(V.DROPUP,e.hasClass(V.DROPUP)),s=e.offset(),l.is("body")?n={top:0,left:0}:((n=l.offset()).top+=parseInt(l.css("borderTopWidth"))-l.scrollTop(),n.left+=parseInt(l.css("borderLeftWidth"))-l.scrollLeft()),o=e.hasClass(V.DROPUP)?0:e[0].offsetHeight,(R.major<4||"static"===i)&&(t.top=s.top-n.top+o,t.left=s.left-n.left),t.width=e[0].offsetWidth,r.$bsContainer.css(t)}var s,n,o,r=this,l=z(this.options.container);this.$button.on("click.bs.dropdown.data-api",function(){r.isDisabled()||(e(r.$newElement),r.$bsContainer.appendTo(r.options.container).toggleClass(V.SHOW,!r.$button.hasClass(V.SHOW)).append(r.$menu))}),z(window).off("resize"+j+"."+this.selectId+" scroll"+j+"."+this.selectId).on("resize"+j+"."+this.selectId+" scroll"+j+"."+this.selectId,function(){r.$newElement.hasClass(V.SHOW)&&e(r.$newElement)}),this.$element.on("hide"+j,function(){r.$menu.data("height",r.$menu.height()),r.$bsContainer.detach()})},setOptionStatus:function(e){var t=this;if(t.noScroll=!1,t.selectpicker.view.visibleElements&&t.selectpicker.view.visibleElements.length)for(var i=0;i<t.selectpicker.view.visibleElements.length;i++){var s=t.selectpicker.current.data[i+t.selectpicker.view.position0],n=s.option;n&&(!0!==e&&t.setDisabled(s.index,s.disabled),t.setSelected(s.index,n.selected))}},setSelected:function(e,t){var i,s,n=this.selectpicker.main.elements[e],o=this.selectpicker.main.data[e],r=void 0!==this.activeIndex,l=this.activeIndex===e||t&&!this.multiple&&!r;o.selected=t,s=n.firstChild,t&&(this.selectedIndex=e),n.classList.toggle("selected",t),l?(this.focusItem(n,o),this.selectpicker.view.currentActive=n,this.activeIndex=e):this.defocusItem(n),s&&(s.classList.toggle("selected",t),t?s.setAttribute("aria-selected",!0):this.multiple?s.setAttribute("aria-selected",!1):s.removeAttribute("aria-selected")),l||r||!t||void 0===this.prevActiveIndex||(i=this.selectpicker.main.elements[this.prevActiveIndex],this.defocusItem(i))},setDisabled:function(e,t){var i,s=this.selectpicker.main.elements[e];this.selectpicker.main.data[e].disabled=t,i=s.firstChild,s.classList.toggle(V.DISABLED,t),i&&("4"===R.major&&i.classList.toggle(V.DISABLED,t),t?(i.setAttribute("aria-disabled",t),i.setAttribute("tabindex",-1)):(i.removeAttribute("aria-disabled"),i.setAttribute("tabindex",0)))},isDisabled:function(){return this.$element[0].disabled},checkDisabled:function(){this.isDisabled()?(this.$newElement[0].classList.add(V.DISABLED),this.$button.addClass(V.DISABLED).attr("tabindex",-1).attr("aria-disabled",!0)):(this.$button[0].classList.contains(V.DISABLED)&&(this.$newElement[0].classList.remove(V.DISABLED),this.$button.removeClass(V.DISABLED).attr("aria-disabled",!1)),-1!=this.$button.attr("tabindex")||this.$element.data("tabindex")||this.$button.removeAttr("tabindex"))},tabIndex:function(){this.$element.data("tabindex")!==this.$element.attr("tabindex")&&-98!==this.$element.attr("tabindex")&&"-98"!==this.$element.attr("tabindex")&&(this.$element.data("tabindex",this.$element.attr("tabindex")),this.$button.attr("tabindex",this.$element.data("tabindex"))),this.$element.attr("tabindex",-98)},clickListener:function(){var C=this,t=z(document);function e(){C.options.liveSearch?C.$searchbox.trigger("focus"):C.$menuInner.trigger("focus")}function i(){C.dropdown&&C.dropdown._popper&&C.dropdown._popper.state.isCreated?e():requestAnimationFrame(i)}t.data("spaceSelect",!1),this.$button.on("keyup",function(e){/(32)/.test(e.keyCode.toString(10))&&t.data("spaceSelect")&&(e.preventDefault(),t.data("spaceSelect",!1))}),this.$newElement.on("show.bs.dropdown",function(){3<R.major&&!C.dropdown&&(C.dropdown=C.$button.data("bs.dropdown"),C.dropdown._menu=C.$menu[0])}),this.$button.on("click.bs.dropdown.data-api",function(){C.$newElement.hasClass(V.SHOW)||C.setSize()}),this.$element.on("shown"+j,function(){C.$menuInner[0].scrollTop!==C.selectpicker.view.scrollTop&&(C.$menuInner[0].scrollTop=C.selectpicker.view.scrollTop),3<R.major?requestAnimationFrame(i):e()}),this.$menuInner.on("mouseenter","li a",function(e){var t=this.parentElement,i=C.isVirtual()?C.selectpicker.view.position0:0,s=Array.prototype.indexOf.call(t.parentElement.children,t),n=C.selectpicker.current.data[s+i];C.focusItem(t,n,!0)}),this.$menuInner.on("click","li a",function(e,t){var i=z(this),s=C.$element[0],n=C.isVirtual()?C.selectpicker.view.position0:0,o=C.selectpicker.current.data[i.parent().index()+n],r=o.index,l=T(s),a=s.selectedIndex,c=s.options[a],d=!0;if(C.multiple&&1!==C.options.maxOptions&&e.stopPropagation(),e.preventDefault(),!C.isDisabled()&&!i.parent().hasClass(V.DISABLED)){var h=o.option,p=z(h),u=h.selected,f=p.parent("optgroup"),m=f.find("option"),v=C.options.maxOptions,g=f.data("maxOptions")||!1;if(r===C.activeIndex&&(t=!0),t||(C.prevActiveIndex=C.activeIndex,C.activeIndex=void 0),C.multiple){if(h.selected=!u,C.setSelected(r,!u),i.trigger("blur"),!1!==v||!1!==g){var b=v<O(s).length,w=g<f.find("option:selected").length;if(v&&b||g&&w)if(v&&1==v)s.selectedIndex=-1,h.selected=!0,C.setOptionStatus(!0);else if(g&&1==g){for(var I=0;I<m.length;I++){var x=m[I];x.selected=!1,C.setSelected(x.liIndex,!1)}h.selected=!0,C.setSelected(r,!0)}else{var k="string"==typeof C.options.maxOptionsText?[C.options.maxOptionsText,C.options.maxOptionsText]:C.options.maxOptionsText,$="function"==typeof k?k(v,g):k,y=$[0].replace("{n}",v),S=$[1].replace("{n}",g),E=z('<div class="notify"></div>');$[2]&&(y=y.replace("{var}",$[2][1<v?0:1]),S=S.replace("{var}",$[2][1<g?0:1])),h.selected=!1,C.$menu.append(E),v&&b&&(E.append(z("<div>"+y+"</div>")),d=!1,C.$element.trigger("maxReached"+j)),g&&w&&(E.append(z("<div>"+S+"</div>")),d=!1,C.$element.trigger("maxReachedGrp"+j)),setTimeout(function(){C.setSelected(r,!1)},10),E[0].classList.add("fadeOut"),setTimeout(function(){E.remove()},1050)}}}else c&&(c.selected=!1),h.selected=!0,C.setSelected(r,!0);!C.multiple||C.multiple&&1===C.options.maxOptions?C.$button.trigger("focus"):C.options.liveSearch&&C.$searchbox.trigger("focus"),d&&(!C.multiple&&a===s.selectedIndex||(A=[h.index,p.prop("selected"),l],C.$element.triggerNative("change")))}}),this.$menu.on("click","li."+V.DISABLED+" a, ."+V.POPOVERHEADER+", ."+V.POPOVERHEADER+" :not(.close)",function(e){e.currentTarget==this&&(e.preventDefault(),e.stopPropagation(),C.options.liveSearch&&!z(e.target).hasClass("close")?C.$searchbox.trigger("focus"):C.$button.trigger("focus"))}),this.$menuInner.on("click",".divider, .dropdown-header",function(e){e.preventDefault(),e.stopPropagation(),C.options.liveSearch?C.$searchbox.trigger("focus"):C.$button.trigger("focus")}),this.$menu.on("click","."+V.POPOVERHEADER+" .close",function(){C.$button.trigger("click")}),this.$searchbox.on("click",function(e){e.stopPropagation()}),this.$menu.on("click",".actions-btn",function(e){C.options.liveSearch?C.$searchbox.trigger("focus"):C.$button.trigger("focus"),e.preventDefault(),e.stopPropagation(),z(this).hasClass("bs-select-all")?C.selectAll():C.deselectAll()}),this.$element.on("change"+j,function(){C.render(),C.$element.trigger("changed"+j,A),A=null}).on("focus"+j,function(){C.options.mobile||C.$button.trigger("focus")})},liveSearchListener:function(){var u=this,f=document.createElement("li");this.$button.on("click.bs.dropdown.data-api",function(){u.$searchbox.val()&&u.$searchbox.val("")}),this.$searchbox.on("click.bs.dropdown.data-api focus.bs.dropdown.data-api touchend.bs.dropdown.data-api",function(e){e.stopPropagation()}),this.$searchbox.on("input propertychange",function(){var e=u.$searchbox.val();if(u.selectpicker.search.elements=[],u.selectpicker.search.data=[],e){var t=[],i=e.toUpperCase(),s={},n=[],o=u._searchStyle(),r=u.options.liveSearchNormalize;r&&(i=w(i)),u._$lisSelected=u.$menuInner.find(".selected");for(var l=0;l<u.selectpicker.main.data.length;l++){var a=u.selectpicker.main.data[l];s[l]||(s[l]=k(a,i,o,r)),s[l]&&void 0!==a.headerIndex&&-1===n.indexOf(a.headerIndex)&&(0<a.headerIndex&&(s[a.headerIndex-1]=!0,n.push(a.headerIndex-1)),s[a.headerIndex]=!0,n.push(a.headerIndex),s[a.lastIndex+1]=!0),s[l]&&"optgroup-label"!==a.type&&n.push(l)}l=0;for(var c=n.length;l<c;l++){var d=n[l],h=n[l-1],p=(a=u.selectpicker.main.data[d],u.selectpicker.main.data[h]);("divider"!==a.type||"divider"===a.type&&p&&"divider"!==p.type&&c-1!==l)&&(u.selectpicker.search.data.push(a),t.push(u.selectpicker.main.elements[d]))}u.activeIndex=void 0,u.noScroll=!0,u.$menuInner.scrollTop(0),u.selectpicker.search.elements=t,u.createView(!0),t.length||(f.className="no-results",f.innerHTML=u.options.noneResultsText.replace("{0}",'"'+S(e)+'"'),u.$menuInner[0].firstChild.appendChild(f))}else u.$menuInner.scrollTop(0),u.createView(!1)})},_searchStyle:function(){return this.options.liveSearchStyle||"contains"},val:function(e){var t=this.$element[0];if(void 0===e)return this.$element.val();var i=T(t);if(A=[null,null,i],this.$element.val(e).trigger("changed"+j,A),this.$newElement.hasClass(V.SHOW))if(this.multiple)this.setOptionStatus(!0);else{var s=(t.options[t.selectedIndex]||{}).liIndex;"number"==typeof s&&(this.setSelected(this.selectedIndex,!1),this.setSelected(s,!0))}return this.render(),A=null,this.$element},changeAll:function(e){if(this.multiple){void 0===e&&(e=!0);var t=this.$element[0],i=0,s=0,n=T(t);t.classList.add("bs-select-hidden");for(var o=0,r=this.selectpicker.current.elements.length;o<r;o++){var l=this.selectpicker.current.data[o],a=l.option;a&&!l.disabled&&"divider"!==l.type&&(l.selected&&i++,(a.selected=e)&&s++)}t.classList.remove("bs-select-hidden"),i!==s&&(this.setOptionStatus(),A=[null,null,n],this.$element.triggerNative("change"))}},selectAll:function(){return this.changeAll(!0)},deselectAll:function(){return this.changeAll(!1)},toggle:function(e){(e=e||window.event)&&e.stopPropagation(),this.$button.trigger("click.bs.dropdown.data-api")},keydown:function(e){var t,i,s,n,o,r=z(this),l=r.hasClass("dropdown-toggle"),a=(l?r.closest(".dropdown"):r.closest(F.MENU)).data("this"),c=a.findLis(),d=!1,h=e.which===W&&!l&&!a.options.selectOnTab,p=G.test(e.which)||h,u=a.$menuInner[0].scrollTop,f=!0===a.isVirtual()?a.selectpicker.view.position0:0;if(!(112<=e.which&&e.which<=123))if(!(i=a.$newElement.hasClass(V.SHOW))&&(p||48<=e.which&&e.which<=57||96<=e.which&&e.which<=105||65<=e.which&&e.which<=90)&&(a.$button.trigger("click.bs.dropdown.data-api"),a.options.liveSearch))a.$searchbox.trigger("focus");else{if(e.which===N&&i&&(e.preventDefault(),a.$button.trigger("click.bs.dropdown.data-api").trigger("focus")),p){if(!c.length)return;-1!==(t=(s=a.selectpicker.main.elements[a.activeIndex])?Array.prototype.indexOf.call(s.parentElement.children,s):-1)&&a.defocusItem(s),e.which===B?(-1!==t&&t--,t+f<0&&(t+=c.length),a.selectpicker.view.canHighlight[t+f]||-1===(t=a.selectpicker.view.canHighlight.slice(0,t+f).lastIndexOf(!0)-f)&&(t=c.length-1)):e.which!==M&&!h||(++t+f>=a.selectpicker.view.canHighlight.length&&(t=0),a.selectpicker.view.canHighlight[t+f]||(t=t+1+a.selectpicker.view.canHighlight.slice(t+f+1).indexOf(!0))),e.preventDefault();var m=f+t;e.which===B?0===f&&t===c.length-1?(a.$menuInner[0].scrollTop=a.$menuInner[0].scrollHeight,m=a.selectpicker.current.elements.length-1):d=(o=(n=a.selectpicker.current.data[m]).position-n.height)<u:e.which!==M&&!h||(0===t?m=a.$menuInner[0].scrollTop=0:d=u<(o=(n=a.selectpicker.current.data[m]).position-a.sizeInfo.menuInnerHeight)),s=a.selectpicker.current.elements[m],a.activeIndex=a.selectpicker.current.data[m].index,a.focusItem(s),a.selectpicker.view.currentActive=s,d&&(a.$menuInner[0].scrollTop=o),a.options.liveSearch?a.$searchbox.trigger("focus"):r.trigger("focus")}else if(!r.is("input")&&!q.test(e.which)||e.which===H&&a.selectpicker.keydown.keyHistory){var v,g,b=[];e.preventDefault(),a.selectpicker.keydown.keyHistory+=C[e.which],a.selectpicker.keydown.resetKeyHistory.cancel&&clearTimeout(a.selectpicker.keydown.resetKeyHistory.cancel),a.selectpicker.keydown.resetKeyHistory.cancel=a.selectpicker.keydown.resetKeyHistory.start(),g=a.selectpicker.keydown.keyHistory,/^(.)\1+$/.test(g)&&(g=g.charAt(0));for(var w=0;w<a.selectpicker.current.data.length;w++){var I=a.selectpicker.current.data[w];k(I,g,"startsWith",!0)&&a.selectpicker.view.canHighlight[w]&&b.push(I.index)}if(b.length){var x=0;c.removeClass("active").find("a").removeClass("active"),1===g.length&&(-1===(x=b.indexOf(a.activeIndex))||x===b.length-1?x=0:x++),v=b[x],d=0<u-(n=a.selectpicker.main.data[v]).position?(o=n.position-n.height,!0):(o=n.position-a.sizeInfo.menuInnerHeight,n.position>u+a.sizeInfo.menuInnerHeight),s=a.selectpicker.main.elements[v],a.activeIndex=b[x],a.focusItem(s),s&&s.firstChild.focus(),d&&(a.$menuInner[0].scrollTop=o),r.trigger("focus")}}i&&(e.which===H&&!a.selectpicker.keydown.keyHistory||e.which===D||e.which===W&&a.options.selectOnTab)&&(e.which!==H&&e.preventDefault(),a.options.liveSearch&&e.which===H||(a.$menuInner.find(".active a").trigger("click",!0),r.trigger("focus"),a.options.liveSearch||(e.preventDefault(),z(document).data("spaceSelect",!0))))}},mobile:function(){this.$element[0].classList.add("mobile-device")},refresh:function(){var e=z.extend({},this.options,this.$element.data());this.options=e,this.checkDisabled(),this.setStyle(),this.render(),this.createLi(),this.setWidth(),this.setSize(!0),this.$element.trigger("refreshed"+j)},hide:function(){this.$newElement.hide()},show:function(){this.$newElement.show()},remove:function(){this.$newElement.remove(),this.$element.remove()},destroy:function(){this.$newElement.before(this.$element).remove(),this.$bsContainer?this.$bsContainer.remove():this.$menu.remove(),this.$element.off(j).removeData("selectpicker").removeClass("bs-select-hidden selectpicker"),z(window).off(j+"."+this.selectId)}};var ee=z.fn.selectpicker;z.fn.selectpicker=X,z.fn.selectpicker.Constructor=Q,z.fn.selectpicker.noConflict=function(){return z.fn.selectpicker=ee,this},z(document).off("keydown.bs.dropdown.data-api",'.bootstrap-select [data-toggle="dropdown"], .bootstrap-select .dropdown-menu').on("keydown"+j,'.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bootstrap-select .bs-searchbox input',Q.prototype.keydown).on("focusin.modal",'.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bootstrap-select .bs-searchbox input',function(e){e.stopPropagation()}),z(window).on("load"+j+".data-api",function(){z(".selectpicker").each(function(){var e=z(this);X.call(e,e.data())})})}(e)});
//# sourceMappingURL=bootstrap-select.min.js.map