let productsData = [];

export async function loadProducts() {
  if (productsData.length) return productsData; // cache hit

  const response = await fetch("https://dummyjson.com/products?limit=200");
  const json = await response.json();
  productsData = json.products;
  return productsData;
}

export function getProductById(id) {
  return productsData.find(p => p.id === id);
}