import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { getItensReceitaById, getReceitas, withdrawPrescription } from "@/Components/data/lista-receitas";
import { Edit } from "lucide-react";
import { Button } from "@/Components/ui/button";
import FiltroReceitaEstoque from "./FiltroReceitaEstoque";

export default function TableReceitasEstoque() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [incorrectItems, setIncorrectItems] = useState([]); // Novo estado para itens incorretos
  const rowsPerPage = 6;

  const fetchData = async (filters = {}) => {
    setIsLoading(true);
    try {
      const fetchedProducts = await getReceitas({ ...filters, filterPendent: true });
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

  const handleDialogOpen = async (product) => {
    setIncorrectItems([])
    setFeedback()
    try {
      const receitaDetalhada = await getItensReceitaById(product.id);
      setSelectedProduct(receitaDetalhada);
    } catch (error) {
      console.error("Error fetching detailed prescription:", error);
      setSelectedProduct(null);
    }
  };

  const handleFilter = (filters) => {
    fetchData(filters);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const handleRetirarClick = async () => {
    if (!selectedProduct) return;

    try {
      const employeeId = localStorage.getItem('employeeId');

        if (!employeeId || employeeId === "null") {
            setFormError('Erro: ID do funcionário não encontrado.');
            return;
        }
      const stockRoomId = 1; // Defina o ID da sala de estoque conforme necessário
      const prescriptionId = selectedProduct.id; // ID da prescrição selecionada
      const takeOutResponsibleId = employeeId; // Defina o ID do responsável pela retirada

      await withdrawPrescription({ stockRoomId, prescriptionId, takeOutResponsibleId });
      setFeedback("Itens validados com sucesso, retirada concluída!");
      setIncorrectItems([]); // Limpa os itens incorretos em caso de sucesso
      setTimeout(() =>{
        fetchData();
      },2000)
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setFeedback("Erro na validação: Os medicamentos retirados não estão de acordo com a receita.");
        setIncorrectItems(error.response.data.data); // Armazena os itens incorretos
      } else {
        setFeedback("Erro inesperado na validação.");
      }
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  return (
    <>
      <FiltroReceitaEstoque onFilter={handleFilter} />
      <div className="p-6 max-w-4xl space-y-4">
        <div className="border rounded-lg p-4">
          <Table>
            <TableHeader>
              <TableHead>Id</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Data Emissão</TableHead>
              <TableHead>Status</TableHead>
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
                    <TableCell>{product.date || "Data não disponível"}</TableCell>
                    <TableCell>{product.status}</TableCell>

                    {/* DIALOG */}
                    <Dialog onOpenChange={(isOpen) => isOpen && handleDialogOpen(product)}>
                      <DialogTrigger>
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
                              {/* TABELA DE ITENS INCORRETOS, SE HOUVER */}
                              {incorrectItems.length > 0 && (
                                <div className="mt-4">
                                  <h3 className="text-lg font-medium text-red-500">Itens Retirados Incorretamente</h3>
                                  <Table>
                                    <TableHeader>
                                      <TableHead>ID</TableHead>
                                      <TableHead>Nome</TableHead>
                                      <TableHead>Dosagem</TableHead>
                                      <TableHead>Unidade</TableHead>
                                      <TableHead>Mensagem</TableHead>
                                    </TableHeader>
                                    <TableBody>
                                      {incorrectItems.map((item) => (
                                        <TableRow key={item.id}>
                                          <TableCell>{item.id}</TableCell>
                                          <TableCell>{item.name}</TableCell>
                                          <TableCell>{item.dosage}</TableCell>
                                          <TableCell>{item.measure}</TableCell>
                                          <TableCell>{item.message}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              )}
                            </div>
                            <DialogFooter>
                              <DialogClose>
                                <Button variant="outline">Fechar</Button>
                              </DialogClose>
                              <Dialog>

                                {product.status != "Concluído" && (
                                  <DialogTrigger>
                                    <Button>Retirar receita</Button>
                                  </DialogTrigger>

                                )}
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Deseja fazer a retirada?</DialogTitle>
                                    <DialogDescription>
                                      Valide os remédios da receita com os que foram retirados da estante!
                                    </DialogDescription>
                                  </DialogHeader>

                                  {feedback && (
                                    <div className={`text-center my-4 ${feedback.includes("sucesso") ? "text-green-500" : "text-red-500"}`}>
                                      {feedback}
                                    </div>
                                  )}

                                  <DialogFooter>
                                    <DialogClose>
                                      <Button variant="outline">Fechar</Button>
                                    </DialogClose>
                                    <Button onClick={handleRetirarClick}>Validar</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
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
