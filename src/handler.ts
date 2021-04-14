import { Handler, Context } from 'aws-lambda';
import crawler from './class/Crawler';
import ridiCrawler from './class/CrawlerRidibooks';
import kyoboCrawler from './class/CrawlerKyobo';
import yes24Crawler from './class/CrawlerYes24';
import naverCrawler from './class/CrawlerNaver';
import scrapper from './modules/scrapper';
import { CrawlerResponse } from './types/index';

const crawling: Handler = async (event: any, context: Context) => {
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

    try {
        const purchaseBooks = await scrapper.searchNaverBook(bid);
        const subscribedBooks = (await crawler.crawling(title))
            .filter((item) => item !== undefined)
            .filter((item) => item !== null);

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

const ridiBooks: Handler = async (event: any, context: Context) => {
    const { title }: { title?: string } = event.queryStringParameters;

    if (title == 'undefined' || !title) {
        const response: CrawlerResponse = {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Null Value',
            }),
        };
        return response;
    }

    try {
        const subscribedBooks = await ridiCrawler.crawling(title);

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

const kyobo: Handler = async (event: any, context: Context) => {
    const { title }: { title?: string } = event.queryStringParameters;

    if (title == 'undefined' || !title) {
        const response: CrawlerResponse = {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Null Value',
            }),
        };
        return response;
    }

    try {
        const subscribedBooks = await kyoboCrawler.crawling(title);

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

const yes24: Handler = async (event: any, context: Context) => {
    const { title }: { title?: string } = event.queryStringParameters;

    if (title == 'undefined' || !title) {
        const response: CrawlerResponse = {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Null Value',
            }),
        };
        return response;
    }

    try {
        const subscribedBooks = await yes24Crawler.crawling(title);

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

export { crawling, ridiBooks, kyobo, naver, yes24 };
