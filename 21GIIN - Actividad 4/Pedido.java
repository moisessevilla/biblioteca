// Clase Pedido
import java.util.Date;
import java.util.List;

public class Pedido {
    private int id;
    private Usuario usuario;
    private Date fechaPedido;
    private String estado;
    private List<DetallePedido> detalles;

    public Pedido(Usuario usuario, List<DetallePedido> detalles) {
        this.usuario = usuario;
        this.fechaPedido = new Date();
        this.estado = "Pendiente";
        this.detalles = detalles;
    }

    public void actualizarEstado(String nuevoEstado) {
        this.estado = nuevoEstado;
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

    public Date getFechaPedido() {
        return fechaPedido;
    }

    public void setFechaPedido(Date fechaPedido) {
        this.fechaPedido = fechaPedido;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public List<DetallePedido> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetallePedido> detalles) {
        this.detalles = detalles;
    }
}