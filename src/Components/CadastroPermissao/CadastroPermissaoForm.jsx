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
                </div>

                    <label htmlFor="salaSelect" className={styles.label}>Sala</label>
                        <div className="flex gap-5">
                            <div className="w-3/4">
                            <select
                                id="cargoSelect"
                                className={styles.select}
                                value={select}
                                onChange={(e) => setSelect(e.target.value)}>
                                <option disabled value="">Selecione</option>
                            </select>
                            <label htmlFor="paginaSelect" className={styles.label}>Página</label>
                            <select
                                id="cargoSelect"
                                className={styles.select}
                                value={select}
                                onChange={(e) => setSelect(e.target.value)}>
                                <option disabled value="">Selecione</option>
                            </select>
                            </div>
                        </div>

                <Button2>Cadastrar Nova Permissão</Button2>
            </form>
        </section>
    );
};

export default CadastroPermissaoForm;
