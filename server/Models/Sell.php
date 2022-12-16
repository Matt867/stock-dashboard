<?php
$sql = "CREATE TABLE Sell (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
ISIN VARCHAR(12) NOT NULL,
Quantity INT(255) NOT NULL,
Ticker VARCHAR(5) NOT NULL,
CONSTRAINT FK_UserOrder FOREIGN KEY (userId) REFERENCES Users(id),
reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
  echo "Table Sell created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}

//for id: we can put anything another size if you prefer, I chose 6 randomly for all ids
//for quantity: The size parameter specifies the maximum display width (which is 255)

$conn->close();
?>