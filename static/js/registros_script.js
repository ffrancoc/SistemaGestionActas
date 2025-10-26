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

function toggleTab(tabName, visible) {
  const input = document.querySelector(`input[data-tab="${tabName}"]`);
  const content = document.querySelector(`.tab-content[data-tab="${tabName}"]`);

  if (input) input.style.display = visible ? "" : "none";
  if (content) content.style.display = visible ? "" : "none";
}

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
          toggleTab("bautismo", true);

          const fechaBautismo = dateToString(data.data.bautismo.fecha_bautismo);
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
          toggleTab("bautismo", false);
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
          toggleTab("comunion", true);
          const fechaComunion = dateToString(data.data.comunion.fecha_comunion);
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
          toggleTab("comunion", false);
          setInnerContent("noLibroComunionDetalle", "");
          setInnerContent("noFolioComunionDetalle", "");
          setInnerContent("noActaComunionDetalle", "");
          setInnerContent("parroquiaComunionDetalle", "");
          setInnerContent("fechaComunionDetalle", "");
          setInnerContent("parrocoComunionDetalle", "");
          setInnerContent("fechaCreacionComunionDetalle", "");
          setInnerContent("fechaModificacionComunionDetalle", "");
        }

        if ("confirmacion" in data.data) {
          toggleTab("confirmacion", true);

          const fechaConfirmacion = dateToString(
            data.data.confirmacion.fecha_confirmacion,
          );
          const noLibroConfirmacion = getOrDefault(
            data.data.confirmacion.no_libro,
          );
          const noFolioConfirmacion = getOrDefault(
            data.data.confirmacion.no_folio,
          );
          const noActaConfirmacion = getOrDefault(
            data.data.confirmacion.no_acta,
          );
          const obispoConfirmacion = data.data.confirmacion.obispo;
          const parrocoConfirmacion = data.data.confirmacion.parroco;
          const padrinoConfirmacion = data.data.confirmacion.padrino;
          const parroquiaConfirmacion =
            data.data.confirmacion.parroquia_confirmacion;
          const fechaCreacionConfirmacion = dateTimeToString(
            data.data.confirmacion.creacion,
          );
          const fechaModificacionConfirmacion = dateTimeToString(
            data.data.confirmacion.modificacion,
          );

          setInnerContent("noLibroConfirmacionDetalle", noLibroConfirmacion);
          setInnerContent("noFolioConfirmacionDetalle", noFolioConfirmacion);
          setInnerContent("noActaConfirmacionDetalle", noActaConfirmacion);
          setInnerContent(
            "parroquiaConfirmacionDetalle",
            parroquiaConfirmacion,
          );
          setInnerContent("fechaConfirmacionDetalle", fechaConfirmacion);
          setInnerContent("obispoConfirmacionDetalle", obispoConfirmacion);
          setInnerContent("parrocoConfirmacionDetalle", parrocoConfirmacion);
          setInnerContent("padrinoConfirmacionDetalle", padrinoConfirmacion);
          setInnerContent(
            "fechaCreacionConfirmacionDetalle",
            fechaCreacionConfirmacion,
          );
          setInnerContent(
            "fechaModificacionConfirmacionDetalle",
            fechaModificacionConfirmacion,
          );
        } else {
          toggleTab("confirmacion", false);

          setInnerContent("noLibroConfirmacionDetalle", "");
          setInnerContent("noFolioConfirmacionDetalle", "");
          setInnerContent("noActaConfirmacionDetalle", "");
          setInnerContent("parroquiaConfirmacionDetalle", "");
          setInnerContent("fechaConfirmacionDetalle", "");
          setInnerContent("obispoConfirmacionDetalle", "");
          setInnerContent("parrocoConfirmacionDetalle", "");
          setInnerContent("padrinoConfirmacionDetalle", "");
          setInnerContent("fechaCreacionConfirmacionDetalle", "");
          setInnerContent("fechaModificacionConfirmacionDetalle", "");
        }

        if ("matrimonio" in data.data) {
          toggleTab("matrimonio", true);
        } else {
          toggleTab("matrimonio", false);
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

        getItemById("modificarIcon").style.display = "block";
        getItemById("registrarIcon").style.display = "none";

        setInnerContent("modalGuardarRegistroTitulo", "Modificar");
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
  getItemById("modificarIcon").style.display = "none";
  getItemById("registrarIcon").style.display = "block";

  setInnerContent("modalGuardarRegistroTitulo", "Nuevo");
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
