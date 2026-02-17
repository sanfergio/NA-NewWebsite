import React, { useEffect } from "react";
import styles from "./QuemSomos.module.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import WhatsAppButton from "../../components/WhatsappButton";

export default function QuemSomos() {

  useEffect(() => {
    try {
      document.title = "New Andrew's | Quem Somos";
    } catch (e) {
      // ambiente sem DOM: ignora
    }
  }, []);

  useEffect(() => {
    // Smooth scroll para links internos
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    // Cleanup
    return () => {
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <WhatsAppButton />

      <div className={styles.wrap}>
        <header className={styles.header}>
          <div className={styles.brand}>
            <img
              src="https://newandrews.com.br/image-andrews/logo_three.png"
              alt="New Andrew's - logo"
            />
            <div>
              <h2>Produtos New Andrew's LTDA</h2>
              <div className={styles.muted} style={{ fontSize: "0.85rem" }}>
                Qualidade • Transparência • Inovação
              </div>
            </div>
          </div>

          <nav className={styles.nav}>
            <a className={styles.btn} href="#contato">
              <i className="fa fa-phone"></i> Contato
            </a>
            <a className={`${styles.btn} ${styles.secondary}`} href="#credenciais">
              Credenciais
            </a>
            <button className={`${styles.btn} ${styles.back}`} onClick={handleGoBack}>
              Voltar
            </button>
          </nav>
        </header>

        {/* HERO / Apresentação */}
        <section className={styles.hero}>
          <article className={styles.heroCard}>
            <div className={styles.eyebrow}>Somos New Andrew's</div>
            <h1 className={styles.headline}>
              Suplementos com responsabilidade técnica e foco em resultados
            </h1>
            <p className={styles.lead}>
              A New Andrew's é uma empresa brasileira com atuação consolidada no mercado de suplementos. Nossa
              missão é entregar produtos seguros, eficazes e desenvolvidos com transparência, sempre com foco no bem-estar
              do cliente e no respeito às normas sanitárias.
            </p>

            <div className={styles.flexRow}>
              <a className={styles.btn} href="#contato">
                <i className="fa fa-envelope"></i> Fale conosco
              </a>
              <a
                className={`${styles.btn} ${styles.secondary}`}
                href="https://www.reclameaqui.com.br/empresa/produtos-new-andrews/sobre/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Perfil no Reclame Aqui <i className="fa fa-external-link-alt" style={{ marginLeft: "8px", fontSize: "0.8rem" }}></i>
              </a>
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <i className="fa fa-award"></i>
                <div>
                  <strong>Confiança e experiência</strong>
                  <small>Atuando desde 2002 — compromisso com consistência e evolução contínua.</small>
                </div>
              </div>

              <div className={styles.stat}>
                <i className="fa fa-headset"></i>
                <div>
                  <strong>Atendimento ativo</strong>
                  <small>Nos últimos 6 meses: 100% das reclamações respondidas e resolvidas (Relatório público em plataformas de atendimento).</small>
                </div>
              </div>

              <div className={styles.stat}>
                <i className="fa fa-leaf"></i>
                <div>
                  <strong>Sustentabilidade</strong>
                  <small>Práticas responsáveis na seleção de fornecedores e cuidado com embalagens.</small>
                </div>
              </div>
            </div>
          </article>

          {/* Credenciais rápidas */}
          <aside className={styles.card}>
            <h3>Dados oficiais</h3>
            <div className={styles.credentials}>
              <div className={styles.credRow}>
                <div className={styles.credLeft}>Razão social</div>
                <div className={styles.credRight}>Produtos New Andrew's Ltda</div>
              </div>

              <div className={styles.credRow}>
                <div className={styles.credLeft}>CNPJ</div>
                <div className={styles.credRight}>04.998.500/0001-15</div>
              </div>

              <div className={styles.credRow}>
                <div className={styles.credLeft}>Endereço</div>
                <div className={styles.credRight}>Av. Pres. Roosevelt, 2248 - Marambaia, São Gonçalo - RJ, 24723-100</div>
              </div>

              <div className={styles.credRow}>
                <div className={styles.credLeft}>Contato</div>
                <div className={styles.credRight}>+55 (21) 97207-4398 • atendimento@newandrews.com.br</div>
              </div>

              <div className={styles.credRow}>
                <div className={styles.credLeft}>Reclame Aqui</div>
                <div className={styles.credRight}>Perfil ativo e com Selo RA — 100% das reclamações respondidas e resolvidas (últimos 6 meses)</div>
              </div>
            </div>

            <div style={{ marginTop: "14px" }}>
              <div className={styles.note}>
                Observação: as informações apresentadas são resultado de pesquisa pública disponível em plataformas
                comerciais e de avaliação. A empresa está empenhada em manter registros, cadastros e notificações
                regulatórias atualizados.
              </div>
            </div>
          </aside>
        </section>

        {/* Grid com conteúdo detalhado */}
        <section className={styles.grid}>
          <div className={styles.card}>
            <h3>Quem somos — visão & princípios</h3>
            <p>
              Na New Andrew's, acreditamos que <strong>qualidade e transparência</strong> andam juntas. Nossos produtos são
              pensados para gerar benefícios reais, com formulações responsáveis e fornecedores auditados. Trabalhamos com
              processos que privilegiam a segurança do consumidor, a sustentabilidade e o desenvolvimento contínuo de
              soluções nutricionais.
            </p>

            <h4 style={{ marginTop: "14px" }}>Princípios que nos guiam</h4>
            <ul className={styles.list}>
              <li><strong>Transparência</strong>: disponibilizamos dados e canais de atendimento abertos para diálogo.</li>
              <li><strong>Qualidade</strong>: controle rigoroso em todas as etapas de produção e análise.</li>
              <li><strong>Cliente em primeiro lugar</strong>: respostas ágeis e postura proativa na solução de problemas.</li>
              <li><strong>Sustentabilidade</strong>: buscamos reduzir impactos e melhorar a cadeia de valor.</li>
              <li><strong>Ética e conformidade</strong>: atuação dentro dos marcos legais e regulatórios do setor.</li>
            </ul>

            <h4 style={{ marginTop: "14px" }}>Transparência sobre conformidade regulatória</h4>
            <p className={styles.muted}>
              Buscamos manter todos os cadastros e notificações exigidos pelas autoridades sanitárias e
              regulatórias. Em nossas comunicações institucionais incluímos, sempre que aplicável, os números de registro
              ANVISA ou notificações de produtos para garantir rastreabilidade e segurança.
            </p>
          </div>

          <aside className={styles.card} id="credenciais">
            <h3>Credenciais & conformidade</h3>
            <p className={styles.muted}>
              Abaixo estão os dados oficiais e informações públicas encontradas em fontes de consulta:
            </p>

            <div style={{ marginTop: "10px" }}>
              <div className={styles.flexCol}>
                <div className={styles.infoBox}>
                  <strong>CNPJ</strong>
                  <div className={styles.muted}>04.998.500/0001-15</div>
                </div>

                <div className={styles.infoBox}>
                  <strong>Endereço</strong>
                  <div className={styles.muted}>Av. Pres. Roosevelt, 2248 - Marambaia, São Gonçalo - RJ, 24723-100</div>
                </div>

                <div className={styles.infoBox}>
                  <strong>Reclame Aqui</strong>
                  <div className={styles.muted}>
                    Perfil ativo e com Selo RA — 100% das reclamações respondidas e resolvidas (últimos 6 meses). Tempo
                    médio de resposta informado: ~14 horas.
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* Contato / mapa / CTA */}
        <section style={{ marginTop: "28px" }} id="contato">
          <div className={styles.card}>
            <h3>Contato & localização</h3>
            <p className={styles.muted}>
              Para dúvidas comerciais, pedidos de certificações ou solicitações institucionais, utilize os
              canais oficiais abaixo.
            </p>

            <div className={styles.flexRow} style={{ marginTop: "12px" }}>
              <div className={styles.contactItem}>
                <strong>Telefone</strong>
                <div className={styles.muted}>+55 (21) 97207-4398</div>
              </div>

              <div className={styles.contactItem}>
                <strong>E‑mail</strong>
                <div className={styles.muted}>atendimento@newandrews.com.br</div>
              </div>

              <div className={styles.contactItem}>
                <strong>Endereço</strong>
                <div className={styles.muted}>Av. Pres. Roosevelt, 2248 - Marambaia, São Gonçalo - RJ, 24723-100</div>
              </div>
            </div>

            <div style={{ marginTop: "14px" }}>
              <a
                className={styles.btn}
                href="https://www.google.com/maps/dir//Av.+Pres.+Roosevelt,+2248+-+Marambaia,+S%C3%A3o+Gon%C3%A7alo+-+RJ,+24723-100/@-22.7924392,-43.0276972,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x999500110a9993:0xdc27f02c06622d3c!2m2!1d-42.9452956!2d-22.7924604?entry=ttu&g_ep=EgoyMDI1MTAxMy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver no Google Maps
              </a>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          © 2026 Produtos New Andrew's LTDA — Todos os direitos reservados.<br />
          Documento preparado para uso institucional | Dados coletados de fontes públicas e plataformas de avaliação.
        </footer>
      </div>

    </>
  );
}