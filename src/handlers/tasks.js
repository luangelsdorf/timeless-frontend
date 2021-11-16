import { apiUrl } from "src/util/env";
import { makeRequest } from "src/util/helpers";

// /task

// GET
export async function getTasks() {
  const res = await makeRequest(`${apiUrl}/v1/task`, 'GET');
  return res;
}

// POST
export async function createTask(body) {
  const res = await makeRequest(`${apiUrl}/v1/task`, 'POST', body);
  return res;
}

// /task/id

// GET
export async function getTask(id) {
  const res = await makeRequest(`${apiUrl}/v1/task/${id}`, 'GET');
  return res;
}

// PUT
export async function editTask(id, body) {
  const res = await makeRequest(`${apiUrl}/v1/task/${id}`, 'PUT', body);
  return res;
}

// DELETE
export async function deleteTask(id) {
  const res = await makeRequest(`${apiUrl}/v1/task/${id}`, 'DELETE');
  return res;
}

// PATCH
export async function completeTask(id) {
  const res = await makeRequest(`${apiUrl}/v1/task/${id}/completed`, 'PATCH');
  return res;
}