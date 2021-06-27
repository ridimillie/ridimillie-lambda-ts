import { Handler, Context } from 'aws-lambda';
import * as _ from 'lodash';
import { DynamoDB } from 'aws-sdk';

import crawler from '../utils/crawler';
import naverCrawler from '../class/CrawlerNaver';
import { CrawlerResponse } from '../types/index';
import { responseFormat } from '../modules/responseFormat';
import retryCrawling from '../utils/retryCrawling';

const handler: Handler = async (event: any, context: Context): Promise<CrawlerResponse> => {
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
    /**
     * Todo
     * 1. 디비쿼리
     * 2. 둘다 없으면 크롤링
     * 3. 그게 아니면 return 후 크롤러에게 넘김
     */
    try {
        purchase = await documentClient.query(params(bid, 'purchase')).promise();
        subscribe = await documentClient.query(params(bid, 'subscribe')).promise();
        //console.log(purchase.Items[0].crawlingCount); // cannot read property crawlingCount
        if (purchase.Items.length || subscribe.Items.length) {
            subscribe = subscribe.Items[0].booksInfo ? subscribe.Items[0].booksInfo : retryCrawling(bid, title);
            purchase = purchase.Items[0].booksInfo ? purchase.Items[0].booksInfo : retryCrawling(bid, title);
            console.log(purchase);
            console.log(subscribe);
        } else {
            subscribe = await crawler.subscribe(title, bid);
            purchase = await crawler.purchase(bid);
        }
        return responseFormat(200, {
            subscribe: JSON.parse(JSON.stringify(subscribe)),
            purchase: JSON.parse(JSON.stringify(purchase)),
        });
    } catch (err) {
        console.log('error', err);
        return responseFormat(500, { message: 'Server error' });
    }
};

export default { handler };
export { handler };
