<?php
// **************************************************************************************************

// Linklok URL V3.5
// Copyright (c) 2003-2020 Vibralogix
// www.vibralogix.com
// sales@vibralogix.com
// You are licensed to use this product on one domain only.
// Please contact us for extra licenses if required.
// https://powershotz.com/linklokurl.php?manualentry=1
// https://www.vibralogix.com/linklokurl/

//**************************************************************************************************

// General settings
$LinklokKey = "7&}B]XTSjPv6";                                 // Set to random string used to encrypt links
$LinklokLocation = "/home/pz/public_html/7xsT6AAvE1YM/";             // Location where files are securely stored
$LinklokLocations['previews'] = "/home/pz/public_html/previews";  // 'filename.ext:previews'
$LinklokLocations['4theBooBear'] = "/home/pz/public_html/4theBooBear";
$ManualPassword = "4SabbathBailey*";                                  // password used to access manual entry form
$ErrorTemplate = "";                                          // Optional error page template (html)

// The following variables must be set if you wish to use the email links feature of Linklok
$YourCompany = "Powershotz";                                // Your company name
$YourEmail = "alexandra@innocent.com";                            // Your email address
$CopyEmail = "alexandra@innocent.com";                                              // Set an email address if you want to receive copies of emails sent to users
$EmailTemplate = "";                                          // Optional html or text format email template
$HTMLEmail = "Y";                                             // Set to Y to send the default email in HTML formator N to send in text format
$LinklokLog = "";                                             // Optional text log file to store form entry fields
$NotifyTemplate = "";                                         // Optional email template sent to admin. Leave blank for default template

$LinklokDownloadLog = "home/public_html/downloadlog.txt";                                     // Optional text log to store downloads
$RequireTuring = 0;                                           // Set to 1 to use Turing code. Set to 0 to disable
$NotifyDownloadEmail = "alexandra@innocent.com";                                    // Email address to receive download notificaton email

$DownloadURL = "https://powershotz.com/linklokurl.php";  //overrides any password protection see pg.26 in manual

// Optional list of email addresses / services to block if required. You can add delete from this list
$FreeEmail[] = "yahoo.";
$FreeEmail[] = "hotmail.";
$FreeEmail[] = "gmail.";
$FreeEmail[] = "altavista.";
$FreeEmail[] = "prontomail.";
$FreeEmail[] = "talk21.";
$FreeEmail[] = "address.";
$FreeEmail[] = "@mail.";
$FreeEmail[] = "@australia.";
$FreeEmail[] = "boardermail.";
$FreeEmail[] = "@canada.";
$FreeEmail[] = "bolt.";
$FreeEmail[] = "dbzmail.";
$FreeEmail[] = "etoast.";
$FreeEmail[] = "fastmail.";
$FreeEmail[] = "freemail.";
$FreeEmail[] = "icqmail.";
$FreeEmail[] = "jaydemail.";
$FreeEmail[] = "keromail.";
$FreeEmail[] = "linuxmail.";
$FreeEmail[] = "lycos.";
$FreeEmail[] = "myrealbox.";
$FreeEmail[] = "netscape.";
$FreeEmail[] = "popmail.";
$FreeEmail[] = "themail.";
$FreeEmail[] = "toast.";
$FreeEmail[] = "webcity.";

// Supported mime types. These are only required for displaying these file types inline.
// Linklok can download any file type using the Save As dialog box in the browser.
// You can add to this list as required.

$mt['.jpg'] = "image/jpeg";
$mt['.gif'] = "image/gif";
$mt['.cgm'] = "image/cgm";
$mt['.flv'] = "video/x-flv";
$mt['.gif'] = "image/gif";
$mt['.htm'] = "text/html";
$mt['.html'] = "text/html";
$mt['.txt'] = "text/plain";
$mt['.pdf'] = "application/pdf";
$mt['.m4v'] = "video/x-m4v";
$mt['.mov'] = "video/quicktime";
$mt['.mp3'] = "audio/mpeg";
$mt['.mp4'] = "video/mp4";
$mt['.mpg'] = "video/mpeg";
$mt['.mpeg'] = "video/mpeg";
$mt['.pdf'] = "application/pdf";
$mt['.png'] = "image/png";
$mt['.ram'] = "audio/x-pn-realaudio";
$mt['.rm'] = "audio/x-pn-realaudio";
$mt['.wmv'] = "application/x-ms-wmv";
$mt['.swf'] = "application/x-shockwave-flash";
$mt['.mov'] = "video/quicktime";
$mt['.asf'] = "video/x-ms-asf";
$mt['.asx'] = "video/x-ms-asf";
$mt['.rm'] = "audio/x-realaudio";
$mt['.ram'] = "audio/x-pn-realaudio";
$mt['.rar'] = "application/x-rar-compressed";
$mt['.zip'] = "application/zip";

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Code below this point should not need modifying
///////////////////////////////////////////////////////////////////////////////////////////////////////
@error_reporting(E_ERROR);
if (!function_exists('get_headers')) {
  function get_headers($url, $format = 0)
  {
    $headers = array();
    $url = parse_url($url);
    $host = isset($url['host']) ? $url['host'] : '';
    $port = isset($url['port']) ? $url['port'] : 80;
    $path = (isset($url['path']) ? $url['path'] : '/') . (isset($url['query']) ? '?' . $url['query'] : '');
    $fp = fsockopen($host, $port, $errno, $errstr, 3);
    if ($fp) {
      $hdr = "GET $path HTTP/1.1\r\n";
      $hdr .= "Host: $host \r\n";
      $hdr .= "Connection: Close\r\n\r\n";
      fwrite($fp, $hdr);
      while (!feof($fp) && $line = trim(fgets($fp, 1024))) {
        if ($line == "\r\n") break;
        list($key, $val) = explode(': ', $line, 2);
        if ($format)
          if ($val) $headers[$key] = $val;
          else $headers[] = $key;
        else $headers[] = $line;
      }
      fclose($fp);
      return $headers;
    }
    return false;
  }
}
if ($YourEmail != "") {
  if (!isset($EmailHeaderNoSlashR))
    $EmailHeaderNoSlashR = 1;
  if ((!isset($ExtraMailParam)) && (strtolower(@ini_get("safe_mode")) != 'on') && (@ini_get("safe_mode") != '1'))
    $ExtraMailParam = "-f " . $YourEmail;
  @ini_set(sendmail_from, $YourEmail);
}
if (!isset($ServerTimeAdjust))
  $ServerTimeAdjust = 300;
if (!isset($SendgridUser))
  $SendgridUser = "";
if (!isset($SendgridPass))
  $SendgridPass = "";
if (!isset($SendgridAPI))
  $SendgridAPI = "";

foreach ($_GET as $name => $value) $$name = $value;
foreach ($_POST as $name => $value) $$name = $value;
$checkvar = array("LinklokKey", "ManualPassword", "EmailTemplate", "LinklokLog", "LinklokDownloadLog", "YourEmail", "YourCompany", "RequireTuring", "AllowEmailOnce", "AllowIPOnce", "LinklokLocation", "FreeEmail", "ServerTimeAdjust", "DownloadBackground", "PromotionEmailTemplate", "Emails", "pdfwatermark", "DownloadLog");
$found = false;
foreach ($_GET as $key => $value) {
  if (false !== array_search(strtolower($key), $checkvar))
    $found = true;
}
foreach ($_POST as $key => $value) {
  if (false !== array_search(strtolower($key), $checkvar))
    $found = true;
}
foreach ($_COOKIE as $key => $value) {
  if (false !== array_search(strtolower($key), $checkvar))
    $found = true;
}
if ($found) {
  linklokShowMessage($ErrorTemplate, "Access Denied.", $ErrorEmail);
  exit;
}
if (isset($_REQUEST['linklokauth']))
  $linklokauth = $_REQUEST['linklokauth'];
if (isset($_REQUEST['linklokauthe']))
  $linklokauthe = $_REQUEST['linklokauthe'];
if (isset($_REQUEST['linklokform']))
  $linklokform = $_REQUEST['linklokform'];
$ipaddr = trim(strtok($_SERVER['REMOTE_ADDR'], ","));
$thispage = $_SERVER['PHP_SELF'];
if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off')
  $thisurl = "https://";
else
  $thisurl = "http://";
$thisurl .= $_SERVER['HTTP_HOST'] . $thispage;
// If ?orderform them request password
if ((isset($manualentry)) || (isset($MANUALENTRY))) {
  print "<html><head><title>Linklok URL Manual Entry Form</title></head><body>\n";
  print "<script language=\"JavaScript\">\n";
  print "<!-- JavaScript\n";
  print "function validateform(form)\n";
  print "{\n";
  print "  if (form.linklokpassword.value==\"\")\n";
  print "  {\n";
  print "    alert(\"Please enter the password\")\n";
  print "    form.linklokpassword.focus()\n";
  print "    return false\n";
  print "  }\n";
  print "  return true;\n";
  print "}\n";
  print "// - JavaScript - -->\n";
  print "</script>\n";
  print "<form name=\"form1\" method=\"post\" action=\"$thisurl\" onSubmit=\"return validateform(this)\">\n";
  print "<p align=\"left\"><font face=\"Arial\" color=\"#333399\"><span style=\"font-size:16pt;\"><b>Linklok Manual Entry Form</b></span></font></p>\n";
  print "<table border=\"0\" cellpadding=\"0\" cellspacing=\"10\" bgcolor=\"#DDE3F0\">\n";
  print "<tr><td><p><font face=\"Arial\" size=\"2\">Password</font></p></td>\n";
  print "<td><p><input type=\"password\" name=\"linklokpassword\" maxlength=\"50\" size=\"30\"></p></td></tr><tr><td><p>&nbsp;</p></td>\n";
  print "<td align=\"right\"><p><input type=\"submit\" name=\"button1\" value=\"Login\"></p></td>\n";
  print "</tr></table></form><script language=\"JavaScript\">document.forms[0].linklokpassword.focus()</script></body></html>\n";
  exit;
}
if (($ManualPassword != "") && (isset($linklokpassword)) && ($ManualPassword != $linklokpassword)) {
  linklokShowMessage($ErrorTemplate, "Incorrect password.");
  exit;
}
if (isset($linklokauthe)) {
  if ($DownloadBackground != "") {
    $page = "";
    // See if background page is html or php
    $ext = linklokfileextension($DownloadBackground);
    if ($ext == ".php") {
      ob_start();
      include $DownloadBackground;
      $page = ob_get_contents();
      ob_end_clean();
    } else {
      if ($fh = @fopen($DownloadBackground, "r")) {
        $page = fread($fh, 200000);
        fclose($fh);
      }
    }
    if ($page != "") {
      $page = str_replace("!!!link!!!", "?linklokauth=" . $linklokauthe, $page);
      $page = str_replace("<body", "<body onLoad=\"download()\"", $page);
      $redirectcode = "<script language=\"JavaScript\" type=\"text/javascript\">\n";
      $redirectcode .= "function download()\n";
      $redirectcode .= "{\n";
      $redirectcode .= "  window.location=\"?linklokauth=" . $linklokauthe . "\"\n";
      $redirectcode .= "}\n";
      $redirectcode .= "</script>\n";
      $redirectcode .= "</body>\n";
      $page = str_replace("</body>", $redirectcode, $page);
      print $page;
      exit;
    } else
      $linklokauth = $linklokauthe;
  } else
    $linklokauth = $linklokauthe;
}
if ($linklokauth != "") {
  // Request to access file
  linklokgetfile($linklokauth);
}
if ($linklokform != "") {
  // Request to send email with links
  linklokemaillinks($FreeEmail);
}
// If password entered and correct then display manual order form
if (($ManualPassword != "") && ($ManualPassword == $linklokpassword)) {
  print "<html><head><title>Linklok URL Manual Entry Form</title></head><body>\n";
  print "<script language=\"JavaScript\">\n";
  print "<!-- JavaScript\n";
  print "function validateform(form)\n";
  print "{\n";
  print "  if (form.f0.value==\"\")\n";
  print "  {\n";
  print "    alert(\"Please enter at least one file\")\n";
  print "    form.f0.focus()\n";
  print "    return false\n";
  print "  }\n";
  print "  if (form.newexpiry2.value!=\"\")\n";
  print "  {\n";
  print "    if (ValidChars(form.newexpiry2.value,\"0123456789\")==false)\n";
  print "    {\n";
  print "      alert(\"Please enter a valid expiry time or select from the menu\")\n";
  print "      form.newexpiry2.focus()\n";
  print "      return(false)\n";
  print "    }\n";
  print "    form.x.value=form.newexpiry2.value\n";
  print "  }\n";
  print "  else\n";
  print "  {\n";
  print "    form.x.value=form.newexpiry1.value\n";
  print "  }\n";

  print "  if (form.email.value!=\"\")\n";
  print "  {\n";
  print "    if (ValidateEmail(form.email.value)==false)\n";
  print "    {\n";
  print "      alert(\"Please enter a valid email address\")\n";
  print "      form.email.focus()\n";
  print "      return false\n";
  print "    }\n";
  print "  }\n";
  print "  if (ValidateIP(form.i.value)==false)\n";
  print "  {\n";
  print "    alert(\"Please enter a valid IP address or leave blank\")\n";
  print "    form.i.focus()\n";
  print "    return false\n";
  print "  }\n";
  print "  if (form.i.value==\"\")\n";
  print "    form.i.value=\"0.0.0.0\";\n";
  print "  if (form.email.value==\"\")\n";
  print "    form.linklokform.value=\"\";\n";
  print "  return true\n";
  print "}\n";
  print "\n";
  print "function ValidateEmail(str)\n";
  print "{\n";
  print "    // are regular expressions supported?\n";
  print "    var supported = 0;\n";
  print "    if (window.RegExp) {\n";
  print "      var tempStr = \"a\";\n";
  print "      var tempReg = new RegExp(tempStr);\n";
  print "      if (tempReg.test(tempStr)) supported = 1;\n";
  print "    }\n";
  print "    if (!supported)\n";
  print "      return (str.indexOf(\".\") > 2) && (str.indexOf(\"@\") > 0);\n";
  print "    var r1 = new RegExp(\"(@.*@)|(\\\.\\\.)|(@\\\.)|(^\\\.)\");\n";
  print "    var r2 = new RegExp(\"^.+\\\@(\\\[?)[a-zA-Z0-9\\\-\\\.]+\\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\\]?)$\");\n";
  print "    return (!r1.test(str) && r2.test(str));\n";
  print "}\n";
  print "function ValidateIP(ip)\n";
  print "{\n";
  print "  if (ip!=\"\")\n";
  print "  {\n";
  print "    var ni\n";
  print "    if (ValidChars(ip,\"0123456789.\")==false)\n";
  print "      return(false)\n";
  print "    var ipparts=ip.split(\".\")\n";
  print "    if (ipparts.length!=4)\n";
  print "      return(false)\n";
  print "    for (var k=0; k<4; k++)\n";
  print "    {\n";
  print "      if (ipparts[k].length<1)\n";
  print "      return(false)\n";
  print "      if ((ipparts[k].charAt(0)==\"0\") && (ipparts[k].length>1))\n";
  print "      return(false)\n";
  print "    ni=parseInt(ipparts[k],10)\n";
  print "    if ((ni<0) || (ni>255))\n";
  print "      return (false)\n";
  print "    }\n";
  print "  }\n";
  print "    return(true)\n";
  print "}\n";
  print "\n";
  print "function ValidChars(str,valid)\n";
  print "{\n";
  print "  var v=true\n";
  print "  for (i=0;i<str.length;i++)\n";
  print "  {\n";
  print "    if (valid.indexOf(str.charAt(i))==-1)\n";
  print "    {\n";
  print "      v=false\n";
  print "      break\n";
  print "    }\n";
  print "  }\n";
  print "  return(v)\n";
  print "}\n";
  print "// - JavaScript - -->\n";
  print "</script>\n";
  print "<form name=\"form1\" method=\"post\" action=\"$thisurl\" onSubmit=\"return validateform(this)\">\n";
  print "<input type=\"hidden\" name=\"linklokpassword\" value=\"$linklokpassword\">\n";
  print "<input name=\"m\" type=\"hidden\" value=\"0\">\n";
  print "<input name=\"a\" type=\"hidden\" value=\"$linklokpassword\">\n";
  print "<input name=\"g\" type=\"hidden\" value=\"\">\n";
  print "<input name=\"linklokform\" type=\"hidden\" value=\"1\">\n";
  print "<p align=\"left\"><font face=\"Arial\" color=\"#333399\"><span style=\"font-size:16pt;\"><b>Linklok Manual Entry Form</b></span></font></p>\n";
  print "<table border=\"0\" cellpadding=\"0\" cellspacing=\"10\" bgcolor=\"#DDE3F0\">\n";
  for ($k = 0; $k <= 19; $k++) {
    print "<tr>\n";
    print "<td><p><font face=\"Arial\" size=\"2\">File " . ($k + 1) . "</font></p></td>\n";
    $fnum = "f" . $k;
    $loc = "l" . $k;
    print "<td><p>";
    if ($$fnum != "") {
      print "<input name=\"f$k\" type=\"text\" value=\"" . $$fnum . "\">";
      if (!empty($LinklokLocations)) {
        print "<font face=\"Arial\" size=\"2\">&nbsp;in location&nbsp;</font><select name=\"l$k\" size=\"1\">\n";
        if (($LinklokLocation != "") && ($$loc == ""))
          print "<option selected value=\"\">Default</option>\n";
        if (($LinklokLocation != "") && ($$loc != ""))
          print "<option selected value=\"\">Default</option>\n";
        foreach ($LinklokLocations as $namepair => $valuepair) {
          $$namepair = $valuepair;
          if ($$loc == $namepair)
            print "<option selected value=\"" . $namepair . "\">" . $namepair . "</option>\n";
          else
            print "<option value=\"" . $namepair . "\">" . $namepair . "</option>\n";
        }
        print "</select>\n";
      } else {
        print "<input type=\"hidden\" name=\"l$k\" value=\"\">\n";
      }
      if ($email == "") {
        if ($x != 0) {
          if (strlen($x) == 12)
            $expirytime = mktime(substr($x, 8, 2), substr($x, 10, 2), 0, substr($x, 4, 2), substr($x, 6, 2), substr($x, 0, 4), -1);
          else
            $expirytime = time() + ($x * 60);
        } else
          $expirytime = 0;
        $plink = linkokGetSecureLink($$fnum, $$loc, $expirytime, "LL_1", $i, $l, $LinklokKey, "1", $thisurl);
        $fnameonly = linklokfilename($$fnum);
        print "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"$plink\" target=\"_linklok\">$fnameonly</a>";
        if (($BitlyLogin !== "") && ($BitlyKey != "")) {
          $bitlyplink = linklokGetBitlyURL($BitlyLogin, $BitlyKey, $plink);
          if ($bitlyplink != "") {
            print "&nbsp;&nbsp;(bit.ly <a href=\"$bitlyplink\" target=\"_linklok\">$fnameonly</a>)";
          }
        }
        if (($TinyLogin !== "") && ($TinyKey != "")) {
          $tinylink = linklokGetTinyURL($TinyLogin, $TinyKey, $plink, "");
          if ($tinylink != "") {
            print "&nbsp;&nbsp;(tiny <a href=\"$tinyplink\" target=\"_linklok\">$fnameonly</a>)";
          }
        }
      }
    } else {
      print "<input name=\"f$k\" type=\"text\" value=\"\">";
      if (!empty($LinklokLocations)) {
        print "<font face=\"Arial\" size=\"2\">&nbsp;in location&nbsp;</font><select name=\"l$k\" size=\"1\">\n";
        if (($LinklokLocation != "") && ($$loc == ""))
          print "<option selected value=\"\">Default</option>\n";
        if (($LinklokLocation != "") && ($$loc != ""))
          print "<option selected value=\"\">Default</option>\n";
        foreach ($LinklokLocations as $namepair => $valuepair) {
          $$namepair = $valuepair;
          if ($$loc == $namepair)
            print "<option selected value=\"" . $namepair . "\">" . $namepair . "</option>\n";
          else
            print "<option value=\"" . $namepair . "\">" . $namepair . "</option>\n";
        }
        print "</select>\n";
      } else {
        print "<input type=\"hidden\" name=\"l$k\" value=\"\">\n";
      }
    }
    print "</p></td>\n";
    print "</tr>\n";
  }
  print "<tr><td><p><font face=\"Arial\" size=\"2\">Expiry Time</font></p></td>\n";
  print "<input type=\"hidden\" name=\"x\" value=\"\">\n";
  print "<td><p><select name=\"newexpiry1\" size=\"1\">\n";
  if ($newexpiry1 == "10")
    print "<option selected value=\"10\">10 minutes</option>\n";
  else
    print "<option value=\"10\">10 minutes</option>\n";
  if ($newexpiry1 == "60")
    print "<option selected value=\"60\">1 Hour</option>\n";
  else
    print "<option value=\"60\">1 Hour</option>\n";
  if ($newexpiry1 == "180")
    print "<option selected value=\"180\">3 Hours</option>\n";
  else
    print "<option value=\"180\">3 Hours</option>\n";
  if (($newexpiry1 == "1440") || (!isset($x)))
    print "<option selected value=\"1440\">24 Hours</option>\n";
  else
    print "<option value=\"1440\">24 Hours</option>\n";
  if ($newexpiry1 == "4320")
    print "<option selected value=\"4320\">3 Days</option>\n";
  else
    print "<option value=\"4320\">3 Days</option>\n";
  if ($newexpiry1 == "10080")
    print "<option selected value=\"10080\">7 Days</option>\n";
  else
    print "<option value=\"10080\">7 Days</option>\n";
  if ($newexpiry1 == "43200")
    print "<option selected value=\"43200\">30 Days</option>\n";
  else
    print "<option value=\"43200\">30 Days</option>\n";
  if ($newexpiry1 == "525600")
    print "<option selected value=\"525600\">1 Year</option>\n";
  else
    print "<option value=\"525600\">1 Year</option>\n";
  if ($newexpiry1 == "0")
    print "<option selected value=\"0\">No Expiry</option>\n";
  else
    print "<option value=\"0\">No Expiry</option>\n";
  print "</select>\n";
  print "<font face=\"Arial\" size=\"2\">&nbsp;or&nbsp;<input type=\"text\" name=\"newexpiry2\" value=\"$newexpiry2\" maxlength=\"12\" size=\"15\">\n";
  print "&nbsp;minutes</font></p></td></tr>\n";
  print "<tr><td><p><font face=\"Arial\" size=\"2\">IP address</font></p></td><td><p>\n";
  print "<font face=\"Arial\"><span style=\"font-size:10pt;\"><input type=\"text\" name=\"i\" maxlength=\"15\" size=\"30\">\n";
  print "<select name=\"l\" size=\"1\">\n";
  print "  <option selected value=\"0\">Level 0 (off)</option>\n";
  print "  <option value=\"1\">Level 1</option>\n";
  print "  <option value=\"2\">Level 2</option>\n";
  print "  <option value=\"3\">Level 3</option>\n";
  print "  <option value=\"4\">Level 4</option>\n";
  print "</select>\n";
  print "</span></font></p></td></tr>\n";
  print "<tr><td><p><font face=\"Arial\" size=\"2\">Email address</font></p></td><td><p>\n";
  print "<font face=\"Arial\"><span style=\"font-size:10pt;\"><input type=\"text\" name=\"email\" size=\"30\">&nbsp; Leave blank to display links only</span></font></p></td></tr>\n";
  if ($Emails != "") {
    print "<tr><td><p><font face=\"Arial\" size=\"2\">Email Template</font></p></td>\n";
    print "<td><p><select name=\"t\" size=\"1\">\n";
    if ($EmailTemplate != "") {
      if ($t == "")
        print "<option selected value=\"\">" . linklokfilename($EmailTemplate) . "</option>\n";
      else
        print "<option value=\"\">" . linklokfilename($EmailTemplate) . "</option>\n";
    }
    $hDirectory = opendir("$Emails");
    if ($hDirectory != false) {
      while ($entryname = readdir($hDirectory)) {
        if (($entryname != ".") && ($entryname != "..") && ($entryname != ""))
          print "<option value=\"$entryname\">$entryname</option>";
      }
      closedir($hDirectory);
    }
    print "</select></p></td></tr>\n";
  }
  print "<tr><td><p><font face=\"Arial\"><span style=\"font-size:10pt;\">\n";
  print "&nbsp;</span></font></p></td>\n";
  print "<td><p align=\"right\"><font face=\"Arial\"><span style=\"font-size:10pt;\">\n";
  if ($email != "")
    print "Download links sent to $email&nbsp;&nbsp;";
  print "<input type=\"submit\" name=\"submit\" value=\"Submit\">\n";
  print "</span></font></p></td></tr></table></form>\n";
  print "<script language=\"JavaScript\">document.forms[0].f0.focus()</script>\n";
  print "</body></html>\n";
  exit;
}

