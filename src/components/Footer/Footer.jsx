import { Mail, Phone, Clock, Instagram, Facebook, CreditCard, Youtube } from "lucide-react"
import { SiPix, SiVisa, SiMastercard, SiAmericanexpress } from "react-icons/si";


import styles from "./Footer.module.css"

export default function Footer() {
  return (

    <footer className={styles.footerContainer}>

      <div className={styles.newsletter}>
        <img
          src="https://newandrews.com.br/image-andrews/logo2_icon.png"
          alt="Logo do rodapé"
          className={styles.newsletterLogo}
        />
        <h6 style={{ fontSize: '90%' }}>RECEBA NOSSAS NOVIDADES!</h6>
        <div className={styles.newsletterInput}>
          <input type="email" placeholder="Digite seu email" />
          <button aria-label="enviar">➤</button>
        </div>
      </div>

      <div className={styles.footerMain}>
        <div className={styles.footerGrid}>

          <div>
            <h6 className={styles.footerHeading}>Central de Acesso</h6>
            <div className={styles.footerLinks}>
              <a href="/quem-somos">Sobre a New Andrew's</a>
              <a target="_blank" href="https://api.whatsapp.com/send/?phone=5521972074398&text=Ol%C3%A1%21+Vim+pelo+website+e+desejo+tirar+d%C3%BAvidas.&type=phone_number&app_absent=0">Entre em Contato</a>
              <a href="/termo-de-uso">Termos de Uso</a>
              <a href="/politica-privacidade">Política de Privacidade</a>
              <a href="/politica-devolucao">Política de Troca/Devolução</a>
              <a href="/formas-pagamento">Formas de Pagamento</a>
              <a href="/politica-envio">Política de Envio e Entrega</a>
            </div>
          </div>

          <div>
            <h6 className={styles.footerHeading}>Contato</h6>
            <div className={styles.footerContact}>
              <p><Phone size={18} color="#000000" /> (21) 97207-4398</p>
              <p><Clock size={18} color="#000000" /> Segunda a Sexta-feira das <br /> 09:00 às 18:00 </p>
              <p><Mail size={18} color="#000000" /> atendimento@newandrews.com.br </p>
            </div>
          </div>

          <div>
            <div className={styles.footerSocial}>
              <h6 className={styles.footerHeading}>Nossas Redes</h6>
              <div className={styles.footerIcons}>
                <a target="_blank" href="https://www.instagram.com/newandrewssuplementoss/" aria-label="Instagram"><Instagram size={20} /></a>
                <a target="_blank" href="https://www.facebook.com/people/Produtos-New-Andrews-LTDA/61560718401370/" aria-label="Facebook"><Facebook size={20} /></a>
                <a target="_blank" href="https://api.whatsapp.com/send/?phone=5521972074398&text=Ol%C3%A1%21+Vim+pelo+website+e+desejo+tirar+d%C3%BAvidas.&type=phone_number&app_absent=0" aria-label="WhatsApp"><Phone size={20} /></a>
                <a target="_blank" href="https://www.youtube.com/@newandrewssuplementoss" aria-label="YouTube"><Youtube size={20} /></a>
                {/* <a target="_blank" href="https://www.tiktok.com/@newandrewssuplementos" aria-label="TikTok"><FaTiktok size={20} /></a> */}
              </div>
            </div>

            <div>
              <h6 className={styles.footerHeading}>Formas de pagamento</h6>
              <div className={`${styles.footerPayments} flex gap-3 items-center`}>
                {/* Pix */}
                <div className={styles.paymentItem}>
                  <SiPix color="#32BCAD" size={28} className="payment-icon" title="Pix" />
                </div>

                {/* Visa */}
                <div className={styles.paymentItem}>
                  <SiVisa color="#1A1F71" size={28} className="payment-icon" title="Visa" />
                </div>

                {/* Mastercard */}
                <div className={styles.paymentItem}>
                  <SiMastercard color="#EB001B" size={28} className="payment-icon" title="Mastercard" />
                </div>

                {/* Elo (não tem ícone na lib) */}
                <div className={styles.paymentItem}>
                  <span
                    className="payment-icon font-bold"
                    style={{ color: "#FFCB05" }}
                    title="Elo"
                  >
                    ELO
                  </span>
                </div>

                {/* Hipercard (não tem ícone na lib) */}
                <div className={styles.paymentItem}>
                  <span
                    className="payment-icon font-bold"
                    style={{ color: "#B20838" }}
                    title="Hipercard"
                  >
                    HIPERCARD
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.followRow}>
        <div className={styles.followContent}>
          <div className={styles.followLeft}>

            <h6 className={styles.followTitle}>Siga-nos</h6>

            <div className={styles.socialInline}>
              <a target="_blank" href="https://www.instagram.com/newandrewssuplementoss/" aria-label="Instagram"><Instagram size={20} /></a>
              <a target="_blank" href="https://www.facebook.com/people/Produtos-New-Andrews-LTDA/61560718401370/" aria-label="Facebook"><Facebook size={20} /></a>
              <a target="_blank" href="https://api.whatsapp.com/send/?phone=5521972074398&text=Ol%C3%A1%21+Vim+pelo+website+e+desejo+tirar+d%C3%BAvidas.&type=phone_number&app_absent=0" aria-label="WhatsApp"><Phone size={20} /></a>
              <a target="_blank" href="https://www.youtube.com/@newandrewssuplementoss" aria-label="YouTube"><Youtube size={20} /></a>
              {/* <a target="_blank" href="https://www.tiktok.com/@newandrewssuplementos" aria-label="TikTok"><FaTiktok size={20} /></a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}