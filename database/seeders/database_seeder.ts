import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class DatabaseSeeder extends BaseSeeder {
  async run() {
    // =====================
    // ROLES
    // =====================
    await db.table('roles').multiInsert([
      { nombre: 'admin', descripcion: 'Administrador del sistema' },
      { nombre: 'aliado', descripcion: 'Punto de reciclaje en supermercado aliado' },
      { nombre: 'usuario', descripcion: 'Usuario que recicla y acumula puntos' },
    ])

    // =====================
    // ESTADOS USUARIOS
    // =====================
    await db.table('estados_usuarios').multiInsert([
      { nombre: 'activo' },
      { nombre: 'inactivo' },
      { nombre: 'suspendido' },
    ])

    // =====================
    // ESTADOS ALIADOS
    // =====================
    await db.table('estados_aliados').multiInsert([
      { nombre: 'activo' },
      { nombre: 'inactivo' },
    ])

    // =====================
    // ESTADOS MATERIALES
    // =====================
    await db.table('estados_materiales').multiInsert([
      { nombre: 'activo' },
      { nombre: 'inactivo' },
    ])

    // =====================
    // ESTADOS PUNTOS
    // =====================
    await db.table('estados_puntos').multiInsert([
      { nombre: 'activo' },
      { nombre: 'inactivo' },
      { nombre: 'mantenimiento' },
    ])

    // =====================
    // ESTADOS ENTREGAS
    // =====================
    await db.table('estados_entregas').multiInsert([
      { nombre: 'pendiente' },
      { nombre: 'completada' },
      { nombre: 'cancelada' },
    ])

    // =====================
    // TIPOS RECOMPENSA
    // =====================
    await db.table('tipos_recompensa').multiInsert([
      { nombre: 'descuento', descripcion: 'Descuento porcentual en productos' },
      { nombre: 'producto', descripcion: 'Producto físico canjeable' },
      { nombre: 'cupon', descripcion: 'Cupón de descuento' },
    ])

    // =====================
    // ESTADOS RECOMPENSAS
    // =====================
    await db.table('estados_recompensas').multiInsert([
      { nombre: 'activo' },
      { nombre: 'inactivo' },
      { nombre: 'agotado' },
    ])

    // =====================
    // ESTADOS CANJES
    // =====================
    await db.table('estados_canjes').multiInsert([
      { nombre: 'pendiente' },
      { nombre: 'canjeado' },
      { nombre: 'vencido' },
    ])

    console.log('Seeders ejecutados correctamente')
  }
}