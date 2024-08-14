import colors from 'colors';
import express from 'express';
import path from 'path';
import morgan from 'morgan';

import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


//  Environments
import dotenv from 'dotenv';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({
  path: path.resolve(__dirname ,  '../', 'environments' , 'environment.env')
});


// Initializacion
const app = express();
const port = process.env.PORT || 3000;

// Settings
app.set('views', path.join(__dirname, 'views') )
app.engine('.hbs',  engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', 'hbs');


// Midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello' });
})

// Public files
app.use(express.static(path.join(__dirname, 'public')));

// Run server
async function init(current_port) {
  try {
    await app.listen(current_port);
    return current_port;
  } catch (error) { 
    throw new Error(error.message);
  }
}

init(port)
  .then(current_port => { 
    console.log(`Server running on port: ${current_port}`.underline )
  })
  .catch(error => { console.error(colors.red(error.message)) });