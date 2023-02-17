import handleResponse from '../../utils/handle-response';

type LoginCredentials = {
  username: string;
  password: string;
};

const login = async ({ username, password }: LoginCredentials) => {
  const resource = `${import.meta.env.VITE_SERVER_URL}/auth/login`;
  const request = new Request(resource, {
    method: 'POST',
    body: JSON.stringify({ login: username, password }),
    credentials: 'include',
    headers: new Headers({ 'Content-Type': 'application/json' }),
  });

  try {
    const response = await fetch(request);
    const { accessToken, ...user } = await handleResponse(response);
    checkAdmin(user.role);
    saveCredentials(accessToken, user);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const checkAdmin = (role: string) => {
  if (role !== 'admin') {
    throw new Error('Only for admins');
  }
};

type User = {
  id: number;
  login: string;
  email: string;
  fullName: string;
  role: string;
  picturePath: string;
};

const saveCredentials = (accessToken: string, user: User) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('user', JSON.stringify(user));
};

export default login;
