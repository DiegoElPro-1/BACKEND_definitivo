/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'usuarios.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/usuarios'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuarios/gestion_usuarios_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuarios/gestion_usuarios_controller').default['index']>>>
    }
  }
  'usuarios.create': {
    methods: ["GET","HEAD"]
    pattern: '/api/usuarios/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuarios/gestion_usuarios_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuarios/gestion_usuarios_controller').default['create']>>>
    }
  }
  'usuarios.store': {
    methods: ["POST"]
    pattern: '/api/usuarios'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuarios/gestion_usuarios_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuarios/gestion_usuarios_controller').default['store']>>>
    }
  }
  'usuarios.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/usuarios/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuarios/gestion_usuarios_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuarios/gestion_usuarios_controller').default['show']>>>
    }
  }
  'usuarios.edit': {
    methods: ["GET","HEAD"]
    pattern: '/api/usuarios/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuarios/gestion_usuarios_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuarios/gestion_usuarios_controller').default['edit']>>>
    }
  }
  'usuarios.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/usuarios/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuarios/gestion_usuarios_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuarios/gestion_usuarios_controller').default['update']>>>
    }
  }
  'usuarios.destroy': {
    methods: ["DELETE"]
    pattern: '/api/usuarios/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuarios/gestion_usuarios_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuarios/gestion_usuarios_controller').default['destroy']>>>
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
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/usuarios/gestion_usuarios_controller').default['cambiarEstado']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/usuarios/gestion_usuarios_controller').default['cambiarEstado']>>>
    }
  }
  'aliados.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/aliados'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aliados_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aliados_controller').default['index']>>>
    }
  }
  'aliados.create': {
    methods: ["GET","HEAD"]
    pattern: '/api/aliados/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aliados_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aliados_controller').default['create']>>>
    }
  }
  'aliados.store': {
    methods: ["POST"]
    pattern: '/api/aliados'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aliados_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aliados_controller').default['store']>>>
    }
  }
  'aliados.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/aliados/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aliados_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aliados_controller').default['show']>>>
    }
  }
  'aliados.edit': {
    methods: ["GET","HEAD"]
    pattern: '/api/aliados/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aliados_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aliados_controller').default['edit']>>>
    }
  }
  'aliados.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/aliados/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aliados_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aliados_controller').default['update']>>>
    }
  }
  'aliados.destroy': {
    methods: ["DELETE"]
    pattern: '/api/aliados/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/aliados_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/aliados_controller').default['destroy']>>>
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
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/supermercados/puntos_reciclajes_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/supermercados/puntos_reciclajes_controller').default['index']>>>
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
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/supermercados/puntos_reciclajes_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/supermercados/puntos_reciclajes_controller').default['store']>>>
    }
  }
}
