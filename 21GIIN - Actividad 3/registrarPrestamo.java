import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class RegistrarPrestamo {

    private Connection conexion;
    private static final int MAX_PRESTAMOS = 2;  // Límite máximo de préstamos permitidos

    // Constructor para inicializar la conexión
    public RegistrarPrestamo(Connection conexion) {
        this.conexion = conexion;
    }

    // Método para verificar si un usuario puede realizar un nuevo préstamo
    private boolean puedePrestar(int usuarioId) throws SQLException {
        String query = "SELECT COUNT(*) AS count FROM prestamos WHERE usuario_id = ? AND devuelto = 0";
        try (PreparedStatement stmt = conexion.prepareStatement(query)) {
            stmt.setInt(1, usuarioId);
            var rs = stmt.executeQuery();
            if (rs.next()) {
                int prestamosActivos = rs.getInt("count");
                return prestamosActivos < MAX_PRESTAMOS;
            }
        }
        return false;
    }

    // Método para registrar un nuevo préstamo
    public void registrarPrestamo(int usuarioId, int libroId) throws SQLException {
        if (!puedePrestar(usuarioId)) {
            throw new IllegalArgumentException("El usuario ya alcanzó el límite máximo de libros prestados.");
        }

        String query = "INSERT INTO prestamos (usuario_id, libro_id, fecha_prestamo, devuelto) VALUES (?, ?, NOW(), 0)";
        try (PreparedStatement stmt = conexion.prepareStatement(query)) {
            stmt.setInt(1, usuarioId);
            stmt.setInt(2, libroId);
            stmt.executeUpdate();
            System.out.println("Préstamo registrado exitosamente.");
        }
    }
} 
