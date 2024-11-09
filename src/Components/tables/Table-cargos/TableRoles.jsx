import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { useState, useEffect } from "react";
import { Edit } from "lucide-react";
import { getRoles } from "@/Components/data/lista-roles";
import api from "@/axios/config"; // Certifique-se que essa é a instância correta

// Função deleteRole para deletar o cargo
const deleteRole = async (roleId) => {
    try {
        const response = await api.delete(`/Role/${roleId}`);
        return { success: response.status === 200 };
    } catch (error) {
        console.error("Erro ao deletar cargo:", error);
        return { success: false, message: error.message };
    }
};

export default function TableRoles() {
    const [roles, setRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRole, setSelectedRole] = useState(null); 
    const [feedback, setFeedback] = useState(null);

    const rowsPerPage = 6;

    const fetchData = async (filters = {}) => {
        setIsLoading(true);
        try {
            const fetchedRoles = await getRoles(filters);
            setRoles(fetchedRoles);
        } catch (error) {
            console.error("Erro ao buscar cargos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const totalPages = Math.ceil(roles.length / rowsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleEditClick = (role) => {
        setFeedback('');
        setSelectedRole(role);
    };

    const handleDelete = async () => {
        if (selectedRole) {
            try {
                const response = await api.delete(`/Role/${selectedRole.id}`);
                if (response.status === 200) {
                    setRoles((prevRoles) => prevRoles.filter((role) => role.id !== selectedRole.id));
                    setSelectedRole(null);
                    setFeedback("Cargo deletado com sucesso!");
                } else {
                    setFeedback("Erro ao deletar o cargo.");
                }
            } catch (error) {
                console.error("Erro ao deletar o Cargo:", error);
                setFeedback("Erro ao deletar o cargo.");
            }
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setSelectedRole((prev) => ({ ...prev, [id]: value }));
    };

    const handleSaveChanges = async () => {
        if (!selectedRole) return;
        const result = await updateRole(selectedRole); // Função para atualizar o cargo (a ser implementada)
        if (result.success) {
            setFeedback("Cargo atualizado com sucesso!");
            await fetchData();
            setSelectedRole(null);
        } else {
            console.error(result.message);
            setFeedback("Erro ao atualizar o cargo.");
        }
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedRoles = roles.slice(startIndex, endIndex);

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
                                <TableCell colSpan={3}>Carregando cargos cadastradas...</TableCell>
                            </TableRow>
                        ) : roles.length > 0 ? (
                            paginatedRoles.map((role) => (
                                <TableRow key={role.id}>
                                    <TableCell>{role.id}</TableCell>
                                    <TableCell>{role.name}</TableCell>
                                    <TableCell>
                                        <Dialog>
                                            <DialogTrigger onClick={() => handleEditClick(role)}>
                                                <Edit className="w-4 cursor-pointer" />
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Editar Cargo</DialogTitle>
                                                    <DialogDescription>
                                                        Faça alterações aqui. Clique em salvar quando terminar. 
                                                    </DialogDescription>
                                                </DialogHeader>
                                                {selectedRole && (
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="name" className="text-right">Nome</Label>
                                                            <Input id="name" value={selectedRole.name || ''} onChange={handleInputChange} className="col-span-3" />
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
                                <TableCell colSpan={3}>Nenhum cargo encontrado.</TableCell>
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
