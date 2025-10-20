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
  const url = detalleActasURL.replace("/0/", "/" + registroId + "/");

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "ok") {
        setValueContent("registroIdBautismo", data.data.registro.id);
        setValueContent(
          "registroBautismo",
          data.data.registro.nombre + " " + data.data.registro.apellido
        );

        if ("bautismo" in data.data) {
          const btnBautismoGuardar = getItemById("btnBautismoGuardar");
          const btnBautismoModificar = getItemById("btnBautismoModificar");
          const btnBautismoEliminar = getItemById("btnBautismoEliminar");

          btnBautismoEliminar.dataset.bautismoId = data.data.bautismo.id;

          const noLibro = getOrDefault(data.data.bautismo.no_libro, "");
          const noFolio = getOrDefault(data.data.bautismo.no_folio, "");
          const noActa = getOrDefault(data.data.bautismo.no_acta, "");
          const parroquiaBautismo = getOrDefault(
            data.data.bautismo.parroquia_bautismo,
            ""
          );
          const fechaBautismo = getOrDefault(
            data.data.bautismo.fecha_bautismo,
            ""
          );
          const sacerdoteBautismo = getOrDefault(
            data.data.bautismo.sacerdote,
            ""
          );
          const padrino1 = getOrDefault(data.data.bautismo.padrino_1, "");
          const padrino2 = getOrDefault(data.data.bautismo.padrino_2, "");

          setValueContent("noLibroBautismo", noLibro);
          setValueContent("noFolioBautismo", noFolio);
          setValueContent("noActaBautismo", noActa);
          setValueContent("parroquiaBautismo", parroquiaBautismo);
          setValueContent("fechaBautismo", fechaBautismo);
          setValueContent("sacerdoteBautismo", sacerdoteBautismo);
          setValueContent("padrino1Bautismo", padrino1);
          setValueContent("padrino2Bautismo", padrino2);

          btnBautismoGuardar.classList.add("hidden");
          btnBautismoModificar.classList.remove("hidden");
          btnBautismoEliminar.classList.remove("hidden");
        } else {
          btnBautismoGuardar.classList.remove("hidden");
          btnBautismoModificar.classList.add("hidden");
          btnBautismoEliminar.classList.add("hidden");
        }
        const modalActasRegistro = getItemById("modalActasRegistro");
        modalActasRegistro.showModal();
      } else {
        showAlert(data.data, "error");
      }
    })
    .catch((error) => {
      showAlert(error, "error");
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
      if (data.status === "ok") {
        const modalActasRegistro = getItemById("modalActasRegistro");
        modalActasRegistro.close();

        htmx.ajax("GET", tablaRegistrosURL, {
          target: "#tabla",
          swap: "innerHTML",
        });

        showAlert(data.data, "success");
      } else {
        showAlert(data.data, "error");
      }
    })
    .catch((error) => {
      showAlert(error, "error");
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

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "ok") {
        modalEliminarBautismo.close();
        htmx.ajax("GET", tablaRegistrosURL, {
          target: "#tabla",
          swap: "innerHTML",
        });

        getItemById("modalActasRegistro").close();
        showAlert(data.data, "success");
      } else {
        showAlert(data.data, "error");
      }
    })
    .catch((error) => {
      showAlert(error, "error");
    });
}

window.eliminarBautismo = eliminarBautismo;
