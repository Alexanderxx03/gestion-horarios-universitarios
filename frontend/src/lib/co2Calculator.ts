import { co2 } from '@tgwf/co2';

// Inicializar el estimador de CO2.js con el modelo por defecto (Sustainable Web Design - SWD)
const estimadorCO2 = new co2({ model: 'swd' });

/**
 * Calcula las emisiones de carbono estimadas (en gramos de CO2 equivalente)
 * asociadas a una cantidad de bytes transferidos por la red.
 * 
 * @param bytes Cantidad de bytes transferidos.
 * @returns Gramos de CO2 equivalente (gCO2e).
 */
export function calcularEmisionesCO2(bytes: number): number {
  if (bytes <= 0) return 0;
  return estimadorCO2.perByte(bytes) as number;
}

/**
 * Calcula el ahorro teórico de CO2 en gramos comparando la transferencia actual
 * contra la transferencia del sistema legacy sin optimizar (~227.5 KB por carga).
 * 
 * @param bytesActuales Bytes transferidos con la arquitectura optimizada.
 * @returns Gramos de CO2e ahorrados.
 */
export function calcularAhorroCO2(bytesActuales: number): {
  ahorroGramos: number;
  porcentajeAhorro: number;
} {
  const bytesLegacy = 232960; // 227.5 KB de la consulta completa legacy
  const co2Legacy = estimadorCO2.perByte(bytesLegacy) as number;
  const co2Actual = estimadorCO2.perByte(bytesActuales) as number;

  const ahorroGramos = Math.max(0, co2Legacy - co2Actual);
  const porcentajeAhorro = bytesActuales < bytesLegacy 
    ? ((bytesLegacy - bytesActuales) / bytesLegacy) * 100 
    : 0;

  return {
    ahorroGramos,
    porcentajeAhorro
  };
}
