import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook de navegação
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { getReceitas } from "@/Components/data/lista-receitas";
import { Edit, Package } from "lucide-react";
import { Button } from "@/Components/ui/button";

export default function TableReceitasEstoque() {
  const [products, setProducts] = useState([]); // State for fetched products
  const [isLoading, setIsLoading] = useState(false); // Loading state for feedback
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for editing
  const rowsPerPage = 6; // Number of items per page

  const navigate = useNavigate(); // Cria o hook de navegação

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedProducts = await getReceitas();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Fetch data on component mount

  const totalPages = Math.ceil(products.length / rowsPerPage); // Calculate total pages

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleRedirect = (product) => {
    // Redireciona para a página de destino com o produto como estado
    navigate('/retirada', { state: { product } });
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex); // Slice products for current page

  return (
    <div className="p-6 max-w-4xl space-y-4">
      <div className="border rounded-lg p-4">
        <Table>
          <TableHeader>
            <TableHead>Id</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Data Emissão</TableHead>
            <TableHead>Visualizar</TableHead>
            <TableHead>Retirar</TableHead>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow key="loading">
                <TableCell colSpan={5}>Carregando Receitas...</TableCell>
              </TableRow>
            ) : products.length > 0 ? (
              paginatedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.cpf}</TableCell>
                  <TableCell>{product.data}</TableCell>

                  {/* DIALOG */}

                  <Dialog>
                    <DialogTrigger>
                      <TableCell>
                        <Edit className="w-4 cursor-pointer"/>
                      </TableCell>
                    </DialogTrigger>
                    <DialogContent className='max-w-4xl' >
                      <DialogHeader>
                        <DialogTitle>Receita médica</DialogTitle>
                        <DialogDescription className="space-x-10">
                          <span>Data emissão: {product.data}</span>
                          <span>Local: {product.local}</span>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Paciente / CPF
                          </Label>
                          <Input id="name" value={product.name} readOnly className="col-span-2"/>
                          <Input id="cpf" value={product.cpf} readOnly className="col-span-1" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="nameMedico" className="text-right">
                            Médico / CRM
                          </Label>
                          <Input id="nameMedico" value={product.nomeMedico} readOnly className="col-span-2" />
                          <Input id="CRM" value={product.CRM} readOnly className="col-span-1" />
                        </div>
                        {/* TABELA DE ITENS DA RECEITA */}
                        <div className="mt-4">
                          <h3 className="text-lg font-medium">Itens da Receita</h3>
                          <div className="max-h-60 overflow-y-auto"> {/* Define height and scroll */}
                            <Table>
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
                      </div>
                      <DialogFooter>
                        <DialogClose>
                          <Button>Fechar</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <TableCell>
                    <Package className="w-5 h-5 cursor-pointer" onClick={() => handleRedirect(product)}/>
                  </TableCell>
                </TableRow>

                
              ))
            ) : (
              <TableRow key="no-results">
                <TableCell colSpan={5}>Nenhuma receita encontrada.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && ( // Only show pagination if there are multiple pages
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  href="#"
                />
              </PaginationItem>
            )}
            {[...Array(totalPages)].map((_, pageIndex) => (
              <PaginationItem key={pageIndex + 1}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === pageIndex + 1}
                  onClick={() => handlePageChange(pageIndex + 1)}
                >
                  {pageIndex + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  href="#"
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
