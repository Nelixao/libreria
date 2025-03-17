async function registerUser() {
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;
    const role = document.getElementById("regRole").value;

    try {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, role })
        });

        const data = await response.json();
        
        if (response.ok) {
            // Mostrar SweetAlert de éxito
            Swal.fire({
                title: "¡Éxito!",
                text: data.message,
                icon: "success",
                confirmButtonText: "Aceptar"
            });
        } else {
            // Mostrar SweetAlert de error
            Swal.fire({
                title: "Error",
                text: data.message,
                icon: "error",
                confirmButtonText: "Aceptar"
            });
        }
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        // Mostrar SweetAlert de error si algo sale mal con la solicitud
        Swal.fire({
            title: "Error",
            text: "Hubo un error al intentar registrar el usuario.",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
    }
}
