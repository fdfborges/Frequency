import React from "react";
import './Signin.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import Axios from "axios";

const handleClickRegister = (values) => {
    
    Axios.post("http://localhost:4000/Signin", {
        email: values.email,
        password: values.password,
    });
}
const validationRegistro = yup.object().shape({
    //Fazer as validações
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().email("Digite um e-mail válido").required("Este campo é obrigatório"),
    password: yup.string().min(8, "A senha deve ter o minimo de 8 caracteres"),
    confirmpassword: yup.string().oneOf([yup.ref("password"), null], "Senhas não são iguais!"),
});

const Signin = () => {
    return (
        <div className="container">
            <h1>Cadastro</h1>
            <Formik
                initialValues={{}}
                onSubmit={handleClickRegister}
                validationSchema={validationRegistro}
            >
                <Form className="login-form">
                    <div className="login-form-group">
                        <Field name="name" className="form-field" placeholder="Nome" />
                        <ErrorMessage
                            component={'span'}
                            name="name"
                            className="form-error"
                        />
                    </div>

                    <div className="login-form-group">
                        <Field name="surName" className="form-field" placeholder="Sobrenome" />
                        <ErrorMessage
                            component={'span'}
                            name="surName"
                            className="form-error"
                        />
                    </div>

                    <div className="login-form-group">
                        <Field name="username" className="form-field" placeholder="Usuário" />
                        <ErrorMessage
                            component={'span'}
                            name="username"
                            className="form-error"
                        />
                    </div>

                    <div className="login-form-group">
                        <Field name="email" className="form-field" placeholder="E-mail" />
                        <ErrorMessage
                            component={'span'}
                            name="email"
                            className="form-error"
                        />
                    </div>

                    <div className="login-form-group">
                        <Field name="password" className="form-field" placeholder="Senha" />
                        <ErrorMessage
                            component={'span'}
                            name="password"
                            className="form-error"
                        />
                    </div>

                    <div className="login-form-group">
                        <Field name="confirmpassword" className="form-field" placeholder="Confirme sua senha" />
                        <ErrorMessage
                            component={'span'}
                            name="confirmpassword"
                            className="form-error"
                        />
                    </div>
                    <button className="button" type="submit">Login</button>
                </Form>
            </Formik>
        </div>
    )
};

export default Signin;