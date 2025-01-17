import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class LogicaNegocio {

    private Connection conexion;

    // Constructor para inicializar la conexión
    public LogicaNegocio(Connection conexion) {
        this.conexion = conexion;
    }

    // Lógica para verificar si el ISBN es único
    public boolean esISBNUnico(String isbn) throws SQLException {
        String query = "SELECT COUNT(*) AS count FROM libros WHERE isbn = ?";
        try (PreparedStatement stmt = conexion.prepareStatement(query)) {
            stmt.setString(1, isbn);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return rs.getInt("count") == 0;
            }
        }
        return false;
    }

    // Lógica para validar datos del usuario
    public void validarUsuario(String nombre, String email) {
        if (nombre == null || nombre.isEmpty() || email == null || email.isEmpty()) {
            throw new IllegalArgumentException("El nombre y el email son obligatorios");
        }
    }

    // Lógica para agregar un libro con validación de ISBN único
    public void agregarLibro(String isbn, String titulo, String autor, String editorial, int anioPublicacion) throws SQLException {
        if (isbn == null || isbn.isEmpty() || titulo == null || titulo.isEmpty() || autor == null || autor.isEmpty()) {
            throw new IllegalArgumentException("El ISBN, el título y el autor son obligatorios");
        }

        if (!esISBNUnico(isbn)) {
            throw new IllegalArgumentException("El ISBN ya está registrado en el sistema");
        }

        String query = "INSERT INTO libros (isbn, titulo, autor, editorial, anio_publicacion) VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement stmt = conexion.prepareStatement(query)) {
            stmt.setString(1, isbn);
            stmt.setString(2, titulo);
            stmt.setString(3, autor);
            stmt.setString(4, editorial);
            stmt.setInt(5, anioPublicacion);
            stmt.executeUpdate();
            System.out.println("Libro agregado exitosamente.");
        }
    }
} 
