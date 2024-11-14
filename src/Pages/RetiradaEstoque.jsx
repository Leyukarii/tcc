import SidebarMenu from "@/Components/Sidebar";
import { useLocation } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/Components/ui/alert-dialog"

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
            <div className="mt-4 border rounded-lg p-4 bg-zinc-50'">
              <Table >
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

    
        <AlertDialog>
            <AlertDialogTrigger asChild>
            <div className="flex justify-center mt-10">
                <Button variant="outline">Validar</Button>
            </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Os medicamentos foram retirados corretamento da estante ?</AlertDialogTitle>
                <AlertDialogDescription>
                    Retire os medicamentos informados na receita para que a retirada seja concluida.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Ainda não retirei</AlertDialogCancel>
                <AlertDialogAction>Sim</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
