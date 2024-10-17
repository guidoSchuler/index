// Datos simulados con el estado corregido según las piezas en proceso y terminadas
const datosSimulados = [
    {
        numeroPlano: "D137500000", 
        numeroPlanoCliente: "P132400009", 
        cliente: "Scania S.A.", 
        numeroPedido: 866, 
        operario: "Bravo Leonardo", 
        operaciones: [
            { operacion: "Corte", operario: "Bravo Leonardo", fechaInicio: "2024-09-01T08:00", fechaCierre: "2024-09-01T09:00", tiempoTotal: 60, scrap: "No", observacion: "N/A" },
            { operacion: "Torno CNC", operario: "Bravo Leonardo", fechaInicio: "2024-09-01T09:30", fechaCierre: "2024-09-01T11:30", tiempoTotal: 120, scrap: "No", observacion: "N/A" },
            { operacion: "Inspección", operario: "Irusta Carlos", fechaInicio: "2024-09-01T12:00", fechaCierre: "2024-09-01T12:30", tiempoTotal: 30, scrap: "No", observacion: "Aprobado" }
        ],
        estado: "Terminado",
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
            { operacion: "Corte + Preparación", operario: "Irusta Carlos", fechaInicio: "2024-09-05T09:00", fechaCierre: "2024-09-05T10:00", tiempoTotal: 60, scrap: "No", observacion: "N/A" },
            { operacion: "Torno CNC", operario: "Giacomelli Franco", fechaInicio: "2024-09-06T10:30", fechaCierre: null, tiempoTotal: 150, scrap: "No", observacion: "N/A" }
        ],
        estado: "En Proceso",
        designacion: "Fresa Diámetro 50 mm",
        cantidad: 5,
        material: "SAE1010",
        dimensiones: "150x100x75 mm"
    },
    {
        numeroPlano: "D138500001", 
        numeroPlanoCliente: "P12345001", 
        cliente: "Scania S.A.", 
        numeroPedido: 789, 
        operario: "Barsamello Flavia", 
        operaciones: [
            { operacion: "Rectificado", operario: "Barsamello Flavia", fechaInicio: "2024-09-07T08:00", fechaCierre: "2024-09-07T10:00", tiempoTotal: 120, scrap: "No", observacion: "N/A" }
        ],
        estado: "Terminado",
        designacion: "Escariador",
        cantidad: 7,
        material: "SAE4041",
        dimensiones: "100x50x50 mm"
    },
    {
        numeroPlano: "D138500002", 
        numeroPlanoCliente: "P54321002", 
        cliente: "Scania S.A.", 
        numeroPedido: 790, 
        operario: "Harrison Federico", 
        operaciones: [
            { operacion: "Soldadura", operario: "Harrison Federico", fechaInicio: "2024-09-08T11:00", fechaCierre: "2024-09-08T14:00", tiempoTotal: 180, scrap: "No", observacion: "Sin defectos" }
        ],
        estado: "Terminado",
        designacion: "Engranaje Cónico",
        cantidad: 15,
        material: "SAE4041",
        dimensiones: "110x55x45 mm"
    },
    {
        numeroPlano: "F174500002", 
        numeroPlanoCliente: "F123456789", 
        cliente: "Scania S.A.", 
        numeroPedido: 678, 
        operario: "Barbali Jorge", 
        operaciones: [
            { operacion: "Diseño", operario: "Barbali Jorge", fechaInicio: "2024-09-10T08:00", fechaCierre: null, tiempoTotal: 240, scrap: "No", observacion: "Ninguna" }
        ],
        estado: "En Proceso",
        designacion: "Pieza Especial",
        cantidad: 20,
        material: "SAE1020",
        dimensiones: "200x150x100 mm"
    }
];

// Función para manejar la búsqueda por criterio y valor exacto, y filtrar por estado
function buscar() {
    const criterioBusqueda = document.getElementById("criterioBusqueda").value;
    const valorBusqueda = document.getElementById("valorBusqueda").value.toLowerCase();
    const estadoBusqueda = document.getElementById("estadoBusqueda").value; // Obtener el estado seleccionado

    let resultados = datosSimulados;

    // Filtrar por el criterio de búsqueda seleccionado
    if (valorBusqueda !== "" && criterioBusqueda !== "todas") {
        resultados = resultados.filter(dato => {
            switch (criterioBusqueda) {
                case "numeroPlano":
                    return dato.numeroPlano.toLowerCase().includes(valorBusqueda);
                case "numeroPlanoCliente":
                    return dato.numeroPlanoCliente.toLowerCase().includes(valorBusqueda);
                case "cliente":
                    return dato.cliente.toLowerCase().includes(valorBusqueda);
                case "numeroPedido":
                    return dato.numeroPedido.toString().includes(valorBusqueda);
                case "operario":
                    return dato.operario.toLowerCase().includes(valorBusqueda);
                default:
                    return false;
            }
        });
    }

    // Filtrar por estado si se selecciona algo diferente de "todas"
    if (estadoBusqueda !== "todas") {
        resultados = resultados.filter(dato => dato.estado.toLowerCase() === estadoBusqueda.toLowerCase()); // Comparación del estado
    }

    mostrarResultados(resultados);
}

