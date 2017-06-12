# regexp-editor

https://regexp-graph.github.io/regexp-graph/

## Types

### value
codePoint: `<Number>`

Kind
- **symbol** <code><em>char<em></code>
- **singleEscape** <code>\\<em>char</em></code>
- **hexadecimalEscape** <code>\\x<em>hh</em></code> 
- **unicodeEscape**  <code>\\u<em>hhhh</em></code>
- **octal** <code>\\<em>digit</em></code>
- **null** <code>\0</code>


### anchor
codePoint: `<Number>`

Kind
- **start** <code>^</code>
- **end** <code>$</code>
- **boundary** <code>\b</code>
- **not-boundary** <code>\B</code>
- **controlLetter** <code>\c<em>char</em></code>


### characterClassEscape
\d value 'd'
\D value 'D'
\s value 's'
\S value 'S'
\w value 'w'
\W value 'W'


### characterClassRange
[0-9]


### dot
.


### quantifier
greedy: `<Boolean>`
min: `<Number>`
max: `<Number>`
body: `<Array>`

x*
x+
x?
x{1,2}


### group
body: `<Array>`

Behavior
- **normal** <code>(<em>x</em>)</code>
- **ignore** <code>(?:<em>x</em>)</code>
- **lookahead** <code><em>x</em>(?=<em>y</em>)</code>
- **negativeLookahead** <code><em>x</em>(?!<em>y</em>)</code>


### disjunction
x|y
body: `<Array>`


### characterClass
Negative
- **true** <code>[^<em>xyz</em>]</code>
- **false** <code>[<em>xyz</em>]</code>

### alternative
