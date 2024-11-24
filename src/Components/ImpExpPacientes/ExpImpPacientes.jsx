import api from "@/axios/config";
import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";

export default function ExpImpPacientes() {
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState(""); // Estado para a mensagem de sucesso
  const itemsPerPage = 5; // Número de itens por página

  const handleDownload = async () => {
    try {
      const response = await api.get("/Patient/Export", {
        responseType: "blob", // Para receber o conteúdo como um Blob
      });

      // Cria um link para o arquivo baixado
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      // Define o nome do arquivo
      link.setAttribute("download", "patients.csv");

      // Adiciona e clica no link para iniciar o download
      document.body.appendChild(link);
      link.click();

      // Remove o link após o download
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao fazer o download do arquivo:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Por favor, selecione um arquivo CSV.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/Patient/Import", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setSuccessMessage("Arquivo importado com sucesso!"); // Exibe a mensagem de sucesso
        setTimeout(() => setSuccessMessage(""), 2000); // Remove a mensagem após 2 segundos
        setErrors([]); // Limpa erros após sucesso
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.invalidEntries) {
        setErrors(error.response.data.invalidEntries);
      } else {
        alert("Ocorreu um erro ao importar o arquivo.");
      }
    }
  };

  // Paginação
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedErrors = errors.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(errors.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-7">
      <Button onClick={handleDownload}>Download CSV Pacientes</Button>
      <div className="grid w-full max-w-sm items-center gap-1.5 pt-10">
        <Label htmlFor="picture">CSV Pacientes</Label>
        <Input id="picture" type="file" onChange={handleFileChange} />
        <Button className="mt-2" onClick={handleUpload}>
          Upload CSV Pacientes
        </Button>
      </div>
      {successMessage && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}
      {errors.length > 0 && (
        <div className="pt-10">
          <h2 className="text-lg font-semibold">Erros no arquivo:</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Linha</TableHead>
                <TableHead>Erro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedErrors.map((error, index) => (
                <TableRow key={index}>
                  <TableCell>{error.line}</TableCell>
                  <TableCell>{error.error}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center pt-4">
            <Button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="mr-2"
            >
              Anterior
            </Button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="ml-2"
            >
              Próxima
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
