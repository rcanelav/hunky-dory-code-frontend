import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { activateUserAccount } from "../services/users/activateUserAccount";

export const AccountActivation = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const handleVerifiedRegister = useCallback(() => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your account has been activated",
      showConfirmButton: false,
      timer: 2000,
    });

    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, [navigate]);

  useEffect(() => {
    const activateAccount = async () => {
      const status = await activateUserAccount(code).status;
      if (status === 200) {
        handleVerifiedRegister();
      }
    };
    activateAccount();
  }, [code, handleVerifiedRegister]);

  return <></>
};
