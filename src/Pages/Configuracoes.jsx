import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import SidebarMenu from "../Components/Sidebar/index"
import ModalPages from "@/Components/MoldalPages"
import CadastroPaciente from "@/Components/CadastroPaciente/CadastroPaciente"
import CadastroFuncionario from "@/Components/CadastroFuncionario/CadastroFuncionario"
import TableCadastros from "@/Components/tables/Table-cadastros/TableCadastros"
import '../App.css';
import style from './Navbar.module.css';
import CadastroPermissao from "@/Components/CadastroPermissao/CadastroPermissao"


export default function Configuracoes(){
    return (
        <div className="flex mx-auto space-y-4 w-full">
            <SidebarMenu/>
            <div className="block w-full">
                    <Tabs defaultValue='permissoes' className='ml-5'>
                        <ModalPages>
                            <TabsList className='ml-6 p-6'>
                                <TabsTrigger className={style.textoNav} value="permissoes">Permissões</TabsTrigger>
                                <TabsTrigger className={style.textoNav} value="funcionarios">Funcionarios</TabsTrigger>
                                <TabsTrigger className={style.textoNav} value="listaPessoas">Lista</TabsTrigger>
                            </TabsList>
                        </ModalPages>
                        <TabsContent value='permissoes'>
                            <CadastroPermissao />
                        </TabsContent>
                        <TabsContent value='funcionarios'>
                            <CadastroFuncionario/>
                        </TabsContent>
                        <TabsContent value='listaPessoas'>
                            <h1 className="title2">Cadastros</h1>
                            <TableCadastros/>
                        </TabsContent>
                    </Tabs>
            </div>
        </div>
    )
}