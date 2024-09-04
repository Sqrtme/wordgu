const FIELD_NAME = 'wguuser';

const setToken = (id: number) => {
  localStorage.setItem(FIELD_NAME, id.toString());
}

const getToken = (): string | null => {
  return localStorage.getItem(FIELD_NAME);
}

const removeToken = () => {
  localStorage.removeItem(FIELD_NAME);
}

export {
  setToken,
  getToken,
  removeToken,
}
