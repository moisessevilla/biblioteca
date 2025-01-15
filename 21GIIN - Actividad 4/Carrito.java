// Clase Carrito
import java.util.ArrayList;
import java.util.List;

public class Carrito {
    private int id;
    private Usuario usuario;
    private List<DetalleCarrito> productos;

    public Carrito(Usuario usuario) {
        this.usuario = usuario;
        this.productos = new ArrayList<>();
    }

    public void agregarProducto(Producto producto, int cantidad) {
        productos.add(new DetalleCarrito(this, producto, cantidad));
    }

    public double calcularTotal() {
        return productos.stream().mapToDouble(p -> p.getProducto().getPrecio() * p.getCantidad()).sum();
    }

    // Getters y Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public List<DetalleCarrito> getProductos() {
        return productos;
    }

    public void setProductos(List<DetalleCarrito> productos) {
        this.productos = productos;
    }
}