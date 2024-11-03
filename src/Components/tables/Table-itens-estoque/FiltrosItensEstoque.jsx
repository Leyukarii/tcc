import Input3 from "@/Components/Forms/Input3";
import { Button } from "../../ui/button";
import { Search } from "lucide-react";


export default function FiltrosItensEstoque() {

    return(
        <form className="flex items-center gap-2">
            <Input3 label="Nome Remédio:" id="name"/>
            <Button type="submit" variant="secondary" >
              <Search className="w-4 h-4 mr-2"/>
              Filtrar Resultados
            </Button>
        </form>
    )
}