import * as request from 'request';
import * as cheerio from 'cheerio';

import { Platforms, ServiceType, SubscribePrice, Platform_T } from '../types';
import BookPrice from '../class/BookPrice';
import { pupRequest, kyoboPupRequest } from './puppeteerRequest';

const ridiSelect = async (title: string): Promise<BookPrice> => {
    const platform = 'RIDI';
    const url =
        'https://select.ridibooks.com/search?q=' +
        encodeURI(title) +
        '&type=Books';
    const selector = '#app > main > ul> li';
    const childSelectorArr = ['div > div > a > h3 ', 'div > div > a', 'a h3'];
    const book: BookPrice = await pupRequest(
        url,
        selector,
        childSelectorArr,
        Platforms[platform],
        title,
        SubscribePrice.RIDI,
        'https://select.ridibooks.com'
    );
    return book;
};

const millie = async (title: string): Promise<BookPrice> => {
    const platform = 'MILLIE';
    const url =
        'https://www.millie.co.kr/v3/search/result/' +
        encodeURI(title) +
        '?type=all&order=keyword&category=1';
    const selector =
        '#wrap > section > div > section.search-list > div > ul > li';
    const childSelectorArr = [
        'a > div.body > span.title',
        'a',
        'a div.body span.title',
    ];
    const book = await pupRequest(
        url,
        selector,
        childSelectorArr,
        Platforms[platform],
        title,
        SubscribePrice.MILLIE
    );
    return book;
};

const yes24 = (title: string): Promise<BookPrice> =>
    new Promise((resolved, rejected) => {
        const url =
            'https://bookclub.yes24.com/BookClub/Search?keyword=' +
            encodeURI(title) +
            '&OrderBy=01&pageNo=1';

        const options = {
            url,
            headers: { 'User-Agent': 'Mozilla/5.0' },
            encoding: null,
        };

        request.get(options, function (error, response, body) {
            if (error) {
                rejected(response.statusCode);
            }

            const $ = cheerio.load(body);
            const selector = '#ulGoodsList > li';
            const childSelectorArr = [
                'div > div > div > a',
                'div > p > span > a',
            ];

            $(selector).each((_, list) => {
                const title = $(list).find(childSelectorArr[0]).text();
                const redirectURL = $(list)
                    .find(childSelectorArr[1])
                    .attr('href');
                resolved(
                    new BookPrice(
                        title,
                        Platforms.YES24,
                        'http://bookclub.yes24.com' + redirectURL,
                        ServiceType.SUBSCRIBE,
                        SubscribePrice.YES24
                    )
                );
            });
            resolved(null);
        });
    });

const kyoboBook = async (title: string): Promise<Array<BookPrice>> => {
    const platform = 'KYOBO';
    const url =
        'https://search.kyobobook.co.kr/web/search?vPstrKeyWord=' +
        encodeURI(title) +
        '&orderClick=LEK&searchCategory=SAM%40DIGITAL&collName=DIGITAL&searchPcondition=1';
    const selector = '#search_list > tr';
    const childSelectorArr = [
        'td.detail > div.title > a > strong',
        'td.detail > div.title > a',
        'td.detail div.title a strong',
        'td.detail > div.icon > img',
    ];

    const book = await kyoboPupRequest(
        url,
        selector,
        childSelectorArr,
        Platforms[platform],
        title,
        SubscribePrice.KYOBO_BASIC
    );
    return book;
};

const searchNaverBook = (
    bid: string
): Promise<
    Array<{
        platform: string;
        price: number;
        redirectURL: string;
    }>
> =>
    new Promise((resolved, rejected) => {
        const platformIdMap: Map<Platform_T, string> = new Map([
            [Platforms.RIDI, 'RIDI'],
            [Platforms.MILLIE, 'MILLIE'],
            [Platforms.YES24, 'YES24'],
            [Platforms.KYOBO, 'KYOBO'],
            [Platforms.ALADIN, 'ALADIN'],
            [Platforms.INTERPARK, 'INTERPARK'],
            [Platforms.NAVER, 'NAVER'],
        ]);

        const reversedPlatformIdMap: Map<string, Platform_T> = new Map([
            ['RIDI', Platforms.RIDI],
            ['MILLIE', Platforms.MILLIE],
            ['YES24', Platforms.YES24],
            ['KYOBO', Platforms.KYOBO],
            ['ALADIN', Platforms.ALADIN],
            ['INTERPARK', Platforms.INTERPARK],
            ['NAVER', Platforms.NAVER],
        ]);

        const url = 'https://book.naver.com/bookdb/book_detail.nhn?bid=' + bid;
        const options = {
            url,
            headers: { 'User-Agent': 'Mozilla/5.0' },
            encoding: null,
        };

        request.get(options, function (error, response, body) {
            if (error) {
                rejected(response.statusCode);
            }

            const $ = cheerio.load(body);
            const selector = '#productListLayer > ul > li';
            const books = [];

            $(selector).each((_, book) => {
                const isEbook = $(book).find('strong').text();
                const platform = $(book).find('div > a').text();
                const price = $(book).find('span > em').text();
                const redirectURL = $(book).find('div > a').attr('href');
                if (isEbook.match('ebook')) {
                    const platformName = platform.split(
                        'Naver'
                    )[0] as Platform_T;
                    books.push({
                        platform: reversedPlatformIdMap.get(
                            platformIdMap.get(platformName)
                        ),
                        price: Number(price.split('원')[0]),
                        redirectURL,
                    });
                }
            });
            resolved(books);
        });
    });

export default { ridiSelect, millie, yes24, kyoboBook, searchNaverBook };
export { ridiSelect, millie, yes24, kyoboBook, searchNaverBook };
