<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

if($_POST["sendTo"] && $_POST["message"]) {
mail($_POST["sendTo"], "IBA Tech Academy", $_POST["message"]);
$response = ["status" => "Success", "text" => "send!"];
echo json_encode($response);
}
?>