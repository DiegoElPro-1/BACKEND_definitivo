/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'gestion_usuarios.listar': {
    methods: ["GET","HEAD"]
    pattern: '/api/usuarios'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'gestion_usuarios.crear': {
    methods: ["POST"]
    pattern: '/api/usuarios'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'gestion_usuarios.cambiar_estado': {
    methods: ["PATCH"]
    pattern: '/api/usuarios/:id/estado'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'puntos_reciclajes.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/puntos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'puntos_reciclajes.store': {
    methods: ["POST"]
    pattern: '/api/puntos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
}
