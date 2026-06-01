import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10 transition-colors">
      <div className="container-custom">
        {/* Newsletter Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 pb-20 border-b border-gray-50 mb-20">
          <div className="max-w-xl text-center lg:text-left space-y-3">
            <h3 className="text-3xl font-black text-important">Rejoignez le club GoMarket</h3>
            <p className="text-main-text text-lg">Inscrivez-vous pour des offres exclusives et les dernières tendances.</p>
          </div>
          <div className="flex w-full max-w-md gap-3">
            <input 
              type="email" 
              placeholder="Votre adresse email..." 
              className="flex-grow bg-main-bg border border-transparent rounded-2xl px-6 py-4 text-important placeholder:text-main-text focus:bg-white focus:border-important outline-none transition-all"
            />
            <button className="bg-important text-white font-bold px-8 py-4 rounded-2xl hover:opacity-90 transition-all shadow-lg whitespace-nowrap">
              S'inscrire
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-20">
          {/* Brand & Mission */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-important rounded-xl flex items-center justify-center text-white font-bold text-xl">
                G
              </div>
              <span className="text-xl font-black text-important tracking-tighter">
                GoMarket
              </span>
            </Link>
            <p className="text-main-text leading-relaxed">
              Redéfinir le shopping en ligne par la simplicité et l'élégance. Une curation unique pour un style de vie moderne.
            </p>
            <div className="flex space-x-5">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="text-main-text hover:text-important transition-colors transform hover:scale-110">
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>

          {/* Boutique Links */}
          <div className="lg:ml-auto">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-important">Boutique</h4>
            <ul className="space-y-4">
              {['Nouveautés', 'Électronique', 'Bijoux', 'Mode Homme', 'Mode Femme'].map((link) => (
                <li key={link}>
                  <Link to="/products" className="text-main-text hover:text-important transition-colors font-medium text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Aide Links */}
          <div className="lg:ml-auto">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-important">Aide & Info</h4>
            <ul className="space-y-4">
              {['Livraison', 'Retours & Échanges', 'FAQ', 'Conditions de vente', 'Vie privée'].map((link) => (
                <li key={link}>
                  <Link to="#" className="text-main-text hover:text-important transition-colors font-medium text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="lg:ml-auto space-y-8">
            <div>
              <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-6 text-important">Où nous trouver</h4>
              <div className="text-main-text text-sm flex items-start gap-2 leading-relaxed">
                <MapPin size={16} className="shrink-0 mt-0.5" />
                <span>123 Avenue du Luxe, <br />75008 Paris, France</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-4 text-important">Besoin d'aide ?</h4>
              <p className="text-important font-black text-lg">+33 1 23 45 67 89</p>
              <p className="text-main-text text-xs mt-1">Lundi - Samedi, 9h - 19h</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="flex items-center gap-4 text-xs font-bold text-main-text uppercase tracking-widest">
            <p>© 2024 GoMarket</p>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <p>Tous droits réservés</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
