import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { useState, useEffect } from "react";
import { Edit } from "lucide-react";
import { getStockRooms } from "@/Components/data/lista-stockroom"; // Certifique-se do caminho correto

export default function TableStockRooms() {
  const [stockRooms, setStockRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null); 
  const [feedback, setFeedback] = useState(null);

  const rowsPerPage = 6;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const fetchedStockRooms = await getStockRooms();
      setStockRooms(fetchedStockRooms);
    } catch (error) {
      console.error("Erro ao buscar salas de estoque:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPages = Math.ceil(stockRooms.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleEditClick = (room) => {
    setFeedback('');
    setSelectedRoom(room);
  };

  const handleDelete = async () => {
    if (selectedRoom) {
      const result = await deleteStockRoom(selectedRoom.id); // Função para deletar a sala (a ser implementada)
      if (result.success) {
        setSelectedRoom(null); // Limpa a sala selecionada
        fetchData();
      } else {
        console.error(result.message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSelectedRoom((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveChanges = async () => {
    if (!selectedRoom) return;

    const result = await updateStockRoom(selectedRoom); // Função para atualizar a sala (a ser implementada)
    if (result.success) {
      setFeedback("Sala atualizada com sucesso!");
      await fetchData();
      setSelectedRoom(null);
    } else {
      console.error(result.message);
      setFeedback("Erro ao atualizar a sala.");
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedStockRooms = Array.isArray(stockRooms) ? stockRooms.slice(startIndex, endIndex) : [];

  return (
    <div className="p-6 max-w-4xl space-y-4">
      <div className="border rounded-lg p-4">
        <Table>
          <TableHeader>
            <TableHead>Id</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Andar</TableHead>
            <TableHead></TableHead>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow key="loading">
                <TableCell colSpan={4}>Carregando salas de estoque...</TableCell>
              </TableRow>
            ) : stockRooms.length > 0 ? (
              paginatedStockRooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>{room.id}</TableCell>
                  <TableCell>{room.name}</TableCell>
                  <TableCell>{room.address}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger onClick={() => handleEditClick(room)}>
                        <Edit className="w-4 cursor-pointer" />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Sala de Estoque</DialogTitle>
                          <DialogDescription>
                            Faça alterações aqui. Clique em salvar quando terminar.
                          </DialogDescription>
                        </DialogHeader>
                        {selectedRoom && (
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">Nome</Label>
                              <Input id="name" value={selectedRoom.name || ''} onChange={handleInputChange} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="address" className="text-right">Andar</Label>
                              <Input id="address" value={selectedRoom.address || ''} onChange={handleInputChange} className="col-span-3" />
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
                <TableCell colSpan={4}>Nenhuma sala encontrada.</TableCell>
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
