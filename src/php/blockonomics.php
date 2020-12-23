<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

// DO NOT RESET HTTP CALLBACK URL
// This file is called at Payment Buttons/URL then Options then order hook url setting
// Authorization header: 3t8D7CeQ3MDn2MLIrx48NQA5JljODRXMBM8iO4PADCI
// GET /api/merchant_order/$addr
// https://www.blockonomics.co/api/merchant_order/$addr
// Data received from above line of code:
// {
// "emailid": "my@email.com", 
// "status": 2, 
// "code": "?????", 
// "satoshi": 112, 
// "timestamp": 1588699062, 
// "value": 0.01, 
// "txid": "transactionid", 
// "currency": "USD", 
// "address": "transactionaddr", 
// "paid_satoshi": 6746, 
// "data": {
//     "emailid": "customer@email.com", 
//     "extradata": "pz_code"}
// }

// blockonomic payment link if ever needed
// https://www.blockonomics.co/pay-url/product_uid

// GET DATA FROM BLOCKONOMICS API
// Only proceed if payment is confirmed
$status = $_GET['status'];
if ($status != 2) {
    return;
}

// VARS
$addr = $_GET['addr'];
$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => "https://www.blockonomics.co/api/merchant_order/" . $addr,
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
$code = $response['status'];
$emailid = $response['emailid'];  // my email
$customer_emailid = $response['data']['emailid'];  // customer email
$description = $response['description'];  // description or list (pz_code)
$price = $response['value'];  // price
$title = $response['name']; // title
$download_link = $response['data']['extradata']; // download link
$timeStamp = $response['timestamp']; // utc
$date = date('m/d/y', $timeStamp); // date
$currency = $response['currency']; // usd etc

$ip = $_SERVER['REMOTE_ADDR'];
$subject = "POWERSHOTZ BITCOIN ORDER";
$to = "alexandra@powershotz.com";
$from = $customer_emailid;

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
    <p><b>Addr: </b> $addr</p>    
    <p><b>Price: </b> $price</p>
    <p><b>Customer Email: </b> $customer_emailid</p>
    <p><b>Title: </b> $title</p>
    <p><b>Description: </b> $description</p>   
    <p><b>Download Link: </b>$download_link</p>
    <p><b>Code: </b> $code</p>
    <p><b>Errors: </b> $err</p>
    <hr />
    <small>User's ip address: $ip</small>
    <small><a href='https://www.plus2net.com/php_tutorial/php_ip-demo2.php'>click for more info</a></small>
</body>    
</html>
";

// MESSAGE TO CUSTOMER
$response_msg = "
<html>
    <head>
        <title>YOUR POWERSHOTZ DOWNLOAD</title>
    </head>
    <body>
        <h1>YOUR POWERSHOTZ DOWNLOAD IS HERE!</h1>
        <hr/>
        <h3><i>Thank you for your purchase!</i></h3>

        <p>Title: $title</p>
        <p>Description: $description</p>
        <p>Value: $price USD</p>
        <p>Order Date: $date</p>
        <p>Status: Paid</p>        

        <h2><a href=$download_link>Click here to download your video!</a></h2>
        <h3><i>If the above link doesn't work, it hasn't been encoded yet! You will be emailed your link shortly. We're working as fast as we can to correct this problem. Thank you for your patience!</i></h3>                
        
        <p>Contact me if you have any questions or problems with your download.</p>
        <p>Thanks again for ordering from Powershotz and have a great day!
        <br/>
        <i>Alexandra</i>
        </p>
    </body>
</html>
";

// HEADERS TO ME
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: <" . $from . ">";

// HEADERS TO CUSTOMER
$response_headers = "MIME-Version: 1.0\r\n";
$response_headers .= "Content-type: text/html; charset=UTF-8\r\n";
$response_headers .= "From: <" . $to . ">";

// EMAILS SENT
mail($to, $subject, $msg, $headers);
mail($from, $subject, $response_msg, $response_headers);

// ERRORS
echo json_encode(array(
    "sent" => true
));
