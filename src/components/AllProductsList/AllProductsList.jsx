// 🔧 Configuração do Supabase
import { useEffect, useState } from "react";
import SupabaseClient from "../KEYS/App.jsx";
import styles from "./AllProductsList.module.css";

const supabase = SupabaseClient;

function AllProductsList() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchDisponiveis = async () => {
      const { data, error } = await supabase
        .from("db_na_products")
        .select("name, disponible, skul, id")
        .eq("disponible", 1);

      if (error) {
        console.error("Erro ao buscar dispositivos disponíveis:", error);
        setProdutos([]);
        return;
      }

      // 1. Mapeia o array adicionando o 'productUrl' em CADA objeto
      const produtosComUrl = (data || []).map((p) => ({
        ...p,
        productUrl: `produtos?productID=${p.id}&sku=${p.skul || ''}`
      }));

      // 2. Ordena alfabeticamente pelo nome (A -> Z) e seta o estado
      const ordenados = produtosComUrl.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "", "pt-BR", { sensitivity: "base" })
      );
      
      setProdutos(ordenados);
    };

    fetchDisponiveis();
  }, []);

  return (
    <div className={styles.container}>
      <hr className={styles.divider} />
      <h5 className={styles.title} style={{ color: "#000000" }}> NOSSO CATÁLOGO </h5>
      <ul className={styles.lista}>
        {produtos.map((produto) => (
          /* DICA: Alterei a 'key' do index para o 'produto.id'. É uma boa prática no React! */
          <li key={produto.id} className={styles.item}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              title={produto.name}
              href={produto.productUrl}
            >
              {produto.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllProductsList;