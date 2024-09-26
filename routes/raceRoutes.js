const express = require('express');
const router = express.Router();
const { Race } = require('../models'); // Import modelu Race

// Vytvoření nového závodu
router.post('/', async (req, res) => {
  try {
    const race = await Race.create({
      name: req.body.name,
      location: req.body.location,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
    });
    res.status(201).json(race);
  } catch (error) {
    console.error('Error creating race:', error);
    res.status(500).json({ error: 'Failed to create race' });
  }
});

// Získání všech závodů
router.get('/', async (req, res) => {
  try {
    const races = await Race.findAll();
    res.status(200).json(races);
  } catch (error) {
    console.error('Error fetching races:', error);
    res.status(500).json({ error: 'Failed to fetch races' });
  }
});

// Získání konkrétního závodu
router.get('/:id', async (req, res) => {
  try {
    const race = await Race.findByPk(req.params.id);
    if (!race) {
      return res.status(404).json({ error: 'Race not found' });
    }
    res.status(200).json(race);
  } catch (error) {
    console.error('Error fetching race:', error);
    res.status(500).json({ error: 'Failed to fetch race' });
  }
});

// Aktualizace závodu
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Race.update({
        name: req.body.name,
        location: req.body.location,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
    }, {
      where: { id: req.params.id },
    });

    if (updated) {
      const updatedRace = await Race.findByPk(req.params.id);
      return res.status(200).json(updatedRace);
    }
    res.status(404).json({ error: 'Race not found' });
  } catch (error) {
    console.error('Error updating race:', error);
    res.status(500).json({ error: 'Failed to update race' });
  }
});

// Smazání závodu
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Race.destroy({
      where: { id: req.params.id },
    });

    if (deleted) {
      return res.status(204).send();
    }
    res.status(404).json({ error: 'Race not found' });
  } catch (error) {
    console.error('Error deleting race:', error);
    res.status(500).json({ error: 'Failed to delete race' });
  }
});

module.exports = router;
