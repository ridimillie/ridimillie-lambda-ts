# ridimillie-lambda-ts

<img style="border: 1px solid black !important; border-radius:20px;" src="https://avatars.githubusercontent.com/u/77908711?s=200&v=4?raw=true" width="200px" />

-   <b> [이책저책]</b>
-   <b> 프로젝트 기간: 2020.01.25 ~ </b>

<br>

## 🎞 미리보기

![image](https://user-images.githubusercontent.com/40652160/117106042-23bc5700-adba-11eb-9391-58614cf1ecfa.png)

#### 👉[이책 저책 사용해보기](https://ebookzbook.vercel.app/)

<br />

## ✔ Main function

-   Search
    -   이책 저책은 `리디 셀렉트`, `밀리의서재,` `yes24` `BookClub`, `Naver ebook`, `Kyobo SAM` 실시간 통합 검색 결과를 제공합니다.

<br />

## 📖 Dependencies

```Json
"dependencies": {
    "aws-sdk": "^2.897.0",
    "cheerio": "^1.0.0-rc.5",
    "chrome-aws-lambda": "^8.0.0",
    "dotenv": "^8.2.0",
    "lodash": "^4.17.21",
    "puppeteer-core": "^8.0.0",
    "request": "^2.88.2"
  },
  "devDependencies": {
    "@types/dotenv": "^8.2.0",
    "@types/lodash": "^4.14.168",
    "@types/request": "^2.48.5",
    "aws-lambda": "^1.0.6",
    "puppeteer": "^8.0.0",
    "serverless-dotenv-plugin": "^3.8.1",
    "serverless-offline": "^6.8.0",
    "serverless-plugin-typescript": "^1.1.9",
    "ts-node": "^9.1.1",
    "typescript": "^4.2.3"
  }
```

<br />

## Directory Tree

```
.
├── .serverless/
├── .vscode/
├── node_modules/
├── .env
├── .gitignore
├── .npmignore
├── package-lock.json
├── package.json
├── serverless.yml
├── src
│   ├── class
│   │   ├── Book.ts
│   │   ├── BookPrice.ts
│   │   ├── Crawler.ts
│   │   ├── CrawlerKyobo.ts
│   │   ├── CrawlerNaver.ts
│   │   ├── CrawlerRidibooks.ts
│   │   ├── CrawlerYes24.ts
│   │   └── NaverBook.ts
│   ├── handler.ts
│   ├── modules
│   │   ├── naverBookApi.ts
│   │   ├── puppeteerRequest.ts
│   │   ├── responseFormat.ts
│   │   └── scrapper.ts
│   └── types
│       └── index.ts
└── tsconfig.json
```

## 📚 Stack

-   NodeJS: 런타임 환경
-   TypeScript: 개발 언어
-   Serverless framework: 배포 도구
-   AWS: Api gateWay, Lambda, DynamoDB
-   Pupeteer: 웹 스크래퍼

<br />

## 개발자

-   최영훈
-   홍준엽
