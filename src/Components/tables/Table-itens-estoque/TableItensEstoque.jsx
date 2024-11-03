import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import FiltrosItensEstoque from "./FiltrosItensEstoque";

import { useState, useEffect } from "react";
import { getItensEstoque } from "@/Components/data/lista-itens-estoque";




export default function TableItensEstoque(){

const [products, setProducts] = useState([]); // State for fetched products
const [isLoading, setIsLoading] = useState(false); // Loading state for feedback
const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
const rowsPerPage = 5; // Number of items per page

useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const fetchedProducts = await getItensEstoque();
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
              <FiltrosItensEstoque />
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
                      <TableCell colSpan={3}>Carregando Receitas...</TableCell>
                  </TableRow>
                  ) : products.length > 0 ? (
                  paginatedProducts.map((product, i) => (
                      <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.dosagem}</TableCell>
                      <TableCell>{product.qtd}</TableCell>
                      <TableCell>{product.sala}</TableCell>
                      </TableRow>
                  ))
                  ) : (
                  <TableRow key="no-results">
                      <TableCell colSpan={3}>Nenhuma receita encontrada.</TableCell>
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