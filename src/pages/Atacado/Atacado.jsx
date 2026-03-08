import React, { useEffect } from "react";
import styles from "./Atacado.module.css";
import Footer from "../../components/Footer/Footer.jsx";
import HomeButton from "../../components/HomeButton.jsx";
import Header from "../../components/Header/Header.jsx";
import WhatsAppButton from "../../components/WhatsappButton.jsx";

export default function Atacado() {
    // Link para WhatsApp (revenda/parceiro)
    const whatsappLink =
        "https://api.whatsapp.com/send/?phone=5521979089061&text=Ol%C3%A1%21+Tenho+interesse+em+me+tornar+revendedor+ou+parceiro+da+New+Andrew%27s+Suplementos&app_absent=0";

    // Atualiza título da página
    useEffect(() => {
        document.title = "New Andrew's | Atacado";
        let og = document.querySelector('meta[property="og:title"]');
        if (!og) {
            og = document.createElement("meta");
            og.setAttribute("property", "og:title");
            document.head.appendChild(og);
        }
        og.setAttribute("content", "New Andrew's | Atacado");
    }, []);

    return (
        <>


            <div className={styles.produtosContainer}>
                {/* Breadcrumb */}
                <div className={styles.breadcrumb}>
                    <span>Início → <a href="/atacado">Atacado</a></span>
                </div>

                {/* Conteúdo principal */}
                <div className={styles.atacadoContainer}>
                    <h1 className={styles.tituloPagina}>Atacado</h1>

                    {/* Aviso de indisponibilidade */}
                    <div className={styles.avisoIndisponivel}>
                        <span className={styles.iconeAviso}>🚧</span>
                        <h2>Página em desenvolvimento</h2>
                        <p>
                            No momento, nossa plataforma de atacado está sendo preparada
                            para oferecer a melhor experiência para você, revendedor ou parceiro.
                        </p>
                        <p>
                            Enquanto isso, se você deseja comprar por atacado ou se tornar um
                            revendedor, entre em contato conosco pelo WhatsApp:
                        </p>
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.botaoWhatsApp}
                        >
                            Falar com um consultor
                        </a>
                    </div>

                    {/* Botão de voltar */}
                    <div className={styles.botaoVoltarContainer}>
                        <button
                            onClick={() => window.history.back()}
                            className={styles.botaoVoltar}
                        >
                            ← Voltar
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
}