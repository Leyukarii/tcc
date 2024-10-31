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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import ProdutsFilters from "./FiltrosCadastros";

import { useState, useEffect } from "react";
import { getCadastros } from "@/Components/data/lista-cadastros";
import { Edit } from "lucide-react";




export default function TableCadastros(){

  const [products, setProducts] = useState([]); // State for fetched products
  const [isLoading, setIsLoading] = useState(false); // Loading state for feedback
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const rowsPerPage = 6; // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedProducts = await getCadastros();
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

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex); // Slice products for current page
    return(
        <div className="p-6 max-w-4xl space-y-4">
    
            <div className="flex items-center justify-between">
                <ProdutsFilters />
            </div>

            <div className="border rounded-lg p-4">
                <Table>
                <TableHeader>
                    <TableHead>Id</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead></TableHead>
                </TableHeader>

                <TableBody>
                    {isLoading ? (
                    <TableRow key="loading">
                        <TableCell colSpan={3}>Carregando pessoas cadastradas...</TableCell>
                    </TableRow>
                    ) : products.length > 0 ? (
                    paginatedProducts.map((product, i) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.cpf}</TableCell>
                            <TableCell>{product.tipo}</TableCell>
                            {/* Criando o pop-up do edit */}
                            <Dialog>
                              <DialogTrigger>
                                <TableCell><Edit className="w-4 cursor-pointer"/></TableCell>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Editar Usuário ({product.tipo})</DialogTitle>
                                  <DialogDescription>
                                    Faça alterações aqui. Clique em salvar quando terminar.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                      Nome
                                    </Label>
                                    <Input id="name" value={product.name} className="col-span-3" />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="CPF" className="text-right">
                                      CPF
                                    </Label>
                                    <Input id="CPF" value={product.cpf} className="col-span-3" />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                    Email
                                    </Label>
                                    <Input id="CPF" value={product.email} className="col-span-3" />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="nascimento" className="text-right">
                                      Nascido em
                                    </Label>
                                    <Input id="nascimento" value={product.dataNascimento} className="col-span-3" />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="telefone" className="text-right">
                                      Telefone
                                    </Label>
                                    <Input id="telefone" value={product.telefone} className="col-span-3" />
                                  </div>

                                  {product.tipo === "Medico" &&
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="CRM" className="text-right">
                                      CRM
                                      </Label>
                                      <Input id="CRM" value={product.CRM} className="col-span-3" />
                                    </div>
                                  }
                                  {product.tipo != "Paciente" &&
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="responsavel" className="text-right">
                                      Responsável
                                      </Label>
                                      <Input id="responsavel" value={product.emailResponsavel} className="col-span-3" />
                                    </div>
                                  }

                                </div>
                                <DialogFooter>
                                  <Button type="submit">Save changes</Button>
                                </DialogFooter>
                              </DialogContent>

                            </Dialog>
                        </TableRow>
                    ))
                    ) : (
                    <TableRow key="no-results">
                        <TableCell colSpan={3}>Nenhuma pessoa encontrada.</TableCell>
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
                        <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} href="#" />
                    </PaginationItem>
                    )}
                    {[...Array(totalPages)].map((_, pageIndex) => (
                    <PaginationItem key={pageIndex + 1}>
                        <PaginationLink href="#" isActive={currentPage === pageIndex + 1} onClick={() => handlePageChange(pageIndex + 1)}>
                        {pageIndex + 1}
                        </PaginationLink>
                    </PaginationItem>
                    ))}
                    {currentPage < totalPages && (
                    <PaginationItem>
                        <PaginationNext onClick={() => handlePageChange(currentPage + 1)} href="#" />
                    </PaginationItem>
                    )}
                </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}