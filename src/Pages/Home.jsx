import React, { useContext } from 'react';
import SidebarMenu from "../Components/Sidebar/index";
import styles from './Home.module.css';
import { AuthContext } from '../context/AuthContext';
import redux from '../Assets/redux.png';

const Home = () => {
  const { user } = useContext(AuthContext); // Obtém o usuário do contexto

  return (
    <div className="flex mx-auto space-y-4 w-full">
      <SidebarMenu />
      <div className="block w-full text-center">
        <h1 className={styles.titulo}>Seja Bem Vindo ao EFarma</h1>
        <h2 className={styles.h2}>Gestão Inteligente de Medicamentos</h2>
        <p className={styles.h2}>Cargo: {user?.role || "Usuário não logado"}</p> {/* Exibe o cargo do usuário */}
        <img className={styles.imagem} src={src/Assets/redux.png} alt="Descrição da Imagem"/>
      </div>
    </div>
  );
};

export default Home;
