  import { Menu } from "antd";
  import { HomeOutlined, DatabaseOutlined, TeamOutlined, ReconciliationOutlined, SettingOutlined, EditOutlined } from '@ant-design/icons';
  import style from "./index.module.css";
  import MenuItem from "antd/es/menu/MenuItem";
  import { useState, useEffect } from 'react';
  import { Link, useLocation } from "react-router-dom";
  import { LogOut, Settings } from "lucide-react";

  export default function MenuList() {
    const location = useLocation();
    const [current, setCurrent] = useState(location.pathname.slice(1) || 'home'); // Initial selection based on pathname

    const handleClick = (e) => {
      setCurrent(e.key);
    };

    useEffect(() => {
      setCurrent(location.pathname.slice(1) || 'home'); // Update selection on route change
    }, [location]);

    return (
      <div className="mt-10">
        <Menu
          onClick={handleClick}
          selectedKeys={[current]}
          className={style.menuBar}
          style={{backgroundColor:'#F1F5F9'}}
        >
          <MenuItem key="home" className={style.textsidebar} icon={<HomeOutlined />}>
            <Link to="/home">Home</Link>
          </MenuItem>
          <MenuItem key="cadastros" icon={<TeamOutlined />}>
            <Link to="/cadastros">Cadastros</Link>
          </MenuItem>
          <MenuItem key="receitas" icon={<ReconciliationOutlined />}>
            <Link to="/receitas">Receitas</Link>
          </MenuItem>
          <MenuItem key="estoque" icon={<DatabaseOutlined />}>
          <Link to="/estoque">Estoque</Link>
          </MenuItem>
          <MenuItem key="nova-senha" icon={<EditOutlined />}>
          <Link to="/nova-senha">Nova Senha</Link>
          </MenuItem>
          <MenuItem key="configuracoes" icon={<Settings className="w-4"  />}>
          <Link to="/configuracoes">Configurações</Link>
          </MenuItem>
          <MenuItem key="sair" icon={<LogOut className="w-4"/>}>
          <Link to="/">Sair</Link>
          </MenuItem>
        </Menu>

      </div>
    );
  }