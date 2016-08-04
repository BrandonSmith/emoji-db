import rawEmojis from 'emojilib/emojis'

import filter from 'lodash/filter'
import flatMap from 'lodash/flatMap'
import flatten from 'lodash/flatten'
import forEach from 'lodash/forEach'
import groupBy from 'lodash/groupBy'
import isString from 'lodash/isString'
import keys from 'lodash/keys'
import map from 'lodash/map'
import omitBy from 'lodash/omitBy'
import reduce from 'lodash/reduce'
import size from 'lodash/size'
import startsWith from 'lodash/startsWith'
import uniq from 'lodash/uniq'
import uniqBy from 'lodash/uniqBy'

const emojis = omitBy(rawEmojis, (e) => !e.char)

const searchFactory = (list, lookupFn) => {
    return (term) => {
        if (!isString(term) || size(term) < 2) return []

        const filtered = filter(list, (c) => startsWith(c, term))
        const matchedEmojis = map(filtered, (matchedTerm) => lookupFn(matchedTerm))
        return flatten(matchedEmojis)
    }
}

///////////////////// UNICODE //////////////////////////////////////
const emojiList = map(emojis, 'char')

const getChars = () => emojiList

////////////////////////// NAME /////////////////////////////////////
const emojiNames = keys(emojis)

const getNames = () => emojiNames

const getEmojiByName = (name) => {
    return emojis[name]
}

const getCharByName = (name) => {
    const e = emojis[name]
    return (e && e.char) || e
}

const searchEmojisByNamePrefix = searchFactory(emojiNames, getEmojiByName)
const searchCharsByNamePrefix = (term) => map(searchEmojisByNamePrefix(term), 'char')

////////////////////////// KEYWORDS ///////////////////////////////////
const keywords = uniq(flatMap(emojis, 'keywords'))

const getKeywords = () => keywords

const byKeyword = reduce(emojis, (result, e) => {
    if (e.char) { // don't care about emojilib's custom stuff
        forEach(e.keywords, (k) => {
            if (result[k]) {
                result[k].push(e)
            } else {
                result[k] = [e]
            }
        })
    }
    return result
}, {})

const getEmojisByKeyword = (keyword) => byKeyword[keyword] || []
const getCharsByKeyword = (keyword) => map(getEmojisByKeyword(keyword), 'char')

const searchEmojisByKeywordPrefix = searchFactory(keywords, getEmojisByKeyword)
const searchCharsByKeywordPrefix = (term) => map(searchEmojisByKeywordPrefix(term), 'char')

////////////////////////// CATEOGRY ///////////////////////////////////
const byCategory = groupBy(emojis, 'category')

const getEmojisByCategory = (category) => byCategory[category] || []
const getCharsByCategory = (category) => map(getEmojisByCategory(category), 'char')

const categories = keys(byCategory)

const getCategories = () => categories

const searchEmojisByCategoryPrefix = searchFactory(categories, getEmojisByCategory)
const searchCharsByCategoryPrefix = (term) => map(searchEmojisByCategoryPrefix(term), 'char')

////////////////////////////// SEARCH /////////////////////////////
const searchEmojisByAll = (term) => {
    const filteredEmojis = flatten(map([searchEmojisByNamePrefix, searchEmojisByKeywordPrefix, searchEmojisByCategoryPrefix], (fn) => fn(term)))
    return uniqBy(filteredEmojis, (e) => e.char)

}

export {
    getChars,

    getNames,
    getEmojiByName,
    getCharByName,
    searchEmojisByNamePrefix,
    searchCharsByNamePrefix,

    getKeywords,
    getEmojisByKeyword,
    getCharsByKeyword,
    searchEmojisByKeywordPrefix,
    searchCharsByKeywordPrefix,

    getCategories,
    getEmojisByCategory,
    getCharsByCategory,
    searchEmojisByCategoryPrefix,
    searchCharsByCategoryPrefix,

    searchEmojisByAll,
}
