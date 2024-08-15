import { Router } from 'express';
import pool from '../database.js';

const router = Router();

// Get all persons
router.get('/listar', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM persons');
    res.render('personas/list', {
      personas: rows
    });
  } catch (error) {
    const err = new Error(error);
    err.status = 500;
    err.type = 'internal server error';
    next(err);
  }
});

// Add persons
router.get('/add', (req, res) => {
  res.render('personas/add', {
    message: ''
  });
});

router.post('/add', async (req, res) => {

  const { first_name, last_name, age } = req.body;

  if (!first_name ||!last_name ||!age) {
    return res.status(400).render('personas/add', { 
      response: [
        { error: true, message: 'Debes llenar todos los campos' }
      ]
    });
  }

  try {
    // const query = `
    //   INSERT INTO persons 
    //   (name, last_name, age) 
    //   VALUES (
    //     '${first_name}', 
    //     '${last_name}', 
    //     ${age}
    //   );
    // `;
    const query = 'INSERT INTO persons (name, last_name, age) VALUES (?,?,?)';
    await pool.query(query, [first_name, last_name, age]);
    res.render('personas/add', {
      response: [
        { error: false, message: 'Persona agregada correctamente' }
      ],
    });
    // res.redirect('/personas/listar');
  } catch (error) {
    const err = new Error(error);
    err.status = 500;
    err.type = 'internal server error';
    next(err);
  }

});

/**
 * Edit person
 */
router.get('/edit/:id', async (req, res) => {

  // Get person for update
  let query = 'SELECT * FROM persons WHERE person_id = ?';

  try {
    const [rows] = await pool.query(query, [req.params.id]);
    if(rows.length < 1) {
      return res.status(404).json({  message: 'person not found'  });
    }
    res.render('personas/add', {
      person: rows[0]
    });
  } catch (error) {
    const err = new Error(error);
    err.status = 500;
    err.type = 'internal server error';
    next(err);
  }
});

// Update a person
router.post('/edit/:id', async (req, res, next) => {
  const { first_name, last_name, age } = req.body;
  const person_id = req.params.id;
  try {
    const query = 'UPDATE persons SET name=?, last_name=?, age=?  WHERE person_id=?';
    await pool.query(query, [first_name, last_name, age, person_id]);
    res.render('personas/add', {
      response: [
        { error: false, message: 'Registro actualizado correctamente' }
      ],
    });
  } catch (error) {
    const err = new Error(error);
    err.status = 500;
    err.type = 'internal server error';
    next(err);
  }
});


router.get('/delete/:id', async (req, res, next) => {
  try {
    const query = 'DELETE FROM persons WHERE person_id=?';
    await pool.query(query, [req.params.id]);
    res.redirect('/personas/listar');
  } catch (error) {
    const err = new Error(error);
    err.status = 500;
    err.type = 'internal server error';
    next(err);
  }
});
 

export default router;
