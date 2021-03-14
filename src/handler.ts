import { Handler, Context } from 'aws-lambda';
import crawler from './class/Crawler';
import scrapper from './modules/scrapper';
import {CrawlerResponse} from './types/index'

const crawling: Handler = async (event: any, context: Context) => {
    //const { title, bid }: { title?: string; bid?: string } = event;
    const title: string = '타겟티드';
    const bid: string = '16298643';

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
        const dto = await crawler.crawling(title);
        const subscribedBooks = dto
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
                message: 'Null Value',
            }),
        };
        return response;
    }
};

export { crawling };
