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
        const result = await db.query('SELECT * FROM phone_2024 ORDER BY sno ASC');
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
        const result = await db.query('SELECT * FROM phone_2024 WHERE brand = $1 ORDER BY launch_date ASC', [brand]);
        res.render("2024", { mobiles: result.rows });
        
    } 
    catch (err) 
    {
        console.error('Error fetching data', err);
        res.status(500).send('Server Error');
    }
});

// Endpoint for number of phones launched each month from phone_2024
app.get('/api/phones-launched-monthly', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT
                TO_CHAR(launch_date, 'Mon') AS month,
                COUNT(*) AS phone_count
            FROM
                phone_2024
            GROUP BY
                TO_CHAR(launch_date, 'Mon')
            ORDER BY
                TO_DATE(TO_CHAR(launch_date, 'Mon'), 'Mon')
        `);
        res.json(result.rows);
        console.log(result.rows);
    } catch (err) {
        console.error('Error fetching monthly launch data from phone_2024:', err);
        res.status(500).send('Error fetching data');
    }
});


// Endpoint for number of phones launched by each brand each month from phone_2024
app.get('/api/phones-by-brand-monthly', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT
                TO_CHAR(launch_date, 'Mon') AS month,
                brand,
                COUNT(*) AS phone_count
            FROM
                phone_2024
            GROUP BY
                TO_CHAR(launch_date, 'Mon'),
                brand
            ORDER BY
                TO_DATE(TO_CHAR(launch_date, 'Mon'), 'Mon'),
                brand
        `);
        res.json(result.rows);
        console.log(result.rows);
    } catch (err) {
        console.error('Error fetching phones by brand monthly data from phone_2024:', err);
        res.status(500).send('Error fetching data');
    }
});


// Endpoint for number of phones launched by each brand from phone_2024
app.get('/api/phones-launched-by-brand', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT brand, COUNT(*) AS phone_count
            FROM phone_2024
            GROUP BY brand
            ORDER BY phone_count DESC`);
        
        res.json(result.rows);
        console.log(result.rows);
    } catch (err) {
        console.error('Error fetching phone count by brand from phone_2024', err);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
