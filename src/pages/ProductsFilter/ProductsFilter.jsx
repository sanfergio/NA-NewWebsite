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

  // Dados completos das categorias: Nome e Benefícios
  const categoryData = {
    vitamins: {
      label: "Vitaminas",
      desc: "Essenciais para o bom funcionamento do corpo, as vitaminas fortalecem o sistema imunológico, melhoram a saúde da pele e cabelos, e auxiliam na produção de energia celular diária.",
    },
    pre_workout: {
      label: "Pré-Treino",
      desc: "Desenvolvidos para aumentar a disposição, foco mental e resistência. Ideais para superar seus limites e extrair o máximo de performance durante os exercícios físicos.",
    },
    amino_acids: {
      label: "Aminoácidos",
      desc: "Os blocos construtores das proteínas. Aceleram a recuperação muscular, previnem a perda de massa magra e são fundamentais para a hipertrofia.",
    },
    thermogenics: {
      label: "Termogênicos",
      desc: "Aceleram o metabolismo e aumentam a temperatura corporal, favorecendo a queima de gordura e transformando-a em energia explosiva para o seu dia a dia.",
    },
    personal_care: {
      label: "Cuidados Pessoais",
      desc: "Produtos formulados para o bem-estar externo e interno, promovendo saúde, higiene e beleza com a qualidade que seu corpo merece.",
    },
    oils: {
      label: "Óleos",
      desc: "Fontes de gorduras boas, como o Ômega 3. Essenciais para a saúde cardiovascular, otimização da função cerebral e controle de inflamações no organismo.",
    },
    coenzymes: {
      label: "Coenzimas",
      desc: "Poderosos antioxidantes que atuam diretamente na produção de energia das células, retardando o envelhecimento precoce e melhorando a vitalidade geral.",
    },
    female: {
      label: "Linha Feminina",
      desc: "Suplementação pensada especificamente para as necessidades do corpo feminino, auxiliando no equilíbrio hormonal, estética da pele e saúde óssea.",
    },
    masculine: {
      label: "Linha Masculina",
      desc: "Fórmulas otimizadas para o metabolismo masculino, focadas em suporte de testosterona, ganho expressivo de força, resistência e vitalidade diária.",
    },
  };

  const currentCategory = categoryData[categoryParam];
  const categoryLabel = currentCategory ? currentCategory.label : "Todas as Categorias";

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
    }, 600); // 600ms de animação fluida
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
    const title = categoryParam
      ? `New Andrew's | ${categoryLabel}`
      : "New Andrew's Suplementos | Categorias";

    document.title = title;

    let og = document.querySelector('meta[property="og:title"]');
    if (!og) {
      og = document.createElement("meta");
      og.setAttribute("property", "og:title");
      document.head.appendChild(og);
    }
    og.setAttribute("content", title);
  }, [categoryLabel, categoryParam]);

  return (
    <>
      <Header />
      <WhatsAppButton />
      <HomeButton />

      <div className={styles.produtosContainer}>
        <div className={styles.breadcrumb}>
          <span> <a href="./"> Início </a> → <a href="/categorias">Categorias</a> {categoryParam && `→ ${categoryLabel}`}</span>
        </div>

        {/* SE NÃO HOUVER PARÂMETRO NA URL, MOSTRA O GRID DE CATEGORIAS */}
        {!categoryParam ? (
          <div className={styles.todasCategoriasContainer}>
            <h1 className={styles.tituloPagina}>Nossas Categorias</h1>
            <p className={styles.subtituloPagina}>
              Encontre o suplemento ideal para o seu objetivo e transforme sua rotina com a New Andrew's.
            </p>
            <div className={styles.categoriesGrid}>
              {Object.entries(categoryData).map(([key, data]) => (
                <a href={`?categoria=${key}`} key={key} className={styles.categoryCard}>
                  <h3>{data.label}</h3>
                  <p>{data.desc}</p>
                  <span className={styles.verProdutosBtn}>Ver produtos →</span>
                </a>
              ))}
            </div>
          </div>
        ) : (
          /* SE HOUVER PARÂMETRO, MOSTRA O LAYOUT DE PRODUTOS E FILTROS */
          <>
            <div className={styles.filtro}>
              <h1 className={styles.tituloPagina}>{categoryLabel}</h1>

              <div className={styles.ordenacao}>
                <label>Ordenar por</label>
                <select value={orderValue} onChange={handleOrderChange}>
                  <option value="relevance">Relevância</option>
                  <option value="price-asc">Menor preço</option>
                  <option value="price-desc">Maior preço</option>
                </select>
              </div>
            </div>

            {/* Texto Descritivo da Categoria */}
            {currentCategory && (
              <div className={styles.categoriaDescricao}>
                <p>{currentCategory.desc}</p>
              </div>
            )}

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
                  className={`${styles.produtosWrapper} ${isSimulatingLoad ? styles.loadingAtivo : ""
                    }`}
                >
                  {isSimulatingLoad && (
                    <div className={styles.loaderSpinner}></div>
                  )}
                  <ProductCard
                    category={categoryParam}
                    priceRanges={activePriceRanges}
                    orderBy={orderBy}
                    orderDirection={orderDirection}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}