// Mostrar todas las piezas por defecto al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    mostrarResultados(datosSimulados); // Mostrar todas las piezas inicialmente
    actualizarOpcionesBusqueda(); // Inicializar las opciones del menú desplegable
});

// Función para mostrar los resultados de búsqueda con ajuste de los detalles en dos filas
function mostrarResultados(resultados) {
    const tablaCuerpo = document.querySelector("#resultadosTabla tbody");
    tablaCuerpo.innerHTML = ""; // Limpiar resultados anteriores

    resultados.forEach((resultado, index) => {
        const fila = document.createElement("tr");
        fila.onclick = () => toggleDetalles(index);

        fila.innerHTML = `
            <td>${resultado.numeroPlano}</td>
            <td>${resultado.numeroPlanoCliente}</td>
            <td>${resultado.cliente}</td>
            <td>${resultado.numeroPedido}</td>
            <td>${resultado.estado}</td> <!-- Mostrar estado -->
        `;

        const detalleFila = document.createElement("tr");
        detalleFila.id = `detalles_${index}`;
        detalleFila.style.display = "none";

        let tiempoTotal = 0;
        resultado.operaciones.forEach(op => {
            tiempoTotal += op.tiempoTotal;
        });

        const colorEstado = resultado.estado === "Terminado" ? "green" : "red";

        // Compactar toda la información en dos filas principales
        detalleFila.innerHTML = `
            <td colspan="5">
                <div class="detalles">
                    <h4>Detalles de la Pieza</h4>
                    <table>
                        <!-- Primera fila compacta -->
                        <tr>
                            <td><strong>Nº de Plano:</strong> ${resultado.numeroPlano}</td>
                            <td><strong>Cliente:</strong> ${resultado.cliente}</td>
                            <td><strong>Fecha de Inicio:</strong> ${resultado.operaciones[0].fechaInicio.replace("T", " ")}</td>
                            <td><strong>Nº de Pedido:</strong> ${resultado.numeroPedido}</td>
                        </tr>
                        <!-- Segunda fila compacta -->
                        <tr>
                            <td><strong>Nº de Plano Cliente:</strong> ${resultado.numeroPlanoCliente}</td>
                            <td><strong>Designación:</strong> ${resultado.designacion || "N/A"}</td>
                            <td><strong>Cantidad:</strong> ${resultado.cantidad || "N/A"}</td>
                            <td><strong>Orden de Fabricación:</strong> ${resultado.operaciones[0].ordenFabricacion || "N/A"}</td>
                        </tr>
                        <!-- Material y Dimensiones combinados en la misma fila para ahorrar espacio -->
                        <tr>
                            <td colspan="2"><strong>Material:</strong> ${resultado.material || "N/A"}</td>
                            <td colspan="2"><strong>Dimensiones:</strong> ${resultado.dimensiones || "N/A"}</td>
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
                                <th>Tiempo Total</th>
                                <th>Scrap</th>
                                <th>Observación</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${resultado.operaciones.map(op => `
                                <tr>
                                    <td>${op.operacion}</td>
                                    <td>${op.operario}</td>
                                    <td>${op.fechaInicio.replace("T", " ")}</td>
                                    <td>${op.fechaCierre ? op.fechaCierre.replace("T", " ") : "En Proceso"}</td>
                                    <td>${op.tiempoTotal} min</td>
                                    <td>${op.scrap}</td>
                                    <td>${op.observacion}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>

                    <p><strong>Tiempo Total:</strong> ${tiempoTotal} min</p>
                    <p><strong>Estado:</strong> <span style="color:${colorEstado};">${resultado.estado}</span></p>
                </div>
            </td>
        `;

        tablaCuerpo.appendChild(fila);
        tablaCuerpo.appendChild(detalleFila);
    });
}

// Función para alternar el despliegue de detalles
function toggleDetalles(index) {
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
            opciones = [...new Set(datosSimulados.map(d => d.numeroPlano))];
            break;
        case "numeroPlanoCliente":
            opciones = [...new Set(datosSimulados.map(d => d.numeroPlanoCliente))];
            break;
        case "cliente":
            opciones = [...new Set(datosSimulados.map(d => d.cliente))];
            break;
        case "numeroPedido":
            opciones = [...new Set(datosSimulados.map(d => d.numeroPedido))];
            break;
        case "operario":
            opciones = [...new Set(datosSimulados.map(d => d.operario))];
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
