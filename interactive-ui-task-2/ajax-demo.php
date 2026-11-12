<?php
// Optional AJAX example for a local PHP server. This demo checks a sample list only.
// It does NOT connect to a database or store user information.
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Use POST for this endpoint.']);
    exit;
}

$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
if (!$email) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'A valid email is required.']);
    exit;
}

// Replace this sample list with a prepared SQL query when connecting MySQL.
$sampleEmails = ['demo@example.com', 'hello@nova.test'];
$exists = in_array(strtolower($email), $sampleEmails, true);

echo json_encode([
    'success' => true,
    'exists' => $exists,
    'message' => $exists ? 'This email is already registered (demo data).' : 'Email is available (demo data).'
]);
?>
