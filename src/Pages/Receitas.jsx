import CadastroRemedio from "@/Components/CadastroRemedios/CadastroRemedio";
import ModalPages from "@/Components/MoldalPages";
import CadastroReceita from "@/Components/NovaReceita/CadastroReceita";
import SidebarMenu from "@/Components/Sidebar";
import TableReceitas from "@/Components/tables/Table-receitas/TableReceitas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";

export default function Receitas(){
    return (
        <div className="flex mx-auto space-y-4 w-full">
            <SidebarMenu/>
            <div className="block w-full">
                    <Tabs defaultValue='paciente' className='ml-5'>
                        <ModalPages>
                            <TabsList className='ml-6 p-6'>
                                <TabsTrigger value="paciente">Nova Receita</TabsTrigger>
                                <TabsTrigger value="funcionarios">Lista de Receitas</TabsTrigger>
                                <TabsTrigger value="addRemedio">Cadastrar Remédio</TabsTrigger>
                                
                            </TabsList>
                        </ModalPages>
                        <TabsContent value='paciente'>
                            <CadastroReceita/>
                        </TabsContent>
                        <TabsContent value='funcionarios'>
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