//Fly server: https://long-hill-1888.fly.dev/

//Heroku server: https://asgbi-programme.herokuapp.com
async function retrieveProgramme() {
    const res = await fetch('https://long-hill-1888.fly.dev', {
      method: 'GET'
    });
    const data = await res.json();
    console.log(data)
    return data
  }
