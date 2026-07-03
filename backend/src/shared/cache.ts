import NodeCache from 'node-cache';
import { Request, Response, NextFunction } from 'express';
import { logger } from './logger';

// Default cache of 5 minutes
export const cache = new NodeCache({ stdTTL: 300, checkperiod: 320 });

/**
 * Middleware para cachear respuestas HTTP
 * @param duration Duración en segundos
 */
export const cacheMiddleware = (duration: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Solo cacheamos peticiones GET
    if (req.method !== 'GET') {
      return next();
    }

    const key = `__express__${req.originalUrl}` || req.url;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      logger.info(`[CACHE HIT] Sirviendo de memoria: ${key}`);
      res.send(cachedResponse);
      return;
    }

    logger.info(`[CACHE MISS] Resolviendo desde DB: ${key}`);
    
    // Interceptamos la respuesta para guardarla en el cache antes de enviarla
    const originalSend = res.send.bind(res);
    res.send = (body: any) => {
      cache.set(key, body, duration);
      return originalSend(body);
    };

    next();
  };
};

/**
 * Función utilitaria para limpiar el caché cuando mutamos datos (POST, PUT, DELETE)
 */
export const clearCachePrefix = (prefix: string) => {
  const keys = cache.keys();
  const keysToDelete = keys.filter(key => key.includes(prefix));
  if (keysToDelete.length > 0) {
    cache.del(keysToDelete);
    logger.info(`[CACHE CLEAR] Limpiadas ${keysToDelete.length} claves para el prefijo: ${prefix}`);
  }
};
