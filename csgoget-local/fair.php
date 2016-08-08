<?php include('head.php'); ?>
<body>
 
<div class="wrapper">
<?php include('header.php'); ?>
<div class="content" role="main">
<div class="container">
<div class="content-box shown">
<div class="content-main">
<div class="content-main-inner">
    <div class="about">
        <div class="about-top">
            <div class="about-title">Без обмана!</div>
        </div>
        <div class="about-content">
            <article class="about-article">
             <p>За каждую внесенную 1 копейку вы получаете 1 билет.</p>

                <p>В начале каждого раунда наша система берет абсолютно рандомное длинное число от 0 до 1 (например 0.073185018861535), шифрует его через MD5, и показывает его в зашифрованом виде в начале раунда (<a target="_blank" href="https://ru.wikipedia.org/wiki/MD5">что такое MD5</a>)</p>

                <p>Затем, когда раунд завершился, система показывает то число, которое было шифровано вначале (проверить, что оно совпадает с зашифрованным вы можете <a target="_blank" href="http://www.md5online.org/md5-encrypt.html">тут</a>) и умножает его на банк (в копейках).</p>

                <p>Например, в конце раунда банк составил 5000 рублей (500000 копеек), то нужно будет число 0,07318501886153 умножить на банк 500000 копеек (это цифры, которые мы брали для примера) и получить число 36592,509430765. Округляем его до целого и получаем 36593. То есть в раунде победит человек, у которого билет №36593.</p>

                <p>Следовательно, чем на большую сумму депозит вы внесете — тем больше билетов вы получите, а значит выше шанс получить выигрышный билет.</p>

                <p>Вот и всё. Принцип работы честной игры заключается в том, что мы никак не можем знать какой будет банк в конце игры, а рандомное число для умножения на банк мы даем в самом начале раунда и следовательно даже если бы мы сильно этого захотели, то никак бы не смогли сделать подставного победителя.</p>
                <p align="center">ПРОВЕРИТЬ</p>
                <input class="fair" type="text" name="hashround" id="hashround" placeholder="Хэш раунда">
                 <input class="fair" type="text" name="numround" id="numround" placeholder="Число раунда">
                 <input class="fair" type="text" name="numtickets" id="numtickets" placeholder="Количество билетов в раунде">
                 <input class="fair fair-btn" type="button" value="Проверить">

            </article>
        </div>
    </div>
    <!-- promo end -->

    <!-- promo no token -->
    <div class="token-block promo hidden">
        <!-- jackpot -->
        <div class="jackpot">
            <!-- form-get-link -->
            <div class="form-get-link">
                <h4>Внимание! Необходимо ввести ссылку на обмен. <a class="trade-link" href="http://steamcommunity.com/id/id/tradeoffers/privacy#trade_offer_access_url" target="_blank">( Где взять ссылку? )</a></h4>
                <div class="form-line">
                    <div class="wrap-input"><input type="text" name="link" placeholder="Например: https://steamcommunity.com/tradeoffer/new/?partner=226107091&amp;token=pWn1337k"></div>
                </div>
                <div class="buttons">
                    <div class="btn-yellow save-link">Запомнить ссылку</div>
                    <p>Обязательно <a href="http://steamcommunity.com/id/id/edit/settings" target="_blank" class="openinv-link">откройте инвентарь</a> в Steam для получения приза! </p>
                </div>
            </div>
            <!-- form-get-link end -->
        </div>
        <!-- jackpot end -->
    </div>
    <!-- promo end -->

    <div class="game">
    <p class="steampowered"></span><font color="#FFFFFF">Powered by Steam, a registered trademark of Valve Corporation.</p>
</div>
</div>
</div>
<?php include('sidebar.php'); ?>
</div>
</div>
</div>
</div>

</body>
</html>