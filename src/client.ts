import DynamoDB, { DocumentClient } from 'aws-sdk/clients/dynamodb'
export const tableName = 'users'

export const getClient = (
  config: DocumentClient.DocumentClientOptions & DynamoDB.Types.ClientConfiguration,
) => {
  return new DynamoDB.DocumentClient(config)
}

const prodConfig = {}
export const client = getClient(prodConfig)
