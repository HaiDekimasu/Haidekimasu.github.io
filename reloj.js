(function(){
    var actualizarhora = function(){
        var fecha = new Date();
        var horas = fecha.getHours();
        var ampm;
        var minutos = fecha.getMinutes();
        var segundos = fecha.getSeconds();
        var diasemana = fecha.getDay();
        var dia = fecha.getDate();
        var mes = fecha.getMonth();
        var year = fecha.getFullYear();

        var phoras = document.getElementById('horas');
        var pampm = document.getElementById('ampm');
        var pminutos = document.getElementById('minutos');
        var psegundos = document.getElementById('segundos');
        var pdiasemana = document.getElementById('diasemana');
        var pdia = document.getElementById('dia');
        var pmes = document.getElementById('mes');
        var pyear = document.getElementById('year');

        var semana = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
        pdiasemana.textContent = semana[diasemana];
        pdia.textContent = dia;

        var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        pmes.textContent = meses[mes];

        pyear.textContent = year;

        if(horas >= 12){
            horas = horas - 12;
            ampm = 'PM';
        } else{
            ampm = 'AM';
        }
        if(horas == 0){
            horas = 12;
        }
        phoras.textContent = horas;
        pampm.textContent = ampm;

        if(minutos < 10){minutos = '0' + minutos};
        if(segundos < 10){segundos = '0' + segundos};

        pminutos.textContent = minutos;
        psegundos.textContent = segundos;

        };
    
        actualizarhora();
        var intervalo = setInterval(actualizarhora, 1000);
}())


// Hacer una solicitud a la API
    fetch('https://picsum.photos/1920/1600')
    .then(response => {
    // Obtener la URL de la imagen desde el encabezado de la respuesta
    const imageUrl = response.url;

    // Actualizar el fondo de la página con la imagen obtenida
    document.body.style.backgroundImage = `url(${imageUrl})`;
    })
    .catch(error => console.error(error));

    /*app para ver clima*/

    const result = document.querySelector('.result');
    const form = document.querySelector('.get-weather');
    const nameCity = document.querySelector('#city');
    const nameCountry = document.querySelector('#country');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    
        if (nameCity.value === '' || nameCountry.value === '') {
            showError('Ambos campos son obligatorios...');
            return;
        }
    
        callAPI(nameCity.value, nameCountry.value);
        //console.log(nameCity.value);
        //console.log(nameCountry.value);
    })
    
    function callAPI(city, country){
        const apiId = '41d1d7f5c2475b3a16167b30bc4f265c';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;
    
        fetch(url)
            .then(data => {
                return data.json();
            })
            .then(dataJSON => {
                if (dataJSON.cod === '404') {
                    showError('Ciudad no encontrada...');
                } else {
                    clearHTML();
                    showWeather(dataJSON);
                }
                //console.log(dataJSON);
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    function showWeather(data){
        const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;
    
        const degrees = kelvinToCentigrade(temp);
        const min = kelvinToCentigrade(temp_min);
        const max = kelvinToCentigrade(temp_max);
    
        const content = document.createElement('div');
        content.innerHTML = `
            <h5>Clima en ${name}</h5>
            <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
            <h2>${degrees}°C</h2>
            <p>Max: ${max}°C</p>
            <p>Min: ${min}°C</p>
        `;
    
        result.appendChild(content);
    
        /* console.log(name);
        console.log(temp);
        console.log(temp_max);
        console.log(temp_min);
        console.log(arr.icon); */
    }
    
    function showError(message){
        //console.log(message);
        const alert = document.createElement('p');
        alert.classList.add('alert-message');
        alert.innerHTML = message;
    
        form.appendChild(alert);
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }
    
    function kelvinToCentigrade(temp){
        return parseInt(temp - 273.15);
    }
    
    function clearHTML(){
        result.innerHTML = '';
    }