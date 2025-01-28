import React from "react";
import './Signin.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import Axios from "axios";
import { Link } from "react-router-dom";

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
        <div className="backgroundSignin">
            <div className="container">
                <h1>Cadastro</h1>
                <Formik
                    initialValues={{}}
                    onSubmit={handleClickRegister}
                    validationSchema={validationRegistro}
                >
                    <Form className="login-form">
                        <div className="login-form-group">
                            <label>Nome:</label>
                            <Field name="name" className="form-field"/>
                            <ErrorMessage
                                component={'span'}
                                name="name"
                                className="form-error"
                            />
                        </div>

                        <div className="login-form-group">
                            <label>Sobrenome:</label>
                            <Field name="surName" className="form-field"/>
                            <ErrorMessage
                                component={'span'}
                                name="surName"
                                className="form-error"
                            />
                        </div>

                        <div className="login-form-group">
                            <label>Usuário</label>
                            <Field name="username" className="form-field"/>
                            <ErrorMessage
                                component={'span'}
                                name="username"
                                className="form-error"
                            />
                        </div>

                        <div className="login-form-group">
                            <label>E-mail:</label>
                            <Field name="email" className="form-field"/>
                            <ErrorMessage
                                component={'span'}
                                name="email"
                                className="form-error"
                            />
                        </div>

                        <div className="login-form-group">
                            <label>Senha:</label>
                            <Field name="password" className="form-field"/>
                            <ErrorMessage
                                component={'span'}
                                name="password"
                                className="form-error"
                            />
                        </div>

                        <div className="login-form-group">
                            <label>Confirme sua senha:</label>
                            <Field name="confirmpassword" className="form-field"/>
                            <ErrorMessage
                                component={'span'}
                                name="confirmpassword"
                                className="form-error"
                            />
                        </div>
                        <div className="FooterForm">
                                <div className="ButtonAndForgotPassword">
                                    <button className="button" type="submit">Registrar</button>
                                </div>
                                <span>
                                    Já tem uma conta?{' '}
                                    <Link className="FooterLogin" to="/Login">Entre!</Link>
                                </span>
                            </div>
                    </Form>
                </Formik>
            </div>
        </div>

    )
};

export default Signin;