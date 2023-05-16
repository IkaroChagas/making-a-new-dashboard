
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import styles from './login.module.css'
import Form from "../../components/forms/Form/Form";
import Input from "../../components/forms/Input/Input";
import Button from "../../components/cammon/Button/Button";
import Title from "../../components/cammon/Title/Title";
import { useAuth } from "../../contexts/AuthContext";
import { login as loginService } from "../../services/authService";
import React from "react";

interface LoginValues {
    email: string;
    password: string;
}


const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const initialValues: LoginValues = {
        email: "",
        password: "",
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("E-mail Inválido")
            .required("E-mail é obrigatório"),
        password: Yup.string()
            .min(6, "A senha deve possuir pelo menos 6 caracteres")
            .required("A senha é obrigatória"),
    });

    const onSubmit = async (values: LoginValues) => {
        try {
            const user = await loginService(values.email, values.password);
            login(user);
            navigate("/")
        } catch (error) {
            alert("Erro ao realizar o login")
        }
    }

    return (

        <div className={styles.loginWrapper}>

            <Form
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (

                    <>

                        <Title>Meu site Pessoal</Title>


                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            errors={errors.email}
                            touched={touched.email}
                        />

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            errors={errors.password}
                            touched={touched.password}
                        />


                        <Button type="submit">Salvar</Button>

                    </>
                )}
            </Form>
        </div>
    )

};

export default Login