function linklokurl($fname, $expiry, $dialog, $iplevel = 0)
{
  global $LinklokKey, $thispage, $ipaddr;
  if ($expiry != 0) {
    if (strlen($expiry) == 12)
      $expirytime = mktime(substr($expiry, 8, 2), substr($expiry, 10, 2), 0, substr($expiry, 4, 2), substr($expiry, 6, 2), substr($expiry, 0, 4), -1);
    else
      $expirytime = time() + ($expiry * 60);
  } else
    $expirytime = 0;
  $locs = explode(":", $fname);
  $plink = linkokGetSecureLink($locs[0], $locs[1], $expirytime, "LL_0", $ipaddr, $iplevel, $LinklokKey, $dialog, $thispage);
  print($plink);
}

function linklokurl_api($fname, $expiry, $dialog, $ip = "", $iplevel = 0)
{
  global $LinklokKey, $thispage, $NoExtraPath, $ipaddr;
  if ($ip == "")
    $ip = $ipaddr;
  if ($expiry != 0) {
    if (strlen($expiry) == 12)
      $expirytime = mktime(substr($expiry, 8, 2), substr($expiry, 10, 2), 0, substr($expiry, 4, 2), substr($expiry, 6, 2), substr($expiry, 0, 4), -1);
    else
      $expirytime = time() + ($expiry * 60);
  } else
    $expirytime = 0;
  $locs = explode(":", $fname);
  $plink = linkokGetSecureLink($locs[0], $locs[1], $expirytime, "LL_0", $ip, $iplevel, $LinklokKey, $dialog, $thispage);
  return ($plink);
}

