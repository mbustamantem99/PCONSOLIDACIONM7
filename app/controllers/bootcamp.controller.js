const { Bootcamp, User } = require('../models');

class BootcampController {
  async createBootcamp(req, res) {
    try {
      const { title, cue, description } = req.body;
      const bootcamp = await Bootcamp.create({ title, cue, description });
      res.status(201).json(bootcamp);
    } catch (error) {
      res.status(500).json({ message: 'Error creating bootcamp' });
    }
  }

  async addUser (req, res) {
    try {
      const idBootcamp = req.params.idBootcamp;
      const idUser  = req.params.idUser ;
      const bootcamp = await Bootcamp.findByPk(idBootcamp);
      const user = await User.findByPk(idUser );
      if (!bootcamp || !user) {
        return res.status(404).json({ message: 'Bootcamp or user not found' });
      }
      
      const existingUsers = await bootcamp.getUsers({ where: { id: idUser  } });
      if (existingUsers.length > 0) {
        return res.status(400).json({ message: 'User  already added to bootcamp' });
      }

      await bootcamp.addUser (user);
      res.json({ message: 'User  added to bootcamp successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error adding user to bootcamp' });
    }
  }

  async findById(req, res) {
    try {
      const id = req.params.id;
      const bootcamp = await Bootcamp.findByPk(id, {
        include: [{ model: User, as: 'users' }]
      });
      if (!bootcamp) {
        return res.status(404).json({ message: 'Bootcamp not found' });
      }
      res.json(bootcamp);
    } catch (error) {
      res.status(500).json({ message: 'Error finding bootcamp' });
    }
  }

  async findAll(req, res) {
    try {
      const bootcamps = await Bootcamp.findAll({
        include: [{ model: User, as: 'users' }]
      });
      res.json(bootcamps);
    } catch (error) {
      res.status(500).json({ message: 'Error finding all bootcamps' });
    }
  }
}

module.exports = new BootcampController();