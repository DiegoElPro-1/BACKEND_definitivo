import router from '@adonisjs/core/services/router'

router.group(() => {
  
  // --- SEGURIDAD Y AUTENTICACIÓN ---
  // Registro de nuevos usuarios
  router.post('registro', '#controllers/autenticacion/registro_controller.handle')
  // Inicio de sesión
  router.post('login', '#controllers/autenticacion/login_controller.handle')
  // Recuperación de contraseña
  router.post('recuperar-password', '#controllers/autenticacion/recuperar_password_controller.solicitar')
  router.patch('cambiar-password', '#controllers/autenticacion/recuperar_password_controller.cambiar')

  // --- GESTIÓN DE USUARIOS (Administración) ---
  router.group(() => {
    router.get('/', '#controllers/usuarios/gestion_usuarios_controller.listar')
    router.get('/:id', '#controllers/usuarios/gestion_usuarios_controller.verUno')
    router.put('/:id', '#controllers/usuarios/gestion_usuarios_controller.actualizar')
    router.delete('/:id', '#controllers/usuarios/gestion_usuarios_controller.eliminar')
    router.patch('/:id/estado', '#controllers/usuarios/gestion_usuarios_controller.cambiarEstado') // Activar/Desactivar
  }).prefix('usuarios')

  // --- SUPERMERCADOS Y PUNTOS DE RECICLAJE ---
  router.group(() => {
    router.get('/', '#controllers/supermercados/puntos_reciclaje_controller.index')
    router.post('/', '#controllers/supermercados/puntos_reciclaje_controller.store')
    router.get('/:id', '#controllers/supermercados/puntos_reciclaje_controller.show')
    router.put('/:id', '#controllers/supermercados/puntos_reciclaje_controller.update')
    router.delete('/:id', '#controllers/supermercados/puntos_reciclaje_controller.destroy')
  }).prefix('supermercados')

  // --- MATERIALES (Administración de tipos de residuos) ---
  router.group(() => {
    router.get('/', '#controllers/administracion/materiales_controller.index')
    router.post('/', '#controllers/administracion/materiales_controller.store')
    router.put('/:id', '#controllers/administracion/materiales_controller.update')
    router.delete('/:id', '#controllers/administracion/materiales_controller.destroy')
  }).prefix('materiales')

  // --- ACUMULACIÓN Y CANJE DE PUNTOS ---
  // Registro de entregas de material
  router.post('acumular', '#controllers/puntos/acumulacion_puntos_controller.registrar')
  router.get('historial-acumulacion', '#controllers/puntos/acumulacion_puntos_controller.historial')
  
  // Canje por recompensas
  router.post('canjear', '#controllers/puntos/canje_recompensas_controller.ejecutar')
  router.get('recompensas-disponibles', '#controllers/puntos/canje_recompensas_controller.listar')

}).prefix('api/v1')