// public/js/script.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/libros')
      .then(response => response.json())
      .then(libros => {
        const lista = document.getElementById('libros-lista').querySelector('tbody');
        libros.forEach(libro => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${libro.isbn}</td>
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.editorial}</td>
            <td>${libro.precio}</td>
            <td>${libro.stock}</td>
          `;
          lista.appendChild(row);
        });
      })
      .catch(error => console.error('Error al cargar los libros:', error));
  });
  