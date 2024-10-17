// Datos iniciales de movimientos vacíos
let movimientos = [];

// Lista completa de operarios
const operarios = [
    "Barbali Jorge", "Barsamello Flavia", "Bravo Leonardo", "Giacomelli Franco",
    "Harrison Federico", "Irusta Carlos", "Mendoza Federico", "Moyano Guillermo",
    "Peralta Ricardo", "Rearte Cristian", "Schuler Guido", "Vilchez Juan"
];

// Lista completa de operaciones
const operaciones = [
    "Diseño", "Corte + Preparación", "Torno Convencional", "Torno CNC",
    "Fresa Convencional", "Fresa CNC", "Rectificado", "Afilado", "Soldadura",
    "Pavonado", "Inspección y Control", "Armado y Embalado", "Trabajo General",
    "Trabajo de Terceros"
];

// Función para registrar un nuevo movimiento
function registrarMovimiento() {
    const numeroPlano = document.getElementById("numero_plano").value;
    const numeroPlanoCliente = document.querySelector("#numero_plano option:checked").dataset.planoCliente;
    const cliente = document.querySelector("#numero_plano option:checked").dataset.cliente;
    const numeroPedido = document.querySelector("#numero_plano option:checked").dataset.pedido;
    const operario = document.getElementById("operario").value;
    const operacion = document.getElementById("operacion").value;

    // Crear el nuevo movimiento
    const nuevoMovimiento = {
        numeroPlano,
        numeroPlanoCliente,
        cliente,
        numeroPedido,
        operaciones: [
            {
                operacion,
                operario,
                fechaInicio: new Date().toISOString().slice(0, 16), // Fecha y hora actuales
                fechaCierre: "",
                scrap: "",
                observacion: "",
                ordenFabricacion: "N/A",
                designacion: "N/A",
                cantidad: "N/A",
                material: "N/A",
                dimensiones: "N/A"
            }
        ]
    };

    // Agregar el nuevo movimiento al historial
    movimientos.push(nuevoMovimiento);

    // Actualizar la tabla de movimientos después de registrar
    generarTablaMovimientos();
}

// Función para generar y mostrar los detalles de movimientos
function generarTablaMovimientos() {
    const tablaCuerpo = document.getElementById("historialMovimientos");
    tablaCuerpo.innerHTML = ""; // Limpiar el contenido de la tabla

    if (movimientos.length === 0) return; // No mostrar nada si no hay movimientos

    movimientos.forEach((movimiento, index) => {
        const fila = document.createElement("tr");
        fila.onclick = () => toggleDetalles(index);

        fila.innerHTML = `
            <td>${movimiento.numeroPlano}</td>
            <td>${movimiento.numeroPlanoCliente}</td>
            <td>${movimiento.cliente}</td>
            <td>${movimiento.numeroPedido}</td>
        `;
        tablaCuerpo.appendChild(fila);

        // Crear la tabla de detalles de la pieza
        const detalleFila = document.createElement("tr");
        detalleFila.id = `detalles_${index}`;
        detalleFila.style.display = "none"; // Oculto por defecto

        detalleFila.innerHTML = `
            <td colspan="4">
                <div class="detalles">
                    <h4>Detalles de la Pieza</h4>
                    <table>
                        <tbody>
                            <tr>
                                <td><strong>Nº de Plano:</strong> ${movimiento.numeroPlano}</td>
                                <td><strong>Cliente:</strong> ${movimiento.cliente}</td>
                                <td><strong>Fecha de Inicio:</strong> ${movimiento.operaciones[0].fechaInicio}</td>
                                <td><strong>Nº de Pedido:</strong> ${movimiento.numeroPedido}</td>
                                <td><strong>Orden de Fabricación:</strong> ${movimiento.operaciones[0].ordenFabricacion}</td>
                            </tr>
                            <tr>
                                <td><strong>Nº de Plano Cliente:</strong> ${movimiento.numeroPlanoCliente}</td>
                                <td><strong>Designación:</strong> ${movimiento.operaciones[0].designacion}</td>
                                <td><strong>Cantidad:</strong> ${movimiento.operaciones[0].cantidad}</td>
                                <td><strong>Material:</strong> ${movimiento.operaciones[0].material}</td>
                                <td><strong>Dimensiones:</strong> ${movimiento.operaciones[0].dimensiones}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </td>
        `;

        tablaCuerpo.appendChild(detalleFila);

        // Crear las filas de detalles (desplegables) de las operaciones
        movimiento.operaciones.forEach((op, subIndex) => {
            const operacionFila = document.createElement("tr");
            operacionFila.id = `detalles_operacion_${index}_${subIndex}`;
            operacionFila.style.display = "none"; // Oculto por defecto

            operacionFila.innerHTML = `
                <td colspan="4">
                    <div>
                        <h4>Detalles de la Operación</h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>Operación</th>
                                    <th>Operario</th>
                                    <th>Fecha de Inicio</th>
                                    <th>Fecha de Cierre</th>
                                    <th>Scrap</th>
                                    <th>Observación</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>${op.operacion}</td>
                                    <td>${op.operario}</td>
                                    <td><input type="datetime-local" value="${op.fechaInicio}"></td>
                                    <td><input type="datetime-local" value="${op.fechaCierre}"></td>
                                    <td><input type="text" value="${op.scrap}"></td>
                                    <td><input type="text" value="${op.observacion}"></td>
                                    <td>
                                        <button class="guardar-btn" onclick="guardarFila(${index}, ${subIndex})">Guardar</button>
                                        <button class="editar-btn" onclick="editarFila(${index}, ${subIndex})">Editar</button>
                                        <button class="cerrar-btn" onclick="cerrarOperacion(${index}, ${subIndex})">Cerrar</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </td>
            `;
            tablaCuerpo.appendChild(operacionFila);
        });
    });
}

// Función para alternar el despliegue de detalles
function toggleDetalles(index) {
    const detalles = document.querySelectorAll(`#detalles_${index}, #detalles_operacion_${index}_0, #detalles_operacion_${index}_1`);
    detalles.forEach(detalle => {
        detalle.style.display = detalle.style.display === "none" ? "table-row" : "none";
    });
}

// Función para cerrar una operación
function cerrarOperacion(index, subIndex) {
    const operacion = movimientos[index].operaciones[subIndex];
    operacion.fechaCierre = new Date().toISOString().slice(0, 16); // Asignar fecha y hora actuales
    alert(`Cerrando la operación ${subIndex} del movimiento ${index}`);
    generarTablaMovimientos(); // Actualizar la tabla para reflejar el cierre
}

// Función para editar una fila (simulación)
function editarFila(index, subIndex) {
    alert(`Editando la operación ${subIndex} del movimiento ${index}`);
}

// Función para guardar una fila (simulación)
function guardarFila(index, subIndex) {
    alert(`Guardando la operación ${subIndex} del movimiento ${index}`);
}

// Inicializar la tabla de movimientos al cargar la página
window.onload = function() {
    generarTablaMovimientos();
};
