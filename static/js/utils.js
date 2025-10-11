export function setInnerContent(id, content) {
  document.getElementById(id).innerHTML = content;
}

export function setValueContent(id, value) {
  document.getElementById(id).value = value;
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

export function deleteFlashMensaje() {
  const mensajeFlash = document.getElementById("mensajeFlash");
  if (mensajeFlash) {
    setTimeout(() => {
      mensajeFlash.classList.add(
        "opacity-0",
        "transition-opacity",
        "duration-500"
      );
      setTimeout(() => mensajeFlash.remove(), 600);
    }, 3000);
  }
}
