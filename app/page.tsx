"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Star, ShoppingBag, ArrowRight, Check, Truck, RefreshCw, Shield, Sparkles, ChevronRight, Heart } from 'lucide-react';
import { brand, categories, type Category } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const products = [
  {
    id: 1,
    name: "Arc Floor Lamp",
    category: "lighting",
    price: 289,
    originalPrice: 349,
    rating: 4.9,
    reviewCount: 128,
    image: "https://blog.1800lighting.com/wp-content/uploads/2024/05/4-Arched-Floor-Lamps-1024x1024.jpeg",
    badge: "Best Seller",
    description: "Sculptural brass arc with a linen shade. Warm 2700K glow.",
  },
  {
    id: 2,
    name: "Linen Throw Pillow Set",
    category: "textiles",
    price: 79,
    rating: 4.7,
    reviewCount: 94,
    image: "https://m.media-amazon.com/images/I/81g-wfGYICL.jpg",
    badge: "New",
    description: "Stone-washed Belgian linen in four muted earth tones.",
  },
  {
    id: 3,
    name: "Walnut Side Table",
    category: "furniture",
    price: 445,
    originalPrice: 520,
    rating: 4.8,
    reviewCount: 61,
    image: "https://assets.rjimgs.com/rjimgs/ab/images/dp/wcm/202608/0002/bilquist-side-table-2-o.jpg",
    badge: "Sale",
    description: "Solid American walnut with hairpin legs. Hand-oiled finish.",
  },
  {
    id: 4,
    name: "Ceramic Bud Vase Trio",
    category: "accessories",
    price: 58,
    rating: 4.6,
    reviewCount: 203,
    image: "https://www.whiteflowerfarm.com/mas_assets/cache/image/b/3/7/b/45947.Jpg",
    description: "Hand-thrown stoneware in matte sage, cream, and charcoal.",
  },
  {
    id: 5,
    name: "Merino Wool Blanket",
    category: "textiles",
    price: 165,
    rating: 4.9,
    reviewCount: 77,
    image: "https://i.etsystatic.com/14235349/r/il/423719/3797668767/il_570xN.3797668767_7bs4.jpg",
    badge: "New",
    description: "Extra-fine 18.5-micron merino. Naturally temperature-regulating.",
  },
  {
    id: 6,
    name: "Pendant Cluster Light",
    category: "lighting",
    price: 375,
    rating: 4.7,
    reviewCount: 45,
    image: "https://images.thdstatic.com/productImages/f6a7ea42-af52-4ef0-af59-e2d4c6980a44/svn/brass-gold-uolfin-pendant-lights-628k7jnvuqm4038-64_600.jpg",
    description: "Three hand-blown glass globes on an adjustable brass canopy.",
  },
  {
    id: 7,
    name: "Oak Bookshelf",
    category: "furniture",
    price: 695,
    originalPrice: 820,
    rating: 4.8,
    reviewCount: 38,
    image: "https://images.thdstatic.com/productImages/72ec6830-a8b0-4d2d-86c1-025ec4a52b81/svn/dry-oak-concepts-in-wood-bookcases-bookshelves-mi7284-d-64_1000.jpg",
    badge: "Sale",
    description: "White oak with open shelving and a hidden cable channel.",
  },
  {
    id: 8,
    name: "Lava Stone Diffuser",
    category: "accessories",
    price: 42,
    rating: 4.5,
    reviewCount: 156,
    image: "https://shop.konmari.com/cdn/shop/products/KM_MC_37002_SPARKv2.jpg?v=1633356474&width=1946",
    description: "Volcanic lava stone with five essential oil blends included.",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Mara Jensen",
    location: "Copenhagen",
    rating: 5,
    text: "The Arc Floor Lamp transformed my living room. The quality is exceptional and it arrived beautifully packaged.",
    product: "Arc Floor Lamp",
    avatar: "https://www.ageist.com/wp-content/uploads/2024/05/IMG_5448-683x1024.jpg",
  },
  {
    id: 2,
    name: "Tom Ashford",
    location: "London",
    rating: 5,
    text: "I've ordered from Lumière three times now. The walnut side table is stunning in person. Solid, well-crafted, and ships faster than expected.",
    product: "Walnut Side Table",
    avatar: "https://m.media-amazon.com/images/S/amzn-author-media-prod/qh1tvts8tdte6nmlvpr1ngtade.jpg",
  },
  {
    id: 3,
    name: "Priya Nair",
    location: "Melbourne",
    rating: 5,
    text: "The merino blanket is the softest thing I own. Lumière's curation is unmatched. Every piece feels considered and intentional.",
    product: "Merino Wool Blanket",
    avatar: "https://picsum.photos/seed/75e65c99f82c/800/600",
  },
];

