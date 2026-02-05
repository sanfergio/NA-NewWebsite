import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./ProductsFilter.module.css";
import Footer from "../../components/Footer/Footer.jsx";
import NavBar from "../../components/Navbar/NavBar.jsx";
import HomeButton from "../../components/HomeButton.jsx";
import Header from "../../components/Header/Header.jsx";
import WhatsAppButton from "../../components/WhatsappButton.jsx";

export default function ProductsFilter() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get("categoria");

  // URL → nome exibido
  const categoryMap = {
    vitamins: "Vitaminas",
    pre_workout: "Pré-Treino",
    amino_acids: "Aminoácidos",
    thermogenics: "Termogênicos",
    personal_care: "Cuidados Pessoais",
    oils: "Óleos",
    coenzymes: "Coenzimas",
    female: "Linha Feminina",
    masculine: "Linha Masculina",
  };

  const categoryLabel = categoryMap[categoryParam] || "Todos os Produtos";

  // ---------- PREÇO ----------
  const priceOptions = [
    { id: "0-50", label: "Até R$50", min: 0, max: 50 },
    { id: "50-100", label: "R$50 - R$100", min: 50, max: 100 },
    { id: "100-200", label: "R$100 - R$200", min: 100, max: 200 },
    { id: "200+", label: "Acima de R$200", min: 200, max: null },
  ];

  const [selectedRanges, setSelectedRanges] = useState(new Set());

  const toggleRange = (id) => {
    setSelectedRanges((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const activePriceRanges = Array.from(selectedRanges)
    .map((id) => priceOptions.find((p) => p.id === id))
    .filter(Boolean)
    .map((p) => ({ min: p.min, max: p.max }));

  // ---------- ORDENAÇÃO ----------
  const [orderValue, setOrderValue] = useState("relevance");

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
    const title = categoryLabel
      ? `New Andrew's | ${categoryLabel}`
      : "New Andrew's Suplementos";

    document.title = title;

    let og = document.querySelector('meta[property="og:title"]');
    if (!og) {
      og = document.createElement("meta");
      og.setAttribute("property", "og:title");
      document.head.appendChild(og);
    }
    og.setAttribute("content", title);
  }, [categoryLabel]);

  return (
    <>
      <Header />
      <WhatsAppButton />
      <NavBar />
      <HomeButton />

      <div className={styles.produtosContainer}>
        <div className={styles.breadcrumb}>
          <span>Início → Categorias → {categoryLabel}</span>
        </div>

        <div className={styles.filtro}>
          <h1 className={styles.tituloPagina}>{categoryLabel}</h1>

          <div className={styles.ordenacao}>
            <label>Ordenar por</label>
            <select value={orderValue} onChange={(e) => setOrderValue(e.target.value)}>
              <option value="relevance">Relevância</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
            </select>
          </div>
        </div>

        <div className={styles.produtosLayout}>
          {/* FILTROS */}
          <aside className={styles.filtros}>
            <div className={styles.filtroGrupo}>
              <h4>Preço</h4>
              {priceOptions.map((opt) => (
                <label key={opt.id}>
                  <input
                    type="checkbox"
                    checked={selectedRanges.has(opt.id)}
                    onChange={() => toggleRange(opt.id)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </aside>

          {/* PRODUTOS */}
          <div className={styles.produtosPrincipal}>
            <ProductCard
              category={categoryParam}
              priceRanges={activePriceRanges}
              orderBy={orderBy}
              orderDirection={orderDirection}
              brand={["New Andrew's Suplementos"]}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
