import { useHorarioStore } from '@/stores/horario.store';

export function PaginaCursos() {
  const { cursos } = useHorarioStore();

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Catálogo de Cursos</h1>
          <p className="page-subtitle">{cursos.length} cursos registrados en el sistema</p>
        </div>
      </div>

      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <table className="data-table" id="tabla-cursos">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Créditos</th>
              <th>Horas/Sem</th>
              <th>Capacidad</th>
              <th>Semestre</th>
              <th>Lab</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.id}>
                <td>
                  <span style={{ fontFamily: 'monospace', color: 'var(--accent)' }}>
                    {curso.codigo}
                  </span>
                </td>
                <td style={{ fontWeight: 500 }}>{curso.nombre}</td>
                <td>{curso.creditos}</td>
                <td>{curso.horasSemanales}h</td>
                <td>{curso.capacidadMaxima} est.</td>
                <td>
                  <span className="badge badge-info">{curso.semestre}°</span>
                </td>
                <td>
                  {curso.requiereLab ? (
                    <span className="badge badge-warning">🔬 Sí</span>
                  ) : (
                    <span style={{ color: 'var(--text-dimmed)' }}>—</span>
                  )}
                </td>
                <td>
                  <span className={`badge ${curso.estaActivo ? 'badge-success' : 'badge-danger'}`}>
                    {curso.estaActivo ? 'Activo' : 'Inactivo'}
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
