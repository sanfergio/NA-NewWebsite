"use client"

import React, { useState, useEffect } from "react"
import { Star, ShoppingCart, CheckCircle2, XCircle } from "lucide-react"
import styles from "./ProductPage.module.css"
import HomeButton from '../../components/HomeButton.jsx';
import Header from '../../components/Header/Header.jsx';
import WhatsAppButton from '../../components/WhatsappButton.jsx';
import Footer from '../../components/Footer/Footer.jsx'
import AllProductsList from '../../components/AllProductsList/AllProductsList.jsx'
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts.jsx";
import SupabaseClient from "../../components/KEYS/App.jsx";

const supabase = SupabaseClient;
const STORAGE_KEY = "cart_v1";

// Função para traduzir a categoria do banco para exibição amigável
const getCategoryLabel = (category) => {
  if (category === "pre_workout") return "Pré-Treino";
  else if (category === "amino_acids") return "Aminoácidos";
  else if (category === "personal_care") return "Cuidados Pessoais";
  else if (category === "thermogenics") return "Termogênicos";
  else if (category === "vitamins") return "Vitaminas";
  else if (category === "oils") return "Óleos";
  else if (category === "coenzymes") return "Coenzimas";
  else if (category === "female") return "Saúde da Mulher";
  else if (category === "masculine") return "Saúde do Homem";
  else if (category === "Cuidados Pessoal") return "Cuidados Pessoais"; // tratamento para valor atípico
  else return category; // fallback: retorna o próprio valor se não houver tradução
};

const StarRating = ({ rating, reviewCount }) => {
  const numRating = Number(rating) || 5.0; // Padrão 5 se não houver na DB
  const numReviewCount = Number(reviewCount) || 12;

  const fullStars = Math.floor(numRating)
  const hasHalfStar = numRating % 1 !== 0
  const emptyStars = 5 - Math.ceil(numRating)

  return (
    <div className={styles.rating}>
      <div className={styles.stars}>
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className={styles.starFilled}
            fill="currentColor"
            size={20}
          />
        ))}
        {hasHalfStar && (
          <div className={styles.halfStarContainer}>
            <Star
              key="half"
              className={styles.starFilled}
              fill="currentColor"
              size={20}
              style={{ clipPath: 'inset(0 50% 0 0)' }}
            />
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={styles.starEmpty}
            size={20}
          />
        ))}
      </div>
      <span className={styles.ratingText}>
        {numRating.toFixed(1)} ({numReviewCount} avaliações)
      </span>
    </div>
  )
}

const ImageGallery = ({ images, name }) => {
  const validImages = Array.isArray(images) ? images.filter(img => img && img !== 'none') : [];
  const [selected, setSelected] = useState(validImages[0] || "/placeholder.svg");

  useEffect(() => {
    if (validImages.length > 0) setSelected(validImages[0]);
  }, [images]);

  return (
    <div className={styles.gallery}>
      <div className={styles.thumbnails}>
        {validImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(img)}
            className={`${styles.thumbnail} ${selected === img ? styles.thumbnailActive : ""}`}
          >
            <img src={img} alt={`${name} ${i + 1}`} />
          </button>
        ))}
      </div>
      <div className={styles.mainImage}>
        <img src={selected} alt={name} />
      </div>
    </div>
  )
}

const ProductActions = ({ product }) => {
  const parsePrice = (p) => Number(p) || 0;

  const addProductToLocalCart = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const cart = raw ? JSON.parse(raw) : [];
      const existingIndex = cart.findIndex((it) => String(it.id) === String(product.id));

      const newItem = {
        id: product.id,
        productName: product.name,
        productPrice: parsePrice(product.varejo_value),
        productImage: product.mockup_img || "/placeholder.svg",
        productQuantity: 1
      };

      if (existingIndex > -1) {
        cart[existingIndex].productQuantity += 1;
      } else {
        cart.push(newItem);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent("cartUpdated", { detail: cart }));
      return cart;
    } catch (err) {
      console.error("Erro ao adicionar ao cart:", err);
    }
  };

  const addToCart = () => {
    addProductToLocalCart();
    window.dispatchEvent(new Event("showAddNotification"));
    window.dispatchEvent(new Event("openCartSidebar"));
  }

  const buyNow = () => {
    addProductToLocalCart();
    window.location.href = "/carrinho";
  }

  return (
    <div className={styles.actions}>
      <button onClick={addToCart} className={styles.btnCart}>
        <ShoppingCart /> Adicionar ao carrinho
      </button>
      <button onClick={buyNow} className={styles.btnBuy}>
        Comprar agora
      </button>
    </div>
  )
}

