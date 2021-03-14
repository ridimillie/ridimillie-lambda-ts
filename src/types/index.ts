enum ServiceType {
    PURCHASE = 'purchase',
    SUBSCRIBE = 'subscribe',
}

type ServiceType_T = ServiceType.PURCHASE | ServiceType.SUBSCRIBE;

enum Platforms {
    RIDI = '리디북스',
    MILLIE = '밀리의서재',
    YES24 = '예스24',
    KYOBO = '인터넷 교보문고',
    KYOBO_BASIC = 'sam베이직',
    KYOBO_UNLIMITED = 'sam무제한',
    ALADIN = '알라딘',
    INTERPARK = '인터파크 도서',
    NAVER = '네이버 시리즈',
}

enum SubscribePrice {
    RIDI = 9900,
    MILLIE = 9900,
    YES24 = 5500,
    KYOBO_BASIC = 7000,
    KYOBO_UNLIMITED = 9900,
}

type Platform_T =
    | Platforms.ALADIN
    | Platforms.MILLIE
    | Platforms.INTERPARK
    | Platforms.KYOBO
    | Platforms.KYOBO_BASIC
    | Platforms.KYOBO_UNLIMITED
    | Platforms.NAVER
    | Platforms.RIDI
    | Platforms.YES24;

type NaverBook_T = {
    title: string;
    link: string;
    image: string;
    author: string;
    isbn: string;
    description: string;
    publisher: string;
    pubdate: Date;
};


interface CrawlerResponse {
    statusCode: number;
    body: string;
}

/**
 * export Type
 */
export { ServiceType_T, Platform_T, NaverBook_T };

/**
 * export Enum
 */
export { Platforms, ServiceType, SubscribePrice };

/**
 *  export interface
 */

export { CrawlerResponse }