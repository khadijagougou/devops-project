// =====================================================
// MOCK DATA - Admin Dashboard
// =====================================================

export const mockCategories = [
  { id: 1, name: "Électronique", slug: "electronique", description: "Appareils électroniques et gadgets", productCount: 12, createdAt: "2024-01-15" },
  { id: 2, name: "Bijoux", slug: "bijoux", description: "Bijoux et accessoires de luxe", productCount: 8, createdAt: "2024-01-20" },
  { id: 3, name: "Mode Homme", slug: "mode-homme", description: "Vêtements et accessoires pour hommes", productCount: 15, createdAt: "2024-02-01" },
  { id: 4, name: "Mode Femme", slug: "mode-femme", description: "Vêtements et accessoires pour femmes", productCount: 20, createdAt: "2024-02-05" },
  { id: 5, name: "Sport", slug: "sport", description: "Équipements et vêtements de sport", productCount: 9, createdAt: "2024-02-10" },
];

export const mockProducts = [
  { id: 1, name: "Écouteurs Bluetooth Pro", category: "Électronique", categoryId: 1, price: 89.99, stock: 45, status: "active", image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg", description: "Écouteurs sans fil haute qualité", createdAt: "2024-01-20" },
  { id: 2, name: "Montre Connectée Sport", category: "Électronique", categoryId: 1, price: 199.99, stock: 23, status: "active", image: "https://fakestoreapi.com/img/71kEqp2JaQL._AC_SX679_.jpg", description: "Montre intelligente avec suivi fitness", createdAt: "2024-01-22" },
  { id: 3, name: "Collier en Or 18K", category: "Bijoux", categoryId: 2, price: 450.00, stock: 8, status: "active", image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_FMwebp_QL65_.jpg", description: "Collier élégant en or véritable", createdAt: "2024-01-25" },
  { id: 4, name: "Veste Cuir Premium", category: "Mode Homme", categoryId: 3, price: 320.00, stock: 12, status: "active", image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg", description: "Veste en cuir véritable coupe slim", createdAt: "2024-02-01" },
  { id: 5, name: "Robe Soirée Élégante", category: "Mode Femme", categoryId: 4, price: 185.00, stock: 0, status: "inactive", image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg", description: "Robe longue pour soirées de gala", createdAt: "2024-02-05" },
  { id: 6, name: "Sac à Dos Sport Nike", category: "Sport", categoryId: 5, price: 65.00, stock: 30, status: "active", image: "https://fakestoreapi.com/img/71HblAHs1xL._AC_UY879_-2.jpg", description: "Sac à dos imperméable 30L", createdAt: "2024-02-08" },
  { id: 7, name: "Smartphone Ultra 5G", category: "Électronique", categoryId: 1, price: 899.00, stock: 18, status: "active", image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg", description: "Dernier modèle avec 5G intégrée", createdAt: "2024-02-10" },
  { id: 8, name: "Bague Diamant Solitaire", category: "Bijoux", categoryId: 2, price: 1200.00, stock: 4, status: "active", image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_FMwebp_QL65_.jpg", description: "Bague en or blanc avec diamant 0.5ct", createdAt: "2024-02-15" },
  { id: 9, name: "Legging Yoga Premium", category: "Sport", categoryId: 5, price: 55.00, stock: 42, status: "active", image: "https://fakestoreapi.com/img/71HblAHs1xL._AC_UY879_-2.jpg", description: "Legging haute performance anti-transpiration", createdAt: "2024-02-18" },
  { id: 10, name: "Chemise Lin Homme", category: "Mode Homme", categoryId: 3, price: 75.00, stock: 25, status: "active", image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg", description: "Chemise en lin naturel coupe droite", createdAt: "2024-02-20" },
];

export const mockUsers = [
  { id: 1, name: "Alice Dupont", email: "alice@example.com", role: "customer", status: "active", orders: 12, totalSpent: 1840.50, createdAt: "2024-01-10", avatar: null },
  { id: 2, name: "Bob Martin", email: "bob@example.com", role: "customer", status: "active", orders: 5, totalSpent: 620.00, createdAt: "2024-01-15", avatar: null },
  { id: 3, name: "Caroline Lemaire", email: "caro@example.com", role: "customer", status: "inactive", orders: 2, totalSpent: 135.00, createdAt: "2024-01-20", avatar: null },
  { id: 4, name: "David Moreau", email: "david@example.com", role: "admin", status: "active", orders: 0, totalSpent: 0, createdAt: "2024-01-05", avatar: null },
  { id: 5, name: "Emma Bernard", email: "emma@example.com", role: "customer", status: "active", orders: 28, totalSpent: 4250.75, createdAt: "2024-01-08", avatar: null },
  { id: 6, name: "François Petit", email: "francois@example.com", role: "customer", status: "active", orders: 7, totalSpent: 890.30, createdAt: "2024-02-01", avatar: null },
  { id: 7, name: "Gabrielle Roux", email: "gab@example.com", role: "customer", status: "blocked", orders: 1, totalSpent: 55.00, createdAt: "2024-02-10", avatar: null },
];

export const mockOrders = [
  {
    id: "ORD-001", userId: 1, customer: "Alice Dupont", email: "alice@example.com",
    status: "delivered", total: 289.99, date: "2024-03-01",
    items: [
      { productId: 1, name: "Écouteurs Bluetooth Pro", qty: 2, price: 89.99 },
      { productId: 3, name: "Collier en Or 18K", qty: 1, price: 110.01 },
    ],
    shipping: { address: "12 rue de la Paix, Paris 75001", method: "Express" },
  },
  {
    id: "ORD-002", userId: 5, customer: "Emma Bernard", email: "emma@example.com",
    status: "processing", total: 899.00, date: "2024-03-05",
    items: [{ productId: 7, name: "Smartphone Ultra 5G", qty: 1, price: 899.00 }],
    shipping: { address: "45 avenue Montaigne, Paris 75008", method: "Standard" },
  },
  {
    id: "ORD-003", userId: 2, customer: "Bob Martin", email: "bob@example.com",
    status: "shipped", total: 145.00, date: "2024-03-07",
    items: [
      { productId: 6, name: "Sac à Dos Sport Nike", qty: 1, price: 65.00 },
      { productId: 10, name: "Chemise Lin Homme", qty: 1, price: 75.00 },
      { productId: 9, name: "Legging Yoga Premium", qty: 1, price: 5.00 },
    ],
    shipping: { address: "8 boulevard Haussmann, Paris 75009", method: "Standard" },
  },
  {
    id: "ORD-004", userId: 6, customer: "François Petit", email: "francois@example.com",
    status: "pending", total: 320.00, date: "2024-03-10",
    items: [{ productId: 4, name: "Veste Cuir Premium", qty: 1, price: 320.00 }],
    shipping: { address: "22 rue Victor Hugo, Lyon 69002", method: "Express" },
  },
  {
    id: "ORD-005", userId: 1, customer: "Alice Dupont", email: "alice@example.com",
    status: "cancelled", total: 55.00, date: "2024-03-12",
    items: [{ productId: 9, name: "Legging Yoga Premium", qty: 1, price: 55.00 }],
    shipping: { address: "12 rue de la Paix, Paris 75001", method: "Standard" },
  },
  {
    id: "ORD-006", userId: 5, customer: "Emma Bernard", email: "emma@example.com",
    status: "delivered", total: 1200.00, date: "2024-03-14",
    items: [{ productId: 8, name: "Bague Diamant Solitaire", qty: 1, price: 1200.00 }],
    shipping: { address: "45 avenue Montaigne, Paris 75008", method: "Express" },
  },
  {
    id: "ORD-007", userId: 3, customer: "Caroline Lemaire", email: "caro@example.com",
    status: "processing", total: 199.99, date: "2024-03-18",
    items: [{ productId: 2, name: "Montre Connectée Sport", qty: 1, price: 199.99 }],
    shipping: { address: "3 place Bellecour, Lyon 69002", method: "Standard" },
  },
];

export const mockStats = {
  totalRevenue: 3108.98,
  totalOrders: mockOrders.length,
  totalProducts: mockProducts.length,
  totalUsers: mockUsers.length,
  revenueChange: +12.5,
  ordersChange: +8.2,
  productsChange: +3.0,
  usersChange: +15.1,
  recentOrders: mockOrders.slice(0, 5),
  salesByMonth: [
    { month: "Jan", revenue: 1200 },
    { month: "Fév", revenue: 1800 },
    { month: "Mar", revenue: 2200 },
    { month: "Avr", revenue: 1900 },
    { month: "Mai", revenue: 2800 },
    { month: "Jun", revenue: 3100 },
  ],
};
