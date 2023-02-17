import checkAuth from './checkAuth';
import checkError from './checkError';
import getIdentity from './getIdentity';
import login from './login';
import logout from './logout';

const authProvider = {
  login,
  checkError,
  checkAuth,
  logout,
  getIdentity,
  getPermissions: () => {
    return Promise.resolve();
  },
};

export default authProvider;
