import React, { useEffect, useState } from "react";
import { Projeto, getPortfolio, deleteProjeto } from "../../../services/portfolioService";
import { useNavigate } from "react-router-dom";
import { Column, Table } from "../../../components/cammon/Table";


const ListarPortfolio: React.FC = () => {
    const navigate = useNavigate();

    const [portfolio, setPortfolio] = useState<Projeto[]>([]);

    const fetchPortfolio = async () => {
        try {
            const portfolio = await getPortfolio();
            setPortfolio(portfolio);
        } catch (error) {
            console.log('Erro ao buscar portfolio')
        }
    };

    useEffect(() => {
        fetchPortfolio();
    }, [])

    const handleEdit = (itemPortfolio: Projeto) => {
        navigate('/projeto/atualizar', { state: itemPortfolio })
    }

    const handleDelete = async (projeto: Projeto) => {
        try {
            await deleteProjeto(projeto.id);
            fetchPortfolio();
            alert('Projeto excluído com sucesso!')
        } catch (error) {
            console.log('Ocorreu um erro ao deletar portfolio.', error)

        }
    }
    const columns: Column<Projeto>[] = [
        { header: 'Titulo', accessor: 'title' },
        { header: 'Imagem', accessor: 'image' },
        { header: 'Link', accessor: 'link' },
    ];


    return (

        <Table
            columns={columns}
            data={portfolio}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
};

export default ListarPortfolio;