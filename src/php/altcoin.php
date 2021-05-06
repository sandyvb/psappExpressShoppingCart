<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

// post data = { name, description, price, coinPrice, id, codes, date, email }

// https://stackoverflow.com/questions/29509934/encrypt-with-cryptojs-and-decrypt-with-php

// set response code - 200 OK
http_response_code(200);

$key = pack("H*", "f9292b429191662f2dd3872ebd64d364");
$iv =  pack("H*", "67062bc9da6482af0aa6872710461ab7");

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

// VARS
$myEmail = 'alexandra@powershotz.com';
$customerEmail = $_POST['email'];
$orderName = $_POST['name'];
$description = $_POST['description'];
$orderTotal = $_POST['price'];
$total = number_format((float)$orderTotal, 2, '.', '');
$coinPrice = $_POST['coinPrice'];
$coinName = $_POST['coinName'];
$myWalletAddress = $_POST['address'];
$abbr = $_POST['coinAbbr'];
$orderNumber = $_POST['date'];
$date = date('m/d/Y');
$cipher = $_POST['cipher']; //encoded
$orderLinks = openssl_decrypt($cipher, 'AES-128-CBC', $key, OPENSSL_ZERO_PADDING, $iv);
$orderLinks = trim($orderLinks);
$orderLinks = json_decode($orderLinks);

if (sizeof($orderLinks) > 1) {
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
$subject = "Powershotz $coinName Order";

// temp message to customer
$temp_msg = "
<html>
    <head>
        <title>Your Powershotz $coinName Order</title>
    </head>
    <body>
        <h1>YOUR POWERSHOTZ ORDER DETAILS</h1>
        <hr/>
        <h3><i>Thank you for your $coinName order!</i></h3>
        <p>$orderName</p>
        <p><b>Order Date:</b> $date</p>
        <p><b>Order Number:</b> #$orderNumber</p>
        <p><b>Order Total:</b> $$total USD</p>
        <p><b>Amount of $coinName:</b> $coinPrice $abbr</p>
        <p><b>Your order will be sent to:</b> $customerEmail</p>
        <h2>You ordered:</h2>
        <ul>";

$count = 0;
foreach ($orderLinks as $link) {
    if ($link === null) {
        $link = 'Error!';
    }
    if ($description[$count] === null) {
        $description[$count] = 'Error! Please contact Alexandra :)';
    }
    $temp_msg .= "<li><h3>$description[$count]</h3></li>";
    $count++;
}
$faqs = "https://powershotz.com/faqs";
$previewUrl = "https://ln.sync.com/dl/407e3bb40/2z3d8fny-cc6bh947-rjqtdspa-vjvtnn29/view/default/11188225250008";
$temp_msg .= "</ul>
        <p>You will receive your stream or download links when your payment is confirmed. If you placed this order in error, please disregard this email.</p>
        <p>If you need to resend your payment, please send the equivalent of <b>$$total</b> in $coinName ($abbr) to: <b>$myWalletAddress</b></p>        
        <p>Please reply to this email if you have any questions or problems.</p>
        <p>Thanks again from Powershotz and have a great day!
        <br/>
        <i>Alexandra</i> &hearts;
        </p>
        <p>p.s. Here is a <a href=$previewUrl>preview video</a> to watch while you are waiting for your order!</p>
    </body>
</html>
";

// MESSAGE TO ME For now...
$response_msg = "
<html>
    <head>
        <title>Your Powershotz Order</title>
    </head>
    <body>
        <h1>YOUR POWERSHOTZ LINK$S $is HERE!</h1>
        <hr/>
        <h3><i>Thank you for your $coinName order!</i></h3>
        <p>$orderName</p>
        <p><b>Order Date:</b> $date</p>
        <p><b>Order Number:</b> #$orderNumber</p>
        <p><b>Order Total:</b> $$total USD</p>
        <p><b>Paid:</b> $coinPrice $abbr</p>
        <p><b>Your order sent to:</b> $customerEmail </p>
        <h2>Click on the link$s below to stream or download your product$s!</h2>
        <ul>";

$count = 0;
foreach ($orderLinks as $link) {
    if ($link === null) {
        $link = 'Error!';
    }
    if ($description[$count] === null) {
        $description[$count] = 'Error! Please contact Alexandra :)';
    }
    $response_msg .= "<li><h3><a href=$link>$description[$count]</a></h3></li>";
    $count++;
}
$faqs = "https://powershotz.com/faqs";
$response_msg .= "</ul>
        <p>Some browsers will pause or fail a download in the event of a service interruption. Even a disconnection lasting a fraction of a second can cause the failure of a file download.</p>
        <p>Here are some tips to successfully download your order:</p>
        <ul>
        <li>Only download one video at a time.</li>
        <li>Download large files during off-peak hours.</li>
        <li>Try using a different web browser.</li>
        <li>Visit our <a href=$faqs>FAQs page</a> for more suggestions.</li>
        </ul>
        <p>Please reply to this email if you have any questions or problems.</p>
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
mail($myEmail, $subject, $response_msg, $headers);
mail($customerEmail, $subject, $temp_msg, $response_headers);

echo json_encode(array(
    "sent" => true
));
// echo $msg;
// echo $response_msg;
// echo $description;
// echo $downloadLinks;
