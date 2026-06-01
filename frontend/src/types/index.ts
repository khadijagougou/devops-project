// ─── Auth ────────────────────────────────────────────────────────────────────

export interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'customer';
}


export interface Product {
    id: number;
    name: string;
    description: string;
    categoryId: number;
    price: number;
    quantity: number;
    fileName: string;
}

export type ProductFormData = Omit<Product, 'id'>;

// ─── Category ────────────────────────────────────────────────────────────────

export interface Category {
    id: number;
    name: string;
}

export type CouponType = 'PERCENTAGE' | 'AMOUNT';

export interface Coupon {
    id: number;
    value: string;
    active: boolean;
    couponType: CouponType;
    startDate: string;
    expirationDate: string;
    name: string;
}

export type CouponFormData = Omit<Coupon, 'id'>;

export type CategoryFormData = Omit<Category, 'id' | 'productCount' | 'createdAt'>;

// ─── User ────────────────────────────────────────────────────────────────────

export type UserRole = 'ADMIN' | 'CUSTOMER';
export type UserStatus = 'active' | 'inactive' | 'blocked';

export interface User {
    id: number;
    firstname: string;
    email: string;
    role: UserRole;
    lastname: string;
    address: string;
    ville: string;
    codePostal: string;
    password?: string;

}

export type UserFormData = Pick<User, 'firstname' | 'email' | 'role' | 'lastname' | 'address' | 'ville' | 'codePostal' |'password'>;

// ─── Order ───────────────────────────────────────────────────────────────────

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' ;


export interface OrderItem {
    id?: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    orderId?: number;
}

export interface OrderShipping {
    address: string;
    method: string;
}

export interface Order {
    id?: string;
    userId: number;
    orderNumber: string;
    orderStatus: OrderStatus;
    orderDate: Date;
    date: string;
    orderItemDtos: OrderItem[];
    couponId?: number | null;
    total: number
    paymentStatus:PaymentStatus
}


// ─── Stats ───────────────────────────────────────────────────────────────────

export interface SalesByMonth {
    month: string;
    revenue: number;
}

export interface DashboardStats {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    totalUsers: number;
    revenueChange: number;
    ordersChange: number;
    productsChange: number;
    usersChange: number;
    recentOrders: Order[];
    salesByMonth: SalesByMonth[];
}

// ─── Store (public e-commerce) ───────────────────────────────────────────────

export interface StoreProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: { rate: number; count: number };
}

export interface CartItem extends StoreProduct {
    quantity: number;
}

// ─── Redux state slices ──────────────────────────────────────────────────────

export interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

export interface CartState {
    items: CartItem[];
}

export interface WishlistState {
    items: StoreProduct[];
}

export interface ProductFilters {
    category: string;
    search: string;
    sort: string;
}

export interface ProductState {
    items: StoreProduct[];
    filteredItems: StoreProduct[];
    loading: boolean;
    error: string | null;
    filters: ProductFilters;
}

export interface CartItemDto {
    id: number;
    cartId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
}
