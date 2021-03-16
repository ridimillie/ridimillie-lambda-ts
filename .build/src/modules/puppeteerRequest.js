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
exports.kyoboPupRequest = exports.pupRequest = void 0;
var cheerio = require("cheerio");
var chromium = require("chrome-aws-lambda");
var types_1 = require("../types");
var BookPrice_1 = require("../class/BookPrice");
/**
 * @TODO page.waitForSelector 이부분 성능개선 로직인데.. Timeout 해결해보자..
 */
var pupRequest = function (url, selector, childSelectorArr, platform, title, subscribedPrice, host) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, TITLE_1, REDIRECT_URL_1, LOAD_SELECTOR, browse, _b, _c, page, content, $_1, lists_1, err_1;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 6, , 7]);
                _a = [0, 1, 2], TITLE_1 = _a[0], REDIRECT_URL_1 = _a[1], LOAD_SELECTOR = _a[2];
                _c = (_b = chromium.puppeteer).launch;
                _d = {};
                return [4 /*yield*/, chromium.executablePath];
            case 1: return [4 /*yield*/, _c.apply(_b, [(_d.executablePath = _e.sent(),
                        _d.args = chromium.args,
                        _d.defaultViewport = chromium.defaultViewport,
                        _d.headless = chromium.headless,
                        _d)])];
            case 2:
                browse = _e.sent();
                return [4 /*yield*/, browse.newPage()];
            case 3:
                page = _e.sent();
                return [4 /*yield*/, page.goto(url, { waitUntil: 'networkidle0' })];
            case 4:
                _e.sent();
                return [4 /*yield*/, page.content()];
            case 5:
                content = _e.sent();
                $_1 = cheerio.load(content);
                lists_1 = [];
                $_1(selector).each(function (_, list) {
                    var title = $_1(list).find(childSelectorArr[TITLE_1]).text().trim();
                    var redirectURL = $_1(list)
                        .find(childSelectorArr[REDIRECT_URL_1])
                        .attr('href');
                    if (host)
                        redirectURL = encodeURI(host + redirectURL);
                    lists_1.push(new BookPrice_1.default(title, platform, redirectURL, types_1.ServiceType.SUBSCRIBE, subscribedPrice));
                });
                browse.close();
                if (lists_1.length) {
                    return [2 /*return*/, lists_1.filter(function (item) { return title.match(item.title); })[0]];
                }
                return [2 /*return*/];
            case 6:
                err_1 = _e.sent();
                console.log(err_1);
                throw err_1;
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.pupRequest = pupRequest;
var kyoboPupRequest = function (url, selector, childSelectorArr, platform, title, subscribedPrice, host) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, TITLE, REDIRECT_URL, LOAD_SELECTOR, SAM_TYPE, browse, _b, _c, page, content, $, lists;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = [0, 1, 2, 3], TITLE = _a[0], REDIRECT_URL = _a[1], LOAD_SELECTOR = _a[2], SAM_TYPE = _a[3];
                _c = (_b = chromium.puppeteer).launch;
                _d = {};
                return [4 /*yield*/, chromium.executablePath];
            case 1: return [4 /*yield*/, _c.apply(_b, [(_d.executablePath = _e.sent(),
                        _d.args = chromium.args,
                        _d.defaultViewport = chromium.defaultViewport,
                        _d.headless = chromium.headless,
                        _d)])];
            case 2:
                browse = _e.sent();
                return [4 /*yield*/, browse.newPage()];
            case 3:
                page = _e.sent();
                return [4 /*yield*/, page.goto(url, {
                        waitUntil: 'networkidle0',
                    })];
            case 4:
                _e.sent();
                return [4 /*yield*/, page.content()];
            case 5:
                content = _e.sent();
                $ = cheerio.load(content);
                lists = [];
                $(selector).each(function (_, list) {
                    var title = $(list).find(childSelectorArr[TITLE]).text().trim();
                    var redirectURL = $(list)
                        .find(childSelectorArr[REDIRECT_URL])
                        .attr('href');
                    if (host)
                        redirectURL = encodeURI(host + redirectURL);
                    $(list)
                        .find(childSelectorArr[SAM_TYPE])
                        .each(function (_, item) {
                        if ($(item).attr('alt') === types_1.Platforms.KYOBO_BASIC) {
                            lists.push(new BookPrice_1.default(title, types_1.Platforms.KYOBO_BASIC, redirectURL, types_1.ServiceType.SUBSCRIBE, subscribedPrice));
                        }
                        else if ($(item).attr('alt') === types_1.Platforms.KYOBO_UNLIMITED) {
                            lists.push(new BookPrice_1.default(title, types_1.Platforms.KYOBO_UNLIMITED, redirectURL, types_1.ServiceType.SUBSCRIBE, subscribedPrice));
                        }
                    });
                });
                browse.close();
                if (lists.length) {
                    return [2 /*return*/, lists.filter(function (item) { return title.match(item.title); })];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.kyoboPupRequest = kyoboPupRequest;
exports.default = { pupRequest: pupRequest, kyoboPupRequest: kyoboPupRequest };
//# sourceMappingURL=puppeteerRequest.js.map