export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return getCategories();
    case 'POST':
      return createCategory();
    default:
      return res.status(405).end(`405 - O método ${req.method} não é permitido`);
  }
}