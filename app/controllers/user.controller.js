const { User, Bootcamp } = require('../models');

class UserController {
  async createUser (req, res) {
    try {
      const { firstName, lastName, email } = req.body;
      const user = await User.create({ firstName, lastName, email });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error creating user' });
    }
  }

  async findUserById(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id, {
        include: [{ model: Bootcamp, as: 'bootcamps' }]
      });
      if (!user) {
        return res.status(404).json({ message: 'User  not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error finding user' });
    }
  }

  async findAll(req, res) {
    try {
      const users = await User.findAll({
        include: [{ model: Bootcamp, as: 'bootcamps' }]
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error finding all users' });
    }
  }

  async updateUserById(req, res) {
    try {
      const id = req.params.id;
      const { firstName, lastName, email } = req.body;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User  not found' });
      }
      await user.update({ firstName, lastName, email });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user' });
    }
  }

  async deleteUserById(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User  not found' });
      }
      await user.destroy();
      res.json({ message: 'User  deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user' });
    }
  }
}

module.exports = new UserController();