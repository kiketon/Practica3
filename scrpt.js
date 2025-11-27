document.addEventListener("DOMContentLoaded", function () {

    const boton = document.getElementById("btn-sintonia");
    const audio = document.getElementById("audio-sintonia");

    boton.addEventListener("click", function () {

        if (audio.paused) {
            audio.play();
            boton.textContent = "⏸️ Pausar sintonía";
        } else {
            audio.pause();
            boton.textContent = "🎵 Escucha nuestra sintonía";
        }

    });

});

