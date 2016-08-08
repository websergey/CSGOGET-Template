<div class="side-last-winner">
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
setInterval(load_messes,5000);
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
</div>
<div class="clr"></div>
<div class="boxs"></div>