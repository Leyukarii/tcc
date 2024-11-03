import React, { useState } from 'react'; // Adicionamos `useState`
import Input from '../Forms/Input';
import Button2 from '../Forms/Button2';
import useForm from '../../Hooks/useForm';
import styles from './CadastroPermissaoForm.module.css';

const CadastroPermissaoForm = () => {
    const nomePermissao = useForm();
    const descricao = useForm();
    const [select, setSelect] = useState(''); 

    // Função para lidar com mudanças no select
    const handleSelectChange = (event) => {
        setSelect(event.target.value);
    };

    return (
        <section className="animeLeft">
            <div className={styles.containerTitulo}>
                <h1 className="title2 text-3xl font-semibold m-2">Cadastro de Permissões</h1>
            </div>
          
            <form className={styles.formcontainerS}>
                <div className="flex gap-5">
                    <div className={styles.formrowR}>
                        <Input label="Nome Permissão" type="text" name="nomePermissao" {...nomePermissao} />
                        <Input label="Descrição" type="text" name="descricao" {...descricao} />
                    </div>
                    <div className="flex gap-5">
                        <div className={styles.selectContainer}>
                            <label htmlFor="Sala" className={styles.label}>Sala</label>
                            <select id="permissionSelect" className={styles.select} value={select} onChange={handleSelectChange}>
                                <option value="">Selecione a Sala</option>
                                <option value="admin">Sala A3</option>
                                <option value="user">Sala v3</option>
                            </select>
                        </div>
                    </div>
                </div>
                <Button2>Cadastrar Nova Permissão</Button2>
            </form>
        </section>
    );
};

export default CadastroPermissaoForm;
