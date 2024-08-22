import React, { useState } from 'react';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBInput,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ILogin } from '../../../helpers/types';
import { updateLogin, verifyUser } from '../../../helpers/api';

export const UpdateLogin = () => {

    const { register, handleSubmit } = useForm<ILogin>();
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleUpdateLogin = async ({ password, login }: ILogin) => {
        const isValid = await verifyUser();
        if (isValid.status === "error") {
            setError(isValid.message || "User verification failed");
            return;
        }

        updateLogin({ password, login })
            .then(response => {
                if (response.status === "error" && response.message) {
                    setError(response.message);
                } else {
                    setError("");
                    navigate("/login");
                }
            });
    };

    return (
        <>
            <MDBContainer fluid>
                <MDBRow className='d-flex justify-content-center align-items-center'>
                    <MDBCol lg='8'>
                        <MDBCard className='my-5 rounded-3' style={{ maxWidth: '600px' }}>
                            <MDBCardBody className='px-5'>
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Update Login</h3>
                                <form onSubmit={handleSubmit(handleUpdateLogin)}>
                                    {error && <p className='alert alert-danger'>{error}</p>}

                                    <MDBInput
                                        wrapperClass='mb-4'
                                        label='New Login'
                                        type='text'
                                        {...register("login", { required: true })}
                                    />
                                    <MDBInput
                                        wrapperClass='mb-4'
                                        label='Password'
                                        type='password'
                                        {...register("password", { required: true })}
                                    />
                                    <button type='submit' className='btn btn-outline-info'>Update</button>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    );
};