import { apiUrl } from "src/util/env";
import { makeRequest } from "src/util/helpers";

// /category
// GET
export async function getCategories() {
  
}

// POST
export async function createCategory(body) {
  const res = await makeRequest(`${apiUrl}/v1/category`, 'POST', body);
  return res;
}

// /category/id
// PUT
export async function editCategory(id, body) {
  const res = await makeRequest(`${apiUrl}/v1/category/${id}`, 'PUT', body);
  return res;
}

// DELETE
export async function deleteCategory(id, target) {
  const res = await makeRequest(`${apiUrl}/v1/category/${id}`, 'DELETE');
  return res;
}