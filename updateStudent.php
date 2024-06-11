<?php
	header("Access-Control-Allow-Origin:*");
	header("Access-Control-Allow-Methods:POST,GET,OPTIONS,PUT");
	header("Access-Control-Allow-Headers:Content-Type");
	header("Content-Type:application/json");
	$data=json_decode(file_get_contents("php://input"),true);
	
	$serverName="127.0.0.1:3306";
	$username="root";
	$password="";
	$dbName="crud_app";
	
	$con=new mysqli($serverName, $username, $password, $dbName);
	$rollNo=$data['rollNo'];
	$fullName=$data['fullName'];
	$emailId=$data['emailId'];
	$dob=$data['dob'];
	$mobile=$data['mobile'];
	$gender=$data['gender'];
	$fees=$data['fees'];
	
	$query="UPDATE student SET FullName='$fullName', EmailId='$emailId',DOB='$dob',MobileNo='$mobile',Gender='$gender',Fees=$fees WHERE RollNo=$rollNo";
	$con->query($query);
	$con->close();
	json_encode(['status'=>true,'message'=>'Student updated successfully !!']);
?>