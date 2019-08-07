import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const UserForm = ({ touched, errors, values, handleSubmit, status }) => {
    const [users, setUsers] = useState([])
    
    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status])

    return(
        <div className="users-form">
            <h2>This is a Form</h2>
            <Form>
                <Field type="text" name="name" placeholder="Name" /> <br/>
                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                )}
                <Field type="text" name="email" placeholder="Email" /> <br/>
                {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                )}
                <Field type="text" name="password" placeholder="Password" /> <br/>
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}
                <label>
                    Terms of Service
                    <Field
                        type="checkbox"
                        name="termsOfServices"
                        checked={values.termsOfServices}
                    />
                </label>
                <button type="submit">Submit</button>
            </Form>
           {users.map(user => (
               <p key={user.id}>{user.name}</p>
               ))}
        </div>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, termsOfServices, values }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            termsOfServices: termsOfServices || false,
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        termsOfServices: Yup.string().required()
    }),

    handleSubmit(values, { setStatus }) {
        console.log(values)
        axios
            .post(`https://reqres.in/api/users/`, values)
            .then(res => {
                setStatus(res.data)
            })
            .catch(err => console.log(err.response))
    }

})(UserForm)


export default FormikUserForm;
