/**
 * Espacio físico donde se imparten las clases.
 * Puede ser un aula regular o un laboratorio.
 */
export interface Classroom {
  id: string;
  name: string;
  building: string;
  floor: number;
  capacity: number;
  /** `true` si el espacio es un laboratorio */
  isLab: boolean;
  hasProjector: boolean;
  isActive: boolean;
}
