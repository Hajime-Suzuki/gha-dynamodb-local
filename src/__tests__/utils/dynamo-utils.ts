import { tableName } from 'src/client'
import { testClient, testDb } from './dynamo-test-client'
import { getTableSchema } from './table-schema'
import DynamoDB, { DocumentClient } from 'aws-sdk/clients/dynamodb'

const getDynamoTestUtils =
  (db: DynamoDB, client: DocumentClient) => (tableName: string, schema: any) => {
    const createTable = async () => {
      try {
        await db.createTable(schema).promise()
      } catch (error) {
        console.log(error)
      }
    }

    const seedTable = async (data: Record<string, any>[]) => {
      await client
        .batchWrite({
          RequestItems: {
            [tableName]: data.map(v => ({
              PutRequest: {
                Item: v,
              },
            })),
          },
        })
        .promise()
    }

    const tableExists = async () => {
      try {
        await db.describeTable({ TableName: tableName }).promise()
        return true
      } catch (error) {
        if (error.name !== 'ResourceNotFoundException') {
          console.error('DEBUG: ', error.name)
          throw error
        }
      }
      return false
    }

    const recreateTable = async () => {
      try {
        if (await tableExists()) {
          await db.deleteTable({ TableName: tableName }).promise()
        }
        await createTable()
      } catch (error) {
        console.error(`DEBUG: ${error}`)
        throw error
      }
    }

    return {
      seedTable,
      recreateTable,
    }
  }

export const testUserTableUtils = getDynamoTestUtils(testDb, testClient)(
  tableName,
  getTableSchema(tableName),
)
