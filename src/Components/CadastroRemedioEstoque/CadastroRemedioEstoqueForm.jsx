import React, { useState, useEffect } from 'react';
import Input from '../Forms/Input';
import Button1 from '../Forms/Button1';
import styles from './CadastroRemedioEstoqueForm.module.css';
import { getItensRemediosFormatados } from '../data/lista-remedios';
import { createStockRoomMedicament } from '../data/add-remedios-estoque';
import { getStockRooms } from '../data/stockroom';

const CadastroRemedioEstoqueForm = () => {
    const [expirationDate, setExpirationDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [medicamentos, setMedicamentos] = useState([]);
    const [salas, setSalas] = useState([]);
    const [selectSala, setSelectSala] = useState('');
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');
    const [medicamentId, setMedicamentId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const employeeId = localStorage.getItem('employeeId');

        if (!employeeId || employeeId === "null") {
            setFormError('Erro: ID do funcionário não encontrado.');
            return;
        }

        console.log("employeeId:", employeeId);

        console.log({
            expirationDate,
            quantity,
            stockRoomId: selectSala,
            medicamentId,
            employeeId
        });

        try {
            const response = await createStockRoomMedicament({
                expirationDate,
                quantity,
                stockRoomId: selectSala,
                medicamentId,
                employeeId
            });

            if (response && response.status === 200) {
                setFormSuccess('Remédio cadastrado no estoque com sucesso!');
                setFormError('');
                setExpirationDate('');
                setQuantity('');
                setSelectSala(''); 
                setMedicamentId('');
            } else {
                setFormError('Erro ao cadastrar remédio no estoque.');
                setFormSuccess('');
            }
        } catch (error) {
            if (error.response){
                switch (error.response.status) {
                    case 400:
                        setFormError('A quantidade de medicamentos indicada não corresponde aos lidos nas prateleiras.');
                        break;
                    case 404:
                        setFormError('Sala de estoque ou medicamento não encontrado.');
                        break;
                    case 500:
                        setFormError('Erro interno ao tentar adicionar o item ao estoque.');
                        break;
                    default:
                        setFormError('Erro desconhecido ao tentar adicionar o item ao estoque.');
                }
            }else{
                setFormError('Erro ao conectar-se ao servidor. Verifique sua conexão.');
            }
            setFormSuccess('');
            console.error('Erro ao cadastrar remédio no estoque.', error);
        }
    };

    useEffect(() => {
        const fetchMedicamentos = async () => {
            try {
                const remediosFormatados = await getItensRemediosFormatados();
                const fetchedSalas = await getStockRooms();
                setMedicamentos(remediosFormatados);
                setSalas(Array.isArray(fetchedSalas) ? fetchedSalas : fetchedSalas.data || []);
            } catch (error) {
                console.error("Erro ao carregar medicamentos e salas:", error);
            }
        };
    
        fetchMedicamentos();
    }, []);

    const handleSelectSalaChange = (event) => setSelectSala(event.target.value);

    return (
        <section className="animeLeft">
            <div className={styles.containerTituloE}>
                <h1 className="title2">Cadastro de Remédio no Estoque</h1>
            </div>
            <form className={styles.formContainerE} onSubmit={handleSubmit}>
                <label htmlFor="remedioSelect" className={styles.label}>Remédio</label>
                <div className='w-3/4'>
                    <select
                        id="remedioSelect"
                        className={styles.select1}
                        value={medicamentId}
                        onChange={({ target }) => setMedicamentId(target.value)}
                    >
                        <option disabled value="">Selecione</option>
                        {medicamentos.map((medicamento) => (
                            <option key={medicamento.id} value={medicamento.id}>
                                {medicamento.description}
                            </option>
                        ))}
                    </select>
                </div> 

                <label htmlFor="salaSelect" className={styles.label}>Sala</label>
                <div className='w-3/4'>
                    <select
                        id="salaSelect"
                        className={styles.select1}
                        value={selectSala}
                        onChange={handleSelectSalaChange}
                    >
                        <option disabled value="">Selecione</option>
                        {salas.map((sala) => (
                            <option key={sala.id} value={sala.id}>{sala.name}</option>
                        ))}
                    </select>
                </div> 

                <div className={styles.formrowE}>
                    <Input
                        label="Validade"
                        type="date"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)} 
                    />
                    <Input 
                        label="Quantidade"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)} 
                    />
                </div>

                {formError && <p style={{ color: 'red' }}>{formError}</p>}
                {formSuccess && <p style={{ color: 'green' }}>{formSuccess}</p>}

                <Button1>Cadastrar Remédio no Estoque</Button1>
            </form>
        </section>
    );
};

export default CadastroRemedioEstoqueForm;
