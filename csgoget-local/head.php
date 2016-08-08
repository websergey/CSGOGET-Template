<? require('steamauth/steamauth.php'); 


	if(isset($_SESSION["steamid"])) {
include_once('steamauth/userInfo.php');}
?>
<html ng-app="app">
<head>
	<meta charset="utf-8">
	<link rel="icon" type="image/png" href="/img/favicon.png"/>
	<title>CSGOGET.RU</title>
	<meta name="keywords" content="">
	<meta name="description" content="">
	<!--[if IE]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
	<meta name="viewport" content="width=1180">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<link href="css/widgets.css" rel="stylesheet" media="screen">
	<link href="css/all.css?v=14" rel="stylesheet" media="screen">
	<link rel="stylesheet" href="css/Lobibox.min.css">
	<!--[if gte IE 9]><link rel="stylesheet" href="/css/ie9.css" media="screen, projection"><![endif]-->
	<!--[if lte IE 8]><link rel="stylesheet" href="/css/ie8.css" media="screen, projection"><![endif]-->
	<!--[if lte IE 7]><link rel="stylesheet" href="/css/ie7.css" media="screen, projection"><![endif]-->
	<script src="/js/libs/jquery-2.1.3.min.js"></script>
	<script src="/js/libs/jquery-ui.min.js"></script>
	<script src="/js/jquery.noty.packaged.min.js"></script>
	<script src="js/jquery.cookie.js"></script>
	<script src="js/conf.js"></script>
	<script src="/script.js"></script>
	<script src="js/trade.js"></script>
	<script src="https://cdn.socket.io/socket.io-1.3.5.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="//ajax.aspnetcdn.com/ajax/jquery.ui/1.10.3/jquery-ui.min.js"></script>
	<script src="js/popup.js"></script>
	<script src="js/lobibox.js"></script>

	<script src="js/chat.js"></script>
	<script>
	function load_messes()
		{
			$.ajax({
					type: "POST",
					url:  "chatread.php",
					data: "req=ok",
					success: function(test)
					{
						$("#mcaht").empty();
						$("#mcaht").append(test);
						$("#mcaht").scrollTop(8000);
					}
			});
		}
	</script>	
	<script type="text/javascript">
		$( document ).ready(function() {
			var message="Пока ты смотришь консоль, мы уже исправили баги!";
			function click(e) {
				if (document.all) {
					if (event.button == 2) {
						alert(message);
						return false;}
				}
				if (document.layers) {
					if (e.which == 3) {
						alert(message);
						return false;}
				}
			}
			if (document.layers)
			{document.captureEvents(Event.MOUSEDOWN);}
			document.onmousedown=click;
			document.oncontextmenu=function(e){return false};
		    console.log( message);
	});
	</script>
</head>