import React, { useEffect } from "react";
import { Shield } from "lucide-react";
import styles from "./PoliticaPrivacidade.module.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import WhatsAppButton from "../../components/WhatsappButton";

export default function PoliticaPrivacidade() {
  useEffect(() => {
    try {
      document.title = "New Andrew's | Política de Privacidade";
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
              <i className="fa fa-shield-alt" style={{ color: "var(--accent)" }}></i>
              Segurança e Privacidade
            </h1>

            <p>
              A segurança dos dados e a privacidade dos clientes são prioridades fundamentais para a New Andrew's
              Suplementos. Empregamos as mais avançadas medidas de segurança para proteger as informações pessoais dos
              clientes, garantindo que sejam mantidas em total confidencialidade.
            </p>

            <p>
              No que diz respeito ao nosso site, todas as transações são protegidas por criptografia <strong>SSL (Secure
              Sockets Layer)</strong>, que garante a segurança dos dados transmitidos entre o seu navegador e nossos
              servidores. Além disso, adotamos políticas rígidas de privacidade, assegurando que suas informações sejam
              utilizadas apenas para os fins para os quais foram fornecidas, como processamento de pedidos e comunicação
              sobre produtos e serviços.
            </p>

            <p>
              A empresa também está em total conformidade com as leis e regulamentações de proteção de dados vigentes,
              incluindo a LGPD (Lei Geral de Proteção de Dados), garantindo que seus dados sejam tratados com o máximo de
              cuidado e respeito. Realizamos auditorias regulares em nossos sistemas e processos para garantir a segurança e
              a integridade de todas as informações.
            </p>

            <p>
              Em suma, a New Andrew's Suplementos está comprometida em garantir um ambiente online seguro, adotando as
              melhores práticas e tecnologias disponíveis no mercado para proteger seus dados e sua privacidade.
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
          Política de Segurança e Privacidade.
        </footer>
      </div>
    </>
  );
}