const DetailRow = ({ label, children }) => (
  <div className={styles.detail}>
    <span className={styles.label}>{label}</span>
    <div className={styles.detailContent}>{children}</div>
  </div>
)

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const productID = urlParams.get('productID');

    const fetchProduct = async () => {
      if (!productID) {
        setError("Nenhum produto selecionado.");
        setLoading(false);
        return;
      }

      try {
        const { data, error: dbError } = await supabase
          .from('db_na_products')
          .select('*')
          .eq('id', productID)
          .single();

        if (dbError) throw dbError;
        setProduct(data);
        document.title = `New Andrew's | ${data.name}`;
      } catch (err) {
        setError("Não foi possível carregar o produto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) return <div className={styles.statusMessage}><h2>Carregando...</h2></div>;
  if (error || !product) return <div className={styles.statusMessage}><h2>{error || "Produto não encontrado."}</h2></div>;

  return (
    <>
      <Header />
      <HomeButton />
      <WhatsAppButton />

      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.product}>
            <ImageGallery 
              images={[product.mockup_img, product.flyer_img, product.ingredients_rotule_img, product.nutriotional_rotule_img]} 
              name={product.name} 
            />
            
            <div className={styles.info}>
              <h1>{product.name}</h1>
              <p className={styles.shortDesc}>{product.short_description}</p>
              
              <StarRating rating={product.rating} reviewCount={product.reviewcount} />

              <div className={styles.price}>
                <span className={styles.priceNow}>
                  R$ {Number(product.varejo_value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                {/* Exemplo de desconto fictício ou baseado em regra de negócio */}
                <span className={styles.priceOld}>
                  R$ {(Number(product.varejo_value) * 1.2).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className={styles.productBadges}>
                <div className={styles.badge}><strong>{product.units_caps}</strong> Cápsulas</div>
                <div className={styles.badge}><strong>{product.mg}mg</strong> por dose</div>
              </div>

              <ProductActions product={product} />
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <section className={styles.section}>
            <h2>Especificações Técnicas</h2>
            
            <div className={styles.specsGrid}>
              <DetailRow label="Categoria:">
                <span className={styles.tag}>{getCategoryLabel(product.category)}</span>
              </DetailRow>

              <DetailRow label="Marca:">
                <span>{product.brand}</span>
              </DetailRow>

              <DetailRow label="Destaques:">
                <div className={styles.dietaryIcons}>
                  <span className={product.vegan === "1" ? styles.check : styles.uncheck}>
                    {product.vegan === "1" ? <CheckCircle2 size={16}/> : <XCircle size={16}/>} Vegano
                  </span>
                  <span className={product.gluten === "0" ? styles.check : styles.uncheck}>
                    {product.gluten === "0" ? <CheckCircle2 size={16}/> : <XCircle size={16}/>} Sem Glúten
                  </span>
                  <span className={product.lactose === "0" ? styles.check : styles.uncheck}>
                    {product.lactose === "0" ? <CheckCircle2 size={16}/> : <XCircle size={16}/>} Sem Lactose
                  </span>
                </div>
              </DetailRow>

              {product.objective && (
                <DetailRow label="Objetivo:">
                  <span>{product.objective}</span>
                </DetailRow>
              )}
            </div>
          </section>

          <section className={styles.section}>
            <h2>Descrição Completa</h2>
            <div className={styles.longDescription}>
              {product.description}
            </div>
          </section>
        </div>
      </div>

      <RelatedProducts 
        company_name={product.brand} 
        category={product.category} 
        currentProductId={product.id} 
      />
      
      <AllProductsList />
      <Footer />
    </>
  )
}