'use strict';

console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();


/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    });

    const tableName = 'spa_counter';
    const counterKey = {id: '1'};
    let baseParams = {
        TableName: tableName,
        Key: counterKey
    };

    switch (event.httpMethod) {
        case 'GET':
            dynamo.getItem(baseParams, done);
            break;
        case 'POST':
            baseParams.UpdateExpression = "set #a = #a + :x";
            baseParams.ExpressionAttributeNames = {'#a': 'num'};
            baseParams.ExpressionAttributeValues = {':x': 1};
            dynamo.updateItem(baseParams, done);
            break;
        case 'DELETE':
            baseParams.UpdateExpression = "set #a = :x";
            baseParams.ExpressionAttributeNames = {'#a': 'num'};
            baseParams.ExpressionAttributeValues = {':x': 0};
            dynamo.updateItem(baseParams, done);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};
