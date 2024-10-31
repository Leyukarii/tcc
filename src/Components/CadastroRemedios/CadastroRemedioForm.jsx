import React from 'react'
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import styles from './CadastroRemedioForm.module.css';
import Input2 from '../Forms/Input2';
import Button1 from '../Forms/Button1';
import Input4 from '../Forms/Input4';
import TableRemedios from '../tables/Table-remedios/TableRemedios';

const CadastroRemedioForm = () => {
    const nomeRemedio = useForm();
    const dosagem = useForm();
    const unimedida = useForm();

  return (
    <section className="animeLeft">
        <div className={styles.containerTituloR}>
            <h1 className="title2">Cadastro de Remédios</h1>
        </div>
        <form className={styles.formcontainerR}>
        <div className={styles.formrowR}>
          <Input4 label="Nome do Remédio" type="text" name="nomeRemedio" {...nomeRemedio}></Input4>
          <Input label="Dosagem" type="number" name="dosagem" {...dosagem}></Input>
          <Input label="Unidade de Medida" type="number" name="unimedida" {...unimedida}></Input>
        </div>

        <div className={styles.formrowR}>

        </div>
        <Button1>Cadastrar Remédio</Button1>
        </form>
      <TableRemedios/>
    </section>
  )
}

export default CadastroRemedioForm