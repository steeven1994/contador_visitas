<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Sitio Web Completo</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header>
        <h1>Mi Sitio Web Dinámico</h1>
        <nav class="main-nav">
            <ul class="menu">
                <?php
                // --- Bloque PHP para generar el Menú Desplegable ---
                // Simulación de datos del menú. En un caso real, esto podría venir de una base de datos.
                $menuItems = [
                    [
                        'text' => 'Inicio',
                        'link' => '#top', // Enlace al inicio de la página
                        'subItems' => []
                    ],
                    [
                        'text' => 'Productos',
                        'link' => '#',
                        'subItems' => [
                            ['text' => 'Electrónica', 'link' => '#'],
                            ['text' => 'Ropa', 'link' => '#'],
                            ['text' => 'Hogar', 'link' => '#']
                        ]
                    ],
                    [
                        'text' => 'Servicios',
                        'link' => '#',
                        'subItems' => [
                            ['text' => 'Consultoría', 'link' => '#'],
                            ['text' => 'Desarrollo Web', 'link' => '#'],
                            ['text' => 'Marketing Digital', 'link' => '#']
                        ]
                    ],
                    [
                        'text' => 'Contacto',
                        'link' => '#contact-form-section', // Enlace a la sección del formulario
                        'subItems' => []
                    ]
                ];

                // Recorre los elementos principales del menú
                foreach ($menuItems as $item) {
                    echo '<li class="menu-item">';
                    echo '<a href="' . $item['link'] . '">' . $item['text'] . '</a>';
                    // Si el elemento tiene sub-elementos, genera un submenú
                    if (!empty($item['subItems'])) {
                        echo '<ul class="submenu">';
                        foreach ($item['subItems'] as $subItem) {
                            echo '<li><a href="' . $subItem['link'] . '">' . $subItem['text'] . '</a></li>';
                        }
                        echo '</ul>';
                    }
                    echo '</li>';
                }
                ?>
            </ul>
        </nav>
    </header>

    <main id="top">
        <section class="hero-section">
            <h2>Bienvenido a Nuestro Sitio</h2>
            <p>Explora nuestras secciones y ponte en contacto con nosotros.</p>
        </section>

        <section class="visits-section">
            <h3>Visitas a la Página</h3>
            <?php
            // --- Bloque PHP para el Contador de Visitas ---
            // Nombre del archivo donde se almacenará el número de visitas
            // Asegúrate de que 'visits.txt' exista en la misma carpeta que 'index.php'
            $archivo_contador = 'visits.txt';
            $current_visits = 0; // Inicializamos el contador para esta solicitud

            // 1. Intentar leer el contador actual del archivo
            if (file_exists($archivo_contador)) {
                $contenido = file_get_contents($archivo_contador);
                // Convertir el contenido (string) a entero
                $current_visits = (int)$contenido;
            } else {
                // Si el archivo no existe, crearlo e inicializarlo en 0
                file_put_contents($archivo_contador, 0);
                $current_visits = 0;
            }

            // 2. Incrementar el contador
            $current_visits++;

            // 3. Guardar el nuevo valor del contador de vuelta en el archivo
            file_put_contents($archivo_contador, $current_visits);

            // 4. Mostrar el contador en la página
            echo '<div class="visits-display">Visitas: <span>' . $current_visits . '</span></div>';
            ?>
            <p class="note">Este número incrementa con cada carga de página.</p>
        </section>

        <section id="contact-form-section" class="contact-form-container">
            <h2>Contáctanos</h2>
            <form id="contactForm" method="POST" action="process_form.php">
                <div class="form-group">
                    <label for="name">Nombre:</label>
                    <input type="text" id="name" name="name" required>
                    <span class="error-message" id="nameError"></span>
                </div>

                <div class="form-group">
                    <label for="email">Correo Electrónico:</label>
                    <input type="email" id="email" name="email" required>
                    <span class="error-message" id="emailError"></span>
                </div>

                <div class="form-group">
                    <label for="message">Mensaje:</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                    <span class="error-message" id="messageError"></span>
                </div>

                <button type="submit">Enviar Mensaje</button>
                <div id="formSuccessMessage" class="success-message"></div>
            </form>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 Mi Sitio Web. Todos los derechos reservados.</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>