import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {
    Truck,
    MapPin,
    CheckCircle,
    ArrowRight,
    BadgePercent
} from 'lucide-react';

import {motion} from 'framer-motion';

import {useToast} from '../../components/UI/Toast';

import {cartService} from '@admin/services/cartService.ts';
import {productService} from '@admin/services/productService.ts';

import {CartItemDto, Coupon, Product, User} from '@/types';

import {BASE_URL} from '@/environment.ts';

import {userService} from "@admin/services/userService.ts";
import {couponService} from "@admin/services/couponService.ts";
import {paypalService} from "@admin/services/paypalService.ts";

const Checkout: React.FC = () => {

    const [step, setStep] = useState(1);

    const [items, setItems] = useState<CartItemDto[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    const [user, setUser] = useState<User>();
    const [localUser, setLocalUser] = useState<User>();

    const [couponName, setCouponName] = useState('');
    const [discount, setDiscount] = useState(0);

    const [coupon, setCoupon] = useState<Coupon | null>(null);

    const navigate = useNavigate();

    const {addToast} = useToast();

    // ================= LOAD LOCAL USER =================

    useEffect(() => {

        const stored = localStorage.getItem("user");

        if (!stored) return;

        const parsedUser = JSON.parse(stored);

        setLocalUser(parsedUser);
        setUser(parsedUser);

    }, []);

    // ================= LOAD USER =================

    useEffect(() => {

        if (!localUser?.id) return;

        const loadUser = async () => {

            try {

                const response = await userService.getById(localUser.id);

                setUser(response);

            } catch (error) {

                console.error(error);

            }
        };

        loadUser();

    }, [localUser?.id]);

    // ================= LOAD CART =================

    useEffect(() => {

        if (!localUser?.id) return;

        const loadCart = async () => {

            try {

                const response = await cartService.findCartByUserId(localUser.id);

                setItems(response.cartItemDtos || []);

            } catch (error) {

                console.error(error);

            }
        };

        loadCart();

    }, [localUser?.id]);

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

    // ================= CALCULS =================

    const subtotal = items.reduce(
        (acc, item) => acc + item.unitPrice * item.quantity,
        0
    );

    const shipping = subtotal > 100 ? 0 : 10;

    const total = subtotal + shipping - discount;

    // ================= APPLY COUPON =================

    const handleApplyCoupon = async () => {

        try {

            const result = await couponService.getByName(couponName);

            if (!result) {

                addToast('Coupon invalide', 'error');

                return;
            }

            setCoupon(result);

            let newDiscount = 0;

            if (result.couponType === "PERCENTAGE") {

                newDiscount = subtotal * result.value / 100;

            } else {

                newDiscount = result.value;
            }

            setDiscount(newDiscount);

            addToast('Coupon appliqué avec succès', 'success');

        } catch (error) {

            addToast('Coupon invalide', 'error');

        }
    };

    // ================= GENERATE ORDER NUMBER =================

    function generateRandomOrderNumber(): string {

        const random = Math.floor(Math.random() * 100000);

        return `ORD-${Date.now()}-${random}`;
    }

    // ================= PAYPAL PAYMENT =================

    const pay = async () => {

        try {

            const orderItems = items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: item.unitPrice
            }));

            const pendingOrder = {

                userId: user?.id || 1,

                orderNumber: generateRandomOrderNumber(),

                orderStatus: 'PENDING',

                orderDate: new Date(),

                date: new Date().toISOString(),

                orderItemDtos: orderItems,

                couponId: coupon?.id,

                total: Number(total.toFixed(2))
            };

            localStorage.setItem(
                "pendingOrder",
                JSON.stringify(pendingOrder)
            );

            const url = await paypalService.handlePaypal(total);

            window.location.href = url;

        } catch (error) {

            console.error(error);

            addToast("Erreur PayPal", "error");

        }
    };

    // ================= EMPTY CART =================

    if (items.length === 0) {

        return (

            <div className="container-custom py-32 text-center space-y-8">

                <div
                    className="content-center w-24 h-24 bg-main-bg rounded-full flex items-center justify-center mx-auto"
                >
                    <Truck size={40}/>
                </div>

                <h1 className="text-4xl font-black text-important">
                    Panier vide
                </h1>

                <p className="text-main-text">
                    Aucun produit à commander.
                </p>

            </div>
        );
    }

    return (

        <div className="container-custom py-12 md:py-20">

            <div className="max-w-5xl mx-auto">

                <h1
                    className="text-4xl font-black text-important mb-12 text-center tracking-tight"
                >
                    Finaliser ma Commande
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">

                    {/* LEFT */}

                    <div className="lg:col-span-2 space-y-10">

                        {/* STEPS */}

                        <div className="flex items-center justify-between mb-12 relative">

                            {[
                                {n: 1, label: 'Livraison', icon: MapPin},
                                {n: 2, label: 'Paiement', icon: CheckCircle}
                            ].map((s) => (

                                <div
                                    key={s.n}
                                    className="flex flex-col items-center gap-3 relative z-10"
                                >

                                    <div
                                        className={`w-14 h-14 rounded-2xl flex items-center justify-center
                                        transition-all duration-300
                                        ${
                                            step >= s.n
                                                ? 'bg-important text-white'
                                                : 'bg-main-bg text-main-text'
                                        }`}
                                    >
                                        <s.icon size={24}/>
                                    </div>

                                    <span
                                        className={`text-xs font-black uppercase tracking-widest
                                        ${
                                            step >= s.n
                                                ? 'text-important'
                                                : 'text-main-text'
                                        }`}
                                    >
                                        {s.label}
                                    </span>

                                </div>

                            ))}

                        </div>

                        {/* CONTENT */}

                        <motion.div
                            key={step}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            className="bg-white rounded-[2.5rem] p-10 md:p-14
                            border border-gray-100 shadow-xl shadow-black/[0.02]"
                        >

                            {/* STEP 1 */}

                            {step === 1 && (

                                <div className="space-y-8">

                                    <h3 className="text-2xl font-black text-important">
                                        Informations de l'utilisateur
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                        <input
                                            disabled
                                            className="input"
                                            placeholder="Prénom"
                                            value={user?.firstname}
                                        />

                                        <input
                                            disabled
                                            className="input"
                                            placeholder="Nom"
                                            value={user?.lastname}
                                        />

                                        <input
                                            className="input md:col-span-2"
                                            placeholder="Adresse"
                                            value={user?.address}
                                        />

                                        <input
                                            className="input"
                                            placeholder="Ville"
                                            value={user?.ville}
                                        />

                                        <input
                                            className="input"
                                            placeholder="Code Postal"
                                            value={user?.codePostal}
                                        />

                                    </div>

                                    <button
                                        onClick={() => setStep(2)}
                                        className="btn-primary w-full py-5 text-lg
                                        flex items-center justify-center gap-3"
                                    >
                                        Continuer
                                        <ArrowRight size={20}/>
                                    </button>

                                </div>

                            )}

                            {/* STEP 2 */}

                            {step === 2 && (

                                <div className="space-y-8 text-center">

                                    <div
                                        className="w-20 h-20 bg-emerald-50 text-emerald-500
                                        rounded-full flex items-center justify-center mx-auto"
                                    >
                                        <CheckCircle size={40}/>
                                    </div>

                                    <div className="space-y-2">

                                        <h3 className="text-3xl font-black text-important">
                                            Paiement PayPal
                                        </h3>

                                        <p className="text-main-text">
                                            Vous allez être redirigé vers PayPal
                                            pour terminer votre paiement sécurisé.
                                        </p>

                                    </div>

                                    <div
                                        className="bg-main-bg p-6 rounded-2xl text-left space-y-3"
                                    >

                                        <div
                                            className="flex justify-between font-bold text-important"
                                        >

                                            <span>Total à régler</span>

                                            <span>
                                                {total.toFixed(2)} €
                                            </span>

                                        </div>

                                    </div>

                                    <div className="flex gap-4">

                                        <button
                                            onClick={() => setStep(1)}
                                            className="btn-secondary flex-grow py-5 font-bold"
                                        >
                                            Retour
                                        </button>

                                        <button
                                            onClick={pay}
                                            className="btn-primary flex-[2] py-5
                                            text-lg font-black"
                                        >
                                            Payer avec PayPal
                                        </button>

                                    </div>

                                </div>

                            )}

                        </motion.div>

                    </div>

                    {/* RIGHT */}

                    <aside className="space-y-8">

                        <div
                            className="bg-main-bg rounded-[2rem] p-8 border border-gray-100"
                        >

                            <h4
                                className="text-sm font-black uppercase tracking-widest
                                text-important mb-6"
                            >
                                Votre Commande
                            </h4>

                            <div
                                className="space-y-6 max-h-[400px]
                                overflow-y-auto pr-2 custom-scrollbar"
                            >

                                {items.map((item) => {

                                    const product = products.find(
                                        p => p.id === item.productId
                                    );

                                    return (

                                        <div
                                            key={item.id}
                                            className="flex gap-4"
                                        >

                                            <div
                                                className="w-16 h-16 bg-white rounded-xl p-2
                                                shrink-0 border border-gray-50
                                                flex items-center justify-center"
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

                                            </div>

                                            <div className="flex-grow min-w-0">

                                                <p
                                                    className="text-sm font-bold text-important truncate"
                                                >
                                                    {product?.name}
                                                </p>

                                                <p className="text-xs text-main-text">
                                                    {item.quantity} x {item.unitPrice.toFixed(2)} €
                                                </p>

                                            </div>

                                        </div>

                                    );

                                })}

                            </div>

                            <div
                                className="mt-8 pt-6 border-t border-gray-200 space-y-3"
                            >

                                <div
                                    className="flex justify-between text-sm text-main-text"
                                >

                                    <span>Sous-total</span>

                                    <span className="font-bold text-important">
                                        {subtotal.toFixed(2)} €
                                    </span>

                                </div>

                                <div
                                    className="flex justify-between text-sm text-main-text"
                                >

                                    <span>Livraison</span>

                                    <span className="font-bold text-important">

                                        {
                                            shipping === 0
                                                ? 'Gratuite'
                                                : `${shipping.toFixed(2)} €`
                                        }

                                    </span>

                                </div>

                                <div className="flex items-center gap-3">

                                    <input
                                        className="input flex-1"
                                        placeholder="Coupon"
                                        value={couponName}
                                        onChange={(e) => setCouponName(e.target.value)}
                                    />

                                    <button
                                        className="w-12 h-12 flex items-center justify-center
                                        text-black hover:bg-gray-400 hover:text-white
                                        rounded-2xl transition border"
                                        onClick={handleApplyCoupon}
                                    >

                                        <BadgePercent size={16}/>

                                    </button>

                                </div>

                                <div
                                    className="flex justify-between text-xl font-black
                                    text-important pt-2"
                                >

                                    <span>Total</span>

                                    <span>{total.toFixed(2)} €</span>

                                </div>

                            </div>

                        </div>

                    </aside>

                </div>

            </div>

        </div>
    );
};

export default Checkout;