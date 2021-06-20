import * as _ from 'lodash';
import { searchNaverBook } from '../modules/scrapper';
/**
 * Singleton Class
 */
class Crawler {
    private static instance: Crawler;

    private constructor() {}

    public static getInstance(): Crawler {
        if (_.isNil(this.instance)) this.instance = new Crawler();
        return this.instance;
    }

    public async crawling(bid: string) {
        const result = await searchNaverBook(bid);
        return result;
    }
}

export default Crawler.getInstance();
