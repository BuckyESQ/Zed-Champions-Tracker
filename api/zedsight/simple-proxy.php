<?php
// Simple ZedSight API Proxy that doesn't require .htaccess or URL rewriting
// For use on basic PHP hosting environments

// Allow from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get the endpoint from the query parameter
$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : '';

if (empty($endpoint)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing endpoint parameter']);
    exit();
}

// ZedSight base URL
$apiBaseUrl = 'https://pqchju22ku.us-east-1.awsapprunner.com/api/';
$apiUrl = $apiBaseUrl . $endpoint;

// Forward query parameters except 'endpoint'
$query = [];
foreach ($_GET as $key => $value) {
    if ($key !== 'endpoint') {
        $query[] = urlencode($key) . '=' . urlencode($value);
    }
}

if (!empty($query)) {
    $apiUrl .= '?' . implode('&', $query);
}

// Forward the request with all headers
$headers = [];
foreach (getallheaders() as $name => $value) {
    if (strtolower($name) !== 'host') {
        $headers[] = "$name: $value";
    }
}

// Initialize cURL session
$ch = curl_init($apiUrl);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

// Forward the request method
$method = $_SERVER['REQUEST_METHOD'];
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);

// Forward POST/PUT body if any
if ($method === 'POST' || $method === 'PUT') {
    $postData = file_get_contents('php://input');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
}

// Execute cURL request
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Close cURL session
curl_close($ch);

// Forward the response status code
http_response_code($httpCode);

// Output the response
echo $response;
?>
