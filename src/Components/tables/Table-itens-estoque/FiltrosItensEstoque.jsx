import Input3 from "@/Components/Forms/Input3";
import { Button } from "../../ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

export default function FiltrosItensEstoque({ onFilter }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ name });
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input3 label="Nome Remédio:" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      <Button type="submit" variant="secondary">
        <Search className="w-4 h-4 mr-2" />
        Filtrar Resultados
      </Button>
    </form>
  );
}
