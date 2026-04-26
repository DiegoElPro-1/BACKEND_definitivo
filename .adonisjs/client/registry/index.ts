/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'gestion_usuarios.listar': {
    methods: ["GET","HEAD"],
    pattern: '/api/usuarios',
    tokens: [{"old":"/api/usuarios","type":0,"val":"api","end":""},{"old":"/api/usuarios","type":0,"val":"usuarios","end":""}],
    types: placeholder as Registry['gestion_usuarios.listar']['types'],
  },
  'gestion_usuarios.crear': {
    methods: ["POST"],
    pattern: '/api/usuarios',
    tokens: [{"old":"/api/usuarios","type":0,"val":"api","end":""},{"old":"/api/usuarios","type":0,"val":"usuarios","end":""}],
    types: placeholder as Registry['gestion_usuarios.crear']['types'],
  },
  'gestion_usuarios.cambiar_estado': {
    methods: ["PATCH"],
    pattern: '/api/usuarios/:id/estado',
    tokens: [{"old":"/api/usuarios/:id/estado","type":0,"val":"api","end":""},{"old":"/api/usuarios/:id/estado","type":0,"val":"usuarios","end":""},{"old":"/api/usuarios/:id/estado","type":1,"val":"id","end":""},{"old":"/api/usuarios/:id/estado","type":0,"val":"estado","end":""}],
    types: placeholder as Registry['gestion_usuarios.cambiar_estado']['types'],
  },
  'puntos_reciclajes.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/puntos',
    tokens: [{"old":"/api/puntos","type":0,"val":"api","end":""},{"old":"/api/puntos","type":0,"val":"puntos","end":""}],
    types: placeholder as Registry['puntos_reciclajes.index']['types'],
  },
  'puntos_reciclajes.store': {
    methods: ["POST"],
    pattern: '/api/puntos',
    tokens: [{"old":"/api/puntos","type":0,"val":"api","end":""},{"old":"/api/puntos","type":0,"val":"puntos","end":""}],
    types: placeholder as Registry['puntos_reciclajes.store']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
