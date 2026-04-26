import router from '@adonisjs/core/services/router'

router.get('/test', async () => {
  return { ok: true }
})

router.group(() => {

  router.get('/usuarios', '#controllers/usuarios/gestion_usuarios_controller.listar')
  router.post('/usuarios', '#controllers/usuarios/gestion_usuarios_controller.crear')
  router.patch('/usuarios/:id/estado', '#controllers/usuarios/gestion_usuarios_controller.cambiarEstado')

  router.get('/puntos', '#controllers/supermercados/puntos_reciclajes_controller.index')
  router.post('/puntos', '#controllers/supermercados/puntos_reciclajes_controller.store')

}).prefix('/api')