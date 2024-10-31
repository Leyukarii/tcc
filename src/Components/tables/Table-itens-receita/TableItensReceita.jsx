import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";

import { useState, useEffect } from "react";
import { getItensReceita } from "@/Components/data/lista-itens-receita";
import { Input } from "@/Components/ui/input";
import { CheckCircle2 } from "lucide-react";


export default function TableItensReceita({itens =[]}){

  // const [products, setProducts] = useState([]); // State for fetched products
  // const [isLoading, setIsLoading] = useState(false); // Loading state for feedback

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const fetchedProducts = await getItensReceita();
  //       setProducts(fetchedProducts);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []); // Fetch data on component mount

  return (
    <div className="max-w-4xl mx-auto space-y-4 mb-4">
      <div className="border rounded-lg p-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Remédio</TableHead>
              <TableHead>Qtd</TableHead>
              <TableHead>Descrição</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {itens.length > 0 ? (
              itens.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name || 'Remédio'}</TableCell>
                  <TableCell>{item.qtd}</TableCell>
                  <TableCell>{item.descricao}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow key="no-results">
                <TableCell colSpan={4}>Nenhuma receita encontrada.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}