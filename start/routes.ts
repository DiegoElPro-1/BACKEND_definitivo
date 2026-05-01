import router from '@adonisjs/core/services/router'

// Importaciones dinámicas de los controladores
const GestionUsuariosController = () => import('#controllers/usuarios/gestion_usuarios_controller')
const AliadosController = () => import('#controllers/aliados_controller')
const PuntosReciclajesController = () => import('#controllers/supermercados/puntos_reciclajes_controller')

router.get('/test', async () => {
  return { mensaje: 'Conexión establecida con el backend de Reciclin-Point' }
})

router.group(() => {
  
  /* CRUD DE USUARIOS 
    .resource crea automáticamente:
    - GET /api/usuarios (index)
    - POST /api/usuarios (store)
    - GET /api/usuarios/:id (show)
    - PUT/PATCH /api/usuarios/:id (update)
    - DELETE /api/usuarios/:id (destroy)
  */
  router.resource('usuarios', GestionUsuariosController)
  
  // Ruta adicional para cambio de estado (Punto específico de tu guía)
  router.patch('/usuarios/:id/estado', [GestionUsuariosController, 'cambiarEstado'])


  /* CRUD DE ALIADOS 
    Crea todas las rutas necesarias para la gestión de aliados
  */
  router.resource('aliados', AliadosController)


  /* PUNTOS DE RECICLAJE
  */
  router.get('/puntos', [PuntosReciclajesController, 'index'])
  router.post('/puntos', [PuntosReciclajesController, 'store'])

}).prefix('/api')