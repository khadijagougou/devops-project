import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import {
    ShoppingCart,
    ArrowLeft,
    ShieldCheck,
    Truck,
    RotateCcw
} from 'lucide-react';

import { BASE_URL } from "@/environment.ts";
import Loader from '../../components/UI/Loader';
import { motion } from 'framer-motion';

import { cartItemService } from "@admin/services/cartItemService.ts";
import { useToast } from "@components/UI/Toast.tsx";

import { User } from "@/types";
import api from "@/axiosConfig.ts";

const ProductDetail: React.FC = () => {

    const { id } = useParams<{ id: string }>();

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [localUser, setLocalUser] = useState<User>();

    const { addToast } = useToast();

    // ================= USER =================
    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) setLocalUser(JSON.parse(stored));
    }, []);

    const userId = localUser?.id;

    // ================= FETCH PRODUCT =================
    useEffect(() => {
        api.get(`/product/id/${id}`)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    // ================= ADD TO CART =================
    async function addItemToCart(
        userId: number,
        productId: number,
        quantity: number
    ) {
        try {
            await cartItemService.addCartItemToCart(
                userId,
                productId,
                quantity
            );

            window.dispatchEvent(new Event("cartUpdated"));
            addToast("Produit ajouté au panier", "success");

        } catch (error) {
            addToast("Erreur lors de l'ajout au panier", "error");
        }
    }

    // ================= LOADING =================
    if (loading) {
        return (
            <div className="py-20">
                <Loader />
            </div>
        );
    }

    // ================= NOT FOUND =================
    if (!product) {
        return (
            <div className="container-custom py-20 text-center space-y-6">
                <h1 className="text-4xl font-black">Produit introuvable</h1>

                <Link to="/products" className="btn-primary inline-flex items-center gap-2">
                    <ArrowLeft size={20} />
                    Retour
                </Link>
            </div>
        );
    }

    // ================= STOCK RULES =================
    const isOutOfStock = product.quantity === 0;
    const isMaxStockReached = quantity >= product.quantity;

    const handleIncrease = () => {
        if (quantity < product.quantity) {
            setQuantity(quantity + 1);
        } else {
            addToast("Stock insuffisant", "error");
        }
    };

    const handleDecrease = () => {
        setQuantity(Math.max(1, quantity - 1));
    };

    const handleAddToCart = () => {

        if (!userId) return;

        if (product.quantity === 0) {
            addToast("Produit en rupture de stock", "error");
            return;
        }

        if (quantity > product.quantity) {
            addToast("Quantité non disponible", "error");
            return;
        }

        addItemToCart(userId, product.id, quantity);
    };

    // ================= UI =================
    return (
        <div className="container-custom py-12 md:py-20">

            <Link to="/products" className="inline-flex items-center gap-2 mb-12">
                <ArrowLeft size={18} />
                Retour
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* IMAGE */}
                <motion.div className="bg-white rounded-3xl p-10 flex justify-center">
                    <img
                        src={
                            product.fileName
                                ? `${BASE_URL}/files/${product.fileName}`
                                : "/placeholder.png"
                        }
                        className="max-h-[500px] object-contain"
                    />
                </motion.div>

                {/* INFO */}
                <motion.div className="space-y-8">

                    <h1 className="text-5xl font-black">{product.name}</h1>

                    <p className="text-4xl font-black text-important">
                        {product.price} €
                    </p>

                    <p className="text-gray-500">{product.description}</p>

                    {/* STOCK */}
                    {isOutOfStock ? (
                        <p className="text-red-500 font-bold">
                            Produit en rupture de stock
                        </p>
                    ) : (
                        <p className="text-sm">
                            Stock disponible:{" "}
                            <span className="font-bold">{product.quantity}</span>
                        </p>
                    )}

                    {/* QUANTITY */}
                    <div className="flex items-center gap-4">

                        <div className="flex items-center bg-gray-100 rounded-xl">

                            <button
                                onClick={handleDecrease}
                                className="w-12 h-12"
                            >
                                -
                            </button>

                            <span className="w-12 text-center font-bold">
                                {quantity}
                            </span>

                            <button
                                onClick={handleIncrease}
                                disabled={isMaxStockReached}
                                className="w-12 h-12 disabled:opacity-30"
                            >
                                +
                            </button>

                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={isOutOfStock}
                            className="btn-primary px-8 py-4 flex items-center gap-2 disabled:opacity-50"
                        >
                            <ShoppingCart size={20} />
                            Ajouter au panier
                        </button>

                    </div>

                    {/* BADGES */}
                    <div className="grid grid-cols-3 gap-4 pt-8 border-t">

                        <div className="flex items-center gap-2">
                            <Truck size={20} />
                            Livraison
                        </div>

                        <div className="flex items-center gap-2">
                            <ShieldCheck size={20} />
                            Garantie
                        </div>

                        <div className="flex items-center gap-2">
                            <RotateCcw size={20} />
                            Retours
                        </div>

                    </div>

                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetail;