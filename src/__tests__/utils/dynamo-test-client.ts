import DynamoDB, { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { getClient } from 'src/client'

const testConfig: DocumentClient.DocumentClientOptions & DynamoDB.Types.ClientConfiguration = {
  endpoint: 'http://localhost:8000',
  region: 'eu-central-1',
  credentials: {
    accessKeyId: '1234132',
    secretAccessKey: '123413',
  },
}

export const testDb = new DynamoDB(testConfig)
export const testClient = getClient(testConfig)
