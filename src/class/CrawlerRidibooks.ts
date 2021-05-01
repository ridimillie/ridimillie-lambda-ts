import * as _ from 'lodash';
import { ridiSelect } from '../modules/scrapper';
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

    public async crawling(title: string) {
        const result = await ridiSelect(title);
        return result;
    }
}

export default Crawler.getInstance();
