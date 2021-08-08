import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { client, tableName } from './client'
import { Maybe } from './types'

type UserEntity = {
  userId: string
}

interface UserRepository {
  getById: (userId: string) => Promise<Maybe<UserEntity>>
}
export const getUserRepository = (client: DocumentClient) => {
  const getById: UserRepository['getById'] = async userId => {
    const res = await client
      .get({
        TableName: tableName,
        Key: { userId },
      })
      .promise()

    return res.Item as Maybe<UserEntity>
  }

  return {
    getById,
  }
}

export const userRepo: UserRepository = getUserRepository(client)
