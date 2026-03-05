import React from 'react';
import styles from './ReclameAquiSection.module.css';

const ReclameAquiSection = () => {
    const reclameAquiUrl = "https://www.reclameaqui.com.br/empresa/produtos-new-andrews/";

    // Dados mockados de avaliações para preencher os cards
    const reviews = [
        {
            id: 1,
            title: "Ótimo atendimento e produto",
            text: "Tive uma dúvida sobre o produto e fui prontamente atendido. A entrega foi super rápida e o material é de altíssima qualidade. Recomendo a New Andrews!",
            author: "São Paulo, SP",
            date: "Há 2 dias",
            status: "Respondida"
        },
        {
            id: 2,
            title: "Problema resolvido rapidamente",
            text: "Meu pedido veio com um pequeno atraso por conta da transportadora, mas a equipe da New Andrews me deu todo o suporte até a encomenda chegar na minha porta.",
            author: "Rio de Janeiro, RJ",
            date: "Há 1 semana",
            status: "Resolvido"
        },
        {
            id: 3,
            title: "Transparência total",
            text: "Gosto de comprar de empresas que respeitam o consumidor. Deixei um feedback de melhoria e eles não só me ouviram como me ligaram para agradecer.",
            author: "Curitiba, PR",
            date: "Há 2 semanas",
            status: "Respondida"
        }
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>

                {/* Cabeçalho */}
                <div className={styles.header}>
                    {/* Usando uma imagem genérica ou logo oficial se você tiver. Aqui é um SVG inline simulando o logo */}
                    <svg className={styles.raLogo} viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <text x="0" y="35" fontFamily="Arial" fontSize="30" fontWeight="bold" fill="#00a459">Reclame</text>
                        <text x="125" y="35" fontFamily="Arial" fontSize="30" fontWeight="bold" fill="#333">AQUI</text>
                    </svg>

                    <div className={styles.titleWrapper}>
                        <h2 className={styles.title}>Avalie a New Andrew's!</h2>
                        <div className={styles.raSeal}>
                            <span>★</span> RA1000
                        </div>
                    </div>
                    <p className={styles.subtitle}>
                        A transparência e o respeito ao consumidor são nossos maiores pilares.
                        Confira o que nossos clientes dizem sobre nós.
                    </p>
                </div>

                {/* Grid de Avaliações */}
                <div className={styles.cardsGrid}>
                    {reviews.map((review) => (
                        <div key={review.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.stars}>★★★★★</div>
                                <span className={styles.status}>{review.status}</span>
                            </div>
                            <h3 className={styles.cardTitle}>{review.title}</h3>
                            <p className={styles.cardText}>"{review.text}"</p>
                            <div className={styles.cardFooter}>
                                <span>{review.author}</span>
                                <span>{review.date}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className={styles.actions}>
                    <a
                        href={reclameAquiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.btnPrimary}
                    >
                        Ver todas as avaliações no RA
                    </a>
                    <a
                        href={`${reclameAquiUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.btnSecondary}
                    >
                        Deixe seu feedback
                    </a>
                </div>

            </div>
        </section>
    );
};

export default ReclameAquiSection;