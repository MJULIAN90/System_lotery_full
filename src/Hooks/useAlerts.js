import Swal from "sweetalert2";

const useAlerts = () => {
  const alert = (message, type) => {
    Swal.fire({
      title: type.toUpperCase(), text: message, icon: type, confirmButtonColor: '#198754',
});
  };

  return {
    alert,
  };
};

export default useAlerts;
