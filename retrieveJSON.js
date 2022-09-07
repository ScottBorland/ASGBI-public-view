
async function retrieveProgramme() {
    const res = await fetch('https://asgbi-programme.herokuapp.com', {
      method: 'GET'
    });
    const data = await res.json();
    console.log(data)
    return data
  }
