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
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { getItensRemedios, updateMedicament } from "@/Components/data/lista-remedios";
import api from "@/axios/config";
import { Edit } from "lucide-react";
import { Button } from "@/Components/ui/button";

export default function TableRemedios({ refresh }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const rowsPerPage = 6;

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
  }, [refresh]);

  const totalPages = Math.ceil(products.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleEditClick = (product) => {
    setSelectedProduct({ ...product });
    setSuccessMessage(""); // Reset the success message on edit click
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSelectedProduct((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveChanges = async () => {
    if (!selectedProduct) return;

    try {
      const response = await updateMedicament(selectedProduct.id, {
        description: selectedProduct.description,
        dosage: selectedProduct.dosage,
        measure: selectedProduct.measure,
      });

      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === selectedProduct.id ? selectedProduct : product
          )
        );
        setSuccessMessage("Cadastro atualizado com sucesso!"); // Display success message
      } else {
        console.error("Erro ao atualizar o medicamento:", response);
      }
    } catch (error) {
      console.error("Erro ao atualizar o medicamento:", error);
    }
  };

  const handleDelete = async () => {
    if (selectedProduct) {
      try {
        await api.delete(`/Medicament/${selectedProduct.id}`);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== selectedProduct.id)
        );
        setSelectedProduct(null); // Close the dialog after deletion
      } catch (error) {
        console.error("Erro ao deletar o produto:", error);
      }
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

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
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.dosage}</TableCell>
                  <TableCell>{product.measure}</TableCell>

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
                          <Label htmlFor="description" className="text-right">
                            Nome
                          </Label>
                          <Input
                            id="description"
                            value={selectedProduct?.description || ''}
                            onChange={handleInputChange}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="dosage" className="text-right">
                            Dosagem
                          </Label>
                          <Input
                            id="dosage"
                            value={selectedProduct?.dosage || ''}
                            onChange={handleInputChange}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="measure" className="text-right">
                            Uni. Medida
                          </Label>
                          <Input
                            id="measure"
                            value={selectedProduct?.measure || ''}
                            onChange={handleInputChange}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        {successMessage && (
                          <p className="text-green-500 text-center col-span-4">
                            {successMessage}
                          </p>
                        )}
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
