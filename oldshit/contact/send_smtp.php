<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer (you'll need to download and include these files)
// require 'vendor/autoload.php'; // if using Composer
// require 'PHPMailer/src/Exception.php';
// require 'PHPMailer/src/PHPMailer.php';
// require 'PHPMailer/src/SMTP.php';

// Get form data
$name = $_REQUEST['name'] ?? '';
$email = $_REQUEST['Email'] ?? '';
$message = $_REQUEST['Message'] ?? '';

// Validate input
if (empty($name) || empty($email) || empty($message)) {
    echo "<script type='text/javascript'>
        alert('Please fill in all fields correctly');
        window.history.go(-1);
    </script>";
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "<script type='text/javascript'>
        alert('Please enter a valid email address');
        window.history.go(-1);
    </script>";
    exit;
}

// Create PHPMailer instance
$mail = new PHPMailer(true);

try {
    // SMTP Configuration (update with your SMTP settings)
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com'; // Replace with your SMTP server
    $mail->SMTPAuth   = true;
    $mail->Username   = 'your-email@gmail.com'; // Replace with your email
    $mail->Password   = 'your-app-password'; // Replace with your app password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Recipients
    $mail->setFrom($email, $name);
    $mail->addAddress('nell@nellwatson.com', 'Nell Watson');
    $mail->addAddress('a.g.hessami@gmail.com', 'Ali Hessami');
    $mail->addReplyTo($email, $name);

    // Content
    $mail->isHTML(false); // Set to plain text
    $mail->Subject = "Psychopathia Machinalis Contact Form Submission";
    $mail->Body    = "Name: " . $name . "\n" .
                    "Email: " . $email . "\n\n" .
                    "Message:\n" . $message;

    $mail->send();
    
    echo "<script type='text/javascript'>
        alert('Your message has been sent successfully!');
        window.history.go(-1);
    </script>";
    
} catch (Exception $e) {
    echo "<script type='text/javascript'>
        alert('Message could not be sent. Mailer Error: {$mail->ErrorInfo}');
        window.history.go(-1);
    </script>";
}
?> 