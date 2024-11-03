import {
    createBrowserRouter,
} from "react-router-dom";

import Home from "./Home";
import Login from "../Components/Login/Login";
import Cadastros from "./Cadastros";
import Receita from "./Receitas";
import Estoque from "./Estoque";
import Configuracoes from "./Configuracoes";
import CadastroNovaSenha from "@/Components/CadastroNovaSenha/CadastroNovaSenha";
import NovaSenha from "./NovaSenha";
import RetiradaEstoque from "./RetiradaEstoque";
import CadastroPermissao from "@/Components/CadastroPermissao/CadastroPermissao";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
        path: "/home",
        element : <Home />
    },
    {
        path: "/cadastros",
        element : <Cadastros />
    },
    {
        path: "/receitas",
        element : <Receita />
    },
    {
        path: "/estoque",
        element : <Estoque/>
    },
    {
        path: "/nova-senha", 
        element: <NovaSenha />
    },
    {
        path: "/retirada",
        element: <RetiradaEstoque />
    },
    {
        path: "/configuracoes",
        element: <Configuracoes />
    }
]);