function linklokemail($files, $expiry, $filter, $goto, $iplevel = 0, $temp = "")
{
  global $LinklokKey, $ipaddr;
  $created = (string) time();
  $fnames = explode(",", $files);
  $tohash = $LinklokKey;
  echo '<p><span style="color:red;" id="llurlmessage">&nbsp;</span><p>';
  for ($k = 0; $k < count($fnames); $k++) {
    $locs = explode(":", $fnames[$k]);
    print("<input name=\"f$k\" type=\"hidden\" value=\"$locs[0]\" >\n");
    print("<input name=\"l$k\" type=\"hidden\" value=\"$locs[1]\" >\n");
    $tohash .= $locs[0] . $locs[1];
  }
  print("<input name=\"x\" type=\"hidden\" value=\"$expiry\" >\n");
  $tohash .= $expiry;
  print("<input name=\"m\" type=\"hidden\" value=\"$filter\" >\n");
  $tohash .= $filter;
  print("<input name=\"l\" type=\"hidden\" value=\"$iplevel\" >\n");
  $tohash .= $iplevel;
  print("<input name=\"t\" type=\"hidden\" value=\"$temp\" >\n");
  $tohash .= $temp;
  print("<input name=\"c\" type=\"hidden\" value=\"$created\" >\n");
  $tohash .= $created;
  $hash = md5($tohash);
  print("<input name=\"g\" type=\"hidden\" value=\"$goto\" >\n");
  print("<input name=\"a\" type=\"hidden\" value=\"$hash\" >\n");
  print("<input name=\"linklokform\" type=\"hidden\" value=\"1\" >\n");
?>
  <style type="text/css">
    span#llurlspinner {
      display: none;
      box-sizing: content-box;
      float: right;
      height: 8px;
      width: 8px;
      margin-left: 5px;
      margin-right: 0px;
      margin-top: 0px;
      position: relative;
      -webkit-animation: rotation .6s infinite linear;
      -moz-animation: rotation .6s infinite linear;
      -o-animation: rotation .6s infinite linear;
      animation: rotation .6s infinite linear;
      border-left: 2px solid rgba(169, 169, 169, .3);
      border-right: 2px solid rgba(169, 169, 169, .3);
      border-bottom: 2px solid rgba(169, 169, 169, .3);
      border-top: 2px solid rgba(169, 169, 169, 1);
      border-radius: 100%;
    }

    @-webkit-keyframes rotation {
      from {
        -webkit-transform: rotate(0deg);
      }

      to {
        -webkit-transform: rotate(359deg);
      }
    }

    @-moz-keyframes rotation {
      from {
        -moz-transform: rotate(0deg);
      }

      to {
        -moz-transform: rotate(359deg);
      }
    }

    @-o-keyframes rotation {
      from {
        -o-transform: rotate(0deg);
      }

      to {
        -o-transform: rotate(359deg);
      }
    }

    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(359deg);
      }
    }
  </style>
  <script language="JavaScript">
    function llurlform(form) {
      var email = form.email.value;
      var llurlmessage = document.getElementById('llurlmessage');
      if (llurlmessage !== null)
        llurlmessage.innerHTML = '&nbsp;';
      if (!llurlvalidateemail(email)) {
        if (llurlmessage !== null)
          llurlmessage.innerHTML = 'Invalid email address';
        else
          alert('Invalid email address');
      }
      var llurlajaxavailable = false;
      if ((window.XMLHttpRequest) && (typeof JSON === "object"))
        llurlajaxavailable = true;
      if (llurlajaxavailable) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Handle callback
            document.getElementById('llurlsubmit').disabled = false;
            document.getElementById('llurlspinner').style['display'] = "none";
            var data = JSON.parse(xhttp.responseText);
            if (data.success) {
              if (data.redirect == '') {
                if (llurlturingimg != null) {
                  llurlturingimg.src = llurlturingimgsrc + "?t=" + Math.floor(Date.now());
                }
                form.turing.value = "";
                if (llurlmessage !== null)
                  llurlmessage.innerHTML = data.message;
                else
                  alert(data.message);
              } else {
                window.location = data.redirect;
              }
              return (false);
            } else {
              document.getElementById("llurlmessage").innerHTML = data.message;
              if (!Date.now) {
                Date.now = function() {
                  return new Date().getTime();
                };
              }
              if (llurlturingimg != null) {
                llurlturingimg.src = llurlturingimgsrc + "?t=" + Math.floor(Date.now());
              }
              form.turing.value = "";
              return (false);
            }
          }
        };
        // Serialize form
        var formData = llurl_serialize(form);
        formData += "&llurlajaxform=1";
        var slfrmact = form.action;
        if (slfrmact == "")
          slfrmact = window.location.href;
        document.getElementById('llurlsubmit').disabled = true;
        document.getElementById('llurlspinner').style['display'] = "block";
        xhttp.open("POST", slfrmact, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(formData);
        return (false);
      }
      return (true);
    }

    function llurl_serialize(form) {
      if (!form || form.nodeName !== "FORM") {
        return;
      }
      var i, j, q = [];
      for (i = form.elements.length - 1; i >= 0; i = i - 1) {
        if (form.elements[i].name === "") {
          continue;
        }
        switch (form.elements[i].nodeName) {
          case 'INPUT':
            switch (form.elements[i].type) {
              case 'text':
              case 'email':
              case 'number':
              case 'hidden':
              case 'password':
              case 'button':
              case 'reset':
              case 'submit':
                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                break;
              case 'checkbox':
              case 'radio':
                if (form.elements[i].checked) {
                  q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                }
                break;
              case 'file':
                break;
            }
            break;
          case 'TEXTAREA':
            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
            break;
          case 'SELECT':
            switch (form.elements[i].type) {
              case 'select-one':
                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                break;
              case 'select-multiple':
                for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                  if (form.elements[i].options[j].selected) {
                    q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
                  }
                }
                break;
            }
            break;
          case 'BUTTON':
            switch (form.elements[i].type) {
              case 'reset':
              case 'submit':
              case 'button':
                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                break;
            }
            break;
        }
      }
      return q.join("&");
    }

    function llurlvalidateemail(email) {
      var ck_email = /^([\w-\'!#$%&\*]+(?:\.[\w-\'!#$%&\*]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,20}(?:\.[a-z]{2})?)$/i;
      if (!ck_email.test(email))
        return (false);
      return (true);
    }
    var llurlturingimg = document.getElementById('llurlturingimg');
    if (llurlturingimg != null) {
      var llurlturingimgsrc = llurlturingimg.src;
      llurlturingimg.src = llurlturingimgsrc + "?t=" + Math.floor(Date.now());
    }
  </script>
<?php
}

function linklokemail_api($email, $files, $expiry, $ip = "", $iplevel = 0, $template = "")
{
  global $LinklokKey, $ipaddr, $Emails, $EmailTemplate;
  $fnames = explode(",", $files);
  for ($k = 0; $k < count($fnames); $k++) {
    $loc = explode(":", $fnames[$k]);
    $fnames[$k] = $loc[0];
    $floc[$k] = $loc[1];
  }
  if ($ip == "")
    $ip = $ipaddr;
  if ($template != "")
    $template = $Emails . $template;
  if (($template == "") && ($EmailTemplate != ""))
    $template = $EmailTemplate;
  if ($template == "") {
    $res = linklokSendEmail($email, $email, $expiry, $ip, $iplevel, $fnames, $floc);
    return ($res);
  } else {
    $res = linkloklinklokSendEmailUsingTemplate($email, $template, $email, $expiry, $ip, $iplevel, $fnames, $floc);
    return ($res);
  }
}

function linklokS3($fname, $loc, $expiry, $dialog = 0, $newname = "")
{
  global $LinklokLocation, $LinklokLocations;
  if ($loc == "")
    $link = $LinklokLocation . linklokfilenamepath($fname);
  else
    $link = $LinklokLocations[$loc] . linklokfilenamepath($fname);
  print linklokget_s3_url($link, time() + $expiry, "GET", $dialog, $newname);
}

function linklokDO($fname, $loc, $expiry, $dialog = 0, $newname = "")
{
  linklokS3($fname, $loc, $expiry, $dialog = 0, $newname);
}

function linklokB2($fname, $loc, $expiry, $dialog = 0, $newname = "")
{
  global $LinklokLocation, $LinklokLocations;
  if ($loc == "")
    $link = $LinklokLocation . linklokfilenamepath($fname);
  else
    $link = $LinklokLocations[$loc] . linklokfilenamepath($fname);
  print linklokget_b2_url($link, $expiry, $dialog, $newname);
}

function linklokGC($fname, $loc, $expiry, $dialog = 0, $newname = "")
{
  global $LinklokLocation, $LinklokLocations;
  if ($loc == "")
    $link = $LinklokLocation . linklokfilenamepath($fname);
  else
    $link = $LinklokLocations[$loc] . linklokfilenamepath($fname);
  print linklokget_gc_url($link, $expiry, "GET", $dialog, $newname);
}

function linklokgeoip()
{
  global $ipaddr;
  $info['ip'] = $ipaddr;
  $info['countrycode'] = "unknown";
  $info['countryname'] = "unknown";
  $info['continentcode'] = "unknown";
  $info['continentname'] = "unknown";
  if (function_exists('vl_geoip2'))
    $info = vl_geoip2($ipaddr);
  return ($info);
}

function linkokGetSecureLink($fname, $loc, $expirytime, $id, $ip, $ipl, $lkey, $dlog, $lurl)
{
  global $NoFilename, $DownloadURL, $ExtraPathFilename, $DownloadURLs;
  $auth = md5($lkey . $fname . $expirytime . $ip . $ipl . $id . $loc);
  $plink = $fname . "," . $expirytime . "," . $ip . "," . $ipl . "," . $dlog . "," . $id . "," . $loc . "," . $auth;
  $plink = base64_encode($plink);
  $plink = rawurlencode($plink);
  if ($DownloadURL != "")
    $lurl = $DownloadURL;
  if ($DownloadURLs[$loc] != "")
    $lurl = $DownloadURLs[$loc];
  // Get filename only
  $fnameonly = linklokaltfilename($fname);
  $fnameonly = basename($fnameonly);
  if ($ExtraPathFilename == 1)
    $plink = $lurl . "/" . $fnameonly . "?linklokauth=" . $plink;
  else
    $plink = $lurl . "?linklokauth=" . $plink;
  if ($NoFilename != 1)
    $plink .= "/" . $fnameonly;
  return ($plink);
}

function linklokgetfile($linklokauth)
{
  global $LinklokKey, $LinklokLocation, $ErrorTemplate, $ipaddr, $LinklokLocations, $NotifyDownloadEmail, $LinklokDownloadLog, $pdfwatermarkmaxsize;
  global $ServerTimeAdjust, $UseModXSendFile, $UseModXAccel;
  // Remove any /filename from end
  $pos = strrpos($linklokauth, "/");
  if (is_integer($pos))
    $linklokauth = substr($linklokauth, 0, $pos);
  // Split linklokauth into its parts
  $linklokauth = rawurldecode($linklokauth);
  $oldlink = false;
  if (is_integer(strpos($linklokauth, ",")))
    $oldlink = true;
  if ($oldlink == false) {
    $linklokauth = base64_decode($linklokauth);
  }
  $ip = "";
  $iplevel = "";
  $id = "";
  $loc = "";
  $fields = explode(",", $linklokauth);
  $fname = $fields[0];
  $expirytime = $fields[1];
  if (count($fields) == 4) {
    $dialog = $fields[2];
    $auth = $fields[3];
  }
  if (count($fields) == 6) {
    $ip = $fields[2];
    $iplevel = $fields[3];
    $dialog = $fields[4];
    $auth = $fields[5];
  }
  if (count($fields) == 8) {
    $ip = $fields[2];
    $iplevel = $fields[3];
    $dialog = $fields[4];
    $id = $fields[5];
    $loc = $fields[6];
    $auth = $fields[7];
  }
  // Verify hash value to ensure nothing tampered wth
  if (md5($LinklokKey . $fname . $expirytime . $ip . $iplevel . $id . $loc) != $auth) {
    linklokShowMessage($ErrorTemplate, "Linklok URL authentication failed");
    exit;
  }
  // Check link hasn't expired
  if ($expirytime != 0) {
    $curtime = time();
    if ($curtime > $expirytime) {
      linklokShowMessage($ErrorTemplate, "Sorry but this Linklok link has expired.\n");
      exit;
    }
  }
  if (($iplevel != 0) && ($ip != "0.0.0.0")) {
    $ipo[1] = strtok($ip, ".");
    $ipo[2] = strtok(".");
    $ipo[3] = strtok(".");
    $ipo[4] = strtok(".");
    $ipn[1] = strtok($ipaddr, ".");
    $ipn[2] = strtok(".");
    $ipn[3] = strtok(".");
    $ipn[4] = strtok(".");
    for ($k = 1; $k <= $iplevel; $k++) {
      if ($ipo[$k] != $ipn[$k]) {
        linklokShowMessage($ErrorTemplate, "Linklok link IP address is not valid.\n");
        exit;
      }
    }
  }
  // Make full path or url to file
  $actualfname = linklokaltfilename($fname);
  $fquery = linklokfilequery($fname);
  $ext = linklokfileextension(linklokfilenamepath($fname));
  // If $loc blank then use default location
  if ($loc == "")
    $link = $LinklokLocation . linklokfilenamepath($fname);
  else
    $link = $LinklokLocations[$loc] . linklokfilenamepath($fname);
  // If download path is for S3 then handle it now
  if ((substr(trim(strtolower($link)), 0, 3) == "s3|") || (substr(trim(strtolower($link)), 0, 3) == "do|")) {
    if ($NotifyDownloadEmail != "")
      linklokEmailDownloadNotify($actualfname, $id, trim(strtok($_SERVER['REMOTE_ADDR'], ",")), $expirytime);
    if ($LinklokDownloadLog != "")
      linkloklogdownload($LinklokDownloadLog, $actualfname, $id);
    $url = linklokget_s3_url($link, time() + $ServerTimeAdjust, "GET", $dialog, basename($actualfname));
    header("Location: " . $url);
    exit;
  }
  // If download path is for b2 then handle it now
  if (substr(trim(strtolower($link)), 0, 3) == "b2|") {
    if ($NotifyDownloadEmail != "")
      linklokEmailDownloadNotify($actualfname, $id, trim(strtok($_SERVER['REMOTE_ADDR'], ",")), $expirytime);
    if ($LinklokDownloadLog != "")
      linkloklogdownload($LinklokDownloadLog, $actualfname, $id);
    $url = linklokget_b2_url($link, $ServerTimeAdjust, $dialog, basename($actualfname));
    header("Location: " . $url);
    exit;
  }
  // If download path is for GC then handle it now
  if (substr(trim(strtolower($link)), 0, 3) == "gc|") {
    if ($NotifyDownloadEmail != "")
      linklokEmailDownloadNotify($actualfname, $id, trim(strtok($_SERVER['REMOTE_ADDR'], ",")), $expirytime);
    if ($LinklokDownloadLog != "")
      linkloklogdownload($LinklokDownloadLog, $actualfname, $id);
    $url = linklokget_gc_url($link, $ServerTimeAdjust, "GET", $dialog, basename($actualfname));
    header("Location: " . $url);
    exit;
  }
  // If download path is for cdn77 then handle it now
  if (substr(trim(strtolower($link)), 0, 6) == "cdn77|") {
    if ($NotifyDownloadEmail != "")
      linklokEmailDownloadNotify($actualfname, $id, trim(strtok($_SERVER['REMOTE_ADDR'], ",")), $expirytime);
    if ($LinklokDownloadLog != "")
      linkloklogdownload($LinklokDownloadLog, $actualfname, $id);
    $url = linklokget_cdn77_url($link, time() + $ServerTimeAdjust, "GET", $dialog, basename($actualfname));
    header("Location: " . $url);
    exit;
  }
  // If download path is for Dropbox then handle it now
  if (substr(trim(strtolower($link)), 0, 3) == "db|") {
    if ($NotifyDownloadEmail != "")
      linklokEmailDownloadNotify($actualfname, $id, trim(strtok($_SERVER['REMOTE_ADDR'], ",")), $expirytime);
    if ($LinklokDownloadLog != "")
      linkloklogdownload($LinklokDownloadLog, $actualfname, $id);
    $url = linklokget_db_url($link, $dialog, basename($actualfname));
    header("Location: " . $url);
    exit;
  }
  // If PDFWATERMARK set and file size ok then handle watermarking here
  if (($ext == ".pdf") && (function_exists('ll_pdfwatermark')) && ($id != "LL_0") && ($id != "LL_1") && (@filesize($link) <= $pdfwatermarkmaxsize)) {
    if ($NotifyDownloadEmail != "")
      linklokEmailDownloadNotify($actualfname, $id, trim(strtok($_SERVER['REMOTE_ADDR'], ",")), $expirytime);
    ll_pdfwatermark($link, $id, "", "", "");
    exit;
  }
  // If download link is html or php page then just include it.
  if (($ext == ".php") || ($ext == ".html") || ($ext == ".htm")) {
    if ($NotifyDownloadEmail != "")
      linklokEmailDownloadNotify($actualfname, $id, trim(strtok($_SERVER['REMOTE_ADDR'], ",")), $expirytime);
    if ($LinklokDownloadLog != "")
      linkloklogdownload($LinklokDownloadLog, $actualfname, $id);
    // If there are any GET variables in the filename then set those in $_GET and $_REQUEST
    if ($fquery != "") {
      $fvars = explode("&", $fquery);
      for ($k = 0; $k < count($fvars); $k++) {
        $fvar = strtok($fvars[$k], "=");
        $fval = strtok("=");
        if ($fvar != "") {
          $_GET[$fvar] = $fval;
          $_REQUEST[$fvar] = $fval;
        }
      }
    }
    include($link);
    exit;
  }
  // Check file exists
  if (!($fh = @fopen($link, "rb"))) {
    linklokShowMessage($ErrorTemplate, "Linklok could not open the file.");
    exit;
  }
  fclose($fh);
  $mimetype = linklokgetmimetype($link);
  if ($dialog == 1)
    header("Content-disposition: attachment; filename=\"" . basename($actualfname) . "\"\n");
  else
    header("Content-disposition: inline; filename=\"" . basename($actualfname) . "\"\n");
  if ($mimetype != "")
    header("Content-type: " . $mimetype . "\n");
  else
    header("Content-type: application/octet-stream\n");
  if ($UseModXSendFile == 1) {
    header('X-Sendfile: ' . $link);
    exit;
  }
  if ($UseModXAccel == 1) {
    header('X-Accel-Redirect: ' . $link);
    exit;
  }
  header("Content-transfer-encoding: binary\n");

  // See if link is local path or URL
  $pos = strpos(strtolower($link), "http://");
  $pos2 = strpos(strtolower($link), "ftp://");
  if ((!is_integer($pos)) && (!is_integer($pos2))) {
    // If link is a local path then get local path and handle resume & download managers
    $fsize = @ffilesize($link);
    /* is resume requested? */
    if (isset($_SERVER['HTTP_RANGE'])) {
      linklokrangeDownload($link);
    } else {
      $size = @ffilesize($link);
      if (!($fh = @fopen($link, "rb"))) {
        linklokShowMessage($ErrorTemplate, "Linklok could not open the file.");
        exit;
      }
      header("Accept-Ranges: bytes");
      if ((strtolower(ini_get('zlib.output_compression')) != "on") && (ini_get('zlib.output_compression') != "1"))
        header("Content-Length: " . $size . "\n");
      if ($NotifyDownloadEmail != "")
        linklokEmailDownloadNotify($actualfname, $id, trim(strtok($_SERVER['REMOTE_ADDR'], ",")), $expirytime);
      if ($LinklokDownloadLog != "")
        linkloklogdownload($LinklokDownloadLog, $actualfname, $id);
      @linklokxfpassthru($fh);
    }
  } else {
    // link is a URL rather than local path so do simple download
    $link = str_replace(" ", "%20", $link);
    if (is_integer($pos))
      $size = linklokfilesize_remote($link);
    else
      $size = @ffilesize($link);
    if (!($fh = @fopen($link, "rb"))) {
      linklokShowMessage($ErrorTemplate, "Linklok could not open the file.");
      exit;
    }
    if ($NotifyDownloadEmail != "")
      linklokEmailDownloadNotify($actualfname, $id, trim(strtok($_SERVER['REMOTE_ADDR'], ",")), $expirytime);
    if ($LinklokDownloadLog != "")
      linkloklogdownload($LinklokDownloadLog, $actualfname, $id);
    $mimetype = linklokgetmimetype($link);
    if ((strtolower(ini_get('zlib.output_compression')) != "on") && (ini_get('zlib.output_compression') != "1")) {
      if ((int) $size > 0)
        header("Content-Length: " . $size . "\n");
    }
    @linklokxfpassthru($fh);
  }
  exit;
}

function linklokrangeDownload($file)
{
  global $actualfname, $id, $expirytime, $NotifyDownloadEmail, $downloadbuffer;
  $fp = @fopen($file, 'rb');
  $size   = ffilesize($file); // File size
  $length = $size;           // Content length
  $start  = 0;               // Start byte
  $end    = $size - 1;       // End byte
  /* Multiple ranges requires some more work to ensure it works correctly
   * and comply with the specifications: http://www.w3.org/Protocols/rfc2616/rfc2616-sec19.html#sec19.2
   *
   * Multirange support annouces itself with:
   * header('Accept-Ranges: bytes');
   *
   * Multirange content must be sent with multipart/byteranges mediatype,
   * (mediatype = mimetype)
   * as well as a boundry header to indicate the various chunks of data.
   */
  //  header("Accept-Ranges: 0-$length");
  header("Accept-Ranges: bytes");
  // header('Accept-Ranges: bytes');
  // multipart/byteranges
  // http://www.w3.org/Protocols/rfc2616/rfc2616-sec19.html#sec19.2
  if (isset($_SERVER['HTTP_RANGE'])) {

    $c_start = $start;
    $c_end   = $end;
    // Extract the range string
    list(, $range) = explode('=', $_SERVER['HTTP_RANGE'], 2);
    // Make sure the client hasn't sent us a multibyte range
    if (strpos($range, ',') !== false) {

      // (?) Shoud this be issued here, or should the first
      // range be used? Or should the header be ignored and
      // we output the whole content?
      header('HTTP/1.1 416 Requested Range Not Satisfiable');
      header("Content-Range: bytes $start-$end/$size");
      // (?) Echo some info to the client?
      exit;
    }
    // If the range starts with an '-' we start from the beginning
    // If not, we forward the file pointer
    // And make sure to get the end byte if specified
    if ($range0 == '-') {
      if ($NotifyDownloadEmail != "")
        linklokEmailDownloadNotify($actualfname, $id, trim(strtok($_SERVER['REMOTE_ADDR'], ",")), $expirytime);
      // The n-number of the last bytes is requested
      $c_start = $size - substr($range, 1);
    } else {

      $range  = explode('-', $range);
      $c_start = $range[0];
      $c_end   = (isset($range[1]) && is_numeric($range[1])) ? $range[1] : $size;
    }
    /* Check the range and make sure it's treated according to the specs.
     * http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html
     */
    // End bytes can not be larger than $end.
    $c_end = ($c_end > $end) ? $end : $c_end;
    // Validate the requested range and return an error if it's not correct.
    if ($c_start > $c_end || $c_start > $size - 1 || $c_end >= $size) {

      header('HTTP/1.1 416 Requested Range Not Satisfiable');
      header("Content-Range: bytes $start-$end/$size");
      // (?) Echo some info to the client?
      exit;
    }
    $start  = $c_start;
    $end    = $c_end;
    $length = $end - $start + 1; // Calculate new content length
    fseek($fp, $start);
    header('HTTP/1.1 206 Partial Content');
  }
  // Notify the client the byte range we'll be outputting
  header("Content-Range: bytes $start-$end/$size");
  header("Content-Length: $length");
  // Start buffered download
  if ($downloadbuffer > 0)
    $buffer = $downloadbuffer;
  else
    $buffer = 1024 * 8;
  @set_time_limit(86400);
  while (!feof($fp) && ($p = ftell($fp)) <= $end) {

    if ($p + $buffer > $end) {

      // In case we're only outputtin a chunk, make sure we don't
      // read past the length
      $buffer = $end - $p + 1;
    }
    echo fread($fp, $buffer);
    ob_flush();
    flush(); // Free up memory. Otherwise large files will trigger PHP's memory limit.
    if ($downloadbuffer > 0)
      sleep(1);
  }
  fclose($fp);
}

function linklokemaillinks($freem)
{
  global $LinklokKey, $EmailTemplate, $YourCompany, $YourEmail, $LinklokLog, $NoExtraPath, $ManualPassword;
  global $LinklokLocation, $LinklokLocations, $ErrorTemplate, $ipaddr, $Emails;
  global $NotifyEmail, $NotifyTemplate, $FormExpire;
  global $AllowEmailOnce, $AllowIPOnce, $RequireTuring, $turing, $manualentryused;
  global $AWeberList, $getresponsecampaign, $mailchimplistid, $arpreachurl, $llurlgroup, $DateFormat;
  $llurlajaxform = (isset($_POST["llurlajaxform"]) ? $_POST["llurlajaxform"] : "0");
  $tohash = $LinklokKey;
  // Get list of allowed files
  for ($k = 0; $k < 1000; $k++) {
    $fvar = "f" . $k;
    $lvar = "l" . $k;
    if ((isset($_REQUEST[$fvar])) && ($_REQUEST[$fvar] != "")) {
      $fname[] = $_REQUEST[$fvar];
      $tohash .= $fname[$k];
      $floc[] = $_REQUEST[$lvar];
      $tohash .= $floc[$k];
    }
  }
  // See if only certain files were selected
  $selectedfiles = false;
  for ($k = 0; $k < 1000; $k++) {
    $fvar = "file" . $k;
    if (isset($_REQUEST[$fvar])) {
      $locs = explode(":", $_REQUEST[$fvar]);
      // Check if filename is in approved list
      $index = array_search($locs[0], $fname);
      if (is_integer($index)) {
        if ($floc[$index] == $locs[1]) {
          $selectedfiles = true;
          $fnametosend[] = $locs[0];
          $floctosend[] = $locs[1];
        }
      }
    }
  }
  if (!$selectedfiles) {
    for ($k = 0; $k < count($fname); $k++) {
      $fnametosend[] = $fname[$k];
      $floctosend[] = $floc[$k];
    }
  }

  if (isset($_REQUEST['x'])) {
    $expiry = $_REQUEST['x'];
    $tohash .= $expiry;
  }
  if (isset($_REQUEST['m'])) {
    $filter = $_REQUEST['m'];
    $tohash .= $filter;
  }
  if (isset($_REQUEST['l'])) {
    $iplevel = $_REQUEST['l'];
    $tohash .= $iplevel;
  }
  if (isset($_REQUEST['t'])) {
    $template = $_REQUEST['t'];
    $tohash .= $template;
  }
  if (isset($_REQUEST['c'])) {
    $created = $_REQUEST['c'];
    $tohash .= $created;
  }
  if (isset($_REQUEST['email']))
    $clientemail = trim($_REQUEST['email']);
  // See if multiple emails entered if allowed
  global $allowmultipleemails;
  $clientemailarray = array();
  if ($allowmultipleemails == true) {
    if (is_integer(strpos($clientemail, ",")))
      $clientemailarray = explode(",", $clientemail);
    else
    if (is_integer(strpos($clientemail, "\n")))
      $clientemailarray = explode("\n", $clientemail);
    for ($k = 0; $k < count($clientemailarray); $k++)
      $clientemailarray[$k] = trim($clientemailarray[$k]);
  }
  if (isset($_REQUEST['turing']))
    $turing = $_REQUEST['turing'];
  $goto = "";
  if (isset($_REQUEST['g']))
    $goto = $_REQUEST['g'];
  if (isset($_REQUEST['a']))
    $auth = $_REQUEST['a'];
  // See if called from the manual entry form  
  $manualentryused = false;
  if (($auth == $ManualPassword) && ($ManualPassword != "")) {
    $manualentryused = true;
  }
  if ((count($clientemailarray) > 1) && ($allowmultipleemails)) {
    for ($k = 0; $k < count($clientemailarray); $k++) {
      // Check email address entered is valid
      if (!linklokvalidemail($clientemailarray[$k])) {
        if ($llurlajaxform)
          llurl_ajaxReturn(false, 'Please enter valid email addresses', '');
        else
          linklokShowMessage($ErrorTemplate, "Please enter valid email addresses.<BR><BR>Click your browsers BACK button and try again.");
        exit;
      }
    }
  } else {
    // Check email address entered is valid
    if (!linklokvalidemail($clientemail)) {
      if ($llurlajaxform)
        llurl_ajaxReturn(false, 'Please enter valid email addresses', '');
      else
        linklokShowMessage($ErrorTemplate, "Please enter a valid email address.<BR><BR>Click your browsers BACK button and try again.");
      exit;
    }
  }
  // if filter set to 1 then block free email services listed above
  if ($filter == "1") {
    if ((count($clientemailarray) > 1) && ($allowmultipleemails)) {
      for ($k = 0; $k < count($clientemailarray); $k++) {
        for ($j = 0; $j < count($freem); $j++) {
          $pos = strpos(strtolower($clientemailarray[$k]), strtolower($freem[$j]));
          if (is_integer($pos)) {
            if ($llurlajaxform)
              llurl_ajaxReturn(false, 'Linklok does not accept free email addresses', '');
            else
              linklokShowMessage($ErrorTemplate, "Linklok does not accept free email addresses.<BR><BR>Click your browsers BACK button and try again.");
            exit;
          }
        }
      }
    } else {
      for ($k = 0; $k < count($freem); $k++) {
        $pos = strpos(strtolower($clientemail), strtolower($freem[$k]));
        if (is_integer($pos)) {
          if ($llurlajaxform)
            llurl_ajaxReturn(false, 'Linklok does not accept free email addresses', '');
          else
            linklokShowMessage($ErrorTemplate, "Linklok does not accept free email addresses.<BR><BR>Click your browsers BACK button and try again.");
          exit;
        }
      }
    }
  }
  // If required check turing code (unless called from the manual entry form
  if (($RequireTuring == 1) && ($manualentryused == false)) {
    session_start();
    $turingmatch = false;
    if ((strtolower($_SESSION['ses_llurlturingcode']) == strtolower(trim($turing))) && ($_SESSION['ses_llurlturingcode'] != "")) {
      $turingmatch = true;
      $_SESSION['ses_llurlturingcode'] = "";
    } else if ((strtolower($_SESSION['ses_llurlpreviousturingcode']) == strtolower(trim($turing))) && ($_SESSION['ses_llurlpreviousturingcode'] != "")) {
      $turingmatch = true;
      $_SESSION['ses_llurlpreviousturingcode'] = "";
    }
    if (!$turingmatch) {
      if ($llurlajaxform)
        llurl_ajaxReturn(false, 'The CAPTCHA code entered was not correct', '');
      else
        linklokShowMessage($ErrorTemplate, "The turing (CAPTCHA)code entered was not correct.<BR><BR>Click your browsers BACK button and try again.");
      exit;
    }
  }
  // See if template specified in function call to overide default
  if ($template != "")
    $template = $Emails . $template;
  if (($template == "") && ($EmailTemplate != ""))
    $template = $EmailTemplate;
  // if required block if email address is already listed in log file within the days specified
  if (($LinklokLog != "") && ((isset($AllowEmailOnce)) || (isset($AllowIPOnce)))) {
    $limitemailtimestamp = mktime() - ($AllowEmailOnce * 24 * 60 * 60);
    $limitiptimestamp = mktime() - ($AllowIPOnce * 24 * 60 * 60);
    $testemail = strtolower($clientemail);
    $fh = @fopen($LinklokLog, "r");
    if ($fh) {
      while (!feof($fh)) {
        $lne = fgets($fh, 2048);
        $lne = strtolower($lne);
        if (is_integer(strpos($lne, $testemail))) {
          $lnearray = explode(",", $lne);
          $entrytimestamp = mktime(substr($lnearray[3], 0, 2), substr($lnearray[3], 3, 2), substr($lnearray[3], 6, 2), substr($lnearray[1], 3, 2), substr($lnearray[1], 0, 2), substr($lnearray[1], 6, 2));
          if ((isset($AllowEmailOnce)) && ($entrytimestamp > $limitemailtimestamp)) {
            if ($llurlajaxform)
              llurl_ajaxReturn(false, 'This email address has already been used', '');
            else
              linklokShowMessage($ErrorTemplate, "This email address has already been used.");
            exit;
          }
        }
        if (is_integer(strpos($lne, $ipaddr))) {
          $lnearray = explode(",", $lne);
          $entrytimestamp = mktime(substr($lnearray[3], 0, 2), substr($lnearray[3], 3, 2), substr($lnearray[3], 6, 2), substr($lnearray[1], 3, 2), substr($lnearray[1], 0, 2), substr($lnearray[1], 6, 2));
          if ((isset($AllowIPOnce)) && ($entrytimestamp > $limitiptimestamp)) {
            if ($llurlajaxform)
              llurl_ajaxReturn(false, 'This IP address has already been used', '');
            else
              linklokShowMessage($ErrorTemplate, "This IP address has already been used.");
            exit;
          }
        }
      }
      fclose($fh);
    }
  }

  // See if Promotion  limits are being used
  global $PromotionExpiry, $PromotionLimit, $PromotionPeriod, $PromotionRedirect, $PromotionEmailTemplate, $PromotionFile;
  if (isset($PromotionLimit)) {
    // See if promotion period has expired. If so update email template and redirect page
    if ($PromotionExpiry != "") {
      $promexpts = mktime(substr($PromotionExpiry, 8, 2), substr($PromotionExpiry, 10, 2), 0, substr($PromotionExpiry, 4, 2), substr($PromotionExpiry, 6, 2), substr($PromotionExpiry, 0, 4));
      if (time() > $promexpts) {
        $template = $PromotionEmailTemplate;
        $goto = $PromotionRedirect;
      }
    }
    // See how many entries in log for $PromotionFile for previous $PromotionPeriod days including today
    if (($PromotionPeriod > 0) && ($PromotionLimit > 0) && ($PromotionFile != "")) {
      $earliestts = mktime(0, 0, 1, date("n"), date("j"), date("Y")) - (($PromotionPeriod - 1) * 86400);
      $promcount = 0;
      $fh = @fopen($LinklokLog, "r");
      if ($fh) {
        while (!feof($fh)) {
          $lne = fgets($fh, 2048);
          $lne = strtolower($lne);
          if (is_integer(strpos($lne, strtolower($PromotionFile)))) {
            $lnearray = explode(",", $lne);
            $entrytimestamp = mktime(substr($lnearray[3], 0, 2), substr($lnearray[3], 3, 2), substr($lnearray[3], 6, 2), substr($lnearray[1], 3, 2), substr($lnearray[1], 0, 2), substr($lnearray[1], 6, 2));
            if ($entrytimestamp >= $earliestts)
              $promcount++;
            if ($promcount == $PromotionLimit)
              break;
          }
        }
      }
      if ($promcount >= $PromotionLimit) {
        $template = $PromotionEmailTemplate;
        $goto = $PromotionRedirect;
      }
    }
  }
  // End of promotion limit check
  $hash = md5($tohash);
  // If manual order password then override hash check
  if ($manualentryused) {
    $hash = $auth;
    if (isset($_REQUEST['i']))
      $ipaddr = $_REQUEST['i'];
  }
  if ($hash != $auth) {
    if ($llurlajaxform)
      llurl_ajaxReturn(false, 'Linklok form authentication failed', '');
    else
      linklokShowMessage($ErrorTemplate, "Linklok form authentication failed");
    exit;
  }
  if ($FormExpire > 0) {
    if (time() > ($created + 60 * $FormExpire)) {
      if ($llurlajaxform)
        llurl_ajaxReturn(false, 'Linklok form has expired', '');
      else
        linklokShowMessage($ErrorTemplate, "Linklok form has expired");
      exit;
    }
  }
  // Now send email with download links to client
  if ($template == "") {
    if ((count($clientemailarray) > 1) && ($allowmultipleemails)) {
      for ($k = 0; $k < count($clientemailarray); $k++) {
        $res = linklokSendEmail($clientemailarray[$k], $clientemailarray[$k], $expiry, $ipaddr, $iplevel, $fnametosend, $floctosend);
        if ($res != true) {
          if ($llurlajaxform)
            llurl_ajaxReturn(false, 'Email could not be sent', '');
          else
            linklokShowMessage($ErrorTemplate, "Email could not be sent");
          exit;
        }
      }
    } else {
      $res = linklokSendEmail($clientemail, $clientemail, $expiry, $ipaddr, $iplevel, $fnametosend, $floctosend);
      if ($res != true) {
        if ($llurlajaxform)
          llurl_ajaxReturn(false, 'Email could not be sent', '');
        else
          linklokShowMessage($ErrorTemplate, "Email could not be sent");
        exit;
      }
    }
  } else {
    if ((count($clientemailarray) > 1) && ($allowmultipleemails)) {
      for ($k = 0; $k < count($clientemailarray); $k++) {
        $res = linkloklinklokSendEmailUsingTemplate($clientemailarray[$k], $template, $clientemailarray[$k], $expiry, $ipaddr, $iplevel, $fnametosend, $floctosend);
        if ($res != true) {
          if ($llurlajaxform)
            llurl_ajaxReturn(false, 'Email could not be sent', '');
          else
            linklokShowMessage($ErrorTemplate, "Email could not be sent");
          exit;
        }
      }
    } else {
      $res = linkloklinklokSendEmailUsingTemplate($clientemail, $template, $clientemail, $expiry, $ipaddr, $iplevel, $fnametosend, $floctosend);
      if ($res != true) {
        if ($llurlajaxform)
          llurl_ajaxReturn(false, 'Email could not be sent', '');
        else
          linklokShowMessage($ErrorTemplate, "Email could not be sent");
        exit;
      }
    }
  }
  // If manual form entry then don't send email to site, log entry or call AWeber etc.
  if ($manualentryused == True)
    return;
  // Send email to site with form details
  if ($NotifyEmail == "")
    $NotifyEmail = $YourEmail;
  if ($NotifyEmail != "") {
    if (($NotifyEmail != "") && (strtolower($NotifyEmail) != "none") && ($NotifyTemplate == "")) {
      if (function_exists('vl_geoip2'))
        $clientipinfo = vl_geoip2($ipaddr);
      $subject = "Website download request";
      $mailBody = "The following files were requested.\n\n";
      for ($k = 0; $k < count($fnametosend); $k++) {
        $mailBody .= $fnametosend[$k];
        if ($floctosend[$k] != "")
          $mailBody .= " from " . $floctosend[$k];
        $mailBody .= "\n";
      }
      $mailBody .= "\nData from other form fields:-\n\n";
      if (!empty($_GET)) {
        foreach ($_GET as $namepair => $valuepair) {
          $$namepair = $valuepair;
          if ((strlen($namepair) > 2) && ($namepair != "linklokform") && ($namepair != "turing"))
            $mailBody .= $namepair . " : " . $valuepair . "\n";
        }
      }
      if (!empty($_POST)) {
        foreach ($_POST as $namepair => $valuepair) {
          $$namepair = $valuepair;
          if ((strlen($namepair) > 2) && ($namepair != "linklokform") && ($namepair != "turing"))
            $mailBody .= $namepair . " : " . $valuepair . "\n";
        }
      }
      if (function_exists('vl_geoip2'))
        $mailBody .= "IP : " . $ipaddr . " (" . $clientipinfo['countryname'] . ")\n";
      else
        $mailBody .= "IP : " . $ipaddr . "\n";
      $mailBody .= "\n";
      linklokSendEmailOut($NotifyEmail, $NotifyEmail, $YourCompany, $subject, $mailBody, "N");
    } else {
      $res = linkloklinklokSendEmailUsingTemplate($NotifyEmail, $NotifyTemplate, $clientemail, $expiry, $ipaddr, $iplevel, $fnametosend, $floctosend);
      if ($res != true) {
        if ($llurlajaxform)
          llurl_ajaxReturn(false, 'Email could not be sent', '');
        else
          linklokShowMessage($ErrorTemplate, "Email could not be sent");
        exit;
      }
    }
  }
  // if Logfile required add a line to it containing details of this request
  if ($LinklokLog != "") {
    if (is_writeable($LinklokLog)) {
      $fh = @fopen($LinklokLog, "a");
      if ($fh) {
        $logstr = "Date," . date("d/m/y") . ",Time," . date("H:i:s") . ",IP," . $ipaddr; // Date,time,IP
        // Add filenames File0,test.zip,File1,demo.pdf etc
        for ($k = 0; $k < count($fnametosend); $k++) {
          $logstr .= ",File" . $k . "," . $fnametosend[$k];
          if ($floctosend[$k] != "")
            $logstr .= ":" . $floctosend[$k];
        }
        // Add other form fields Name,Adrian,Email,test@mysite.com etc
        if (!empty($_GET)) {
          foreach ($_GET as $namepair => $valuepair) {
            $$namepair = $valuepair;
            if ((strlen($namepair) > 2) && ($namepair != "linklokform") && ($namepair != "turing") && (!preg_match("/^f[0-9]*$/", $namepair)) && (!preg_match("/^l[0-9]*$/", $namepair)))
              $logstr .= "," . $namepair . "," . $valuepair;
          }
        }
        if (!empty($_POST)) {
          foreach ($_POST as $namepair => $valuepair) {
            $$namepair = $valuepair;
            if ((strlen($namepair) > 2) && ($namepair != "linklokform") && ($namepair != "turing") && (!preg_match("/^f[0-9]*$/", $namepair)) && (!preg_match("/^l[0-9]*$/", $namepair)))
              $logstr .= "," . $namepair . "," . $valuepair;
          }
        }
        $logstr .= "\n";
        fputs($fh, $logstr);
        fclose($fh);
      }
    }
  }
  // See if we need to add or update user in Sitelok
  if (($llurlgroup != "") || ((isset($_REQUEST['sl'])) && ($_REQUEST['sl'] != ""))) {
    $groupstouse = array();
    // Get array of allowed groups
    $groupsallowed = explode(",", $llurlgroup);
    if ((isset($_REQUEST['sl'])) && ($_REQUEST['sl'] != "")) {
      $groups = strtok($_REQUEST['sl'], "|");
      if (md5($LinklokKey . $groups) == strtok("|")) {
        $llurlgroupoverride = substr($_REQUEST['sl'], 0, strpos($_REQUEST['sl'], "|"));
        $groupsallowed = explode(",", $llurlgroupoverride);
      }
    }
    for ($k = 0; $k < count($groupsallowed); $k++)
      $groupsallowed[$k] = trim($groupsallowed[$k]);
    // See if only usergroups were selected
    $selectedgroups = false;
    for ($k = 1; $k < 1000; $k++) {
      $gvar = "slgroup" . $k;
      if (isset($_REQUEST[$gvar])) {
        // Check if group is in approved list
        $index = array_search($_REQUEST[$gvar], $groupsallowed);
        if (is_integer($index)) {
          if ($floc[$index] == $locs[1]) {
            $selectedgroups = true;
            $groupstouse[] = $_REQUEST[$gvar];
          }
        }
      }
    }
    if (!$selectedgroups) {
      for ($k = 0; $k < count($groupsallowed); $k++)
        $groupstouse[] = $groupsallowed[$k];
    }
    if (count($groupstouse) > 0) {
      if ((count($clientemailarray) > 1) && ($allowmultipleemails))
        $clientemail = $clientemailarray[0];
      if ((linklokvalidemail($clientemail)) && (isset($_REQUEST['name'])) && ($_REQUEST['name'] != "")) {
        $username = "";
        $exists = 0;
        if ((isset($_REQUEST['username']) && ($_REQUEST['username'] != "")))
          $username = $_REQUEST['username'];
        // See if user already exists  
        if ($username != "") {
          $exists = slapi_getuser(
            $username,
            $created,
            $pass,
            $en,
            $nm,
            $em,
            $ugs,
            $cus1,
            $cus2,
            $cus3,
            $cus4,
            $cus5,
            $cus6,
            $cus7,
            $cus8,
            $cus9,
            $cus10,
            $cus11,
            $cus12,
            $cus13,
            $cus14,
            $cus15,
            $cus16,
            $cus17,
            $cus18,
            $cus19,
            $cus20,
            $cus21,
            $cus22,
            $cus23,
            $cus24,
            $cus25,
            $cus26,
            $cus27,
            $cus28,
            $cus29,
            $cus30,
            $cus31,
            $cus32,
            $cus33,
            $cus34,
            $cus35,
            $cus36,
            $cus37,
            $cus38,
            $cus39,
            $cus40,
            $cus41,
            $cus42,
            $cus43,
            $cus44,
            $cus45,
            $cus46,
            $cus47,
            $cus48,
            $cus49,
            $cus50
          );
        } else {
          $username = $clientemail;
          // check if email as username exists
          $exists = slapi_getuser(
            $clientemail,
            $created,
            $pass,
            $en,
            $nm,
            $em,
            $ugs,
            $cus1,
            $cus2,
            $cus3,
            $cus4,
            $cus5,
            $cus6,
            $cus7,
            $cus8,
            $cus9,
            $cus10,
            $cus11,
            $cus12,
            $cus13,
            $cus14,
            $cus15,
            $cus16,
            $cus17,
            $cus18,
            $cus19,
            $cus20,
            $cus21,
            $cus22,
            $cus23,
            $cus24,
            $cus25,
            $cus26,
            $cus27,
            $cus28,
            $cus29,
            $cus30,
            $cus31,
            $cus32,
            $cus33,
            $cus34,
            $cus35,
            $cus36,
            $cus37,
            $cus38,
            $cus39,
            $cus40,
            $cus41,
            $cus42,
            $cus43,
            $cus44,
            $cus45,
            $cus46,
            $cus47,
            $cus48,
            $cus49,
            $cus50
          );
          if ($exists == 0) {
            // check if email exists         
            $usernamearray = slapi_getusernamefromemail($clientemail);
            if ($usernamearray !== false) {
              $username = $usernamearray[0];
              $exists = slapi_getuser(
                $username,
                $created,
                $pass,
                $en,
                $nm,
                $em,
                $ugs,
                $cus1,
                $cus2,
                $cus3,
                $cus4,
                $cus5,
                $cus6,
                $cus7,
                $cus8,
                $cus9,
                $cus10,
                $cus11,
                $cus12,
                $cus13,
                $cus14,
                $cus15,
                $cus16,
                $cus17,
                $cus18,
                $cus19,
                $cus20,
                $cus21,
                $cus22,
                $cus23,
                $cus24,
                $cus25,
                $cus26,
                $cus27,
                $cus28,
                $cus29,
                $cus30,
                $cus31,
                $cus32,
                $cus33,
                $cus34,
                $cus35,
                $cus36,
                $cus37,
                $cus38,
                $cus39,
                $cus40,
                $cus41,
                $cus42,
                $cus43,
                $cus44,
                $cus45,
                $cus46,
                $cus47,
                $cus48,
                $cus49,
                $cus50
              );
            }
          }
        }
        if ($exists == 1) {
          for ($k = 0; $k < count($sc); $k++) {
            if ($sc[$k] != "") {
              $field = strtok($sc[$k], "|");
              $cusnum = strtok("|");
              $append = strtok("|");
              if (md5($LinklokKey . $field . $cusnum . $append) == strtok("|")) {
                $var = "cus" . $cusnum;
                if ($field == "files") {
                  $data = "";
                  for ($k = 0; $k < count($fnametosend); $k++) {
                    if ($data != "")
                      $data .= ",";
                    $data .= $fnametosend[$k];
                  }
                } else
                  $data = $_REQUEST[$field];
                if ($append) {
                  if ($$var != "")
                    $$var .= ",";
                  $$var .= $data;
                } else
                  $$var = $data;
              }
            }
          }
          $nm = $_REQUEST['name'];
          $em = $clientemail;
          $groups = array();
          $groupexpiry = array();
          for ($k = 0; $k < count($groupstouse); $k++) {
            $groups[$k] = strtok($groupstouse[$k], ":");
            $groupexpiry[$k] = strtok(":");
          }
          $modgroups = "";
          $groupstrs = explode("^", $ugs);
          for ($k = 0; $k < count($groupstrs); $k++) {
            $groupsarray[$k] = strtok($groupstrs[$k], ":");
            $expiriesarray[$k] = trim(strtok(":"));
          }
          // Update expiry dates for groups that already exist for this user
          for ($j = 0; $j < count($groupsarray); $j++) {
            for ($k = 0; $k < count($groups); $k++) {
              $found = false;
              if ($groups[$k] == $groupsarray[$j]) {
                $found = true;
                if ($modgroups != "")
                  $modgroups .= "^";
                $groupexpirystr = sl_adjustexpirydate($expiriesarray[$j], $groupexpiry[$k], $DateFormat, true);
                $modgroups .= $groups[$k];
                if ($groupexpirystr != "")
                  $modgroups .= ":" . $groupexpirystr;
                break;
              }
            }
            if (!$found) {
              if ($modgroups != "")
                $modgroups .= "^";
              $modgroups .= $groupsarray[$j];
              if ($expiriesarray[$j] != "")
                $modgroups .= ":" . $expiriesarray[$j];
            }
          }
          // Add any new groups for this user
          for ($k = 0; $k < count($groups); $k++) {
            if ($groups[$k] != "") {
              $found = 0;
              for ($j = 0; $j < count($groupsarray); $j++) {
                if ($groups[$k] == $groupsarray[$j]) {
                  $found = 1;
                  break;
                }
              }
              if ($found == 0) {
                if ($modgroups != "")
                  $modgroups .= "^";
                $groupexpirystr = sl_adjustexpirydate("", $groupexpiry[$k], $DateFormat, false);
                $modgroups .= $groups[$k];
                if ($groupexpirystr != "")
                  $modgroups .= ":" . $groupexpirystr;
              }
            }
          }
          slapi_modifyuser(
            $username,
            $pass,
            $en,
            $nm,
            $em,
            $modgroups,
            "",
            "",
            1,
            $cus1,
            $cus2,
            $cus3,
            $cus4,
            $cus5,
            $cus6,
            $cus7,
            $cus8,
            $cus9,
            $cus10,
            $cus11,
            $cus12,
            $cus13,
            $cus14,
            $cus15,
            $cus16,
            $cus17,
            $cus18,
            $cus19,
            $cus20,
            $cus21,
            $cus22,
            $cus23,
            $cus24,
            $cus25,
            $cus26,
            $cus27,
            $cus28,
            $cus29,
            $cus30,
            $cus31,
            $cus32,
            $cus33,
            $cus34,
            $cus35,
            $cus36,
            $cus37,
            $cus38,
            $cus39,
            $cus40,
            $cus41,
            $cus42,
            $cus43,
            $cus44,
            $cus45,
            $cus46,
            $cus47,
            $cus48,
            $cus49,
            $cus50
          );
        } else {
          for ($k = 0; $k < count($sc); $k++) {
            if ($sc[$k] != "") {
              $field = strtok($sc[$k], "|");
              $cusnum = strtok("|");
              $append = strtok("|");
              if (md5($LinklokKey . $field . $cusnum . $append) == strtok("|")) {
                $var = "cus" . $cusnum;
                if ($field == "files") {
                  $data = "";
                  for ($k = 0; $k < count($fnametosend); $k++) {
                    if ($data != "")
                      $data .= ",";
                    $data .= $fnametosend[$k];
                  }
                } else
                  $data = $_REQUEST[$field];
                $$var = $data;
              }
            }
          }
          $groups = array();
          $groupexpiries = array();
          for ($k = 0; $k < count($groupstouse); $k++) {
            $groups[$k] = strtok($groupstouse[$k], ":");
            $groupexpiries[$k] = strtok(":");
          }
          $pass = "";
          // Use addorupdate as its easier here even though user doesn't exists
          slapi_addorupdate(
            $username,
            $pass,
            $clientemail,
            $name,
            $groups,
            $groupexpiries,
            "",
            "",
            "",
            "",
            1,
            $cus1,
            $cus2,
            $cus3,
            $cus4,
            $cus5,
            $cus6,
            $cus7,
            $cus8,
            $cus9,
            $cus10,
            $cus11,
            $cus12,
            $cus13,
            $cus14,
            $cus15,
            $cus16,
            $cus17,
            $cus18,
            $cus19,
            $cus20,
            $cus21,
            $cus22,
            $cus23,
            $cus24,
            $cus25,
            $cus26,
            $cus27,
            $cus28,
            $cus29,
            $cus30,
            $cus31,
            $cus32,
            $cus33,
            $cus34,
            $cus35,
            $cus36,
            $cus37,
            $cus38,
            $cus39,
            $cus40,
            $cus41,
            $cus42,
            $cus43,
            $cus44,
            $cus45,
            $cus46,
            $cus47,
            $cus48,
            $cus49,
            $cus50
          );
        }
      }
    }
  }
  // If required send email to AWeber email parser to subscribe user to required list
  if (linklokvalidemail($_REQUEST['aw']))
    linklokAWeberSubscribe($_REQUEST['aw'], $fnametosend);
  else {
    if (linklokvalidemail($AWeberList))
      linklokAWeberSubscribe($AWeberList, $fnametosend);
  }
  // If required call GetResponse to subscribe user to required campaign
  if ($_REQUEST['gr'] != "")
    linklok_GetResponseSubscribe($_REQUEST['gr']);
  else {
    if ($getresponsecampaign != "")
      linklok_GetResponseSubscribe($getresponsecampaign);
  }
  // If required call MailChimp to subscribe user to required campaign
  if ($_REQUEST['mc'] != "")
    linklok_MailchimpSubscribe($_REQUEST['mc']);
  else {
    if ($mailchimplistid != "")
      linklok_MailchimpSubscribe($mailchimplistid);
  }
  // If required call ARP Reach to subscribe user to required URL
  if ($_REQUEST['ar'] != "")
    linklok_ARPReachSubscribe($_REQUEST['ar']);
  else {
    if ($arpreachurl != "")
      linklok_ARPReachSubscribe($arpreachurl);
  }
  // Redirect to thankyou page if required

  if ($goto != "") {
    // Replace variables in the url with real data from the form
    if (!empty($_GET)) {
      foreach ($_GET as $namepair => $valuepair) {
        $$namepair = $valuepair;
        if ((strlen($namepair) > 2) && ($namepair != "linklokform") && ($namepair != "turing"))
          $goto = str_replace("!!!" . $namepair . "!!!", $valuepair, $goto);
      }
    }
    if (!empty($_POST)) {
      foreach ($_POST as $namepair => $valuepair) {
        $$namepair = $valuepair;
        if ((strlen($namepair) > 2) && ($namepair != "linklokform"))
          $goto = str_replace("!!!" . $namepair . "!!!", $valuepair, $goto);
      }
    }
    $filessent = "";
    for ($k = 0; $k < count($fnametosend); $k++) {
      if ($filessent != "")
        $filessent .= "|";
      $filessent .= $fnametosend[$k];
      if ($floctosend[$k] != "")
        $filessent .= ":" . $floctosend[$k];
    }
    $goto = str_replace("!!!files!!!", $filessent, $goto);
    if ($llurlajaxform)
      llurl_ajaxReturn(true, 'You should receive the email soon', $goto);
    else
      header("Location: " . $goto);
  } else {
    if ($llurlajaxform)
      llurl_ajaxReturn(true, 'You should receive the email soon', $goto);
  }
}

function linkloklinklokSendEmailUsingTemplate($toemail, $template, $clientemail, $expiry, $ipaddr, $iplevel, $fname, $floc)
{
  global $thisurl, $LinklokLocation, $LinklokLocations, $EmailHeaderNoSlashR, $LinklokKey;
  global $YourCompany, $YourEmail, $DownloadBackground, $CopyEmail;
  global $BitlyLogin, $BitlyKey, $TinyLogin, $TinyKey;
  $clientipinfo = array();
  $clientipinfo['ip'] = "unknown";
  $clientipinfo['countrycode'] = "unknown";
  $clientipinfo['countryname'] = "unknown";
  $clientipinfo['continentcode'] = "unknown";
  $clientipinfo['continentname'] = "unknown";
  if (function_exists('vl_geoip2'))
    $clientipinfo = vl_geoip2($ipaddr);
  $usehtmlformat = "Y";
  // See if template exists as a file. If not assume it is a buffer
  if (is_file($template)) {
    $ext = linklokfileextension($template);
    if ($ext == ".php") {
      ob_start();
      include $template;
      $mailBody = ob_get_contents();
      ob_end_clean();
    } else {
      if (!($fh = @fopen($template, "r")))
        return (false);
      $mailBody = fread($fh, 200000);
      fclose($fh);
    }
    if ($ext == ".txt")
      $usehtmlformat = "N";
  } else {
    $mailBody = $template;
    if ((!is_integer(strpos($mailBody, "<html"))) && (!is_integer(strpos($mailBody, "<HTML"))))
      $usehtmlformat = "N";
  }
  if ($expiry != 0) {
    if (strlen($expiry) == 12)
      $expirytime = mktime(substr($expiry, 8, 2), substr($expiry, 10, 2), 0, substr($expiry, 4, 2), substr($expiry, 6, 2), substr($expiry, 0, 4), -1);
    else
      $expirytime = time() + ($expiry * 60);
  } else
    $expirytime = 0;
  // Create secure links and get size and filename for each file
  for ($k = 0; $k < count($fname); $k++) {
    $ProdLink[$k] = linkokGetSecureLink($fname[$k], $floc[$k], $expirytime, $clientemail, $ipaddr, $iplevel, $LinklokKey, "1", $thisurl);
    $ProdFile[$k] = linklokfilename($fname[$k]);
    if ($floc[$k] == "")
      $reallocation = $LinklokLocation . $fname[$k];
    else
      $reallocation = $LinklokLocations[$floc[$k]] . $fname[$k];
    // See if link is local path or URL
    if ((substr(trim(strtolower($reallocation)), 0, 3) == "s3|") || (substr(trim(strtolower($reallocation)), 0, 3) == "do|")) {
      $s = linklokfilesize_s3($reallocation);
      if (is_numeric($s))
        $fsize = $s;
    } else if (substr(trim(strtolower($reallocation)), 0, 3) == "b2|") {
      $s = linklokfilesize_b2($reallocation);
      if (is_numeric($s))
        $fsize = $s;
    } else if (substr(trim(strtolower($reallocation)), 0, 3) == "gc|") {
      $s = linklokfilesize_gc($reallocation);
      if (is_numeric($s))
        $fsize = $s;
    } else if (substr(trim(strtolower($reallocation)), 0, 3) == "db|") {
      $s = linklokfilesize_db($reallocation);
      if (is_numeric($s))
        $fsize = $s;
    } else if (substr(trim(strtolower($reallocation)), 0, 6) == "cdn77|") {
      $s = linklokfilesize_cdn77($reallocation);
      if (is_numeric($s))
        $fsize = $s;
    } else {
      $pos = strpos(strtolower($reallocation), "http://");
      $pos2 = strpos(strtolower($reallocation), "ftp://");
      if ((is_integer($pos)) || (is_integer($pos2))) {
        $s = linklokfilesize_remote($reallocation);
        if (is_integer($s))
          $fsize = $s;
      } else
        $fsize = @ffilesize($reallocation);
    }
    $ProdSize[$k] = $fsize;
  }
  $max = 30;
  if (count($fname) > $max)
    $max = count($fname);
  // First deal with any !!!link_n!!! that is part of hyperlink
  $start = 0;
  do {
    $pos = strpos($mailBody, "<a", $start);
    if (!is_integer($pos))
      $pos = strpos($mailBody, "<A", $start);
    $pos2 = strpos($mailBody, "</a>", $pos);
    if (!is_integer($pos2))
      $pos2 = strpos($mailBody, "</A>", $pos);
    $found = 0;
    if ((is_integer($pos)) && (is_integer($pos2))) {
      $found = 1;
      for ($k = 1; $k <= $max; $k++) {
        if ($ProdLink[$k - 1] == "") {
          // See if !!!link_k!!! is within the hyperlink
          $hl = substr($mailBody, $pos, $pos2 - $pos);
          $pos3 = strpos($hl, "!!!link_" . $k . "!!!");
          if (!is_integer($pos3))
            $pos3 = strpos($hl, "!!!link_" . $k . "!!!");
          if (is_integer($pos3)) {
            $start = $pos;
            $mailBody = substr_replace($mailBody, "", $pos, $pos2 - $pos);
            break;
          } else
            $start = $pos2;
        } else
          $start = $pos2;
      }
    }
  } while ($found == 1);
  // Now replace all other variables
  for ($k = 1; $k <= $max; $k++) {
    if ($ProdLink[$k - 1] != "") {
      $mailBody = str_replace("!!!filename_" . $k . "!!!", $ProdFile[$k - 1], $mailBody);
      $mailBody = str_replace("!!!link_" . $k . "!!!", $ProdLink[$k - 1], $mailBody);

      // Handle bit.ly link
      // First see if !!!bitlylink!!! is used
      if (is_integer(strpos($mailBody, "!!!bitlylink_" . $k . "!!!"))) {
        $bitlylink = linklokGetBitlyURL($BitlyLogin, $BitlyKey, $ProdLink[$k - 1]);
        if ($bitlylink != "")
          $mailBody = str_replace("!!!bitlylink_" . $k . "!!!", $bitlylink, $mailBody);
        else
          $mailBody = str_replace("!!!bitlylink_" . $k . "!!!", $ProdLink[$k - 1], $mailBody);
      }
      // Handle tiny link
      // First see if !!!tinylink!!! is used
      if (is_integer(strpos($mailBody, "!!!tinylink_" . $k . "!!!"))) {
        $tinylink = linklokGetTinyURL($TinyLogin, $TinyKey, $ProdLink[$k - 1], $clientemail);
        if ($tinylink != "")
          $mailBody = str_replace("!!!tinylink_" . $k . "!!!", $tinylink, $mailBody);
        else
          $mailBody = str_replace("!!!tinylink_" . $k . "!!!", $ProdLink[$k - 1], $mailBody);
      }
      $mailBody = str_replace("!!!size_" . $k . "!!!", linklokFriendlyFileSize($ProdSize[$k - 1]), $mailBody);
      $mailBody = str_replace("!!!expires_" . $k . "!!!", linklokFriendlyExpiryTime($expiry), $mailBody);
      if ($usehtmlformat == "Y") {
        $tot = "To download " . $ProdFile[$k - 1] . " click the link below:<BR>";
        $tot .= "<a href=\"" . $ProdLink[$k - 1] . "\">" . $ProdFile[$k - 1] . "</a>";
        if ($ProdSize[$k - 1] != "0")
          $tot .= " (" . linklokFriendlyFileSize($ProdSize[$k - 1]) . ")";
        if ($expiry != "0")
          $tot .= " ~ Download link will expire in " . linklokFriendlyExpiryTime($expiry);
      } else {
        $tot = "To download " . $ProdFile[$k - 1] . " click the link below:\n" . $ProdLink[$k - 1] . "\n";
        $tot .= $ProdFile[$k - 1];
        if ($ProdSize[$k - 1] != "0")
          $tot .= " (" . linklokFriendlyFileSize($ProdSize[$k - 1]) . ")";
        if ($expiry != "0")
          $tot .= " ~ Download link will expire in " . linklokFriendlyExpiryTime($expiry);
      }
      $mailBody = str_replace("!!!download_" . $k . "!!!", $tot, $mailBody);
    } else {
      $mailBody = str_replace("!!!filename_" . $k . "!!!", "", $mailBody);
      $mailBody = str_replace("!!!size_" . $k . "!!!", "", $mailBody);
      $mailBody = str_replace("!!!expires_" . $k . "!!!", "", $mailBody);
      $mailBody = str_replace("!!!download_" . $k . "!!!", "", $mailBody);
      $mailBody = str_replace("!!!link_" . $k . "!!!", "", $mailBody);
      $mailBody = str_replace("!!!bitlylink_" . $k . "!!!", "", $mailBody);
      $mailBody = str_replace("!!!tinylink_" . $k . "!!!", "", $mailBody);
    }
  }
  // Replace form variables
  if (!empty($_GET)) {
    foreach ($_GET as $namepair => $valuepair) {
      $$namepair = $valuepair;
      if ((strlen($namepair) > 2) && ($namepair != "linklokform") && ($namepair != "turing"))
        $mailBody = str_replace("!!!" . $namepair . "!!!", $valuepair, $mailBody);
    }
  }
  if (!empty($_POST)) {
    foreach ($_POST as $namepair => $valuepair) {
      $$namepair = $valuepair;
      if ((strlen($namepair) > 2) && ($namepair != "linklokform"))
        $mailBody = str_replace("!!!" . $namepair . "!!!", $valuepair, $mailBody);
    }
  }
  $mailBody = str_replace("!!!ip!!!", $ipaddr, $mailBody);
  $mailBody = str_replace("!!!ipcountrycode!!!", $clientipinfo['countrycode'], $mailBody);
  $mailBody = str_replace("!!!ipcountryname!!!", $clientipinfo['countryname'], $mailBody);
  $mailBody = str_replace("!!!ipcontinentcode!!!", $clientipinfo['continentcode'], $mailBody);
  $mailBody = str_replace("!!!ipcontinentname!!!", $clientipinfo['continentname'], $mailBody);



  // Now we should see if !!!eachfilestart!!! sections exists
  $start = 0;
  do {
    $found = 0;
    $pos = strpos($mailBody, "<!--eachfilestart-->");
    $pos2 = strpos($mailBody, "<!--eachfileend-->");
    if ((is_integer($pos)) && (is_integer($pos2))) {
      $found = 1;
      $buf = substr($mailBody, $pos + 20, $pos2 - $pos - 20);
      // Now remove this section
      $mailBody1 = substr($mailBody, 0, $pos);
      $mailBody2 = substr($mailBody, $pos2 + 18, strlen($mailBody) - $pos2 - 18);
      $mailBody = $mailBody1;
      for ($k = 1; $k <= count($ProdLink); $k++) {
        $repeatbuf = $buf;
        $repeatbuf = str_replace("!!!filename!!!", $ProdFile[$k - 1], $repeatbuf);
        $repeatbuf = str_replace("!!!link!!!", $ProdLink[$k - 1], $repeatbuf);
        // Handle bit.ly link
        // First see if !!!bitlylink!!! is used
        if (is_integer(strpos($repeatbuf, "!!!bitlylink!!!"))) {
          $bitlylink = linklokGetBitlyURL($BitlyLogin, $BitlyKey, $ProdLink[$k - 1]);
          if ($bitlylink != "")
            $repeatbuf = str_replace("!!!bitlylink!!!", $bitlylink, $repeatbuf);
          else
            $repeatbuf = str_replace("!!!link!!!", $ProdLink[$k - 1], $repeatbuf);
        }
        // Handle tiny link
        // First see if !!!tinylink!!! is used
        if (is_integer(strpos($repeatbuf, "!!!tinylink!!!"))) {
          $tinylink = linklokGetTinyURL($TinyLogin, $TinyKey, $ProdLink[$k - 1], $clientemail);
          if ($tinylink != "")
            $repeatbuf = str_replace("!!!tinylink!!!", $tinylink, $repeatbuf);
          else
            $repeatbuf = str_replace("!!!tinylink!!!", $ProdLink[$k - 1], $repeatbuf);
        }
        $repeatbuf = str_replace("!!!size!!!", linklokFriendlyFileSize($ProdSize[$k - 1]), $repeatbuf);
        $repeatbuf = str_replace("!!!expires!!!", linklokFriendlyExpiryTime($expiry), $repeatbuf);
        if ($usehtmlformat == "Y") {
          $tot = "To download " . $ProdFile[$k - 1] . " click the link below:<BR>";
          $tot .= "<a href=\"" . $ProdLink[$k - 1] . "\">" . $ProdFile[$k - 1] . "</a>";
          if ($ProdSize[$k - 1] != "0")
            $tot .= " (" . linklokFriendlyFileSize($ProdSize[$k - 1]) . ")";
          if ($expiry != "0")
            $tot .= " ~ Download link will expire in " . linklokFriendlyExpiryTime($expiry);
        } else {
          $tot = "To download " . $ProdFile[$k - 1] . " click the link below:\n" . $ProdLink[$k - 1] . "\n";
          $tot .= $ProdFile[$k - 1];
          if ($ProdSize[$k - 1] != "0")
            $tot .= " (" . linklokFriendlyFileSize($ProdSize[$k - 1]) . ")";
          if ($expiry != "0")
            $tot .= " ~ Download link will expire in " . linklokFriendlyExpiryTime($expiry);
        }
        $repeatbuf = str_replace("!!!download!!!", $tot, $repeatbuf);
        $mailBody .= $repeatbuf;
      }
      $mailBody .= $mailBody2;
    }
  } while ($found == 1);
  // Now handle any !!!link(filename,expiry)!!! template variables
  $itemids = linklokgetitemvars($mailBody, "link");
  $items = explode("|", $itemids);
  for ($k = 0; $k < count($items); $k++) {
    // Split item into filename and expiry time.
    $filename = strtok($items[$k], ",");
    $exp = strtok(",");
    // Now split filename and file location if used
    $filename = strtok($filename, ":");
    $flocation = strtok(":");
    if ($exp != 0) {
      if (strlen($exp) == 12)
        $expiry = mktime(substr($exp, 8, 2), substr($exp, 10, 2), 0, substr($exp, 4, 2), substr($exp, 6, 2), substr($exp, 0, 4), -1);
      else
        $expiry = time() + ($exp * 60);
    }
    $plink = linkokGetSecureLink($filename, $flocation, $expiry, $clientemail, $ipaddr, $iplevel, $LinklokKey, "1", $thisurl);
    $mailBody = str_replace("!!!link(" . $items[$k] . ")!!!", $plink, $mailBody);

    // Handle bit.ly link
    // First see if !!!bitlylink!!! is used
    if (is_integer(strpos($mailBody, "!!!bitlylink(" . $items[$k] . ")!!!"))) {
      $bitlylink = linklokGetBitlyURL($BitlyLogin, $BitlyKey, $plink);
      if ($bitlylink != "")
        $mailBody = str_replace("!!!bitlylink(" . $items[$k] . ")!!!", $bitlylink, $mailBody);
      else
        $mailBody = str_replace("!!!link(" . $items[$k] . ")!!!", $plink, $mailBody);
    }
    // Handle tiny link
    // First see if !!!tinylink!!! is used
    if (is_integer(strpos($mailBody, "!!!tinylink(" . $items[$k] . ")!!!"))) {
      $tinylink = linklokTinyURL($TinyLogin, $TinyKey, $plink, $clientemail);
      if ($tinylink != "")
        $mailBody = str_replace("!!!tinylink(" . $items[$k] . ")!!!", $tinylink, $mailBody);
      else
        $mailBody = str_replace("!!!tinylink(" . $items[$k] . ")!!!", $plink, $mailBody);
    }
  }
  // Now handle any !!!size(filename)!!! template variables
  $itemids = linklokgetitemvars($mailBody, "size");
  $items = explode("|", $itemids);
  for ($k = 0; $k < count($items); $k++) {
    $filename = strtok($items[$k], ":");
    $flocation = strtok(":");
    if ($flocation == "")
      $fullpath = $LinklokLocation . $filename;
    else
      $fullpath = $LinklokLocations[$flocation] . $filename;
    if ((substr(trim(strtolower($fullpath)), 0, 3) == "s3|") || (substr(trim(strtolower($fullpath)), 0, 3) == "do|")) {
      $s = linklokfilesize_s3($fullpath);
      if (is_numeric($s))
        $size = $s;
    } else if (substr(trim(strtolower($fullpath)), 0, 3) == "b2|") {
      $s = linklokfilesize_b2($fullpath);
      if (is_numeric($s))
        $size = $s;
    } else if (substr(trim(strtolower($fullpath)), 0, 3) == "gc|") {
      $s = linklokfilesize_gc($fullpath);
      if (is_numeric($s))
        $size = $s;
    } else if (substr(trim(strtolower($fullpath)), 0, 3) == "db|") {
      $s = linklokfilesize_db($fullpath);
      if (is_numeric($s))
        $size = $s;
    } else if (substr(trim(strtolower($fullpath)), 0, 6) == "cdn77|") {
      $s = linklokfilesize_cdn77($fullpath);
      if (is_numeric($s))
        $size = $s;
    } else {
      $pos = strpos(strtolower($fullpath), "http://");
      $pos2 = strpos(strtolower($fullpath), "ftp://");
      if ((is_integer($pos)) || (is_integer($pos2))) {
        $s = linklokfilesize_remote($fullpath);
        if (is_integer($s))
          $size = $s;
      } else
        $size = @filesize($fullpath);
    }
    $mailBody = str_replace("!!!size(" . $items[$k] . ")!!!", linklokFriendlyFileSize($size), $mailBody);
  }
  // Get subject for email
  if ($usehtmlformat != "Y") {
    $pos = strpos($mailBody, "\n");
    $subject = substr($mailBody, 0, $pos);
    $mailBody = substr($mailBody, $pos + 1, strlen($mailBody) - $pos - 1);
  } else {
    $subject = "Download Links";
    $pos = strpos($mailBody, "<TITLE>");
    if (!is_integer($pos))
      $pos = strpos($mailBody, "<title>");
    $pos2 = strpos($mailBody, "</TITLE>");
    if (!is_integer($pos2))
      $pos2 = strpos($mailBody, "</title>");
    if ((is_integer($pos)) &&  (is_integer($pos2))) {
      $subject = substr($mailBody, $pos + 7, $pos2 - $pos - 7);
    }
  }
  // If using a download background page replace auth with authe
  if ($DownloadBackground != "")
    $mailBody = str_replace("?linklokauth=", "?linklokauthe=", $mailBody);
  if ($usehtmlformat == "Y")
    $mailBody = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD W3 HTML//EN\">\n" . $mailBody;
  $result = linklokSendEmailOut($toemail, $YourEmail, $YourCompany, $subject, $mailBody, $usehtmlformat);
  if ($CopyEmail != "")
    linklokSendEmailOut($CopyEmail, $YourEmail, $YourCompany, $subject, $mailBody, $usehtmlformat);
  return ($result);
}

function linklokgetitemvars($buf, $n)
{
  $start = 0;
  $itemids = "";
  do {
    $pos = strpos($buf, "!!!" . $n . "(", $start);
    $found = 0;
    if (is_integer($pos)) {
      $found = 1;
      $pos2 = strpos($buf, ")!!!", $pos);
      if (is_integer($pos2)) {
        if ($itemids != "")
          $itemids .= "|";
        $itemids .= substr($buf, $pos + strlen($n) + 4, $pos2 - ($pos + strlen($n) + 4));
      }
      $start = $pos2;
    }
  } while ($found == 1);
  return ($itemids);
}

function linklokSendEmail($toemail, $clientemail, $expiry, $ipaddr, $iplevel, $fname, $floc)
{
  global $thisurl, $LinklokLocation, $LinklokLocations, $EmailHeaderNoSlashR, $LinklokKey, $HTMLEmail;
  global $YourCompany, $YourEmail, $DownloadBackground, $CopyEmail;
  if ($expiry != 0) {
    if (strlen($expiry) == 12)
      $expirytime = mktime(substr($expiry, 8, 2), substr($expiry, 10, 2), 0, substr($expiry, 4, 2), substr($expiry, 6, 2), substr($expiry, 0, 4), -1);
    else
      $expirytime = time() + ($expiry * 60);
  } else
    $expirytime = 0;
  $subject = "Download Links from " . $YourCompany;
  $mailBody =
    "<h1>Thank you for your order!</h1>
      <hr/>
      <p>Please use the link(s) below to begin downloading.</p>";
  for ($k = 0; $k < count($fname); $k++) {
    $plink = linkokGetSecureLink($fname[$k], $floc[$k], $expirytime, $clientemail, $ipaddr, $iplevel, $LinklokKey, "1", $thisurl);
    $fnameonly = linklokfilename($fname[$k]);
    if ($floc[$k] == "")
      $reallocation = $LinklokLocation . $fname[$k];
    else
      $reallocation = $LinklokLocations[$floc[$k]] . $fname[$k];
    // See if link is local path or URL
    if ((substr(trim(strtolower($reallocation)), 0, 3) == "s3|") || (substr(trim(strtolower($reallocation)), 0, 3) == "do|")) {
      $s = linklokfilesize_s3($reallocation);
      if (is_numeric($s))
        $fsize = $s;
    } else if (substr(trim(strtolower($reallocation)), 0, 3) == "b2|") {
      $s = linklokfilesize_b2($reallocation);
      if (is_numeric($s))
        $fsize = $s;
    } else if (substr(trim(strtolower($reallocation)), 0, 3) == "gc|") {
      $s = linklokfilesize_gc($reallocation);
      if (is_numeric($s))
        $fsize = $s;
    } else if (substr(trim(strtolower($reallocation)), 0, 3) == "db|") {
      $s = linklokfilesize_db($reallocation);
      if (is_numeric($s))
        $fsize = $s;
    } else if (substr(trim(strtolower($reallocation)), 0, 6) == "cdn77|") {
      $s = linklokfilesize_cdn77($reallocation);
      if (is_numeric($s))
        $fsize = $s;
    } else {
      $pos = strpos(strtolower($reallocation), "http://");
      $pos2 = strpos(strtolower($reallocation), "ftp://");
      if ((is_integer($pos)) || (is_integer($pos2))) {
        $s = linklokfilesize_remote($reallocation);
        if (is_integer($s))
          $fsize = $s;
      } else
        $fsize = @filesize($reallocation);
    }
    if ($HTMLEmail == "Y") {
      $mailBody .= "To download " . $fnameonly . " click the link below:\n";
      $mailBody .= "<a href=\"" . $plink . "\">" . $fnameonly . "</a>";
      if ($fsize != 0)
        $mailBody .= " (" . linklokFriendlyFileSize($fsize) . ")";
      if ($expiry != "0")
        $mailBody .= " ~ Download link will expire in " . linklokFriendlyExpiryTime($expiry) . ".\n";
      else
        $mailBody .= " \n";
      $mailBody .= " \n";
    } else {
      $mailBody .= "To download " . $fnameonly . " click the link below:\n" . $plink . "\n";
      $mailBody .= $fnameonly;
      if ($fsize != 0)
        $mailBody .= " (" . linklokFriendlyFileSize($fsize) . ")";
      if ($expiry != "0")
        $mailBody .= " ~ Download link will expire in " . linklokFriendlyExpiryTime($expiry) . ".\n";
      else
        $mailBody .= " \n";
      $mailBody .= " \n";
    }
  }
  $mailBody .= "\n";
  $mailBody .= "Thanks again from Powershotz and have a great day! \n";
  $mailBody .= $YourEmail . "\n";
  $mailBody .= "<a href=\"https://powershotz.com\">Powershotz.com</a>";
  // $mailBody .= $YourCompany . "\n";

  // If using a download background page replace auth with authe
  if ($DownloadBackground != "")
    $mailBody = str_replace("?linklokauth=", "?linklokauthe=", $mailBody);
  if ($HTMLEmail == "Y") {
    $mailBody = str_replace("\n", "<br>\n", $mailBody);
    $mailBody = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD W3 HTML//EN\">\n<HTML>\n<HEAD>\n<META HTTP-EQUIV=\"Content-Type\" CONTENT=\"text/html; charset=iso-8859-1\">\n<TITLE>Download Information</TITLE>\n</HEAD\n<BODY>\n" . $mailBody;
    $mailBody .= "</BODY>\n</HTML>\n";
  }
  $result = linklokSendEmailOut($toemail, $YourEmail, $YourCompany, $subject, $mailBody, $HTMLEmail);
  if ($CopyEmail != "")
    linklokSendEmailOut($CopyEmail, $YourEmail, $YourCompany, $subject, $mailBody, $HTMLEmail);
  return ($result);
}

function linklokgetmimetype($fn)
{
  global $mt;
  $ext = linklokfileextension($fn);
  if (isset($mt[$ext]))
    $mimetype = $mt[$ext];
  else
    $mimetype = "";
  return ("$mimetype");
}

function linklokFriendlyExpiryTime($exp)
{
  if ($exp == 0)
    return ("");
  if (($exp >= 1) && ($exp <= 59)) {
    if ($exp == 1)
      return ("$exp minute");
    else
      return ("$exp minutes");
  }
  if (($exp >= 60) && ($exp <= 1440)) {
    $hours = intval($exp / 60);
    $mins = $exp % 60;
    if ($hours == 1)
      $ret = $hours . " hour";
    else
      $ret = $hours . " hours";
    if ($mins > 0) {
      if ($mins == 1)
        $ret .= " & " . $mins . " minute";
      else
        $ret .= " & " . $mins . " minutes";
    }
    return ($ret);
  }
  if ($exp >= 1441) {
    $days = intval($exp / 1440);
    $exp = $exp - ($days * 1440);
    $hours = intval($exp / 60);
    $mins = $exp % 60;
    if ($days == 1)
      $ret = $days . " day";
    else
      $ret = $days . " days";
    if ($hours > 0) {
      if ($mins == 0)
        $ret .= " &";
      if ($hours == 1)
        $ret .= " " . $hours . " hour";
      else
        $ret .= " " . $hours . " hours";
    }
    if ($mins > 0) {
      if ($mins == 1)
        $ret .= " & " . $mins . " minute";
      else
        $ret .= " & " . $mins . " minutes";
    }
    return ($ret);
  }
}

function linklokFriendlyFileSize($sz)
{
  if ($sz <= 1023)
    return ($sz . " Bytes");
  if (($sz >= 1024) && ($sz <= 1048575)) {
    $sz = intval($sz / 1024);
    return ($sz . " KB");
  }
  if ($sz >= 1048576) {
    $sz = $sz / 1048576;
    $sz = intval($sz * 100) / 100;
    return ($sz . " MB");
  }
}

function linklokfileextension($fname)
{
  if ($fname == "")
    return ("");
  $pos = strrpos($fname, ".");
  if (is_integer($pos))
    return (strtolower(substr($fname, $pos)));
  return ("");
}

function linklokfilename($fname)
{
  if ($fname == "")
    return ("");
  // First see if link is for S3 etc
  if ((substr(trim(strtolower($fname)), 0, 3) == "s3|") || (substr(trim(strtolower($fname)), 0, 3) == "do|")) {
    $pos = strrpos($fname, "|");
    if (is_integer($pos))
      $fname = substr($fname, $pos + 1);
  }
  if (substr(trim(strtolower($fname)), 0, 3) == "b2|") {
    $pos = strrpos($fname, "|");
    if (is_integer($pos))
      $fname = substr($fname, $pos + 1);
  }
  if (substr(trim(strtolower($fname)), 0, 3) == "gc|") {
    $pos = strrpos($fname, "|");
    if (is_integer($pos))
      $fname = substr($fname, $pos + 1);
  }
  if (substr(trim(strtolower($fname)), 0, 3) == "db|") {
    $pos = strrpos($fname, "|");
    if (is_integer($pos))
      $fname = substr($fname, $pos + 1);
  }
  if (substr(trim(strtolower($fname)), 0, 6) == "cdn77|") {
    $pos = strrpos($fname, "|");
    if (is_integer($pos))
      $fname = substr($fname, $pos + 1);
  }
  $pos1 = strrpos($fname, "/");
  $pos2 = strrpos($fname, "\\");
  if ($pos1 === false)
    $pos1 = -1;
  if ($pos2 === false)
    $pos2 = -1;
  if ($pos1 > $pos2)
    $pos = $pos1;
  else
    $pos = $pos2;
  if ($pos > -1) {
    $name = substr($fname, $pos + 1);
    $fname = $name;
  }
  // See if actual filename part
  $pos = strpos($fname, "^");
  if (is_integer($pos))
    $fname = substr($fname, 0, $pos);
  // See if query part
  $pos = strpos($fname, "?");
  if (is_integer($pos))
    $fname = substr($fname, 0, $pos);
  return ($fname);
}

function linklokfilenamepath($fname)
{
  if ($fname == "")
    return ("");
  $pos1 = strrpos($fname, "/");
  $pos2 = strrpos($fname, "\\");
  if ($pos1 === false)
    $pos1 = -1;
  if ($pos2 === false)
    $pos2 = -1;
  if ($pos1 > $pos2)
    $pos = $pos1;
  else
    $pos = $pos2;
  // See if actual filename part
  $pos = strpos($fname, "^");
  if (is_integer($pos))
    $fname = substr($fname, 0, $pos);
  // See if query part
  $pos = strpos($fname, "?");
  if (is_integer($pos))
    $fname = substr($fname, 0, $pos);
  return ($fname);
}

function linklokfilequery($fname)
{
  $pos = strpos($fname, "?");
  if (is_integer($pos))
    $fname = substr($fname, $pos + 1);
  else
    return ("");
  // See if actual filename part
  $pos = strpos($fname, "^");
  if (is_integer($pos))
    $fname = substr($fname, 0, $pos);
  // See if query part
  $pos = strpos($fname, "?");
  if (is_integer($pos))
    $fname = substr($fname, 0, $pos);
  return ($fname);
}

function linklokaltfilename($fname)
{
  $actualfname = $fname;
  $pos = strpos($fname, "^");
  if (is_integer($pos))
    $actualfname = substr($fname, $pos + 1);
  return ($actualfname);
}

function linklokCustomMessage($Template, $msg)
{
  if ($Template == "")
    return (0);
  $ext = linklokfileextension($Template);
  if ($ext == ".php") {
    ob_start();
    include $Template;
    $page = ob_get_contents();
    ob_end_clean();
  } else {
    if (!($fh = @fopen($Template, "r")))
      return (0);
    $page = fread($fh, 200000);
    fclose($fh);
  }
  $page = str_replace("!!!message!!!", $msg, $page);
  print $page;
  return (1);
}

function linklokShowMessage($Template, $msg)
{
  if (0 == linklokCustomMessage($Template, $msg)) {
    print("<HTML>\n");
    print("<HEAD>\n");
    print("<TITLE>Linklok URL</TITLE>\n");
    print("</HEAD>\n");
    print("<BODY>\n");
    print("$msg<BR>");
    print("</BODY>\n");
    print("</HTML>\n");
  }
}

function llurl_ajaxReturn($success, $msg, $redirect)
{
  if (false !== ob_get_contents())
    ob_end_clean();
  $data = array();
  $data['success'] = $success;
  $data['message'] = $msg;
  $data['redirect'] = $redirect;
  echo json_encode($data);
  exit;
}


function linklokvalidemail($email)
{
  $email = strtolower($email);
  $regex = '/^[_a-z0-9-\'!#$%&\*\+\/=\?\^`\{\}~\|]+(\.[_a-z0-9-\'!#$%&\*\+\/=\?\^`\{\}~\|]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,9})$/';
  $valid = false;
  if (preg_match($regex, $email))
    $valid = true;
  return ($valid);
}

function linklokxgetallheaders()
{
  global $_SERVER;
  $headers = array();
  foreach ($_SERVER as $key => $value) {
    if (strncmp($key, "HTTP_", 5) == 0) {
      $key = strtr(ucwords(strtolower(strtr(substr($key, 5), "_", " "))), " ", "-");
      $headers[$key] = $value;
    }
  }
  return $headers;
}

function linklokSendEmailOut($toemail, $fromemail, $fromname, $subject, $mailBody, $htmlformat)
{
  global $EmailHeaderNoSlashR, $ExtraMailParam, $ErrorTemplate, $ErrorEmail, $UsePHPmailer, $UsePearMail;
  global $Custom_Mail_Headers;
  global $SendgridUser, $SendgridPass, $SendgridAPI;
  // Remove any comma in from name
  $fromname = str_replace(",", " ", $fromname);
  // Handle multiple email addresses
  $sendtoemail = explode(",", $toemail);
  // See if Sendgrid V3 being used
  if ($SendgridAPI != "") {
    $sg = new \SendGrid($SendgridAPI);
    $mail = new SendGrid\Mail();
    $email = new SendGrid\Email($fromname, $fromemail);
    $mail->setFrom($email);
    $mail->setSubject($subject);
    $personalization = new SendGrid\Personalization();
    for ($k = 0; $k < count($sendtoemail); $k++) {
      $email = new SendGrid\Email(null, $sendtoemail[$k]);
      $personalization->addTo($email);
    }
    $mail->addPersonalization($personalization);
    if ($htmlformat == "Y")
      $content = new SendGrid\Content("text/html", $mailBody);
    else
      $content = new SendGrid\Content("text/plain", $mailBody);
    $mail->addContent($content);
    $response = $sg->client->mail()->send()->post($mail);
    if ($response->statusCode() >= 300)
      return (false);
    return (true);
  }
  // See if Sendgrid V2 being used
  if (($SendgridUser != "") && ($SendgridPass != "") && ($SendgridAPI == "")) {
    if ($htmlformat == "Y") {
      $htmlbody = $mailBody;
      $textbody = "";
    } else {
      $htmlbody = "";
      $textbody = $mailBody;
    }
    $sendgridurl = 'https://api.sendgrid.com/';
    $json_string = array(
      'to' => $sendtoemail
    );
    $params = array(
      'api_user'  => $SendgridUser,
      'api_key'   => $SendgridPass,
      'x-smtpapi' => json_encode($json_string),
      'to'        => $sendtoemail[0],
      'subject'   => $subject,
      'html'      => $htmlbody,
      'text'      => $textbody,
      'from'      => $fromemail,
      'fromname'  => $fromname,
    );
    $request =  $sendgridurl . 'api/mail.send.json';
    // Generate curl request
    $session = curl_init($request);
    // Tell curl to use HTTP POST
    curl_setopt($session, CURLOPT_POST, true);
    // Tell curl that this is the body of the POST
    curl_setopt($session, CURLOPT_POSTFIELDS, $params);
    // Tell curl not to return headers, but do return the response
    curl_setopt($session, CURLOPT_HEADER, false);
    // Tell PHP not to use SSLv3 (instead opting for TLS)
    curl_setopt($session, CURLOPT_SSLVERSION, CURL_SSLVERSION_TLSv1_2);
    curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
    // obtain response
    $response = curl_exec($session);
    curl_close($session);
    $res = json_decode($response);
    if ($res->message != "success")
      return (false);
    return (true);
  }
  // If phpmailer setup then use it otherwise handle with PHP mail() function
  if ($UsePHPmailer == 1) {
    global $EmailUsername, $EmailPassword, $EmailServer, $EmailPort, $EmailAuth, $EmailServerSecurity;
    if ($EmailPort == "")
      $EmailPort = 25;
    if ($EmailAuth = "")
      $EmailAuth = 1;
    //    require_once("class.phpmailer.php");
    //    require_once("class.smtp.php");
    require_once("PHPMailer.php");
    require_once("SMTP.php");
    require_once("Exception.php");
    //    $mail = new PHPMailer();
    $mail = new PHPMailer\PHPMailer\PHPMailer;
    $mail->IsSMTP();
    $mail->Host = $EmailServer;
    $mail->Port = $EmailPort;
    $mail->SMTPAutoTLS = false; // Needed on some servers        
    if ($EmailAuth == "0")
      $mail->SMTPAuth = false;
    else
      $mail->SMTPAuth = true;
    if ($EmailServerSecurity != "")
      $mail->SMTPSecure = $EmailServerSecurity;
    $mail->Username = $EmailUsername;
    $mail->Password = $EmailPassword;
    $mail->From = $fromemail;
    $mail->FromName = $fromname;
    for ($k = 0; $k < count($sendtoemail); $k++)
      $mail->AddAddress($sendtoemail[$k]);
    if ($htmlformat == "Y")
      $mail->IsHTML(true);
    else
      $mail->IsHTML(false);
    $mail->Subject = $subject;
    $mail->Body = $mailBody;
    if ($Custom_Mail_Headers != "") {
      $cushd = explode("\r\n", $Custom_Mail_Headers);
      for ($k = 0; $k < count($cushd); $k++) {
        if ($cushd[$k] != "")
          $mail->AddCustomHeader($cushd[$k]);
      }
    }
    $mail->Send();
    if ($mail->isError())
      return (false);
    return (true);
  }
  if ($UsePearMail == 1) {
    global $EmailUsername, $EmailPassword, $EmailServer;
    $headers = array(
      'From' => $fromemail,
      'To' => $sendtoemail[0],
      'Subject' => $subject
    );
    $smtp = Mail::factory('smtp', array(
      'host' => $EmailServer,
      'auth' => true,
      'username' => $EmailUsername,
      'password' => $EmailPassword
    ));
    $mail = $smtp->send($sendtoemail[0], $headers, $mailBody);
    if (PEAR::isError($mail)) {
      return (false);
    }
    return (true);
  }
  // If still here then use PHP mail() function  
  $headers = "From: " . $fromname . " <" . $fromemail . ">\r\n";
  $headers .= "Reply-To: " . $fromname . " <" . $fromemail . ">\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  if ($htmlformat == "Y") {
    $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
    $headers .= "Content-Transfer-Encoding: base64\r\n";
    $mailBody = chunk_split(base64_encode($mailBody));
  } else
    $headers .= "Content-type: text/plain\r\n";
  if ($Custom_Mail_Headers != "")
    $headers .= $Custom_Mail_Headers;
  if ($EmailHeaderNoSlashR == 1)
    $headers = str_replace("\r", "", $headers);
  for ($k = 0; $k < count($sendtoemail); $k++) {
    if ($ExtraMailParam != "")
      $sent = mail($sendtoemail[$k], $subject, $mailBody, $headers, $ExtraMailParam);
    else
      $sent = mail($sendtoemail[$k], $subject, $mailBody, $headers);
    if ($sent == false)
      return (false);
  }
  return (true);
}

