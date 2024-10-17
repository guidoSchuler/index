// Datos de ejemplo de notificaciones con detalles de operaciones
const notificaciones = [
    {
        numeroPlano: "D137500000",
        numeroPlanoCliente: "P134567890",
        cliente: "Scania S.A.",
        numeroPedido: 789,
        ordenesFabricacion: [
            {
                orden: "11",
                operaciones: [
                    { operacion: "Corte", operario: "Bravo Leonardo", fechaInicio: "2024-09-01 08:00", fechaCierre: "2024-09-01 09:00", scrap: 2, observacion: "N/A" },
                    { operacion: "Torno CNC", operario: "Bravo Leonardo", fechaInicio: "2024-09-01 09:30", fechaCierre: "2024-09-01 10:30", scrap: 0, observacion: "N/A" },
                    { operacion: "Fresa CNC", operario: "Irusta Carlos", fechaInicio: "2024-09-01 11:00", fechaCierre: "-", scrap: 0, observacion: "N/A" }
                ]
            },
            {
                orden: "11S",
                operaciones: [
                    { operacion: "Corte", operario: "Bravo Leonardo", fechaInicio: "2024-09-02 08:00", fechaCierre: "2024-09-02 09:00", scrap: 0, observacion: "N/A" },
                    { operacion: "Torno CNC", operario: "Bravo Leonardo", fechaInicio: "2024-09-02 09:30", fechaCierre: "2024-09-02 10:30", scrap: 0, observacion: "N/A" }
                ]
            }
        ],
        alerta: "2 piezas en scrap. Orden de producción generada para reponer."
    },
    {
        numeroPlano: "S060600000",
        numeroPlanoCliente: "S54321-02",
        cliente: "Kennametal",
        numeroPedido: 543,
        ordenesFabricacion: [
            {
                orden: "12",
                operaciones: [
                    { operacion: "Corte", operario: "Irusta Carlos", fechaInicio: "2024-09-03 08:00", fechaCierre: "2024-09-03 09:00", scrap: 0, observacion: "N/A" },
                    { operacion: "Preparación", operario: "Bravo Leonardo", fechaInicio: "2024-09-03 09:30", fechaCierre: "2024-09-03 10:30", scrap: 0, observacion: "N/A" },
                    { operacion: "Fresa CNC", operario: "Bravo Leonardo", fechaInicio: "2024-09-03 11:00", fechaCierre: "2024-09-03 12:30", scrap: 0, observacion: "N/A" }
                ]
            }
        ],
        alerta: "Sin iniciar operación hace 2 días."
    }
];

// Función para generar y mostrar los detalles de las notificaciones
function generarTablaNotificaciones() {
    const tablaCuerpo = document.querySelector("#notificacionesTabla tbody");
    tablaCuerpo.innerHTML = ""; // Limpiar el contenido de la tabla

    notificaciones.forEach((notificacion, index) => {
        // Crear la fila principal para la pieza
        const fila = document.createElement("tr");
        fila.onclick = () => toggleDetalles(index);

        fila.innerHTML = `
            <td>${notificacion.numeroPlano}</td>
            <td>${notificacion.numeroPlanoCliente}</td>
            <td>${notificacion.cliente}</td>
            <td>${notificacion.numeroPedido}</td>
            <td>${notificacion.ordenesFabricacion[0].orden}</td>
            <td>${notificacion.alerta}</td>
            <td>
                <div class="acciones">
                    <button class="resuelto-btn">Resuelto</button>
                    ${notificacion.ordenesFabricacion.length > 1 ? `<button class="combinar-btn">Combinar con original</button>` : ''}
                </div>
            </td>
        `;

        tablaCuerpo.appendChild(fila);

        // Crear las filas de detalles (desplegables)
        notificacion.ordenesFabricacion.forEach((orden, subIndex) => {
            const detalleFila = document.createElement("tr");
            detalleFila.id = `detalles_${index}_${subIndex}`;
            detalleFila.style.display = "none"; // Oculto por defecto

            const operacionesHtml = orden.operaciones.map(op => `
                <tr>
                    <td>${op.operacion}</td>
                    <td>${op.operario}</td>
                    <td>${op.fechaInicio}</td>
                    <td>${op.fechaCierre}</td>
                    <td>${orden.orden}</td>
                    <td>${op.scrap}</td>
                    <td>${op.observacion}</td>
                </tr>
            `).join("");

            detalleFila.innerHTML = `
                <td colspan="7">
                    <div>
                        <h4>Detalles de la pieza</h4> 
                        <table>
                            <thead>
                                <tr>
                                    <th>Operación</th>
                                    <th>Operario</th>
                                    <th>Fecha de Inicio</th>
                                    <th>Fecha de Cierre</th>
                                    <th>Orden de Fabricación</th>
                                    <th>Scrap</th>
                                    <th>Observación</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${operacionesHtml}
                            </tbody>
                        </table>
                    </div>
                </td>
            `;

            tablaCuerpo.appendChild(detalleFila);
        });
    });
}

// Función para alternar el despliegue de detalles
function toggleDetalles(index) {
    const detalles = document.querySelectorAll(`#detalles_${index}_0, #detalles_${index}_1`);
    detalles.forEach(detalle => {
        detalle.style.display = detalle.style.display === "none" ? "table-row" : "none";
    });
}

// Inicializar la tabla de notificaciones al cargar la página
window.onload = function() {
    generarTablaNotificaciones();
};
