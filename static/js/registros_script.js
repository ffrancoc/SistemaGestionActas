import {
  setInnerContent,
  setValueContent,
  getItemById,
  getItemByQuery,
  dateToString,
  dateTimeToString,
  formatDateForInput,
  getOrDefault,
  showAlert,
} from "./utils.js";

/*######################################################################################## */
/* Código para mostrar modal de detalles de registro */
/*######################################################################################## */

function mostrarRegistroDetalles(registroId) {
  const url = detalleActasURL.replace("/0/", "/" + registroId + "/");

  const tabs = getItemByQuery('input[name="tabRegistroDetalle"]');
  tabs.forEach((tab) => {
    if (tab.getAttribute("aria-label") === "Información") {
      tab.checked = true;
    }
  });

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "ok") {
        const infoMadre = `${data.data.registro.madre_nombre} ${data.data.registro.madre_apellido}`;
        const infoPadre = `${data.data.registro.padre_nombre} ${data.data.registro.padre_apellido}`;
        const nombreCompleto = `${data.data.registro.nombre} ${data.data.registro.apellido}`;
        const fechaModificacion = dateTimeToString(
          data.data.registro.modificacion,
        );
        const fechaNacimiento = dateToString(
          data.data.registro.fecha_nacimiento,
        );
        const parroquiaPertenencia = data.data.registro.parroquia_pertenencia;
        const fechaCreacion = dateTimeToString(data.data.registro.creacion);
        const lugarNacimiento = data.data.registro.lugar_nacimiento;
        const genero = data.data.registro.genero;

        setInnerContent("parroquiaPertenencia", parroquiaPertenencia);
        setInnerContent("fechaModificacion", fechaModificacion);
        setInnerContent("lugarNacimiento", lugarNacimiento);
        setInnerContent("fechaNacimiento", fechaNacimiento);
        setInnerContent("nombreCompleto", nombreCompleto);
        setInnerContent("fechaCreacion", fechaCreacion);
        setInnerContent("infoMadre", infoMadre);
        setInnerContent("infoPadre", infoPadre);
        setInnerContent("genero", genero);

        if ("bautismo" in data.data) {
          const fechaBautismo = dateTimeToString(
            data.data.bautismo.fecha_bautismo,
          );
          const padrino2Bautismo = getOrDefault(data.data.bautismo.padrino_2);
          const noLibroBautismo = getOrDefault(data.data.bautismo.no_libro);
          const noFolioBautismo = getOrDefault(data.data.bautismo.no_folio);
          const noActaBautismo = getOrDefault(data.data.bautismo.no_acta);
          const sacerdoteBautismo = data.data.bautismo.sacerdote;
          const parroquiaBautismo = data.data.bautismo.parroquia_bautismo;
          const padrino1Bautismo = data.data.bautismo.padrino_1;
          const fechaCreacionBautismo = dateTimeToString(
            data.data.bautismo.creacion,
          );
          const fechaModificacionBautismo = dateTimeToString(
            data.data.bautismo.modificacion,
          );

          setInnerContent("noLibroBautismoDetalle", noLibroBautismo);
          setInnerContent("noFolioBautismoDetalle", noFolioBautismo);
          setInnerContent("noActaBautismoDetalle", noActaBautismo);
          setInnerContent("parroquiaBautismoDetalle", parroquiaBautismo);
          setInnerContent("fechaBautismoDetalle", fechaBautismo);
          setInnerContent("sacerdoteBautismoDetalle", sacerdoteBautismo);
          setInnerContent("padrino1BautismoDetalle", padrino1Bautismo);
          setInnerContent("padrino2BautismoDetalle", padrino2Bautismo);
          setInnerContent(
            "fechaCreacionBautismoDetalle",
            fechaCreacionBautismo,
          );
          setInnerContent(
            "fechaModificacionBautismoDetalle",
            fechaModificacionBautismo,
          );
        } else {
          setInnerContent("noLibroBautismoDetalle", "");
          setInnerContent("noFolioBautismoDetalle", "");
          setInnerContent("noActaBautismoDetalle", "");
          setInnerContent("parroquiaBautismoDetalle", "");
          setInnerContent("fechaBautismoDetalle", "");
          setInnerContent("sacerdoteBautismoDetalle", "");
          setInnerContent("padrino1BautismoDetalle", "");
          setInnerContent("padrino2BautismoDetalle", "");
          setInnerContent("fechaCreacionBautismoDetalle", "");
          setInnerContent("fechaModificacionBautismoDetalle", "");
        }

        if ("comunion" in data.data) {
          const fechaComunion = dateTimeToString(
            data.data.comunion.fecha_comunion,
          );
          const noLibroComunion = getOrDefault(data.data.comunion.no_libro);
          const noFolioComunion = getOrDefault(data.data.comunion.no_folio);
          const noActaComunion = getOrDefault(data.data.comunion.no_acta);
          const parrocoComunion = data.data.comunion.parroco;
          const parroquiaComunion = data.data.comunion.parroquia_comunion;
          const fechaCreacionComunion = dateTimeToString(
            data.data.comunion.creacion,
          );
          const fechaModificacionComunion = dateTimeToString(
            data.data.comunion.modificacion,
          );

          setInnerContent("noLibroComunionDetalle", noLibroComunion);
          setInnerContent("noFolioComunionDetalle", noFolioComunion);
          setInnerContent("noActaComunionDetalle", noActaComunion);
          setInnerContent("parroquiaComunionDetalle", parroquiaComunion);
          setInnerContent("fechaComunionDetalle", fechaComunion);
          setInnerContent("parrocoComunionDetalle", parrocoComunion);
          setInnerContent(
            "fechaCreacionComunionDetalle",
            fechaCreacionComunion,
          );
          setInnerContent(
            "fechaModificacionComunionDetalle",
            fechaModificacionComunion,
          );
        } else {
          setInnerContent("noLibroComunionDetalle", "");
          setInnerContent("noFolioComunionDetalle", "");
          setInnerContent("noActaComunionDetalle", "");
          setInnerContent("parroquiaComunionDetalle", "");
          setInnerContent("fechaComunionDetalle", "");
          setInnerContent("parrocoComunionDetalle", "");
          setInnerContent("fechaCreacionComunionDetalle", "");
          setInnerContent("fechaModificacionComunionDetalle", "");
        }

        const modalDetallePersona = getItemById("modalRegistroDetalle");
        modalDetallePersona.showModal();
      } else {
        showAlert(data.data, "error");
      }
    })
    .catch((error) => {
      showAlert(error, "error");
    });
}

