import mongoose from 'mongoose';

async function exploreDB() {
  await mongoose.connect('mongodb://127.0.0.1:27017/gestion-horarios');
  
  const db = mongoose.connection.db;
  if (!db) {
    console.error('No db connection');
    return;
  }
  
  const collections = await db.listCollections().toArray();
  console.log('Collections:', collections.map(c => c.name));
  
  const courses = await db.collection('cursos').find({}).toArray();
  console.log(`\nTotal Courses: ${courses.length}`);
  if (courses.length > 0) {
    console.log(JSON.stringify(courses.slice(0, 3), null, 2));
  }
  
  const teachers = await db.collection('docentes').find({}).toArray();
  console.log(`\nTotal Teachers: ${teachers.length}`);
  if (teachers.length > 0) {
    console.log(JSON.stringify(teachers.slice(0, 3), null, 2));
  }
  
  const carreras = await db.collection('carreras').find({}).toArray();
  console.log(`\nTotal Carreras: ${carreras.length}`);
  if (carreras.length > 0) {
    console.log(JSON.stringify(carreras.slice(0, 3), null, 2));
  }

  await mongoose.disconnect();
}

exploreDB().catch(console.error);
