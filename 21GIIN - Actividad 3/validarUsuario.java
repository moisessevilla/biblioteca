import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ValidarUsuario {

    private Connection conexion;
    private static final int MAX_PRESTAMOS = 2;  // Límite máximo de préstamos permitidos

    // Constructor para inicializar la conexión
    public ValidarUsuario(Connection conexion) {
        this.conexion = conexion;
    }

    // Método para verificar si un usuario puede realizar un nuevo préstamo
    public boolean puedePrestar(int usuarioId) {
        String query = "SELECT COUNT(*) AS count FROM prestamos WHERE usuario_id = ? AND devuelto = 0";
        try (PreparedStatement stmt = conexion.prepareStatement(query)) {
            stmt.setInt(1, usuarioId);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                int prestamosActivos = rs.getInt("count");
                return prestamosActivos < MAX_PRESTAMOS;
            }
        } catch (SQLException e) {
            System.err.println("Error al verificar el préstamo: " + e.getMessage());
        }
        return false;  // Retorna false en caso de error
    }

    // Método para registrar un préstamo
    public boolean registrarPrestamo(int usuarioId, int libroId) {
        if (!puedePrestar(usuarioId)) {
            System.err.println("El usuario ya alcanzó el límite máximo de libros prestados.");
            return false;
        }

        String query = "INSERT INTO prestamos (usuario_id, libro_id, fecha_prestamo, devuelto) VALUES (?, ?, NOW(), 0)";
        try (PreparedStatement stmt = conexion.prepareStatement(query)) {
            stmt.setInt(1, usuarioId);
            stmt.setInt(2, libroId);
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            System.err.println("Error al registrar el préstamo: " + e.getMessage());
        }
        return false;
    }
} 