const valueProps = [
  {
    icon: Truck,
    title: "Free Shipping Over $150",
    description: "Complimentary delivery on all orders above $150. Express options available at checkout.",
  },
  {
    icon: RefreshCw,
    title: "60-Day Returns",
    description: "Not in love? Return any item within 60 days for a full refund, no questions asked.",
  },
  {
    icon: Shield,
    title: "2-Year Guarantee",
    description: "Every product is backed by our craftsmanship guarantee. We stand behind what we sell.",
  },
  {
    icon: Sparkles,
    title: "Curated Quality",
    description: "Each piece is hand-selected by our design team. We stock fewer things, but better ones.",
  },
];

const collections = [
  {
    id: "c1",
    title: "The Warm Home Edit",
    subtitle: "Lighting & Textiles",
    itemCount: 24,
    image: "https://luxuryhomeinsights.com.au/wp-content/uploads/2025/08/The-Art-of-Curated-Interiors-Less-Clutter-More-Class-1024x579.jpg",
    accent: "from-amber-900/60 to-amber-700/20",
  },
  {
    id: "c2",
    title: "Natural Materials",
    subtitle: "Furniture & Wood",
    itemCount: 18,
    image: "https://www.flor.com/dw/image/v2/BDWZ_PRD/on/demandware.static/-/Library-Sites-flor-global/default/dwa34769d9/Trend_Pages/SU26_TheWarmEdit/051226_SU26_TheWarmEdit_SquaredAway1.jpg?sw=390",
    accent: "from-stone-900/60 to-stone-700/20",
  },
  {
    id: "c3",
    title: "Minimal Accents",
    subtitle: "Ceramics & Objects",
    itemCount: 31,
    image: "https://rhythmsofplay.com/wp-content/uploads/2023/07/Natural-materials-for-open-ended-play-fb.jpg",
    accent: "from-slate-900/60 to-slate-700/20",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={12}
            className={
              star <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200"
            }
          />
        ))}
      </div>
      <span className="text-xs text-slate-500">
        {rating.toFixed(1)} ({count})
      </span>
    </div>
  );
}

const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)" },
  hover: { y: -6, boxShadow: "0 4px 8px rgba(0,0,0,0.06), 0 20px 40px -12px rgba(0,0,0,0.18)" },
};

const imageScale: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
};

