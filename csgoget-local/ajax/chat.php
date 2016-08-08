<?php 
session_start();
include ('../steamauth/userInfo.php');
if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $today = date("H:i:s | d.m.Y");
if ($_POST['massage'] == '') {
    die('Ошибка! Сообщение не может быть пустым!');
}
if (strlen($_POST['massage']) < 4) {
    die('Ошибка! Сильно короткое сообщение, мин. 3 символа');
}
if (strlen($_POST['massage']) > 100) {
    die('Ошибка! Сильно длинное сообщение, макс. 50 символов!');
}
if(!isset($_SESSION['steamid'])) {
echo 'Ошибка! Только авторизованные пользователи могут писать в чат!';
}
else {
    $massage = $_POST['massage'];
    $massage = str_replace('>', '*', $massage);
    $massage = str_replace('<', '*', $massage);
    $massage = str_replace('/', '*', $massage);
    $massage = str_replace('iframe', '*', $massage);
    $massage = str_replace('script', '*', $massage);
    $massage = str_replace('CSGO', '****', $massage);
    $massage = str_replace('csgo', '****', $massage);
    $massage = str_replace('http:', '****', $massage);
    $massage = str_replace('www', '****', $massage);
    $massage = str_replace('https:', '****', $massage);
    $massage = str_replace('src', '****', $massage);
    $massage = str_replace('&#60;', '****', $massage);
    $massage = str_replace('&#62;', '****', $massage);
    $massage = str_replace('uitems', '****', $massage);

$file = 'chat.txt';
if ($steamprofile['steamid'] == '') {
    $massage = '<font color="#D2303D"><i>'.$massage.'</i></font>';
}

// Новый человек, которого нужно добавить в файл
$person = '<div class="chat-msg">
            <div class="caht-ava"><img src="'.$steamprofile['avatarmedium'].'" width="30px"></div>
            <div class="caht-name"><a href="'.$steamprofile['profileurl'].'" target="_blank">'.$steamprofile['personaname'].'</a></div>
            <div class="caht-dateid">'.$today.'</div>
            <div class="msg-text">'.$massage.'</div>
        </div>';
// Пишем содержимое в файл,
// используя флаг FILE_APPEND flag для дописывания содержимого в конец файла
// и флаг LOCK_EX для предотвращения записи данного файла кем-нибудь другим в данное время
file_put_contents($file, $person, FILE_APPEND | LOCK_EX);
echo 'Спасибо! Ваше сообщение успешно отправлено';
}
    exit;
}


 ?>
