import React, { useState } from 'react';
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

const CadastroFuncionarioForm = () => {
  const nomeFuncionario = useForm();
  const dataNascimento = useForm();
  const telefone = useForm();
  const email = useForm();
  const emailFiscal = useForm();
  const crm = useForm();
  const tagCode = useForm();
  const [cpf, setCpf] = useState('');
  const [select, setSelect] = useState('');
  const [cpfError, setCpfError] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
        setError('Por favor, corrija o CPF antes de enviar.');
        return;
    }

    const birthDate = dataNascimento.value ? new Date(dataNascimento.value).toISOString() : null;

    const employeeData = {
      Name: nomeFuncionario.value,
      CPF: cpf,
      BirthDate: birthDate,
      Phone: telefone.value,
      Mail: email.value,
      ResponsibleMail: emailFiscal.value,
      TagCode: tagCode, 
      CRM: select === 'medico' ? crm.value : null, 
      RoleId: select, 
    };

    try {
      await createEmployee(employeeData);
      setSuccess('Funcionário cadastrado com sucesso!');
      setError(null);
      nomeFuncionario.setValue('');
      setCpf('');
      dataNascimento.setValue('');
      telefone.setValue('');
      email.setValue('');
      emailFiscal.setValue('');
      crm.setValue('');
      setSelect('');
  } catch(error){
      setError('Erro ao cadastrar funcionário. Verifique os dados e tente novamente.');
      setSuccess(null);
  }
};
    
return (
  <section className="animeLeft">
      <div className={styles.containerTitulo}>
          <h1 className="title2 text-3xl font-semibold m-2">Cadastro de Funcionários</h1>
      </div>

      <form className={styles.formcontainerF} onSubmit={handleSubmit}>
          <div className="flex gap-5">
              <div className="w-full">
                  <InputTw label="Nome Completo" type="text" name="nomeFuncionario" {...nomeFuncionario} className="w-full" />
              </div>
              <div className="w-4/12">
                  <InputTw label="CPF" type="text" name="cpf" value={cpf} onChange={handleCPFChange} className="w-full" />
                  {cpfError && <p style={{ color: 'red' }}>{cpfError}</p>}
              </div>
          </div>

          <div className="flex gap-5">
              <div className="w-full">
                  <InputTw label="E-mail" type="email" name="email" {...email} className="w-full" />
              </div>
              <div className="w-4/12">
                  <InputTw label="Data Nascimento" type="date" name="dataNascimento" {...dataNascimento} className="w-full" />
              </div>
              <div className="w-4/12">
                  <InputTw label="Telefone" type="number" name="telefone" {...telefone} className="w-full" />
              </div>
          </div>

          <label htmlFor="cargoSelect" className={styles.label}>Cargo</label>
          <div className="flex gap-5">
              <div className="w-3/4">
                  <select id="cargoSelect" className={styles.select} value={select} onChange={({ target }) => setSelect(target.value)}>
                      <option disabled value="">Selecione</option>
                      <option value="1">Médico</option>
                      <option value="2">Estoquista</option>
                      <option value="3">Enfermeiro</option>
                      <option value="4">Farmacêutico</option>
                      <option value="5">Administrador</option>
                  </select>
              </div>
              {select === '1' && (
                  <InputTw label="CRM (para médicos)" type="text" name="crm" {...crm} className="w-full" />
              )}
          </div>

          <div className="flex gap-5">
              <div className="w-full">
                  <InputTw label="E-mail do Responsável" type="text" name="emailFiscal" {...emailFiscal} className="w-full" />
              </div>
              <div className="w-full">
                  <InputTw label="Código do Crachá" type="text" name="tagCode" {...tagCode} className="w-full" />
              </div>
          </div>

          <Button1 type="submit">Cadastrar Funcionário</Button1>
          {success && <p style={{ color: 'green' }}>{success}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
  </section>
);
};

export default CadastroFuncionarioForm;