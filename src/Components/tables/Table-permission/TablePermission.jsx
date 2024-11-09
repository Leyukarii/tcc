import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { useState, useEffect } from "react";
import { Edit } from "lucide-react";
import { getPermissions } from "@/Components/data/permission";

export default function TablePermissions() {
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const rowsPerPage = 6;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const fetchedPermissions = await getPermissions();
      setPermissions(fetchedPermissions);
    } catch (error) {
      console.error("Erro ao buscar permissões:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPages = Math.ceil(permissions.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleEditClick = (permission) => {
    setFeedback('');
    setSelectedPermission(permission);
  };

  const handleDelete = async () => {
    if (selectedPermission) {
      const result = await deletePermission(selectedPermission.id); // Implement this function
      if (result.success) {
        setSelectedPermission(null);
        fetchData();
      } else {
        console.error(result.message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSelectedPermission((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveChanges = async () => {
    if (!selectedPermission) return;

    const result = await updatePermission(selectedPermission); // Implement this function
    if (result.success) {
      setFeedback("Permissão atualizada com sucesso!");
      await fetchData();
      setSelectedPermission(null);
    } else {
      console.error(result.message);
      setFeedback("Erro ao atualizar a permissão.");
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedPermissions = Array.isArray(permissions) ? permissions.slice(startIndex, endIndex) : [];

  return (
    <div className="p-6 max-w-4xl space-y-4">
      <div className="border rounded-lg p-4">
        <Table>
          <TableHeader>
            <TableHead>Id</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead></TableHead>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow key="loading">
                <TableCell colSpan={3}>Carregando permissões...</TableCell>
              </TableRow>
            ) : permissions.length > 0 ? (
              paginatedPermissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell>{permission.id}</TableCell>
                  <TableCell>{permission.name}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger onClick={() => handleEditClick(permission)}>
                        <Edit className="w-4 cursor-pointer" />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Permissão</DialogTitle>
                          <DialogDescription>
                            Faça alterações aqui. Clique em salvar quando terminar.
                          </DialogDescription>
                        </DialogHeader>
                        {selectedPermission && (
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">Nome</Label>
                              <Input id="name" value={selectedPermission.name || ''} onChange={handleInputChange} className="col-span-3" />
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
                <TableCell colSpan={3}>Nenhuma permissão encontrada.</TableCell>
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
