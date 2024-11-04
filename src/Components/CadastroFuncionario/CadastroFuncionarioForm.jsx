import React, { useEffect, useState } from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import styles from './CadastroFuncionarioForm.module.css';
import Input2 from '../Forms/Input2';
import Input4 from '../Forms/Input4';
import Button1 from '../Forms/Button1';
import Input3 from '../Forms/Input3';
import InputTw from '../Forms/InputTw';
import ValidaCPF from '../validaCPF';
import { createEmployee } from '../data/employee';
import { getRoles } from '../data/lista-roles';
import api from '@/axios/config'; 

const CadastroFuncionarioForm = () => {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [responsibleMail, setResponsibleMail] = useState('');
    const [crm, setCrm] = useState('');
    const [tagCode, setTagCode] = useState('');
    const [select, setSelect] = useState('');
    const [cpfError, setCpfError] = useState('');
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await api.get('/Role');
                setRoles(response.data.data); 
            } catch (error) {
                console.error('Erro ao buscar funções:', error);
            }
        };
    
        fetchRoles();
    }, []);
 

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
    const handlePhoneChange = (event) => {
        const value = event.target.value.replace(/\D/g, '');
        const formattedPhone = value
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .slice(0, 15);
        setPhone(formattedPhone);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cpfError) {
            setFormError('Por favor, corrija o CPF antes de enviar.');
            return;
        }

    try {
        const response = await createEmployee   ({
            name,
            cpf,
            birthDate: new Date(birthDate).toISOString(), // Converte para o formato ISO
            phone,
            email,
            crm: select === '1' ? crm.value : null,
            responsibleMail,
            tagCode,
            roleId: select
        });

        if (response && response.status === 200) {
            setFormSuccess('Funcionário cadastrado com sucesso!');
            setFormError('');
            setName('');
            setCpf('');
            setBirthDate('');
            setPhone('');
            setEmail('');
            setCrm('');
            setResponsibleEmail('');
            setTagCode('');
        } else {
            setFormError('Erro ao cadastrar funcionário');
            setFormSuccess('');
        }
    } catch (error) {
        if (error.response){
            console.error('Erro ao conectar ao servidor:', error.response.data);
            setFormError(`Erro: ${error.response.data.message || 'Verifique os dados enviados.'}`);
        }else{
            setFormError('Erro ao conectar ao servidor');
        }

        //console.error('Erro ao conectar ao servidor:', error);
        //setFormError('Erro ao conectar ao servidor');
        setFormSuccess('');
    }
};
    
return (
  <section className="animeLeft">
      <div className={styles.containerTitulo}>
          <h1 className="title2 text-3xl font-semibold m-2">Cadastro de Funcionários</h1>
      </div>

      <form className={styles.formcontainerF} onSubmit={handleSubmit}>
          <div className="flex gap-5">
              <div   v className="w-full">
                  <InputTw
                    label="Nome Completo do Funcionário"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full" />
              </div>
              <div className="w-4/12">
                  <InputTw
                    label="CPF"
                    type="text"
                    value={cpf}
                    onChange={handleCPFChange}
                    maxLength={14}
                    className="w-full" />
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
                    className="w-full" />
              </div>
              <div className="w-4/12">
                  <InputTw
                    label="Data Nascimento"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full" />
              </div>
              <div className="w-4/12">
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
                    maxLength={15}
                    className="w-full" 
                />
            </div>

          </div>

          <label htmlFor="cargoSelect" className={styles.label}>Cargo</label>
          <div className="flex gap-5">
              <div className="w-3/4">
              <select
                id="cargoSelect"
                className={styles.select}
                value={select}
                onChange={(e) => setSelect(e.target.value)}>
                <option disabled value="">Selecione</option>
                {roles.map((role) => (
                    <option key={role.key} value={role.key}>
                        {role.value}
                    </option>
                ))}
            </select>
              </div>
              {select === '3' && (
                  <InputTw
                    label="CRM"
                    type="text"
                    value={crm}
                    onChange={(e) => setCrm(e.target.value)}
                    className="w-full" />
              )}
          </div>

          <div className="flex gap-5">
              <div className="w-full">
                  <InputTw
                    label="E-mail do Responsável"
                    type="text"
                    value={responsibleMail}
                    onChange={(e) => setResponsibleMail(e.target.value)}
                    className="w-full" />
              </div>
              <div className="w-full">
                  <InputTw
                    label="Código do Crachá"
                    type="text"
                    value={tagCode}
                    onChange={(e) => setTagCode(e.target.value)}
                    className="w-full" />

                
              </div>
          </div>

          <Button1 type="submit">Cadastrar Funcionário</Button1>
        {formError && <p style={{ color: 'red', textAlign: 'center' }}>{formError}</p>}
        {formSuccess && <p style={{ color: 'green', textAlign: 'center' }}>{formSuccess}</p>}

      </form>
  </section>
);
};

export default CadastroFuncionarioForm;