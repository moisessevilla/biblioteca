async function registrarPrestamo(usuarioId, libroId) {
    if (!(await puedePrestar(usuarioId))) {
      throw new Error('El usuario ya alcanzó el límite máximo de libros prestados');
    }
  
    const query = 'INSERT INTO prestamos (usuario_id, libro_id, fecha_prestamo, devuelto) VALUES (?, ?, NOW(), 0)';
    await db.promise().query(query, [usuarioId, libroId]);
  }
  