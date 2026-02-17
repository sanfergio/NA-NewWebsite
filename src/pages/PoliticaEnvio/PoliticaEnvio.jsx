import React, { useEffect } from "react";
import { Truck } from "lucide-react";
import styles from "./PoliticaEnvio.module.css";
import Header from "../../components/Header/Header";
import WhatsAppButton from "../../components/WhatsappButton";
import Footer from "../../components/Footer/Footer";

export default function PoliticaEnvio() {
    useEffect(() => {
        try {
            document.title = "New Andrew's | Política de Envio e Entrega";
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
                            <i className="fa fa-truck" style={{ color: "var(--accent)" }}></i>
                            Frete e Entrega
                            <img
                                src="https://logodownload.org/wp-content/uploads/2014/05/correios-logo-0.png"
                                className={styles.correiosLogo}
                                alt="Correios"
                            />
                        </h1>

                        <p>
                            A New Andrew's oferece aos seus clientes o serviço de entrega em parceria com os <strong>Correios do Brasil</strong>. Essa parceria garante uma entrega rápida e segura dos produtos para todo o território nacional, com a confiabilidade e a eficiência que são características dos Correios.
                        </p>

                        <p>
                            Os clientes podem escolher entre diferentes opções de frete oferecidas pelos Correios, de acordo com a necessidade e urgência. O prazo de entrega e o valor do frete variam dependendo do local de entrega e do peso do produto, sendo calculados automaticamente no momento da compra.
                        </p>

                        <p>
                            Além disso, a New Andrew's oferece rastreamento do pedido, para que os clientes possam acompanhar o status da entrega e ter uma estimativa precisa do prazo. Essa transparência contribui para a tranquilidade e confiança dos clientes na empresa.
                        </p>

                        <p>
                            Com a parceria com os Correios do Brasil, a New Andrew's reafirma seu compromisso em oferecer um serviço de entrega de qualidade e confiável, garantindo a satisfação e a fidelidade de seus clientes.
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
                    Política de Frete e Entrega.
                </footer>
            </div>

        </>
    );
}