import React, { useState } from 'react'
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import styles from './CadastroCargoForm.module.css';
import { createRole } from '../data/cargos';

const CadastroCargoForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await createRole({
                name,
                description
            });
            if (response && response.status === 200){
                setFormSuccess('Cargo cadastrado com sucesso!');
                setFormError('');
                setName('');
                setDescription('');
            }else {
                setFormError('Erro ao cadastrar cargo!');
                setFormSuccess('');
            }
        }catch (error) {
            console.error('Erro ao conectar ao servidor', error);
            setFormError('Erro ao conectar ao servidor');
            setFormSuccess('');
        }
    }

  return (
    <section className="animeLeft">
        <div>
            <h1 className="title2 text-3xl font-semibold m-2 ">Cadastro de Cargos</h1>
        </div>
        <form className={styles.formcontainerS} onSubmit={handleSubmit}>
            <Input
              label="Nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
            <Input
              label="Descrição"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              />

            {formError && <p style={{ color: 'red', textAlign: 'center' }}>{formError}</p>}
            {formSuccess && <p style={{ color: 'green', textAlign: 'center' }}>{formSuccess}</p>}  
            <Button>Cadastrar Cargo</Button>
        </form>
    </section>
  );
};

export default CadastroCargoForm