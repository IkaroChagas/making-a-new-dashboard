import React from "react";
import { NavLink } from "react-router-dom";
import styles from './Sidebar.module.css'
import { useAuth } from "../../../contexts/AuthContexts";

const SideBar = () => {

    const { logout } = useAuth();

    return (
        <div className={styles.sidebar}>
            <nav className={styles.navigation}>
                <ul>
                    <li>
                        <NavLink to="/" >
                            <h3>Home</h3>
                        </NavLink>
                    </li>

                    <h3>Curriculo</h3>
                    <ul>
                        <li>
                            <NavLink to="/curriculo/informacoes/cadastro" >
                                Cadastrar Informações
                            </NavLink>
                        </li>
                    </ul>
                    <li>
                        <NavLink to="/curriculo/experiencias/cadastro" >
                            Cadastrar Experiência
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/curriculo/experiencias/lista" >
                            Listar Experiências
                        </NavLink>
                    </li>
                    <ul>
                        <h3>Portfólio</h3>
                    </ul>
                    <li>
                        <NavLink to="/portfolio/cadastro" >
                            Cadastrar Portfólio
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/portfolio/lista" >
                            Lista de Portfólios
                        </NavLink>
                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink onClick={logout} to="/Login">
                            <h3>Logout</h3>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default SideBar