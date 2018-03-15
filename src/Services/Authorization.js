export default {
  /*
      access: {
          requiresLogin: true,
          requiredPermissions: ['admin'],
          permissionType: 'AtLeastOne'
      },
   */
  authorize (requiresLogin, requiredPermissions, permissionType) {
    let result = 'authorized'
    let hasPermission = true
    let token = window.localStorage.getItem('token') || undefined
    let role = window.localStorage.getItem('role') || undefined
    console.log(role)
    let loweredPermissions = []
    let permission, i

    if (requiresLogin === true && (token === undefined)) {
      return 'loginIsRequired'
    }

    if ((requiresLogin === true && token !== undefined) && (requiredPermissions === undefined || requiredPermissions.length === 0)) {
      return 'authorized'
    }

    if (requiredPermissions) {
      loweredPermissions = []
      loweredPermissions.push(role.toLowerCase())

      for (i = 0; i < requiredPermissions.length; i++) {
        permission = requiredPermissions[i].toLowerCase()

        if (permissionType === 'CombinationRequired') {
          hasPermission = hasPermission && loweredPermissions.indexOf(permission) > -1
          if (hasPermission === false) break
        } else if (permissionType === 'AtLeastOne') {
          hasPermission = loweredPermissions.indexOf(permission) > -1
          if (hasPermission) break
        }
      }
      result = hasPermission ? 'authorized' : 'notAuthorized'
    }

    return result
  }
}
