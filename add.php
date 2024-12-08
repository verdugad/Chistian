<?php
session_start();
if (!isset($_SESSION['admin'])) {
    die(json_encode(['success' => false, 'message' => 'Unauthorized']));
}

$targetDir = "../../img/products/";
$response = ['success' => false];

try {
    // Handle file upload
    if (isset($_FILES["imagen"])) {
        $fileName = basename($_FILES["imagen"]["name"]);
        $targetPath = $targetDir . $fileName;
        
        if (move_uploaded_file($_FILES["imagen"]["tmp_name"], $targetPath)) {
            // Save product data to database
            $product = [
                'nombre' => $_POST['nombre'],
                'descripcion' => $_POST['descripcion'],
                'precio' => $_POST['precio'],
                'categoria' => $_POST['categoria'],
                'imagen' => 'img/products/' . $fileName
            ];
            
            // Here you would save to your database
            // For now, we'll just return success
            $response = ['success' => true];
        }
    }
} catch (Exception $e) {
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
?>
