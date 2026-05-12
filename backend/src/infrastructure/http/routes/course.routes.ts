import { Router } from 'express';
import { CourseModel } from '../../database/mongoose/CourseModel';

const router = Router();

// GET all courses
router.get('/', async (req, res) => {
  try {
    const courses = await CourseModel.find();
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// POST new course
router.post('/', async (req, res) => {
  try {
    const newCourse = new CourseModel(req.body);
    await newCourse.save();
    res.status(201).json({ success: true, data: newCourse });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Bad Request' });
  }
});

export default router;
