import React, { useEffect, useState } from "react";
import styles from './ManipularInformacoes.module.css';

import * as Yup from "yup";
import { AxiosError } from "axios";
import Form from "../../../components/forms/Form/Form";
import Input from "../../../components/forms/Input/Input";
import Title from "../../../components/cammon/Title/Title";
import Button from "../../../components/cammon/Button/Button";
import Textarea from "../../../components/forms/Textarea/Textarea";
import InformacoesCard from "./InformacoesCard/InformacoesCard";
import { Informacoes, getInformacoes, deleteInformacoes, createOrUpdateInformacoes } from "../../../services/informacoesService";


const ManipularInformacoes: React.FC = () => {
    const [informacoes, setInformacoes] = useState<Informacoes>();


    const initialValues: Informacoes = {
        foto: "",
        nome: "",
        cargo: "",
        resumo: "",
    }

    const validationSchema = Yup.object().shape({
        foto: Yup.string().required("Campo Obrigatório"),
        nome: Yup.string().required("Campo Obrigatório"),
        cargo: Yup.string().required("Campo Obrigatório"),
        resumo: Yup.string().required("Campo Obrigatório"),
    })

    const fetchInformacao = async () => {
        try {
            const informacao = await getInformacoes();
            setInformacoes(informacao);
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status !== 404) {
                    console.error("Erro ao buscar informações", error)
                }
            } else {
                console.error("Ocorreu um erro desconhecido ao buscar informações", error)
            }
        }
    };

    useEffect(() => {
        fetchInformacao();
    }, [])


    const onSubmit = async (values: Informacoes) => {
        try {
            await createOrUpdateInformacoes(values);
            setInformacoes(values);
            alert("Formulário enviado com sucesso!")
        } catch (error) {
            console.error("Erro ao enviar", error)
            alert("Erro ao enviar formulário")
        }
    };

    const handleDelete = async () => {
        try {
            await deleteInformacoes();
            setInformacoes(undefined);
            alert("informações Deletadas com sucesso")
        } catch (error) {
            console.error("Erro ao deletar informações", error)
            alert("Ocorreu um erro ao deletar as informações")
        }
    };

    return (

        <div className={styles.container}>

            <Form
                initialValues={informacoes || initialValues}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (

                    <>
                        <Title>Informações</Title>

                        <Input
                            label="Foto"
                            name="foto"
                            errors={errors.foto}
                            touched={touched.foto}
                        />

                        <Input
                            label="Nome"
                            name="nome"
                            errors={errors.nome}
                            touched={touched.nome}
                        />

                        <Input
                            label="Cargo"
                            name="cargo"
                            errors={errors.cargo}
                            touched={touched.cargo}
                        />

                        <Textarea
                            label="Resumo"
                            name="resumo"
                            errors={errors.resumo}
                            touched={touched.resumo}
                        />

                        <Button type="submit">Salvar</Button>

                    </>
                )}
            </Form>

            {
                informacoes &&
                <div className={styles.cardContainer} >
                    <InformacoesCard informacoes={informacoes} />
                    <Button onClick={handleDelete} red>Deletar</Button>
                </div>
            }
        </div >
    )
}

export default ManipularInformacoes