import React, { useState, useEffect } from 'react';
import Input from '../Forms/Input';
import Button1 from '../Forms/Button1';
import useForm from '../../Hooks/useForm';
import styles from './CadastroRemedioEstoqueForm.module.css';
import { getItensRemediosFormatados } from '../data/lista-remedios';

 // Certifique-se de importar corretamente

const CadastroRemedioEstoqueForm = () => {
    const validadeRemedio = useForm();
    const quantidadeRemedio = useForm();
    const sala = useForm();
    const [select, setSelect] = useState('');
    const [medicamentos, setMedicamentos] = useState([]); // Estado para armazenar os remédios formatados

    // Busca os remédios formatados ao montar o componente
    useEffect(() => {
        const fetchMedicamentos = async () => {
            try {
                const remediosFormatados = await getItensRemediosFormatados();
                console.log(remediosFormatados)
                setMedicamentos(remediosFormatados);
            } catch (error) {
                console.error("Erro ao carregar medicamentos:", error);
            }
        };

        fetchMedicamentos();
    }, []);

    return (
        <section className="animeLeft">
            <div className={styles.containerTituloE}>
                <h1 className="title2">Cadastro de Remédio no Estoque</h1>
            </div>
            <form className={styles.formContainerE}>
                <label htmlFor="remedioSelect" className={styles.label}>Remédio</label>
                <div className='w-3/4'>
                    <select
                        id="remedioSelect"
                        className={styles.select1}
                        value={select}
                        onChange={({ target }) => setSelect(target.value)}
                    >
                        <option disabled value="">Selecione</option>
                        {medicamentos.map((medicamento) => (
                            <option key={medicamento.id} value={medicamento.id}>
                                {medicamento.description}
                            </option>
                        ))}
                    </select>
                </div> 

                <div className={styles.formrowE}>
                    <Input label="Validade" type="date" name="validadeRemedio" {...validadeRemedio} />
                    <Input label="Quantidade" type="number" name="quantidadeRemedio" {...quantidadeRemedio} />
                    <Input label="Sala" type="text" name="sala" {...sala} />
                </div>
                
                <Button1>Cadastrar Remédio no Estoque</Button1>
            </form>
        </section>
    );
};

export default CadastroRemedioEstoqueForm;
