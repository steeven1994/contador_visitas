document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica para el Menú Desplegable ---

    // Selecciona todos los elementos del menú principal que pueden tener submenús
    const menuItemsWithSubmenus = document.querySelectorAll('.menu-item');

    // Itera sobre cada uno de estos elementos para añadirles interactividad
    menuItemsWithSubmenus.forEach(item => {
        const mainLink = item.querySelector('a'); // Obtiene el enlace principal dentro del 'menu-item'

        // Solo añade el listener si el 'menu-item' realmente contiene un '.submenu'
        if (item.querySelector('.submenu')) {
            mainLink.addEventListener('click', function(event) {
                // Si el atributo 'href' del enlace principal es '#' (un placeholder),
                // previene el comportamiento por defecto (que sería un salto de página al principio).
                // Si es un ancla como '#contact-form-section', no lo previene para que navegue.
                if (mainLink.getAttribute('href') === '#') {
                    event.preventDefault();
                }

                // Alterna la clase 'active' en el 'menu-item' actual.
                // Esta clase 'active' es la que el CSS usa para mostrar/ocultar el submenú.
                item.classList.toggle('active');

                // Cierra cualquier otro submenú que esté abierto para que solo uno esté visible a la vez.
                menuItemsWithSubmenus.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active'); // Quita la clase 'active' a los demás
                    }
                });
            });

            // Añade un listener al documento para cerrar el menú si el usuario hace clic fuera de él.
            document.addEventListener('click', function(event) {
                // 'item.contains(event.target)' verifica si el clic ocurrió dentro del 'menu-item' o su submenú.
                // Si el clic fue FUERA del 'item' y el 'item' está actualmente activo (abierto), ciérralo.
                if (!item.contains(event.target) && item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });
        }
    });

    // --- Lógica para el Formulario de Contacto ---

    // Obtiene una referencia al formulario de contacto completo
    const contactForm = document.getElementById('contactForm');

    // Asegura que el formulario exista en la página antes de intentar añadirle listeners o manipularlo.
    if (contactForm) {
        // Referencias a los campos de entrada y a los spans de error
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');
        const formSuccessMessage = document.getElementById('formSuccessMessage');

        /**
         * Función genérica para validar un campo de entrada.
         * Muestra un mensaje de error y aplica/remueve clases CSS para feedback visual.
         * @param {HTMLElement} inputElement - El elemento input o textarea a validar.
         * @param {HTMLElement} errorElement - El span donde se mostrará el mensaje de error.
         * @returns {boolean} - true si el campo es válido, false en caso contrario.
         */
        function validateField(inputElement, errorElement) {
            let isValid = true;
            // Busca el elemento padre con la clase 'form-group' para aplicar estilos de validación
            const formGroup = inputElement.closest('.form-group');

            // 1. Validación de campo vacío (obligatorio)
            if (inputElement.value.trim() === '') {
                errorElement.textContent = 'Este campo es obligatorio.';
                formGroup.classList.remove('valid'); // Remueve la clase 'valid' si existe
                formGroup.classList.add('invalid');  // Añade la clase 'invalid' (borde rojo)
                isValid = false;
            } else {
                errorElement.textContent = ''; // Limpia el mensaje de error si el campo no está vacío
                formGroup.classList.remove('invalid'); // Remueve la clase 'invalid'
                formGroup.classList.add('valid');      // Añade la clase 'valid' (borde verde)
            }

            // 2. Validación específica para el formato del correo electrónico
            // Solo se ejecuta si el campo es de tipo 'email' y no está ya inválido por estar vacío.
            if (isValid && inputElement.type === 'email') {
                // Expresión regular para validar un formato de correo electrónico básico
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(inputElement.value.trim())) {
                    errorElement.textContent = 'Por favor, introduce un correo electrónico válido.';
                    formGroup.classList.remove('valid');
                    formGroup.classList.add('invalid');
                    isValid = false;
                }
            }
            return isValid; // Devuelve el estado final de validez del campo
        }

        // Añadir listeners para validación "en vivo" (cuando el usuario sale de un campo)
        // Esto proporciona feedback instantáneo al usuario.
        nameInput.addEventListener('blur', () => validateField(nameInput, nameError));
        emailInput.addEventListener('blur', () => validateField(emailInput, emailError));
        messageInput.addEventListener('blur', () => validateField(messageInput, messageError));

        // Puedes descomentar las siguientes líneas si quieres validar mientras el usuario escribe (más interactivo, pero puede ser molesto para algunos)
        // nameInput.addEventListener('input', () => validateField(nameInput, nameError));
        // emailInput.addEventListener('input', () => validateField(emailInput, emailError));
        // messageInput.addEventListener('input', () => validateField(messageInput, messageError));


        // Listener para el evento 'submit' del formulario
        contactForm.addEventListener('submit', function(event) {
            // Oculta cualquier mensaje de éxito anterior y limpia su contenido
            formSuccessMessage.style.display = 'none';
            formSuccessMessage.textContent = '';

            // Llama a la función de validación para cada campo del formulario.
            // Es importante llamar a todas las validaciones para que todos los errores se muestren,
            // incluso si el primer campo ya es inválido.
            const isNameValid = validateField(nameInput, nameError);
            const isEmailValid = validateField(emailInput, emailError);
            const isMessageValid = validateField(messageInput, messageError);

            // Si ALGUN campo NO es válido, previene el envío del formulario.
            if (!isNameValid || !isEmailValid || !isMessageValid) {
                event.preventDefault(); // Detiene el envío del formulario al 'action' (process_form.php)
                // Opcional: Puedes mostrar un mensaje de alerta general aquí si lo deseas
                // alert('Por favor, corrige los errores en el formulario antes de enviar.');
            } else {
                // Si todos los campos son válidos:
                // PREVENIMOS el envío real del formulario en este ejercicio.
                // Esto es porque no estamos implementando un backend PHP completo
                // para procesar y guardar los datos del formulario.
                // En una aplicación real, DEBERÍAS ELIMINAR la siguiente línea
                // para que el formulario se envíe realmente a 'process_form.php'.
                event.preventDefault();

                // Simula un envío exitoso:
                formSuccessMessage.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.';
                formSuccessMessage.style.display = 'block'; // Muestra el mensaje de éxito

                // Limpia los campos del formulario después del "envío" simulado
                contactForm.reset();
                // Remueve las clases 'valid' de los campos para que vuelvan a su estado normal/inicial
                nameInput.closest('.form-group').classList.remove('valid');
                emailInput.closest('.form-group').classList.remove('valid');
                messageInput.closest('.form-group').classList.remove('valid');

                // Desplaza la vista del usuario al mensaje de éxito para asegurar que lo vea
                formSuccessMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
});