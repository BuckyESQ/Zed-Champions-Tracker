<?php
// Ultra Simple API Proxy for ZED Champions
// THIS FILE SHOULD BE PLACED DIRECTLY IN YOUR ROOT DIRECTORY (same level as index.html)
// No special server configuration needed!

// Show PHP errors during testing (remove in production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Test if this file is directly accessible
if (!isset($_GET['endpoint'])) {
    echo "<h1>ZedSight API Proxy</h1>";
    echo "<p>This file is working correctly! It should be accessed via JavaScript fetch calls.</p>";
    echo "<p>Example usage: <code>fetch('/api_proxy.php?endpoint=search-horse&name=test')</code></p>";
    exit();
}

// Enable CORS for all domains
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get the endpoint and parameters from the query string
$endpoint = $_GET['endpoint'];
$apiBase = 'https://pqchju22ku.us-east-1.awsapprunner.com/api/';

// Construct the full API URL
$apiUrl = $apiBase . $endpoint;

// Add all other parameters to the API URL
$queryParams = [];
foreach ($_GET as $key => $value) {
    if ($key !== 'endpoint') {
        $queryParams[] = urlencode($key) . '=' . urlencode($value);
    }
}

if (!empty($queryParams)) {
    $apiUrl .= '?' . implode('&', $queryParams);
}

// Set up the request
$headers = [];
foreach (getallheaders() as $name => $value) {
    if (strtolower($name) !== 'host') {
        $headers[] = "$name: $value";
    }
}

// Initialize cURL
$ch = curl_init($apiUrl);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $_SERVER['REQUEST_METHOD']);

// Forward POST/PUT body if any
if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
    $postData = file_get_contents('php://input');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
}

// Execute the request
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

// Close cURL
curl_close($ch);

// Set the appropriate HTTP response code
http_response_code($httpCode);

// Set the content type if available
if (!empty($contentType)) {
    header("Content-Type: $contentType");
}

// Output the response
echo $response;
