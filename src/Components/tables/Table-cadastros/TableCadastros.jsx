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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import ProdutsFilters from "./FiltrosCadastros";

import { useState, useEffect } from "react";
import { getCadastros,getCadastroById, deleteCadastro  } from "@/Components/data/lista-cadastros";
import { Edit } from "lucide-react";

export default function TableCadastros() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const rowsPerPage = 6;

  const fetchData = async (filters = {}) => {
    setIsLoading(true);
    try {
      const fetchedProducts = await getCadastros(filters);
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = (filters) => {
    fetchData(filters);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const totalPages = Math.ceil(products.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleEditClick = async (product) => {
    try {
      const detailedProduct = await getCadastroById(product.cpf,product.role);
      setSelectedProduct(detailedProduct);
    } catch (error) {
      console.error("Erro ao buscar os detalhes do produto:", error);
    }
  };

  const handleDelete = async () => {
    if (selectedProduct) {
      const result = await deleteCadastro(selectedProduct.id,selectedProduct.role);
      if (result.success) {
        setSelectedProduct(null); // Limpa o produto selecionado
        fetchData();
      } else {
        console.error(result.message);
      }
    }
  };


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSelectedProduct((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveChanges = () => {
    setSelectedProduct(null);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  return (
    <div className="p-6 max-w-4xl space-y-4">
      <div className="flex items-center justify-between">
        <ProdutsFilters onFilter={handleFilter} />
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
              paginatedProducts.map((product) => (
                <TableRow key={product.uniqueId}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.cpf}</TableCell>
                  <TableCell>{product.role}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger onClick={() => handleEditClick(product)}>
                        <Edit className="w-4 cursor-pointer" />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Usuário ({product.role})</DialogTitle>
                          <DialogDescription>
                            Faça alterações aqui. Clique em salvar quando terminar. 
                          </DialogDescription>
                        </DialogHeader>
                        {selectedProduct && (
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">Nome</Label>
                              <Input id="name" value={selectedProduct.name || ''} onChange={handleInputChange} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="cpf" className="text-right">CPF</Label>
                              <Input id="cpf" value={selectedProduct.cpf || ''} onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                const formattedCPF = value.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                                handleInputChange({ target: { id: 'cpf', value: formattedCPF } });
                              }} maxLength={14} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="email" className="text-right">Email</Label>
                              <Input id="email" value={selectedProduct.email || ''} onChange={handleInputChange} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="dataNascimento" className="text-right">Nascido em</Label>
                              <Input id="dataNascimento" value={selectedProduct.dataNascimento || ''} onChange={handleInputChange} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="telefone" className="text-right">Telefone</Label>
                              <Input id="telefone" value={selectedProduct.telefone || ''} onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                const formattedPhone = value.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 15);
                                handleInputChange({ target: { id: 'telefone', value: formattedPhone } });
                              }} maxLength={15} className="col-span-3" />
                            </div>
                            {selectedProduct.role === "médico" && (
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="CRM" className="text-right">CRM</Label>
                                <Input id="CRM" value={selectedProduct.CRM || ''} onChange={handleInputChange} className="col-span-3" />
                              </div>
                            )}
                            {selectedProduct.role !== "patient" ? (
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="emailResponsavel" className="text-right">Responsável</Label>
                                <Input id="emailResponsavel" value={selectedProduct.emailResponsavel || ''} onChange={handleInputChange} className="col-span-3" />
                              </div>
                            ) : (
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="emailResponsavel" className="text-right">Observação</Label>
                                <Input id="Observação" value={selectedProduct.obs || ''} 
                                onChange={handleInputChange} className="col-span-3" />
                              </div>)
                            }
                          </div>
                        )}
                        <DialogFooter>
                          <Button type="button" variant="destructive" onClick={handleDelete}>Delete</Button>
                          <Button type="button" onClick={handleSaveChanges}>Save changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
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
  );
}
