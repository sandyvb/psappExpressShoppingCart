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
    $payment = $_POST['payment'];
    $ip = $_SERVER['REMOTE_ADDR'];


    $subject = "POWERSHOTZ DVD ORDER";
    $to = "alexandra@powershotz.com";

    // set response code - 200 OK

    http_response_code(200);

    // data

    $msg = "
    <html>
        <head>
            <title>
                Powershotz DVD order!
            </title>
        </head>
    <body>
        <h1>NEW DVD ORDER!</h1>
        <hr />
        <p><b>Name: </b> $name</p>
        <p><b>Email: </b> $from</p>
        <p><b>Street Address: </b> $address1</p>
        <p><b>City, State, Zip: </b> $address2</p>
        <h3><b>Payment Method: </b> $payment</h3>
        <p><b>Order Details: </b> $videos</p>
        <p>Send customer invoice.</p>
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
            <p>An invoice from <a href='mailto:alexandra@powershotz.com'>alexandra@powershotz.com</a> will arrive in your inbox shortly. It will include payment instructions.</p>
            <p>Orders usually ship within 1-3 business days upon receipt of payment.</p>
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

    //ERRORS

    echo json_encode(array(
        "sent" => true
    ));
} else {
    echo json_encode(["sent" => false, "message" => "Something went wrong"]);
}
