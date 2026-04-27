import { useHorarioStore } from '@/stores/horario.store';

export function PaginaAulas() {
  const { aulas } = useHorarioStore();

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestión de Aulas</h1>
          <p className="page-subtitle">{aulas.length} espacios registrados</p>
        </div>
      </div>

      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <table className="data-table" id="tabla-aulas">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Edificio</th>
              <th>Piso</th>
              <th>Capacidad</th>
              <th>Tipo</th>
              <th>Proyector</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {aulas.map((aula) => (
              <tr key={aula.id}>
                <td style={{ fontWeight: 500 }}>{aula.nombre}</td>
                <td>{aula.edificio}</td>
                <td>{aula.piso}°</td>
                <td>{aula.capacidad} est.</td>
                <td>
                  {aula.esLaboratorio ? (
                    <span className="badge badge-warning">🔬 Laboratorio</span>
                  ) : (
                    <span className="badge badge-info">📖 Aula</span>
                  )}
                </td>
                <td>
                  {aula.tieneProyector ? (
                    <span style={{ color: 'var(--success)' }}>✅</span>
                  ) : (
                    <span style={{ color: 'var(--text-dimmed)' }}>—</span>
                  )}
                </td>
                <td>
                  <span className={`badge ${aula.estaActiva ? 'badge-success' : 'badge-danger'}`}>
                    {aula.estaActiva ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
