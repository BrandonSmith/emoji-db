'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getEmojiNames = getEmojiNames;

var _emojilib = require('emojilib');

var _emojilib2 = _interopRequireDefault(_emojilib);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _flatMap = require('lodash/flatMap');

var _flatMap2 = _interopRequireDefault(_flatMap);

var _uniq = require('lodash/uniq');

var _uniq2 = _interopRequireDefault(_uniq);

var _keys = require('lodash/keys');

var _keys2 = _interopRequireDefault(_keys);

var _invert = require('lodash/invert');

var _invert2 = _interopRequireDefault(_invert);

var _mapValues = require('lodash/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

var _groupBy = require('lodash/groupBy');

var _groupBy2 = _interopRequireDefault(_groupBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getEmojiNames() {
    return _emojilib2.default.ordered;
}

var emojiList = (0, _map2.default)(_emojilib2.default.lib, 'char');

var getList = function getList() {
    return emojiList;
};

////////////////////////// NAME /////////////////////////////////////
var getByName = function getByName(name) {
    var e = emojis.lib[name];
    return e && e.char || e;
};

////////////////////////// KEYWORDS ///////////////////////////////////
var keywords = (0, _uniq2.default)((0, _flatMap2.default)(_emojilib2.default.lib, 'keywords'));

var getKeywords = function getKeywords() {
    return keywords;
};

var byKeyword = reduce(emojis.lib, function (result, e, name, c) {
    forEach(e.keywords, function (k) {
        if (result[k]) {
            result[k].push(e.char);
        } else {
            result[k] = [e.char];
        }
    });
    return result;
}, {});

var getListByKeyword = function getListByKeyword(keyword) {
    return byKeyword[keyword] || [];
};

////////////////////////// CATEOGRY ///////////////////////////////////
var byCategory = (0, _groupBy2.default)(emojis.lib, 'category');

var getListByCategory = function getListByCategory(category) {
    return byCategory[category] || [];
};

var categories = (0, _keys2.default)(byCategory);

var getCategories = function getCategories() {
    return categories;
};