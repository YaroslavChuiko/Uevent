import checkAuth from './check-auth.handler';
import checkError from './check-error.handler';
import getIdentity from './get-identity.handler';
import login from './login.handler';
import logout from './logout.handler';

const authProvider = {
  login: login,
  checkError: checkError,
  checkAuth: checkAuth,
  logout: logout,
  getIdentity: getIdentity,
  getPermissions: () => {
    return Promise.resolve();
  },
};

export default authProvider;
