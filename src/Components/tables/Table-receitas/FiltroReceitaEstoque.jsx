import Input3 from "@/Components/Forms/Input3";
import { Button } from "../../ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

export default function FiltroReceitaEstoque({ onFilter }) {
  const [cpf, setCpf] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ cpf });
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 ml-7 mt-7">
      <Input3 label="CPF:" id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} />
      <Button type="submit" variant="secondary" className="mt-2">
        <Search className="w-4 h-4 mr-2" />
        Filtrar Resultados
      </Button>
    </form>
  );
}
