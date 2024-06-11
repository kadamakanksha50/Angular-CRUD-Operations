<?php
	header("Access-Control-Allow-Origin:*");
	header("Access-Control-Allow-Methods:POST,GET,OPTIONS");
	header("Access-Control-Allow-Headers:Content-Type");
	header("Content-Type:application/json");
	
	$data=json_decode(file_get_contents("php://input"),true);
	
	$serverName="127.0.0.1:3306";
	$username="root";
	$password="";
	$dbName="crud_app";
	
	$con=new mysqli($serverName, $username, $password, $dbName);
	
	if(empty($data)){
		echo json_encode(['status'=>false,'message'=>'Invalid parameters']);
	}
	else{
		$rollNo=$data['rollNo'];
		$fullName=$data['fullName'];
		$emailId=$data['emailId'];
		$dob=$data['dob'];
		$mobile=$data['mobile'];
		$gender=$data['gender'];
		$fees=$data['fees'];
		
		$query="INSERT INTO student VALUES($rollNo, '$fullName','$emailId','$dob','$mobile','$gender','$fees');";
		
		$con->query($query);
		$con->close();
		
		echo json_encode(['status'=>true, 'message'=>'Student added successfully !!']);
	}
?>