function ProductCard({ product }: { product: typeof products[0] }) {
  const [wished, setWished] = useState(false);

  return (
    <motion.div
      variants={scaleIn}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group relative bg-white rounded-2xl overflow-hidden border border-black/5 cursor-pointer"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)" }}
    >
      <motion.div variants={cardHover} className="flex flex-col h-full">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3] bg-slate-50">
          <motion.img
            variants={imageScale}
            transition={{ duration: 0.4, ease: "easeOut" }}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <span
              className={`absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                product.badge === "Sale"
                  ? "bg-rose-500 text-white"
                  : product.badge === "New"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-900 text-white"
              }`}
            >
              {product.badge}
            </span>
          )}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setWished((w) => !w)}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm border border-black/5 transition-colors duration-200"
            aria-label="Wishlist"
          >
            <Heart
              size={14}
              className={wished ? "fill-rose-500 text-rose-500" : "text-slate-400"}
            />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          <p className="text-[11px] font-medium text-indigo-600 uppercase tracking-wider">
            {product.category}
          </p>
          <h3 className="text-sm font-semibold text-slate-900 leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed flex-1">
            {product.description}
          </p>
          <StarRating rating={product.rating} count={product.reviewCount} />
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-slate-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <motion.button
              whileTap={{ scale: 0.92 }}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors duration-200"
            >
              <ShoppingBag size={12} />
              Add
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-[#F7F5F2] overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-indigo-100/60 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-amber-100/50 blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-widest bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full">
                  <Sparkles size={11} />
                  New arrivals for Spring 2025
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05] text-balance"
              >
                Objects that
                <br />
                <span className="text-indigo-600">earn their place.</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-slate-600 leading-relaxed max-w-md text-pretty"
              >
                {brand.name} curates furniture, lighting, and home accessories
                built for longevity. Every piece is chosen for its craft, not
                its trend.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
                <motion.a
                  href="#products"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-200 shadow-[0_4px_14px_rgba(99,102,241,0.35)]"
                >
                  Shop the Collection
                  <ArrowRight size={16} />
                </motion.a>
                <motion.a
                  href="#collections"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#collections")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-6 py-3 rounded-full border border-black/10 transition-colors duration-200"
                >
                  View Collections
                </motion.a>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-center gap-6 pt-2">
                {[
                  { value: "4,800+", label: "Happy customers" },
                  { value: "98%", label: "5-star reviews" },
                  { value: "60-day", label: "Free returns" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="text-xl font-bold text-slate-900">{stat.value}</span>
                    <span className="text-xs text-slate-500">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right image collage */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-[520px] ml-auto">
                {/* Main image */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)]" style={{ color: "#01070e" }}>
                  <img
                    src="https://blog.1800lighting.com/wp-content/uploads/2024/05/4-Arched-Floor-Lamps-1024x1024.jpeg"
                    alt="Arc Floor Lamp in a modern living room"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating card — top left */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
                  className="absolute -left-10 top-12 bg-white rounded-2xl p-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.10)] border border-black/5 flex items-center gap-3 w-52"
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src="https://assets.rjimgs.com/rjimgs/ab/images/dp/wcm/202608/0002/bilquist-side-table-2-o.jpg"
                      alt="Walnut Side Table"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">Walnut Side Table</p>
                    <p className="text-xs text-indigo-600 font-bold">$445</p>
                  </div>
                </motion.div>
                {/* Floating card — bottom right */}
                <motion.div
                  initial={{ opacity: 0, x: 20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
                  className="absolute -right-8 bottom-16 bg-white rounded-2xl p-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.10)] border border-black/5"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={10} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-slate-900 w-36 leading-snug">
                    "Exactly what my space needed."
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">Mara J. — Copenhagen</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Value Props ──────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-black/5">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {valueProps.map((vp) => (
              <motion.div
                key={vp.title}
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <vp.icon size={18} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{vp.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5 hidden sm:block">
                    {vp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Collections ──────────────────────────────────────────────────── */}
      <section id="collections" className="bg-[#F7F5F2] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12"
          >
            <motion.p variants={fadeInUp} className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">
              Curated Collections
            </motion.p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 text-balance">
                Shop by mood,
                <br />not by category.
              </motion.h2>
              <motion.a
                variants={fadeInUp}
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                All products <ChevronRight size={16} />
              </motion.a>
            </div>
          </motion.div>

          {/* Asymmetric grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {collections.map((col, i) => (
              <motion.div
                key={col.id}
                variants={scaleIn}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                  i === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-square"
                }`}
                style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.06), 0 12px 32px -8px rgba(0,0,0,0.14)" }}
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${col.accent}`} />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-white/70 text-xs font-medium uppercase tracking-wider mb-1">
                    {col.subtitle}
                  </p>
                  <h3 className="text-white text-xl font-bold leading-snug">{col.title}</h3>
                  <p className="text-white/60 text-xs mt-1">{col.itemCount} pieces</p>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ArrowRight size={14} className="text-white" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────────────────────── */}
      <section id="products" className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-10"
          >
            <motion.p variants={fadeInUp} className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">
              The Shop
            </motion.p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 text-balance">
                Fewer things,
                <br />better things.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-sm text-slate-500 max-w-xs leading-relaxed">
                Every product passes our 12-point quality review before it earns a place in the store.
              </motion.p>
            </div>
          </motion.div>

          {/* Category filter */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {categories.map((cat: Category) => (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-indigo-600 text-white shadow-[0_2px_8px_rgba(99,102,241,0.35)]"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Product grid */}
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400 text-sm">
              No products in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* ── About / Brand Story ──────────────────────────────────────────── */}
      <section id="about" className="bg-slate-900 py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image side */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
                <img
                  src="http://shelfology.com/cdn/shop/files/aksel-floating-shelf_led_Walnut_front_split-screen.jpg?v=1727204867"
                  alt="Lumière workshop — hand-finishing a walnut shelf"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>
              {/* Floating stat */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                className="absolute -right-6 bottom-10 bg-indigo-600 rounded-2xl p-5 shadow-[0_8px_24px_rgba(99,102,241,0.4)]"
              >
                <p className="text-3xl font-bold text-white">12</p>
                <p className="text-indigo-200 text-xs mt-0.5">Quality checks<br />per product</p>
              </motion.div>
            </motion.div>

            {/* Copy side */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-6"
            >
              <motion.p variants={fadeInUp} className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
                Our Story
              </motion.p>
              <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight text-balance">
                Built on the belief that less is more.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-slate-400 leading-relaxed text-pretty">
                {brand.name} started in 2019 as a small studio in Copenhagen with a single rule: only stock what we would put in our own homes. No trend-chasing, no fast furniture, no compromises on material quality.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-slate-400 leading-relaxed text-pretty">
                Today we work with 34 independent makers across Scandinavia, Japan, and Portugal. Every supplier is visited in person. Every material is traceable. Every piece is built to outlast the decade.
              </motion.p>
              <motion.ul variants={staggerContainer} className="flex flex-col gap-3 mt-2">
                {[
                  "Sustainably sourced materials, certified where possible",
                  "Carbon-neutral shipping on all European orders",
                  "1% of revenue donated to reforestation projects",
                ].map((point) => (
                  <motion.li key={point} variants={fadeInUp} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={11} className="text-indigo-400" />
                    </div>
                    <span className="text-sm text-slate-300 leading-relaxed">{point}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="bg-[#F7F5F2] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">
              Customer Stories
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 text-balance">
              Loved by people who care
              <br />about their spaces.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`bg-white rounded-2xl p-6 border border-black/5 flex flex-col gap-4 ${
                  i === 1 ? "md:mt-6" : ""
                }`}
                style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.10)" }}
              >
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={13} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-black/5">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.location} · {t.product}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────────────── */}
      <section id="newsletter" className="bg-indigo-600 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/40 blur-[100px]" />
          <div className="absolute bottom-[-20%] left-[-5%] w-[400px] h-[400px] rounded-full bg-indigo-700/40 blur-[80px]" />
        </div>
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-center gap-6"
          >
            <motion.p variants={fadeInUp} className="text-xs font-semibold text-indigo-200 uppercase tracking-widest">
              Stay in the loop
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-bold tracking-tight text-white text-balance">
              New arrivals, first.
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-indigo-200 leading-relaxed text-pretty">
              Join 12,000 subscribers who get early access to new collections, restocks, and the occasional design essay. No spam, ever.
            </motion.p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center gap-2 bg-white/20 text-white font-semibold px-6 py-3 rounded-full"
              >
                <Check size={16} />
                You&apos;re on the list. Welcome.
              </motion.div>
            ) : (
              <motion.form
                variants={fadeInUp}
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-3 rounded-full bg-white/15 border border-white/25 text-white placeholder-indigo-300 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-200"
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full text-sm hover:bg-indigo-50 transition-colors duration-200 whitespace-nowrap"
                >
                  Subscribe
                </motion.button>
              </motion.form>
            )}

            <motion.p variants={fadeInUp} className="text-xs text-indigo-300">
              Unsubscribe any time. We respect your inbox.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}