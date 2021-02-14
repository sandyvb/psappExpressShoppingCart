<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

// DO NOT RESET HTTP CALLBACK 
// https://www.blockonomics.co/pay-url/product_uid

// GET DATA FROM BLOCKONOMICS API
$addr = $_GET['addr'];
$status = $_GET['status'];
// Only proceed if payment is confirmed
if ($status != 2) {
    return;
}

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => "https://www.blockonomics.co/api/merchant_order/{$addr}",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => array(
        "Authorization: Bearer 3t8D7CeQ3MDn2MLIrx48NQA5JljODRXMBM8iO4PADCI"
    ),
));


$response = curl_exec($curl);
$response = json_decode($response, true); //because of true, it's in an array
$err = curl_error($curl);
curl_close($curl);
///////////////////////////////////////////////

// VARS
$myEmail = $response['emailid'];
$customerEmail = $response['data']['emailid'];
$description = $response['description'];  // titles array
$description = json_decode($description);
$price = $response['value'];
$price = number_format((float)$price, 2, '.', '');
$title = $response['name']; // Powershotz Cart | # items
$timeStamp = $response['timestamp']; // utc
$date = date('m/d/y', $timeStamp);
$currency = $response['currency']; // usd etc
$downloadLinks = $response['data']['extradata']; // links array
$downloadLinks = json_decode($downloadLinks);
$checkOrder = "https://www.blockonomics.co/api/merchant_order/{$addr}";
$test = "https://powershotz.com/php/blockonomics.php?status=2&addr={1NBruwPUC4itxBiw2BwaqGNYgN6gGa6W4n}";
$code = $response['code'];

if (sizeof($downloadLinks) > 1) {
    $S = 'S';
    $s = 's';
    $is = 'ARE';
} else {
    $S = '';
    $s = '';
    $is = 'IS';
}

// Function to get the user IP address
function getUserIP()
{
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP']))
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    else if (isset($_SERVER['HTTP_X_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if (isset($_SERVER['HTTP_X_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    else if (isset($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']))
        $ipaddress = $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'];
    else if (isset($_SERVER['HTTP_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if (isset($_SERVER['HTTP_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    else if (isset($_SERVER['REMOTE_ADDR']))
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    else
        $ipaddress = 'UNKNOWN';
    return $ipaddress;
}

$ip = getUserIP();
$subject = "Powershotz Bitcoin Order";

// set response code - 200 OK
http_response_code(200);

// MESSAGE TO ME
$msg = "
<html>
    <head>
        <title>
            BLOCKONOMICS DATA
        </title>
    </head>
<body>
    <h1>BLOCKONOMICS DATA</h1>
    <hr />    
    <p><b>Payment Status: </b> $status</p>
    <p><b>Date: </b>$date</p>
    <p><b>Check Data: </b> $checkOrder</p>    
    <p><b>Price: </b> $price $currency</p>
    <p><b>Customer Email: </b> $customerEmail</p>
    <p><b>Title: </b> $title</p>
    <p><b>Download Links:</b></p>
    <ul>";

$count = 0;
foreach ($downloadLinks as $downloadLink) {
    if ($downloadLink === null) {
        $downloadLink = 'Error!';
    }
    if ($description[$count] === null) {
        $description[$count] = 'Error!';
    }
    $string = substr($downloadLink, 2);
    $link = "https://ln2.sync.com/dl/{$string}";
    $msg .= "<li>{$description[$count]}: <a href=$link>{$link}</a></li>";
    $count++;
}

$msg .= "</ul>
    <p><b>Code: </b> $code</p>
    <p><b>Errors: </b> $err</p>
    <hr />
    <small>User's ip address: $ip</small>
    <small><a href='https://www.plus2net.com/php_tutorial/php_ip-demo2.php'> click for more info</a></small>
</body>    
</html>
";

// MESSAGE TO CUSTOMER
$response_msg = "
<html>
    <head>
        <title>Your Powershotz Download$s</title>
    </head>
    <body>
        <h1>YOUR POWERSHOTZ DOWNLOAD$S $is HERE!</h1>
        <hr/>
        <h3><i>Thank you for your order!</i></h3>

        <p><b>Order Date:</b> $date</p>
        <p><b>Order Number:</b> $addr</p>
        <p><b>Paid:</b> $$price $currency</p>
        <h3>$title</h3>
        <h2>Click on the link$s below to download your product$s!</h2>
        <ul>";

$count = 0;
foreach ($downloadLinks as $downloadLink) {
    if ($downloadLink === null) {
        $downloadLink = 'Error!';
    }
    if ($description[$count] === null) {
        $description[$count] = 'Error! Please contact Alexandra :)';
    }
    $string = substr($downloadLink, 2);
    $link = "https://ln2.sync.com/dl/{$string}";
    $response_msg .= "<li><h3><a href=$link>$description[$count]</a></h3></li>";
    $count++;
}

$response_msg .= "</ul>
     
        <p>Please reply to this email if you have any questions or problems or visit powershotz.com/faqs for more information.</p>
        <p>Thanks again from Powershotz and have a great day!
        <br/>
        <i>Alexandra</i> &hearts;
        </p>
    </body>
</html>
";

// HEADERS TO ME
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: <" . $customerEmail . ">";

// HEADERS TO CUSTOMER
$response_headers = "MIME-Version: 1.0\r\n";
$response_headers .= "Content-type: text/html; charset=UTF-8\r\n";
$response_headers .= "From: <" . $myEmail . ">";

// SEND EMAILS
mail($myEmail, $subject, $msg, $headers);
mail($customerEmail, $subject, $response_msg, $response_headers);

echo json_encode(array(
    "sent" => true
));
// echo $msg;
// echo $response_msg;
// echo $description;
// echo $downloadLinks;
