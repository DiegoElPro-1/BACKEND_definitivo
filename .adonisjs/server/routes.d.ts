import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'usuarios.index': { paramsTuple?: []; params?: {} }
    'usuarios.create': { paramsTuple?: []; params?: {} }
    'usuarios.store': { paramsTuple?: []; params?: {} }
    'usuarios.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'usuarios.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'usuarios.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'usuarios.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gestion_usuarios.cambiar_estado': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aliados.index': { paramsTuple?: []; params?: {} }
    'aliados.create': { paramsTuple?: []; params?: {} }
    'aliados.store': { paramsTuple?: []; params?: {} }
    'aliados.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aliados.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aliados.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aliados.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'puntos_reciclajes.index': { paramsTuple?: []; params?: {} }
    'puntos_reciclajes.store': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'usuarios.index': { paramsTuple?: []; params?: {} }
    'usuarios.create': { paramsTuple?: []; params?: {} }
    'usuarios.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'usuarios.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aliados.index': { paramsTuple?: []; params?: {} }
    'aliados.create': { paramsTuple?: []; params?: {} }
    'aliados.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aliados.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'puntos_reciclajes.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'usuarios.index': { paramsTuple?: []; params?: {} }
    'usuarios.create': { paramsTuple?: []; params?: {} }
    'usuarios.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'usuarios.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aliados.index': { paramsTuple?: []; params?: {} }
    'aliados.create': { paramsTuple?: []; params?: {} }
    'aliados.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aliados.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'puntos_reciclajes.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'usuarios.store': { paramsTuple?: []; params?: {} }
    'aliados.store': { paramsTuple?: []; params?: {} }
    'puntos_reciclajes.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'usuarios.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aliados.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'usuarios.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'gestion_usuarios.cambiar_estado': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aliados.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'usuarios.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'aliados.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}