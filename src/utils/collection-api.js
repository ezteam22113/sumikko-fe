import { endpoint } from './constant';
import { fetchFn, fetchWithAuth } from './fetch';

const path = 'collections';

export async function getCollections() {
  const response = await fetchFn(`${endpoint}/${path}`, {
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

export async function getCollection(id) {
  const response = await fetchFn(`${endpoint}/${path}/${id}`, {
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

export async function createCollection(value) {
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

export async function updateCollection(id, value) {
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

export async function deleteCollection(id) {
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
