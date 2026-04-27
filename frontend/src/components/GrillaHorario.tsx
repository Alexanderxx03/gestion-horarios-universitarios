import type { AsignacionHorario } from '@/lib/tipos';

interface PropiedadesGrillaHorario {
  asignaciones: AsignacionHorario[];
}

const ENCABEZADOS_DIAS = ['Hora', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const FILAS_HORARIO = [
  { etiqueta: '07:00\n09:00', inicio: '07:00', fin: '09:00' },
  { etiqueta: '09:00\n11:00', inicio: '09:00', fin: '11:00' },
  { etiqueta: '11:00\n13:00', inicio: '11:00', fin: '13:00' },
  { etiqueta: '14:00\n16:00', inicio: '14:00', fin: '16:00' },
  { etiqueta: '16:00\n18:00', inicio: '16:00', fin: '18:00' },
];

/**
 * Grilla semanal de horarios.
 * Muestra las asignaciones en una tabla de días × franjas horarias
 * con colores por curso para facilitar la lectura.
 */
export function GrillaHorario({ asignaciones }: PropiedadesGrillaHorario) {
  // Generar mapa de colores por curso (índice estable)
  const idsCursos = [...new Set(asignaciones.map((a) => a.cursoId))];
  const mapaColores = new Map(idsCursos.map((id, i) => [id, i % 10]));

  // Crear lookup: `${diaSemana}-${horaInicio}` → asignación
  const grilla = new Map<string, AsignacionHorario>();
  for (const a of asignaciones) {
    const clave = `${a.diaSemana}-${a.horaInicio}`;
    grilla.set(clave, a);
  }

  return (
    <div className="schedule-container">
      <div className="schedule-grid">
        {/* Fila de encabezados */}
        {ENCABEZADOS_DIAS.map((encabezado) => (
          <div key={encabezado} className="schedule-header">
            {encabezado}
          </div>
        ))}

        {/* Filas de datos */}
        {FILAS_HORARIO.map((fila) => (
          <>
            {/* Columna de hora */}
            <div key={`hora-${fila.inicio}`} className="schedule-time">
              <div>
                <div style={{ fontWeight: 600 }}>{fila.inicio}</div>
                <div style={{ fontSize: '0.65rem', opacity: 0.6 }}>{fila.fin}</div>
              </div>
            </div>

            {/* Columnas de días (1-6) */}
            {[1, 2, 3, 4, 5, 6].map((dia) => {
              const clave = `${dia}-${fila.inicio}`;
              const asignacion = grilla.get(clave);

              return (
                <div key={clave} className="schedule-cell">
                  {asignacion && (
                    <div
                      className={`schedule-event color-${mapaColores.get(asignacion.cursoId) ?? 0}`}
                      title={`${asignacion.cursoNombre}\n${asignacion.docenteNombre}\n${asignacion.aulaNombre}`}
                    >
                      <div className="schedule-event-title">{asignacion.cursoNombre}</div>
                      <div className="schedule-event-detail">👨‍🏫 {asignacion.docenteNombre}</div>
                      <div className="schedule-event-detail">🏫 {asignacion.aulaNombre}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
}
