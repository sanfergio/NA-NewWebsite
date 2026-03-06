// ProductCard.jsx
import React, { useState, useEffect } from "react";
import styles from "./ProductCard.module.css";
import { FaShippingFast } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import SupabaseClient from "../KEYS/App.jsx";
import AddCart from "../Alerts/AddCart";
import CartSidebar from "../CartSideBar/CartSideBar.jsx";

const supabase = SupabaseClient;
const STORAGE_KEY = "cart_v1";

// Altere para a rota base onde a página de produto está localizada (ex: "/product", "/produto", etc.)
const PRODUCT_PAGE_BASE = "/product";

export function currencyBRL(value) {
  return value == null
    ? "-"
    : Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
}

function ProductCard({
  category,
  limit,
  orderBy,
  orderDirection = "desc",
  onlyAvailable = true,
  priceRanges = [],
  brand = [],
  isKit, // Filtro por kit (1 = sim, 0 = não)// Permite customizar a base da URL se necessário
}) {
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAddCart, setShowAddCart] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        let query = supabase.from("db_na_products").select("*");

        // Disponíveis = 1
        if (onlyAvailable) {
          query = query.eq("disponible", 1);
        }

        // Filtro por Kit (1 = sim, 0 = não)
        if (isKit !== undefined && isKit !== null) {
          query = query.eq("is_kit", isKit ? 1 : 0);
        }

        if (category) query = query.eq("category", category);

        // Filtro por marca
        if (Array.isArray(brand) && brand.length > 0) {
          query = query.in("brand", brand.map(String));
        }

        if (orderBy) {
          query = query.order(orderBy, {
            ascending: orderDirection === "asc",
          });
        } else {
          query = query.order("name", { ascending: true });
        }

        if (limit) query = query.limit(limit);

        const { data, error } = await query;
        if (error) {
          console.error("Erro Supabase:", error);
          return;
        }

        let mapped = (data || []).map((p) => {
          const price = Number(p.varejo_value) || 0;

          // Constrói a URL do produto usando ID e SKU
          const productUrl = `produtos?productID=${p.id}&sku=${p.skul || ''}`;

          return {
            id: p.id,
            skul: p.skul, // Incluído para uso na URL
            title: p.name,
            name: p.name,
            price,
            oldPrice: price * 2, // Ajuste conforme regra de negócio
            images: [p.mockup_img, p.flyer_img].filter(Boolean),
            image:
              p.mockup_img ||
              p.flyer_img ||
              "https://via.placeholder.com/300x300?text=Produto",
            category: p.category,
            subcategory: "",
            available: p.disponible === 1,
            rating: 5, // mock
            unitsSold: 0,
            reviewCount: 0,
            stockQty: 999,
            shortDesc: p.short_description || "",
            longDesc: p.description || "",
            brand: p.brand,
            freeShipping: true,
            productUrl, // URL para a página do produto
          };
        });

        // Filtro de preço client-side
        if (priceRanges.length > 0) {
          mapped = mapped.filter((prod) =>
            priceRanges.some((r) => {
              const minOk = r.min == null || prod.price >= r.min;
              const maxOk = r.max == null || prod.price <= r.max;
              return minOk && maxOk;
            })
          );
        }

        setProducts(mapped);
      } catch (err) {
        console.error("Erro geral:", err);
      }
    }

    fetchProducts();
  }, [
    category,
    limit,
    orderBy,
    orderDirection,
    onlyAvailable,
    isKit,
    JSON.stringify(priceRanges),
    JSON.stringify(brand),// adicionado às dependências
  ]);

  const handleAddToCart = (product) => {
    setShowAddCart(true);

    const raw = localStorage.getItem(STORAGE_KEY);
    const cart = raw ? JSON.parse(raw) : [];

    const idx = cart.findIndex((it) => String(it.id) === String(product.id));

    if (idx > -1) {
      cart[idx].productQuantity += 1;
    } else {
      cart.push({
        id: product.id,
        productName: product.title,
        productPrice: product.price,
        productQuantity: 1,
        productImage: product.image,
      });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    setIsCartOpen(true);
    window.dispatchEvent(new Event("cartUpdated"));

    setTimeout(() => setShowAddCart(false), 3000);
  };

  return (
    <>
      <AddCart show={showAddCart} duration={3000} />
      
      <div className={styles.productsContainer}>
        {products.length === 0 ? (
          <p>Nenhum produto encontrado.</p>
        ) : (
          products.map((product) => (
            <div className={styles.productCard} key={product.id}>
              <div className={styles.freeShipping}>
                <span>
                  <FaShippingFast /> FRETE GRÁTIS
                </span>
              </div>

              {/* Imagem clicável leva à página do produto */}
              <a href={product.productUrl}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.productImage}
                />
              </a>

              <div className={styles.productInfo}>
                {/* Título também pode ser um link (opcional) */}
                <h3 title={product.title} className={styles.productTitle}>
                  <a href={product.productUrl} className={styles.productLink}>
                    {product.title}
                  </a>
                </h3>
                <p className={styles.productPrice}>
                  R${product.price.toFixed(2).replace(".", ",")}
                  {product.oldPrice && (
                    <span className={styles.productOldPrice}>
                      R${product.oldPrice.toFixed(2).replace(".", ",")}
                    </span>
                  )}
                </p>
              </div>

              <div className={styles.productActions}>
                <button
                  className={`${styles.btn} ${styles.btnCart}`}
                  onClick={() => handleAddToCart(product)}
                >
                  ADICIONAR <FaCartShopping />
                </button>
                {/* Botão "VER PRODUTO!" agora usa a URL gerada */}
                <a
                  href={product.productUrl}
                  className={`${styles.btn} ${styles.btnBuy}`}
                >
                  VER PRODUTO!
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default ProductCard;