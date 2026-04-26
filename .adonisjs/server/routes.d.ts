import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'gestion_usuarios.listar': { paramsTuple?: []; params?: {} }
    'gestion_usuarios.crear': { paramsTuple?: []; params?: {} }
    'gestion_usuarios.cambiar_estado': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'puntos_reciclajes.index': { paramsTuple?: []; params?: {} }
    'puntos_reciclajes.store': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'gestion_usuarios.listar': { paramsTuple?: []; params?: {} }
    'puntos_reciclajes.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'gestion_usuarios.listar': { paramsTuple?: []; params?: {} }
    'puntos_reciclajes.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'gestion_usuarios.crear': { paramsTuple?: []; params?: {} }
    'puntos_reciclajes.store': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'gestion_usuarios.cambiar_estado': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}