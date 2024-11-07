import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import styles from './CadastroNovaSenhaForm.module.css';
import Input2 from '../Forms/Input2';
import Input4 from '../Forms/Input4';
import Button1 from '../Forms/Button1';
import Input3 from '../Forms/Input3';
import InputTw from '../Forms/InputTw';
import Button2 from '../Forms/Button2';
import React, { useState } from 'react';
import { createNewPassword } from '../data/nova-senha';

const CadastroNovaSenhaForm = () => {
    const [mail, setMail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await createNewPassword({
                mail,
                oldPassword,
                newPassword
            });

            if(response && response.status === 200){
                setFormSuccess('Senha atualizada com sucesso');
                setFormError('');
                setMail('');
                setNewPassword('');
                setOldPassword('');
            } else{
                setFormError('Erro ao atualizar senha');
                setFormSuccess('');
            }
        }catch (error) {
            console.error('Erro ao conectar ao servidor', error);
            setFormError('Erro ao atualizar senha');
            setFormSuccess('');
        }
    };
    
    return (
        <section className="animeLeft">
            <div className={styles.containerTitulo}>
                <h1 className="title2 text-3xl font-semibold m-2">Cadastro de nova senha</h1>
            </div>
          
            <form className={styles.formcontainerS} onSubmit={handleSubmit}>
                <div className="flex gap-5"></div>
                <div className="flex gap-5">
                    <div className={styles.formrowR}>
                        <Input
                            label="Email"
                            type="text"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}/>
                        <Input
                            label="Senha Atual"
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}/>
                        <Input
                            label="Nova Senha"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                </div>

                {formError && <p style={{ color: 'red', textAlign: 'center' }}>{formError}</p>}
                {formSuccess && <p style={{ color: 'green', textAlign: 'center' }}>{formSuccess}</p>} 
                <Button2>Cadastrar Nova Senha</Button2>
            </form>
        </section>
    );
};

export default CadastroNovaSenhaForm;
