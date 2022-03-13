import Swal from "sweetalert2";

export const displayModal = async (
  icon = "error",
  title = "Oops...!!",
  text,
  showConfirmButton = "true"
) => {
  Swal.fire({
    icon,
    title,
    text,
    showConfirmButton,
  });
};
