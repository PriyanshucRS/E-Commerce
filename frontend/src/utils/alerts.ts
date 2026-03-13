import Swal from "sweetalert2";
import type { SweetAlertOptions, SweetAlertResult } from "sweetalert2";

export const toastSuccess = (title: string, text?: string) => {
  return Swal.fire({
    title,
    text,
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
  });
};

export const alertError = (
  title: string,
  text?: string,
  confirmButtonText = "OK",
) => {
  return Swal.fire({
    title,
    text,
    icon: "error",
    confirmButtonText,
  });
};

export const alertWarning = (
  title: string,
  text?: string,
  confirmButtonText = "OK",
) => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    confirmButtonText,
  });
};

export const confirmAction = (
  options: SweetAlertOptions,
): Promise<SweetAlertResult> => {
  return Swal.fire({
    showCancelButton: true,
    reverseButtons: true,
    ...options,
  });
};
