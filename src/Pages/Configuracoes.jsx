import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import SidebarMenu from "../Components/Sidebar/index"
import ModalPages from "@/Components/MoldalPages"
import CadastroPaciente from "@/Components/CadastroPaciente/CadastroPaciente"
import CadastroFuncionario from "@/Components/CadastroFuncionario/CadastroFuncionario"
import TableCadastros from "@/Components/tables/Table-cadastros/TableCadastros"
import '../App.css';
import style from './Navbar.module.css';
import CadastroPermissao from "@/Components/CadastroPermissao/CadastroPermissao"
import CadastroPaginaForm from "@/Components/Cadastro Página/CadastroPaginaForm"
import CadastroCargo from "@/Components/Cadastro Cargo/CadastroCargo"


export default function Configuracoes(){
    return (
        <div className="flex mx-auto space-y-4 w-full">
            <SidebarMenu/>
            <div className="block w-full">
                    <Tabs defaultValue='permissoes' className='ml-5'>
                        <ModalPages>
                            <TabsList className='ml-6 p-6'>
                                <TabsTrigger className={style.textoNav} value="permissoes">Permissões</TabsTrigger>
                                <TabsTrigger className={style.textoNav} value="paginas">Páginas</TabsTrigger>
                                <TabsTrigger className={style.textoNav} value="cargo">Cargos</TabsTrigger>
                            </TabsList>
                        </ModalPages>
                        <TabsContent value='permissoes'>
                            <CadastroPermissao />
                        </TabsContent>
                        <TabsContent value='paginas'>
                            <CadastroPaginaForm/>
                        </TabsContent>
                        <TabsContent value='cargo'>
                            <CadastroCargo />
                        </TabsContent>
                    </Tabs>
            </div>
        </div>
    )
}