import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import ListarPortfolio from "../pages/portfolio/listaProjetos/listaPortfolio";
import ListarExperiencia from "../pages/curriculo/ListarExperiencia/ListarExperiencia";
import ManipularProjeto from "../pages/portfolio/ManipularProjeto/ManipularProjeto";
import ManipularInformacoes from "../pages/curriculo/ManipularInformacoes/ManipularInformacoes";
import ManipularExperiencia from "../pages/curriculo/ManipularExperiencia/ManipularExperiencia";
import Layout from "../components/layout/Layout";
import { useAuth } from "../contexts/AuthContext";


const AppRoutes: React.FC = () => {

    const { authenticated, isLoading } = useAuth()

    if (isLoading) {
        return <p>Carregando...</p>
    }

    if (!authenticated) {
        return <Navigate to="/login" />
    }


    return (

        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/curriculo/informacoes" element={<ManipularInformacoes />} />
                <Route path="/curriculo/experiencia/cadastrar" element={<ManipularExperiencia />} />
                <Route path="/curriculo/experiencia/atualizar" element={<ManipularExperiencia />} />
                <Route path="/curriculo/experiencia/listar" element={<ListarExperiencia />} />
                <Route path="/projeto/cadastrar" element={<ManipularProjeto />} />
                <Route path="/portfolio" element={<ListarPortfolio />} />
            </Routes>
        </Layout>
    )
};

export default AppRoutes;