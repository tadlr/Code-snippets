<?php
/*
* Database integration demos
* By Gustavo Ramirez
*
*/

// Include Redis and WebSocket libraries (Ratchet for WebSocket)
require 'database/vendor/autoload.php';

use Predis\Client as RedisClient;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\App;

// Database configuration
$dsn = 'mysql:host=localhost;dbname=example_db;charset=utf8';
$dbUser = 'root';
$dbPass = 'password';

// Redis configuration
$redis = new RedisClient();

// PDO database connection
try {
    $pdo = new PDO($dsn, $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    die('Database connection failed: ' . $e->getMessage());
}

// 1. Basic CRUD Operations

// Create a new user
function createUser($pdo, $name, $email) {
    $stmt = $pdo->prepare("INSERT INTO users (name, email) VALUES (:name, :email)");
    $stmt->execute(['name' => $name, 'email' => $email]);
    echo "User created successfully.\n";
}

// Read user information
function getUser($pdo, $userId) {
    global $redis;
    $cacheKey = "user:$userId";

    // Check Redis cache first
    $cachedData = $redis->get($cacheKey);
    if ($cachedData) {
        echo "Retrieved from cache: " . $cachedData . "\n";
        return json_decode($cachedData, true);
    }

    // If not in cache, query database
    $stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");
    $stmt->execute(['id' => $userId]);
    $user = $stmt->fetch();

    if ($user) {
        // Store in Redis cache
        $redis->setex($cacheKey, 3600, json_encode($user));
    }

    return $user;
}

// Update a user's information
function updateUser($pdo, $userId, $name, $email) {
    $stmt = $pdo->prepare("UPDATE users SET name = :name, email = :email WHERE id = :id");
    $stmt->execute(['id' => $userId, 'name' => $name, 'email' => $email]);
    echo "User updated successfully.\n";
    global $redis;
    $redis->del("user:$userId"); // Invalidate cache
}

// Delete a user
function deleteUser($pdo, $userId) {
    $stmt = $pdo->prepare("DELETE FROM users WHERE id = :id");
    $stmt->execute(['id' => $userId]);
    echo "User deleted successfully.\n";
    global $redis;
    $redis->del("user:$userId"); // Invalidate cache
}

// 2. Data Aggregation Example
function getUserCountByDomain($pdo) {
    $stmt = $pdo->query("SELECT SUBSTRING_INDEX(email, '@', -1) AS domain, COUNT(*) AS count FROM users GROUP BY domain");
    $results = $stmt->fetchAll();
    echo "User Count by Email Domain:\n";
    foreach ($results as $row) {
        echo "{$row['domain']}: {$row['count']}\n";
    }
}

// 3. Real-Time Notifications with WebSocket
class RealTimeNotifier implements MessageComponentInterface {
    protected $clients;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);
        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        foreach ($this->clients as $client) {
            if ($from !== $client) {
                $client->send($msg);
            }
        }
    }

    public function onClose(ConnectionInterface $conn) {
        $this->clients->detach($conn);
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }
}

// Run the WebSocket server
function runWebSocketServer() {
    $app = new App('localhost', 8080);
    $app->route('/notify', new RealTimeNotifier, ['*']);
    $app->run();
}

// Testing the examples
createUser($pdo, 'John Doe', 'john@example.com');
createUser($pdo, 'Jane Smith', 'jane@sample.com');
print_r(getUser($pdo, 1));
updateUser($pdo, 1, 'Johnathan Doe', 'john.doe@example.com');
getUserCountByDomain($pdo);
deleteUser($pdo, 2);

// Uncomment to start WebSocket server
// runWebSocketServer();


?>