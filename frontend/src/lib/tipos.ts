/** Tipos compartidos del frontend para el prototipo y la base de datos MERN */

export interface FranjaHoraria {
  diaSemana: number;
  horaInicio: string;
  horaFin: string;
}

export interface Curso {
  _id: string; // ID en Mongoose
  id: string; // Alias de compatibilidad
  codigo: string;
  nombre: string;
  creditos: number;
  horasSemanales: number;
  requiereLaboratorio: boolean;
  requiereLab: boolean; // Alias de compatibilidad
  prerrequisitos: string[];
  capacidadMaxima: number;
  activo: boolean;
  estaActivo: boolean; // Alias de compatibilidad
  carreraId: string;
  semestre: number;
}

export interface Docente {
  _id: string; // ID en Mongoose
  id: string; // Alias de compatibilidad
  usuarioId: string;
  codigoEmpleado: string;
  departamento: string;
  horasMaximasSemanales: number;
  disponibilidad: FranjaHoraria[];
  cursosHabilitados: string[];
  cursosCalificados: string[]; // Alias de compatibilidad
  activo: boolean;
  nombreCompleto?: string;
}

export interface Aula {
  _id: string; // ID en Mongoose
  id: string; // Alias de compatibilidad
  nombre: string;
  pabellon: string;
  piso: number;
  capacidad: number;
  esLaboratorio: boolean;
  tieneProyector: boolean;
  activo: boolean;
  estaActiva: boolean; // Alias de compatibilidad
}

export interface AsignacionHorario {
  cursoId: string;
  cursoNombre: string;
  docenteId: string;
  docenteNombre: string;
  aulaId: string;
  aulaNombre: string;
  diaSemana: number;
  horaInicio: string;
  horaFin: string;
  tamanoGrupo: number;
}

export type EstadoHorario = 'inactivo' | 'generando' | 'generado' | 'fallido';
