import React, { useState } from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import styles from './LoginForm.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login } from '../data/login';


const LoginForm = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await login({
        mail,
        password
      });

      if(response && response.status === 200){
        setFormSuccess('Sucesso');
        setFormError('');
        setMail('');
        setPassword('');
        navigate('/home');
      }else{
        setFormError('Acesso negado');
        setFormSuccess('');
      }
    }catch (error){
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
          onChange={(e) => setMail(e.target.value)}/>
        <Input
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <Button>Entrar</Button>
      </form>
      {formError && <p style={{ color: 'red', textAlign: 'center' }}>{formError}</p>}
      {formSuccess && <p style={{ color: 'green', textAlign: 'center' }}>{formSuccess}</p>}
      <Link className={styles.perdeu} to="/login/perdeu">Esqueceu a Senha?</Link>
      <div className={styles.cadastro}>
        <p>Ainda não possui cadastro? Entre em contato com o RH</p>
      </div>
    </section>
  );
};

export default LoginForm;
