import * as _ from 'lodash';
import { ridiSelect, yes24, kyoboBook } from '../modules/scrapper';
import BookPrice from './BookPrice';
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
        const scrappers = [ridiSelect(title), yes24(title), kyoboBook(title)];
        await Promise.allSettled(scrappers).then((results) => {
            results.forEach((result) => {
                if (result.status == 'fulfilled') {
                    console.log('value다', result.value);
                    if (result.value instanceof BookPrice) {
                        subscribedBooks.push(result.value);
                    } else if (result.value instanceof Array) {
                        subscribedBooks.push(...result.value);
                    }
                }
            });
        });
        // const scrappers = [ridiSelect(title), yes24(title), kyoboBook(title), searchNaverBook(bid)];
        // await Promise.allSettled(scrappers).then((results) => {
        //     results.forEach((result) => {
        //         if (result.status == 'fulfilled') {
        //             console.log('value다', result.value);
        //             if (result.value instanceof BookPrice) {
        //                 subscribedBooks.push(result.value);
        //             } else if (result.value instanceof Array) {
        //                 if (result.value[0] instanceof NaverBook) {
        //                     purchaseBooks.push(...result.value);
        //                 } else {
        //                     subscribedBooks.push(...result.value);
        //                 }
        //             }
        //         }
        //     });
        // });

        return subscribedBooks;
    }
}

export default Crawler.getInstance();
