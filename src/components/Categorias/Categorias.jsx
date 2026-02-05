import styles from "./Categorias.module.css";

const categorias = [
    {
        href: "/categorias?categoria=termogenicos/",
        icon: "fa-fire",
        title: "Termogênicos",
        img: "https://newandrews.com.br/image-andrews/cards/Termogenicos.png",
    },
    {
        href: "/categorias?categoria=aminoacidos/",
        icon: "fa-flask",
        title: "Aminoácidos",
        img: "https://newandrews.com.br/image-andrews/cards/Aminoacidos.png",
    },
    {
        href: "/categorias?categoria=xaropes/",
        icon: "fa-coffee",
        title: "Xaropes <br /> e Chás",
        img: "https://newandrews.com.br/image-andrews/cards/Xaropes.png",
    },
    {
        href: "/categorias?categoria=produtos-masculinos/",
        icon: "fa-mars-stroke",
        title: "Produtos <br /> Masculinos",
        img: "https://newandrews.com.br/image-andrews/cards/Masculinos.png",
    },
    {
        href: "/categorias?categoria=vitaminas/",
        icon: "fa-capsules",
        title: "Vitaminas",
        img: "https://newandrews.com.br/image-andrews/cards/Vitaminas.png",
    },
    {
        href: "/categorias?categoria=pre-treinos/",
        icon: "fa-bolt",
        title: "Pré-Treinos",
        img: "https://newandrews.com.br/image-andrews/cards/Pre-Treinos.png",
    },
    {
        href: "/categorias?categoria=oleos/",
        icon: "fa-tint",
        title: "Óleos",
        img: "https://newandrews.com.br/image-andrews/cards/Oleos.png",
    },
    {
        href: "/categorias?categoria=produtos-femininos/",
        icon: "fa-venus",
        title: "Produtos <br /> Femininos",
        img: "https://newandrews.com.br/image-andrews/cards/Femininos.png",
    },
];

export default function Categorias() {
    return (
        <section className={styles.asCategorias}>
            <div className={styles.divCategoriasPai}>
                <div className={styles.divCategoriasFilho}>
                    <div className={styles.boxNetos}>
                        {categorias.map((cat, index) => (
                            <a
                                key={index}
                                href={cat.href}
                                className={styles.divCategoriasNetos}
                            >
                                <h3
                                    className={styles.tituloCard}
                                    dangerouslySetInnerHTML={{
                                        __html: `<span><i class="fa ${cat.icon}"></i></span><br />${cat.title}`,
                                    }}
                                />
                                <img src={cat.img} alt={cat.title.replace(/<br \/>/g, " ")} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
;