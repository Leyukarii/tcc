import CadastroRemedio from "@/Components/CadastroRemedios/CadastroRemedio";
import ModalPages from "@/Components/MoldalPages";
import CadastroReceita from "@/Components/NovaReceita/CadastroReceita";
import SidebarMenu from "@/Components/Sidebar";
import TableReceitas from "@/Components/tables/Table-receitas/TableReceitas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import style from './Navbar.module.css'

export default function Receitas(){
    return (
        <div className="flex mx-auto space-y-4 w-full">
            <SidebarMenu/>
            <div className="block w-full">
                    <Tabs defaultValue='paciente' className='ml-5'>
                        <ModalPages>
                            <TabsList className='ml-6 p-6'>
                                <TabsTrigger className={style.textoNav} value="paciente">Nova Receita</TabsTrigger>
                                <TabsTrigger className={style.textoNav} value="funcionarios">Lista de Receitas</TabsTrigger>
                                <TabsTrigger className={style.textoNav} value="addRemedio">Cadastrar Remédio</TabsTrigger>
                                
                            </TabsList>
                        </ModalPages>
                        <TabsContent value='paciente'>
                            <CadastroReceita/>
                        </TabsContent>
                        <TabsContent value='funcionarios'>
                            <h1 className="title2">Cadastros</h1>
                            <TableReceitas />
                        </TabsContent>
                        <TabsContent value='addRemedio'>
                            <CadastroRemedio/>
                        </TabsContent>
                    </Tabs>
            </div>
        </div> 
    )
} 