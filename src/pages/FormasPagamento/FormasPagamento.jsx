import React, { useEffect } from "react";
import { CreditCard } from "lucide-react";
import styles from "./FormasPagamento.module.css";
import Header from "../../components/Header/Header";
import WhatsAppButton from "../../components/WhatsappButton";
import Footer from "../../components/Footer/Footer";

export default function FormasPagamento() {
  useEffect(() => {
    try {
      document.title = "New Andrew's | Formas de Pagamento";
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
              <i className="fa fa-credit-card" style={{ color: "var(--accent)" }}></i>
              Formas de Pagamento
            </h1>

            <p>
              A New Andrew's Suplementos utiliza a plataforma <strong>Vindi</strong> em parceria com a <strong>Yapay</strong> para processar todos os pagamentos de forma segura e transparente. Nosso objetivo é oferecer métodos confiáveis e convenientes para que você possa finalizar suas compras com total tranquilidade.
            </p>

            <p>
              As transações realizadas no site são protegidas com criptografia avançada, garantindo que os dados financeiros dos clientes, como informações de cartão de crédito ou débito, permaneçam totalmente seguros. Além disso, seguimos rigorosamente as normas de segurança e conformidade de pagamentos online.
            </p>

            <p>
              O Vindi com Yapay permite diversas formas de pagamento, incluindo cartões de crédito, cartões de débito, PIX e boletos bancários. Também oferecemos recursos de parcelamento seguro, mantendo sempre a transparência e a confiabilidade para o cliente.
            </p>

            <p>
              Ao escolher qualquer método de pagamento disponível, você tem a garantia de que suas informações são tratadas com sigilo e responsabilidade, assegurando uma experiência de compra segura, prática e eficiente.
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
          Política de Pagamento.
        </footer>
      </div>

    </>
  );
}