import UserHasPermissions from './Middleware/UserHasPermissions'
import RedirectIfAuthenticated from './Middleware/RedirectIfAuthenticated'

export default function middleware (router) {
  UserHasPermissions(router)
  RedirectIfAuthenticated(router)
}
