import React, { useState, useEffect } from 'react';
import InputLe from '../Forms/Input';
import useForm from '../../Hooks/useForm';
import styles from './CadastroReceitaForm.module.css';
import { Button } from '../ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { PlusCircle } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import TableItensReceita from '../tables/Table-itens-receita/TableItensReceita';
import Input2 from '../Forms/Input2';
import Input4 from '../Forms/Input4';
import Button1 from '../Forms/Button1';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const CadastroReceitaForm = () => {
  const nomePacienteR = useForm();
  const cpfR = useForm();
  const telefoneR = useForm();
  const nomeMedico = useForm();
  const local = useForm();
  const assinatura = useForm();
  const dataPrescricao = useForm();

  const [itensReceita, setItensReceita] = useState([]); // Estado para armazenar os itens da receita
  const [novoItem, setNovoItem] = useState({ qtd: '', descricao: '' }); // Estado para novo item no Dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Controle para o Dialog

  // Lista de remédios para o ComboBox
  const statuses = [
    { value: "remedio1", label: "Remédio 01" },
    { value: "remedio2", label: "Remédio 02" },
    { value: "remedio3", label: "Remédio 03" },
    { value: "remedio4", label: "Remédio 04" },
    { value: "remedio5", label: "Remédio 05" },
    { value: "remedio6", label: "Remédio 06" },
    { value: "remedio7", label: "Remédio 07" },
  ];

  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  // Função para adicionar um novo item ao estado itensReceita
  const adicionarItem = (event) => {
    event.preventDefault(); // Impede o comportamento padrão do submit
    if (selectedStatus && novoItem.qtd && novoItem.descricao) {
      const itemParaAdicionar = { ...novoItem, name: selectedStatus.label };
      setItensReceita([...itensReceita, itemParaAdicionar]); // Adiciona novo item à lista
      setNovoItem({ qtd: '', descricao: '' }); // Limpa o estado para novo item
      setSelectedStatus(null);
      setIsDialogOpen(false); // Fecha o Dialog após adicionar
    } else {
      console.log('Preencha todos os campos antes de salvar');
    }
  };

  const StatusList = ({ setOpen, setSelectedStatus }) => (
    <Command>
      <CommandInput placeholder="Filtrar remédios..." />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.label}
              value={status.label}
              onSelect={(label) => {
                setSelectedStatus(statuses.find((item) => item.label === label) || null);
                setOpen(false);
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );

  return (
    <section className="animeLeft">
      <div className={styles.containerTituloRe}>
        <h1 className="title2">Nova Receita</h1>
      </div>
      <form className={styles.formContainerRe}>
        <div className={styles.formrowRe}>
          <Input2 label="Nome do Paciente" type="text" name="nomePacienteR" {...nomePacienteR} />
          <InputLe label="CPF do Paciente" type="number" name="cpfR" {...cpfR} />
          <InputLe label="Telefone do Paciente" type="number" name="telefoneR" {...telefoneR} />
        </div>
        <div className={styles.formrowRe}>
          <Input2 label="Nome do Médico" type="text" name="nomeMedico" {...nomeMedico} />
          <Input4 label="CRM do Médico" type="number" name="crm" />
        </div>

        <div className='mb-5'>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                <PlusCircle className='w-4 h-4 mr-2' />
                Novo Item
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo Item</DialogTitle>
                <DialogDescription>Escolha um remédio para adicionar à receita</DialogDescription>
              </DialogHeader>
              
              {/* COMBOBOX */}
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[200px] justify-start">
                    {selectedStatus ? <>{selectedStatus.label}</> : <>Selecione o Remédio</>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                  <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
                </PopoverContent>
              </Popover>

              <div className='flex gap-5'>
                <div>
                  <Label htmlFor="qtd">Quantidade</Label>
                  <Input
                    id='qtd'
                    type='number'
                    min="1"
                    className="w-[100px]"
                    value={novoItem.qtd}
                    onChange={(e) => {
                      const intValue = parseInt(e.target.value, 10); // Converte o valor para int
                      setNovoItem({ ...novoItem, qtd: intValue > 0 ? intValue : '' }); // Apenas atualiza se for > 0
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Input
                    id='descricao'
                    className="w-[350px]"
                    value={novoItem.descricao}
                    onChange={(e) => setNovoItem({ ...novoItem, descricao: e.target.value })}
                  />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="submit" onClick={adicionarItem}>Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div>
          <TableItensReceita itens={itensReceita} />
        </div>

        <div className={styles.formrowRe}>
          <Input2 label="Local" type="text" name="local" {...local} />
          <Input4 label="Assinatura" type="text" name="assinatura" {...assinatura} />
        </div>
        
        <Button1>Cadastrar nova Receita</Button1>
      </form>
    </section>
  );
};

export default CadastroReceitaForm;
