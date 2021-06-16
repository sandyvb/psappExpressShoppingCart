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
    $message = $_POST['message'];
    $ip = $_SERVER['REMOTE_ADDR'];
    $subject = "Powershotz Message";
    $to = "alexandra@powershotz.com";

    // set response code - 200 OK

    http_response_code(200);

    // data

    $msg = "
    <html style='height:100%;padding:0px;margin:0px;'>
    <head>
        <title>
            Powershotz Message
        </title>
    </head>
    <body style='height:100%;padding:0px;margin:0px;height:100%;background-color:#eeeeef;'>

    <p style='display:none;'>Thank you for writing to Powershotz, $name!</p>

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
    >NEW MESSAGE FROM $name</h2>
        <p><b>Name: </b> $name</p>
        <p><b>Email: </b> $from</p>
        <p><b>Message: </b> $message</p>  

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

    $response_msg = "
    <html style='height:100%;padding:0px;margin:0px;'>
    <head>
            <title>Powershotz Message</title>
        </head>
        <body style='height:100%;padding:0px;margin:0px;height:100%;background-color:#eeeeef;'>

        <p style='display:none;'>Thank you for writing to Powershotz!</p>

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
    >Thank you for your Message, $name!</h2>
        <h3><i>This is an automated response, but someone will get back to you shortly. </i></h3>  

        <p style='margin-bottom:30px;'>Thanks again and have a great day!<br/><i style='line-height:2;'>Alexandra</i> <span style='color:red;font-size:1.2em;'>&hearts;</span></p> 

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
