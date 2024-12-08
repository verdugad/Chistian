<?php
session_start(); // Inicia la sesión.
header('Content-Type: application/json'); // Define que la respuesta será en formato JSON.

$validCredentials = [
    'username' => 'Daniel', // Usuario válido.
    'password' => password_hash('123', PASSWORD_DEFAULT), // Contraseña válida (encriptada).
];

// Leemos los datos enviados desde el cliente.
$data = json_decode(file_get_contents('php://input'), true);

// Si no se reciben datos válidos, retornamos un error.
if (!$data || !isset($data['username'], $data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
    exit;
}

// Verificamos si las credenciales coinciden.
if (password_verify($data['password'], $validCredentials['password']) && 
    $data['username'] === $validCredentials['username']) {
    $_SESSION['admin'] = true; // Establecemos la sesión.
    echo json_encode(['success' => true]); // Respuesta exitosa.
} else {
    echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas']); // Credenciales inválidas.
}
?>
