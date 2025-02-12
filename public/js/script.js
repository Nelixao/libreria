document.addEventListener("DOMContentLoaded", cargarLibros);

async function cargarLibros() {
    try {
        const res = await fetch("http://localhost:3000/api/libros");
        const libros = await res.json();
        const tabla = document.getElementById("tabla-libros");
        tabla.innerHTML = "";

        libros.forEach(libro => {
            const fila = `<tr>
                <td>${libro.titulo}</td>
                <td>${libro.autor}</td>
                <td>${libro.categoria}</td>
                <td>$${libro.precio}</td>
                <td>${libro.stock}</td>
                <td>⭐ ${libro.calificacion}</td>
            </tr>`;
            tabla.innerHTML += fila;
        });
    } catch (error) {
        console.error("Error cargando libros:", error);
    }
}

function buscarLibros() {
    const filtro = document.getElementById("busqueda").value.toLowerCase();
    const checkTitulo = document.getElementById("filtro-titulo").checked;
    const checkAutor = document.getElementById("filtro-autor").checked;
    const checkCategoria = document.getElementById("filtro-categoria").checked;

    const filas = document.querySelectorAll("#tabla-libros tr");

    filas.forEach(fila => {
        const titulo = fila.children[0].textContent.toLowerCase();
        const autor = fila.children[1].textContent.toLowerCase();
        const categoria = fila.children[2].textContent.toLowerCase();

        let mostrar = false;
        if (checkTitulo && titulo.includes(filtro)) mostrar = true;
        if (checkAutor && autor.includes(filtro)) mostrar = true;
        if (checkCategoria && categoria.includes(filtro)) mostrar = true;

        fila.style.display = mostrar ? "" : "none";
    });
}
