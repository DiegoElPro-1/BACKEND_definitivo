import { defineConfig } from '@adonisjs/auth'
import { sessionGuard, sessionUserProvider } from '@adonisjs/auth/session'
import { tokensGuard, tokensUserProvider } from '@adonisjs/auth/access_tokens'
import type { InferAuthenticators, InferAuthEvents, Authenticators } from '@adonisjs/auth/types'

const authConfig = defineConfig({
  /**
   * Usamos 'api' por defecto ya que estamos haciendo un backend para tokens.
   */
  default: 'api',

  guards: {
    /**
     * Guard para la API (Tokens OAT)
     */
    api: tokensGuard({
      provider: tokensUserProvider({
        tokens: 'accessTokens',
        model: () => import('#models/usuario'),
        userUniqueIdKey: 'id',
        uidKey: 'correo_electronico', // Ahora buscará por este campo en el login
      }),
    }),

    /**
     * Guard para sesiones (por si usan vistas tradicionales)
     */
    web: sessionGuard({
      useRememberMeTokens: false,
      provider: sessionUserProvider({
        model: () => import('#models/usuario'), 
        uidKey: 'correo_electronico', // Importante para que sesiones también hablen espñol
      }),
    }),
  },
})

export default authConfig

/**
 * Inferir tipos
 */
declare module '@adonisjs/auth/types' {
  export interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}