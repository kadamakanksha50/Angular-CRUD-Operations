<?php
	header("Access-Control-Allow-Origin:*");
	header("Access-Control-Allow-Methods:POST,GET,OPTIONS");
	header("Access-Control-Allow-Headers:Content-Type");
	header("Content-Type:application/json");
	
	
	$serverName="127.0.0.1:3306";
	$username="root";
	$password="";
	$dbName="crud_app";
	
	$con=new mysqli($serverName, $username, $password, $dbName);
	
	$query="SELECT * FROM student ORDER BY RollNo";
	$result=$con->query($query);
	$rows=[];
	while($row=$result->fetch_assoc()){
		$rows[]=$row;
	}
	echo json_encode(['status'=>true,'students'=>$rows]);
?>