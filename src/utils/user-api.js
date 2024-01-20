import { endpoint } from './constant';
import { fetchWithAuth } from './fetch';

const path = 'users';

export async function getUsers() {
  const response = await fetchWithAuth(`${endpoint}/${path}`, {
    method: 'GET',
  });

  const result = await response.json();
  const { status, message } = result;
  if (status !== 'success') {
    throw new Error(message);
  } else {
    return result;
  }
}

export async function getUser(id) {
  const response = await fetchWithAuth(`${endpoint}/${path}/${id}`, {
    method: 'GET',
  });
  const result = await response.json();
  const { status, message } = result;
  if (status !== 'success') {
    throw new Error(message);
  } else {
    return result;
  }
}

export async function createUser(value) {
  const body = JSON.stringify(value);
  const response = await fetchWithAuth(`${endpoint}/${path}`, {
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

export async function updateUser(id, value) {
  const body = JSON.stringify(value);
  const response = await fetchWithAuth(`${endpoint}/${path}/${id}`, {
    method: 'PATCH',
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

export async function deleteUser(id) {
  const response = await fetchWithAuth(`${endpoint}/${path}/${id}`, {
    method: 'DELETE',
  });
  const result = await response.json();

  const { status, message } = result;

  if (status !== 'success') {
    throw new Error(message);
  } else {
    return result;
  }
}
