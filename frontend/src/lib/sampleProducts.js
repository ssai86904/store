// Fallback data used when the Laravel API is not running.
// The same products are seeded into the database by backend/database/seeders/ProductSeeder.php,
// so the app looks identical with or without the backend.

export const sampleProducts = [
  { id: 1, name: "Basmati Rice 5kg", description: "Aged long-grain basmati rice, ideal for biryani and pulao.", price: 649, stock: 40, category: "Grocery" },
  { id: 2, name: "Cold-Pressed Coconut Oil 1L", description: "Single-origin coconut oil, extracted without heat.", price: 420, stock: 25, category: "Grocery" },
  { id: 3, name: "Organic Honey 500g", description: "Raw, unprocessed honey from forest apiaries.", price: 349, stock: 60, category: "Grocery" },
  { id: 4, name: "Wireless Earbuds", description: "Bluetooth 5.3 earbuds with 24-hour battery life with the case.", price: 1999, stock: 15, category: "Electronics" },
  { id: 5, name: "Power Bank 10000mAh", description: "Slim power bank with USB-C fast charging.", price: 1299, stock: 30, category: "Electronics" },
  { id: 6, name: "Smart LED Bulb", description: "9W colour-changing bulb you can control from your phone.", price: 499, stock: 80, category: "Electronics" },
  { id: 7, name: "USB-C Fast Charger", description: "30W wall charger for phones and tablets.", price: 899, stock: 0, category: "Electronics" },
  { id: 8, name: "Cotton Casual T-Shirt", description: "Soft 100% cotton crew-neck tee.", price: 599, stock: 100, category: "Fashion" },
  { id: 9, name: "Denim Jacket", description: "Classic mid-wash denim jacket with a regular fit.", price: 2499, stock: 12, category: "Fashion" },
  { id: 10, name: "Running Shoes", description: "Lightweight breathable shoes with a cushioned sole.", price: 2999, stock: 18, category: "Fashion" },
  { id: 11, name: "Ceramic Coffee Mug Set", description: "Set of four 300ml stoneware mugs.", price: 799, stock: 35, category: "Home" },
  { id: 12, name: "Bamboo Storage Basket", description: "Handwoven basket for laundry, toys or blankets.", price: 549, stock: 22, category: "Home" },
  { id: 13, name: "Indoor Plant Pot", description: "Matte ceramic planter with a drainage tray.", price: 399, stock: 45, category: "Home" },
];
