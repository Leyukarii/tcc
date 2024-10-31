import React, { useState } from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import styles from './LoginForm.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginForm = () => {
  const userName = useForm();
  const password = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post('http://localhost:5173/api/Auth/Login', {
        username: userName.value,
        password: password.value,
      });

      if(response.data.success){
        native('/home');
      }else{
        setError(response.data.message || 'Erro de autenticação');
      }
    }catch (error){
      console.error("Erro ao conectar ao servidor:", error);
      setError('Erro ao conectar ao servidor');
    }
  };

  function handleClick(){
    navigate('home');
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form className={styles.form}>
        <Input label="Matrícula" type="text" name="username" {...userName} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button onClick={handleClick}>Entrar</Button>
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">Esqueceu a Senha?</Link>
      <div className={styles.cadastro}>
        <p>Ainda não possui cadastro? Entre em contato com o RH</p>
      </div>
    </section>
  );
};

export default LoginForm;
