import React, { useState, useEffect } from "react";
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
import { getItensReceitaById, getReceitas } from "@/Components/data/lista-receitas";
import { Edit } from "lucide-react";
import { Button } from "@/Components/ui/button";
import FiltroReceitas from "./FiltroReceitas";

export default function TableReceitas() {
  const [products, setProducts] = useState([]); // State for fetched products
  const [isLoading, setIsLoading] = useState(false); // Loading state for feedback
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [selectedProduct, setSelectedProduct] = useState(null); // Detailed product with items
  const rowsPerPage = 6; // Number of items per page

  const fetchData = async (filters = {}) => {
    setIsLoading(true);
    try {
      const fetchedProducts = await getReceitas(filters);
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  const totalPages = Math.ceil(products.length / rowsPerPage); // Calculate total pages

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFilter = (filters) => {
    fetchData(filters);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const handleEditClick = async (product) => {
    setIsModalOpen(true); // Open the modal

    // Fetch detailed data for the selected prescription by ID
    try {
      const fetchedProductDetails = await getItensReceitaById(product.id);
      setSelectedProduct(fetchedProductDetails); // Set detailed product with items in state
    } catch (error) {
      console.error("Error fetching detailed prescription:", error);
      setSelectedProduct(null); // Clear selected product if there's an error
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex); // Slice products for current page

  return (
    <>
      <FiltroReceitas onFilter={handleFilter} />
      <div className="p-6 max-w-4xl space-y-4">
        <div className="border rounded-lg p-4">
          <Table>
            <TableHeader>
              <TableHead>Id</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Data Emissão</TableHead>
              <TableHead>Visualizar</TableHead>
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
                    <TableCell>{product.data || "Data não disponível"}</TableCell>

                    {/* DIALOG */}
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                      <DialogTrigger onClick={() => handleEditClick(product)}>
                        <TableCell>
                          <Edit className="w-4 cursor-pointer" />
                        </TableCell>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        {selectedProduct && (
                          <>
                            <DialogHeader>
                              <DialogTitle>Receita médica</DialogTitle>
                              <DialogDescription className="space-x-10">
                                <span>Data emissão: {selectedProduct.data}</span>
                                <span>Local: {selectedProduct.local}</span>
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                  Paciente / CPF
                                </Label>
                                <Input id="name" value={selectedProduct.name} readOnly className="col-span-2" />
                                <Input id="cpf" value={selectedProduct.cpf} readOnly className="col-span-1" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="nameMedico" className="text-right">
                                  Médico / CRM
                                </Label>
                                <Input id="nameMedico" value={selectedProduct.nomeMedico} readOnly className="col-span-2" />
                                <Input id="CRM" value={selectedProduct.CRM} readOnly className="col-span-1" />
                              </div>
                              {/* TABELA DE ITENS DA RECEITA */}
                              <div className="mt-4">
                                <h3 className="text-lg font-medium">Itens da Receita</h3>
                                <div className="max-h-60 overflow-y-auto">
                                  {/* Define height and scroll */}
                                  <Table>
                                    <TableHeader>
                                      <TableHead>ID</TableHead>
                                      <TableHead>Nome do Remédio</TableHead>
                                      <TableHead>Quantidade</TableHead>
                                      <TableHead>Descrição</TableHead>
                                      <TableHead>Observação</TableHead>
                                    </TableHeader>
                                    <TableBody>
                                      {selectedProduct.itens.map((item) => (
                                        <TableRow key={item.id}>
                                          <TableCell>{item.id}</TableCell>
                                          <TableCell>{item.nomeRemedio}</TableCell>
                                          <TableCell>{item.qtd}</TableCell>
                                          <TableCell>{item.descricao}</TableCell>
                                          <TableCell>{item.observacao}</TableCell>
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
                          </>
                        )}
                      </DialogContent>
                    </Dialog>
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

        {totalPages > 1 && (
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
    </>
  );
}
