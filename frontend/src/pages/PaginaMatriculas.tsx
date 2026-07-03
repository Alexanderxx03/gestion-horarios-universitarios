import { useState, useEffect, FormEvent } from 'react';
import { useHorarioStore } from '@/stores/horario.store';

interface Enrollment {
  _id: string;
  estudianteId: {
    _id: string;
    nombreCompleto: string;
    correo: string;
  };
  cursosSeleccionados: {
    cursoId: {
      _id: string;
      codigo: string;
      nombre: string;
      carreraId: string;
      semestre: number;
    };
    creditos: number;
  }[];
  creditosTotales: number;
  estado: string;
}

export function PaginaMatriculas() {
  const { cursos, carreras } = useHorarioStore();
  const [matriculas, setMatriculas] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [formData, setFormData] = useState({
    estudiante: '',
    cursosSeleccionados: [] as string[],
  });

  // Filtros y Paginación
  const [selectedCarrera, setSelectedCarrera] = useState<string>('');
  const [selectedCiclo, setSelectedCiclo] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const cursosActivos = cursos.filter((c) => c.estaActivo);

  useEffect(() => {
    fetch('http://localhost:5000/api/enrollments')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMatriculas(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching enrollments:', err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.cursosSeleccionados.length === 0) return;
    setMostrarForm(false);
    setFormData({ estudiante: '', cursosSeleccionados: [] });
  };

  const handleCursoToggle = (cursoId: string) => {
    setFormData((prev) => ({
      ...prev,
      cursosSeleccionados: prev.cursosSeleccionados.includes(cursoId)
        ? prev.cursosSeleccionados.filter((id) => id !== cursoId)
        : [...prev.cursosSeleccionados, cursoId],
    }));
  };

  // Lógica de Filtrado Local
  const filteredMatriculas = matriculas.filter((mat) => {
    const primerCurso = mat.cursosSeleccionados.find((cs) => cs.cursoId)?.cursoId;
    if (!primerCurso) return false;

    let pass = true;
    if (selectedCarrera) pass = pass && primerCurso.carreraId === selectedCarrera;
    if (selectedCiclo) pass = pass && primerCurso.semestre === parseInt(selectedCiclo);
    return pass;
  });

  // Lógica de Paginación
  const totalPages = Math.ceil(filteredMatriculas.length / itemsPerPage);
  const paginatedMatriculas = filteredMatriculas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div
        className="page-header"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div>
          <h1 className="page-title">Matrículas</h1>
          <p className="page-subtitle">Visualización de inscripciones de estudiantes</p>
        </div>
        <button className="btn btn-primary" onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? 'Cancelar' : '+ Nueva Matrícula'}
        </button>
      </div>

      {/* Selectores de Filtro */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Filtrar por Carrera:</label>
          <select 
            className="form-control" 
            value={selectedCarrera} 
            onChange={(e) => { setSelectedCarrera(e.target.value); setCurrentPage(1); }}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}
          >
            <option value="">-- Todas las Carreras --</option>
            {carreras.map(c => (
              <option key={c._id} value={c._id}>{c.nombre}</option>
            ))}
          </select>
        </div>
        <div style={{ flex: '1 1 300px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Filtrar por Ciclo:</label>
          <select 
            className="form-control" 
            value={selectedCiclo} 
            onChange={(e) => { setSelectedCiclo(e.target.value); setCurrentPage(1); }}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }}
          >
            <option value="">-- Todos los Ciclos --</option>
            {[1,2,3,4,5,6,7,8,9,10].map(ciclo => (
              <option key={ciclo} value={ciclo}>Ciclo {ciclo}</option>
            ))}
          </select>
        </div>
      </div>

      {mostrarForm && (
        <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <h3>Añadir Nueva Matrícula (Desactivado para demo)</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <label>Código o Nombre del Estudiante</label>
              <input
                type="text"
                required
                value={formData.estudiante}
                onChange={(e) => setFormData({ ...formData, estudiante: e.target.value })}
                style={{ width: '100%', padding: '0.5rem', maxWidth: '400px', display: 'block' }}
              />
            </div>

            <div>
              <label>Seleccionar Cursos a Inscribir</label>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '0.5rem',
                  marginTop: '0.5rem',
                }}
              >
                {cursosActivos.slice(0, 50).map((curso) => (
                  <label
                    key={curso.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: 'var(--bg-secondary)',
                      padding: '0.5rem',
                      borderRadius: '4px',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.cursosSeleccionados.includes(curso.id)}
                      onChange={() => handleCursoToggle(curso.id)}
                    />
                    {curso.codigo} - {curso.nombre}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ justifySelf: 'start', marginTop: '1rem' }}
            >
              Guardar Matrícula
            </button>
          </form>
        </div>
      )}

      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '1rem', background: 'var(--bg-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1rem' }}>
            Total encontradas: <span style={{ color: 'var(--accent)' }}>{filteredMatriculas.length}</span>
          </h3>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID Matrícula</th>
              <th>Estudiante</th>
              <th>Cursos Inscritos</th>
              <th>Créditos Totales</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                  <div className="spinner" style={{ margin: '0 auto' }}></div>
                </td>
              </tr>
            ) : paginatedMatriculas.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}
                >
                  No hay matrículas que coincidan con los filtros.
                </td>
              </tr>
            ) : (
              paginatedMatriculas.map((mat) => (
                <tr key={mat._id}>
                  <td>
                    <span style={{ fontFamily: 'monospace', color: 'var(--accent)' }}>
                      {mat._id.substring(18)}
                    </span>
                  </td>
                  <td style={{ fontWeight: 500 }}>
                    {mat.estudianteId?.nombreCompleto || 'Desconocido'}
                  </td>
                  <td style={{ fontSize: '0.85rem' }}>
                    {mat.cursosSeleccionados
                      .filter(cs => cs.cursoId)
                      .map((cs) => cs.cursoId.nombre)
                      .join(', ')}
                  </td>
                  <td>{mat.creditosTotales}</td>
                  <td>
                    <span className="badge badge-success">{mat.estado}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Controles de Paginación */}
        {!loading && totalPages > 1 && (
          <div style={{ padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', borderTop: '1px solid var(--border)' }}>
            <button 
              className="btn btn-secondary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              Anterior
            </button>
            <span style={{ fontWeight: 600 }}>
              Página {currentPage} de {totalPages}
            </span>
            <button 
              className="btn btn-secondary"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

