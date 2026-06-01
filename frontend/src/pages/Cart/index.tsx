import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {
    Trash2,
    ShoppingBag,
    ArrowRight,
    Minus,
    Plus
} from 'lucide-react';

import {motion, AnimatePresence} from 'framer-motion';

import {useAppDispatch} from '../../store/hooks';
import {
    removeFromCart,
    updateQuantity
} from '../../store/slices/cartSlice';

import {useToast} from '../../components/UI/Toast';

import {cartService} from '@admin/services/cartService.ts';
import {productService} from '@admin/services/productService.ts';
import {categoryService} from '@admin/services/categoryService.ts';

import {CartItemDto, Product, User} from '@/types';
import {BASE_URL} from '@/environment.ts';
import {cartItemService} from "@admin/services/cartItemService.ts";

const Cart: React.FC = () => {

    const [items, setItems] = useState<CartItemDto[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [cartId, setCartId] = useState<number>();
    const [user, setUser] = useState<User | null>(null);

    const {addToast} = useToast();

    // ================= LOAD USER =================
    useEffect(() => {
        const stored = localStorage.getItem("user");

        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    // debug option
    useEffect(() => {
        console.log("USER UPDATED:", user);
    }, [user]);

    // ================= LOAD CART =================
    useEffect(() => {

        if (!user?.id) return;

        const loadCart = async () => {
            try {
                const response = await cartService.findCartByUserId(user.id);

                setItems(response.cartItemDtos || []);
                setCartId(response.id);

            } catch (error) {
                console.error(error);
            }
        };

        loadCart();

    }, [user?.id]);

    // ================= LOAD PRODUCTS =================
    useEffect(() => {

        const loadProducts = async () => {

            if (items.length === 0) return;

            try {
                const responses = await Promise.all(
                    items.map(item =>
                        productService.getById(item.productId)
                    )
                );

                setProducts(responses);

            } catch (error) {
                console.error(error);
            }
        };

        loadProducts();

    }, [items]);

    // ================= LOAD CATEGORIES =================
    useEffect(() => {

        const loadCategories = async () => {
            try {
                const res = await categoryService.getAll();
                setCategories(res);
            } catch (error) {
                console.error(error);
            }
        };

        loadCategories();

    }, []);

    // ================= CALCUL =================
    const subtotal = items.reduce(
        (acc, item) => acc + item.unitPrice * item.quantity,
        0
    );

    const shipping = subtotal > 100 ? 0 : 10;

    const total = subtotal + shipping;

    // ================= REMOVE ITEM =================
    const handleRemove = async (cartId: number, cartItemId: number) => {

        try {
            await cartService.removeCartItem(cartId, cartItemId);

            setItems(prev =>
                prev.filter(item => item.id !== cartItemId)
            );
            window.dispatchEvent(new Event("cartUpdated"));

            addToast('Article retiré du panier', 'info');

        } catch (error) {
            console.error(error);
        }
    };

    // ================= UPDATE QTY =================
    const handleUpdateQty = async (cartItemId: number, quantity: number) => {
        if (quantity < 1) return;

        try {
            await cartItemService.updateCartItemQuantity(cartItemId, quantity);

            setItems(prev =>
                prev.map(item =>
                    item.id === cartItemId
                        ? { ...item, quantity }
                        : item
                )
            );

        } catch (error) {
            console.error(error);
        }
    };

    // ================= EMPTY CART =================
    if (items.length === 0) {

        return (
            <div className="container-custom py-32 text-center space-y-8">

                <div
                    className="w-24 h-24 bg-main-bg rounded-full flex items-center justify-center text-main-text mx-auto">
                    <ShoppingBag size={40}/>
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-black text-important">
                        Votre panier est vide
                    </h1>

                    <p className="text-main-text text-lg max-w-md mx-auto">
                        Découvrez nos collections et trouvez votre bonheur.
                    </p>
                </div>

                <Link
                    to="/products"
                    className="btn-primary inline-flex items-center gap-3 py-4 px-10"
                >
                    Commencer le shopping
                    <ArrowRight size={20}/>
                </Link>

            </div>
        );
    }

    // ================= UI =================
    return (

        <div className="container-custom py-12 md:py-20">

            <h1 className="text-4xl font-black text-important mb-12 tracking-tight">
                Panier
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                {/* ITEMS */}
                <div className="lg:col-span-2 space-y-8">

                    <AnimatePresence>

                        {items.map((item) => {

                            const product = products.find(
                                p => p.id === item.productId
                            );

                            const category = categories.find(
                                c => c.id === product?.categoryId
                            );

                            return (

                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, scale: 0.95}}
                                    className="flex flex-col sm:flex-row items-center gap-8 p-6 bg-white rounded-[2rem] border border-gray-100 group hover:shadow-xl transition-all"
                                >

                                    <Link
                                        to={`/product/${item.productId}`}
                                        className="shrink-0 w-32 h-32 bg-white flex items-center justify-center p-4 rounded-2xl border group-hover:scale-105 transition"
                                    >

                                        <img
                                            src={
                                                product?.fileName
                                                    ? `${BASE_URL}/files/${product.fileName}`
                                                    : '/placeholder.png'
                                            }
                                            alt={product?.name || 'Produit'}
                                            className="w-full h-full object-contain"
                                        />

                                    </Link>

                                    <div className="flex-grow space-y-4 text-center sm:text-left">

                                        <div className="space-y-1">

                                            <p className="text-[10px] font-black uppercase tracking-widest text-main-text">
                                                {category?.name}
                                            </p>

                                            <Link
                                                to={`/product/${item.productId}`}
                                                className="text-xl font-bold text-important line-clamp-1"
                                            >
                                                {product?.name}
                                            </Link>

                                        </div>

                                        <div className="flex items-center justify-center sm:justify-start gap-6">

                                            {/* QUANTITY */}
                                            <div className="flex items-center bg-main-bg rounded-xl p-1 border border-white/10">

                                                <button
                                                    onClick={() => handleUpdateQty(item.id, item.quantity - 1)}
                                                    className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 active:scale-95 transition"
                                                >
                                                    <Minus size={14}/>
                                                </button>

                                                <span className="w-10 text-center font-semibold text-black">
        {item.quantity}
    </span>

                                                <button
                                                    onClick={() => handleUpdateQty(item.id, item.quantity + 1)}
                                                    className="w-9 h-9 flex items-center justify-center rounded-lg
                   hover:bg-white/10 active:scale-95 transition"
                                                >
                                                    <Plus size={14}/>
                                                </button>

                                            </div>

                                            <p className="text-xl font-black text-important">
                                                {(item.unitPrice * item.quantity).toFixed(2)}€
                                            </p>

                                        </div>
<br/>
                                        <p className="text-sm text-main-text">
                                            Quantité disponible :{" "}
                                            <span className="font-bold text-important">
        {product?.quantity}
    </span>
                                        </p>                                    </div>

                                    <button
                                        onClick={() => {
                                            if (cartId) {
                                                handleRemove(cartId, item.id);
                                            }
                                        }}
                                        className="p-4 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition"
                                    >
                                        <Trash2 size={20}/>
                                    </button>

                                </motion.div>

                            );
                        })}

                    </AnimatePresence>

                </div>

                {/* SUMMARY */}
                <aside className="lg:sticky lg:top-32 h-fit">

                    <div className="bg-important text-white rounded-[2.5rem] p-10 space-y-8">

                        <h2 className="text-2xl font-black">
                            Résumé
                        </h2>

                        <div className="space-y-4">

                            <div className="flex justify-between text-white/60">
                                <span>Sous-total</span>
                                <span>{subtotal.toFixed(2)}€</span>
                            </div>

                            <div className="flex justify-between text-white/60">
                                <span>Livraison</span>
                                <span>
                                    {shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)}€`}
                                </span>
                            </div>

                            <div className="h-px bg-white/10"></div>

                            <div className="flex justify-between items-end">
                                <span>Total</span>
                                <span className="text-4xl font-black">
                                    {total.toFixed(2)}€
                                </span>
                            </div>

                        </div>

                        <Link
                            to="/checkout"
                            className="w-full bg-white text-important font-black py-5 rounded-2xl flex justify-center gap-2"
                        >
                            Commander
                            <ArrowRight size={20}/>
                        </Link>

                    </div>

                </aside>

            </div>

        </div>
    );
};

export default Cart;