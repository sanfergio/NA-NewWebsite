import Footer from '../../components/Footer/Footer.jsx';
import '../../App.css';
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { FaMotorcycle, FaCampground } from "react-icons/fa";
import NavBar from '../../components/Navbar/NavBar.jsx';
import Categories from '../../components/Categorias/Categorias.jsx';
import Categories2 from '../../components/Categorias2/Categorias.jsx';
import Carousel from '../../components/Carousel/Carousel.jsx';
import styles from './Home.module.css';
import HomeButton from '../../components/HomeButton.jsx';
import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header.jsx';
import WhatsAppButton from '../../components/WhatsappButton.jsx';
import AllProductsList from '../../components/AllProductsList/AllProductsList.jsx';

function Home() {
    return (
        <>
            {/* Cabeçalho principal do site */}
            <Header />
            <WhatsAppButton />
            <HomeButton />
            <NavBar />

            {/* Conteúdo principal da página */}
            <main className={styles.main} role="main" aria-label="Página inicial da BrasMérica Moto Peças">

                {/* Carrossel principal */}
                <section className={styles.carousel} aria-label="Carrossel de destaques">
                    <Carousel />
                </section>

                {/* Seção da marca */}
                <section className={styles.brandSection} aria-label="Apresentação da marca BrasMérica">
                    <h1 className={styles.brandTitle} title="BrasMérica Moto Peças">
                        <img src="https://newandrews.com.br/image-andrews/logo2_icon.png" alt="" />
                        <span className={styles.brandPartGreen}>NEW<span className={styles.brandPartGradient}>ANDREW'S</span></span>
                    </h1>

                    <h2 className={styles.sloganSubtitle}>
                        <strong>Suplementos para a vida!</strong>
                    </h2>
                </section>

                {/* Mais vendidos */}
                <section aria-labelledby="mais-vendidos-titulo">
                    <h3 id="mais-vendidos-titulo" style={{ color: '#000000', fontSize: '25px' }}>
                        MAIS VENDIDOS
                    </h3>
                    <div className={styles.productCards}>
                        <ProductCard
                            limit={8}
                            orderBy="varejo_value"
                            orderDirection="desc"
                        />
                    </div>
                </section>

                {/* Marca de confiança */}
                <section aria-labelledby="marca-confianca-titulo">
                    <h3 id="marca-confianca-titulo" style={{ color: '#000000', fontSize: '25px', textAlign: 'center' }}>
                        QUAL O SEU OBJETIVO?
                    </h3>
                    <br />
                    <Categories2 />
                    <br />
                </section>

                {/* Categorias */}
                <section aria-labelledby="categorias-titulo">
                    <h3 id="categorias-titulo" style={{ color: '#000000', fontSize: '25px', textAlign: 'center' }}>
                        CATEGORIAS DISPONÍVEIS
                    </h3>
                    <div className="categories-section">
                        <Categories />
                    </div>
                </section>


                {/* Novidades */}
                <section aria-labelledby="novidades-titulo">
                    <h3 id="novidades-titulo" style={{ color: '#000000', fontSize: '25px' }}>
                        NOSSOS KITS
                    </h3>
                    <div className={styles.productCards}>
                        <ProductCard orderBy="id" limit={8} orderDirection="desc" />
                    </div>
                </section>


            </main>

            {/* Listagem de todos os produtos */}
            <AllProductsList />

            {/* Rodapé */}
            <Footer />
        </>
    );
}

export default Home;
