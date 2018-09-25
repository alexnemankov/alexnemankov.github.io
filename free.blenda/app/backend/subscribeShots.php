<?php
date_default_timezone_set('Etc/UTC');

require 'lib/PHPMailerAutoload.php';

function sendMail($email, $name) {
  $theme = 'Подписка на 7 красивых кадров';

  $mail = new PHPMailer;
  $mail->CharSet = "UTF-8";
  $mail->IsHTML(true);
  $mail->setFrom('info@blenda.by', 'Blenda.by');
	$mail->addAddress('call.7080101@gmail.com', 'Manager');
	$mail->addAddress('5679389@gmail.com', 'Iryna');
	// $mail->addAddress('mefody93@gmail.com', 'Test');

  $mail->Subject = $theme;

  $mail->Body = <<<EOT
<p>Здравствуйте.</p>
<p>Получен новый запрос на 7 красивых кадров с целевой страницы: <a href="http://blenda.by">blenda.by</a></p>
<p><strong>Данные лида:</strong></p>

<p>
<strong>Электронный адрес:</strong> {$email} <br>
<strong>Имя:</strong> {$name} <br>

<strong>Дополнительные значения:</strong><br>
HTTP_REFERER: {$_SERVER["HTTP_REFERER"]}<br>
HTTP_USER_AGENT: {$_SERVER["HTTP_USER_AGENT"]}<br>
IP: {$_SERVER["REMOTE_ADDR"]} <br>
</p>

EOT;

  $mail->send();
}

$email = isset($_POST['email']) ? $_POST['email'] : '';
$name = isset($_POST['name']) ? $_POST['name'] : '';

if ($email !== '') {
  // Ключ доступа к API (из Личного Кабинета)
  $api_key = "6a4jxwyphf1xhb39pttjy4b7qfn6m4joa95tfazy";

  // Данные о новом подписчике
  $user_email = $email;
  $user_lists = "8799819"; // 8799819 - рассылка онлайн, 4787534 - бесплатное пособие
  $user_ip = $_SERVER["REMOTE_ADDR"];
  $user_tag = urlencode("blenda.by - 7 shots");

  $POST = array (
    'api_key' => $api_key,
    'list_ids' => $user_lists,
    'fields[email]' => $user_email,
    'request_ip' => $user_ip,
    'tags' => $user_tag
  );

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $POST);
  curl_setopt($ch, CURLOPT_TIMEOUT, 10);
  curl_setopt($ch, CURLOPT_URL, 'http://api.unisender.com/ru/api/subscribe?format=json');
  $result = curl_exec($ch);

  if ($result) {
    $jsonObj = json_decode($result);

    if(null===$jsonObj) {
      // Ошибка в полученном ответе
      echo "Invalid JSON";
    }
    elseif(!empty($jsonObj->error)) {
      // Ошибка добавления пользователя
      echo "An error occured: " . $jsonObj->error . "(code: " . $jsonObj->code . ")";
    } else {
      // Новый пользователь успешно добавлен
      echo "Added. ID is " . $jsonObj->result->person_id;
    }
  } else {
    // Ошибка соединения с API-сервером
    echo "API access error";
  }

  sendMail($email, $name);
}
