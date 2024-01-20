import { endpoint } from "./constant";
import { fetchFn, fetchWithAuth } from "./fetch";

const path = "brands";

export async function getBrands() {
  const response = await fetchFn(`${endpoint}/${path}`, {
    method: "GET",
  });

  const result = await response.json();
  const { status, message } = result;
  if (status !== "success") {
    throw new Error(message);
  } else {
    return result;
  }
}

export async function getBrand(id) {
  const response = await fetchFn(`${endpoint}/${path}/${id}`, {
    method: "GET",
  });
  const result = await response.json();
  const { status, message } = result;
  if (status !== "success") {
    throw new Error(message);
  } else {
    return result;
  }
}

export async function createBrand(value) {
  const body = JSON.stringify(value);
  const response = await fetchWithAuth(`${endpoint}/${path}`, {
    method: "POST",
    body,
  });
  const result = await response.json();

  const { status, message } = result;

  if (status !== "success") {
    throw new Error(message);
  } else {
    return result;
  }
}

export async function updateBrand(id, value) {
  const body = JSON.stringify(value);
  const response = await fetchWithAuth(`${endpoint}/${path}/${id}`, {
    method: "PATCH",
    body,
  });
  const result = await response.json();

  const { status, message } = result;

  if (status !== "success") {
    throw new Error(message);
  } else {
    return result;
  }
}

export async function deleteBrand(id) {
  const response = await fetchWithAuth(`${endpoint}/${path}/${id}`, {
    method: "DELETE",
  });
  const result = await response.json();

  const { status, message } = result;

  if (status !== "success") {
    throw new Error(message);
  } else {
    return result;
  }
}
