import React from 'react'
import { Route, Routes } from 'react-router-dom';
import styles from './CadastroPagina.module.css';
import CadastroPaginaForm from './CadastroPaginaForm'

const CadastroPagina = () => {
  return (
    <section className={styles.cadastroPagina}>
        <div className='mt-5'>
            <CadastroPaginaForm />

        </div>
    </section>
  );
};

export default CadastroPagina