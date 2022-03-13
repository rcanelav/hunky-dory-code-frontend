import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { activateUserAccount } from "../services/users/activateUserAccount";
import { displayModalWithTimer } from "../utils/helpers/displayModal";

export const AccountActivation = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const returnToLogin = useCallback(() => {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }, [navigate]);

  const handleVerifiedRegister = useCallback((response) => {
    try{
      displayModalWithTimer(undefined, undefined, response.data.msg, undefined, undefined, 2000);

      return returnToLogin();
    }catch(error){
      displayModalWithTimer('error', 'Error Activating Account', error.response.errors[0].msg, undefined, undefined, 2000);

      return returnToLogin();
    }
  }, [returnToLogin]);

  useEffect(() => {
    const activateAccount = async () => handleVerifiedRegister(await activateUserAccount(code));
    activateAccount();
  }, [code, handleVerifiedRegister]);

  return <></>
};
