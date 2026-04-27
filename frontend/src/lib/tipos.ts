/** Tipos compartidos del frontend para el prototipo */

export interface FranjaHoraria {
  diaSemana: number;
  horaInicio: string;
  horaFin: string;
}

export interface Curso {
  id: string;
  codigo: string;
  nombre: string;
  creditos: number;
  horasSemanales: number;
  requiereLab: boolean;
  prerrequisitos: string[];
  capacidadMaxima: number;
  estaActivo: boolean;
  carreraId: string;
  semestre: number;
}

export interface Docente {
  id: string;
  usuarioId: string;
  codigoEmpleado: string;
  departamento: string;
  maxHorasSemana: number;
  disponibilidad: FranjaHoraria[];
  cursosCalificados: string[];
  nombreCompleto: string;
}

export interface Aula {
  id: string;
  nombre: string;
  edificio: string;
  piso: number;
  capacidad: number;
  esLaboratorio: boolean;
  tieneProyector: boolean;
  estaActiva: boolean;
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
