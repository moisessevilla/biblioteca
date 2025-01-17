const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'biblioteca',
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// --------------------------------------------------
//      CRUD LIBROS
// --------------------------------------------------

// Endpoint para agregar un libro
app.post('/libros', (req, res) => {
  const { isbn, titulo, autor, editorial, anio_publicacion } = req.body;

  // Validación de datos
  if (!isbn || !titulo || !autor) {
    return res.status(400).json({ mensaje: 'El ISBN, título y autor son obligatorios' });
  }

  const query = 'INSERT INTO libros (isbn, titulo, autor, editorial, anio_publicacion) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [isbn, titulo, autor, editorial, anio_publicacion], (err, result) => {
    if (err) {
      console.error('Error al insertar libro:', err);
      res.status(500).json({ mensaje: 'Error al agregar el libro' });
    } else {
      res.status(201).json({ mensaje: 'Libro agregado exitosamente' });
    }
  });
});

// Endpoint para obtener un libro por título, autor o ISBN
app.get('/libros', (req, res) => {
  const { titulo, autor, isbn } = req.query; // Recoger parámetros de búsqueda

  // Consulta base
  let query = 'SELECT * FROM libros WHERE 1=1';
  const valores = [];

  // Agregar filtros dinámicamente
  if (titulo) {
    query += ' AND titulo LIKE ?';
    valores.push(`%${titulo}%`); // Filtra por título que contenga el texto
  }

  if (autor) {
    query += ' AND autor LIKE ?';
    valores.push(`%${autor}%`); // Filtra por autor que contenga el texto
  }

  if (isbn) {
    query += ' AND isbn = ?';
    valores.push(isbn); // Filtra por ISBN exacto
  }

  console.log('Consulta generada:', query);
  console.log('Valores:', valores);

  // Ejecutar la consulta
  db.query(query, valores, (err, resultados) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err.message);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    if (resultados.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron resultados' });
    }

    res.json(resultados); // Retornar los resultados filtrados
  });
});

// Endpoint para actualizar un libro
app.put('/libros/:id', (req, res) => {
  const { isbn, titulo, autor, editorial, anio_publicacion } = req.body;

  // Validación de datos
  if (!isbn || !titulo || !autor) {
    return res.status(400).json({ mensaje: 'El ISBN, título y autor son obligatorios' });
  }

  const query = 'UPDATE libros SET isbn = ?, titulo = ?, autor = ?, editorial = ?, anio_publicacion = ? WHERE id = ?';

  db.query(query, [isbn, titulo, autor, editorial, anio_publicacion, req.params.id], (err, result) => {
    if (err) {
      console.error('Error al actualizar libro:', err);
      res.status(500).json({ mensaje: 'Error al actualizar el libro' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ mensaje: 'Libro no encontrado' });
    } else {
      res.status(200).json({ mensaje: 'Libro actualizado exitosamente' });
    }
  });
});

// Endpoint para eliminar un libro
app.delete('/libros/:id', (req, res) => {
  const query = 'DELETE FROM libros WHERE id = ?';
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error('Error al eliminar libro:', err);
      res.status(500).json({ mensaje: 'Error al eliminar el libro' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ mensaje: 'Libro no encontrado' });
    } else {
      res.status(200).json({ mensaje: 'Libro eliminado exitosamente' });
    }
  });
});

// --------------------------------------------------
//      CRUD USUARIOS
// --------------------------------------------------

// Endpoint para agregar un usuario (con id incluido)
app.post('/usuarios', (req, res) => {
  const { id, nombre, email, telefono, direccion } = req.body;

  // Validación de datos
  if (!id || !nombre || !email) {
    return res.status(400).json({ mensaje: 'El ID, nombre y email son obligatorios' });
  }

  // Incluye el ID en la consulta
  const query = 'INSERT INTO usuarios (id, nombre, email, telefono, direccion) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [id, nombre, email, telefono, direccion], (err, result) => {
    if (err) {
      console.error('Error al insertar usuario:', err);
      res.status(500).json({ mensaje: 'Error al agregar el usuario' });
    } else {
      res.status(201).json({ mensaje: 'Usuario agregado exitosamente', id });
    }
  });
});

// Endpoint para buscar usuarios con filtros id, nombre o telefono
app.get('/usuarios', (req, res) => {
  const { id, nombre, telefono } = req.query; // Recoger parámetros de búsqueda

  // Consulta base
  let query = 'SELECT * FROM usuarios WHERE 1=1';
  const valores = [];

  // Agregar filtros dinámicamente
  if (id) {
    query += ' AND id = ?';
    valores.push(id); // Filtra por ID exacto
  }

  if (nombre) {
    query += ' AND nombre LIKE ?';
    valores.push(`%${nombre}%`); // Filtra por nombre que contenga el texto
  }

  if (telefono) {
    query += ' AND telefono LIKE ?';
    valores.push(`%${telefono}%`); // Filtra por teléfono que contenga el texto
  }

  console.log('Consulta generada:', query);
  console.log('Valores:', valores);

  // Ejecutar la consulta
  db.query(query, valores, (err, resultados) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err.message);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    // Si no hay resultados
    if (resultados.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron resultados' });
    }

    // Retornar los resultados filtrados o todos
    res.status(200).json(resultados);
  });
});

