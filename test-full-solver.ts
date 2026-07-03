import fs from 'fs';
import { resolverHorario } from './frontend/src/lib/resolvedorCliente';

async function run() {
  const dataCursos = await fetch('http://localhost:5000/api/courses?limit=2000').then(res => res.json());
  const dataDocentes = await fetch('http://localhost:5000/api/teachers').then(res => res.json());
  const dataAulas = await fetch('http://localhost:5000/api/classrooms').then(res => res.json());
  const dataCarreras = await fetch('http://localhost:5000/api/careers').then(res => res.json());

  const carreraMedicina = dataCarreras.data.find(c => c.nombre === 'Medicina Humana');
  
  const mappedCursos = dataCursos.data
    .filter(c => c.carreraId === carreraMedicina._id && c.semestre === 1)
    .map((c) => ({
      id: c._id,
      nombre: c.nombre,
      requiereLab: c.requiereLaboratorio,
      capacidadMaxima: c.capacidadMaxima,
      estaActivo: c.activo
    }));

  const mappedDocentes = dataDocentes.data.map((d) => ({
    id: d._id,
    nombreCompleto: d.codigoEmpleado,
    disponibilidad: d.disponibilidad || [],
    cursosCalificados: d.cursosHabilitados || [],
  }));

  const mappedAulas = dataAulas.data.map((a) => ({
    id: a._id,
    nombre: a.nombre,
    capacidad: a.capacidad,
    esLaboratorio: a.esLaboratorio,
  }));

  console.log(`Cursos: ${mappedCursos.length}`);
  const resultado = resolverHorario(mappedCursos, mappedDocentes, mappedAulas);
  console.log('Exito:', resultado.exito);
  console.log('Asignaciones:', resultado.asignaciones.length);
  if (!resultado.exito) {
    console.log('Stats:', resultado.estadisticas);
  } else {
    console.log('Stats:', resultado.estadisticas);
  }
}

run().catch(console.error);
