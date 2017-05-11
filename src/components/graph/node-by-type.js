import Value from './nodes/Value'
import Anchor from './nodes/Anchor'
import CharacterClassEscape from './nodes/CharacterClassEscape'
import CharacterClassRange from './nodes/CharacterClassRange'
import Dot from './nodes/Dot'
import Quantifier from './nodes/Quantifier'
import Group from './nodes/Group'
import Disjunction from './nodes/Disjunction'
import CharacterClass from './nodes/CharacterClass'
import Alternative from './nodes/Alternative'
import Reference from './nodes/Reference'

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
