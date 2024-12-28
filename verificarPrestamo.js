async function puedePrestar(usuarioId) {
    const query = 'SELECT COUNT(*) AS count FROM prestamos WHERE usuario_id = ? AND devuelto = 0';
    const [rows] = await db.promise().query(query, [usuarioId]);
    const maxPrestamos = 2; // Define el máximo de libros permitidos
    return rows[0].count < maxPrestamos; // Retorna true si no excede el límite
  }
  