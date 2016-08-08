<audio id="new-item-sound" src="/sounds/new-item.mp3" preload="auto"></audio> 
<audio id="start-game-sound" src="/sounds/start-game.mp3" preload="auto"></audio>
<audio id="start-roule-sound" src="/sounds/cykcyk.wav" preload="auto"></audio>

<header class="header" role="banner">
<div class="result success" id="success"></div>
<div class="result error" id="error"></div>
<div hidden id="steamid"><?php echo $steamprofile['steamid'];?></div>
<div hidden id="steamtoken"><?php
function generateRandomString($length = 10) {
$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
$charactersLength = strlen($characters);
$randomString = '';
for ($i = 0; $i < $length; $i++) {
$randomString .= $characters[rand(0, $charactersLength - 1)];
}
return $randomString;
}
$rstr = generateRandomString(32);
$m = new MongoClient("mongodb://127.0.0.1:27017");
$db = $m->admin;
$collection = $db->authdb;
$document12 = array( "userid" => $_SESSION['steamid'] );
$collection->remove($document12);
$document = array( "userid" => $_SESSION['steamid'], "token" => $rstr );
$collection->save($document);
echo $rstr;
?></div>
	<div class="container">
		<div class="header-left">
			<div class="logo-holder">
			    <h1 class="logo"><img src="img/logo.png" alt="image"></h1>
			    <span class="site-desc">***</span>
			</div>
		</div>
		<div class="header-right">

			<div class="login">
			    <?php
					if(!isset($_SESSION['steamid'])) { 
						?>
						<ul class="login-list steamlogin">
					        <!-- <li><a href="http://backend-4. CSGOGET.RU/auth" class="action-login"></a></li> -->
		                    <li><a href="logger.php?login" class="action-login login-link"></a></li>
					    </ul>
					 <?php } else { 

						include ('steamauth/userInfo.php');
						?>

						

						<div class="profile" style="display:none;">

							<?php echo "<img src=\"".$steamprofile['avatarfull']."\" class=\"avatar\">";

							echo "<div class=\"nickname\">". $steamprofile['personaname'] ."</div>";

							echo "<div class=\"logout\"><a href=\"steamauth/logout.php\">Выйти</a></div>";?>

							<div class="getlink"><a target="_blank" href="http://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url">Получить ссылку на обмен</a></div>

						</div>

						

						<div hidden id="steamid"><?php echo $steamprofile['steamid'];?></div>

						

						<?php 

					}?>

			</div>

		</div>
	</div>
</header>
			
