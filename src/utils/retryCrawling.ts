import { DynamoDB } from 'aws-sdk';

const retryCrawling = (bid: String, title: String) => {
    /**
     * 1.디비 get해서 count가 3회 이상이면 return
     * 2.다시 크롤링
     * 3.업데이트 후 count 증가
     */
    return [];
};

export default retryCrawling;
