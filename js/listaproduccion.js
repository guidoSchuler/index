// Datos simulados para la lista de producción
const piezasEnProduccion = [
    {
        numeroPlano: "D137500000",
        numeroPlanoCliente: "P132400009",
        cliente: "Scania S.A.",
        numeroPedido: 866,
        operario: "Bravo Leonardo",
        operaciones: [
            { operacion: "Corte", operario: "Bravo Leonardo", fechaInicio: "2024-09-01T08:00", fechaCierre: "2024-09-01T09:00", scrap: "No", observacion: "N/A" },
            { operacion: "Torno CNC", operario: "Bravo Leonardo", fechaInicio: "2024-09-01T09:30", fechaCierre: "2024-09-01T11:30", scrap: "No", observacion: "N/A" },
            { operacion: "Inspección", operario: "Irusta Carlos", fechaInicio: "2024-09-01T12:00", fechaCierre: "2024-09-01T12:30", scrap: "No", observacion: "Aprobado" }
        ],
        estado: "En Proceso",
        designacion: "Eje Cónico",
        cantidad: 10,
        material: "SAE4140",
        dimensiones: "120x80x60 mm"
    },
    {
        numeroPlano: "S060600000",
        numeroPlanoCliente: "S54321-02",
        cliente: "Kennametal",
        numeroPedido: 543,
        operario: "Irusta Carlos",
        operaciones: [
            { operacion: "Corte + Preparación", operario: "Irusta Carlos", fechaInicio: "2024-09-05T09:00", fechaCierre: "2024-09-05T10:00", scrap: "No", observacion: "N/A" },
            { operacion: "Torno CNC", operario: "Giacomelli Franco", fechaInicio: "2024-09-06T10:30", fechaCierre: null, scrap: "No", observacion: "N/A" }
        ],
        estado: "En Proceso",
        designacion: "Fresa Diámetro 50 mm",
        cantidad: 5,
        material: "SAE1010",
        dimensiones: "150x100x75 mm"
    }
];

// Función para manejar la búsqueda por criterio y valor
function buscarPiezasProduccion() {
    const criterioBusqueda = document.getElementById("criterioBusqueda").value;
    const valorBusqueda = document.getElementById("valorBusqueda").value.toLowerCase();

    let resultados = [];

    if (valorBusqueda === "" || criterioBusqueda === "todas") {
        resultados = piezasEnProduccion; // Mostrar todas las piezas si no hay valor de búsqueda o si se selecciona "Todas"
    } else {
        resultados = piezasEnProduccion.filter((pieza) => {
            switch (criterioBusqueda) {
                case "numeroPlano":
                    return pieza.numeroPlano.toLowerCase().includes(valorBusqueda); // Coincidencias parciales
                case "numeroPlanoCliente":
                    return pieza.numeroPlanoCliente.toLowerCase().includes(valorBusqueda);
                case "cliente":
                    return pieza.cliente.toLowerCase().includes(valorBusqueda);
                case "numeroPedido":
                    return pieza.numeroPedido.toString().includes(valorBusqueda);
                default:
                    return false;
            }
        });
    }

    mostrarResultadosProduccion(resultados);
}

// Mostrar todas las piezas por defecto al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    mostrarResultadosProduccion(piezasEnProduccion); // Mostrar todas las piezas inicialmente
    
    // Agregar event listener al botón de búsqueda solo cuando el DOM esté cargado
    const buscarBtn = document.getElementById("buscarBtn");
    if (buscarBtn) {
        buscarBtn.addEventListener("click", buscarPiezasProduccion); // Enlazar correctamente el botón
    }

    actualizarOpcionesBusqueda(); // Inicializar las opciones del menú desplegable
});

