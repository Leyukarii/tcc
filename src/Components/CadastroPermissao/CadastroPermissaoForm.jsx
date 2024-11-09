import React, { useState, useEffect } from 'react';
import Input from '../Forms/Input';
import Button2 from '../Forms/Button2';
import useForm from '../../Hooks/useForm';
import styles from './CadastroPermissaoForm.module.css';
import { getStockRooms } from '../data/stockroom';
import { getPages } from '../data/pages';
import { createPermission } from '../data/permission'; // Certifique-se de que o caminho está correto

const CadastroPermissaoForm = () => {
    const nomePermissao = useForm();
    const descricao = useForm();
    const [salas, setSalas] = useState([]);
    const [paginas, setPaginas] = useState([]);
    const [selectSala, setSelectSala] = useState('');
    const [selectPagina, setSelectPagina] = useState('');
    const [formSuccess, setFormSuccess] = useState('');
    const [formError, setFormError] = useState(''); // Definindo o estado de erro

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedSalas = await getStockRooms();
                const fetchedPaginas = await getPages();

                setSalas(Array.isArray(fetchedSalas) ? fetchedSalas : fetchedSalas.data || []);
                setPaginas(Array.isArray(fetchedPaginas) ? fetchedPaginas : fetchedPaginas.data || []);
            } catch (error) {
                console.error("Erro ao buscar salas e páginas:", error);
                setFormError("Erro ao buscar salas e páginas");
            }
        };

        fetchData();
    }, []);

    const handleSelectSalaChange = (event) => setSelectSala(event.target.value);
    const handleSelectPaginaChange = (event) => setSelectPagina(event.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Impede o recarregamento da página
        try {
            const response = await createPermission({
                name: nomePermissao.value,
                description: descricao.value,
                stockRoomIds: [selectSala],
                pageIds: [selectPagina]
            });
            
            if (response && response.status === 200) {
                setFormSuccess("Permissão cadastrada com sucesso!");
                setFormError('');
                // Resetando manualmente os campos de entrada
                nomePermissao.onChange({ target: { value: '' } });
                descricao.onChange({ target: { value: '' } });
                setSelectSala('');
                setSelectPagina('');
            } else {
                setFormError("Erro ao cadastrar permissão.");
                setFormSuccess('');
            }
        } catch (error) {
            console.error("Erro ao conectar com o servidor", error);
            setFormError("Erro ao conectar com o servidor");
            setFormSuccess('');
        }
    };

    return (
        <section className="animeLeft">
            <div className={styles.containerTitulo}>
                <h1 className="title2 text-3xl font-semibold m-2">Cadastro de Permissões</h1>
            </div>
          
            <form className={styles.formcontainerS} onSubmit={handleSubmit}>
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
                            id="salaSelect"
                            className={styles.select}
                            value={selectSala}
                            onChange={handleSelectSalaChange}
                        >
                            <option disabled value="">Selecione</option>
                            {salas.map((sala) => (
                                <option key={sala.id} value={sala.id}>{sala.name}</option>
                            ))}
                        </select>

                        <label htmlFor="paginaSelect" className={styles.label}>Página</label>
                        <select
                            id="paginaSelect"
                            className={styles.select}
                            value={selectPagina}
                            onChange={handleSelectPaginaChange}
                        >
                            <option disabled value="">Selecione</option>
                            {paginas.map((pagina) => (
                                <option key={pagina.id} value={pagina.id}>{pagina.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {formError && <p style={{ color: 'red', textAlign: 'center' }}>{formError}</p>}
                {formSuccess && <p style={{ color: 'green', textAlign: 'center' }}>{formSuccess}</p>}  

                <Button2 type="submit">Cadastrar Nova Permissão</Button2>
            </form>
        </section>
    );
};

export default CadastroPermissaoForm;
