import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, ShieldCheck, Zap, Star } from 'lucide-react';
import ProductCard from '../../components/Products/ProductCard';
import Loader from '../../components/UI/Loader';
import { motion } from 'framer-motion';
import api from "@/axiosConfig.ts";

const Home: React.FC = () => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
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
  const featuredProducts = items.slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl space-y-8"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              <span className="text-white text-xs font-bold uppercase tracking-widest">Nouvelle Collection 2026</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter">
              L'élégance <br /> Redéfinie
            </h1>
            <p className="text-xl text-white/70 max-w-xl leading-relaxed">
              Découvrez notre sélection exclusive de produits haut de gamme conçus pour votre style de vie moderne
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/products" className="btn bg-white text-black px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform flex items-center justify-center gap-3">
                Découvrir <ArrowRight size={20} />
              </Link>
              <Link to="/products" className="btn bg-transparent border-2 border-white/20 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                Boutique
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: Zap, title: "Livraison Express", desc: "Recevez vos articles en moins de 48h partout en Europe." },
            { icon: ShieldCheck, title: "Paiement Sécurisé", desc: "Vos transactions sont protégées par les protocoles les plus stricts." },
            { icon: Star, title: "Qualité Premium", desc: "Une curation minutieuse des meilleurs produits du marché." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center text-center space-y-4 p-8 rounded-3xl hover:bg-white transition-colors"
            >
              <div className="w-16 h-16 bg-main-bg rounded-2xl flex items-center justify-center text-important">
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl font-black text-important">{feature.title}</h3>
              <p className="text-main-text leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-important tracking-tight">Articles en Vedette</h2>
            <p className="text-main-text text-lg">Nos meilleures ventes sélectionnées pour vous.</p>
          </div>
          <Link to="/products" className="group flex items-center gap-2 font-black text-important hover:opacity-70 transition-all">
            Voir toute la boutique <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>


    </div>
  );
};

export default Home;
