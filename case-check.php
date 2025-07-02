<?php
// Server environment information checker
echo "<h1>StableFields Server Environment Check</h1>";

echo "<h2>Server Information:</h2>";
echo "<ul>";
echo "<li>PHP Version: " . phpversion() . "</li>";
echo "<li>Server Software: " . $_SERVER['SERVER_SOFTWARE'] . "</li>";
echo "<li>Server Name: " . $_SERVER['SERVER_NAME'] . "</li>";
echo "<li>Document Root: " . $_SERVER['DOCUMENT_ROOT'] . "</li>";
echo "</ul>";

echo "<h2>File System Check:</h2>";

// Check for public folder (case sensitive)
$publicLower = is_dir($_SERVER['DOCUMENT_ROOT'] . '/public');
$publicUpper = is_dir($_SERVER['DOCUMENT_ROOT'] . '/Public');

echo "<p>Lowercase 'public' folder exists: " . ($publicLower ? "YES" : "NO") . "</p>";
echo "<p>Uppercase 'Public' folder exists: " . ($publicUpper ? "YES" : "NO") . "</p>";

// Check specific files
$mainFile = $_SERVER['DOCUMENT_ROOT'] . '/public/stablefields-tracker.html';
$mainFileUpper = $_SERVER['DOCUMENT_ROOT'] . '/Public/stablefields-tracker.html';

echo "<p>Main app file exists (lowercase path): " . (file_exists($mainFile) ? "YES" : "NO") . "</p>";
echo "<p>Main app file exists (uppercase path): " . (file_exists($mainFileUpper) ? "YES" : "NO") . "</p>";

// List files in the document root
echo "<h2>Files in Document Root:</h2>";
echo "<ul>";
$files = scandir($_SERVER['DOCUMENT_ROOT']);
foreach ($files as $file) {
    if ($file != "." && $file != "..") {
        echo "<li>$file " . (is_dir($_SERVER['DOCUMENT_ROOT'] . '/' . $file) ? "(directory)" : "(file)") . "</li>";
    }
}
echo "</ul>";

// Try to list files in both possible public folders
echo "<h2>Files in public folder (if it exists):</h2>";
echo "<ul>";
if ($publicLower) {
    $publicFiles = scandir($_SERVER['DOCUMENT_ROOT'] . '/public');
    foreach ($publicFiles as $file) {
        if ($file != "." && $file != "..") {
            echo "<li>$file</li>";
        }
    }
} else {
    echo "<li>Lowercase 'public' folder not found</li>";
}
echo "</ul>";

if ($publicUpper) {
    echo "<h2>Files in Public folder (uppercase):</h2>";
    echo "<ul>";
    $publicFilesUpper = scandir($_SERVER['DOCUMENT_ROOT'] . '/Public');
    foreach ($publicFilesUpper as $file) {
        if ($file != "." && $file != "..") {
            echo "<li>$file</li>";
        }
    }
    echo "</ul>";
}
?>
