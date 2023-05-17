import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Column } from "../../../components/cammon/Table";
import { Experiencia, deleteExperiencia, getExperiencia } from "../../../services/experienciaService";
import React from "react";


const ListarExperiencia: React.FC = () => {
    const navigate = useNavigate();
    const [experiencias, setExperiencias] = useState<Experiencia[]>([]);

    const fetchExperiencia = async () => {
        try {
            const experiencia = await getExperiencia();
            setExperiencias(experiencias)
        } catch (error) {
            alert("Erro ao buscar experiências");
        }
    };

    useEffect(() => {
        fetchExperiencia()
    })

    const handleEdit = (experiencia: Experiencia) => {
        navigate("/curriculo/experiencia/atualizar", { state: experiencia })
    };

    const handleDelete = async (experiencia: Experiencia) => {
        try {
            await deleteExperiencia(experiencia.id);
            fetchExperiencia()
            alert("Experiencia concluida com sucesso")
        } catch (error) {
            alert("Ocorreu um erro ao tentar excluir")
        }
    };

    const columns: Column<Experiencia>[] = [
        { header: "Título", accessor: "titulo" },
        { header: "Descrição", accessor: "descricao" },
        { header: "Tipo", accessor: "tipo" },
        { header: "Ano Inicio", accessor: "anoInicio" },
        { header: "Ano Fim", accessor: "anoFim" },
    ];

    return (
        <Table
            columns={columns}
            data={experiencias}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )

}

export default ListarExperiencia;