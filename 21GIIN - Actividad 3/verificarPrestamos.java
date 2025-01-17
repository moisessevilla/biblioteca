import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class VerificarPrestamo {

    private Connection conexion;
    private static final int MAX_PRESTAMOS = 2;  // Límite máximo de préstamos permitidos

    // Constructor para inicializar la conexión
    public VerificarPrestamo(Connection conexion) {
        this.conexion = conexion;
    }

    // Método para verificar si el usuario puede realizar un nuevo préstamo
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
} 
