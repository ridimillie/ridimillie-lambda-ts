"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchNaverBook = exports.kyoboBook = exports.yes24 = exports.millie = exports.ridiSelect = void 0;
var request = require("request");
var cheerio = require("cheerio");
var types_1 = require("../types");
var BookPrice_1 = require("../class/BookPrice");
var puppeteerRequest_1 = require("./puppeteerRequest");
var ridiSelect = function (title) { return __awaiter(void 0, void 0, void 0, function () {
    var platform, url, selector, childSelectorArr, book;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                platform = 'RIDI';
                url = 'https://select.ridibooks.com/search?q=' +
                    encodeURI(title) +
                    '&type=Books';
                selector = '#app > main > ul> li';
                childSelectorArr = ['div > div > a > h3 ', 'div > div > a', 'a h3'];
                return [4 /*yield*/, puppeteerRequest_1.pupRequest(url, selector, childSelectorArr, types_1.Platforms[platform], title, types_1.SubscribePrice.RIDI, 'https://select.ridibooks.com')];
            case 1:
                book = _a.sent();
                return [2 /*return*/, book];
        }
    });
}); };
exports.ridiSelect = ridiSelect;
var millie = function (title) { return __awaiter(void 0, void 0, void 0, function () {
    var platform, url, selector, childSelectorArr, book;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                platform = 'MILLIE';
                url = 'https://www.millie.co.kr/v3/search/result/' +
                    encodeURI(title) +
                    '?type=all&order=keyword&category=1';
                selector = '#wrap > section > div > section.search-list > div > ul > li';
                childSelectorArr = [
                    'a > div.body > span.title',
                    'a',
                    'a div.body span.title',
                ];
                return [4 /*yield*/, puppeteerRequest_1.pupRequest(url, selector, childSelectorArr, types_1.Platforms[platform], title, types_1.SubscribePrice.MILLIE)];
            case 1:
                book = _a.sent();
                return [2 /*return*/, book];
        }
    });
}); };
exports.millie = millie;
var yes24 = function (title) {
    return new Promise(function (resolved, rejected) {
        var url = 'https://bookclub.yes24.com/BookClub/Search?keyword=' +
            encodeURI(title) +
            '&OrderBy=01&pageNo=1';
        var options = {
            url: url,
            headers: { 'User-Agent': 'Mozilla/5.0' },
            encoding: null,
        };
        request.get(options, function (error, response, body) {
            if (error) {
                rejected(response.statusCode);
            }
            var $ = cheerio.load(body);
            var selector = '#ulGoodsList > li';
            var childSelectorArr = [
                'div > div > div > a',
                'div > p > span > a',
            ];
            $(selector).each(function (_, list) {
                var title = $(list).find(childSelectorArr[0]).text();
                var redirectURL = $(list)
                    .find(childSelectorArr[1])
                    .attr('href');
                resolved(new BookPrice_1.default(title, types_1.Platforms.YES24, 'http://bookclub.yes24.com' + redirectURL, types_1.ServiceType.SUBSCRIBE, types_1.SubscribePrice.YES24));
            });
            resolved(null);
        });
    });
};
exports.yes24 = yes24;
var kyoboBook = function (title) { return __awaiter(void 0, void 0, void 0, function () {
    var platform, url, selector, childSelectorArr, book;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                platform = 'KYOBO';
                url = 'https://search.kyobobook.co.kr/web/search?vPstrKeyWord=' +
                    encodeURI(title) +
                    '&orderClick=LEK&searchCategory=SAM%40DIGITAL&collName=DIGITAL&searchPcondition=1';
                selector = '#search_list > tr';
                childSelectorArr = [
                    'td.detail > div.title > a > strong',
                    'td.detail > div.title > a',
                    'td.detail div.title a strong',
                    'td.detail > div.icon > img',
                ];
                return [4 /*yield*/, puppeteerRequest_1.kyoboPupRequest(url, selector, childSelectorArr, types_1.Platforms[platform], title, types_1.SubscribePrice.KYOBO_BASIC)];
            case 1:
                book = _a.sent();
                return [2 /*return*/, book];
        }
    });
}); };
exports.kyoboBook = kyoboBook;
var searchNaverBook = function (bid) {
    return new Promise(function (resolved, rejected) {
        var platformIdMap = new Map([
            [types_1.Platforms.RIDI, 'RIDI'],
            [types_1.Platforms.MILLIE, 'MILLIE'],
            [types_1.Platforms.YES24, 'YES24'],
            [types_1.Platforms.KYOBO, 'KYOBO'],
            [types_1.Platforms.ALADIN, 'ALADIN'],
            [types_1.Platforms.INTERPARK, 'INTERPARK'],
            [types_1.Platforms.NAVER, 'NAVER'],
        ]);
        var reversedPlatformIdMap = new Map([
            ['RIDI', types_1.Platforms.RIDI],
            ['MILLIE', types_1.Platforms.MILLIE],
            ['YES24', types_1.Platforms.YES24],
            ['KYOBO', types_1.Platforms.KYOBO],
            ['ALADIN', types_1.Platforms.ALADIN],
            ['INTERPARK', types_1.Platforms.INTERPARK],
            ['NAVER', types_1.Platforms.NAVER],
        ]);
        var url = 'https://book.naver.com/bookdb/book_detail.nhn?bid=' + bid;
        var options = {
            url: url,
            headers: { 'User-Agent': 'Mozilla/5.0' },
            encoding: null,
        };
        request.get(options, function (error, response, body) {
            if (error) {
                rejected(response.statusCode);
            }
            var $ = cheerio.load(body);
            var selector = '#productListLayer > ul > li';
            var books = [];
            $(selector).each(function (_, book) {
                var isEbook = $(book).find('strong').text();
                var platform = $(book).find('div > a').text();
                var price = $(book).find('span > em').text();
                var redirectURL = $(book).find('div > a').attr('href');
                if (isEbook.match('ebook')) {
                    var platformName = platform.split('Naver')[0];
                    books.push({
                        platform: reversedPlatformIdMap.get(platformIdMap.get(platformName)),
                        price: Number(price.split('원')[0]),
                        redirectURL: redirectURL,
                    });
                }
            });
            resolved(books);
        });
    });
};
exports.searchNaverBook = searchNaverBook;
exports.default = { ridiSelect: ridiSelect, millie: millie, yes24: yes24, kyoboBook: kyoboBook, searchNaverBook: searchNaverBook };
//# sourceMappingURL=scrapper.js.map