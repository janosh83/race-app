const express = require('express');
const { Checkpoint } = require('../models');

const router = express.Router();

// Vytvoření nového checkpointu
router.post('/', async (req, res) => {
    console.log('POST route reached');
    //console.log("checkpoint> lat=", req.body.latitude, " lon=", req.body.llongitude);
    try {
      const newCheckpoint = await Checkpoint.create({
        raceId: req.body.raceId,
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        points: req.body.points,
        description: req.body.description
      });
      res.status(201).json(newCheckpoint);
    } catch (error) {
      console.error('Error creating checkpoint:', error);
      res.status(500).json({ error: 'Failed to create checkpoint' });
    }
  });
  

// Získání všech checkpointů
router.get('/', async (req, res) => {
    console.log('GET /:id route reached');
    try {
      const checkpoints = await Checkpoint.findAll();
      res.status(200).json(checkpoints);
    } catch (error) {
      console.error('Error fetching checkpoints:', error);
      res.status(500).json({ error: 'Failed to fetch checkpoints' });
    }
  });

// Získání konkrétního checkpointu
router.get('/:id', async (req, res) => {
    try {
      const checkpoint = await Checkpoint.findByPk(req.params.id);
      if (!checkpoint) {
        return res.status(404).json({ error: 'Checkpoint not found' });
      }
      res.status(200).json(checkpoint);
    } catch (error) {
      console.error('Error fetching checkpoint:', error);
      res.status(500).json({ error: 'Failed to fetch checkpoint' });
    }
  });

// Získání všech checkpointů pro konkrétní závod
router.get('/race/:raceId', async (req, res) => {
    try {
      const raceId = req.params.raceId; // Získání ID závodu z parametru URL
      const checkpoints = await Checkpoint.findAll({ where: { raceId } });
      
      if (checkpoints.length === 0) {
        return res.status(404).json({ message: 'No checkpoints found for this race' });
      }
  
      res.status(200).json(checkpoints);
    } catch (error) {
      console.error('Error fetching checkpoints for race:', error);
      res.status(500).json({ error: 'Failed to fetch checkpoints for race' });
    }
  });
  
  // Aktualizace checkpointu
  router.put('/:id', async (req, res) => {
    try {
      const [updated] = await Checkpoint.update({
        name: req.body.name,
        location: req.body.location,
        points: req.body.points,
        description: req.body.description,
      }, {
        where: { id: req.params.id },
      });
  
      if (updated) {
        const updatedCheckpoint = await Checkpoint.findByPk(req.params.id);
        return res.status(200).json(updatedCheckpoint);
      }
      res.status(404).json({ error: 'Checkpoint not found' });
    } catch (error) {
      console.error('Error updating checkpoint:', error);
      res.status(500).json({ error: 'Failed to update checkpoint' });
    }
  });
  
  // Smazání checkpointu
  router.delete('/:id', async (req, res) => {
    try {
      const deleted = await Checkpoint.destroy({
        where: { id: req.params.id },
      });
  
      if (deleted) {
        return res.status(204).send();
      }
      res.status(404).json({ error: 'Checkpoint not found' });
    } catch (error) {
      console.error('Error deleting checkpoint:', error);
      res.status(500).json({ error: 'Failed to delete checkpoint' });
    }
  });

module.exports = router;
