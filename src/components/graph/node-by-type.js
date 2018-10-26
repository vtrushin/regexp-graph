import Value from './nodes/value'
import Anchor from './nodes/anchor'
import CharacterClassEscape from './nodes/character-class-escape'
import CharacterClassRange from './nodes/character-class-range'
import Dot from './nodes/dot'
import Quantifier from './nodes/quantifier'
import Group from './nodes/group'
import Disjunction from './nodes/disjunction'
import CharacterClass from './nodes/character-class'
import Alternative from './nodes/alternative'
import Reference from './nodes/reference'

export default {
	value: Value,
	anchor: Anchor,
	characterClassEscape: CharacterClassEscape,
	characterClassRange: CharacterClassRange,
	dot: Dot,
	quantifier: Quantifier,
	group: Group,
	disjunction: Disjunction,
	characterClass: CharacterClass,
	alternative: Alternative,
	reference: Reference
}