// Función para mostrar los resultados de la búsqueda en producción (con detalle de la pieza desplegable)
function mostrarResultadosProduccion(resultados) {
    const tablaCuerpo = document.querySelector("#resultadosTabla tbody");
    tablaCuerpo.innerHTML = ""; // Limpiar resultados anteriores

    resultados.forEach((pieza, index) => {
        const fila = document.createElement("tr");
        fila.onclick = () => toggleDetallesProduccion(index);

        fila.innerHTML = `
            <td>${pieza.numeroPlano}</td>
            <td>${pieza.numeroPlanoCliente}</td>
            <td>${pieza.cliente}</td>
            <td>${pieza.numeroPedido}</td>
        `;

        const detalleFila = document.createElement("tr");
        detalleFila.id = `detalles_${index}`;
        detalleFila.style.display = "none";

        // Agregar los detalles de la pieza y la tabla de operaciones debajo
        detalleFila.innerHTML = `
            <td colspan="4">
                <div class="detalles">
                    <h4>Detalles de la Pieza</h4>
                    <table>
                        <tr>
                            <td><strong>Nº de Plano:</strong> ${pieza.numeroPlano}</td>
                            <td><strong>Cliente:</strong> ${pieza.cliente}</td>
                            <td><strong>Fecha de Inicio:</strong> ${pieza.operaciones[0].fechaInicio.replace("T", " ")}</td>
                            <td><strong>Nº de Pedido:</strong> ${pieza.numeroPedido}</td>
                        </tr>
                        <tr>
                            <td><strong>Nº de Plano Cliente:</strong> ${pieza.numeroPlanoCliente}</td>
                            <td><strong>Designación:</strong> ${pieza.designacion || "N/A"}</td>
                            <td><strong>Cantidad:</strong> ${pieza.cantidad || "N/A"}</td>
                            <td><strong>Orden de Fabricación:</strong> ${pieza.operaciones[0].ordenFabricacion || "N/A"}</td>
                        </tr>
                        <tr>
                            <td><strong>Material:</strong> ${pieza.material || "N/A"}</td>
                            <td colspan="3"><strong>Dimensiones:</strong> ${pieza.dimensiones || "N/A"}</td>
                        </tr>
                    </table>

                    <h4>Informe de Operaciones</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Operación</th>
                                <th>Operario</th>
                                <th>Fecha de Inicio</th>
                                <th>Fecha de Cierre</th>
                                <th>Scrap</th>
                                <th>Observación</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${pieza.operaciones.map(op => `
                                <tr>
                                    <td>${op.operacion}</td>
                                    <td>${op.operario}</td>
                                    <td>${op.fechaInicio.replace("T", " ")}</td>
                                    <td>${op.fechaCierre ? op.fechaCierre.replace("T", " ") : "En Proceso"}</td>
                                    <td>${op.scrap}</td>
                                    <td>${op.observacion}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>
            </td>
        `;

        tablaCuerpo.appendChild(fila);
        tablaCuerpo.appendChild(detalleFila);
    });
}

// Función para alternar el despliegue de detalles en producción
function toggleDetallesProduccion(index) {
    const detalles = document.getElementById(`detalles_${index}`);
    detalles.style.display = detalles.style.display === "none" ? "table-row" : "none";
}

// Función para actualizar dinámicamente las opciones del menú desplegable "valor"
function actualizarOpcionesBusqueda() {
    const criterioBusqueda = document.getElementById("criterioBusqueda").value;
    const valorBusqueda = document.getElementById("valorBusqueda");
    valorBusqueda.innerHTML = ""; // Limpiar las opciones anteriores

    let opciones = [];

    switch (criterioBusqueda) {
        case "numeroPlano":
            opciones = [...new Set(piezasEnProduccion.map(pieza => pieza.numeroPlano))];
            break;
        case "numeroPlanoCliente":
            opciones = [...new Set(piezasEnProduccion.map(pieza => pieza.numeroPlanoCliente))];
            break;
        case "cliente":
            opciones = [...new Set(piezasEnProduccion.map(pieza => pieza.cliente))];
            break;
        case "numeroPedido":
            opciones = [...new Set(piezasEnProduccion.map(pieza => pieza.numeroPedido.toString()))];
            break;
        default:
            opciones = ["Elegir"];
    }

    opciones.forEach(opcion => {
        const opt = document.createElement("option");
        opt.value = opcion.toLowerCase();
        opt.textContent = opcion;
        valorBusqueda.appendChild(opt);
    });
}

// Agregar un event listener para cuando el criterio de búsqueda cambie, se actualicen las opciones
document.getElementById("criterioBusqueda").addEventListener("change", actualizarOpcionesBusqueda);
