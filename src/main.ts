import { userRepo, UserRepository } from './user-repository'

export const handler = async () => {
  const getUserById = mkGetUserById({ repo: userRepo })

  return {
    user: await getUserById('1'),
  }
}

const mkGetUserById = (deps: { repo: UserRepository }) => async (userId: string) => {
  const user = await deps.repo.getById(userId)

  if (!user) throw new Error('user not found')

  return user
}
