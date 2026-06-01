import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {ShoppingCart, Eye} from 'lucide-react';
import {motion} from 'framer-motion';

import {useAppDispatch} from '../../store/hooks';
import {addToCart} from '../../store/slices/cartSlice';

import {useToast} from '../UI/Toast';

import {Product, User} from '../../types';

import {BASE_URL} from "@/environment.ts";
import {categoryService} from "@admin/services/categoryService.ts";
import {cartItemService} from "@admin/services/cartItemService.ts";

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({product}) => {
    const [cartCount, setCartCount] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [localUser, setLocalUser] = useState<User>();


    const {addToast} = useToast();

    const [categoryName, setCategoryName] = useState("");
    useEffect(() => {
        const stored = localStorage.getItem("user");

        if (stored) {
            setLocalUser(JSON.parse(stored));
        }

    }, []);
    const userId = localUser?.id;


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

    useEffect(() => {

        async function loadCategory() {

            try {

                const category = await categoryService.getById(
                    product.categoryId
                );

                setCategoryName(category.name);

            } catch (error) {

                console.error(error);
            }
        }

        loadCategory();

    }, [product.categoryId]);

    return (

        <motion.div
            layout
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            className="card group"
        >

            <div>

                <div className="relative aspect-square overflow-hidden bg-white p-8">

                    <img
                        src={`${BASE_URL}/files/${product.fileName}`}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                    />

                    <div
                        className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                        <Link to={`/product/${product.id}`}>
                            <div
                                className="w-10 h-10 bg-white text-important rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 delay-75 hover:bg-important hover:text-white">
                                <Eye size={18}/>
                            </div>
                        </Link>
                    </div>

                </div>

                <div className="p-5 space-y-2">

                    <p className="text-[10px] uppercase tracking-widest text-main-text font-bold">
                        {categoryName}
                    </p>

                    <h3 className="text-important font-bold text-sm line-clamp-1 group-hover:text-black transition-colors">
                        {product.name}
                    </h3>

                    <div className="flex items-center justify-between pt-2">

                        <p className="text-lg font-black text-important">
                            {product.price.toFixed(2)} €
                        </p>

                        <button
                            onClick={() => {
                                if (!userId) return;
                                addItemToCart(userId, product.id, quantity);
                            }}


                            className="p-2 bg-main-bg text-important rounded-xl hover:bg-important hover:text-white transition-all duration-300"
                        >
                            <ShoppingCart size={18}/>
                        </button>

                    </div>
                    {product?.quantity === 0 ? (
                        <p className="text-sm text-red-500 font-semibold">
                            Ce produit est en rupture de stock
                        </p>
                    ) : (
                        <p className="text-sm text-main-text">
                            Quantité disponible :{" "}
                            <span className="font-bold text-important">
            {product?.quantity}
        </span>
                        </p>
                    )}
                </div>

            </div>

        </motion.div>
    );
};

export default ProductCard;