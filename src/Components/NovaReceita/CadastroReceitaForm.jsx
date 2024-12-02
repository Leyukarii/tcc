import React, { useState, useEffect } from 'react';
import styles from './CadastroReceitaForm.module.css';
import { Button } from '../ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { PlusCircle } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import TableItensReceita from '../tables/Table-itens-receita/TableItensReceita';
import Input2 from '../Forms/Input2';
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
import { createPrescription } from '../data/nova_receita';
import { carregarMedicamentos } from '../data/carregar-medicamentos';
import { buscarPacientePorCpf } from '../data/buscar-paciente-por-cpf';
import { buscarMedicoPorCrm } from '../data/buscar-medico-por-crm';
import InputMask from 'react-input-mask';


const CadastroReceitaForm = () => {
  const [nomePaciente, setNomePaciente] = useState('');
  const [cpf, setCpf] = useState('');
  const [nomeMedico, setNomeMedico] = useState('');
  const [crm, setCrm] = useState('');
  const [local, setLocal] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  const [itensReceita, setItensReceita] = useState([]);
  const [novoItem, setNovoItem] = useState({ qtd: '', descricao: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [medicamentos, setMedicamentos] = useState([]); 
  const [selectedMedicament, setSelectedMedicament] = useState(null);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  useEffect(() => {
    async function fetchMedicamentos() {
      try {
        const response = await carregarMedicamentos();
        setMedicamentos(response);
        console.log("Medicamentos carregados no estado:", response); 
      } catch (error) {
        console.error("Erro ao carregar medicamentos:", error);
      }
    }
    fetchMedicamentos();
  }, []);

  useEffect(() => {
    const fetchPaciente = async () => {
      const cpfNumerico = cpf.replace(/\D/g, ''); // Remove pontuação
      if (cpfNumerico.length === 11) { // Certifique-se de que o CPF tem 11 dígitos
        try {
          const paciente = await buscarPacientePorCpf(cpfNumerico);
          if (paciente) {
            setNomePaciente(paciente.name);
          } else {
            setNomePaciente('');
            console.log("Paciente não encontrado.");
          }
        } catch (error) {
          console.error("Erro ao buscar paciente:", error);
          setNomePaciente('');
        }
      } else {
        setNomePaciente(''); // Reseta o campo se o CPF for apagado
      }
    };
  
    fetchPaciente();
  }, [cpf]);
  

  useEffect(() => {
    async function fetchMedico() {
      if (crm) { // Executa quando há valor em crm
        console.log("Buscando médico com CRM:", crm);
        const medico = await buscarMedicoPorCrm(crm);
        if (medico) {
          setNomeMedico(medico.name); 
          setEmployeeId(medico.id);
          console.log("Médico encontrado:", medico);
        } else {
          console.log("Médico não encontrado.");
          setNomeMedico('');
        }
      }
    }
    fetchMedico();
  }, [crm]); 

  const adicionarItem = () => {
    if (selectedMedicament && novoItem.qtd && novoItem.descricao) {
      const itemParaAdicionar = {
        ...novoItem,
        name: selectedMedicament.label,
        medicamentId: selectedMedicament.value,
      };
      setItensReceita([...itensReceita, itemParaAdicionar]);
      setNovoItem({ qtd: '', descricao: '' });
      setSelectedMedicament(null);
      setIsDialogOpen(false);
    } else {
      console.log('Preencha todos os campos antes de salvar');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prescriptionData = {
      employeeId: employeeId,
      cpf,
      local,
      items: itensReceita.map(item => ({
        medicamentId: item.medicamentId,
        prescribedQuantity: item.qtd,
        observation: item.descricao,
      })),
    };

    try {
      await createPrescription(prescriptionData);
      console.log("Receita cadastrada com sucesso");
      setFormSuccess('Receita cadastrada com sucesso!');
      setFormError('');
      setNomePaciente('');
        setCpf('');
        setNomeMedico('');
        setCrm('');
        setLocal('');
        setItensReceita([]);
        setEmployeeId('');
        setSelectedMedicament(null);
        setNovoItem({ qtd: '', descricao: '' });
      setItensReceita([]);
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 403:
            setFormError('Funcionário não tem permissão para prescrever (CRM não registrado).');
            break;
          case 404:
            setFormError('Medicamento, funcionário ou paciente não encontrado.');
            break;
          case 500:
            setFormError('Erro interno ao tentar criar a receita.');
            break;
            default:
              setFormError('Erro desconhecido ao cadastrar a receita.');
      }
    }else{
      setFormError('Erro ao conectar-se ao servidor. Tente novamente.');
    }
    setFormSuccess('');
    console.error("Erro ao cadastrar receita:", error);
  }
  };

  const StatusList = ({ setOpen, setSelectedMedicament }) => (
    <Command>
      <CommandInput placeholder="Filtrar remédios..." />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        <CommandGroup>
          {medicamentos.map((medicament) => (
            <CommandItem
              key={medicament.id}
              value={medicament.description}
              onSelect={() => {
                setSelectedMedicament({ label: `${medicament.description} ${medicament.dosage}${medicament.measure}`, value: medicament.id });
                setOpen(false);
              }}
            >
               {`${medicament.description} ${medicament.dosage}${medicament.measure}`}
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
      <form className={styles.formContainerRe} onSubmit={handleSubmit}>
        <div className={styles.formrowRe}>
          <Input2 label="Nome do Paciente"
          type="text"
          value={nomePaciente} readOnly />
          <Input2
            label="CPF do Paciente"
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            as={InputMask}
            mask="999.999.999-99"
            placeholder="000.000.000-00"
          />
        </div>
        <div className={styles.formrowRe}>
          <Input2 label="Nome do Médico"
          type="text"
          value={nomeMedico} readOnly />
          <Input2
          label="CRM do Médico"
          type="text" value={crm}
          onChange={(e) => setCrm(e.target.value)} />
        </div>

        <div className="mb-5">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <PlusCircle className="w-4 h-4 mr-2" />
                Novo Item
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo Item</DialogTitle>
                <DialogDescription>Escolha um remédio para adicionar à receita</DialogDescription>
              </DialogHeader>
              
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[200px] justify-start">
                    {selectedMedicament ? selectedMedicament.label : "Selecione o Remédio"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                  <StatusList setOpen={setOpen} setSelectedMedicament={setSelectedMedicament} />
                </PopoverContent>
              </Popover>

              <div className="flex gap-5">
                <div>
                  <Label htmlFor="qtd">Quantidade</Label>
                  <Input id="qtd" type="number" min="1" className="w-[100px]" value={novoItem.qtd} onChange={(e) => setNovoItem({ ...novoItem, qtd: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Input id="descricao" className="w-[350px]" value={novoItem.descricao} onChange={(e) => setNovoItem({ ...novoItem, descricao: e.target.value })} />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="button" onClick={adicionarItem}>Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div>
          <TableItensReceita itens={itensReceita} />
        </div>

        <div className={styles.formrowRe}>
          <Input2 label="Local" type="text" value={local} onChange={(e) => setLocal(e.target.value)} />

        </div>
        
        <Button1 type="submit">Cadastrar nova Receita</Button1>
        {formError && <p style={{ color: 'red', textAlign: 'center' }}>{formError}</p>}
        {formSuccess && <p style={{ color: 'green', textAlign: 'center' }}>{formSuccess}</p>}
      </form>
    </section>
  );
};

export default CadastroReceitaForm;
