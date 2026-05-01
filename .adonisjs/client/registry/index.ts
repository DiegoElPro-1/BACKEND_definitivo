/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'usuarios.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/usuarios',
    tokens: [{"old":"/api/usuarios","type":0,"val":"api","end":""},{"old":"/api/usuarios","type":0,"val":"usuarios","end":""}],
    types: placeholder as Registry['usuarios.index']['types'],
  },
  'usuarios.create': {
    methods: ["GET","HEAD"],
    pattern: '/api/usuarios/create',
    tokens: [{"old":"/api/usuarios/create","type":0,"val":"api","end":""},{"old":"/api/usuarios/create","type":0,"val":"usuarios","end":""},{"old":"/api/usuarios/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['usuarios.create']['types'],
  },
  'usuarios.store': {
    methods: ["POST"],
    pattern: '/api/usuarios',
    tokens: [{"old":"/api/usuarios","type":0,"val":"api","end":""},{"old":"/api/usuarios","type":0,"val":"usuarios","end":""}],
    types: placeholder as Registry['usuarios.store']['types'],
  },
  'usuarios.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/usuarios/:id',
    tokens: [{"old":"/api/usuarios/:id","type":0,"val":"api","end":""},{"old":"/api/usuarios/:id","type":0,"val":"usuarios","end":""},{"old":"/api/usuarios/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['usuarios.show']['types'],
  },
  'usuarios.edit': {
    methods: ["GET","HEAD"],
    pattern: '/api/usuarios/:id/edit',
    tokens: [{"old":"/api/usuarios/:id/edit","type":0,"val":"api","end":""},{"old":"/api/usuarios/:id/edit","type":0,"val":"usuarios","end":""},{"old":"/api/usuarios/:id/edit","type":1,"val":"id","end":""},{"old":"/api/usuarios/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['usuarios.edit']['types'],
  },
  'usuarios.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/usuarios/:id',
    tokens: [{"old":"/api/usuarios/:id","type":0,"val":"api","end":""},{"old":"/api/usuarios/:id","type":0,"val":"usuarios","end":""},{"old":"/api/usuarios/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['usuarios.update']['types'],
  },
  'usuarios.destroy': {
    methods: ["DELETE"],
    pattern: '/api/usuarios/:id',
    tokens: [{"old":"/api/usuarios/:id","type":0,"val":"api","end":""},{"old":"/api/usuarios/:id","type":0,"val":"usuarios","end":""},{"old":"/api/usuarios/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['usuarios.destroy']['types'],
  },
  'gestion_usuarios.cambiar_estado': {
    methods: ["PATCH"],
    pattern: '/api/usuarios/:id/estado',
    tokens: [{"old":"/api/usuarios/:id/estado","type":0,"val":"api","end":""},{"old":"/api/usuarios/:id/estado","type":0,"val":"usuarios","end":""},{"old":"/api/usuarios/:id/estado","type":1,"val":"id","end":""},{"old":"/api/usuarios/:id/estado","type":0,"val":"estado","end":""}],
    types: placeholder as Registry['gestion_usuarios.cambiar_estado']['types'],
  },
  'aliados.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/aliados',
    tokens: [{"old":"/api/aliados","type":0,"val":"api","end":""},{"old":"/api/aliados","type":0,"val":"aliados","end":""}],
    types: placeholder as Registry['aliados.index']['types'],
  },
  'aliados.create': {
    methods: ["GET","HEAD"],
    pattern: '/api/aliados/create',
    tokens: [{"old":"/api/aliados/create","type":0,"val":"api","end":""},{"old":"/api/aliados/create","type":0,"val":"aliados","end":""},{"old":"/api/aliados/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['aliados.create']['types'],
  },
  'aliados.store': {
    methods: ["POST"],
    pattern: '/api/aliados',
    tokens: [{"old":"/api/aliados","type":0,"val":"api","end":""},{"old":"/api/aliados","type":0,"val":"aliados","end":""}],
    types: placeholder as Registry['aliados.store']['types'],
  },
  'aliados.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/aliados/:id',
    tokens: [{"old":"/api/aliados/:id","type":0,"val":"api","end":""},{"old":"/api/aliados/:id","type":0,"val":"aliados","end":""},{"old":"/api/aliados/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['aliados.show']['types'],
  },
  'aliados.edit': {
    methods: ["GET","HEAD"],
    pattern: '/api/aliados/:id/edit',
    tokens: [{"old":"/api/aliados/:id/edit","type":0,"val":"api","end":""},{"old":"/api/aliados/:id/edit","type":0,"val":"aliados","end":""},{"old":"/api/aliados/:id/edit","type":1,"val":"id","end":""},{"old":"/api/aliados/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['aliados.edit']['types'],
  },
  'aliados.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/aliados/:id',
    tokens: [{"old":"/api/aliados/:id","type":0,"val":"api","end":""},{"old":"/api/aliados/:id","type":0,"val":"aliados","end":""},{"old":"/api/aliados/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['aliados.update']['types'],
  },
  'aliados.destroy': {
    methods: ["DELETE"],
    pattern: '/api/aliados/:id',
    tokens: [{"old":"/api/aliados/:id","type":0,"val":"api","end":""},{"old":"/api/aliados/:id","type":0,"val":"aliados","end":""},{"old":"/api/aliados/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['aliados.destroy']['types'],
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
