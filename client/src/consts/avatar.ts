const SERVER_URL = import.meta.env.VITE_API_URL;

const AVATAR_PATH = (file: string) => (file ? `${SERVER_URL}/${file}` : '');

export { AVATAR_PATH };