function linklokxfpassthru($file)
{
  global $downloadbuffer;
  if ($downloadbuffer > 0) {
    @set_time_limit(86400);
    while (!feof($file)) {
      print(fread($file, $downloadbuffer));
      ob_flush();
      flush();
      sleep(1);
    }
    fclose($file);
  } else
    @fpassthru($file);
}

function ffilesize($file)
{
  $filesize = 0;
  $a = @fopen($file, 'r');
  if ($a !== false) {
    fseek($a, 0, SEEK_END);
    $filesize = ftell($a);
    fclose($a);
  }
  return ($filesize);
}

function linklokfilesize_remote($url, $timeout = 3)
{
  if (function_exists('curl_init')) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_NOBODY, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, true);
    $data = curl_exec($ch);
    curl_close($ch);
    if ($data === false)
      return (0);
    if (preg_match('/Content-Length: (\d+)/', $data, $matches))
      return (float) $matches[1];
  } else {
    $url = parse_url($url);
    if ($url['port'] == "")
      $url['port'] = 80;
    if ($fp = @fsockopen($url['host'], ($url['port'] ? $url['port'] : 80), $errno, $errstr, $timeout)) {
      fwrite($fp, 'HEAD ' . $url['path'] . $url['query'] . " HTTP/1.0\r\nHost: " . $url['host'] . "\r\n\r\n");
      @stream_set_timeout($fp, $timeout);
      while (!feof($fp)) {
        $size = fgets($fp, 4096);
        if (stristr($size, 'Content-Length') !== false) {
          $size = trim(substr($size, 16));
          break;
        }
      }
      fclose($fp);
    }
    return is_numeric($size) ? intval($size) : false;
  }
}


