import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { verifyNewEmail } from "../services/users/verifyNewEmail";

export const EmailConfirmation = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const handleVerifiedRegister = useCallback(() => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your email has been verified",
      showConfirmButton: false,
      timer: 2000,
    });

    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, [navigate]);

  useEffect(() => {
    const activateAccount = async () => {
      const status = verifyNewEmail( code ).status;
      if (status === 200) {
        handleVerifiedRegister();
      }
    };
    activateAccount();
  }, [code, handleVerifiedRegister]);

  return <></>
};
