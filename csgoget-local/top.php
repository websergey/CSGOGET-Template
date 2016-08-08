<?php include('head.php'); ?>
<body id="top-page">
 
<div class="wrapper">
<?php include('header.php'); ?>
<div class="content" role="main">
<div class="container">
<div class="content-box shown">
<div class="content-main">
<div class="content-main-inner">
<div class="best best-all">
        <div class="best-top">
            <div class="best-title">ТОП игроков</div>
        </div>
        <div class="ladder">
    <div class="infos">
        <div class="infos-columns">
            <div class="column-25">
                <div class="column-inner">
                    <div class="infos-item">
                        <div class="infos-item-value" id="count-top">0</div>
                        <div class="infos-item-title">Игроков в рейтинге</div>
                    </div>
                </div>
            </div>
            <div class="column-25">
                <div class="column-inner">
                    <div class="infos-item">
                        <div class="infos-item-value">~<span id="inf10">0 руб.</span></div>
                        <div class="infos-item-title">Максимальный выигрыш сегодня</div>
                    </div>
                </div>
            </div>
            <div class="column-25">
                <div class="column-inner">
                    <div class="infos-item">
                        <div class="infos-item-value" id="inf7">0</div>
                        <div class="infos-item-title">Сегодня игр</div>
                    </div>
                </div>
            </div>
            <div class="column-25">
                <div class="column-inner">
                    <div class="infos-item">
                        <div class="infos-item-value" id="inf3">0</div>
                        <div class="infos-item-title">Сегодня уникальных игроков</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="best-content">
        <div class="def-table best-table">
            <table>
                <thead>
                <tr>
                    <th class="col-place"><span>Место</span></th>
                    <th class="col-image"></th>
                    <th class="col-rank">Звание</th>
                    <th class="col-nick">Ник в Steam</th>
                    <th class="col-wincount">Количество побед</th>
                    <th class="col-prize">Выиграл (Руб)</th>
                </tr>
                </thead>
                <tbody id="top-tbody">
                </tbody>
            </table>
            <div class="best-all-bg-left" style="height: 186px;"></div>
            <div class="best-all-bg-right" style="height: 186px;"></div>
        </div>
    </div>
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
    <p class="steampowered"></span><font color="#FFFFFF">All rights reserved CSGOGET.RU</p>
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
