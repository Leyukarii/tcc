import SidebarMenu from "@/Components/Sidebar";
import { useLocation } from "react-router-dom";

export default function RetiradaEstoque() {
  const location = useLocation();
  const { product } = location.state || {}; // Extrai o produto do estado

  return (
    <div className="flex mx-auto space-y-4 w-full">
        <SidebarMenu/>
        <div className="block">
            <h1>Detalhes do Produto</h1>
            {product ? (
                <div>
                <p>ID: {product.id}</p>
                <p>Nome: {product.name}</p>
                <p>CPF: {product.cpf}</p>
                </div>
            ) : (
                <p>Produto não encontrado.</p>
            )}
            </div>
        </div>
  );
}
