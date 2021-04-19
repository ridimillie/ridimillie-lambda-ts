import * as _ from 'lodash';
import {
    ridiSelect,
    millie,
    yes24,
    kyoboBook,
    searchNaverBook,
} from '../modules/scrapper';
import BookPrice from './BookPrice';
import NaverBook from './NaverBook';
import NaverBookInformation from './NaverBook';
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

    public async crawling(title: string, bid: string) {
        const subscribedBooks = [];
        const purchaseBooks = [];
        const scrappers = [
            ridiSelect(title),
            yes24(title),
            kyoboBook(title),
            searchNaverBook(bid),
        ];
        await Promise.allSettled(scrappers).then((results) => {
            results.forEach((result) => {
                if (result.status == 'fulfilled') {
                    if (result.value instanceof BookPrice) {
                        console.log('BookPrice');
                        console.log(result.value);
                        subscribedBooks.push(result.value);
                    } else if (result.value instanceof Array) {
                        if (result.value[0] instanceof NaverBook) {
                            purchaseBooks.push(...result.value);
                        } else {
                            subscribedBooks.push(...result.value);
                        }
                    }
                }
            });
        });
        return [subscribedBooks, purchaseBooks];
    }
}

export default Crawler.getInstance();
