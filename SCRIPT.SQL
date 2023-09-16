/*
Tabla de Productos:

ProductoID (Clave primaria)
Nombre del producto
Descripción
Precio
Categoría (puede ser "Indumentaria" o "Accesorios")
Stock disponible
Fabricante/Proveedor
Imagen del producto (URL o ruta de archivo)
Tabla de Talles:

TalleID (Clave primaria)
Tamaño (por ejemplo, S, M, L, XL, etc.)
Tabla de Colores:

ColorID (Clave primaria)
Nombre del color (por ejemplo, Rojo, Azul, Negro, etc.)
Tabla de Talles por Producto:

ProductoTalleID (Clave primaria)
ProductoID (Clave externa que se relaciona con la tabla de Productos)
TalleID (Clave externa que se relaciona con la tabla de Talles)
Tabla de Colores por Producto:

ProductoColorID (Clave primaria)
ProductoID (Clave externa que se relaciona con la tabla de Productos)
ColorID (Clave externa que se relaciona con la tabla de Colores)
Tabla de Clientes:

ClienteID (Clave primaria)
Nombre
Apellido
Dirección
Correo electrónico
Teléfono
Tabla de Pedidos:

PedidoID (Clave primaria)
ClienteID (Clave externa que se relaciona con la tabla de Clientes)
Fecha y hora del pedido
Estado del pedido (pendiente, procesado, enviado, entregado, etc.)
Tabla de Detalles de Pedido:

DetalleID (Clave primaria)
PedidoID (Clave externa que se relaciona con la tabla de Pedidos)
ProductoID (Clave externa que se relaciona con la tabla de Productos)
Cantidad
Precio unitario
ProductoTalleID (Clave externa que se relaciona con la tabla de Talles por Producto, solo para productos de la categoría "Indumentaria")
ProductoColorID (Clave externa que se relaciona con la tabla de Colores por Producto, solo para productos de la categoría "Indumentaria")
Tabla de Categorías de Productos:

CategoriaID (Clave primaria)
Nombre de la categoría
Descripción de la categoría
Tabla de Fabricantes/Proveedores:

ProveedorID (Clave primaria)
Nombre del proveedor
Dirección del proveedor
Correo electrónico del proveedor
Teléfono del proveedor
Tabla de Comentarios y Reseñas:

ComentarioID (Clave primaria)
ProductoID (Clave externa que se relaciona con la tabla de Productos)
ClienteID (Clave externa que se relaciona con la tabla de Clientes)
Comentario
Puntuación (para calificaciones)
Tabla de Inventario:

ProductoID (Clave externa que se relaciona con la tabla de Productos)
Cantidad en stock
Ubicación física (opcional, si manejas múltiples almacenes)
Tabla de Promociones:

PromocionID (Clave primaria)
Descripción de la promoción
Fecha de inicio
Fecha de finalización
Descuento o código de promoción*/
CREATE TABLE `rol` (
  `id` int NOT NULL,
  `nombreRol` varchar(45) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Usuario` (
  `id` int NOT NULL,
  `identification` varchar(30) DEFAULT NULL,
  `first_name` varchar(80) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `phone` bigint DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(75) DEFAULT NULL,
  `rol_id` int DEFAULT NULL,
  `image` blob default Null,
  `date_creation` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rol_FK` (`rol_id`),
  CONSTRAINT `rol_FK` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`)
) ;
CREATE TABLE `categoria` (
  `id` int NOT NULL,
  `category` varchar(45) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;
CREATE TABLE `talle` (
  `id` int NOT NULL,
  `size` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;
CREATE TABLE `color` (
  `id` int NOT NULL,
  `size` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;
 CREATE TABLE `producto` (
  `id` int NOT NULL AUTO_INCREMENT,
   `name` varchar(100) Not NULL,
  `description` varchar(100) Not NULL,
  `image` int DEFAULT NULL,
  `imagen` blob DEFAULT NULL,
  `precio` decimal DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `categori_FK` FOREIGN KEY (`category_id`) REFERENCES `categoria` (`id`)
) ;
CREATE TABLE `producto_talle_color` (
  `id_product` int NOT NULL,
  `id_color` int NOT NULL,
  `id_size`  int NOT NULL,
  `stock` int not NULL,
  PRIMARY KEY (`id_product`,`id_color`,`id_size`),
  CONSTRAINT `id_color_FK` FOREIGN KEY (`id_color`) REFERENCES `color` (`id`),
  CONSTRAINT `id_size_FK` FOREIGN KEY (`id_size`) REFERENCES `talle` (`id`)
) ;