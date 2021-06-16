<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

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
$sortedList = $_POST['sortedList']; //array
$faqs = "https://powershotz.com/faqs";

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
$test_subject = "Test subject";

// temp message to customer
$customer_msg = "
<html style='height:100%;padding:0px;margin:0px;'>
    <head>
        <title>Your Powershotz $coinName Order</title>
    </head>
    <body style='height:100%;padding:0px;margin:0px;height:100%;background-color:#eeeeef;'>
    <p style='display:none;'>Thank you for your $coinName order!</p>

    <center>

    <table cellpadding='0' cellspacing='0'>
    <tr>
    <td style='font-size: 1px; line-height: 1px;' height='20'>&nbsp;</td>
    </tr>
    </table>
    
    <table style='width:100%;min-width:200px;max-width:650px; border:solid 1px #dddddd; border-width:1px; background-color:#ffffff; ' cellpadding='0' cellspacing='0'>
    
    <tr>
    <td align='left' style='text-align:left; color: #ffffff; background-color: #3d1144; padding:20px 30px 20px 30px;'>
    
    <a href='https://powershotz.com/home'><img border='0' alt='Powershotz.com' src='https://shotz.site/shopz/logo/powershotz_logoEmail.png' width='400' /></a>
    
    </td>
    </tr>
    
    <tr>
    <td  align='left' style='text-align:left; padding:20px 30px 20px 30px;'>
    
    <font style='font-size:16px; line-height:23px; color:#494949;' face='Arial, Helvetica, sans-serif, 'Arial', 'Helvetica', 'Sans Serif''>  
    
    <h2 style='color:#8b3679;line-height:1;margin-top:30px;'
    >YOUR POWERSHOTZ ORDER DETAILS</h2>
        <h3><i>Thank you for your $coinName order!</i></h3>
        <h4 style='color:#8b3679;'>$orderName</h4>
        <p><b>Order Date:</b> $date<br/>
        <b>Order Number:</b> #$orderNumber<br/>
        <b>Order Total:</b> $$total USD<br/>
        <b>Amount of $coinName:</b> $coinPrice $abbr</p>
        <p><b>As soon as your payment is confirmed, your order will be sent to:</b> $customerEmail</p>

        <hr style='margin:30px;' color='#8b3679'/>

        <p>If you need to resend your payment, please send the equivalent of <b>$$total</b> in $coinName ($abbr) to: <b>$myWalletAddress</b></p>

        <hr style='margin:30px;' color='#8b3679'/>

        <h4 style='color:#8b3679;'>You ordered:</h4>";

foreach ($sortedList as $item) {
    if ($item === null) {
        $customer_msg .= "<p>Oops! Please respond to this email and let us know about this error!</p>";
    } else {
        $savedItem = $item['checked'];
        $description = "";
        $downloadLink = $item['downloadLink'];
        $id = $item['id'];
        $title = "";
        $length = "";
        $price = $item['price'];
        $formatPrice = number_format((float)$price, 2, '.', '');
        $streaming = "Download";
        if ($item['streaming'] === true) {
            $streaming = "Download and Streaming";
        }
        $linkTo = "https://powershotz.com/$id";
        $numOfPhotos = "";

        if ($item['pz_code']) {
            $image = $item['image'];
            $imageUrl = "https://shotz.site/shopz/dvdlabels/$image";
            $id = $item['pz_code'];
            $linkTo = "https://powershotz.com/$id";
            $min = $item['length'];
            $length = "<b>Length:</b> $min min<br/>";
            $description = $item['description'];
            $title = $item['title'];
        } else if ($item['model_name']) {
            $model_name = $item['model_name'];
            $title = $model_name;
            $model_name = strtolower($model_name);
            $image = str_replace(' ', '', $model_name);
            $imageUrl = "https://shotz.site/shopz/thumbs/$image-1.jpg";
            $numOfPhotos = $item['num_photos'];
            $description = "$numOfPhotos Photos";
            $linkTo = "https://powershotz.com/$model_name";
            $length = "";
        } else {
            $image = $item['image'];
            $imageUrl = "https://shotz.site/shopz/c4sImages/$image";
            $min = $item['length'];
            $length = "<b>Length:</b> $min min<br/>";
            $description = $item['description'];
            $title = $item['title'];
        }

        if ($savedItem === false) {
            $customer_msg .= "<div style='display:flex;flex-direction:column;border:1px solid #8b3679; padding:25px;-webkit-border-radius: 10px; -moz-border-radius: 10px; border-radius: 10px;'>
                <h3><i>$title</i></h3>
                <div style='display:flex;flex-direction:column;'>
                <a href=$linkTo>
                <img alt=$title src=$imageUrl width='200'/>
                </a>
                </div>
                <p><b>Description:</b> 
                $description<br/>       
                <b>ID:</b> 
                $id<br/>               
                $length 
                <b>Price:</b> 
                $$formatPrice<br/>
                <i>$streaming</i>        
                </div>";
        }
    }
}

