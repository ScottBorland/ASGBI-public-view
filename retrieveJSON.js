// const url='http:/localhost:3000';
// var excelFile;

// fetch(url)
// .then(res=>{console.log(res)})
// .catch(error=>console.log(error))

// import myJson from './public/rows.json' assert {type: 'json'};

// console.log(myJson)

async function retrieveProgramme() {
    const res = await fetch('https://asgbi-programme.herokuapp.com', {
      method: 'GET'
    });
    const data = await res.json();
    console.log(data)
    return data
  }
