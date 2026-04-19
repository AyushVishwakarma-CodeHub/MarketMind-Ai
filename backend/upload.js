const fs = require('fs');

async function uploadFile() {
  try {
    const formData = new FormData();
    const fileBlob = new Blob([fs.readFileSync('c:\\Users\\ayush\\Desktop\\MarketMind AI\\large_dataset_2500.csv')], { type: 'text/csv' });
    formData.append('file', fileBlob, 'large_dataset_2500.csv');

    const response = await fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

uploadFile();
