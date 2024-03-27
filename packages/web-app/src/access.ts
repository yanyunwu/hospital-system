/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser? } | undefined) {
  const { currentUser } = initialState ?? {}

  const { hasAuths = [] } = currentUser ?? {}

  console.log('currentUser', currentUser)

  const auths = {}

  for (const item of hasAuths) {
    auths[item] = true
  }

  return {
    ...auths
  }
}
