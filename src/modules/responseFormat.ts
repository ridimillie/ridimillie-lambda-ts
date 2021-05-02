const responseFormat = (statusCode: number, data: any) => {
    return {
        headers: {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
        },
        statusCode: statusCode,
        body: JSON.stringify(data),
    };
};

export default responseFormat;
export { responseFormat };
