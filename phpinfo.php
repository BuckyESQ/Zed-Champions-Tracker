<?php
// Simple PHP test file - place in server root
// This file helps determine if your PHP is working properly

// Basic PHP Info
$php_version = phpversion();
$php_modules = get_loaded_extensions();
$server_info = $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown';
$curl_enabled = in_array('curl', $php_modules);
$json_enabled = in_array('json', $php_modules);

?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Environment Test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
        }
        h1 {
            color: #0984e3;
        }
        .test {
            margin-bottom: 20px;
            padding: 15px;
            border-radius: 5px;
        }
        .success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .warning {
            background-color: #fff3cd;
            color: #856404;
            border: 1px solid #ffeeba;
        }
        .danger {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        code {
            background-color: #f8f9fa;
            padding: 3px 5px;
            border-radius: 3px;
        }
        .modules {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
        }
        .module {
            background-color: #e9ecef;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 0.85rem;
        }
    </style>
</head>
<body>
    <h1>PHP Environment Test for ZED Champions API</h1>
    
    <div class="test <?php echo $php_version ? 'success' : 'danger'; ?>">
        <h2>PHP Status</h2>
        <?php if ($php_version): ?>
            <p>✅ <strong>PHP is working!</strong> Version: <?php echo $php_version; ?></p>
        <?php else: ?>
            <p>❌ <strong>PHP is not working!</strong> Please check your hosting configuration.</p>
        <?php endif; ?>
        <p>Server: <?php echo htmlspecialchars($server_info); ?></p>
    </div>
    
    <div class="test <?php echo $curl_enabled ? 'success' : 'danger'; ?>">
        <h2>cURL Support</h2>
        <?php if ($curl_enabled): ?>
            <p>✅ <strong>cURL is enabled!</strong> API proxy will work correctly.</p>
        <?php else: ?>
            <p>❌ <strong>cURL is not enabled!</strong> API proxy will not work without cURL.</p>
            <p>Please contact your hosting provider to enable the PHP cURL extension.</p>
        <?php endif; ?>
    </div>
    
    <div class="test <?php echo $json_enabled ? 'success' : 'danger'; ?>">
        <h2>JSON Support</h2>
        <?php if ($json_enabled): ?>
            <p>✅ <strong>JSON is enabled!</strong> API responses can be processed correctly.</p>
        <?php else: ?>
            <p>❌ <strong>JSON is not enabled!</strong> API responses cannot be processed.</p>
            <p>Please contact your hosting provider to enable the PHP JSON extension.</p>
        <?php endif; ?>
    </div>
    
    <div class="test <?php echo is_writable('.') ? 'success' : 'warning'; ?>">
        <h2>File Permissions</h2>
        <?php if (is_writable('.')): ?>
            <p>✅ <strong>Directory is writable!</strong> File operations will work.</p>
        <?php else: ?>
            <p>⚠️ <strong>Directory is not writable.</strong> This may affect some functionality.</p>
        <?php endif; ?>
    </div>
    
    <div class="test success">
        <h2>API Proxy Test</h2>
        <p>If PHP is working, you should be able to use the API proxy:</p>
        <p><code>api_proxy.php</code> - Simple PHP proxy for ZedSight API</p>
        <p>Test it here: <a href="simple-test.html">API Test Tool</a></p>
    </div>
    
    <div class="test">
        <h2>Loaded PHP Modules</h2>
        <div class="modules">
            <?php foreach($php_modules as $module): ?>
                <div class="module"><?php echo htmlspecialchars($module); ?></div>
            <?php endforeach; ?>
        </div>
    </div>
</body>
</html>
