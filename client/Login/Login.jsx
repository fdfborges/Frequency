import React from "react";
import { Link } from "react-router-dom";
import './Login.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import Axios from 'axios';
const Login = () => {

    const handleClickLogin = (values) => {
        Axios.post("http://localhost:4000/Login", {
            email: values.email,
            password: values.password,
        }).then((response) => {
            console.log(response)
        })
    };

    const validationLogin = yup.object().shape({
        email: yup.string().email("Digite um e-mail válido").required("Este campo é obrigatório"),
        password: yup.string().required("Este campo é obrigatório"),
    })

    return (
        <div className="backgroundLogin">
            <div className="container">
                <h1>Entre na sua conta</h1>
                <Formik
                    initialValues={{}}
                    onSubmit={handleClickLogin}
                    validationSchema={validationLogin}
                >
                    <Form className="login-form">
                        <div className="login-form-group">
                            <label className="LabelFormLogin" htmlFor="email">Seu e-mail</label>
                            <Field id="email" name="email" className="form-field" />
                            <ErrorMessage
                                component={'span'}
                                name="email"
                                className="form-error"
                            />
                        </div>

                        <div className="login-form-group">
                            <label className="LabelFormLogin" htmlFor="password">Sua Senha</label>
                            <Field id="password" name="password" className="form-field" />
                            <ErrorMessage
                                component={'span'}
                                name="password"
                                className="form-error"
                            />
                        </div>
                        <div className="FooterForm">
                            <div className="ButtonAndForgotPassword">
                                <button className="button" type="submit">Login</button>
                                <span className="ForgotPassword">Esqueci minha senha</span>
                            </div>
                            <span>
                                Não tem uma conta?{' '}
                                <Link className="FooterLogin" to="/Signin">Crie agora</Link>
                            </span>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Login;