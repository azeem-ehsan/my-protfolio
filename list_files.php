<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$folder = isset($_GET['folder']) ? $_GET['folder'] : '';
$directory = __DIR__ . '/' . $folder;  // Use __DIR__ to get the current directory

if (!is_dir($directory)) {
    echo json_encode(['error' => 'Invalid directory', 'path' => $directory]);
    exit;
}

$files = array_diff(scandir($directory), array('.', '..'));
$files = array_values($files); // Reindex array
echo json_encode($files);
?>
