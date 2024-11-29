import React, { useEffect, useState, useContext } from 'react';
import styles from './CadastroNovaSenhaForm.module.css';
import Input from '../Forms/Input';
import Button2 from '../Forms/Button2';
import { createNewPassword } from '../data/nova-senha';
import { AuthContext } from '../../context/AuthContext';

const CadastroNovaSenhaForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const { user } = useContext(AuthContext); // Acessa o contexto para obter os dados do usuário logado

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setFormError('Usuário não logado.');
      return;
    }

    try {
      const response = await createNewPassword({
        mail: user.email, // Usa o e-mail do contexto
        oldPassword,
        newPassword,
      });

      if (response && response.status === 200) {
        setFormSuccess('Senha atualizada com sucesso');
        setFormError('');
        setOldPassword('');
        setNewPassword('');
      } else {
        setFormError('Erro ao atualizar senha');
        setFormSuccess('');
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor', error);
      setFormError('Erro ao atualizar senha');
      setFormSuccess('');
    }
  };

  if (!user) {
    return (
      <section className="animeLeft">
        <div className={styles.containerTitulo}>
          <h1 className="title2 text-3xl font-semibold m-2">Cadastro de nova senha</h1>
          <p style={{ color: 'red', textAlign: 'center' }}>
            Você precisa estar logado para alterar a senha. Faça login para continuar.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="animeLeft">
      <div className={styles.containerTitulo}>
        <h1 className="title2 text-3xl font-semibold m-2">Cadastro de nova senha</h1>
      </div>

      <form className={styles.formcontainerS} onSubmit={handleSubmit}>
        <div className="flex gap-5">
          <div className={styles.formrowR}>
            <Input
              label="Email"
              type="text"
              value={user.email} // Campo preenchido automaticamente
              readOnly // Define como somente leitura
            />
            <Input
              label="Senha Atual"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <Input
              label="Nova Senha"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        {formError && <p style={{ color: 'red', textAlign: 'center' }}>{formError}</p>}
        {formSuccess && <p style={{ color: 'green', textAlign: 'center' }}>{formSuccess}</p>}
        <Button2>Cadastrar Nova Senha</Button2>
      </form>
    </section>
  );
};

export default CadastroNovaSenhaForm;
