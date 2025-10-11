import {
  deleteFlashMensaje,
  setInnerContent,
  setValueContent,
  getItemById,
  getItemByQuery,
  dateToString,
  dateTimeToString,
  formatDateForInput,
} from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  deleteFlashMensaje();
});

/*######################################################################################## */
/* Código para mostrar modal de detalles de registro */
/*######################################################################################## */

function mostrarPersonaDetalles(personaId) {
  const url = detallePersonaURL.replace("/0/", "/" + personaId + "/");

  const tabs = getItemByQuery('input[name="tabPersonaDetalle"]');
  tabs.forEach((tab) => {
    if (tab.getAttribute("aria-label") === "Información") {
      tab.checked = true;
    }
  });

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const nombreCompleto = data.nombre + " " + data.apellido;
      const lugarNacimiento = data.lugar_nacimiento;
      const parroquiaPertenencia = data.parroquia_pertenencia;
      const fechaNacimiento = dateToString(data.fecha_nacimiento);
      const genero = data.genero;
      const infoMadre = data.madre_nombre + " " + data.madre_apellido;
      const infoPadre = data.padre_nombre + " " + data.padre_apellido;
      const fechaCreacion = dateTimeToString(data.creacion);
      const fechaModificacion = dateTimeToString(data.modificacion);

      setInnerContent("nombreCompleto", nombreCompleto);
      setInnerContent("lugarNacimiento", lugarNacimiento);
      setInnerContent("parroquiaPertenencia", parroquiaPertenencia);
      setInnerContent("fechaNacimiento", fechaNacimiento);
      setInnerContent("genero", genero);
      setInnerContent("infoMadre", infoMadre);
      setInnerContent("infoPadre", infoPadre);
      setInnerContent("fechaCreacion", fechaCreacion);
      setInnerContent("fechaModificacion", fechaModificacion);

      const modalDetallePersona = getItemById("modalDetallePersona");
      modalDetallePersona.showModal();
    })
    .catch((error) => {
      // console.error("Solicitud fallida: ", error);
    });
}

window.mostrarPersonaDetalles = mostrarPersonaDetalles;

/*######################################################################################## */
/* Código para mostrar modal de modificar registro */
/*######################################################################################## */

function mostrarModificarPersona(button) {
  const personaId = button.dataset.personaId;
  const url = detallePersonaURL.replace("/0/", "/" + personaId + "/");

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const nombre = data.nombre;
      const apellido = data.apellido;
      const lugarNacimiento = data.lugar_nacimiento;
      const parroquiaPertenencia = data.parroquia_pertenencia;
      const fechaNacimiento = formatDateForInput(
        dateToString(data.fecha_nacimiento)
      );
      const genero = data.genero;
      const madreNombre = data.madre_nombre;
      const madreApellido = data.madre_apellido;
      const padreNombre = data.padre_nombre;
      const padreApellido = data.padre_apellido;

      setValueContent("edit_id", personaId);
      setValueContent("edit_nombre", nombre);
      setValueContent("edit_apellido", apellido);
      setValueContent("edit_lugar_nacimiento", lugarNacimiento);
      setValueContent("edit_parroquia_pertenencia", parroquiaPertenencia);
      setValueContent("edit_fecha_nacimiento", fechaNacimiento);
      setValueContent("edit_genero", genero);
      setValueContent("edit_madre_nombre", madreNombre);
      setValueContent("edit_madre_apellido", madreApellido);
      setValueContent("edit_padre_nombre", padreNombre);
      setValueContent("edit_padre_apellido", padreApellido);

      const modalModificarPersona = getItemById("modalModificarPersona");
      modalModificarPersona.dataset.personaId = personaId;
      modalModificarPersona.showModal();
    })
    .catch((error) => {
      // console.error("Modificación fallida: ", error);
    });
}

window.mostrarModificarPersona = mostrarModificarPersona;

/*######################################################################################## */
/* Código mostrar modal de eliminar registro */
/*######################################################################################## */

function mostrarEliminarPersona(button) {
  const personaId = button.dataset.personaId;
  const modalEliminarPersona = getItemById("modalEliminarPersona");

  modalEliminarPersona.dataset.personaId = personaId;
  modalEliminarPersona.showModal();
}

window.mostrarEliminarPersona = mostrarEliminarPersona;

/*######################################################################################## */
/* Código para eliminar información en la base de datos */
/*######################################################################################## */

function eliminarPersona() {
  const modalEliminarPersona = getItemById("modalEliminarPersona");
  const personaId = modalEliminarPersona.dataset.personaId;

  const url = eliminarPersonaURL.replace("/0/", "/" + personaId + "/");
  fetch(url).then((response) => {
    if (response.ok) {
      modalEliminarPersona.close();
      htmx.ajax("GET", tablaPersonaURL, {
        target: "#tabla",
        swap: "innerHTML",
      });

      Swal.fire({
        width: 250,
        text: "Eliminación exitosa",
        icon: "success",
        confirmButtonText: "Cerrar",
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-sm w-full block",
        },
      });
    }
  });
}

window.eliminarPersona = eliminarPersona;

/*######################################################################################## */
/* Código para guardar información en la base de datos */
/*######################################################################################## */

const formPersona = getItemById("formPersona");
formPersona.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(formPersona);
  const data = Object.fromEntries(formData.entries());

  fetch(guardarPersonaURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        const modalRegistrarPersona = getItemById("modalRegistrarPersona");
        modalRegistrarPersona.close();
        htmx.ajax("GET", tablaPersonaURL, {
          target: "#tabla",
          swap: "innerHTML",
        });

        Swal.fire({
          width: 250,
          text: "Registro exitoso",
          icon: "success",
          confirmButtonText: "Cerrar",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-sm w-full block",
          },
        });
      }
    })
    .catch((error) => {
      // console.log("Registro fallido: ", error);
    });
});

/*######################################################################################## */
/* Código para modificar información en la base de datos */
/*######################################################################################## */

const formModificarPersona = getItemById("formModificarPersona");
formModificarPersona.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(formModificarPersona);
  const data = Object.fromEntries(formData.entries());

  fetch(modificarPersonaURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      const modalModificarPersona = getItemById("modalModificarPersona");

      modalModificarPersona.close();
      htmx.ajax("GET", tablaPersonaURL, {
        target: "#tabla",
        swap: "innerHTML",
      });

      Swal.fire({
        width: 250,
        text: "Modificación exitosa",
        icon: "success",
        confirmButtonText: "Cerrar",
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-sm w-full block",
        },
      });
    })
    .catch((error) => {
      // console.log("Modificación fallida: ", error);
    });
});