function linkloklogdownload($logfile, $fname, $email)
{
  global $ipaddr;
  if (is_writeable($logfile)) {
    $fh = @fopen($logfile, "a");
    if ($fh) {
      $logstr = date("d/m/y") . "," . date("H:i:s") . "," . $fname . "," . $email . "," . $ipaddr; // date,time,filename,email,IP
      $logstr .= "\n";
      fputs($fh, $logstr);
      fclose($fh);
    }
  }
}
function linklokget_s3_url($location, $expires, $operation = "GET", $dialog = 0, $newname = "")
{
  $sigver = 2;
  $parts = explode("|", $location);
  $service = strtolower($parts[0]);
  // If s3 and region then use V4
  if ($service == "s3") {
    if (preg_match("/[a-z][a-z]-/", trim($parts[1])))
      $sigver = 4;
  }
  if ($service == "do")
    $sigver = 4;
  if ($sigver == 2) {
    // Split into access key id, secret access key, bucket , filename
    $accesskeyid = trim($parts[1]);
    $secretaccesskey = trim($parts[2]);
    $bucket = trim($parts[3]);
    $resource = trim($parts[4]);
    $filename = linklokfilename($resource);
    $extension = linklokfileextension($filename);
    if ($dialog == 1) {
      $fnametouse = $filename;
      if (($newname != "") && ($newname != $filename))
        $fnametouse = $newname;
      $headers = array(
        'response-content-disposition' => 'attachment; filename=' . "\"" . $fnametouse . "\"",
        'response-content-type' => 'application/force-download',
      );
    } else {
      if (($newname != "") && ($newname != $filename))
        $headers = array(
          'response-content-disposition' => 'inline; filename=' . "\"" . $newname . "\"",
        );
      else
        $headers = array();
    }
    $resource = str_replace(array('%2F', '%2B'), array('/', '+'), rawurlencode($resource));
    $string_to_sign = $operation . "\n\n\n$expires\n/$bucket/$resource";
    //  $final_url = "http://s3.amazonaws.com/$bucket/$resource?";
    if ($service == "s3")
      $final_url = "https://$bucket.s3.amazonaws.com/$resource?";
    if ($service == "do")
      $final_url = "https://$bucket.digitaloceanspaces.com/$resource?";
    $append_char = '?';
    foreach ($headers as $header => $value) {
      $final_url .= $header . '=' . urlencode($value) . '&';
      $string_to_sign .= $append_char . $header . '=' . $value;
      $append_char = '&';
    }
    $signature = urlencode(linklokhex2b64(linklokhmacsha1($secretaccesskey, $string_to_sign)));
    $final_url = $final_url . "AWSAccessKeyId=$accesskeyid&Expires=$expires&Signature=$signature&FixForIE=" . $extension;
    return ($final_url);
  }
  if ($sigver == 4) {
    // Split into region, access key id, secret access key, bucket , filename
    $region = trim($parts[1]);
    $accesskeyid = trim($parts[2]);
    $secretaccesskey = trim($parts[3]);
    $bucket = trim($parts[4]);
    $resource = trim($parts[5]);
    $filename = linklokfilename($resource);
    $extension = linklokfileextension($filename);
    $expires = $expires - time();
    $extra_headers = array();
    $encoded_uri = str_replace('%2F', '/', rawurlencode("/" . $resource));
    $signed_headers = array();
    foreach ($extra_headers as $key => $value)
      $signed_headers[strtolower($key)] = $value;
    if ($service == "s3") {
      if (!array_key_exists('host', $signed_headers))
        $signed_headers['host'] = ($region == 'us-east-1') ? "$bucket.s3.amazonaws.com" : "$bucket.s3-$region.amazonaws.com";
    }
    if ($service == "do") {
      $signed_headers['host'] = "$bucket.$region.digitaloceanspaces.com";
    }
    ksort($signed_headers);
    $header_string = '';
    foreach ($signed_headers as $key => $value)
      $header_string .= $key . ':' . trim($value) . "\n";
    $signed_headers_string = implode(';', array_keys($signed_headers));
    $timestamp = time();
    $date_text = gmdate('Ymd', $timestamp);
    $time_text = $date_text . 'T' . gmdate('His', $timestamp) . 'Z';
    $algorithm = 'AWS4-HMAC-SHA256';
    $scope = "$date_text/$region/s3/aws4_request";
    $x_amz_params = array(
      'X-Amz-Algorithm' => $algorithm,
      'X-Amz-Credential' => $accesskeyid . '/' . $scope,
      'X-Amz-Date' => $time_text,
      'X-Amz-SignedHeaders' => $signed_headers_string
    );
    if ($expires > 0) $x_amz_params['X-Amz-Expires'] = $expires;
    ksort($x_amz_params);
    $query_string_items = array();
    foreach ($x_amz_params as $key => $value)
      $query_string_items[] = rawurlencode($key) . '=' . rawurlencode($value);
    $query_string = implode('&', $query_string_items);
    if ($dialog == 1) {
      $fnametouse = $filename;
      if (($newname != "") && ($newname != $filename))
        $fnametouse = $newname;
      $query_string .= '&response-content-disposition=' . rawurlencode("attachment; filename=\"" . $fnametouse . "\"") . '&response-content-type=application%2Fforce-download';
    } else {
      if (($newname != "") && ($newname != $filename))
        $query_string .= '&response-content-disposition=' . rawurlencode("inline; filename=\"" . $newname . "\"");
    }
    $canonical_request = "$operation\n$encoded_uri\n$query_string\n$header_string\n$signed_headers_string\nUNSIGNED-PAYLOAD";
    $string_to_sign = "$algorithm\n$time_text\n$scope\n" . hash('sha256', $canonical_request, false);
    $signing_key = hash_hmac('sha256', 'aws4_request', hash_hmac('sha256', 's3', hash_hmac('sha256', $region, hash_hmac('sha256', $date_text, 'AWS4' . $secretaccesskey, true), true), true), true);
    $signature = hash_hmac('sha256', $string_to_sign, $signing_key);
    $url = 'https://' . $signed_headers['host'] . $encoded_uri . '?' . $query_string . '&X-Amz-Signature=' . $signature;
    return $url;
  }
}

