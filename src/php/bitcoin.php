<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if (empty($_POST['name']) && empty($_POST['email'])) die();

if ($_POST) {

    // VARS

    $name = $_POST['name'];
    $from = $_POST['email'];
    $address1 = $_POST['address1'];
    $address2 = $_POST['address2'];
    $order = $_POST['order'];
    $videos = json_encode($order);
    $format = $_POST['format'];
    $ip = $_SERVER['REMOTE_ADDR'];

    $subject = "POWERSHOTZ BITCOIN ORDER";
    $to = "alexandra@powershotz.com";

    // set response code - 200 OK

    http_response_code(200);

    // data

    $msg = "
    <html>
        <head>
            <title>
                Powershotz Bitcoin order!
            </title>
        </head>
    <body>
        <h1>NEW BITCOIN ORDER!</h1>
        <hr />
        <p><b>Name: </b> $name</p>
        <p><b>Email: </b> $from</p>
        <p><b>Street Address: </b> $address1</p>
        <p><b>City, State, Zip: </b> $address2</p>
        <h3><b>Format: </b> $format</h3>
        <p><b>Order Details: </b> $videos</p>
        <p>Check bitcoin wallet for payment.</p>
        <hr/>
        <small>User's ip address: $ip</small>
        <small><a href='https://www.plus2net.com/php_tutorial/php_ip-demo2.php'>click for more info</a></small>
    </body>    
    </html>
    ";

    $response_msg = "
    <html>
        <head>
            <title>Your Powershotz Order</title>
        </head>
        <body>
            <h1>Thank you for your order, $name!</h1>
            <hr/>
            <p>A payment confirmation from <a href='mailto:alexandra@powershotz.com'>alexandra@powershotz.com</a> will arrive in your inbox shortly. It will include download instructions if applicable.</p>
            <p>DVD orders will usually ship within 1-3 business days upon receipt of payment.</p>
            <p>If you haven't already sent your payment, here are our wallet addresses:</p>
            <ul>
                <li>BITCOIN: 1NRmkHHH2qYWuPHCCcmdUdHeKE6K9VahYs</li>
                <li>BITCOIN CASH:  qrxrrqw6x8hz4ukv4ngjfjcmxc2spcllssuq9gt62j</li>
                <li>ETHEREUM:  0x3f7bC09733E74c471491c62328045D521CD994da</li>
                <li>LITECOIN:  LNGWBEA8zBRsPZWddYCcwzuA94V7ZUNgdL</li>
            </ul>
            <p>If you prefer, QR codes are available at <a href='https://powershotz.com/bitcoin'>powershotz.com/bitcoin</a></p>
            <p>Thanks again for ordering from Powershotz and have a great day!<br/><i>Alexandra</i></p>
        </body>
    </html>
    ";


    // HEADERS

    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: <" . $from . ">";

    $response_headers = "MIME-Version: 1.0\r\n";
    $response_headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $response_headers .= "From: <" . $to . ">";

    // EMAILS

    mail($to, $subject, $msg, $headers);
    mail($from, $subject, $response_msg, $response_headers);

    // ERRORS

    echo json_encode(array(
        "sent" => true
    ));
} else {
    echo json_encode(["sent" => false, "message" => "Something went wrong"]);
}
