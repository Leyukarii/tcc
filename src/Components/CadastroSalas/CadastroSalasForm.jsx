import React, { useState } from 'react'
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import styles from './CadastroSalasForm.module.css';
import { createStockRoom } from '../data/stockroom';


const CadastroSalasForm = () => {
    const [name, setName] = useState('');
    const [address, setaddress] = useState('');
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');

    const handleSubmit = async (e) =>{
      e.preventDefault();

      try{
        const response = await createStockRoom({
          name,
          address
        });
        
        if (response && response.status === 200){
          setFormSuccess('Sala criada com sucesso!');
          setFormError('');
          setName('');
          setaddress('');
        } else{
          setFormError('Erro ao criar sala');
          setFormSuccess('');
        }
      }catch (error){
        console.error('Erro ao conectar com o servidor', error);
        setFormError('Erro ao conectar com o servidor');
        setFormSuccess('');
      }
    };


  return (
    <section className="animeLeft">
        <div>
            <h1 className="title2 text-3xl font-semibold m-2 ">Cadastro de Salas</h1>
        </div>
        <form className={styles.formcontainerS} onSubmit={handleSubmit}>
            <Input
              label="Nome ou Número da sala"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}/>
            <Input
              label="Andar"
              type="text"
              value={address}
              onChange={(e) => setaddress(e.target.value)}/>

            {formError && <p style={{ color: 'red', textAlign: 'center' }}>{formError}</p>}
            {formSuccess && <p style={{ color: 'green', textAlign: 'center' }}>{formSuccess}</p>}  
            <Button>Cadastrar Sala</Button>
        </form>
    </section>
  );
};

export default CadastroSalasForm