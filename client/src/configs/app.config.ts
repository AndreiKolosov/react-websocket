const { VITE_WS_URL = 'ws://127.0.0.1:4000', VITE_API_URL = 'http://localhost:4000/api' } = import.meta.env;

export { VITE_WS_URL as WS_URL, VITE_API_URL as API_URL };
