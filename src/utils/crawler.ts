import { DynamoDB } from 'aws-sdk';
import * as _ from 'lodash';

import crawler from '../class/Crawler';
import naverCrawler from '../class/CrawlerNaver';

const documentClient = new DynamoDB.DocumentClient({});
const TableName = process.env.TABLE_NAME;

const subscribe = async (title: string, bid: string) => {
    try {
        const books = (await crawler.crawling(title, bid)).filter(
            (item) => !_.isNil(item) && (item.title.match(title) || title.match(item.title))
        );
        await documentClient
            .put({
                TableName,
                Item: {
                    bid,
                    sortKey: 'subscribe',
                    booksInfo: books,
                },
            })
            .promise();
        return books;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const purchase = async (bid) => {
    try {
        const books = await naverCrawler.crawling(bid);
        await documentClient
            .put({
                TableName,
                Item: {
                    bid,
                    sortKey: 'purchase',
                    booksInfo: books,
                },
            })
            .promise();
        return books;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export default { subscribe, purchase };
