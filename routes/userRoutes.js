const express = require('express');
const { User } = require('../models');  // Načteme model User

const router = express.Router();

// Vytvoření uživatele
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email, password });
    res.status(201).json(newUser);  // Vrátí vytvořeného uživatele s kódem 201
  } catch (error) {
    console.error('Error creating user:', error); 
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Získání všech uživatelů
router.get('/', async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);  // Vrátí seznam uživatelů
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
});
  
// Získání jednoho uživatele podle ID
router.get('/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// Aktualizace uživatele podle ID
router.put('/:id', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await User.findByPk(req.params.id);
      if (user) {
        user.username = username || user.username;
        user.email = email || user.email;
        user.password = password || user.password;
        await user.save();
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
});
  
// Smazání uživatele podle ID
router.delete('/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        await user.destroy();
        res.status(200).json({ message: 'User deleted' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
});
  
module.exports = router;
