
import useForm from "@/Hooks/useForm";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function FiltrosCadastros() {

    return(
        <form className="flex items-center gap-2">
            <Input placeholder="CPF" id="id"/>
            <Input placeholder="Nome" id="name"/>
            <Button type="submit" variant="secondary" >
              <Search className="w-4 h-4 mr-2"/>
              Filtrar Resultados
            </Button>
        </form>
    )
}