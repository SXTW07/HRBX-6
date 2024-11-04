document.addEventListener('DOMContentLoaded', () => {
    // Inicializar el slider
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const slider = document.querySelector('.slider');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active'); // Remueve la clase 'active' de todos los slides
        });
        slides[index].classList.add('active'); // Agrega la clase 'active' al slide actual
        slider.style.transform = `translateX(-${index * 100}%)`; // Desliza hacia el slide correspondiente
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides; // Mueve al siguiente slide
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Mueve al slide anterior
        showSlide(currentIndex);
    }

    // Asigna eventos a las flechas
    document.getElementById('nextSlide').addEventListener('click', nextSlide);
    document.getElementById('prevSlide').addEventListener('click', prevSlide);

    setInterval(nextSlide, 5000); // Cambia cada 5 segundos

    // Carga los datos del sensor cada 5 segundos
    fetchSensorData();
    setInterval(fetchSensorData, 5000); // 5000 ms = 5 segundos
});

// Función para obtener los datos del sensor
async function fetchSensorData() {
    try {
        const response = await fetch('pages/data.json');  // Asegúrate de que el archivo JSON esté aquí
        const sensorData = await response.json();           // Parsear como JSON

        // Actualiza el DOM con los datos del sensor
        document.getElementById('sensor-data').innerText = `Temperatura: ${sensorData.temperature}°C, Humedad: ${sensorData.humidity}%`;

        // Dibuja la gráfica de pizza
        drawPieChart(sensorData.temperature, sensorData.humidity);
    } catch (error) {
        console.error('Error al obtener los datos del sensor:', error);
    }
}

// Función para dibujar la gráfica de pizza
function drawPieChart(temperature, humidity) {
    const ctx = document.getElementById('myPieChart').getContext('2d'); // Obtener el contexto del canvas

    // Crear la gráfica de pizza
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Temperatura', 'Humedad'],
            datasets: [{
                label: 'Datos del Sensor',
                data: [temperature, humidity],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Gráfica de Temperatura y Humedad'
                }
            }
        }
    });
}
