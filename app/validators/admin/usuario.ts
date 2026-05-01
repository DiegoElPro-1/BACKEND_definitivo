import vine from '@vinejs/vine'

export const actualizarUsuarioValidator = vine.compile(
  vine.object({
    nombre: vine.string().minLength(2).maxLength(100).optional(),
    correo: vine.string().email().normalizeEmail().optional(),
    telefono: vine.string().maxLength(20).optional(),
    imagen: vine.string().maxLength(255).optional(),
    idRol: vine.number().positive().optional(),
    idEstadoUsuario: vine.number().positive().optional(),
  })
)