if ($total > 20) {
    $customer_msg .= "<div style='display:flex;flex-direction:column;border:1px solid #8b3679; padding:25px;-webkit-border-radius: 10px; -moz-border-radius: 10px; border-radius: 10px;'>
        <h3><i>Powershotz Preview Video, Part 2</i></h3>
        <a href='https://powershotz.com/14667255'>
        <img alt='Powershotz Preview Video, Part 2' src='https://shotz.site/shopz/dvdlabels/prev02coverad.jpg' width='200'/>
        </a>
        <div style='margin-top:15;'>
        <a href='https://ln2.sync.com/dl/407e3bb40/2z3d8fny-cc6bh947-rjqtdspa-vjvtnn29' style='color:#8b3679;font-size:28px;font-weight:bold;background-color:yellow;'>Download Now</a>
        </div>
        <p><b>While you wait for your order to arrive:</b> Preview video clips covering 21 DVD titles! Kick ass stuff! Over 20 super hot female subjugates captured, dominated, bound, spanked, whipped, slave trained, gagged, anal trained, vibrated to forced orgasm and penetrated in strict bondage! This is a composite of 21 preview videos, each about 3 minutes long with excerpts showing the scenes available on 21 DVD titles.<br/>       
        <b>ID:</b> 14667255<br/>               
        <b>Length:</b> 66 min<br/> 
        <b>Price:</b> <b style='color:red;'>FREE</b><br/>
        <i>Download and Streaming</i>        
        </div>";
}

$customer_msg .= "       
        <p>If you placed this order in error, please disregard this email.</p>       

        <p>If you have any questions or concerns, please respond to this email.</p>   
           
        <p style='margin-bottom:30px;'>Thank you from Powershotz and have a great day!<br/><i style='line-height:2;'>Alexandra</i> <span style='color:red;font-size:1.2em;'>&hearts;</span></p> 

        </font>
        </td>
        </tr>
        
        <tr>
        <td  align='left' style='text-align:left; background-color: #f2f2f2; padding:20px 30px 20px 30px;'>
        
        <font style='font-size:12px;' face='Arial, Helvetica, sans-serif, 'Arial', 'Helvetica', 'Sans Serif''>
        &copy; 2021 Powershotz.com
        </font>
        
        </td>
        </tr>
        
        </table>
        
        <table cellpadding='0' cellspacing='0'>
        <tr>
        <td style='font-size: 1px; line-height: 1px;' height='20'>&nbsp;</td>
        </tr>
        </table>
        
        </center>
    </body>
</html>
";

// MESSAGE TO ME For now...
$links_msg = "
<html style='height:100%;padding:0px;margin:0px;'>
    <head>
        <title>Your Powershotz Order</title>
    </head>
    <body style='height:100%;padding:0px;margin:0px;height:100%;background-color:#eeeeef;'>
    <p style='display:none;'>Thank you for your $coinName order!</p>

    <center>

    <table cellpadding='0' cellspacing='0'>
    <tr>
    <td style='font-size: 1px; line-height: 1px;' height='20'>&nbsp;</td>
    </tr>
    </table>
    
    <table style='width:100%;min-width:200px;max-width:650px; border:solid 1px #dddddd; border-width:1px; background-color:#ffffff; ' cellpadding='0' cellspacing='0'>
    
    <tr>
    <td align='left' style='text-align:left; color: #ffffff; background-color: #3d1144; padding:20px 30px 20px 30px;'>
    
    <a href='https://powershotz.com/home'><img border='0' alt='Powershotz.com' src='https://shotz.site/shopz/logo/powershotz_logoEmail.png' width='400' /></a>
    
    </td>
    </tr>
    
    <tr>
    <td  align='left' style='text-align:left; padding:20px 30px 20px 30px;'>
    
    <font style='font-size:16px; line-height:23px; color:#494949;' face='Arial, Helvetica, sans-serif, 'Arial', 'Helvetica', 'Sans Serif''>
    
    <h2 style='color:#8b3679;line-height:1;margin-top:30px;'
    >YOUR POWERSHOTZ LINK$S $is HERE!</h2>
        <h3><i>Thank you for your $coinName order!</i></h3>
        <h4 style='color:#8b3679;'>$orderName</h4>
        <p><b>Order Date:</b> $date<br/>
        <b>Order Number:</b> #$orderNumber<br/>
        <b>Order Total:</b> $$total USD<br/>
        <b>Paid:</b> $coinPrice $abbr</p>
        <p><b>Your order sent to:</b> $customerEmail </p>

        <hr style='margin:30px;' color='#8b3679'/>

        <h4 style='color:#8b3679;'>Click on the link$s below to stream or download your product$s!</h4>";

