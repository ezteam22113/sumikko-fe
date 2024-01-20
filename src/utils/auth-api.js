import { endpoint } from './constant';
import { fetchFn } from './fetch';

const path = 'auth';

export async function register(value) {
  const body = JSON.stringify(value);
  const response = await fetchFn(`${endpoint}/${path}/register`, {
    method: 'POST',
    body,
  });

  const result = await response.json();
  const { status, message } = result;
  if (status !== 'success') {
    throw new Error(message);
  } else {
    return result;
  }
}

export async function login(value) {
  const body = JSON.stringify(value);
  const response = await fetchFn(`${endpoint}/${path}/login`, {
    method: 'POST',
    body,
  });

  const result = await response.json();
  const { status, message } = result;

  if (status !== 'success') {
    throw new Error(message);
  } else {
    return result;
  }
}