function linklokfilesize_s3($location)
{
  global $ServerTimeAdjust;
  $url = linklokget_s3_url($location, time() + $ServerTimeAdjust, "HEAD");
  $size = linklokfilesize_remote($url);
  if ($size === false)
    return ("Unknown");
  return ($size);
}

function linklokget_b2_url($location, $expires, $dialog = 0, $newname = "")
{
  // Expiry for this B2 function is the number of seconds the link is valid for. S3 uses a timestamp instead.
  // Split into account id, application key, bucket , filename
  $parts = explode("|", $location);
  $account_id = trim($parts[1]);
  $application_key = trim($parts[2]);
  $bucket_name = trim($parts[3]);
  $resource = trim($parts[4]);
  $file_name = linklokfilename($resource);
  // b2_authorize_account
  $credentials = base64_encode($account_id . ":" . $application_key);
  $url = "https://api.backblazeb2.com/b2api/v2/b2_authorize_account";
  $session = curl_init($url);
  // Add headers
  $headers = array();
  $headers[] = "Accept: application/json";
  $headers[] = "Authorization: Basic " . $credentials;
  curl_setopt($session, CURLOPT_HTTPHEADER, $headers);  // Add headers
  curl_setopt($session, CURLOPT_HTTPGET, true);  // HTTP GET
  curl_setopt($session, CURLOPT_RETURNTRANSFER, true); // Receive server response
  $server_output = curl_exec($session);
  curl_close($session);
  $acc_auth_obj = json_decode($server_output);
  //b2_list_buckets to get bucket id from name
  $api_url = $acc_auth_obj->{'apiUrl'}; // From b2_authorize_account call
  $auth_token = $acc_auth_obj->{'authorizationToken'}; // From b2_authorize_account call
  $session = curl_init($api_url .  "/b2api/v2/b2_list_buckets");
  // Add post fields
  $data = array(
    "accountId" => $acc_auth_obj->{'accountId'},
    "bucketName" => $bucket_name
  );
  $post_fields = json_encode($data);
  curl_setopt($session, CURLOPT_POSTFIELDS, $post_fields);
  // Add headers
  $headers = array();
  $headers[] = "Authorization: " . $auth_token;
  curl_setopt($session, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($session, CURLOPT_POST, true); // HTTP POST
  curl_setopt($session, CURLOPT_RETURNTRANSFER, true);  // Receive server response
  $server_output = curl_exec($session); // Let's do this!
  curl_close($session); // Clean up
  $list_buck_obj = json_decode($server_output);
  // b2_get_download_authorization
  // See if we need b2ContentDisposition
  $b2ContentDisposition = "";
  if ($dialog == 1) {
    if (($newname != "") && ($newname != $file_name))
      $b2ContentDisposition = 'attachment; filename="' . $newname . '"';
    else
      $b2ContentDisposition = 'attachment';
  } else {
    if (($newname != "") && ($newname != $file_name))
      $b2ContentDisposition = 'inline; filename="' . $newname . '"';
  }
  $api_url = $acc_auth_obj->{'apiUrl'}; // From b2_authorize_account call
  $auth_token = $acc_auth_obj->{'authorizationToken'}; // From b2_authorize_account call
  $bucket_id = $list_buck_obj->buckets[0]->bucketId; // The bucket that files can be downloaded from
  $valid_duration = $expires; // The number of seconds the authorization is valid for
  $file_name_prefix = $resource; // The file name prefix of files the download authorization will allow
  $session = curl_init($api_url .  "/b2api/v2/b2_get_download_authorization");
  // Add post fields
  $data = array(
    "bucketId" => $bucket_id,
    "validDurationInSeconds" => $valid_duration,
    "fileNamePrefix" => $file_name_prefix
  );
  if ($b2ContentDisposition != "")
    $data['b2ContentDisposition'] = $b2ContentDisposition;
  $post_fields = json_encode($data);
  curl_setopt($session, CURLOPT_POSTFIELDS, $post_fields);
  // Add headers
  $headers = array();
  $headers[] = "Authorization: " . $auth_token;
  curl_setopt($session, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($session, CURLOPT_POST, true); // HTTP POST
  curl_setopt($session, CURLOPT_RETURNTRANSFER, true);  // Receive server response
  $server_output = curl_exec($session); // Let's do this!
  curl_close($session); // Clean up
  $dwn_auth_obj = json_decode($server_output);
  $download_url = $acc_auth_obj->{'downloadUrl'}; // From b2_authorize_account call
  $auth_token = $dwn_auth_obj->{'authorizationToken'}; // From b2_authorize_account call
  $uri = $download_url . "/file/" . $bucket_name . "/" . $resource . "?Authorization=" . $auth_token;
  if ($b2ContentDisposition != "") {
    $b2ContentDisposition = str_replace('"', '%22', $b2ContentDisposition);
    $uri .= "&b2ContentDisposition=" . $b2ContentDisposition;
  }
  return ($uri);
}

function linklokfilesize_b2($location)
{
  global $ServerTimeAdjust;
  // Split into account id, application key, bucket , filename
  $parts = explode("|", $location);
  $account_id = trim($parts[1]);
  $application_key = trim($parts[2]);
  $bucket_name = trim($parts[3]);
  $resource = trim($parts[4]);
  $file_name = linklokfilename($resource);
  // b2_authorize_account
  $credentials = base64_encode($account_id . ":" . $application_key);
  $url = "https://api.backblazeb2.com/b2api/v2/b2_authorize_account";
  $session = curl_init($url);
  // Add headers
  $headers = array();
  $headers[] = "Accept: application/json";
  $headers[] = "Authorization: Basic " . $credentials;
  curl_setopt($session, CURLOPT_HTTPHEADER, $headers);  // Add headers
  curl_setopt($session, CURLOPT_HTTPGET, true);  // HTTP GET
  curl_setopt($session, CURLOPT_RETURNTRANSFER, true); // Receive server response
  $server_output = curl_exec($session);
  curl_close($session);
  $acc_auth_obj = json_decode($server_output);
  //b2_list_buckets to get bucket id from name
  $api_url = $acc_auth_obj->{'apiUrl'}; // From b2_authorize_account call
  $auth_token = $acc_auth_obj->{'authorizationToken'}; // From b2_authorize_account call
  $session = curl_init($api_url .  "/b2api/v2/b2_list_buckets");
  // Add post fields
  $data = array(
    "accountId" => $acc_auth_obj->{'accountId'},
    "bucketName" => $bucket_name
  );
  $post_fields = json_encode($data);
  curl_setopt($session, CURLOPT_POSTFIELDS, $post_fields);
  // Add headers
  $headers = array();
  $headers[] = "Authorization: " . $auth_token;
  curl_setopt($session, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($session, CURLOPT_POST, true); // HTTP POST
  curl_setopt($session, CURLOPT_RETURNTRANSFER, true);  // Receive server response
  $server_output = curl_exec($session); // Let's do this!
  curl_close($session); // Clean up
  $list_buck_obj = json_decode($server_output);
  // b2_list_file_names (used to get file info)
  $api_url = $acc_auth_obj->{'apiUrl'}; // From b2_authorize_account call
  $auth_token = $acc_auth_obj->{'authorizationToken'}; // From b2_authorize_account call
  $bucket_id = $list_buck_obj->buckets[0]->bucketId; // The bucket that files can be downloaded from
  $valid_duration = $ServerTimeAdjust; // The number of seconds the authorization is valid for
  $session = curl_init($api_url .  "/b2api/v2/b2_list_file_names");
  // Add post fields
  $data = array(
    "bucketId" => $bucket_id,
    "maxFileCount" => 1,
    "prefix" => $resource
  );
  $post_fields = json_encode($data);
  curl_setopt($session, CURLOPT_POSTFIELDS, $post_fields);
  // Add headers
  $headers = array();
  $headers[] = "Authorization: " . $auth_token;
  curl_setopt($session, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($session, CURLOPT_POST, true); // HTTP POST
  curl_setopt($session, CURLOPT_RETURNTRANSFER, true);  // Receive server response
  $server_output = curl_exec($session); // Let's do this!
  curl_close($session); // Clean up
  $file_list_obj = json_decode($server_output);
  if (isset($file_list_obj->files[0]->contentLength)) {
    if (is_numeric($file_list_obj->files[0]->contentLength))
      return ($file_list_obj->files[0]->contentLength);
  }
  return ("Unknown");
}

function linklokget_gc_url($location, $duration, $operation = "GET", $dialog = 0, $newname = "")
{
  // $duration is the number of seconds the link is valid for. S3 function uses a timestamp instead.
  $parts = explode("|", $location);
  $key = trim($parts[1]);
  $secret = trim($parts[2]);
  $bucket = trim($parts[3]);
  $filepath = trim($parts[4]);
  $filename = linklokfilename($filepath);
  $expires = new \DateTime('+ ' . $duration . ' seconds');
  $seconds = $expires->format('U');
  $objectPieces = explode('/', $filepath);
  array_walk($objectPieces, function (&$piece) {
    $piece = rawurlencode($piece);
  });
  $objectName = implode('/', $objectPieces);
  $resource = sprintf(
    '/%s/%s',
    $bucket,
    $objectName
  );
  $headers = []; // you may add any headers needed here
  $toBeSignedArray = [
    $operation,
    '', // contentMd5, can be left blank
    '', // contentType, can be left blank
    $seconds,
    implode("\n", $headers) . $resource,
  ];
  $toBeSignedString = implode("\n", $toBeSignedArray);
  $encodedSignature = urlencode(base64_encode(hash_hmac('sha1', $toBeSignedString, $secret, true)));
  $query = [];
  if ($dialog == 1) {
    $fnametouse = $filename;
    if (($newname != "") && ($newname != $filename))
      $fnametouse = $newname;
    $query[] = 'response-content-disposition=attachment;filename=' . urlencode('"' . $fnametouse . '"');
    $query[] = 'response-content-type=application%2Fforce-download';
  } else {
    if (($newname != "") && ($newname != $filename))
      $query[] = 'response-content-disposition=' . rawurlencode("inline; filename=\"" . $newname . "\"");
  }
  $query[] = 'GoogleAccessId=' . $key;
  $query[] = 'Expires=' . $seconds;
  $query[] = 'Signature=' . $encodedSignature;
  $url = "https://storage.googleapis.com/{$bucket}/{$filepath}?" . implode('&', $query);
  return ($url);
}

function linklokfilesize_gc($location)
{
  global $ServerTimeAdjust;
  $url = linklokget_gc_url($location, $ServerTimeAdjust, "HEAD");
  $size = linklokfilesize_remote($url);
  if ($size === false)
    return ("Unknown");
  return ($size);
}

function linklokget_db_url($location, $dialog, $newname)
{
  global $dropboxaccesstoken, $dropboxaccessToken;
  if (($dropboxaccesstoken == "") && ($dropboxaccessToken != ""))
    $dropboxaccesstoken = $dropboxaccessToken;
  $parts = explode("|", $location);
  $path = trim($parts[1]);
  $filename = linklokfilename($path);
  $extension = linklokfileextension($filename);
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, "https://api.dropboxapi.com/2/files/get_temporary_link");
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_POST, 1);
  $arr = array('path' => $path);
  $jArr = json_encode($arr);
  $arrNull = array("body" => "");
  $jNull = json_encode($arrNull);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $jArr);
  curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer $dropboxaccesstoken", "Content-Type: application/json"]);
  $result = curl_exec($ch);
  if (curl_errno($ch))
    return ("");
  curl_close($ch);
  $result = json_decode($result);
  return ($result->link);
}

function linklokfilesize_db($location)
{
  global $dropboxaccesstoken, $dropboxaccessToken;
  if (($dropboxaccesstoken == "") && ($dropboxaccessToken != ""))
    $dropboxaccesstoken = $dropboxaccessToken;
  $parts = explode("|", $location);
  $path = trim($parts[1]);
  $filename = linklokfilename($path);
  $extension = linklokfileextension($filename);
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, "https://api.dropboxapi.com/2/files/get_metadata");
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_POST, 1);
  $arr = array('path' => $path);
  $jArr = json_encode($arr);
  $arrNull = array("body" => "");
  $jNull = json_encode($arrNull);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $jArr);
  curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer $dropboxaccesstoken", "Content-Type: application/json"]);
  $result = curl_exec($ch);
  if (curl_errno($ch))
    return (0);
  curl_close($ch);
  $result = json_decode($result);
  return ($result->size);
}

