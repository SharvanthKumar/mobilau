import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
const port = 3000;

const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
db.connect();

app.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM mobiles ORDER BY sno ASC');
        res.render("home", { mobiles: result.rows });
    } catch (err) {
        console.error('Error fetching data', err);
        res.status(500).send('Server Error');
    }
});

app.get('/brand/:brand', async (req, res) => {
    const brand = req.params.brand;
    console.log(brand);
    try 
    {
        const result = await db.query('SELECT * FROM mobiles WHERE brand = $1 ORDER BY launch_date ASC', [brand]);
        res.render("home", { mobiles: result.rows });
        
    } 
    catch (err) 
    {
        console.error('Error fetching data', err);
        res.status(500).send('Server Error');
    }
});

app.get('/2024', async (req, res) => {
    try{
        const result = await db.query('SELECT * FROM phones_2024 ORDER BY sno ASC');
        res.render("2024", { mobiles: result.rows });
    }
    catch (err) {
        console.error('Error fetching data', err);
        res.status(500).send('Server Error');
    }
})
app.get('/2024/brand/:brand', async (req, res) => {
    const brand = req.params.brand;
    console.log(brand);
    try 
    {
        const result = await db.query('SELECT * FROM phones_2024 WHERE brand = $1 ORDER BY launch_date ASC', [brand]);
        res.render("2024", { mobiles: result.rows });
        
    } 
    catch (err) 
    {
        console.error('Error fetching data', err);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
