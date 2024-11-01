import React, { useState } from 'react';
import Input from '../Forms/Input';
import Button1 from '../Forms/Button1';
import useForm from '../../Hooks/useForm';
import styles from './CadastroRemedioForm.module.css';
import Input4 from '../Forms/Input4';

import axios from 'axios';

import TableRemedios from '../tables/Table-remedios/TableRemedios';


const CadastroRemedioForm = () => {
  const description = useForm();
  const dosage = useForm();
  const measure = useForm();
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post('http://localhost:5173/api/Medicament', {
        description: description.value,
        dosage: dosage.value,
        measure: measure.value,
      });

      if (response.status === 201) {
        setFormSuccess('Medicamento cadastrado com sucesso!');
        setFormError('');
        // Limpa os campos após o cadastro
        description.setValue('');
        dosage.setValue('');
        measure.setValue('');
    } else{
      setFormError('Erro ao cadastrar medicamento');
      setFormSuccess('');
    }
    }catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
      setFormError('Erro ao conectar ao servidor');
      setFormSuccess('');
    }
  };

  return (
    <section className="animeLeft">
        <div className={styles.containerTituloR}>
            <h1 className="title2">Cadastro de Remédios</h1>
        </div>
        <form className={styles.formcontainerR}>
        <div className={styles.formrowR}>
        <Input4 label="Descrição do Medicamento" type="text" name="description" {...description}></Input4>
        <Input label="Dosagem" type="number" name="dosage" {...dosage}></Input>
        <Input label="Unidade de Medida" type="text" name="measure" {...measure}></Input>
        </div>
        {formError && <p style={{ color: 'red' }}>{formError}</p>}
        {formSuccess && <p style={{ color: 'green' }}>{formSuccess}</p>}

        <div className={styles.formrowR}>

        </div>
        <Button1>Cadastrar Remédio</Button1>
        </form>
      <TableRemedios/>
    </section>
  )
}

export default CadastroRemedioForm