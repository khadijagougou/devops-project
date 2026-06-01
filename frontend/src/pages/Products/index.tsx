import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Category } from "@/types";
import { categoryService } from "@admin/services/categoryService.ts";

import ProductCard from "../../components/Products/ProductCard";
import Loader from "../../components/UI/Loader";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import api from "@/axiosConfig.ts";

const Products: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [items, setItems] = useState<any[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const category = searchParams.get("category") || "all";
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "default";

    // ================= PRODUCTS =================
    useEffect(() => {
        api.get(`/product`)
            .then(res => {
                setItems(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // ================= CATEGORIES =================
    useEffect(() => {
        categoryService.getAll()
            .then(res => setCategories(res))
            .catch(err => console.error(err));
    }, []);

    // ================= FILTER LOGIC =================
    const filteredItems = items
        .filter(p => {

            const matchCategory =
                category === "all" ||
                p.categoryId === Number(category);

            const matchSearch =
                p.name?.toLowerCase().includes(search.toLowerCase());

            return matchCategory && matchSearch;
        })
        .sort((a, b) => {
            if (sort === "price-low-high") return a.price - b.price;
            if (sort === "price-high-low") return b.price - a.price;
            return 0;
        });

    // ================= HANDLERS =================
    const handleCategoryChange = (cat: string) => {
        setSearchParams(prev => {
            const params = Object.fromEntries(prev);
            return { ...params, category: cat };
        });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams(prev => {
            const params = Object.fromEntries(prev);
            return { ...params, search: e.target.value };
        });
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchParams(prev => {
            const params = Object.fromEntries(prev);
            return { ...params, sort: e.target.value };
        });
    };

    // ================= UI =================
    return (
        <div className="container-custom py-12 space-y-10">

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row justify-between gap-6">

                <div>
                    <h1 className="text-4xl font-black">Catalogue</h1>
                    <p className="text-gray-500">
                        {filteredItems.length} produits
                    </p>
                </div>

                {/* SEARCH + SORT */}
                <div className="flex gap-4">

                    <div className="relative">
                        <Search className="absolute left-3 top-3 text-gray-400" size={18}/>
                        <input
                            value={search}
                            onChange={handleSearchChange}
                            placeholder="Rechercher..."
                            className="border rounded-xl pl-10 p-2"
                        />
                    </div>

                    <select
                        value={sort}
                        onChange={handleSortChange}
                        className="border rounded-xl p-2"
                    >
                        <option value="default">Pertinence</option>
                        <option value="price-low-high">Prix ↑</option>
                        <option value="price-high-low">Prix ↓</option>
                    </select>

                </div>
            </div>

            <div className="flex gap-10">

                {/* CATEGORIES */}
                <aside className="w-60 space-y-2">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter size={18}/>
                        <span className="font-bold">Catégories</span>
                    </div>

                    <button
                        onClick={() => handleCategoryChange("all")}
                        className={`block w-full text-left p-2 rounded ${
                            category === "all" ? "bg-black text-white" : "bg-gray-100"
                        }`}
                    >
                        Toutes
                    </button>

                    {categories.map(cat => (
                        <button
                            key={cat.id}

                            onClick={() => handleCategoryChange(String(cat.id))}
                            className={`block w-full text-left p-2 rounded capitalize ${
                                category === String(cat.id)
                                    ? "bg-black text-white"
                                    : "bg-gray-100"
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </aside>

                {/* PRODUCTS */}
                <main className="flex-1">

                    {loading ? (
                        <Loader />
                    ) : filteredItems.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredItems.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    ) : (
                        <p>Aucun produit trouvé</p>
                    )}

                </main>
            </div>
        </div>
    );
};

export default Products;