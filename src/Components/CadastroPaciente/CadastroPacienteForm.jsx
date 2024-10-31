import React, { useState } from 'react';
import InputTw from '../Forms/InputTw';
import Button1 from '../Forms/Button1';
import ValidaCPF from '../validaCPF';
import { createPatient } from "../../services/patientService";
import styles from './CadastroPacienteForm.module.css';

const CadastroPacienteForm = () => {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [observations, setObservations] = useState('');
    const [cpfError, setCpfError] = useState('');
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');

    const handleCPFChange = (event) => {
        const value = event.target.value;
        setCpf(value);
        if (!ValidaCPF(value)) {
            setCpfError('CPF inválido');
        } else {
            setCpfError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cpfError) {
            setFormError('Por favor, corrija o CPF antes de enviar.');
            return;
        }

        try {
            await createPatient({
                name,
                cpf,
                birthDate,
                phone,
                email,
                observations
            });
            if (response && response.status === 200) {
                setFormSuccess('Paciente cadastrado com sucesso!');
                setFormError('');
                setName('');
                setCpf('');
                setBirthDate('');
                setPhone('');
                setEmail('');
                setObservations('');
            } else {
                setFormError('Erro ao cadastrar paciente');
                setFormSuccess('');
            }
        } catch (error) {
            console.error('Erro ao conectar ao servidor:', error);
            setFormError('Erro ao conectar ao servidor');
            setFormSuccess('');
        }
    };

    return (
        <section className="animeLeft">
            <div className={styles.containerTituloP}>
                <h1 className="title2 text-3xl font-semibold m-2">Cadastro de Pacientes</h1>
            </div>

            <form className={styles.formcontainerP} onSubmit={handleSubmit}>
                <div className="flex gap-5">
                    <div className="w-full">
                        <InputTw
                            label="Nome Completo do Paciente"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <InputTw
                            label="CPF"
                            type="text"
                            value={cpf}
                            onChange={handleCPFChange}
                            className=""
                        />
                        {cpfError && <p style={{ color: 'red' }}>{cpfError}</p>}
                    </div>
                </div>

                <div className="flex gap-5">
                    <div className="w-full">
                        <InputTw
                            label="E-mail"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <InputTw
                            label="Data Nascimento"
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className=""
                        />
                    </div>
                    <div>
                        <InputTw
                            label="Telefone"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className=""
                        />
                    </div>
                </div>

                <InputTw
                    label="Observações"
                    type="text"
                    value={observations}
                    onChange={(e) => setObservations(e.target.value)}
                    className="w-full"
                />

                {formError && <p style={{ color: 'red', textAlign: 'center' }}>{formError}</p>}
                {formSuccess && <p style={{ color: 'green', textAlign: 'center' }}>{formSuccess}</p>}

                <div className="flex justify-center">
                    <Button1 type="submit">Cadastrar Paciente</Button1>
                </div>
            </form>
        </section>
    );
};

export default CadastroPacienteForm;
