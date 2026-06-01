import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// layouts
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/Products/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Checkout from './pages/Checkout';
import MyOrdersPage from './pages/Orders/MyOrdersPage';


// admin
import AdminLayout from './admin/layout/AdminLayout';
import DashboardPage from './admin/pages/DashboardPage';
import ProductsPage from './admin/pages/ProductsPage';
import CategoriesPage from './admin/pages/CategoriesPage';
import UsersPage from './admin/pages/UsersPage';
import OrdersPage from './admin/pages/OrdersPage';
import CouponsPage from './admin/pages/CouponsPage';
import ProfilePage from './pages/Profile/ProfilePage';

// routes

// toast
import { ToastProvider } from './components/UI/Toast';
import ProtectedRoute from "@admin/components/ProtectedRoute.tsx";
import {AdminRoute} from "@admin/components/AdminRoute.tsx";
import Success from "@pages/Success";
import Cancel from "@pages/Cancel";

const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

function App() {
    return (
        <ToastProvider>
            <Router>
                <ScrollToTop />

                <Routes>

                    {/* ================= ADMIN ================= */}
                    <Route element={<AdminRoute />}>
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<DashboardPage />} />
                            <Route path="products" element={<ProductsPage />} />
                            <Route path="categories" element={<CategoriesPage />} />
                            <Route path="users" element={<UsersPage />} />
                            <Route path="orders" element={<OrdersPage />} />
                            <Route path="coupons" element={<CouponsPage />} />
                            <Route path="profile" element={<ProfilePage />} />
                        </Route>
                    </Route>

                    {/* ================= PUBLIC ================= */}
                    <Route
                        path="/*"
                        element={
                            <div className="flex flex-col min-h-screen">
                                <Navbar />

                                <main className="flex-grow">
                                    <AnimatePresence mode="wait">
                                        <Routes>
                                            <Route path="/" element={<Home />} />
                                            <Route path="/products" element={<Products />} />
                                            <Route path="/product/:id" element={<ProductDetail />} />
                                            <Route path="/cart" element={<Cart />} />
                                            <Route path="/login" element={<Login />} />
                                            <Route path="/register" element={<Register />} />
                                            <Route path="/success" element={<Success />} />
                                            <Route path="/cancel" element={<Cancel />} />

                                            <Route
                                                path="/profile"
                                                element={
                                                    <ProtectedRoute>
                                                        <ProfilePage />
                                                    </ProtectedRoute>
                                                }
                                            />

                                            <Route
                                                path="/checkout"
                                                element={
                                                    <ProtectedRoute>
                                                        <Checkout />
                                                    </ProtectedRoute>
                                                }
                                            />

                                            <Route
                                                path="/my-orders"
                                                element={
                                                    <ProtectedRoute>
                                                        <MyOrdersPage />
                                                    </ProtectedRoute>
                                                }
                                            />

                                            <Route path="*" element={<Navigate to="/" replace />} />
                                        </Routes>
                                    </AnimatePresence>
                                </main>

                                <Footer />
                            </div>
                        }
                    />

                </Routes>
            </Router>
        </ToastProvider>
    );
}

export default App;