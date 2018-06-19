<?php
date_default_timezone_set('Etc/UTC');

require 'lib/PHPMailerAutoload.php';

function sendMail($email) {
  $theme = 'Рецепт в подарок';

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
<p>Получен новый запрос на бесплатную рассылку для фотографов с целевой страницы: <a href="http://blenda.by">blenda.by</a></p>
<p><strong>Данные лида:</strong></p>

<p>
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
$name = isset($_POST['name']) ? $_POST['name'] : '';

if ($email !== '') {
  // Ключ доступа к API (из Личного Кабинета)
  $api_key = "cc7a3da05b88f473d015351cd634980f";

  // Данные о новом подписчике
  $user_email = $email;
  $user_name = $name;
  $user_lists = "T8r1z";
  $user_ip = $_SERVER["REMOTE_ADDR"];

  $POST = array (
    "email" => $user_email,
    "dayOfCycle" => 0,
    "campaign" => array (
        "campaignId" => $user_lists
    ),
    "ipAddress" => $user_ip
  );
  if ($user_name !== '') {
    $POST["name"] = $user_name;
  }
  $data_string = json_encode($POST);

  $ch = curl_init('https://api.getresponse.com/v3/contacts');
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
  curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
      'Content-Type: application/json',
      'Content-Length: ' . strlen($data_string),
      'X-Auth-Token: api-key ' . $api_key )
  );
  $result = curl_exec($ch);
  echo $result;

  sendMail($email);
}

