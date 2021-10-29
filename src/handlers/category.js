import { apiUrl } from "src/util/env";
import { makeRequest } from "src/util/helpers";

// /category
// GET
export async function getCategories() {
  
}

// POST
export async function createCategory(body) {
  const res = await makeRequest(`${apiUrl}/v1/category`, 'POST', body);
}

// /category/id
// PUT
export async function editCategory(id, body) {
  const res = await makeRequest(`${apiUrl}/v1/category/${id}`, 'DELETE', body);
}