import React, { useState, useContext } from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import styles from './LoginForm.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginApi } from '../data/login';
import { AuthContext } from '../../context/AuthContext';

const LoginForm = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Usa o contexto para definir o login

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginApi({
        mail,
        password
      });

      if (response && response.status === 200) {
        setFormSuccess('Sucesso');
        setFormError('');

        // Extrai os dados relevantes da resposta
        const { role, id } = response.data.data;
        localStorage.setItem('employeeId', id); 
        console.log("ID do funcionário armazenado:", localStorage.getItem('employeeId'));
        const userData = {
          email: mail,
          role: role.name, // Armazena o nome do cargo, como "Admin" ou "User"
          pages: role.permissions[0]?.pages || [], // Armazena as páginas permitidas
          employeeId: id
        };
        console.log(userData)

        // Armazena o cargo e as páginas no contexto
        login(userData);
        navigate('/home'); // Redireciona para a página Home
      } else {
        setFormError('Acesso negado');
        setFormSuccess('');
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor', error);
      setFormError('Acesso negado');
      setFormSuccess(''); 
    }
  };

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="E-mail"
          type="text"
          value={mail}
          onChange={(e) => setMail(e.target.value)} />
        <Input
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <Button>Entrar</Button>
      </form>
      {formError && <p style={{ color: 'red', textAlign: 'center' }}>{formError}</p>}
      {formSuccess && <p style={{ color: 'green', textAlign: 'center' }}>{formSuccess}</p>}
      <div className={styles.cadastro}>
        <p>Esqueceu a senha? Entre em contato com o RH</p>
      </div>
        <p>Ainda não possui cadastro? Entre em contato com o RH</p>
    </section>
  );
};

export default LoginForm;
