# emoji-db

Convenience functions around `emojilib`

## API

Functions to extract and pivot data from `emojilib`. Get and search
data about emojis by name, keyword, or category.

For each API type there is both a `emoji` and `char` version. The
`emoji` version returns metadata about the emoji while the `char`
version returns the emoji unicode character itself.

## Example usage

```
import {
    getChars,
    getNames,
} from 'emoji-db'

const allEmojiUnicodeChars = getChars()

const friendlyNames = getNames()

const grinningEmoji = getEmojiByName('grinning')
// {
//   "keywords": ["face", "smile", "happy", "joy", ":D"],
//   "char": "😀",
//   "category": "people"
// }

const grinningChar = getCharByName('grinning')
// 😀

const allKeywords = getKeywords()
// ["face", "smile", "happy", "joy", ":D"......]
// there are 1500+

let peopleEmojis = getEmojisByKeyword('people')
peopleEmojis = searchEmojisByKeywordPrefix('people')

let peopleChars = getCharsByKeyword('people')
peopleChars = searchCharsByKeywordPrefix('people')

...etc.
```
