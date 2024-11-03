import React, { useState } from 'react';
import Input from '../Forms/Input';
import Button1 from '../Forms/Button1';
import useForm from '../../Hooks/useForm';
import styles from './CadastroRemedioForm.module.css';
import Input4 from '../Forms/Input4';
import axios from 'axios';
import TableRemedios from '../tables/Table-remedios/TableRemedios';
import TableRemedios from '../tables/Table-remedios/TableRemedios';
import api from '@/axios/config';

const CadastroRemedioForm = () => {
  const description = useForm();
  const dosage = useForm();
  const measure = useForm();
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [refresh, setRefresh] = useState(false); // Estado para controlar atualização da lista

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/Medicament', {
        description: description.value,
        dosage: parseFloat(dosage.value),
        measure: measure.value,
      });
      console.log(response);

      if (response.status === 200) {
        // Sucesso: Medicamento criado
        setFormSuccess('Medicamento criado com sucesso.');
        setFormError('');

        // Limpa os campos após o cadastro
        description.setValue('');
        dosage.setValue('');
        measure.setValue('');

        // Atualiza o estado de refresh para recarregar a lista
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      // Verifica se o erro é um 409 (Conflito)
      if (error.response && error.response.status === 409) {
        setFormError("O medicamento já existe no sistema.");
      } else {
        // Outros erros
        setFormError('Erro ao conectar ao servidor');
      }
      setFormSuccess('');
      console.error('Erro ao conectar ao servidor:', error);
    }
  };

  return (
    <section className="animeLeft">
      <div className={styles.containerTituloR}>
        <h1 className="title2">Cadastro de Remédios</h1>
      </div>
      <form className={styles.formcontainerR} onSubmit={handleSubmit}>
        <div className={styles.formrowR}>
          <Input4 label="Descrição do Medicamento" type="text" name="description" {...description} />
          <Input label="Dosagem" type="number" name="dosage" {...dosage} />
          <Input label="Unidade de Medida" type="text" name="measure" {...measure} />
        </div>
        {formError && <p style={{ color: 'red' }}>{formError}</p>}
        {formSuccess && <p style={{ color: 'green' }}>{formSuccess}</p>}

        <div className={styles.formrowR}>
          <Button1 type='submit'>Cadastrar Remédio</Button1>
        </div>
      </form>
      <TableRemedios refresh={refresh} /> {/* Passa o estado de refresh para a tabela */}
    </section>
  );
}

export default CadastroRemedioForm;
