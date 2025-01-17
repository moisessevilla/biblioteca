public class ValidarLibro {

    // Método para validar los datos de un libro
    public static void validarLibro(String isbn, String titulo, String autor) throws IllegalArgumentException {
        if (isbn == null || isbn.trim().isEmpty()) {
            throw new IllegalArgumentException("El ISBN es obligatorio");
        }
        if (titulo == null || titulo.trim().isEmpty()) {
            throw new IllegalArgumentException("El título es obligatorio");
        }
        if (autor == null || autor.trim().isEmpty()) {
            throw new IllegalArgumentException("El autor es obligatorio");
        }
    }

    // Método para crear un libro después de validar
    public static Libro crearLibro(String isbn, String titulo, String autor) {
        validarLibro(isbn, titulo, autor);
        return new Libro(isbn, titulo, autor);
    }
}

// Clase auxiliar para representar un libro
class Libro {
    private String isbn;
    private String titulo;
    private String autor;

    public Libro(String isbn, String titulo, String autor) {
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
    }

    // Getters y Setters
    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }
} 
