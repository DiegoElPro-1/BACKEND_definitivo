import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './database'; // Importamos la conexión

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor de Recycling Points funcionando ♻️');
});

// Función para conectar a la base de datos y arrancar el server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');
    
    // Sincroniza los modelos (esto crea las tablas automáticamente si no existen)
    await sequelize.sync({ force: false }); 

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
  }
};

startServer();