function linklokhmacsha1($key, $data)
{
  $blocksize = 64;
  $hashfunc = 'sha1';
  if (strlen($key) > $blocksize)
    $key = pack('H*', $hashfunc($key));
  $key = str_pad($key, $blocksize, chr(0x00));
  $ipad = str_repeat(chr(0x36), $blocksize);
  $opad = str_repeat(chr(0x5c), $blocksize);
  $hmac = pack(
    'H*',
    $hashfunc(
      ($key ^ $opad) . pack(
        'H*',
        $hashfunc(
          ($key ^ $ipad) . $data
        )
      )
    )
  );
  return bin2hex($hmac);
}

function linklokhex2b64($str)
{
  $raw = '';
  for ($i = 0; $i < strlen($str); $i += 2) {
    $raw .= chr(hexdec(substr($str, $i, 2)));
  }
  return base64_encode($raw);
}

function linklokget_cdn77_url($location, $dialog, $newname)
{
  global $ServerTimeAdjust;
  $parts = explode("|", $location);
  $cdnResourceUrl = trim($parts[1]);
  $secretKey = trim($parts[2]);
  $filePath = trim($parts[3]);
  $expiryTimestamp = time() + $ServerTimeAdjust;
  $searchChars = array('+', '/');
  $replaceChars = array('-', '_');
  if ($filePath[0] != '/') {
    $filePath = "/{$filePath}";
  }
  if ($pos =  strpos($filePath, '?')) {
    $filePath = substr($filePath, 0, $pos);
  }
  $hashStr = $filePath . $secretKey;
  if ($expiryTimestamp) {
    $hashStr = $expiryTimestamp . $hashStr;
    $expiryTimestamp = ",{$expiryTimestamp}";
  }
  return  "{$cdnResourceUrl}{$filePath}?secure=" . str_replace($searchChars, $replaceChars, base64_encode(md5($hashStr, TRUE))) . $expiryTimestamp;
}

