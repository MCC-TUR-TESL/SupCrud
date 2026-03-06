// ─────────────────────────────────────────────
// 🔹 Dependencias
// ─────────────────────────────────────────────
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const axios = require("axios");
const OpenAI = require("openai");
require("dotenv").config();

// ─────────────────────────────────────────────
// 🔹 Inicialización
// ─────────────────────────────────────────────
const app = express();
app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────────
// 🔹 OpenAI Config
// ─────────────────────────────────────────────
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ─────────────────────────────────────────────
// 🔹 MySQL Config
// ─────────────────────────────────────────────
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

// Usamos `db` como alias para pool (callbacks)
const db = pool;

// ─────────────────────────────────────────────
// 🔹 Rutas Generales
// ─────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.get("/firebase-config", (req, res) => {
  res.json({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
  });
});

// ─────────────────────────────────────────────
// 🔹 PQRS
// ─────────────────────────────────────────────

// GET ALL PQRS
app.get("/pqrs", (req, res) => {
  const query = `
    SELECT 
      pqrs.id,
      pqrs.full_name,
      pqrs.email,
      pqrs.subject,
      pqrs.description,
      pqrs.created_at,
      type_request.name AS type_request,
      status.name AS status
    FROM PQRS pqrs
    JOIN type_request ON pqrs.tr_id = type_request.id
    JOIN status ON pqrs.status_id = status.id
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// GET PQRS BY ID
app.get("/pqrs/:id", (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT 
      pqrs.id,
      pqrs.full_name,
      pqrs.email,
      pqrs.subject,
      pqrs.description,
      pqrs.created_at,
      type_request.name AS type_request,
      status.name AS status
    FROM PQRS pqrs
    JOIN type_request ON pqrs.tr_id = type_request.id
    JOIN status ON pqrs.status_id = status.id
    WHERE pqrs.id = ?
  `;
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (!result[0]) return res.status(404).json({ message: "PQRS no encontrada" });
    res.json(result[0]);
  });
});

// CREATE PQRS
app.post("/pqrs", (req, res) => {
  const { full_name, email, subject, description, tr_id, status_id } = req.body;
  const query = `
    INSERT INTO PQRS(full_name,email,subject,description,tr_id,status_id)
    VALUES(?,?,?,?,?,?)
  `;
  db.query(query, [full_name, email, subject, description, tr_id, status_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "PQRS creada", id: result.insertId });
  });
});

// UPDATE PQRS
app.put("/pqrs/:id", (req, res) => {
  const { id } = req.params;
  const { full_name, email, subject, description, tr_id, status_id } = req.body;
  const query = `
    UPDATE PQRS
    SET full_name=?, email=?, subject=?, description=?, tr_id=?, status_id=?
    WHERE id=?
  `;
  db.query(query, [full_name, email, subject, description, tr_id, status_id, id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "PQRS no encontrada" });
    res.json({ message: "PQRS actualizada" });
  });
});

// DELETE PQRS
app.delete("/pqrs/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM PQRS WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "PQRS no encontrada" });
    res.json({ message: "PQRS eliminada" });
  });
});

// ─────────────────────────────────────────────
// 🔹 STAFF PQRS
// ─────────────────────────────────────────────

// GET ALL STAFF PQRS
app.get("/staff-pqrs", (req, res) => {
  const query = `
    SELECT
      staff_pqrs.id,
      staff_pqrs.full_name,
      staff_pqrs.email,
      pqrs.id AS pqrs_id,
      pqrs.subject,
      pqrs.description,
      type_request.name AS type_request,
      status.name AS status
    FROM staff_pqrs
    JOIN PQRS pqrs ON staff_pqrs.pqrs_assigned_id = pqrs.id
    JOIN type_request ON pqrs.tr_id = type_request.id
    JOIN status ON pqrs.status_id = status.id
  `;
  db.query(query, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// GET STAFF BY ID
app.get("/staff-pqrs/:id", (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT
      staff_pqrs.id,
      staff_pqrs.full_name,
      staff_pqrs.email,
      pqrs.id AS pqrs_id,
      pqrs.subject,
      pqrs.description,
      type_request.name AS type_request,
      status.name AS status
    FROM staff_pqrs
    JOIN PQRS pqrs ON staff_pqrs.pqrs_assigned_id = pqrs.id
    JOIN type_request ON pqrs.tr_id = type_request.id
    JOIN status ON pqrs.status_id = status.id
    WHERE staff_pqrs.id = ?
  `;
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (!result[0]) return res.status(404).json({ message: "Staff no encontrado" });
    res.json(result[0]);
  });
});

// CREATE STAFF
app.post("/staff-pqrs", (req, res) => {
  const { full_name, email, pqrs_assigned_id } = req.body;

  // Validación
  if (!full_name || !email || !pqrs_assigned_id) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  const query = `
    INSERT INTO staff_pqrs(full_name,email,pqrs_assigned_id)
    VALUES(?,?,?)
  `;
  db.query(query, [full_name, email, pqrs_assigned_id], (err, result) => {
    if (err) {
      console.error("Error al crear staff:", err); 
      return res.status(500).json({ message: "Error interno al crear staff" });
    }
    res.json({ message: "Staff creado", id: result.insertId });
  });
});

// UPDATE STAFF
app.put("/staff-pqrs/:id", (req, res) => {
  const { id } = req.params;
  const { full_name, email, pqrs_assigned_id } = req.body;
  const query = `
    UPDATE staff_pqrs
    SET full_name=?, email=?, pqrs_assigned_id=?
    WHERE id=?
  `;
  db.query(query, [full_name, email, pqrs_assigned_id, id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Staff no encontrado" });
    res.json({ message: "Staff actualizado" });
  });
});

// DELETE STAFF
app.delete("/staff-pqrs/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM staff_pqrs WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Staff no encontrado" });
    res.json({ message: "Staff eliminado" });
  });
});

// ─────────────────────────────────────────────
// 🔹 TYPE REQUESTS
// ─────────────────────────────────────────────

// GET ALL TYPE REQUESTS
app.get("/type_request", (req, res) => {
  const query = "SELECT id, name FROM type_request";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ─────────────────────────────────────────────
// 🔹 STATUS
// ─────────────────────────────────────────────

// GET ALL STATUS
app.get("/status", (req, res) => {
  const query = "SELECT id, name FROM status";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ─────────────────────────────────────────────
// 🔹 START SERVER
// ─────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor en http://localhost:${PORT}`);
  console.log(`⚡ Node: ${process.version}`);
});