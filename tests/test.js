import * as emojis from '../src'

import chai from 'chai'

const { assert, expect, should } = chai

chai.should()

const NUM_OF_EMOJIS = 1284
const EMOJI_KEYS = ['keywords','char','category']

describe('emojis', () => {
    describe('#getNames()', () => {
        it('should return a list of emoji names', () => {
            const list = emojis.getNames()
            expect(list).to.be.instanceof(Array)
            expect(list.length).to.be.equal(NUM_OF_EMOJIS)
        })
    })

    describe('#getList()', () => {
        it('should return a list of emoji unicode chars', () => {
            expect(emojis.getList().length).to.be.equal(NUM_OF_EMOJIS)
        })
    })

    describe('#getCharByName()', () => {
        it('should return an emoji char by name', () => {
            expect(emojis.getCharByName('sweat_smile')).to.be.equal('😅')
        })

        it('should return undefined for non-existant name', () => {
            expect(emojis.getCharByName('unsavory_pickle')).to.be.undefined
        })
    })

    describe('#getEmojiByName()', () => {
        it('should return an emoji meta-object', () => {
            const e = emojis.getEmojiByName('sweat_smile')
            expect(e).to.be.an('object')
            expect(e).to.have.all.keys(EMOJI_KEYS)
        })
    })

    describe('#getKeywords()', () => {
        it('should return a list of emoji names', () => {
            const list = emojis.getKeywords()
            expect(list).to.be.instanceof(Array)
            expect(list.length).to.be.equal(1542)

            list.forEach((keyword) => {
                expect(keyword).to.not.equal(undefined)
                expect(keyword).to.not.equal(null)
                expect(keyword).to.not.equal('')
            })
        })
    })

    describe('#getEmojisByKeyword()', () => {
        it('should return a list of emojis matching keyword', () => {
            const list = emojis.getEmojisByKeyword('face')
            expect(list).to.be.instanceof(Array)
            expect(list.length).to.be.equal(65)

            list.forEach((e) => {
                expect(e).to.be.an('object')
                expect(e).to.have.all.keys(EMOJI_KEYS)
            })
        })

        it('should return empty list with bad args', () => {
            ['', 'cateogy-home-run', undefined, NaN].forEach(arg => {
                let list = emojis.getEmojisByKeyword(arg)
                expect(list).to.be.instanceof(Array)
                expect(list).to.be.empty
            })
        })
    })

    describe('#getCharsByKeyword()', () => {
        it('should return a list of emojis in keyword', () => {
            const list = emojis.getCharsByKeyword('face')
            expect(list).to.be.instanceof(Array)
            expect(list.length).to.be.equal(65)

            list.forEach((e) => {
                expect(e).to.be.an('string')
            })
        })

        it('should return empty list with bad args', () => {
            ['', 'cateogy-home-run', undefined, NaN].forEach(arg => {
                let list = emojis.getCharsByKeyword(arg)
                expect(list).to.be.instanceof(Array)
                expect(list).to.be.empty
            })
        })
    })

    describe('#getEmojisByCategory()', () => {
        it('should return a list of emojis in category', () => {
            const list = emojis.getEmojisByCategory('flags')
            expect(list).to.be.instanceof(Array)
            expect(list.length).to.be.equal(247)

            list.forEach((e) => {
                expect(e).to.be.an('object')
                expect(e).to.have.all.keys(EMOJI_KEYS)
            })
        })

        it('should return empty list with bad args', () => {
            ['', 'cateogy-home-run', null, undefined, 1, NaN].forEach(arg => {
                let list = emojis.getEmojisByCategory(arg)
                expect(list).to.be.instanceof(Array)
                expect(list).to.be.empty
            })
        })
    })

    describe('#getCharsByCategory()', () => {
        it('should return a list of emojis in category', () => {
            const list = emojis.getCharsByCategory('flags')
            expect(list).to.be.instanceof(Array)
            expect(list.length).to.be.equal(247)

            list.forEach((e) => {
                expect(e).to.be.an('string')
            })
        })

        it('should return empty list with bad args', () => {
            ['', 'cateogy-home-run', null, undefined, 1, NaN].forEach(arg => {
                let list = emojis.getCharsByCategory(arg)
                expect(list).to.be.instanceof(Array)
                expect(list).to.be.empty
            })
        })
    })

    describe('#getCategories()', () => {
        it('should return a list of categories', () => {
            const list = emojis.getCategories()
            expect(list).to.be.instanceof(Array)
            expect(list.length).to.be.equal(8)

            list.forEach((e) => {
                expect(e).to.be.an('string')
            })
        })
    })

    describe('#searchEmojisByKeywordPrefix()', () => {
        it('should return a list of matched emojis', () => {
            const list = emojis.searchEmojisByKeywordPrefix('fl')
            expect(list.length).to.be.equal(272)

            list.forEach((e) => {
                expect(e).to.be.an('object')
                expect(e).to.have.all.keys(EMOJI_KEYS)
            })
        })

        it('should return a list of matched emoticons', () => {
            const list = emojis.searchEmojisByKeywordPrefix(':D')
            expect(list.length).to.be.equal(3)

            list.forEach((e) => {
                expect(e).to.be.an('object')
                expect(e).to.have.all.keys(EMOJI_KEYS)
            })
        })

        it('should return empty list for search term less than 2', () => {
            const check = (list) => {
                expect(list).to.be.instanceof(Array)
                expect(list.length).to.be.empty
            }
            ['', 'cateogy-home-run', null, undefined, 1, NaN].forEach(arg => {
                check(emojis.searchEmojisByKeywordPrefix(arg))
            })
            check(emojis.searchEmojisByKeywordPrefix())
        })
    })

    describe('#searchEmojisByAll()', () => {
        it.only('should return a list', () => {
            const list = emojis.searchEmojisByAll('haha')
            expect(list).to.be.instanceof(Array)
            expect(list.length).to.be.equal(6)
            list.forEach((e) => {
                expect(e).to.be.an('object')
            })
        })
    })
})
