import { getUserRepository } from 'src/user-repository'
import { users } from './seeds'
import { testClient } from './utils/dynamo-test-client'
import { testUserTableUtils } from './utils/dynamo-utils'

const repo = getUserRepository(testClient)
beforeEach(async () => {
  await testUserTableUtils.recreateTable()
  await testUserTableUtils.seedTable(users)
})
describe('UserRepository', () => {
  test('getById ', async () => {
    const user = await repo.getById(users[0].userId)
    expect(user).toEqual(users[0])
  })
})
