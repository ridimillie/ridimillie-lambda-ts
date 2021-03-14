export default class Book {
    private bid: String;
    private title: String;
    private author: String;
    private publisher: String;
    private description: String;
    private image: String;
    private isbn: Number;
    private pubdate: Date;

    constructor(
        bid: String,
        title: String,
        author: String,
        publihser: String,
        description: String,
        isbn: Number,
        image: String,
        pubdate: Date
    ) {
        this.bid = bid;
        this.title = title;
        this.author = author;
        this.publisher = publihser;
        this.description = description;
        this.isbn = isbn;
        this.image = image;
        this.pubdate = pubdate;
    }
}
