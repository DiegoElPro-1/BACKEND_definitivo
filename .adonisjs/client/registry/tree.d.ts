/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  gestionUsuarios: {
    listar: typeof routes['gestion_usuarios.listar']
    crear: typeof routes['gestion_usuarios.crear']
    cambiarEstado: typeof routes['gestion_usuarios.cambiar_estado']
  }
  puntosReciclajes: {
    index: typeof routes['puntos_reciclajes.index']
    store: typeof routes['puntos_reciclajes.store']
  }
}
