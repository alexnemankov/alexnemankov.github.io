<?php
date_default_timezone_set('Etc/UTC');

require 'lib/PHPMailerAutoload.php';

function sendMail($email, $name) {
  $theme = 'Подписка на бесплатную рассылку для фотографов';

  $mail = new PHPMailer;
  $mail->CharSet = "UTF-8";
  $mail->IsHTML(true);
  $mail->setFrom('info@blenda.by', 'Online.Blenda.by');
    $mail->addAddress('call.7080101@gmail.com', 'Manager');
        $mail->addAddress('5679389@gmail.com', 'Iryna');

  $mail->Subject = $theme;

  $mail->Body = <<<EOT
<p>Здравствуйте.</p>
<p>Получен новый запрос на бесплатную рассылку для фотографов с целевой страницы: <a href="http://online.blenda.by">online.blenda.by</a></p>
<p><strong>Данные лида:</strong></p>

<p>
<strong>Имя:</strong> {$name} <br>
<strong>Электронный адрес:</strong> {$email} <br>

<strong>Дополнительные значения:</strong><br>
HTTP_REFERER: {$_SERVER["HTTP_REFERER"]}<br>
HTTP_USER_AGENT: {$_SERVER["HTTP_USER_AGENT"]}<br>
IP: {$_SERVER["REMOTE_ADDR"]} <br>
</p>

EOT;

  $mail->send();
}

$email = isset($_POST['email']) ? $_POST['email'] : '';
$name = isset($_POST['name']) ? $_POST['name'] : '-';

if ($email !== null) {
  // Ключ доступа к API (из Личного Кабинета)
  $api_key = "cc7a3da05b88f473d015351cd634980f";

  // Данные о новом подписчике
  $user_email = $email;

  $POST = array (
    'email'     => $user_email,
    'campaign'  => array('campaignId' => '4zkGt'),
    'dayOfCycle' => 0,
    'ipAddress' => $_SERVER["REMOTE_ADDR"]
  );
  $POST = json_encode($POST);

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, 'https://api.getresponse.com/v3/contacts?');
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $POST);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array('X-Auth-Token: api-key ' . $api_key, 'Content-Type: application/json'));
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  $result = curl_exec($ch);
  curl_close($ch);

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
