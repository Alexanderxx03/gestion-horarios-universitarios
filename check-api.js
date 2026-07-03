fetch('http://localhost:5000/api/teachers')
  .then(res => res.json())
  .then(data => {
    console.log(`Total teachers: ${data.data.length}`);
    if (data.data.length > 0) {
      console.log('Sample teacher:', JSON.stringify(data.data[0], null, 2));
    }
  })
  .catch(console.error);
