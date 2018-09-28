<?php


function Connect()
{
 $dbhost = "10.169.0.171";
 $dbuser = "tasksjol_dbadmin";
 $dbpass = 'p"bE<aV8Tb>}sZqd';
 $dbname = "tasksjol_master";

 // Create connection
 $conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname) or die($conn->connect_error);

 return $conn;
}

?>