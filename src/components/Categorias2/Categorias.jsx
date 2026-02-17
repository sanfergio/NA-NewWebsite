import React from 'react';
import styles from './Categorias.module.css';

// 1. Defina seus dados (Array de Objetos JS)
const categoryData = [
    {
        name: "Bem-estar",
        imageUrl: "https://images.newandrews.com/assets/bem-estar-DnjxsNYc.png",
        url: '/objetivos?objetivo=bem-estar'
    },
    {
        name: "Ganho de massa",
        imageUrl: "https://images.newandrews.com/assets/musculo.png",
        url: '/objetivos?objetivo=ganho-massa'
    },

    {
        name: "Emagrecimento",
        imageUrl: "https://images.newandrews.com/assets/emagrecimento.png",
        url: '/objetivos?objetivo=emagrecimento'
    },
    {
        name: "Melhor sono",
        imageUrl: "https://images.newandrews.com/assets/sono.png",
        url: '/objetivos?objetivo=melhor-sono'
    },
    {
        name: "++ Libido",
        imageUrl: "https://images.newandrews.com/assets/libido.png",
        url: '/objetivos?objetivo=libido'
    },
    {
        name: "++ Disposição",
        imageUrl: "https://images.newandrews.com/assets/energia.png",
        url: '/objetivos?objetivo=disposicao'
    },

];

function Categories2() {
    return (
        <div className={styles.categories}>
            {/* 2. Use o método .map() para iterar sobre os dados */}
            {categoryData.map((category) => (
                // 3. Renderize um 'category-item' para cada objeto
                // A prop 'key' é essencial no React para listas!
                <a href={category.url} key={category.name} className={styles.categoryItem}>
                    <img src={category.imageUrl} alt={`Imagem da categoria ${category.name}`} />
                    <h4>{category.name}</h4>
                </a>
            ))}
        </div>
    );
}

export default Categories2;