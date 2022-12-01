import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom'
import { verifyMail } from '../../features/auth/AuthSlice';

const VerifyMail = () => {
     const {  isLoading, isError, isSuccess, message} =
        useSelector((state) => state.auth);
    
    const { token } = useParams() 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(() => {
      dispatch(verifyMail(token))
    }, [token])
    return (
        <div>
            
        </div>
    )
}

export default VerifyMail
