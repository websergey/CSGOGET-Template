<?php 
if (isset($_GET['string'])) {
	$rand = $_GET['string'] / 56.5;
	echo md5($rand);
}
if (isset($_GET['num'])) {
	$rands = $_GET['num'] / 156.5;
	echo$rands;
}
 ?>