foreach ($sortedList as $item) {
    if ($item === null) {
        $links_msg .= "<p>Error! Please respond to this email and let us know!</p>";
    } else {
        $savedItem = $item['checked'];
        $description = "";
        $downloadLink = $item['downloadLink'];
        $id = $item['id'];
        $title = "";
        $length = "";
        $price = $item['price'];
        $formatPrice = number_format((float)$price, 2, '.', '');
        $streaming = "Download";
        if ($item['streaming'] === true) {
            $streaming = "Download and Streaming";
        }
        $linkTo = "https://powershotz.com/$id";
        $numOfPhotos = "";

        if ($item['pz_code']) {
            $image = $item['image'];
            $imageUrl = "https://shotz.site/shopz/dvdlabels/$image";
            $id = $item['pz_code'];
            $linkTo = "https://powershotz.com/$id";
            $min = $item['length'];
            $length = "<b>Length:</b> $min min<br/>";
            $description = $item['description'];
            $title = $item['title'];
        } else if ($item['model_name']) {
            $model_name = $item['model_name'];
            $title = $model_name;
            $model_name = strtolower($model_name);
            $image = str_replace(' ', '', $model_name);
            $imageUrl = "https://shotz.site/shopz/thumbs/$image-1.jpg";
            $numOfPhotos = $item['num_photos'];
            $description = "$numOfPhotos Photos";
            $linkTo = "https://powershotz.com/$model_name";
            $length = "";
        } else {
            $image = $item['image'];
            $imageUrl = "https://shotz.site/shopz/c4sImages/$image";
            $min = $item['length'];
            $length = "<b>Length:</b> $min min<br/>";
            $description = $item['description'];
            $title = $item['title'];
        }

        if ($savedItem === false) {
            $links_msg .= "<div style='display:flex;flex-direction:column;border:1px solid #8b3679; padding:25px;-webkit-border-radius: 10px; -moz-border-radius: 10px; border-radius: 10px;'>
            <h3><i>$title</i></h3>
            <a href=$linkTo>
            <img alt=$title src=$imageUrl width='200'/>
            </a>
            <div style='margin-top:15;'>
            <a href=$downloadLink style='color:#8b3679;font-size:28px;font-weight:bold;background-color:yellow;'>Download Now</a>
            </div>
            <p><b>Description:</b> 
            $description<br/>       
            <b>ID:</b> 
            $id<br/>               
            $length 
            <b>Price:</b> 
            $$formatPrice<br/>
            <i>$streaming</i>        
            </div>";
        }
    }
}

$links_msg .= "
        <p>The files are large and it is normal for downloads to take a long time.</p>
        <p>Some browsers will pause or fail a download in the event of a service interruption. Even a disconnection lasting a fraction of a second can cause the failure of a file download.</p>
        <p>Here are some tips to successfully download your order:</p>
        <ul>
        <li>Only download one video at a time.</li>
        <li>Download large files during off-peak hours.</li>
        <li>Try using a different web browser.</li>
        <li>Visit our <a href=$faqs>FAQs page</a> for more suggestions.</li>
        </ul>
        <p>If you have any questions or concerns, please respond to this email.</p>      
        <p style='margin-bottom:30px;'>Thank you from Powershotz and have a great day!<br/><i style='line-height:2;'>Alexandra</i> <span style='color:red;font-size:1.2em;'>&hearts;</span></p> 

        </font>
        </td>
        </tr>
        
        <tr>
        <td  align='left' style='text-align:left; background-color: #f2f2f2; padding:20px 30px 20px 30px;'>
        
        <font style='font-size:12px;' face='Arial, Helvetica, sans-serif, 'Arial', 'Helvetica', 'Sans Serif''>
        &copy; 2021 Powershotz.com
        </font>
        
        </td>
        </tr>
        
        </table>
        
        <table cellpadding='0' cellspacing='0'>
        <tr>
        <td style='font-size: 1px; line-height: 1px;' height='20'>&nbsp;</td>
        </tr>
        </table>
        
        </center>
    </body>
</html>
";


// HEADERS TO ME
$my_headers = "MIME-Version: 1.0\r\n";
$my_headers .= "Content-type: text/html; charset=UTF-8\r\n";
$my_headers .= "From: <" . $customerEmail . ">";

// HEADERS TO CUSTOMER
$customer_headers = "MIME-Version: 1.0\r\n";
$customer_headers .= "Content-type: text/html; charset=UTF-8\r\n";
$customer_headers .= "From: <" . $myEmail . ">";

// SEND EMAILS
mail($myEmail, $subject, $links_msg, $my_headers); //links to me
mail($customerEmail, $subject, $customer_msg, $customer_headers); // thank you to customer

echo json_encode(array(
    "sent" => true
));
