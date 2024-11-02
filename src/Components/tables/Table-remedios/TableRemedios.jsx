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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { getItensRemedios } from "@/Components/data/lista-remedios";
import api from "@/axios/config"; // Certifique-se de que está importando a configuração da API corretamente
import { Edit } from "lucide-react";
import { Button } from "@/Components/ui/button";

export default function TableRemedios({ refresh }) {
  const [products, setProducts] = useState([]); // State for fetched products
  const [isLoading, setIsLoading] = useState(false); // Loading state for feedback
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for editing
  const rowsPerPage = 6; // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedProducts = await getItensRemedios();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refresh]); // Fetch data on component mount and on refresh

  const totalPages = Math.ceil(products.length / rowsPerPage); // Calculate total pages

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleEditClick = (product) => {
    setSelectedProduct({ ...product }); // Create a copy of the product to edit
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSelectedProduct((prev) => ({ ...prev, [id]: value })); // Update selected product's specific field
  };

  const handleSaveChanges = () => {
    // Optionally update the products list with the edited product here
    setSelectedProduct(null); // Close Dialog after saving
  };

  const handleDelete = async () => {
    if (selectedProduct) {
      try {
        await api.delete(`/Medicament/${selectedProduct.id}`); // Ajuste o endpoint conforme necessário
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== selectedProduct.id)
        );
        setSelectedProduct(null); // Fechar o diálogo após exclusão
      } catch (error) {
        console.error("Erro ao deletar o produto:", error);
      }
    }
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
            <TableHead>Dosagem</TableHead>
            <TableHead>Uni Medida</TableHead>
            <TableHead>Editar</TableHead>
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
                  <TableCell>{product.dosagem}</TableCell>
                  <TableCell>{product.uniMedida}</TableCell>

                  {/* DIALOG */}
                  <Dialog>
                    <DialogTrigger onClick={() => handleEditClick(product)}>
                      <TableCell>
                        <Edit className="w-4 cursor-pointer" />
                      </TableCell>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Remédio</DialogTitle>
                        <DialogDescription>
                          Faça alterações aqui. Clique em salvar quando terminar.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Nome
                          </Label>
                          <Input
                            id="name"
                            value={selectedProduct?.name || ''}
                            onChange={handleInputChange}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="dosagem" className="text-right">
                            Dosagem
                          </Label>
                          <Input
                            id="dosagem"
                            value={selectedProduct?.dosagem || ''}
                            onChange={handleInputChange}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="uniMedida" className="text-right">
                            Uni. Medida
                          </Label>
                          <Input
                            id="uniMedida"
                            value={selectedProduct?.uniMedida || ''}
                            onChange={handleInputChange}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="destructive" onClick={handleDelete}>
                          Delete
                        </Button>
                        <Button type="button" onClick={handleSaveChanges}>
                          Save changes
                        </Button>
                      </DialogFooter>
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
                <PaginationNext onClick={() => handlePageChange(currentPage + 1)} href="#" />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
