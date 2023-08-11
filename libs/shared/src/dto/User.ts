export type User = {
  exp: number
  iat: number
  auth_time: number
  jti: string
  iss: string
  aud: 'account'
  sub: string
  typ: 'Bearer'
  azp: string
  session_state: string
  acr: string
  realm_access: {
    roles: string[]
  }
  resource_access: {
    account: {
      roles: string[]
    }
  }
  scope: string
  sid: string
  email_verified: boolean
  name: string
  preferred_username: string
  given_name: string
  family_name: string
  email: string
}