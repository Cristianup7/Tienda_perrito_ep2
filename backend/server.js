const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

function getDbConfig(env = process.env) {
  const {
    DB_HOST = "10.0.2.134", // acá colocar la IP Privada EC2 DB
    DB_USER = "root",
    DB_PASSWORD = "admin123",
    DB_NAME = "tienda_perritos",
    DB_PORT = "3306",
  } = env;

  return {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: Number(DB_PORT),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };
}

function createApp(env = process.env) {
  const app = express();
  const PORT = env.PORT || 3001;
  let pool;

  app.use(cors());
  app.use(express.json());

  // Inicializar pool de conexiones
  async function initDb() {
    try {
      pool = mysql.createPool(getDbConfig(env));
      console.log("Pool de conexiones MySQL inicializado.");
      return pool;
    } catch (err) {
      console.error("Error al inicializar pool de MySQL:", err);
      throw err;
    }
  }

  // Helper para manejar errores
  function handleError(res, error, message = "Error interno del servidor") {
    console.error(error);
    res.status(500).json({ message });
  }

  function ensurePool(req, res) {
    if (!pool) {
      return res.status(503).json({ message: "DB no inicializada todavía." });
    }
    return null;
  }

  // Obtener todos los productos
  app.get("/api/productos", async (req, res) => {
    const guard = ensurePool(req, res);
    if (guard) return;

    try {
      const [rows] = await pool.query("SELECT id, nombre, descripcion, precio, stock FROM productos ORDER BY id DESC");
      res.json(rows);
    } catch (err) {
      handleError(res, err, "No se pudieron obtener los productos.");
    }
  });

  // Obtener un producto por ID
  app.get("/api/productos/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query("SELECT id, nombre, descripcion, precio, stock FROM productos WHERE id = ?", [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: "Producto no encontrado." });
      }
      res.json(rows[0]);
    } catch (err) {
      handleError(res, err, "No se pudo obtener el producto.");
    }
  });

  // Crear un nuevo producto
  app.post("/api/productos", async (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;

    if (!nombre || precio == null || stock == null) {
      return res.status(400).json({ message: "Nombre, precio y stock son obligatorios." });
    }

    try {
      const [result] = await pool.query(
        "INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)",
        [nombre, descripcion || null, precio, stock]
      );
      const nuevoId = result.insertId;
      const [rows] = await pool.query("SELECT id, nombre, descripcion, precio, stock FROM productos WHERE id = ?", [nuevoId]);
      res.status(201).json(rows[0]);
    } catch (err) {
      handleError(res, err, "No se pudo crear el Producto.");
    }
  });

  // Actualizar un producto
  app.put("/api/productos/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock } = req.body;

    if (!nombre || precio == null || stock == null) {
      return res.status(400).json({ message: "Nombre, Precio y Stock son obligatorios." });
    }

    try {
      const [result] = await pool.query(
        "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?",
        [nombre, descripcion || null, precio, stock, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Producto no encontrado." });
      }

      const [rows] = await pool.query("SELECT id, nombre, descripcion, precio, stock FROM productos WHERE id = ?", [id]);
      res.json(rows[0]);
    } catch (err) {
      handleError(res, err, "No se pudo actualizar el Producto.");
    }
  });

  // Eliminar un producto
  app.delete("/api/productos/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await pool.query("DELETE FROM productos WHERE id = ?", [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Producto no encontrado." });
      }
      res.json({ message: "Producto eliminado correctamente." });
    } catch (err) {
      handleError(res, err, "No se pudo eliminar el Producto.");
    }
  });

  // Endpoint de salud
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Backend de tienda de perritos en ejecución." });
  });

  return { app, initDb, PORT };
}

if (require.main === module) {
  const { app, initDb, PORT } = createApp(process.env);

  (async () => {
    await initDb();
    app.listen(PORT, () => {
      console.log(`Servidor backend escuchando en puerto ${PORT}`);
    });
  })();
}

module.exports = { createApp, getDbConfig };
