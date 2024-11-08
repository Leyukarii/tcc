import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import FiltrosItensEstoque from "./FiltrosItensEstoque";
import { useState, useEffect } from "react";
import { getItensEstoque } from "@/Components/data/lista-itens-estoque";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";

export default function TableItensEstoque() {
  const [products, setProducts] = useState([]); // State for fetched products
  const [isLoading, setIsLoading] = useState(false); // Loading state for feedback
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const rowsPerPage = 5; // Number of items per page

  const fetchData = async (filters = {}) => {
    setIsLoading(true);
    try {
      const fetchedProducts = await getItensEstoque(filters);
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

  const totalPages = Math.ceil(products.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFilter = (filters) => {
    fetchData(filters);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  return (
    <div className="p-6 max-w-4xl space-y-4">
      <div className="flex items-center justify-between">
        <FiltrosItensEstoque onFilter={handleFilter} />
      </div>
      <div className="border rounded-lg p-4">
        <Table>
          <TableHeader>
            <TableHead>Nome</TableHead>
            <TableHead>Dosagem</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Sala</TableHead>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow key="loading">
                <TableCell colSpan={4}>Carregando Itens de Estoque...</TableCell>
              </TableRow>
            ) : products.length > 0 ? (
              paginatedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.dosagem}</TableCell>
                  <TableCell>{product.qtd}</TableCell>
                  <TableCell>{product.sala}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow key="no-results">
                <TableCell colSpan={4}>Nenhum item encontrado.</TableCell>
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
