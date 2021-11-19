
let container = document.getElementById("container")
container.classList.add('uk-child-width-expand@s')


function myFunction() {

  var btn = document.getElementById("myButton");

  if (btn.value == "true") {
      btn.value = "false";
      btn.innerHTML = "false";
  }
  else {
      btn.value = "true";
      btn.innerHTML = "true";
  }

}



let container2 = document.getElementById("container2")
container2.classList.add('uk-child-width-expand@s')

fetch("https://hf3xzw.deta.dev/")
  .then(r => r.json()) // (1)
  .then(body => {
    for(let i = 0; i < 4; i++)
    { 
      const sensor = JSONToSensor(body["sensors"][i])
        let newCard = document.createElement("div")
        newCard.innerHTML = `
        <p style= "font-size: 35px; color: black; font-weight: 900;">${sensor.description}</p>
        <p> <c style= "font-weight: 900"> lan</c>: ${sensor.lat}</p>
        <p> <c style= "font-weight: 900">  lng</c>: ${sensor.lng}</p>
        <p> <c style= "font-weight: 900"> place</c>: ${sensor.place}</p>
        <p> <c style= "font-weight: 900"> readonly</c>: ${sensor.readonly}</p>
        <p> <c style= "font-weight: 900"> state_code</c>: ${sensor.state_code}</p>
        <p> <c style= "font-weight: 900"> value</c>:<d id ="value" >
        <button style= "font-weight: 900" onclick="myFunction()" id="myButton" value="value">${sensor.value}</button>
         </d></p>
        `
        console.log(sensor.value[i])
        newCard.classList.add('card')
        newCard.classList.add('hvr-float-shadow')
        container.appendChild(newCard)
    }
  }); 

    fetch("https://hf3xzw.deta.dev/")
    .then(r => r.json()) // (1)
    .then(body => {
    for(let i = 4; i < 8; i++)
    {
        const sensor = JSONToSensor(body["sensors"][i])
        let newCard2 = document.createElement("div")
        newCard2.innerHTML = `
      
        <p style= "font-size: 35px; color: #FFD717; font-weight: 900;">${sensor.id}</p>
        <p><c style= "font-weight: 900"> description</c>: ${sensor.description}</p>
        <p> <c style= "font-weight: 900"> lan</c>: ${sensor.lat}</p>
        <p> <c style= "font-weight: 900">  lng</c>: ${sensor.lng}</p>
        <p> <c style= "font-weight: 900"> place</c>: ${sensor.place}</p>
        <p> <c style= "font-weight: 900"> readonly</c>: ${sensor.readonly}</p>
        <p> <c style= "font-weight: 900"> state_code</c>: ${sensor.state_code}</p>
        <p> <c style= "font-weight: 900"> value</c>: ${sensor.value}</p>
        <div style=" width: 100%; margin-bottom: 10px; margin-top 20px;">
        <canvas id="myChart${i}"></canvas>
        `
        newCard2.classList.add('card2')
        newCard2.classList.add('hvr-float-shadow') 
        container2.appendChild(newCard2)
        
        let labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let datas = [];

        
        for (let index = 0; index < 10; index++) {
          fetch("https://hf3xzw.deta.dev/")
            .then((r) => r.json()) // (1)
            .then((body) => {
              const sensorLabel = JSONToSensor(body["sensors"][5])
              datas.push(sensorLabel.value)  
            });
        }
        const data = {
          labels: labels,
          datasets: [
            {
              label: "Registro Dati",
              backgroundColor: "#fefefe",
              borderColor: "#fefefe",
              data: datas,
            },
          ],
        };
  
        const config = {
          type: "line",
          data: data,
          fill: true,
          options: {
            responsive: true,
            lineTension: 0.4,
            scales: {
             y: {
              lineHeight: 3,
              ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, values) {
                  return value + "°";
                  },
                },
              },
            },
          },
        };
        let nomeChart = "myChart" + i;
        const myChart = new Chart(document.getElementById(nomeChart), config);
        
    
      }

  });
 