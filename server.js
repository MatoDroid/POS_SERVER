const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Endpoint na načítanie menu
app.get('/menu', (req, res) => {
    fs.readFile('menu.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Chyba pri čítaní súboru menu.json:', err);
            res.status(500).send({ error: 'Nemôžem načítať menu.' });
        } else {
            res.send(JSON.parse(data));
        }
    });
});

// Endpoint na uloženie menu
app.post('/menu', (req, res) => {
    fs.writeFile('menu.json', JSON.stringify(req.body, null, 2), (err) => {
        if (err) {
            console.error('Chyba pri zapisovaní do súboru menu.json:', err);
            res.status(500).send({ error: 'Nemôžem uložiť menu.' });
        } else {
            res.send({ message: 'Menu bolo úspešne uložené.' });
        }
    });
});

// Endpoint na admin stránku
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Spustenie servera
app.listen(PORT, () => {
    console.log(`Server beží na porte ${PORT}`);
});
