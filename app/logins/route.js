import { NextResponse } from 'next/server';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '../middleware/mongoose';
import User from '../models/user';

// Ensure DB connection happens only once
connectDB();

const validateLogin = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').not().isEmpty().withMessage('Password cannot be empty'),
];

export async function POST(request) {
  try {
    const data = await request.json();
    const req = { body: data };

    // Run validations
    await Promise.all(validateLogin.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return NextResponse.json({ errors: errors.array() }, { status: 400 });
    }

    // Find user by email
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Generate a token
    const token = jwt.sign({ id: user._id }, 'abbaammi@123', { expiresIn: '1h' });

    return NextResponse.json({ message: 'Login successful', token,ok : true }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error', details: e.message }, { status: 500 });
  }
}
