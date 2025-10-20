export function setInnerContent(id, content) {
  document.getElementById(id).innerHTML = content;
}

export function setValueContent(id, value) {
  document.getElementById(id).value = value;
}

export function setValueContentDefault(id, value) {
  document.getElementById(id).value = value ? value : "";
}

export function getItemById(id) {
  return document.getElementById(id);
}

export function getItemByQuery(selector) {
  return document.querySelectorAll(selector);
}

export function dateToString(fecha) {
  return fecha ? new Date(fecha).toLocaleDateString() : "N/A";
}

export function dateTimeToString(fecha) {
  return fecha ? new Date(fecha).toLocaleString() : "N/A";
}

export function formatDateForInput(fechaStr) {
  const [dia, mes, año] = fechaStr.split("/");
  const diaPad = dia.padStart(2, "0");
  const mesPad = mes.padStart(2, "0");
  return `${año}-${mesPad}-${diaPad}`;
}

export function getOrDefault(value, fallback = "N/A") {
  return value ? value : fallback;
}

export function showAlert(text, icon = "success") {
  Swal.fire({
    width: 250,
    text: text,
    icon: icon,
    confirmButtonText: "Cerrar",
    buttonsStyling: false,
    customClass: {
      confirmButton: "btn btn-sm w-full block",
    },
  });
}
