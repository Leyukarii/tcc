import SidebarMenu from "@/Components/Sidebar";
import { useLocation } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/Components/ui/button";

export default function RetiradaEstoque() {
  const location = useLocation();
  const { product } = location.state || {}; // Extrai o produto do estado

  return (
    <div className="flex mx-auto space-y-4 w-full">
      <SidebarMenu />
      <div className="block m-2 w-full">
        <h1 className="title">Itens da Receita</h1>
        {product ? (
          <div>
            
            {/* Tabela para exibir os itens da receita */}
            <div className="mt-4">
              <Table className='bg-zinc-100'>
                <TableHeader>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome do Remédio</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Descrição</TableHead>
                </TableHeader>
                <TableBody>
                  {product.itens.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.nomeRemedio}</TableCell>
                      <TableCell>{item.qtd}</TableCell>
                      <TableCell>{item.descricao}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <p>Produto não encontrado.</p>
        )}

        <div className="flex justify-center mt-10">
            <Button>Validar</Button>
        </div>

      </div>
    </div>
  );
}
