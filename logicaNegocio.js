const db = require('./db'); // Conexión a la base de datos

// Lógica para verificar si el ISBN es único
function esISBNUnico(isbn, callback) {
  const query = 'SELECT COUNT(*) AS count FROM libros WHERE isbn = ?';
  db.query(query, [isbn], (err, rows) => {
    if (err) return callback(err);
    const esUnico = rows[0].count === 0;
    callback(null, esUnico);
  });
}

// Lógica para validar datos del usuario
function validarUsuario(datosUsuario) {
  const { nombre, email } = datosUsuario;
  if (!nombre || !email) {
    throw new Error('El nombre y el email son obligatorios');
  }
}

// Lógica para agregar un libro con validación de ISBN único
function agregarLibro(datosLibro, callback) {
  const { isbn, titulo, autor, editorial, anio_publicacion } = datosLibro;

  if (!isbn || !titulo || !autor) {
    return callback(new Error('El ISBN, el título y el autor son obligatorios'));
  }

  esISBNUnico(isbn, (err, esUnico) => {
    if (err) return callback(err);
    if (!esUnico) {
      return callback(new Error('El ISBN ya está registrado en el sistema'));
    }

    const query = 'INSERT INTO libros (isbn, titulo, autor, editorial, anio_publicacion) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [isbn, titulo, autor, editorial, anio_publicacion], (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  });
}
