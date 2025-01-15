-- Tabla productos
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL
);

-- Tabla carrito
CREATE TABLE IF NOT EXISTS carrito (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    total DECIMAL(10, 2) DEFAULT 0,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla detalle_carrito
CREATE TABLE IF NOT EXISTS detalle_carrito (
    id INT AUTO_INCREMENT PRIMARY KEY,
    carrito_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    FOREIGN KEY (carrito_id) REFERENCES carrito(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Tabla pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) DEFAULT 'pendiente',
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla detalle_pedido
CREATE TABLE IF NOT EXISTS detalle_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);