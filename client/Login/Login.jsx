import React from "react";
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
        password: yup.string().min(8,"A senha deve ter o minimo de 8 caracteres"),
    })

    return (
        <div className="container">
            <h1>Login</h1>
            <Formik 
            initialValues={{}}
            onSubmit={handleClickLogin}
            validationSchema={validationLogin}
            >
                <Form className="login-form">
                    <div className="login-form-group">
                        <Field name="email" className="form-field" placeholder="E-mail"/>
                        <ErrorMessage
                        component={'span'}
                        name="email"
                        className="form-error"
                        />
                    </div>

                    <div className="login-form-group">
                        <Field name="password" className="form-field" placeholder="Senha"/>
                        <ErrorMessage
                        component={'span'}
                        name="password"
                        className="form-error"
                        />
                    </div>
                    <button className="button" type="submit">Login</button>
                </Form>
            </Formik>
        </div>
    );
};

export default Login;