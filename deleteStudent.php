<?php
	header("Access-Control-Allow-Origin:*");
	header("Access-Control-Allow-Methods:POST, GET, OPTIONS, PUT,DELETE");
	header("Access-Control-Allow-Headers:Content-Type");
	header("Content-Type:application/json");
	$data=json_decode(file_get_contents("php://input"),true);
	
	
	$serverName="127.0.0.1:3306";
	$username="root";
	$password="";
	$dbName="crud_app";
	
	$con=new mysqli($serverName, $username, $password, $dbName);
	$rollNo=$_GET['rollNo'];
	
	
	$query="DELETE FROM student WHERE RollNo='$rollNo'";
	$con->query($query);
	$con->close();
	echo json_encode(['status'=>true, 'message'=>'Student deleted successfully !!']);
?>