const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'your_secret_key';  

app.use(cors());  
app.use(bodyParser.json());  


app.use(express.static(path.join(__dirname, 'public')));

let users = []; 


app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    
    console.log("Registration Data:", req.body);


    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    try {
        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = { name, email, password: hashedPassword };
        users.push(newUser);  

        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: 'Registration failed. Please try again later.' });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    
    console.log("Login Data:", req.body);

    
    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    try {
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        
        const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        
        res.json({ token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Login failed. Please try again later.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
