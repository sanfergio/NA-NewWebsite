import React, { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import styles from "./PoliticaDevolucao.module.css";
import Header from "../../components/Header/Header";
import WhatsAppButton from "../../components/WhatsappButton";
import Footer from "../../components/Footer/Footer";

export default function PoliticaDevolucao() {
  useEffect(() => {
    try {
      document.title = "New Andrew's | Política de Devolução";
    } catch (e) {
      // ambiente sem DOM: ignora
    }
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
            <button className={`${styles.btn} ${styles.back}`} onClick={handleGoBack}>
              <i className="fa fa-angle-left"></i> Voltar ao site
            </button>
          </nav>
        </header>

        <main>
          <section className={styles.card}>
            <h1>
              <i className="fa fa-exchange-alt" style={{ color: "var(--accent)" }}></i>
              Política de Troca e Devolução
            </h1>

            <p>
              A New Andrew's tem uma política de troca e devolução que visa garantir a satisfação total de seus clientes. A empresa aceita a troca ou devolução de produtos dentro do prazo de 7 dias corridos a partir da data de recebimento do pedido, conforme previsto no Código de Defesa do Consumidor.
            </p>

            <p>
              Para solicitar a troca ou devolução de um produto, o cliente deve entrar em contato com o serviço de atendimento da New Andrew's, informando o motivo da troca ou devolução e seguindo as instruções fornecidas pela empresa. O produto deve ser devolvido em sua embalagem original, sem sinais de uso ou violação do lacre original.
            </p>

            <p>
              Caso o motivo da troca ou devolução seja um defeito de fabricação, a New Andrew's se responsabiliza pelos custos de envio do produto de volta à empresa e pelo envio de um novo produto ao cliente. No entanto, se a troca ou devolução for por arrependimento ou insatisfação, os custos de envio ficam por conta do cliente.
            </p>

            <p>
              A New Andrew's reserva-se o direito de recusar a troca ou devolução de produtos que não estejam em conformidade com a política de trocas e devoluções, ou que apresentem sinais de uso ou violação do lacre original. A empresa está sempre disponível para esclarecer dúvidas e garantir a melhor experiência de compra.
            </p>

            <div className={styles.divider}>
              <button className={styles.btn} onClick={handleGoBack}>
                <i className="fa fa-angle-left"></i> Voltar ao site
              </button>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          © 2026 Produtos New Andrew's LTDA — Todos os direitos reservados.<br />
          Política de Troca e Devolução.
        </footer>
      </div>

    </>
  );
}