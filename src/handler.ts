import { Handler, Context } from 'aws-lambda';
import * as _ from 'lodash';
import { DynamoDB } from 'aws-sdk';

import crawler from './class/Crawler';
import naverCrawler from './class/CrawlerNaver';
import naverBookAPI from './modules/naverBookApi';
import { CrawlerResponse, NaverBook_T, SubscribePrice } from './types/index';
import { responseFormat } from './modules/responseFormat';
import { searchNaverBook } from './modules/scrapper';

/**
 *TODO 네이버 크롤링 로직을 안정화시키고. 디비에서 get해올때 purchase, sub 따로 해서 각각 없으때 크롤링 할 수 있도록 바뀨기
 */

const crawling: Handler = async (event: any, context: Context): Promise<CrawlerResponse> => {
    const { title, bid }: { title?: string; bid?: string } = event.queryStringParameters;

    if (title == 'undefined' || !bid || !title) {
        return responseFormat(400, { message: 'Null Value' });
    }

    let subscribe;
    let purchase;

    const documentClient = new DynamoDB.DocumentClient({});
    const TableName = process.env.TABLE_NAME;
    let params = (bid, sortKey) => {
        return {
            TableName,
            KeyConditionExpression: '#bid = :bid and #sortKey = :sortKey',
            ExpressionAttributeNames: {
                '#bid': 'bid',
                '#sortKey': 'sortKey',
            },
            ExpressionAttributeValues: {
                ':bid': bid,
                ':sortKey': sortKey,
            },
        };
    };
    try {
        // const books = await documentClient.query(params).promise();
        // if (books.Items.length > 0) {
        //     const returnBooks = books.Items.map((result) => {
        //         return {
        //             [result.sortKey]: result.booksInfo,
        //         };
        //     });
        //     const [purchase, subscribe] = [...returnBooks];
        //     console.log(returnBooks);
        //     return responseFormat(200, Object.assign(subscribe, purchase));
        // }
        purchase = await documentClient.query(params(bid, 'purchase')).promise();
        subscribe = await documentClient.query(params(bid, 'subscribe')).promise();

        if (
            !subscribe.Items.length ||
            (subscribe.Items[0].hasOwnProperty('booksInfo') && !subscribe.Items[0].booksInfo.length)
        ) {
            subscribe = (await crawler.crawling(title, bid)).filter(
                (item) => !_.isNil(item) && (item.title.match(title) || title.match(item.title))
            );
            await documentClient
                .put({
                    TableName,
                    Item: {
                        bid,
                        sortKey: 'subscribe',
                        booksInfo: subscribe,
                    },
                })
                .promise();
        } else {
            subscribe = subscribe.Items[0].booksInfo;
        }

        if (
            !purchase.Items.length ||
            (purchase.Items[0].hasOwnProperty('booksInfo') && !purchase.Items[0].booksInfo.length)
        ) {
            purchase = await naverCrawler.crawling(bid);
            await documentClient
                .put({
                    TableName,
                    Item: {
                        bid,
                        sortKey: 'purchase',
                        booksInfo: purchase,
                    },
                })
                .promise();
        } else {
            purchase = purchase.Items[0].booksInfo;
        }
        console.log('Sub', JSON.parse(JSON.stringify(subscribe)));
        console.log('Pur', JSON.parse(JSON.stringify(purchase)));

        return responseFormat(200, {
            subscribe: JSON.parse(JSON.stringify(subscribe)),
            purchase: JSON.parse(JSON.stringify(purchase)),
        });
    } catch (err) {
        console.log('error', err);
        return responseFormat(500, { message: 'Server error' });
    }
};

const naver: Handler = async (event: any, context: Context) => {
    const { bid }: { bid?: string } = event.queryStringParameters;

    if (bid == 'undefined' || !bid) {
        return responseFormat(400, { message: 'Null Value' });
    }

    try {
        const subscribe = await naverCrawler.crawling(bid);
        return responseFormat(200, { subscribe });
    } catch (err) {
        console.log('error', err);
        return responseFormat(500, { message: 'Server Error' });
    }
};

const naverAPI = async (event: any, context: Context): Promise<any> => {
    const { start, query }: { start?: number; query?: string } = event.queryStringParameters;

    try {
        if (!query || query === 'undefined') {
            return responseFormat(400, { message: 'query 값 이 없음' });
        }
        const apiBooks = await naverBookAPI.callBookApi(query, start ? start : 1);
        const books = apiBooks.map((book) => {
            const bookTitle = JSON.stringify(book.title)
                .replace(/(<b>)|(<\/b>)/gi, '')
                .replace(/ *\([^)]*\) */g, '');
            const bookDescription = JSON.stringify(book.description).replace(/(<b>)|(<\/b>)/gi, '');
            return {
                title: JSON.parse(bookTitle),
                bid: book.link.split('bid=')[1],
                image: book.image,
                author: book.author,
                isbn: book.isbn,
                description: JSON.parse(bookDescription),
                publisher: book.publisher,
                pubdate: book.pubdate,
            };
        });
        return responseFormat(200, books);
    } catch (err) {
        console.log(err);
        return responseFormat(500, { message: 'Server Error' });
    }
};

export { crawling, naver, naverAPI };
