import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Objetivos.module.css";
import Footer from "../../components/Footer/Footer.jsx";
import NavBar from "../../components/Navbar/NavBar.jsx";
import HomeButton from "../../components/HomeButton.jsx";
import Header from "../../components/Header/Header.jsx";
import WhatsAppButton from "../../components/WhatsappButton.jsx";

export default function Objetivos() {
  const urlParams = new URLSearchParams(window.location.search);
  const objetivoParam = urlParams.get("objetivo");

  // Dados completos dos objetivos: Nome, Descrição e Imagem
  const objetivosData = {
    "bem-estar": {
      label: "Bem-estar",
      desc: "Produtos que promovem equilíbrio físico e mental, auxiliando no relaxamento, redução do estresse e melhora da qualidade de vida.",
      imageUrl: "https://github.com/sanfergio/NA-NewWebsite/blob/master/src/public/mock-images/bem-estar.png?raw=true"
    },
    "ganho-massa": {
      label: "Ganho de massa",
      desc: "Suplementos para potencializar o ganho de massa muscular, com proteínas, creatina e aminoácidos essenciais para a hipertrofia.",
      imageUrl: "https://github.com/sanfergio/NA-NewWebsite/blob/master/src/public/mock-images/muscular.png?raw=true"
    },
    "emagrecimento": {
      label: "Emagrecimento",
      desc: "Fórmulas que aceleram o metabolismo, controlam o apetite e auxiliam na queima de gordura de forma saudável e sustentável.",
      imageUrl: "https://github.com/sanfergio/NA-NewWebsite/blob/master/src/public/mock-images/emagrecimento.png?raw=true"
    },
    "melhor-sono": {
      label: "Melhor sono",
      desc: "Ativos que induzem o relaxamento, regulam o ciclo circadiano e promovem um sono profundo e reparador.",
      imageUrl: "https://github.com/sanfergio/NA-NewWebsite/blob/master/src/public/mock-images/sono.png?raw=true"
    },
    "libido": {
      label: "++ Libido",
      desc: "Suplementos que estimulam a libido, melhoram a performance sexual e equilibram os hormônios naturalmente.",
      imageUrl: "https://github.com/sanfergio/NA-NewWebsite/blob/master/src/public/mock-images/libido.png?raw=true"
    },
    "disposicao": {
      label: "++ Disposição",
      desc: "Energia e vitalidade para o dia a dia, com compostos que combatem o cansaço físico e mental e aumentam o foco.",
      imageUrl: "https://github.com/sanfergio/NA-NewWebsite/blob/master/src/public/mock-images/energia.png?raw=true"
    }
  };

  const currentObjetivo = objetivosData[objetivoParam];
  const objetivoLabel = currentObjetivo ? currentObjetivo.label : "Todos os Objetivos";

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
    const title = objetivoParam
      ? `New Andrew's | ${objetivoLabel}`
      : "New Andrew's Suplementos | Objetivos";

    document.title = title;

    let og = document.querySelector('meta[property="og:title"]');
    if (!og) {
      og = document.createElement("meta");
      og.setAttribute("property", "og:title");
      document.head.appendChild(og);
    }
    og.setAttribute("content", title);
  }, [objetivoLabel, objetivoParam]);

  return (
    <>
      <Header />
      <WhatsAppButton />
      <HomeButton />

      <div className={styles.produtosContainer}>
        <div className={styles.breadcrumb}>
          <span>
            <a href="./">Início</a> → <a href="/objetivos">Objetivos</a>{" "}
            {objetivoParam && `→ ${objetivoLabel}`}
          </span>
        </div>

        {/* SE NÃO HOUVER PARÂMETRO NA URL, MOSTRA O GRID DE OBJETIVOS */}
        {!objetivoParam ? (
          <div className={styles.todasCategoriasContainer}>
            <h1 className={styles.tituloPagina}>Escolha seu objetivo</h1>
            <p className={styles.subtituloPagina}>
              Selecione o que você deseja alcançar e encontre os produtos ideais para transformar seus resultados.
            </p>
            <div className={styles.categoriesGrid}>
              {Object.entries(objetivosData).map(([key, data]) => (
                <a href={`?objetivo=${key}`} key={key} className={styles.categoryCard}>
                  <img
                    src={data.imageUrl}
                    alt={data.label}
                    style={{ width: "100%", maxHeight: "150px", objectFit: "contain", marginBottom: "15px" }}
                  />
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
              <h1 className={styles.tituloPagina}>{objetivoLabel}</h1>

              <div className={styles.ordenacao}>
                <label>Ordenar por</label>
                <select value={orderValue} onChange={handleOrderChange}>
                  <option value="relevance">Relevância</option>
                  <option value="price-asc">Menor preço</option>
                  <option value="price-desc">Maior preço</option>
                </select>
              </div>
            </div>

            {/* Texto Descritivo do Objetivo */}
            {currentObjetivo && (
              <div className={styles.categoriaDescricao}>
                <p>{currentObjetivo.desc}</p>
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
                  className={`${styles.produtosWrapper} ${
                    isSimulatingLoad ? styles.loadingAtivo : ""
                  }`}
                >
                  {isSimulatingLoad && (
                    <div className={styles.loaderSpinner}></div>
                  )}
                  <ProductCard
                    // objetivo={objetivoParam} // adapte conforme a prop esperada pelo seu ProductCard
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