import React, { useState } from 'react';
import InputTw from '../Forms/InputTw';
import Button1 from '../Forms/Button1';
import ValidaCPF from '../validaCPF';
import { createPatient } from '../data/patient';
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
        // Limita os caracteres para 11 dígitos antes de aplicar a máscara
        const value = event.target.value.replace(/\D/g, '').slice(0, 11); // Limita a 11 dígitos puros
        const formattedCPF = value
            .replace(/(\d{3})(\d)/, '$1.$2')   // Adiciona o primeiro ponto após os três primeiros dígitos
            .replace(/(\d{3})(\d)/, '$1.$2')   // Adiciona o segundo ponto após o segundo grupo de três dígitos
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o traço antes dos dois últimos dígitos
        
        setCpf(formattedCPF); // Atualiza o estado com o CPF formatado
        
        // Valida o CPF e define o erro se inválido
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
            const response = await createPatient({
                name,
                cpf,
                birthDate: new Date(birthDate).toISOString(),  // Converte para o formato ISO
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
                        maxLength={14} // Define o limite máximo de caracteres para o CPF formatado
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
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
                            const formattedPhone = value
                            .replace(/(\d{2})(\d)/, '($1) $2') // Adiciona os parênteses em volta do DDD
                            .replace(/(\d{5})(\d)/, '$1-$2')   // Adiciona o hífen após o quinto dígito
                            .slice(0, 15); // Limita o número de caracteres para (xx) x xxxx-xxxx
                            setPhone(formattedPhone); // Atualiza o estado com o número formatado
                        }}
                        maxLength={15} // Define o limite máximo de caracteres para 15
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
