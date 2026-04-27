import { useHorarioStore } from '@/stores/horario.store';
import { GrillaHorario } from '@/components/GrillaHorario';

export function PaginaVerHorario() {
  const { estado, asignaciones, tiempoGeneracionMs } = useHorarioStore();

  if (estado !== 'generado' || asignaciones.length === 0) {
    return (
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">📅 Horario Generado</h1>
            <p className="page-subtitle">Grilla semanal de asignaciones</p>
          </div>
        </div>
        <div className="glass-card empty-state">
          <div className="empty-state-icon">📋</div>
          <div className="empty-state-title">Aún no hay horario generado</div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Ve a la sección &quot;Generar Horario&quot; para crear una asignación óptima.
          </p>
          <a href="/dashboard/generar" className="btn btn-primary">
            🧠 Ir a Generar Horario
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">📅 Horario Generado</h1>
          <p className="page-subtitle">
            {asignaciones.length} asignaciones · {tiempoGeneracionMs}ms · 0 conflictos
          </p>
        </div>
      </div>

      <GrillaHorario asignaciones={asignaciones} />

      {/* Lista detallada */}
      <div className="glass-card" style={{ marginTop: '1.5rem', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--glass-border)' }}>
          <h3>📋 Detalle de Asignaciones</h3>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Curso</th>
              <th>Docente</th>
              <th>Aula</th>
              <th>Día</th>
              <th>Horario</th>
              <th>Grupo</th>
            </tr>
          </thead>
          <tbody>
            {asignaciones.map((a, i) => {
              const nombresDias: Record<number, string> = {
                1: 'Lunes',
                2: 'Martes',
                3: 'Miércoles',
                4: 'Jueves',
                5: 'Viernes',
                6: 'Sábado',
              };
              return (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>{a.cursoNombre}</td>
                  <td>{a.docenteNombre}</td>
                  <td>{a.aulaNombre}</td>
                  <td>
                    <span className="badge badge-info">{nombresDias[a.diaSemana]}</span>
                  </td>
                  <td style={{ fontFamily: 'monospace' }}>
                    {a.horaInicio} - {a.horaFin}
                  </td>
                  <td>{a.tamanoGrupo} est.</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
