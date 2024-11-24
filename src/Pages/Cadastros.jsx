import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import SidebarMenu from "../Components/Sidebar/index"
import ModalPages from "@/Components/MoldalPages"
import CadastroPaciente from "@/Components/CadastroPaciente/CadastroPaciente"
import CadastroFuncionario from "@/Components/CadastroFuncionario/CadastroFuncionario"
import TableCadastros from "@/Components/tables/Table-cadastros/TableCadastros"
import '../App.css';
import style from './Navbar.module.css';
import ExpImpPacientes from "@/Components/ImpExpPacientes/ExpImpPacientes"
import ExpImpFuncionarios from "@/Components/ImpExpFuncionarios/ExpImpFuncionarios"


export default function Cadastros(){
    return (
        <div className="flex mx-auto space-y-4 w-full">
            <SidebarMenu/>
            <div className="block w-full">
                    <Tabs defaultValue='paciente' className='ml-5'>
                        <ModalPages>
                            <TabsList className='ml-6 p-6'>
                                <TabsTrigger className={style.textoNav} value="paciente">Pacientes</TabsTrigger>
                                <TabsTrigger className={style.textoNav} value="funcionarios">Funcionarios</TabsTrigger>
                                <TabsTrigger className={style.textoNav} value="listaPessoas">Lista</TabsTrigger>
                                <TabsTrigger className={style.textoNav} value="exp-imp-pacientes">Imp/Exp Pacientes</TabsTrigger>
                                <TabsTrigger className={style.textoNav} value="exp-imp-funcionarios">Imp/Exp Funcionarios</TabsTrigger>
                            </TabsList>
                        </ModalPages>
                        <TabsContent value='paciente'>
                            <CadastroPaciente/>
                        </TabsContent>
                        <TabsContent value='funcionarios'>
                            <CadastroFuncionario/>
                        </TabsContent>
                        <TabsContent value='listaPessoas'>
                            <h1 className="title2">Cadastros</h1>
                            <TableCadastros/>
                        </TabsContent>
                        <TabsContent value='exp-imp-pacientes'>
                            <h1 className="title2">Exp/Imp - Pacientes</h1>
                            <ExpImpPacientes/>
                        </TabsContent>
                        <TabsContent value='exp-imp-funcionarios'>
                            <h1 className="title2">Exp/Imp - Funcionarios</h1>
                            <ExpImpFuncionarios/>
                        </TabsContent>
                    </Tabs>
            </div>
        </div>
    )
}