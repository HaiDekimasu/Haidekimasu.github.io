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
