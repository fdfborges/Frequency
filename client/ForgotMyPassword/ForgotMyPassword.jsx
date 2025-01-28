import React from "react";
import { Link } from "react-router-dom";
import './ForgotMyPassword.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";

const ForgotMyPassword = () => {

    // Validação de formulário com Yup
    const validationLogin = yup.object().shape({
        email: yup.string().email("Digite um e-mail válido").required("Este campo é obrigatório"),
    });


    return (
        <div className="backgroundLogin">
            <div className="container">

                <h1>Esqueci minha senha</h1>

                {/* Formulário de Login */}
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={""}
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
                        <div className="FooterForm">
                            <div className="ButtonAndForgotPassword">
                                <button className="button" type="submit">Recuperar Senha</button>
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

export default ForgotMyPassword;
