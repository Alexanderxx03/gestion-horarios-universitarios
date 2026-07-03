const mongoose = require('mongoose');

async function run() {
  await mongoose.connect('mongodb://127.0.0.1:27017/gestion-horarios');
  
  const courseSchema = new mongoose.Schema({}, { strict: false });
  const Course = mongoose.model('Course', courseSchema, 'cursos');
  
  const result = await Course.updateMany({}, { $set: { activo: true } });
  console.log(`Cursos actualizados a activos: ${result.modifiedCount}`);
  
  await mongoose.disconnect();
}

run().catch(console.error);
