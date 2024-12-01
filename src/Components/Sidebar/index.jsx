import { Layout } from 'antd'
import LogoSideBar from '../Logo-side-bar';
import  style from "./index.module.css"
import MenuList from '../Menu-list';

const {Sider} = Layout;

export default function SidebarMenu(){

    return(
            <>
            
                <Sider 
                    theme={'light'} 
                    className={style.sidebar}
                    trigger={null}
                    >

   
                    <MenuList   />
                </Sider>

            
            </>
        )
}