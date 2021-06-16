<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if (empty($_POST['name']) && empty($_POST['email'])) die();

if ($_POST) {

    //TODO: update ip calculation
    // VARS
    $customer_name = $_POST['name'];
    $customer_email = $_POST['email'];
    $address1 = $_POST['address1'];
    $address2 = $_POST['address2'];
    $order = $_POST['order'][0]; // array (label,price,value)
    $total = $_POST['orderTotal'];
    $coinName = $_POST['coinName'];
    $coinPrice = $_POST['coinPrice'];
    $coinAbbr = $_POST['coinAbbr'];
    if (strlen($coinAbbr) === 0) {
        $coinAbbr = "USD";
    }
    $address = $_POST['address'];

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

    $subject = "Powershotz DVD Order";
    $my_email = "alexandra@powershotz.com";

    // set response code - 200 OK

    http_response_code(200);

    // data

    $my_msg = "
    <html style='height:100%;padding:0px;margin:0px;'>
        <head>
            <title>
                Powershotz DVD order!
            </title>
        </head>
        <body style='height:100%;padding:0px;margin:0px;height:100%;background-color:#eeeeef;'>

        <p style='display:none;'>Thank you for your $coinName order, $customer_name!</p>

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
    >NEW DVD ORDER!</h2>
        <p><b>Name: </b> $customer_name</p>
        <p><b>Email: </b> $customer_email</p>
        <p><b>Street Address: </b> $address1</p>
        <p><b>City, State, Zip: </b> $address2</p>
        <p><b>Total:</b> $$total</p>
        <p><b>CoinName:</b> $coinName</p>
        <p><b>CoinPrice:</b> $coinPrice</p>
        <p><b>CoinAbbr:</b> $coinAbbr</p>
        <p><b>My wallet address:</b> $address</p>

        <hr style='margin:30px;' color='#8b3679'/>

        <h4 style='color:#8b3679;'>Order Total: $$total </h4>
        <h4 style='color:#8b3679;'>Order Details: </h4>";

    foreach ($order as $item) {
        if ($item === null) {
            $my_msg .= "<p>Oops! Please respond to this email and let us know about this error!</p>";
        } else {
            $title = $item['label'];
            $price = $item['price'];
            $id = $item['value'];
            $image = strtolower($id);
            $imageUrl = "https://shotz.site/shopz/dvdlabels/$image" . "coverad.jpg";
            $linkTo = "https://powershotz.com/$image";

            $my_msg .= "<div style='display:flex;flex-direction:column;border:1px solid #8b3679; padding:25px;-webkit-border-radius: 10px; -moz-border-radius: 10px; border-radius: 10px;'>
                <h3><i>$title</i></h3>
                <div style='display:flex;flex-direction:column;'>
                <a href=$linkTo alt=$title>
                <img alt=$title src=$imageUrl width='200'/>
                </a>
                </div>             
                <p><b>Price:</b> 
                $$price<br/>       
                <b>ID:</b> 
                $id<br/>           
                <i>DVD</i>   
                </div>";
        }
    }

    $my_msg .= "    
    <small>User's ip address: $ip</small>

        <small><a href='https://www.plus2net.com/php_tutorial/php_ip-demo2.php'>click for more info</a></small>

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

    $customer_msg = "
    <html style='height:100%;padding:0px;margin:0px;'>
        <head>
            <title>Your Powershotz Order</title>
        </head>
        <body style='height:100%;padding:0px;margin:0px;height:100%;background-color:#eeeeef;'>

        <p style='display:none;'>Thank you for your $coinName DVD order, $customer_name!</p>

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
    >Thank you for your $coinName DVD order, $customer_name!</h2>
            <h3>After payment confirmation, your order will be mailed to you asap!</h3>
            <p>Orders usually ship within 1-3 business days upon receipt of payment.</p>

            <hr style='margin:30px;' color='#8b3679'/>

            <p>If you need to resend your payment, please send the equivalent of <b>$$total</b> in $coinName ($coinAbbr) to: <b>$address</b></p>

            <hr style='margin:30px;' color='#8b3679'/>

            <h4 style='color:#8b3679;'>Order Total: $$total </h4>
            <h4 style='color:#8b3679;'>Order Details: </h4>";



    foreach ($order as $item) {
        if ($item === null) {
            $my_msg .= "<p>Oops! Please respond to this email and let us know about this error!</p>";
        } else {
            $title = $item['label'];
            $price = $item['price'];
            $id = $item['value'];
            $image = strtolower($id);
            $imageUrl = "https://shotz.site/shopz/dvdlabels/$image" . "coverad.jpg";
            $linkTo = "https://powershotz.com/$image";

            $customer_msg .= "<div style='display:flex;flex-direction:column;border:1px solid #8b3679; padding:25px;-webkit-border-radius: 10px; -moz-border-radius: 10px; border-radius: 10px;'>
            <h3><i>$title</i></h3>
            <div style='display:flex;flex-direction:column;'>
            <a href=$linkTo alt=$title>
            <img alt=$title src=$imageUrl width='200'/>
            </a>
            </div>             
            <p><b>Price:</b> 
            $$price<br/>       
            <b>ID:</b> 
            $id<br/>           
            <i>DVD</i>   
            </div>";
        }
    }


    $customer_msg .= "<p>If you have any questions, please feel free to reply to this email.</p>
    <p style='margin-bottom:30px;'>Thanks again from Powershotz and have a great day!<br/><i style='line-height:2;'>Alexandra</i> <span style='color:red;font-size:1.2em;'>&hearts;</span></p> 

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


    // HEADERS

    $my_headers = "MIME-Version: 1.0\r\n";
    $my_headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $my_headers .= "From: <" . $customer_email . ">";

    $customer_headers = "MIME-Version: 1.0\r\n";
    $customer_headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $customer_headers .= "From: <" . $my_email . ">";

    // EMAILS

    mail($my_email, $subject, $my_msg, $my_headers);
    mail($customer_email, $subject, $customer_msg, $customer_headers);

    //ERRORS

    echo json_encode(array(
        "sent" => true
    ));
} else {
    echo json_encode(["sent" => false, "message" => "Something went wrong"]);
}
