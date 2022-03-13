import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { activateUserAccount } from "../services/users/activateUserAccount";

export const AccountActivation = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const returnToLogin = useCallback(() => {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }, [navigate]);

  const handleVerifiedRegister = useCallback((response) => {

    if (response.status !== 200) {
       Swal.fire({
        position: "center",
        icon: "error",
        title: "Error Activating Account",
        showConfirmButton: false,
        timer: 2000,
      });
      return returnToLogin();
    }

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your account has been activated",
      showConfirmButton: false,
      timer: 2000,
    });
    return returnToLogin();
  }, [returnToLogin]);

  useEffect(() => {
    const activateAccount = async () => handleVerifiedRegister(await activateUserAccount(code));
    activateAccount();
  }, [code, handleVerifiedRegister]);

  return <></>
};
