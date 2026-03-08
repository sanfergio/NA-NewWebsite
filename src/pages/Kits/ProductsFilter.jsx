import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./ProductsFilter.module.css";
import Footer from "../../components/Footer/Footer.jsx";
import NavBar from "../../components/Navbar/NavBar.jsx";
import HomeButton from "../../components/HomeButton.jsx";
import Header from "../../components/Header/Header.jsx";
import WhatsAppButton from "../../components/WhatsappButton.jsx";

export default function Kits() {
  // ---------- ESTADOS DE LOADING E FILTROS ----------
  const [isSimulatingLoad, setIsSimulatingLoad] = useState(false);
  const [selectedRanges, setSelectedRanges] = useState(new Set());
  const [orderValue, setOrderValue] = useState("relevance");

  const priceOptions = [
    { id: "0-50", label: "Até R$50", min: 0, max: 50 },
    { id: "50-100", label: "R$50 - R$100", min: 50, max: 100 },
    { id: "100-200", label: "R$100 - R$200", min: 100, max: 200 },
    { id: "200+", label: "Acima de R$200", min: 200, max: null },
  ];

  // Função para simular o loading ao interagir
  const triggerLoading = () => {
    setIsSimulatingLoad(true);
    setTimeout(() => {
      setIsSimulatingLoad(false);
    }, 600);
  };

  const toggleRange = (id) => {
    triggerLoading();
    setSelectedRanges((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleOrderChange = (e) => {
    triggerLoading();
    setOrderValue(e.target.value);
  };

  const activePriceRanges = Array.from(selectedRanges)
    .map((id) => priceOptions.find((p) => p.id === id))
    .filter(Boolean)
    .map((p) => ({ min: p.min, max: p.max }));

  // ---------- ORDENAÇÃO ----------
  let orderBy;
  let orderDirection;

  if (orderValue === "price-asc") {
    orderBy = "varejo_value";
    orderDirection = "asc";
  } else if (orderValue === "price-desc") {
    orderBy = "varejo_value";
    orderDirection = "desc";
  } else {
    orderBy = "name";
    orderDirection = "asc";
  }

  // ---------- TITLE / SEO ----------
  useEffect(() => {
    const title = "New Andrew's | Kits";
    document.title = title;

    let og = document.querySelector('meta[property="og:title"]');
    if (!og) {
      og = document.createElement("meta");
      og.setAttribute("property", "og:title");
      document.head.appendChild(og);
    }
    og.setAttribute("content", title);
  }, []);

  return (
    <>
      <Header />
      <WhatsAppButton />
      <HomeButton />

      <div className={styles.produtosContainer}>
        <div className={styles.breadcrumb}>
          <span>Início → <a href="/kits">Kits</a></span>
        </div>

        {/* LAYOUT DE PRODUTOS E FILTROS */}
        <div className={styles.filtro}>
          <h1 className={styles.tituloPagina}>Kits</h1>

          <div className={styles.ordenacao}>
            <label>Ordenar por</label>
            <select value={orderValue} onChange={handleOrderChange}>
              <option value="relevance">Relevância</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
            </select>
          </div>
        </div>

        {/* Texto Descritivo da Seção de Kits */}
        <div className={styles.categoriaDescricao}>
          <p>
            Kits completos pensados para potencializar seus resultados.
            Economia e performance em um só lugar.
          </p>
        </div>

        <div className={styles.produtosLayout}>
          {/* FILTROS (Fixo na lateral) */}
          <aside className={styles.filtros}>
            <div className={styles.filtroGrupo}>
              <h4>Preço</h4>
              {priceOptions.map((opt) => (
                <label key={opt.id} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={selectedRanges.has(opt.id)}
                    onChange={() => toggleRange(opt.id)}
                  />
                  <span className={styles.customCheckbox}></span>
                  {opt.label}
                </label>
              ))}
            </div>
          </aside>

          <div className={styles.produtosArea}>
            {/* PRODUTOS COM ANIMAÇÃO DE LOADING */}
            <div
              className={`${styles.produtosWrapper} ${
                isSimulatingLoad ? styles.loadingAtivo : ""
              }`}
            >
              {isSimulatingLoad && (
                <div className={styles.loaderSpinner}></div>
              )}
              <ProductCard
                isKit={true} // Filtra apenas produtos que são kits
                priceRanges={activePriceRanges}
                orderBy={orderBy}
                orderDirection={orderDirection}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}