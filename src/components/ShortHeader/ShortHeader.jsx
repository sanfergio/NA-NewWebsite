import styles from './ShortHeader.module.css';
import { FaMapMarkerAlt, FaUser, FaShoppingCart, FaSearch, FaBars } from 'react-icons/fa';
import { useState } from "react";
import MenuMobile from "../MenuMobile/MenuMobile";
import CartSideBar from "../CartSideBar/CartSideBar";

function Header() {


  return (
    <>
      <div id='top' className={styles.blackHeader}></div>
      <div className={styles.redHeader}></div>

      <div className={styles.headerWrapper}>
        <header className={styles.header}>
          <div className={styles.imgHeader}>
  

            <a href="./">
              <img
                src="https://newandrews.com.br/image-andrews/logo_five.png"
                alt="Logo Brasmerica"
              />
            </a>

          </div>

        </header>
      </div>

    </>
  );
}

export default Header;