window.mostrarRegistroDetalles = mostrarRegistroDetalles;

/*######################################################################################## */
/* Código para mostrar modal de modificar registro */
/*######################################################################################## */

function mostrarModificarRegistro(button) {
  const registroId = button.dataset.registroId;
  const url = detalleRegistroURL.replace("/0/", "/" + registroId + "/");

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "ok") {
        const nombre = data.data.nombre;
        const apellido = data.data.apellido;
        const lugarNacimiento = data.data.lugar_nacimiento;
        const parroquiaPertenencia = data.data.parroquia_pertenencia;
        const fechaNacimiento = formatDateForInput(
          dateToString(data.data.fecha_nacimiento),
        );
        const genero = data.data.genero;
        const madreNombre = data.data.madre_nombre;
        const madreApellido = data.data.madre_apellido;
        const padreNombre = data.data.padre_nombre;
        const padreApellido = data.data.padre_apellido;

        setValueContent("registroId", registroId);
        setValueContent("registroNombre", nombre);
        setValueContent("registroApellido", apellido);
        setValueContent("registroLugarNacimiento", lugarNacimiento);
        setValueContent("registroParroquia", parroquiaPertenencia);
        setValueContent("registroFechaNacimiento", fechaNacimiento);
        setValueContent("registroGenero", genero);
        setValueContent("registroMadreNombre", madreNombre);
        setValueContent("registroMadreApellido", madreApellido);
        setValueContent("registroPadreNombre", padreNombre);
        setValueContent("registroPadreApellido", padreApellido);

        const modalGuardarRegistro = getItemById("modalGuardarRegistro");
        modalGuardarRegistro.dataset.registroId = registroId;

        setInnerContent("modalGuardarRegistroTitulo", "Modificar Registro");
        setInnerContent("btnGuardarRegistro", "Actualizar");
        modalGuardarRegistro.showModal();
      }
    })
    .catch((error) => {
      showAlert(error, "error");
    });
}

window.mostrarModificarRegistro = mostrarModificarRegistro;

/*######################################################################################## */
/* Código mostrar modal de eliminar registro */
/*######################################################################################## */

function mostrarEliminarRegistro(button) {
  const registroId = button.dataset.registroId;
  const modalEliminarRegistro = getItemById("modalEliminarRegistro");

  modalEliminarRegistro.dataset.registroId = registroId;
  modalEliminarRegistro.showModal();
}

window.mostrarEliminarRegistro = mostrarEliminarRegistro;

/*######################################################################################## */
/* Código para eliminar información en la base de datos */
/*######################################################################################## */

function eliminarRegistro() {
  const modalEliminarRegistro = getItemById("modalEliminarRegistro");
  const personaId = modalEliminarRegistro.dataset.registroId;

  const url = eliminarRegistroURL.replace("/0/", "/" + personaId + "/");

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      modalEliminarRegistro.close();
      htmx.ajax("GET", tablaRegistrosURL, {
        target: "#tabla",
        swap: "innerHTML",
      });
      if (data.status === "ok") {
        showAlert(data.data, "success");
      } else {
        showAlert(data.data, "error");
      }
    })
    .catch((error) => {
      showAlert(error, "error");
    });
}

window.eliminarRegistro = eliminarRegistro;

/*######################################################################################## */
/* Código mostrar modal de guardar registro */
/*######################################################################################## */

function mostrarGuardarRegistro() {
  const modalGuardarRegistro = getItemById("modalGuardarRegistro");
  setInnerContent("modalGuardarRegistroTitulo", "Nuevo Registro");
  setInnerContent("btnGuardarRegistro", "Guardar");
  modalGuardarRegistro.showModal();
}

window.mostrarGuardarRegistro = mostrarGuardarRegistro;

const modalGuardarRegistro = getItemById("modalGuardarRegistro");
modalGuardarRegistro.addEventListener("close", () => {
  getItemById("formRegistro").reset();
});

/*######################################################################################## */
/* Código para guardar información en la base de datos */
/*######################################################################################## */

const formRegistro = getItemById("formRegistro");
formRegistro.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(formRegistro);
  const data = Object.fromEntries(formData.entries());

  fetch(guardarRegistroURL, {
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
        const modalGuardarRegistro = getItemById("modalGuardarRegistro");
        modalGuardarRegistro.close();
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
