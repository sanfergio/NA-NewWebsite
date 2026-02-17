import React from 'react';
import styles from './NavBar.module.css';
// Os ícones do Font Awesome (fa) podem ser usados, mas como você está usando <img>,
// vou manter os imports apenas como referência, pois não estão sendo usados
// no JSX do código original com <img>.
// Caso queira usar os ícones do Font Awesome no futuro, basta substituir o <img>
// pelo componente correspondente (ex: <FaMotorcycle />).
import {
    FaMotorcycle,
    FaDotCircle,
    FaTools,
    FaCogs,
    FaOilCan
} from 'react-icons/fa';


const navItems = [
    {
        name: "Categorias",
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/5665/5665189.png',
        href: '/categorias'
    },
    {
        name: "Objetivos",
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/30/30237.png',
        href: '/objetivos'
    },
    {
        name: "Promoções",
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/879/879757.png',
        href: '/ofertas'
    },
    {
        name: "Atacado",
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/2581/2581576.png',
        href: '/atacados'
    },
    {
        name: "Kits",
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/1926/1926039.png',
        href: '/kits'
    }
    // Adicione ou edite itens aqui para atualizar o NavBar automaticamente
];


function NavBar() {
    return (
        <nav className={styles.nav}>
            {navItems.map((item) => (
                <a key={item.name} className={styles.cardNavbar} href={item.href}>
                    <img src={item.iconUrl} alt={`Ícone da categoria ${item.name}`} />
                    <span>{item.name}</span>
                </a>
            ))}
        </nav>
    );
}

export default NavBar;