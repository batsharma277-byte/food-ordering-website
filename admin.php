<?php
include "db.php";

$result = $conn->query("SELECT * FROM users");
if (!$result) {
    die("Query failed: " . $conn->error);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Panel</title>
</head>
<body>

<h2>All Users</h2>

<table border="1" cellpadding="10">
<tr>
    <th>ID</th>
    <th>Name</th>
    <th>Phone</th>
    <th>Date</th>
</tr>

<?php
while($row = $result->fetch_assoc()) {
    echo "<tr>
        <td>".$row['id']."</td>
        <td>".$row['name']."</td>
        <td>".$row['phone']."</td>
        <td>".$row['created_at']."</td>
    </tr>";
}
?>

</table>

</body>
</html>