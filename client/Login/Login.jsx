import React from "react";
import { Link } from "react-router-dom";
import './Login.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import Axios from 'axios';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {

    // Função de login com email e senha
    const handleClickLogin = (values) => {
        Axios.post("http://localhost:4000/Login", {
            email: values.email,
            password: values.password,
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log('Erro ao fazer login:', error);
        });
    };

    // Validação de formulário com Yup
    const validationLogin = yup.object().shape({
        email: yup.string().email("Digite um e-mail válido").required("Este campo é obrigatório"),
        password: yup.string().required("Este campo é obrigatório"),
    });

    // Função para tratar o sucesso no login com Google
    const handleGoogleLoginSuccess = (credentialResponse) => {
        console.log("Token recebido:", credentialResponse.credential); // Verifique o token recebido
        // Aqui você pode enviar a credencial para o backend
        Axios.post("http://localhost:4000/GoogleLogin", {
            credential: credentialResponse.credential // Envia o token correto
        }).then((response) => {
            console.log("Usuário logado com Google", response);
        }).catch((error) => {
            console.log('Erro ao fazer login com Google:', error);
        });
    };

    // Função para tratar erro no login com Google
    const handleGoogleLoginError = () => {
        console.log('Login com Google falhou');
    };

    return (
        <GoogleOAuthProvider clientId="4293781146-mbeoui56vjsnaebmss3dnjaket8n5miv.apps.googleusercontent.com">
            <div className="backgroundLogin">
                <div className="container">
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginError}
                        auto_select
                        theme="outline"
                        size="large"
                        shape="pill"
                        text="continue_with"
                    />

                    <h1>Entre na sua conta</h1>

                    {/* Formulário de Login */}
                    <Formik
                        initialValues={{ email: '', password: '' }}
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
                                <Field id="password" name="password" className="form-field" type="password" />
                                <ErrorMessage
                                    component={'span'}
                                    name="password"
                                    className="form-error"
                                />
                            </div>

                            <div className="FooterForm">
                                <div className="ButtonAndForgotPassword">
                                    <button className="button" type="submit">Login</button>
                                    <span>
                                        <Link className="FooterLogin" to="/ForgotMyPassword">Esquci minha senha</Link>
                                    </span>
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
        </GoogleOAuthProvider>
    );
};

export default Login;
