import DynamoDB from 'aws-sdk/clients/dynamodb'

export const getTableSchema = (tableName: string): DynamoDB.Types.CreateTableInput => ({
  AttributeDefinitions: [
    {
      AttributeName: 'userId',
      AttributeType: 'S',
    },
  ],
  KeySchema: [
    {
      AttributeName: 'userId',
      KeyType: 'HASH',
    },
  ],
  BillingMode: 'PAY_PER_REQUEST',
  TableName: tableName,
})
