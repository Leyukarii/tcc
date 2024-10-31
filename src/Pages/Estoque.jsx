import CadastroRemedioEstoque from "@/Components/CadastroRemedioEstoque/CadastroRemedioEstoque";
import CadastroRemedio from "@/Components/CadastroRemedios/CadastroRemedio";
import CadastroSalas from "@/Components/CadastroSalas/CadastroSalas";
import Button from "@/Components/Forms/Button";
import ModalPages from "@/Components/MoldalPages";
import SidebarMenu from "@/Components/Sidebar";
import TableItensEstoque from "@/Components/tables/Table-itens-estoque/TableItensEstoque";
import TableReceitaEstoque from "@/Components/tables/Table-receitas-estoque/TableReceitaEstoque";
import TableReceitas from "@/Components/tables/Table-receitas/TableReceitas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import style from './Navbar.module.css';
import FiltroReceitaEstoque from "@/Components/tables/Table-receitas/FiltroReceitaEstoque";
import TableReceitasEstoque from "@/Components/tables/Table-receitas/TableReceitasEstoque";
import TableRemedios from "@/Components/tables/Table-remedios/TableRemedios";

export default function Estoque(){
    return (
        <div className="flex mx-auto space-y-4 w-full">
            <SidebarMenu/>
            <div className="block">
                    <Tabs defaultValue='buscarReceita' className='ml-5'>
                        <ModalPages >
                            <TabsList className='p-4 '>
                                <TabsTrigger className={style.textoNav} value="buscarReceita">Buscar Receita</TabsTrigger>
                                <TabsTrigger className={style.textoNav} value="receitaEncontrada">Receita Encontrada</TabsTrigger>
                                <TabsTrigger className={style.textoNav} value="addRemedio">Cadastrar Remédio</TabsTrigger>
                                <TabsTrigger className={style.textoNav} value="addRemedioEstoque">Add Remédio ao Estoque</TabsTrigger>
                                <TabsTrigger className={style.textoNav} value="listaEstoque">Estoque</TabsTrigger>
                                <TabsTrigger className={style.textoNav} value="cadastroSala">Cadastro de Sala</TabsTrigger>
                            </TabsList>
                        </ModalPages>
                        <TabsContent value='buscarReceita'>
                            <h1 className="title2">Buscar Receitas</h1> 
                            <div className="w-3/4">
                                <FiltroReceitaEstoque/>
                                <TableReceitasEstoque/>

                            </div>
                        </TabsContent>
                        <TabsContent value='receitaEncontrada'>
                           
                
                            <div className="flex w-full mt-10">
                                <div className="w-full">
                                    <h1 className="title2">Itens Sobre a Mesa</h1>
                                    <TableReceitaEstoque/>
                                </div>

                                <div className="w-full">
                                    <h1 className="title2">Itens Receita</h1>
                                    <TableReceitaEstoque/>
                                </div>
                            </div>
                            
                            <div className="flex justify-center mt-8">
                                <Button>Validar remédios</Button>
                            </div>

                        </TabsContent>
                        <TabsContent value='addRemedio'>
                            <CadastroRemedio />                            
                        </TabsContent>
                        <TabsContent value='addRemedioEstoque'>
                            <CadastroRemedioEstoque />
                        </TabsContent>
                        <TabsContent value='listaEstoque'>
                            <TableItensEstoque/>
                        </TabsContent>
                        <TabsContent value='cadastroSala'>
                            <CadastroSalas />
                        </TabsContent>
                    </Tabs>
            </div>
        </div>
    )
}