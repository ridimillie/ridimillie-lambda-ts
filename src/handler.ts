import { Handler, Context } from 'aws-lambda';
import * as _ from 'lodash';
import { DynamoDB } from 'aws-sdk';

import crawler from './class/Crawler';
import naverCrawler from './class/CrawlerNaver';
import naverBookAPI from './modules/naverBookApi';
import { CrawlerResponse, NaverBook_T } from './types/index';
import { responseFormat } from './modules/responseFormat';

const crawling: Handler = async (event: any, context: Context): Promise<CrawlerResponse> => {
    const { title, bid }: { title?: string; bid?: string } = event.queryStringParameters;
    if (title == 'undefined' || !bid || !title) {
        return responseFormat(400, { message: 'Null Value' });
    }

    const documentClient = new DynamoDB.DocumentClient({});
    const TableName = process.env.TABLE_NAME;
    let params = {
        TableName,
        KeyConditionExpression: '#bid = :bid',
        ExpressionAttributeNames: {
            '#bid': 'bid',
        },
        ExpressionAttributeValues: {
            ':bid': bid,
        },
    };

    try {
        const books = (await documentClient.query(params).promise()).Items;
        if (books.length > 0) {
            const returnBooks = books.map((result) => {
                return {
                    [result.sortKey]: result.booksInfo,
                };
            });
            const [purchase, subscribe] = [...returnBooks];
            return responseFormat(200, Object.assign(subscribe, purchase));
        }
    } catch (err) {
        console.log('error', err);
        return responseFormat(500, { message: 'Server error' });
    }

    try {
        const books = (await crawler.crawling(title, bid)).filter((item) => !_.isNil(item));
        let [subscribe, purchase] = books;
        subscribe = subscribe.filter((item) => item.title.match(title) || title.match(item.title));
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

        return responseFormat(200, {
            subscribe,
            purchase,
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
            return responseFormat(400, {
                message: 'query 값 이 없음',
            });
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
