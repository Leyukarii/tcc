import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { useState, useEffect } from "react";
import { Edit } from "lucide-react";
import { getPages } from "@/Components/data/lista-pages";

export default function TablePages() {
  const [pages, setPages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPage, setSelectedPage] = useState(null); 
  const [feedback, setFeedback] = useState(null);

  const rowsPerPage = 6;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const fetchedPages = await getPages();
      console.log("Fetched pages:", fetchedPages); // Verifique o tipo e estrutura dos dados
      setPages(fetchedPages);
    } catch (error) {
      console.error("Erro ao buscar páginas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPages = Math.ceil(pages.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleEditClick = (page) => {
    setFeedback('');
    setSelectedPage(page);
  };

  const handleDelete = async () => {
    if (selectedPage) {
      const result = await deletePage(selectedPage.id); // Função para deletar a página (a ser implementada)
      if (result.success) {
        setSelectedPage(null); // Limpa a página selecionada
        fetchData();
      } else {
        console.error(result.message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSelectedPage((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveChanges = async () => {
    if (!selectedPage) return;

    const result = await updatePage(selectedPage); // Função para atualizar a página (a ser implementada)
    if (result.success) {
      setFeedback("Página atualizada com sucesso!");
      await fetchData();
      setSelectedPage(null);
    } else {
      console.error(result.message);
      setFeedback("Erro ao atualizar a página.");
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedPages = Array.isArray(pages) ? pages.slice(startIndex, endIndex) : [];

  return (
    <div className="p-6 max-w-4xl space-y-4">
      <div className="border rounded-lg p-4">
        <Table>
          <TableHeader>
            <TableHead>Id</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead></TableHead>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow key="loading">
                <TableCell colSpan={4}>Carregando páginas...</TableCell>
              </TableRow>
            ) : pages.length > 0 ? (
              paginatedPages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell>{page.id}</TableCell>
                  <TableCell>{page.name}</TableCell>
                  <TableCell>{page.description}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger onClick={() => handleEditClick(page)}>
                        <Edit className="w-4 cursor-pointer" />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Página</DialogTitle>
                          <DialogDescription>
                            Faça alterações aqui. Clique em salvar quando terminar. 
                          </DialogDescription>
                        </DialogHeader>
                        {selectedPage && (
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">Nome</Label>
                              <Input id="name" value={selectedPage.name || ''} onChange={handleInputChange} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="description" className="text-right">Descrição</Label>
                              <Input id="description" value={selectedPage.description || ''} onChange={handleInputChange} className="col-span-3" />
                            </div>
                            {feedback && <p className="text-center my-4 text-red-500">{feedback}</p>}
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
                <TableCell colSpan={4}>Nenhuma página encontrada.</TableCell>
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
