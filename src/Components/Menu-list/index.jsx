import { Menu } from "antd";
import { HomeOutlined, DatabaseOutlined, TeamOutlined, ReconciliationOutlined, SettingOutlined, EditOutlined } from '@ant-design/icons';
import style from "./index.module.css";
import MenuItem from "antd/es/menu/MenuItem";
import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import { LogOut, Settings } from "lucide-react";
import { AuthContext } from '../../context/AuthContext';

export default function MenuList() {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname.slice(1) || 'home'); // Initial selection based on pathname
  const { user } = useContext(AuthContext); // Obtém o contexto de autenticação

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    setCurrent(location.pathname.slice(1) || 'home'); // Update selection on route change
  }, [location]);

  // Mapeia as permissões de páginas para seus respectivos itens de menu
  const pageToMenuItem = {
    Home: {
      key: "home",
      icon: <HomeOutlined />,
      label: "Home",
      link: "/home",
    },
    Cadastros: {
      key: "cadastros",
      icon: <TeamOutlined />,
      label: "Cadastros",
      link: "/cadastros",
    },
    Receitas: {
      key: "receitas",
      icon: <ReconciliationOutlined />,
      label: "Receitas",
      link: "/receitas",
    },
    Estoque: {
      key: "estoque",
      icon: <DatabaseOutlined />,
      label: "Estoque",
      link: "/estoque",
    },
    "Nova Senha": {
      key: "nova-senha",
      icon: <EditOutlined />,
      label: "Nova Senha",
      link: "/nova-senha",
    },
    Configurações: {
      key: "configuracoes",
      icon: <Settings className="w-4" />,
      label: "Configurações",
      link: "/configuracoes",
    }
  };

  return (
    <div className="mt-10">
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        className={style.menuBar}
        style={{ backgroundColor: '#F1F5F9' }}
      >
        {/* Filtra os itens de menu permitidos com base nas páginas do usuário */}
        {user?.pages?.map((page) => {
          const menuItem = pageToMenuItem[page.name];
          return menuItem ? (
            <MenuItem key={menuItem.key} icon={menuItem.icon} className={style.textsidebar}>
              <Link to={menuItem.link}>{menuItem.label}</Link>
            </MenuItem>
          ) : null;
        })}
        
        {/* Sempre exibe o item de "Sair" */}
        <MenuItem key="sair" icon={<LogOut className="w-4" />}>
          <Link to="/">Sair</Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
