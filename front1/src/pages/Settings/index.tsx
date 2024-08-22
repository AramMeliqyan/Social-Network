import React, { useState } from 'react';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBInput
} from 'mdb-react-ui-kit';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IPassword } from '../../helpers/types';
import { updatePassword, verifyUser, updatePageVisibility } from '../../helpers/api';
import { useVisibility } from '../../context/VisibilityContext';

export const Settings = () => {
    const { register, handleSubmit } = useForm<IPassword>();
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();
    const { isPrivate, setIsPrivate } = useVisibility();

    const handleUpdatePassword = async (passwords: IPassword) => {
        const { old, newpwd } = passwords;
        const isValid = await verifyUser();
        if (isValid.status === "error") {
            setError(isValid.message || "User verification failed");
        } else {
            updatePassword({ old, newpwd })
                .then(response => {
                    if (response.status === "error" && response.message) {
                        setError(response.message);
                    } else {
                        setError("");
                        navigate("/login");
                    }
                });
        }
    }

    const toggleVisibility = () => {
        const newVisibility = !isPrivate;
        updatePageVisibility()
            .then(response => {
                if (response.status === "ok") {
                    setIsPrivate(newVisibility);
                    alert(`Page visibility updated to ${newVisibility ? 'Private' : 'Public'}`);
                    navigate("/profile");
                } else {
                    alert('Failed to update page visibility');
                }
            })
    }

    return (
        <MDBContainer fluid className="p-5">
            <MDBContainer fluid className='py-0'>
                <MDBRow className='justify-content-start'>
                    <MDBCol md='auto'>
                        <Link to="/profile/settings/update">
                            <button className='btn btn-primary rounded-pill py-1'>
                                Update Login
                            </button>
                        </Link>
                    </MDBCol>
                </MDBRow>
                <MDBRow className='justify-content-start mt-4'>
                    <MDBCol md='auto'>
                        <button
                            className='btn btn-primary rounded-pill py-1'
                            onClick={toggleVisibility}>
                            Account privacy: {isPrivate ? 'Private' : 'Public'}
                        </button>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <MDBRow className='d-flex justify-content-center align-items-center'>
                <MDBCol lg='6' md='8' sm='10'>
                    <MDBCard className='my-5 rounded-4 shadow-lg border-0'>
                        <MDBCardBody className='px-4 py-5'>
                            <h3 className="mb-4 text-center">Update Password</h3>
                            <form onSubmit={handleSubmit(handleUpdatePassword)}>
                                {error && <div className='alert alert-danger mb-4'>{error}</div>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Old Password'
                                    type='password'
                                    {...register("old", { required: true })}
                                    className="rounded-pill"
                                />
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='New Password'
                                    type='password'
                                    {...register("newpwd", { required: true })}
                                    className="rounded-pill"
                                />
                                <button type='submit' className='btn btn-primary w-100 py-2 rounded-pill'>
                                    Update Password
                                </button>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>

        </MDBContainer>
    );
};