import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'openapi.html': { paramsTuple?: []; params?: {} }
    'openapi.json': { paramsTuple?: []; params?: {} }
    'openapi.yaml': { paramsTuple?: []; params?: {} }
  }
  POST: {
  }
  DELETE: {
  }
  GET: {
    'openapi.html': { paramsTuple?: []; params?: {} }
    'openapi.json': { paramsTuple?: []; params?: {} }
    'openapi.yaml': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'openapi.html': { paramsTuple?: []; params?: {} }
    'openapi.json': { paramsTuple?: []; params?: {} }
    'openapi.yaml': { paramsTuple?: []; params?: {} }
  }
  PUT: {
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}