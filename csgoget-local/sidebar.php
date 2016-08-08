<aside class="sidebar-left" role="complementary">
    <!-- navigation  -->
    <nav class="navigation">
        <div class="title">Меню Сайта</div>
        <ul class="navigation-list">
            <li>
                <a href="/">
                    <div class="image">
                        <span class="icon-sensor"></span>
                    </div>
                    <div class="text">Играть</div>
                </a>
            </li>
            <li>
                <a href="/about.php">
                    <div class="image">
                        <span class="icon-dialogue"></span>
                    </div>
                    <div class="text">О сайте</div>
                </a>
            </li>
            <li><a href="/top.php">
                <div class="image">
                    <span class="icon-star"></span>
                </div>
                 <div class="text">Топ игроков</div>
            </a></li>
            <li><a href="/history.php">
                <div class="image">
                    <span class="icon-book"></span>
                </div>
                <div class="text">История Игр</div>
            </a></li>
            <!--<li><a href="/fair.php">
                <div class="image">
                    <span class="icon-star"></span>
                </div>
                <div class="text">Честная игра</div>
            </a></li>-->
           <?php if (isset($_SESSION['steamid'])) {
                $exit_class = '';
            } else {
                $exit_class = 'hidden';
            }
            ?>
            <li><a href="settings-page.php" class=" <?php echo $exit_class; ?>">
                <div class="image">
                    <span class="icon-tools"></span>
                </div>
                <div class="text">Мои Настройки</div>
            </a></li>
            <li>
                <a href="steamauth/logout.php" class="action-logout <?php echo $exit_class; ?>">
                    <div class="image">
                        <span class="icon-off"></span>
                    </div>
                    <div class="text">Выйти</div>
                </a>
            </li>
        </ul>
    </nav>
    <!-- navigation end -->
	<!--<div class="side-last-winner">
  <div class="chat-scroll"></div>
  <div class="chat-title">
    Мини чат
    <div class="chat-o">
      Онлайн:
      <span class="online-num" id="inf1">0</span>
    </div>
  </div>
  <div id="mcaht" class="left-chat"></div>
  <script>
load_messes();
setInterval(load_messes,2000);
</script>
  <?php if(isset($_SESSION['steamid'])) {
      echo ' <input type="text" id="text-massage" class="chat-inpunt">
  <div class="chat-btn" id="send_massage">Отправить сообщение</div>
  <div class="sml-bnt" id="smile"></div>
  ';
  }
  else {
    echo '
  <a href="logger.php?login">
    <div class="chat-btn cht-au">Войти</div>
  </a>
  ';
  }
  ?>
</div>-->
<div class="clr"></div>
<div class="boxs"></div>
    <div class="side-banner">
        <a href="http://steamcommunity.com/id/user/edit" target="_blank"><img src="/img/banner_prize.png"></a>
        <p class="bonus_ru" style="display: block;">Добавь в свой ник <a href="http://steamcommunity.com/id/user/edit" target="_blank">Steam</a> <span class="side-bonus-name">CSGOGET.RU</span> и получи <span class="side-bonus-game-price">бонус</span> к выигрышу 5%</p>
        <p class="bonus_en" style="display: none;">Add <span class="side-bonus-name">CSGOMAD.RU</span> to your <a href="http://steamcommunity.com/id/user/edit" target="_blank">Steam</a> nickname and get <img class="percent" src="/img/5percent.png"> <span class="side-bonus-game-price">bonus</span> to your win amount</p>
    </div>                 <div class="side-last-winner">
        <div class="title">Последний победитель:</div>
        <div class="player-image" id="winner-avatar">
            <img src="http://i.imgur.com/wdwQ4T3.png" alt="">
        </div>
        <div class="name" id="winner-name">Не выбран</div>
    </div>
    <div class="side-last-winner-bottom">
        <div class="captions">
            Выигрыш:<br>
            Шанс:
        </div>
        <div class="numbers">
            <div class="sum"> <span id="winner-money">?</span></div>
			<div class="chance"><span id="winner-chance">0</span></div>
        </div>
    </div>
   
       
      <!-- side-online end -->
<!-- side-support -->
    <div class="side-support">
        <a href="https://vk.com/csgogetpublic" target="_blank">Техническая поддержка</a>
    </div>
    <div class="chat-o">
      Онлайн:
      <span class="online-num" id="inf1">0</span>
    </div>
    <!-- side-support end -->

<div class="opskins">
        Цены предоставлены
        <img src="/img/steamanalyst.png" alt="steamanalyst"/>
    </div>
</aside>