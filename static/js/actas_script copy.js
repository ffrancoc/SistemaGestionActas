import {
  getItemById,
  setValueContent,
  dateToString,
  formatDateForInput,
  getOrDefault,
  showAlert,
} from "./utils.js";

const modalActasRegistro = getItemById("modalActasRegistro");
modalActasRegistro.addEventListener("close", () => {
  getItemById("formActaBautismo").reset();
  getItemById("registroIdBautismo").value = "";
});

/*######################################################################################## */
/* Código para mostrar modal de actas */
/*######################################################################################## */

function mostrarActasRegistro(button) {
  const registroId = button.dataset.registroId;
  const urlRegistro = detalleRegistroURL.replace("/0/", "/" + registroId + "/");
  const urlBautismo = detalleBautismoURL.replace("/0/", "/" + registroId + "/");

  fetch(urlRegistro)
    .then((response) => response.json())
    .then((data) => {
      setValueContent("registroIdBautismo", data.id);
      setValueContent("registroBautismo", data.nombre + " " + data.apellido);

      fetch(urlBautismo)
        .then((response) => response.json())
        .then((bautismo) => {
          const btnBautismoGuardar = getItemById("btnBautismoGuardar");
          const btnBautismoModificar = getItemById("btnBautismoModificar");
          const btnBautismoEliminar = getItemById("btnBautismoEliminar");

          btnBautismoEliminar.dataset.bautismoId = bautismo.id;

          if (!bautismo.id) {
            btnBautismoGuardar.classList.remove("hidden");
            btnBautismoModificar.classList.add("hidden");
            btnBautismoEliminar.classList.add("hidden");
          } else {
            const noLibro = bautismo.no_libro ? bautismo.no_libro : "";
            setValueContent("noLibroBautismo", noLibro);

            const noFolio = bautismo.no_folio ? bautismo.no_folio : "";
            setValueContent("noFolioBautismo", noFolio);

            const noActa = bautismo.no_acta ? bautismo.no_acta : "";
            setValueContent("noActaBautismo", noActa);

            const parroquiaBautismo = bautismo.parroquia
              ? bautismo.parroquia
              : "";
            setValueContent("parroquiaBautismo", parroquiaBautismo);

            const fechaBautismo = bautismo.fecha_bautismo
              ? dateToString(bautismo.fecha_bautismo)
              : "";

            setValueContent("fechaBautismo", formatDateForInput(fechaBautismo));

            const sacerdoteBautismo = bautismo.sacerdote_bautismo
              ? bautismo.sacerdote_bautismo
              : "";
            setValueContent("sacerdoteBautismo", sacerdoteBautismo);

            const padrino1 = bautismo.padrino_1 ? bautismo.padrino_1 : "";
            setValueContent("padrino1Bautismo", padrino1);

            const padrino2 = bautismo.padrino_2 ? bautismo.padrino_2 : "";
            setValueContent("padrino2Bautismo", padrino2);

            btnBautismoGuardar.classList.add("hidden");
            btnBautismoModificar.classList.remove("hidden");
            btnBautismoEliminar.classList.remove("hidden");
          }
        });

      const modalActasRegistro = getItemById("modalActasRegistro");
      modalActasRegistro.showModal();
    })
    .catch((error) => {
      // console.error("Solicitud fallida: ", error);
    });
}

window.mostrarActasRegistro = mostrarActasRegistro;

/*######################################################################################## */
/* Código para modificar información en la base de datos */
/*######################################################################################## */
const formActaBautismo = getItemById("formActaBautismo");
formActaBautismo.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(formActaBautismo);
  const data = Object.fromEntries(formData.entries());

  fetch(guardarBautismoURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      const modalActasRegistro = getItemById("modalActasRegistro");
      modalActasRegistro.close();

      htmx.ajax("GET", tablaRegistrosURL, {
        target: "#tabla",
        swap: "innerHTML",
      });

      Swal.fire({
        width: 250,
        text: data.mensaje,
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

/*######################################################################################## */
/* Código mostrar modal de eliminar bautismo */
/*######################################################################################## */

function mostrarEliminarBautismo(button) {
  const modalEliminarBautismo = getItemById("modalEliminarBautismo");
  modalEliminarBautismo.showModal();
}

window.mostrarEliminarBautismo = mostrarEliminarBautismo;

/*######################################################################################## */
/* Código para eliminar información en la base de datos */
/*######################################################################################## */

function eliminarBautismo() {
  const modalEliminarBautismo = getItemById("modalEliminarBautismo");

  const btnBautismoEliminar = getItemById("btnBautismoEliminar");
  const bautismoId = btnBautismoEliminar.dataset.bautismoId;

  const url = eliminarBautismoURL.replace("/0/", "/" + bautismoId + "/");

  fetch(url).then((response) => {
    if (response.ok) {
      modalEliminarBautismo.close();
      htmx.ajax("GET", tablaRegistrosURL, {
        target: "#tabla",
        swap: "innerHTML",
      });

      getItemById("modalActasRegistro").close();

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

window.eliminarBautismo = eliminarBautismo;
