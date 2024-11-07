import User from '../../Models/UserModel.js';
import bcryptjs from 'bcryptjs';

export const listUsers = async (req, res) => {
    try {
      const users = await User.find();
      //const {password,...rest}=users._doc;
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users', error });
    }
  };

  export const createUser = async (req, res) => {
    const { userName, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10)
    try {
      const newUser = new User({ userName, email, password:hashedPassword });
      await newUser.save();

      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create user', error });
    }
  };

  export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { userName, email } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(id, { userName, email }, { new: true });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update user', error });
    }
  };


  export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete user', error });
    }
  };

