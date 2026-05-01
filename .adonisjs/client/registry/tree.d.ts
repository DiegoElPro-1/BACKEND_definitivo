/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  usuarios: {
    index: typeof routes['usuarios.index']
    create: typeof routes['usuarios.create']
    store: typeof routes['usuarios.store']
    show: typeof routes['usuarios.show']
    edit: typeof routes['usuarios.edit']
    update: typeof routes['usuarios.update']
    destroy: typeof routes['usuarios.destroy']
  }
  gestionUsuarios: {
    cambiarEstado: typeof routes['gestion_usuarios.cambiar_estado']
  }
  aliados: {
    index: typeof routes['aliados.index']
    create: typeof routes['aliados.create']
    store: typeof routes['aliados.store']
    show: typeof routes['aliados.show']
    edit: typeof routes['aliados.edit']
    update: typeof routes['aliados.update']
    destroy: typeof routes['aliados.destroy']
  }
  puntosReciclajes: {
    index: typeof routes['puntos_reciclajes.index']
    store: typeof routes['puntos_reciclajes.store']
  }
}
