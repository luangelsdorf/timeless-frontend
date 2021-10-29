export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return getCategory();
    case 'PUT':
      return createCategory();
    case 'DELETE':
      return deleteCategory();
    default:
      return res.status(405).end(`405 - O método ${req.method} não é permitido`);
  }
}