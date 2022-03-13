import Swal from "sweetalert2";

export const displayModal = async (
  icon = "error",
  title = "Oops...!!",
  text,
  showConfirmButton = "true"
) => {
  return Swal.fire({
    icon,
    title,
    text,
    showConfirmButton,
  });
};

export const displayModalWithTimer = async (
  icon = "success",
  title = "Action successful",
  text,
  showConfirmButton = "false",
  position = 'center',
  timer = 2000
) => {
  return Swal.fire({
    icon,
    title,
    text,
    showConfirmButton,
    position,
    timer,
  });
};
