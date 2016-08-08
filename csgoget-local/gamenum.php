<?php 
if (isset($_GET['string'])) {
	$rand = $_GET['string'] / 56.5;
	$nombre_format_francais = number_format($rand, 15, '.', ' ');
	echo $nombre_format_francais;
}
else {
	echo 'Bad rounds!';
}

 ?>