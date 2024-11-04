import React from 'react'
import { Route, Routes } from 'react-router-dom';
import styles from './CadastroCargo.module.css';
import CadastroCargoForm from './CadastroCargoForm';

const CadastroCargo = () => {
  return (
    <section className={styles.CadastroCargo}>
        <div className='mt-5'>
            <CadastroCargoForm />

        </div>
    </section>
  );
};

export default CadastroCargo