// Endpoint para actualizar un usuario
app.put('/usuarios/:id', (req, res) => {
  const { nombre, email, telefono, direccion } = req.body;
  const query = 'UPDATE usuarios SET nombre = ?, email = ?, telefono = ?, direccion = ? WHERE id = ?';

  db.query(query, [nombre, email, telefono, direccion, req.params.id], (err, result) => {
    if (err) {
      console.error('Error al actualizar usuario:', err);
      res.status(500).json({ mensaje: 'Error al actualizar el usuario' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    } else {
      res.status(200).json({ mensaje: 'Usuario actualizado exitosamente' });
    }
  });
});

// Endpoint para eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
  const query = 'DELETE FROM usuarios WHERE id = ?';
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error('Error al eliminar usuario:', err);
      res.status(500).json({ mensaje: 'Error al eliminar el usuario' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    } else {
      res.status(200).json({ mensaje: 'Usuario eliminado exitosamente' });
    }
  });
});

// --------------------------------------------------
//      Endpoints de PRESTAMOS
// --------------------------------------------------

// Endpont para registrar un préstamo
app.post('/prestamos', (req, res) => {
  const { usuarioId, libroId } = req.body;

  if (!usuarioId || !libroId) {
    return res.status(400).json({ mensaje: 'El usuarioId y el libroId son obligatorios' });
  }

  const queryPrestar = 'INSERT INTO prestamos (usuario_id, libro_id, fecha_prestamo, devuelto) VALUES (?, ?, NOW(), 0)';

  // Validar si el usuario puede tomar más préstamos
  const queryVerificar = 'SELECT COUNT(*) AS count FROM prestamos WHERE usuario_id = ? AND devuelto = 0';
  db.query(queryVerificar, [usuarioId], (err, results) => {
    if (err) {
      console.error('Error al verificar préstamos:', err.message);
      return res.status(500).json({ mensaje: 'Error al verificar los préstamos activos del usuario' });
    }

    const maxPrestamos = 2;
    if (results[0].count >= maxPrestamos) {
      return res.status(400).json({ mensaje: 'El usuario ha alcanzado el límite máximo de préstamos' });
    }

    // Registrar el préstamo
    db.query(queryPrestar, [usuarioId, libroId], (err, result) => {
      if (err) {
        console.error('Error al registrar el préstamo:', err.message);
        return res.status(500).json({ mensaje: 'Error al registrar el préstamo' });
      }

      res.status(201).json({ mensaje: 'Préstamo registrado exitosamente', prestamoId: result.insertId });
    });
  });
});

// Endpoint para obtener todos los préstamos o filtrar por usuarioId
app.get('/prestamos', (req, res) => {
  const { usuarioId } = req.query; // Recoger el filtro de usuarioId, si se proporciona

  // Consulta base
  let query = 'SELECT * FROM prestamos WHERE 1=1';
  const valores = [];

  // Agregar filtro dinámico
  if (usuarioId) {
    query += ' AND usuario_id = ?';
    valores.push(usuarioId);
  }

  // Ejecutar la consulta
  db.query(query, valores, (err, resultados) => {
    if (err) {
      console.error('Error al obtener los préstamos:', err.message);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }

    if (resultados.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron préstamos' });
    }

    res.status(200).json(resultados); // Retornar los resultados
  });
});

// Endpoint para registrar una devolución
app.put('/prestamos/:id/devolucion', (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ mensaje: 'El id del préstamo es obligatorio' });
  }

  const query = 'UPDATE prestamos SET devuelto = 1, fecha_devolucion = NOW() WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al registrar la devolución:', err.message);
      return res.status(500).json({ mensaje: 'Error al registrar la devolución' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'No se encontró el préstamo especificado' });
    }

    res.status(200).json({ mensaje: 'Devolución registrada exitosamente' });
  });
});

// Endpoint para el registro de libro con validación
app.post('/libros', async (req, res) => {
  try {
    await agregarLibro(req.body); // Llama a la lógica de negocio
    res.status(201).json({ mensaje: 'Libro agregado exitosamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint de préstamo con validación de reglas de negocio
app.post('/prestamos', async (req, res) => {
  const { usuarioId, libroId } = req.body;

  try {
    await registrarPrestamo(usuarioId, libroId); // Valida y registra el préstamo
    res.status(201).json({ mensaje: 'Préstamo registrado exitosamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
