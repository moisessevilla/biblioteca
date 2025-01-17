// Lógica para verificar si un usuario puede prestar más libros
function puedePrestar(usuarioId, callback) {
    const query = 'SELECT COUNT(*) AS count FROM prestamos WHERE usuario_id = ? AND devuelto = 0';
    db.query(query, [usuarioId], (err, rows) => {
      if (err) return callback(err);
      const maxPrestamos = 2; // Límite máximo de préstamos
      const puede = rows[0].count < maxPrestamos;
      callback(null, puede);
    });
  }
  
  // Lógica para registrar un préstamo
  function registrarPrestamo(usuarioId, libroId, callback) {
    puedePrestar(usuarioId, (err, puede) => {
      if (err) return callback(err);
      if (!puede) {
        return callback(new Error('El usuario ya alcanzó el límite máximo de libros prestados'));
      }
  
      const query = 'INSERT INTO prestamos (usuario_id, libro_id, fecha_prestamo, devuelto) VALUES (?, ?, NOW(), 0)';
      db.query(query, [usuarioId, libroId], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
      });
    });
  }
  