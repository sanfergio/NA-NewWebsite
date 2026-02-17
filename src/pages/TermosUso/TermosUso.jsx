import React, { useEffect } from "react";
import styles from "./TermosUso.module.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import WhatsAppButton from "../../components/WhatsappButton";

export default function TermosUso() {
    useEffect(() => {
        try {
            document.title = "New Andrew's | Termos de Uso";
        } catch (e) {
            // ambiente sem DOM: ignora
        }
    }, []);

    const handleGoBack = () => {
        window.history.back();
    };

    const terms = [
        {
            title: "Termos Gerais",
            content: "Ao acessar o website da Produtos New Andrew's LTDA, você concorda em cumprir e estar vinculado a estes Termos de Uso e a todas as leis e regulamentos aplicáveis. Se você não concordar com qualquer um destes termos, está proibido de usar ou acessar este site. O conteúdo e os materiais contidos neste website são protegidos por leis de direitos autorais e marcas comerciais. Estes Termos de Uso são aplicáveis a todos os usuários do site e a qualquer pessoa que interaja com nossos serviços digitais. A New Andrew's reserva-se o direito de modificar estes termos a qualquer momento, sem aviso prévio.",
        },
        {
            title: "Uso de Licença",
            content: "É concedida a permissão para baixar temporariamente uma cópia dos materiais informativos, como textos, imagens de produtos e descrições, no website da New Andrew's, exclusivamente para visualização transitória e não comercial. Esta é a concessão de uma licença, e não uma transferência de título, e sob esta licença você não pode: modificar ou copiar os materiais para redistribuição pública; usar os materiais para qualquer finalidade comercial; tentar descompilar ou fazer engenharia reversa de qualquer software contido no site; remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou transferir os materiais para outra pessoa ou 'espelhar' os materiais em qualquer outro servidor. Esta licença será automaticamente rescindida se você violar qualquer uma dessas restrições.",
        },
        {
            title: "Isenção de Responsabilidade",
            content: "Os materiais no website da New Andrew's são fornecidos 'como estão', sem garantias explícitas ou implícitas de qualquer tipo. A New Andrew's não garante ou faz representações relativas à precisão, resultados prováveis ou confiabilidade do uso dos materiais em seu site ou de outra forma relacionados a esses materiais ou em quaisquer sites vinculados a este. Não garantimos que o site operará sem interrupções ou erros, ou que quaisquer defeitos serão corrigidos, embora nos esforcemos para manter a melhor experiência de navegação possível. As informações sobre suplementos e produtos são fornecidas para fins informativos e não substituem orientação médica profissional.",
        },
        {
            title: "Limitações de Responsabilidade",
            content: "Em nenhuma circunstância a Produtos New Andrew's LTDA ou seus fornecedores serão responsáveis por quaisquer danos, incluindo, sem limitação, danos por perda de dados ou lucros, ou devido à interrupção dos negócios, decorrentes do uso ou da incapacidade de usar os materiais no website da New Andrew's. Isso se aplica mesmo que a New Andrew's ou um representante autorizado tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas ou limitações de responsabilidade por danos consequenciais ou incidentais, estas limitações podem não se aplicar a você.",
        },
        {
            title: "Precisão dos Materiais",
            content: "Os materiais que aparecem no website da New Andrew's podem incluir erros técnicos, tipográficos ou fotográficos. A New Andrew's não garante que qualquer material em seu website seja preciso, completo ou atual. Poderemos fazer alterações nos materiais contidos no site a qualquer momento, sem aviso prévio. Não assumimos, no entanto, qualquer compromisso de atualizar os materiais. A descrição dos produtos suplementares, suas composições e aplicações são fornecidas com a maior precisão possível, mas o usuário final deve sempre consultar um profissional de saúde antes de iniciar qualquer suplementação.",
        },
        {
            title: "Links para Sites Externos",
            content: "A New Andrew's não revisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por parte da New Andrew's do site em questão. O uso de qualquer site vinculado é por conta e risco do próprio usuário. É importante notar que sites externos podem ter termos de uso e políticas de privacidade diferentes das nossas. Isso inclui links para plataformas de pagamento como Vindi e Yapay, e serviços de entrega como os Correios.",
        },
        {
            title: "Propriedade Intelectual",
            content: "Todo o conteúdo presente no site da New Andrew's, incluindo logotipos, textos, imagens, vídeos e layout, é de propriedade exclusiva da Produtos New Andrew's LTDA ou de seus parceiros licenciados, sendo protegido pelas leis de direitos autorais e propriedade intelectual. É proibida a reprodução, distribuição ou uso não autorizado deste conteúdo sem prévia autorização por escrito da empresa.",
        },
        {
            title: "Produtos e Suplementação",
            content: "Os produtos comercializados pela New Andrew's são suplementos alimentares e não substituem uma alimentação equilibrada e hábitos de vida saudáveis. Os resultados podem variar de pessoa para pessoa. As informações fornecidas em nosso site sobre os produtos têm caráter meramente informativo e não constituem prescrição médica. Consulte sempre um médico ou nutricionista antes de iniciar o uso de qualquer suplemento.",
        },
        {
            title: "Privacidade e Dados Pessoais",
            content: "A New Andrew's está comprometida com a proteção dos seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD). Ao utilizar nosso site, você concorda com a coleta e tratamento de suas informações conforme descrito em nossa Política de Privacidade. Utilizamos criptografia SSL para proteger seus dados durante a navegação e transações.",
        },
        {
            title: "Lei Aplicável e Foro",
            content: "Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa decorrente destes termos ou do uso do site da New Andrew's será submetida ao foro da comarca de São Gonçalo, Rio de Janeiro, com exclusão de qualquer outro, por mais privilegiado que seja.",
        },
    ];

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

                <main className={styles.termosContainer}>
                    <section className={styles.card}>
                        <h1>
                            <i className="fa fa-file-contract" style={{ color: "var(--accent)" }}></i>
                            Termos de Uso
                        </h1>

                        <p className={styles.muted} style={{ marginBottom: "24px" }}>
                            Última atualização: Fevereiro de 2025
                        </p>

                        <ol className={styles.termosLista}>
                            {terms.map((term, index) => (
                                <li key={index} className={styles.termoItem}>
                                    <span className={styles.termoNumero}>{index + 1}.</span>
                                    <div className={styles.termoTextos}>
                                        <h2 className={styles.termoSubtitulo}>{term.title}</h2>
                                        <p className={styles.termoDescricao}>{term.content}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>

                        <div className={styles.divider}>
                            <button className={styles.btn} onClick={handleGoBack}>
                                <i className="fa fa-angle-left"></i> Voltar ao site
                            </button>
                        </div>
                    </section>
                </main>

                <footer className={styles.footer}>
                    © 2026 Produtos New Andrew's LTDA — Todos os direitos reservados.<br />
                    CNPJ: 04.998.500/0001-15 | Av. Pres. Roosevelt, 2248 - Marambaia, São Gonçalo - RJ
                </footer>
            </div>

        </>
    );
}