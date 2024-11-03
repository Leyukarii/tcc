import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CadastroPermissaoForm from './CadastroPermissaoForm';
import styles from './CadastroPermissaoForm.module.css';

const CadastroPermissao = () => {
  return (
    <section className={styles.cadastropermissao}>
      <div className='mt-5'>
        <CadastroPermissaoForm />
      </div>
    </section>
  );
};

export default CadastroPermissao;