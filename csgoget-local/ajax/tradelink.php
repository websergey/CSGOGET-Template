<?php 
session_start();
include ('../steamauth/userInfo.php');
if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
if(!isset($_SESSION['steamid'])) {
exit();
}
$userLink = $_POST['link'];
$userLink = addslashes($_POST['link']);
$m = new MongoClient();
$db = $m->selectDB('admin');
$collection = new MongoCollection($db, 'users');

// search for fruits
$fruitQuery = array('steamid' => $steamprofile['steamid']);

$cursor = $collection->find($fruitQuery);
foreach ($cursor as $doc) {
     $tradeLink = $doc['tradelink'];
}

if($tradeLink == '') {
	echo 'Запись не найдена!';
	$person = array("steamid" => $steamprofile['steamid'], "tradelink" => "".$userLink."" , "type" => 'trade-link');
	$collection->insert($person);
}
else {
	echo 'Запись найдена!';
	$obj = $collection->findOne();

	$update = array('tradelink' => "".$userLink."");

	$collection->update(
    array( 'steamid' => $steamprofile['steamid'] ),
  	array( '$set' => $update )
);
}
}
 ?>