function linklokfilesize_cdn77($location)
{
  return ("Unknown");
}

function llurlgroup($groups)
{
  global $LinklokKey;
  print "<input type=\"hidden\" name=\"sl\" value=\"" . $groups . "|" . md5($LinklokKey . $groups) . "\">\n";
}

function llurlcustom($field, $cusnum, $append)
{
  global $LinklokKey;
  print "<input type=\"hidden\" name=\"sc[]\" value=\"" . $field . "|" . $cusnum . "|" . ($append ? 1 : 0) . "|" . md5($LinklokKey . $field . $cusnum . ($append ? 1 : 0)) . "\">\n";
}

function linklokaweberlist($awlist)
{
  print "<input type=\"hidden\" name=\"aw\" value=\"$awlist\">\n";
}

function linklokAWeberSubscribe($awlist, $fnametosend)
{
  global $YourCompany, $YourEmail, $ipaddr;
  if (!linklokvalidemail($awlist))
    return;
  if (!linklokvalidemail($_REQUEST['email']))
    return;
  $subject  = "Subscribe Member - Linklok URL";
  $mailBody = "\n";
  if (!empty($_GET)) {
    foreach ($_GET as $namepair => $valuepair) {
      $$namepair = $valuepair;
      if ((strlen($namepair) > 2) && ($namepair != "linklokform") && ($namepair != "turing"))
        $mailBody .= $namepair . ": " . trim($valuepair) . "\n\n";
    }
  }
  if (!empty($_POST)) {
    foreach ($_POST as $namepair => $valuepair) {
      $$namepair = $valuepair;
      if ((strlen($namepair) > 2) && ($namepair != "linklokform") && ($namepair != "turing"))
        $mailBody .= $namepair . " : " . trim($valuepair) . "\n\n";
    }
  }
  $mailBody .= "ip: " . $ipaddr . "\n\n";
  for ($k = 0; $k < count($fnametosend); $k++) {
    $mailBody .= "file" . $k . ": " . $fnametosend[$k];
    if ($floctosend[$k] != "")
      $mailBody .= " from " . $floctosend[$k];
    $mailBody .= "\n\n";
  }
  linklokSendEmailOut($awlist, $YourEmail, $YourCompany, $subject, $mailBody, "N");
  return;
}

function linklokgetresponse($campaign)
{
  print "<input type=\"hidden\" name=\"gr\" value=\"$campaign\">\n";
}

function linklok_GetResponseSubscribe($grcampaign)
{
  global $getresponseapikey;
  $name = "";
  $email = "";
  if ($_GET['name'] != "")
    $name = $_GET['name'];
  if ($_POST['name'] != "")
    $name = $_POST['name'];
  if ($_GET['email'] != "")
    $email = $_GET['email'];
  if ($_POST['email'] != "")
    $email = $_POST['email'];
  if (($name == "") || (!linklokvalidemail($email)))
    return;
  $api_key = $getresponseapikey;
  # API 2.x URL
  $api_url = 'http://api2.getresponse.com';
  # initialize JSON-RPC client
  $client = new jsonRPCClient($api_url);
  $result = NULL;
  # get CAMPAIGN_ID from name
  try {
    $result = $client->get_campaigns(
      $api_key,
      array(
        # find by name literally
        'name' => array('EQUALS' => $grcampaign)
      )
    );
  } catch (Exception $e) {
    $grerror = true;
  }
  if (!$grerror) {
    $CAMPAIGN_ID = array_pop(array_keys($result));
    # add contact to campaign
    try {
      $result = $client->add_contact(
        $api_key,
        array(
          'campaign'  => $CAMPAIGN_ID,
          'name'      => $name,
          'email'     => $email,
          'cycle_day' => '0'
          //            ,
          //            'customs' => array(
          //                array(
          //                    'name'       => 'last_purchased_product',
          //                    'content'    => 'netbook'
          //                )
          //            )
        )
      );
    } catch (Exception $e) {
      $grerror = true;
    }
  }
}

function linklokmailchimp($listid)
{
  print "<input type=\"hidden\" name=\"mc\" value=\"$listid\">\n";
}

function linklok_MailchimpSubscribe($mclistid)
{
  global $mailchimpapikey;
  $name = "";
  $email = "";
  if ($_GET['name'] != "")
    $name = $_GET['name'];
  if ($_POST['name'] != "")
    $name = $_POST['name'];
  if ($_GET['email'] != "")
    $email = $_GET['email'];
  if ($_POST['email'] != "")
    $email = $_POST['email'];
  if (($name == "") || (!linklokvalidemail($email)))
    return;
  // Split into first and last name if possible
  $namesarray = explode(" ", trim($name));
  $firstname = $namesarray[0];
  $lastname = $namesarray[count($namesarray) - 1];
  $MailChimp = new MailChimp($mailchimpapikey);
  $result = $MailChimp->post("lists/$mclistid/members", [
    'email_address' => $email,
    'merge_fields' => ['FNAME' => $firstname, 'LNAME' => $lastname],
    'status'        => 'subscribed',
  ]);
  $mcerror = $MailChimp->success();
}

function linklokarpreach($campaign)
{
  print "<input type=\"hidden\" name=\"ar\" value=\"$campaign\">\n";
}

function linklok_ARPReachsubscribe($autoresponderurl)
{
  $name = "";
  $email = "";
  if ($_GET['name'] != "")
    $name = $_GET['name'];
  if ($_POST['name'] != "")
    $name = $_POST['name'];
  if ($_GET['email'] != "")
    $email = $_GET['email'];
  if ($_POST['email'] != "")
    $email = $_POST['email'];
  if (($name == "") || (!linklokvalidemail($email)))
    return;
  $namesarray = explode(" ", trim($name));
  $firstname = $namesarray[0];
  $lastname = $namesarray[count($namesarray) - 1];
  $post_fields = array(
    'email_address' => $email,
    'first_name' => $first_name,
    'last_name' => $last_name
  );
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_USERAGENT, 'ARPR');
  curl_setopt($ch, CURLOPT_URL, $autoresponderurl);
  curl_setopt($ch, CURLOPT_POST, TRUE);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
  $res = curl_exec($ch);
  curl_close($ch);
}

function linklokEmailDownloadNotify($fname, $id, $ipaddr, $expiry)
{
  global $NotifyDownloadEmail, $YourCompany, $YourEmail, $DownloadLog;
  if (function_exists('vl_geoip2')) {
    $clientipinfo = vl_geoip2($ipaddr);
    $ipdata = $ipaddr . " (" . $clientipinfo['countryname'] . ")";
  } else
    $ipdata = "IP : " . $ipaddr;
  if ($DownloadLog != "") {
    file_put_contents($DownloadLog, "," . $id . ",,," . $fname . "," . $ipdata . "," . date("d M Y H:i:s") . "," . date("d M Y H:i:s", $expiry) . "," . $_SERVER['HTTP_USER_AGENT'] . "\n", FILE_APPEND);
  }
  if ($NotifyDownloadEmail != "log") {
    $subject = "Linklok URL Download of $fname";
    $mailBody = "Download notification.\n\n";
    $mailBody .= "Filename : " . $fname . "\n";
    $mailBody .= "ID : " . $id . "\n";
    $mailBody .= "IP : " . $ipdata . "\n";
    $mailBody .= "Download time : " . date("d M Y H:i:s") . "\n";
    $mailBody .= "Expiry time : " . date("d M Y H:i:s", $expiry) . "\n";
    $mailBody .= "User agent : " . $_SERVER['HTTP_USER_AGENT'] . "\n";
    $mailBody .= "\n";
    linklokSendEmailOut($NotifyDownloadEmail, $YourEmail, $YourCompany, $subject, $mailBody, "N");
  }
  return;
}

function linklokGetBitlyURL($login, $key, $url)
{
  $callurl = "http://api.bitly.com/v3/shorten?login=" . $login . "&apiKey=" . $key . "&longUrl=" . urlencode($url) . "&format=txt";
  $ret = linklokcallurl("$callurl");
  if (linklokisValidURL($ret))
    return ($ret);
  return ("");
}

function linklokGetTinyURL($login, $key, $url, $note)
{
  $callurl = "https://d.tiny.cc/?c=rest_api&m=shorten&version=2.0.3&format=json&longUrl=" . urlencode($url) . "&note=" . urlencode($note) . "&login=" . $login . "&apiKey=" . $key;
  $ret = linklokcallurl($callurl);
  $obj = json_decode($ret);
  if ($obj->errorCode != 0) {
    return ("");
  }
  return ($obj->results->short_url);
}

function linklokcallurl($url)
{
  $url = str_replace("@", "%40", $url);
  $url = str_replace(" ", "%20", $url);
  if (function_exists('curl_init')) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    if ((strtolower(@ini_get("safe_mode")) != 'on') && (@ini_get("safe_mode") != '1') && (@ini_get("open_basedir") == '')) {
      curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    }
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    $buf = curl_exec($ch);
    curl_close($ch);
  } else {
    if (!($fh = fopen($url, "rb"))) {
      return ("Could not contact page");
    }
    $buf = "";
    do {
      $buf1 = fread($fh, 100000);
      if (strlen($buf1) == 0) {
        break;
      }
      $buf .= $buf1;
    } while (true);
    fclose($fh);
  }
  return ($buf);
}

function linklokisValidURL($url)
{
  return preg_match('|^http(s)?://[a-z0-9-]+(.[a-z0-9-]+)*(:[0-9]+)?(/.*)?$|i', $url);
}
