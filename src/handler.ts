import { Handler, Context } from 'aws-lambda';
import * as _ from 'lodash';
import { DynamoDB } from 'aws-sdk';

import crawler from './class/Crawler';
import naverCrawler from './class/CrawlerNaver';
import naverBookAPI from './modules/naverBookApi';
import { CrawlerResponse, NaverBook_T } from './types/index';

const crawling: Handler = async (
    event: any,
    context: Context
): Promise<CrawlerResponse> => {
    const {
        title,
        bid,
    }: { title?: string; bid?: string } = event.queryStringParameters;

    if (title == 'undefined' || !bid || !title) {
        const response: CrawlerResponse = {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Null Value',
            }),
        };
        return response;
    }

    const documentClient = new DynamoDB.DocumentClient({});
    const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            bid: bid,
            bookName: title,
        },
    };

    try {
        const book = (await documentClient.get(params).promise()).Item;
        if (book) {
            console.log(book);
            return {
                statusCode: 200,
                body: JSON.stringify({
                    book,
                }),
            };
        }
    } catch (error) {
        const response: CrawlerResponse = {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Server error',
            }),
        };
        return response;
    }

    try {
        const books = (await crawler.crawling(title, bid)).filter(
            (item) => !_.isNil(item)
        );
        console.log(books);
        const [subscribedBooks, purchaseBooks] = books;
        const response: CrawlerResponse = {
            statusCode: 200,
            body: JSON.stringify({
                subscribedBooks,
                purchaseBooks,
            }),
        };
        return response;
    } catch (err) {
        const response: CrawlerResponse = {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Server error',
            }),
        };
        return response;
    }
};

const naver: Handler = async (event: any, context: Context) => {
    const { bid }: { bid?: string } = event.queryStringParameters;

    if (bid == 'undefined' || !bid) {
        const response: CrawlerResponse = {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Null Value',
            }),
        };
        return response;
    }

    try {
        const subscribedBooks = await naverCrawler.crawling(bid);

        const response: CrawlerResponse = {
            statusCode: 200,
            body: JSON.stringify({
                subscribedBooks,
            }),
        };
        return response;
    } catch (err) {
        const response: CrawlerResponse = {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Server error',
            }),
        };
        return response;
    }
};

const naverAPI = async (event: any, context: Context): Promise<any> => {
    const {
        start,
        query,
    }: { start?: number; query?: string } = event.queryStringParameters;

    try {
        if (!query || query === 'undefined') {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Server error',
                }),
            };
        }
        const apiBooks = await naverBookAPI.callBookApi(
            query,
            start ? start : 1
        );
        const books = apiBooks.map((book) => {
            const bookTitle = JSON.stringify(book.title)
                .replace(/(<b>)|(<\/b>)/gi, '')
                .replace(/ *\([^)]*\) */g, '');
            const bookDescription = JSON.stringify(book.description).replace(
                /(<b>)|(<\/b>)/gi,
                ''
            );
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
        const response: CrawlerResponse = {
            statusCode: 200,
            body: JSON.stringify({
                books,
            }),
        };
        return response;
    } catch (err) {
        console.log(err);
        const response: CrawlerResponse = {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Server error',
            }),
        };
        return response;
    }
};

export { crawling, naver, naverAPI };
