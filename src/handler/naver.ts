import { Handler, Context } from 'aws-lambda';
import * as _ from 'lodash';

import naverCrawler from '../class/CrawlerNaver';
import { responseFormat } from '../modules/responseFormat';

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

export default naver;
