# JavaScript Coding Standards and Guidelines

Table of Contents
-----------------

- [Overview](#overview)
- [Coding Guidelines](#coding-guidelines)
  * [Disagreements between the formatter and ESLint.](#disagreements-between-the-formatter-and-eslint)
  * [ES Syntax](#es-syntax)
  * [Classes or Modules?](#classes-or-modules-)
  * [CommonJS or ES Modules?](#commonjs-or-es-modules-)
    + [CommonJS Modules](#commonjs-modules)
    + [ES Modules](#es-modules)
    + [ES Classes](#es-classes)
  * [Promises and Async/Await](#promises-and-async-await)
  * [Type Checking](#type-checking)
  * [Checking an Object for a Property](#checking-an-object-for-a-property)
- [Coding Standards](#coding-standards)
  * [Naming Conventions](#naming-conventions)
  * [File Naming](#file-naming)
  * [Semi-colons](#semi-colons)
  * [Indentation](#indentation)
  * [Bracket Spacing](#bracket-spacing)
  * [Multi-line or Not?](#multi-line-or-not-)
    + [Functions](#functions)
    + [Chained Method Calls](#chained-method-calls)
    + [Conditionals](#conditionals)
    + [Arrays](#arrays)
  * [Variable Declaration](#variable-declaration)
    + [Variable Naming](#variable-naming)
    + [Const, Let and Var](#const--let-and-var)
      - [Performance](#performance)
    + [Globals](#globals)
    + [Multiple Variables](#multiple-variables)
  * [Function Declaration](#function-declaration)
    + [Anonymous Functions](#anonymous-functions)
    + [Shorthand Method Definition](#shorthand-method-definition)
    + [Arrow Functions or Regular Functions?](#arrow-functions-or-regular-functions-)
    + [Iterator and Generator Functions](#iterator-and-generator-functions)
  * [Object Declaration](#object-declaration)
  * [Strings](#strings)
  * [Loops and Control Structures](#loops-and-control-structures)
    + [For Loops](#for-loops)
    + [Using Async/Await with For Loops](#using-async-await-with-for-loops)
    + [Blocks](#blocks)
    + [If, If..Else](#if--ifelse)
    + [Switch Statements](#switch-statements)
  * [Exceptions](#exceptions)
    + [Empty Catch Blocks](#empty-catch-blocks)
  * [Short-circuit Conditionals](#short-circuit-conditionals)
  * [Comments](#comments)
  * [Equality Checking](#equality-checking)
  * [ES Classes](#es-classes-1)
    + [Private fields](#private-fields)
    + [Private methods](#private-methods)
  * [Object and Array Destructuring](#object-and-array-destructuring)

Overview
--------

Because this is an open source project, coding should not be an expression of personal style or preference or 
cleverness, it is about writing code that is easy to read and understand and maintainable.

This document refers to both client and server code, differences where applicable are made clear.

Coding Guidelines
-----------------

This is open source software. While you might not agree 100% on the standards used, _something_ has to be put in place
to ensure consistency, and the aim is to make easily readable code. `eslint` is used to check for syntax errors and
basic formatting guidelines. The `.editorconfig` file contains a full formatting configuration - this file can be imported into 
IDEA IDE's (WebStorm for example) for automatic code formatting. **Pull requests may be rejected if no effort is made to
adhere to this coding style.**

### Disagreements between the formatter and ESLint.

ESLint rules for "indent" are set to 4 spaces. This causes issues with the WS formatter for certain styles of coding. For example:

~~~
// This style is often preferred (keeping object literal braces on same line as function parenthesis)
routes.push ( {
    foo: 1, 
    bar: 'foo'
} );

// WebStorm turns it into this:
routes.push ( {
                  foo: 1, 
                  bar: 'foo'
              } );
              
// ESLint ofc complains about the "more than 4" spacing
// In order to resolve this, the object braces should be placed on their own line:
routes.push ( 
    {
        foo: 1, 
        bar: 'foo'
    } 
);
~~~

### ES Syntax
ES* syntax can/should be used in both client-side and server-side code. For server-side code no transpilers should be 
used - if the feature isn't supported by the target Node version, don't use it. Check [this page](https://node.green/) 
for confirmation of feature support. For client-side code, Babel handles transpilation to a syntax suitable for target 
browser support.

Don't use new shiny features _just because_ you want to look clever. Remember the principle of 
[K.I.S.S](https://en.wikipedia.org/wiki/KISS_principle). Code should be readable and easily understandable by others - 
don't make assumptions about other developers level of understanding on this - it's not a competition, 
[leave your ego](http://www.ameyalokare.com/software/development/2017/01/13/software-ego.html) at the door, _please_!

If performance optimisations or other justifiable reasons exist for coding in a way that isn't the simplest way to do 
it, leave a comment - explain why.

### Classes or Modules?
The general rule of thumb is; if a set of logically-grouped functions lends itself to be instantiated more than once, 
use an ES class. Otherwise use a module.

### CommonJS or ES Modules?
Use CommonJS modules for server-side code - ES modules are not yet supported properly. ES modules should be used 
client-side because Rollup/Babel understands them and transpiles them as needed, in fact ES modules play better with 
Rollup, Vue and many client-side 3rd party modules.

#### CommonJS Modules
~~~
// my-module.js
module.exports = {
    doSomething ( param1 ) {
        return param1;
    }
};

// script.js
const myMod = require( './my-module.js' );
console.log ( myMod.doSomething ( 'hello' ) );

// Or using object destructuring
const { doSomething } = require( './my-module.js' );
console.log ( doSomething ( 'hello' ) );
~~~

#### ES Modules
~~~
// my-module.js

// 1. Export individual functions
export function doSomething ( param1 ) {
    return param1;
}

// 2. Or export multiple at once
function doSomethingElse ( param1 ) {
    return param1;
}
export { doSomethingElse };

// 3. Or export in a similar way to CommonJS by providing a default object
export default {

    doSomethingDifferent ( param1 ) {
        return param1;
    }
	
};

// script.js

// 1. & 2. Pick specific methods only using object destructuring
import { doSomething } from './my-module.js';
console.log ( doSomething ( 'hello' ) );

// 3. Use a namespace for all methods
import * as myMod from './my-module.js'; 
console.log ( myMod.doSomething ( 'hello' ) );
~~~

#### ES Classes
Now we have decent ES support, there should be no reason to use any previous incarnations of "classes" as we've 
typically used before, such as extending object prototypes, and function-based object construction.

### Promises and Async/Await

Of course - no-one will need too much encouragement to move away from nasty Promise chains to async/await syntax!

Sometimes async/await may not be appropriate, so don't feel you _can't_ use a Promise. Although, the only use case that comes to mind is await'ing a traditional callback (example below).

**Always** wrap an await with `try…catch`. Wrap the entire enclosing function, or if you need more detailed error messaging (better), wrap each statement.

_If you do use Promises - always include a catch. Handle the entire operation locally - e.g. don't catch() locally, but then return the promise for the caller to handle then()'s. Either pass the entire promise back, or handle all locally._

~~~
// Top-level async IIFE wrapper - to allow top-level await
(async function main () {
  
    // Example of await'ing a traditional callback
    try {
        await new Promise ( r => httpServer.close ( r ) );
    } catch ( e ) {
        throw new Error ( `An error occurred closing the server: ${ e.message || e.toString() }` );
    }
    
    // Await a set of async commands to run in parallel
    try {
    
        const results = await Promise.all( 
            [
                userService.getOneById ( 123 ),
                orgService.getOneById ( 456 ),
                userGroupsService.search ( {
                    type: 'admin'
                } )
            ] 
        );
      
        // == 3
        console.log ( results.length );
        
    } catch ( e ) {
        throw new Error ( `An error occurred initialising the user session: ${ exceptions.parse( e ).message }` );
    }
    
    // Always include an explicit return - then it is clear you haven't forgotton 
    return;
  
})();
~~~

### Type Checking
The loosely typed nature of JavaScript gives the developer a lot of flexibility. However, we often need to verify or 
check the variable type. Use a central utility library such as [Lodash](https://lodash.com/docs/4.17.15) for type 
checking. Here is a [native type checking module](https://gist.github.com/TheFoot/ae00eb0812b766fcbe1c30c897b2ee65?ts=4). 

### Checking an Object for a Property
There are certain cases where an Object doesn't have an `hasOwnProperty` method, for example when it is actually 
defined as something else (`{ hasOwnProperty: 123 }`), or the object is being used as a map, and doesn't inherit 
from `Object.prototype`. Use `Object.prototype.hasOwnProperty.call( obj, ‘prop' )` instead:

~~~
// Broken - throws a TypeError
const someObject1 = { foo: 'bar', hasOwnProperty: 5 };
someObject1.hasOwnProperty ( 'foo' );

// Broken - throws a TypeError
const someObject2 = Object.create ( null );
someObject2.hasOwnProperty ( 'foo' );

// Safer
Object.prototype.hasOwnProperty.call ( someObject1, 'foo' );
Object.prototype.hasOwnProperty.call ( someObject2, 'foo' );

// Using TypeUtils
TypeUtils.hasProperty ( someObject1, 'foo' );
~~~

Coding Standards
----------------

### Naming Conventions
Use three main naming conventions only; **camelCase** for all variables and object properties (including pure JSON), 
**PascalCase** for Class and Module definitions, and 
[**SCREAMING_SNAKE_CASE**](https://en.wikipedia.org/wiki/Snake_case#History) for constants.

~~~
// Variables
const amIMad = true;
const myAge = 21;
const name = 'Englebert Humperdinck';
const meaningFullGenders = [
    'Male',
    'Female',
    'Don't go there'
];

// Classes and objects
const MyClass = require( './my-class.class.js' );
const myObject = new MyClass ();
myObject.dynamicProperty = 123;
console.log ( myObject.CONSTANT_VALUE );
class Alien = {
    ...
}

// Modules
const MyModule = {
    ...
};
module.exports = MyModule;
~~~

### File Naming
File names should always use hyphens not underscores. No hard and fast rules in terms of enhancing the file extension, 
but try to describe what the file represents - and above all - be consistent through your project:

~~~
// An ES module
string-utils.es6.js

// An ES Class
customer.class.js

// CommonJS module - it's ok to assume a default
// - just keep it consistent through a single project
file-utils.js

// The folder describes the usage - so no need to go any further
// (Unless ofc you have lots of middleware)
middleware/block-all-users.js
middleware/clone-all-data-to-anon-server.es6.js
~~~

### Semi-colons
This point has been argued for a decade+. Please use semi-colons - it is just safer. If you miss them out ESLint will 
tell you.

### Indentation
Indent all code using a single "soft" tab per indentation, which should represent 4 spaces. Do not use hard tabs 
(the \t character). Yes - this is a controversial point, we have to pick one side of the argument for consistency, 
here are some justifications to make you all feel better:

*   Automatic code formatting rules for multi-line formatting, often break when using hard tabs.
*   Hard tabs generally cause more issues than they solve when working in teams; Fred likes tabs to be 8 spaces, 
Lauren likes 4 spaces. Fred tries running a command line diff… :exploding_head:
*   Hard tab size cannot as easily be enforced - editors can be configured to treat hard tabs as 2, 4, 6 or 8 spaces etc.
*   Automatically converting tabs to spaces is easy, the other way round… not so.

### Bracket Spacing
Add spaces inside and outside of brackets - one before and one after. E.g.

~~~
// Function declarations
function slapMe ( firstSlapLocation, secondSlapLocation ) {
    // ...
}

// Array declarations
const myList = [ 'blahblahblah1', 'blahblahblah2' ];

// Function call
slapMe ( 'leftCheek', 'rightEyeSocket' );
~~~

### Multi-line or Not?

#### Functions

Always declare functions using multi-line syntax - it is consistent and easier to spot errors when scanning through 
code quickly:
~~~
// Do this
function fooBar () { 
    return 'FUBAR'; 
}

// Don't do this
function fooBar () { return 'FUBAR'; }

// Forgivable exception - because the alternative is probably less readable
myArray
    .map ( x => `${ x }_suffix`)
    .filter ( x => x.startsWith( 'prefix_' ) )
    ;
~~~

#### Chained Method Calls
Break chained method calls into one call per line, indent each call.
~~~
const shapes = [
    { name: 'circle', hasCorners: false, hasRightAngle: false },
    { name: 'triangle', hasCorners: true, hasRightAngle: false },
    { name: 'rectangle', hasCorners: true, hasRightAngle: true },
    { name: 'rhombus', hasCorners: true, hasRightAngle: false },
    { name: 'square', hasCorners: true, hasRightAngle: true }
];

const formattedCorneredRightAngledShapes = shapes
    .filter ( shape => {
        return shape.hasCorners && shape.hasRightAngle;
    } )
    .map( shape => _.startCase( shape.name ) )
    .join ( ', ' )
    ;
~~~

#### Conditionals
If you have multiple conditions - use common sense to determine what is readable and what isn't, break each condition 
onto a new line, and place the operator at the end of the line.

_NOTE: If you have no common sense_ :) _use this rule: if the line exceeds 120 characters, break the statement down into chunks that fit within an 120-char line._
~~~
// Not sensible
if ( ( myLongVariableName > 2 && myLongVariableName < 5 ) || thisIsSilly.includes( 'Are You Mental?' ) ){
    // ..
}

// Sensible
if ( 
    ( myLongVariableName > 2 && myLongVariableName < 5 ) || 
    thisIsSilly.includes( 'Are You Mental?' ) 
) {
    // ..
}

// No-brainer
if ( a === 1 && !brainDead ){
    // ...  
}
~~~

#### Arrays
~~~
// Not sensible
const myList = [ 'blahblahblah1', 'blahblahblah2', 'blahblahblah3', 'blahblahblah4', 'blahblahblah5', 'blahblahblah6', 'blahblahblah7' ];

// Sensible
const myList = [ 
    'blahblahblah1', 'blahblahblah2', 'blahblahblah3', 
    'blahblahblah4', 'blahblahblah5', 'blahblahblah6',
    'blahblahblah7'
];
~~~

### Variable Declaration

#### Variable Naming
Long variable names are fine. Short ones are bad - if it isn't **clear what they represent**. The name should describe 
what data it holds, and/or it's purpose. Best indicated by examples:
~~~
// Eh whaat? Fail..
const a = 256;

// Good
const ramAvailableMb = 256;

// Forgivable exception - it's obvious what they do
for ( const i = 0, len = 10; i < len; i++ ){
    // ...
}

// Pointless
const iAmABooleanValue = false;
~~~

#### Const, Let and Var
If you don't know the difference by now, stop reading this and read 
[this](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript).

While some consider `var` to be helpful (indicative) in some situations, **don't use it**. We've moved into a 
block-scoping world, so let's embrace it, show that we understand what it means, and make proper choices between 
`const` and `let`.

##### Performance

`const` provides a better _opportunity_ than `var` for the v8 compiler to optimise. But `const` does not _always_ 
mean better optimisation - the v8 engine uses a variety of rules to optimise performance.

A couple of things to consider:
~~~
// This works because the variable is assigned to an object
// The object doesnt change, only its properties.
// E.g. const declares an immutable _binding_ only
const myHouse = {
    hasRoof: true,
    style: 'semi-detached'
};
myHouse.style = 'detached';

// This doesn't work because the binding is changed
const myFlat = { 
    hasRoof: false
}
myFlat = {
    style: 'flat'
}
~~~

#### Globals
General rule of thumb is to avoid globals where possible. For server-side code - sometimes using a global 
helps - e.g. when inside an HTTP request flow. Just be aware of multi-process, multi-session states - a global 
value should not be changed once it is instantiated when the service or application starts.

For _native_ client-side code - you should wrap code in either an IIFE (Immediately-invoked Function Expression), or 
use a namespace (global namespace variables are OK to use - but be careful with naming - and be aware that third party 
lib globals or namespaces may clash).

When working with Rollup and Vue - everything should be in ES Modules or Vue single-file components anyway - Rollup will
take care of producing properly wrapped native code.
~~~
// Example of a valid server-side global use case - it should not change
global.currentApiVersion = 'v2.0';

// Example of native client-side IIFE wrapper
( function main ( $, win ){

    // Do yo thang.. everything inside here is scoped locally
    // ...

} )( jQuery, window );

// Example of using a native namespace
global.NS = global.NS || {
    aProp: 123
};
global.NS.myMethod = function () { ... }
~~~

#### Multiple Variables
You can declare multiple variables either of the following ways, but make sure you are consistent throughout your 
project. If you choose the second method, make sure you align the assignments.
~~~
// Full declaration per line
let counter = 0;
let total = 0;
let index = 0;
let myVeryLongVariableNameForExample = 'Nothing wrong with long variable names, better to be able to see straight away what they do right?';

// If you choose this way, make sure they line up
let counter                           = 0,
    total                             = 0,
    index                             = 0,
    myVeryLongVariableNameForExample  = 'Nothing wrong with long variable names, better to be able to see straight away what they do right?'
    ;
~~~

### Function Declaration

#### Anonymous Functions

While it is OK to use an anonymous function, it is better to use a named function for the following reasons:

*   Named functions are easier to debug - stack traces include more information
*   Anonymous functions cannot be re-used - which is useful when it comes to disabling event handlers for example
*   Anonymous functions are harder to test than named functions
*   Named functions are clearer and it is easier to understand their purpose

#### Shorthand Method Definition
When declaring functions within a class definition, or as an object property, use shorthand definition - it is 
cleaner and easier to read:
~~~
  // Class definition
class Monkey {

    constructor ( name ) {
        this.name = name;
        this.intent = 'no evil';
    }
    
    see () {
        return `I see ${ this.intent }`;
    }
    
    do () {
        return `I do ${ this.intent }`;
    }
    
    introduce () {
        return `Hi, my name is ${ this.name }. ${ this.see () }, and ${ this.do () }.`;
    }

}

// Object properties
const monkeyCollection = {

    items: [],
    
    add ( ...items ) {
        this.items.push ( ...items );
    },
    
    show () {
        this.items.forEach ( monkey => console.log ( monkey.introduce () ) );
    }

};

const bob = new Monkey ( 'Bob the chimp' );
const sid = new Monkey ( 'Sid the orangutan' );

monkeyCollection.add ( bob, sid );
monkeyCollection.show ();

/*
    Hi, my name is Bob the Chimp. I see no evil, and I do no evil.
    Hi, my name is Sid the Orangutan. I see no evil, and I do no evil.
*/
~~~

#### Arrow Functions or Regular Functions?
Arrow functions are a nice way to make clean one-line functions (see above example). If you don't understand the 
functional difference, 
[read this](https://medium.com/better-programming/difference-between-regular-functions-and-arrow-functions-f65639aba256). 
When choosing between the two, firstly consider scope, _then_ consider code style.

If your decision is made due to scope - add a comment to clarify - it makes it much easier to understand your code when 
another developer skims through quickly. Scope rules are sometimes not immediately obvious - so help out 
and **make it obvious**.

_NOTE: Avoid using arrow functions in Mocha tests as this will often 
produce_ [_issues with scope_](https://mochajs.org/#arrow-functions)_._

#### Iterator and Generator Functions
Interactions between Iterators and Generators can get confusing and are non-trivial to understand.

If you do have a use case that requires Iterator and/or Generator functions, **please comment the code well** - the 
chances of other developers not fully understanding how/why/etc are probably fairly high - given the rarity in which 
they _actually_ need to be used.

### Object Declaration
Use object literal syntax, rather than the Object constructor:
~~~
// Bad
const foo = new Object ();

// Good
const foo = {};

// Use property value shorthand where possible:

const type = 'car';

// Bad
const vehicle = {
    type: type
};

// Good
const vehicle = { type };
~~~

### Strings
String literals should always be single-quotes. If they include a single quote, escape it.
Do not use template literals unless they contain interpolated variable references.
~~~
// Bad shiz
const whatsMyName = "I'm Harry the Plonker";
const personalStatement = `I am really good at... stuff.`;

// Good shiz
const whatsMyName = 'I\'m Harry the Plonker';
const personalStatement = `I am really good at ${ skillz.join( ', ' ) }`;

/*
    Unless you really need to preserve spacing 
    (probably not often in an indented JS file)
    then don't use multi-line template literals _just because_
*/

// Not pretty
const personalStatement = skillz
    .filter( skill => skill.isRelevant )
    .map ( skill => `I am able to do ${ skill.name } really well. 
In fact I am so good at ${ skill.extendedDescription }, 
that I cannot be taught another damn thing about it.`)
    .join( '\n' )
    ;
    
// Cleaner
const personalStatement = skillz
    .filter( skill => skill.isRelevant )
    .map ( skill => {
    
        // In reality - if you need to deal with BIG texts
        // put them in a resource file and use string interpolation
        // (Handlebars or whatever is most relevant - use the right tool for the job)
    
        return `I am able to do ${ skill.name } really well.\n` +
            `In fact I am so good at ${ skill.extendedDescription }, \n` +
            'that I cannot be taught another damn thing about it.';
            
    })
    .join( '\n' )
    ;   
~~~

### Loops and Control Structures

#### For Loops
Do not use `for..in` loops to iterate over Arrays. In fact, try not to use them at all. Use `for..of` loops. 
To iterate over an Object's properties, use `Object.keys()` and `Object.entries()` within a `for..of` loop.

Generally, when performance is a concern, [use basic for loops](https://stackoverflow.com/a/7252102/2166462).

Try to avoid `Array.forEach()` unless you know that you need to process every item in the array. You can't 
use `break` or `continue` for `.forEach()`, and it doesn't play well with `async/await`.
~~~
const weirdAnimals = [
    { id: 1, name: 'Ribbon Worm' },
    { id: 2, name: 'EWestern Tarsier' },
    { id: 3, name: 'Sloane\'s Viperfish' },
    { id: 4, name: 'Bald Uakari' },
    { id: 5, name: 'Mata Mata' },
    { id: 6, name: 'Java Developer' }
];

// Iterate over a collection
for ( const [ idx, animal ] of Object.entries ( weirdAnimals ) ) {
    console.log ( `#${ animal.id } ${ animal.name }`, idx );
}

// Iterate over a collection (no index)
for ( const [ , animal ] of Object.entries ( weirdAnimals ) ) {
    console.log ( `#${ animal.id } ${ animal.name }` );
}

// Generate a large array
const lotsOfNumbers = Array.from ( Array ( 1000000 ).keys () );

// Process a large array - declare length once only
for ( let i = 0, len = lotsOfNumbers.length; i < len; i++ ) {
    lotsOfNumbers[ i ] = lotsOfNumbers[ i ] - 1;
}
~~~

#### Using Async/Await with For Loops
To process an array of Promises or async functions, in sequential order, use a standard `for` loop:
~~~
// Async function - demonstrates how to await a traditional node-style callback
async function getResource ( id ) {
    return await new Promise ( resolve => {
        setTimeout (
            () => resolve ( {
                id  : id,
                name: `test_${ id }`
            } ),
            500
        )
    } );
}

// In order to await anything at top-level we need an immediately-invoked async function wrapper
( async function main () {

    const idsToFetch = [ 1, 5, 123, 999 ];
    
    // Use a standard for loop
    for ( const id of idsToFetch ) {
    
        const resource = await getResource ( id );
        console.log ( resource.name );
    
    }

} ) ();
~~~

#### Blocks
Always use braces with blocks.
~~~
// Bad
if ( thing )
    return false;
    
if ( thing ) return thingService ( { foo: 'bar' } );
    
// "OK"
if ( thing ) return false;

// Better
if ( thing ) {
    return false;
}

if ( thing ) {
    return thingService ( { 
        foo: 'bar' 
    } );
}
~~~

#### If, If..Else
Don't break the `else` onto a new line - use the below format:
~~~
if ( amIMad ) {
    // ..
} else if ( amISlightlyMad ) {
    // ..
} else {
    // ..
}
~~~

#### Switch Statements
When using fall-through logic - include a comment to explain why. Separate each case block with an empty line. 
No need to always include a default case - but explain why with a comment if the surrounding code logic doesn't 
make that clear.

Some general rules for deciding whether to use `switch` statements vs `if..else` statements:

Use a `switch` statement if:

*   You are comparing multiple possible conditions of an expression and the expression itself is non-trivial.
*   You have multiple values that may require the same code.
*   You have some values that will require essentially all of another value's execution, plus only a few statements.

Use an `if` statement when:

*   You want to test for the truthiness of an expression.
*   You only have one or two affirmative tests.
*   You need to evaluate different expressions for each branch
~~~
// Process any backdoor keypress
switch ( event.keyCode ) {

    // ENTER and SPACE will both take the user to the moon 
    case uiLib.keyCodes.ENTER:
    case uiLib.keyCodes.SPACE:
        flyToTheMoon ();
        break;
        
    case uiLib.keyCodes.ESCAPE:
        takeABusToHell ();
        break;

}

// Log the keypress
logService.logKeyPress ( event.keyCode );
~~~

### Exceptions
Exceptions should ideally be constructed using a custom exceptions class, to ensure uniformity of response and 
implementation of documentable error codes.

When handling ad-hoc errors, always use `new Error()` syntax - never throw unknown types, or string literals etc.

Be liberal with your use of `try..catch`. If you omit it because you _want_ the exception to bubble up to the 
caller - explain why.

#### Empty Catch Blocks
In some cases, it is perfectly normal to catch and ignore an error. What is not normal is to not explain why - without 
a comment - another developer cannot be sure if this is simply bad coding or a real use-case.
~~~
// Call a third-party lib method
try {
    const user = usersService.fetchByUserName ( null );    
} catch ( e ) {
    
    // Maybe usersService was built by the Java team ;-)
    // Not too sure what it may return
    
    // Ideal solution
    throw exceptions.parse ( e );
    
    // Minimal solution
    throw new Error ( e.message || e.toString () );
    
}

// Empty catch block
let cart = {};
try {
    cart = JSON.parse ( req.body.cart );
} catch ( e ) {
    // Let cart service deal with "no cart"
}

cartService.addCart ( cart );
~~~

### Short-circuit Conditionals
Avoid using short-circuit conditionals and favour full syntax for readability and consistency. Creating "short" source
code doesn't make any difference at run-time.
~~~
// Bad
condition && doSomething ();

// Good
if ( condition ) {
    doSomething ();
}
~~~

### Comments
Always place comments before the code it refers to, not after (who _does_ that?).

Single-line comments should have a space in between the `//` and the start of the sentence.

Please use proper English grammar (UK preferably ;-)! Remember you are communicating with other human beings, not the 
computer, or writing an instant :_msg:_. **Sentences start with a capital bloody letter…**

Avoid the use of inline comments. If a function parameter needs an explanation, include it in the function comment, 
not inline next to the parameter.

Examples below:
~~~
/*
    This is a block comment. Standard 4-space indentation.
    Use block style to describe a section of code, or a method/function
*/

/**
*   @module foo/bar
*   @author Englebert Humperdinck
*   This is a jDoc style comment. 
*   You can use this style at the top of class or module files.
*   It helps make it stand out from other block comments.
*   Oh yeah - and you can automatically generate documentation!
*/

// This is a single-line comment. Use to describe a single statement or small task.

// It is ok for a single-line comment to span multiple lines!
// For example the following code may be a single action, but it might
// have a few caveats and gotchas.

//this is incorrect. is you illeterate? (or Hungarian?) :D :omg: :lol: (personal joke)

// This is an example of an inline comment - don't do it
const naughtyComment = function ( url, options /* Blah de blah */ ) {
    // ...
};

/*
    This is a better approach.
    Params:
        url       String    A URL to fetch the resource from
        options   Options   Object
          - method    String    HTTP Method
          - timeoutMs Integer   Request timeout in milliseconds
            
    NOTE: Even better would be a proper jsDoc comment!
            
*/
const wellCommented = function ( url, options ) {
    // ...
};
~~~

### Equality Checking
Always use strict equality checks. No exceptions. If you think you have a case for a loose equality check - 
you're approach is probably wrong.
~~~
// Some may argue that this is safe, because typeof always returns a string
// But it is not consistent. This argument can also be made for strict checking.
if ( typeof x == "function" ) {
    // ...
}

// Correct
if ( typeof x === "function" ) {
    // ...
}

// Some like to check for NULL or undefined like this:
if ( insideMyHead == null ) {
    // ...
}

// It is more verbose, but this is safer
if ( [ null, undefined ].includes ( insideMyHead ) ) {
    // ...
}

// Better - use centralised type checking functions
if ( typeUtils.isNullOrUndefined ( insideMyHead ) ) {
    // ...
}
~~~

### ES Classes
A [class example can be found here](https://gist.github.com/TheFoot/f98f968bf582fd79fae498dfb94d4d18?ts=4), demonstrating 
constructors, public / private methods and properties, basic inheritance, getters/setters and static methods.

A minimal ES class example:
~~~
// my-class.class.js
class MyClass {
  
    doSomething ( param1 ) {
        return param1;
    } 
  
}

// script.js
const myObject = new MyClass();

// An example using a class constructor:

// my-class.class.js
class MyClass {
  
    constructor ( num1 ) {
    
        // Init class property
        this.num1 = num1;
    
    }
    
    factorIt ( num2 ) {
        return this.num1 * num2;
    } 
  
}

// script.js
const myObject = new MyClass( 2 );
console.log( myObject.factorIt( 10 ) ); // 20
~~~

#### Private fields

"Private class fields" (prefixed with a #hash) are supported by Node v12, and Rollup/Babel, but ESLint doesn't support 
them yet, and because the proposal for private _methods_ is still in draft, we should avoid for now and simply use the 
following mechanism:
~~~
// Prefix private variables with an underscore
let _count = 0;

class MyClass {

    addAndReport () {
        return _count++;
    };

};
~~~

#### Private methods
There is currently no way to define private methods, getters or setters. For now, 
use [Symbols](https://medium.com/javascript-in-plain-english/deep-dive-into-es6-symbols-3b44f4ba7eb3) to declare 
private methods. Symbols aren't _proper_ private method declarations, and have a "backdoor", but are (arguably) the most 
semantic choice available at the moment. Use Symbols for now, this will be revisited later once ES offers a 
well-supported mechanism.
~~~
// Declare Symbols for private methods
const _parseError = Symbol ( 'parseError' );

class MyClass {

    doSomething ( param1 ) {
        try {
            return param1 / 0;
        } catch (e) {
            throw this[ _parseError ]( e );
        }
    }
    
    [ _parseError ] ( e ) {
  
        // Do some custom error parsing
        return new Error ( e );
    
    }

};
~~~

### Object and Array Destructuring
Use destructuring when accessing multiple properties of an object, this saves from creating temporary references.
~~~
// Bad
function getFullName ( user ) {
    
    const firstName = user.firstName;
    const lastName = user.lastName;
  
    return `${ firstName } ${ lastName }`;
    
}

// Good
function getFullName ( user ) {
    const { firstName, lastName } = user;
    return `${ firstName } ${ lastName }`;
}

// Better
function getFullName( { firstName, lastName } ) {
    return `${ firstName } ${ lastName }`;
}
~~~

Always use destructuring when accessing individual array elements.
~~~
const customers = [
    { id: 1, firstName: 'Bob' },
    { id: 2, firstName: 'Sid' },
    { id: 3, firstName: 'Nob' }
];

// Bad
const first = customers[ 0 ];
const second = customers[ 1 ];

// Good
const [ first, second ] = customers;
~~~

Use object destructuring when returning multiple values, not array destructuring.
~~~
// Bad
function getBounds ( input ) {
  
    // ...
    
    return [ left, right, top, bottom ];
    
}

// The caller needs to think about the order of return data
const [ left, ,top ] = getBounds ( input );

// Good
function getBounds ( input ) {
  
    // ...
    
    return { left, right, top, bottom };
    
}

// The caller selects only the data they need
const { left, top } = getBounds ( input );
~~~

* * *

_Author:_  _[@TheFoot](https://github.com/TheFoot)_