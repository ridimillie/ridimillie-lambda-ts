import { responseFormat } from '../modules/responseFormat';
import naverBookAPI from '../modules/naverBookApi';
import { Context } from 'aws-lambda';
import * as _ from 'lodash';

const handler = async (event: any, context: Context): Promise<any> => {
    const { start, query }: { start?: number; query?: string } = event.queryStringParameters;

    try {
        if (!query || query === 'undefined') {
            return responseFormat(400, { message: 'query 값 이 없음' });
        }
        const apiBooks = await naverBookAPI.callBookApi(query, start ? start : 1);
        const books = apiBooks.map((book) => {
            const bookTitle = JSON.stringify(book.title)
                .replace(/(<b>)|(<\/b>)/gi, '')
                .replace(/ *\([^)]*\) */g, '');
            const bookDescription = JSON.stringify(book.description).replace(/(<b>)|(<\/b>)/gi, '');
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
        return responseFormat(200, books);
    } catch (err) {
        console.log(err);
        return responseFormat(500, { message: 'Server Error' });
    }
};

export default handler;
export { handler };
