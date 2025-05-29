// routes/userRoutes.js
import express from 'express';
import { login, register } from '../services/UserService.js';
import {userModel} from '../models/userShema.js'; // assuming you have a User model
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, email, password,role } = req.body;
    const result = await register({ firstname, lastname, email, password , role });
    res.status(result.statuscode).json(result.data);
  } catch (error) {
    res.status(500).send('Something went wrong!');
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { password, email } = req.body;
    const { statuscode, data } = await login({ password, email });
    res.status(statuscode).send(data);
  } catch (error) {
    res.status(500).send('Something went wrong!');
  }
});

// Get User Profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    console.log('User from token:', req.user);
    
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }

    const user = await userModel.findById(req.user._id).select('-password');
    console.log('Found user:', user);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Format the response
    const userData = {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    };

    return res.json(userData);
  } catch (error) {
    console.error('Profile error:', error);
    return res.status(500).json({ message: "Erreur lors de la récupération du profil" });
  }
});

// Update User Profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }

    // Validate input
    if (!firstname || !lastname || !email) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      { firstname, lastname, email },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Format the response
    const userData = {
      _id: updatedUser._id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      role: updatedUser.role,
      createdAt: updatedUser.createdAt
    };

    return res.json(userData);
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ message: "Erreur lors de la mise à jour du profil" });
  }
});

// Get All Users
router.get('/', async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).send("Failed to get users.");
  }
});

// Update User
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send("Failed to update user.");
  }
});

// Delete User
router.delete('/:id', async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send("Failed to delete user.");
  }
});

export default router;
