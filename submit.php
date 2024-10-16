<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Create a PHPMailer instance for confirmation email
    $confirmMail = new PHPMailer(true);
    // Create a separate PHPMailer instance for the company email
    $companyMail = new PHPMailer(true);

    try {
        // SMTP settings for both emails
        $smtpHost = 'smtp.gmail.com';
        $smtpAuth = true;
        $smtpUsername = 'basedtalentsnoreply@gmail.com'; // Your Gmail address
        $smtpPassword = 'jwmu tdfb uzzk ctje'; // App Password (secure credentials)
        $smtpSecure = 'tls';
        $smtpPort = 587;

        // Generate an 8-digit unique ID with random letters
        function generateUniqueId() {
            $digits = mt_rand(10000000, 99999999);  // Generate an 8-digit number
            $letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';  // Available letters
            $uniqueId = str_split((string)$digits);  // Split the number into an array

            // Randomly insert 2-4 letters into the 8-digit number
            $numLetters = mt_rand(2, 4);
            for ($i = 0; $i < $numLetters; $i++) {
                $randomLetter = $letters[mt_rand(0, strlen($letters) - 1)];
                $position = mt_rand(0, count($uniqueId));  // Random position to insert the letter
                array_splice($uniqueId, $position, 0, $randomLetter);
            }

            return implode('', $uniqueId);  // Join the array back into a string
        }

        $uniqueId = generateUniqueId();

        // Collect form input data securely
        $firstName = htmlspecialchars($_POST['firstName']);
        $lastName = htmlspecialchars($_POST['lastName']);
        $height = htmlspecialchars($_POST['height']);
        $dob = htmlspecialchars($_POST['dob']);
        $gender = htmlspecialchars($_POST['gender']);
        $email = htmlspecialchars($_POST['email']);
        $confirmEmail = htmlspecialchars($_POST['confirmEmail']);
        $phone = htmlspecialchars($_POST['phone']);
        $instagram = htmlspecialchars($_POST['instagram']);
        $address = htmlspecialchars($_POST['address']);
        $addressLine2 = htmlspecialchars($_POST['addressLine2']);
        $apartmentNumber = htmlspecialchars($_POST['apartmentNumber']);
        $city = htmlspecialchars($_POST['city']);
        $state = htmlspecialchars($_POST['state']);
        $postalCode = htmlspecialchars($_POST['postalCode']);
        $waistSize = htmlspecialchars($_POST['waistSize']);
        $hipSize = htmlspecialchars($_POST['hipSize']);
        $bustSize = htmlspecialchars($_POST['bustSize']);
        $cupSize = htmlspecialchars($_POST['cupSize']);
        $dressSize = htmlspecialchars($_POST['dressSize']);
        $shoeSize = htmlspecialchars($_POST['shoeSize']);
        $hairColor = htmlspecialchars($_POST['hairColor']);
        $eyeColor = htmlspecialchars($_POST['eyeColor']);
        $messageInput = htmlspecialchars($_POST['message']);

        // Start building the email body for company email
        $message = "<html><body>";
        $message .= "<p>First Name: $firstName</p>";
        $message .= "<p>Last Name: $lastName</p>";
        $message .= "<p>Date of Birth: $dob</p>";
        $message .= "<p>Gender: $gender</p>";
        $message .= "<p>Email: $email</p>";
        $message .= "<p>Phone: $phone</p>";
        $message .= "<p>Instagram: $instagram</p>";
        $message .= "<p>Address: $address</p>";
        $message .= "<p>Address Line 2: $addressLine2</p>";
        $message .= "<p>Apartment Number: $apartmentNumber</p>";
        $message .= "<p>City: $city</p>";
        $message .= "<p>State: $state</p>";
        $message .= "<p>Postal Code: $postalCode</p>";
        $message .= "<p>Waist Size: $waistSize</p>";
        $message .= "<p>Hip Size: $hipSize</p>";
        $message .= "<p>Bust Size: $bustSize</p>";
        if (!empty($cupSize)) {
            $message .= "<p>Cup Size: $cupSize</p>";
        }
        if (!empty($dressSize)) {
            $message .= "<p>Dress Size: $dressSize</p>";
        }
        $message .= "<p>Height: $height</p>";
        $message .= "<p>Shoe Size: $shoeSize</p>";
        $message .= "<p>Hair Color: $hairColor</p>";
        $message .= "<p>Eye Color: $eyeColor</p>";
        $message .= "<p><strong>Message:</strong> $messageInput</p>";

        // Handle file uploads for headshots and full-body shots
        if (isset($_FILES['headshot']) && count($_FILES['headshot']['tmp_name']) > 0) {
            $message .= "<p style='font-weight: bold; font-size: 18px;'>Headshot(s):</p>";
            foreach ($_FILES['headshot']['tmp_name'] as $index => $tmpName) {
                if (!empty($tmpName)) {
                    $fileName = $_FILES['headshot']['name'][$index];
                    $fileType = $_FILES['headshot']['type'][$index];
                    $fileContent = file_get_contents($tmpName);

                    $cid = md5($fileName);
                    $companyMail->addStringEmbeddedImage($fileContent, $cid, $fileName, 'base64', $fileType);
                    $message .= "<p><img src='cid:$cid' alt='$fileName'></p>";
                }
            }
        }

        if (isset($_FILES['fullBodyShot']) && count($_FILES['fullBodyShot']['tmp_name']) > 0) {
            $message .= "<p style='font-weight: bold; font-size: 18px;'>Full Body Shot(s):</p>";
            foreach ($_FILES['fullBodyShot']['tmp_name'] as $index => $tmpName) {
                if (!empty($tmpName)) {
                    $fileName = $_FILES['fullBodyShot']['name'][$index];
                    $fileType = $_FILES['fullBodyShot']['type'][$index];
                    $fileContent = file_get_contents($tmpName);

                    $cid = md5($fileName);
                    $companyMail->addStringEmbeddedImage($fileContent, $cid, $fileName, 'base64', $fileType);
                    $message .= "<p><img src='cid:$cid' alt='$fileName'></p>";
                }
            }
        }

        $message .= "</body></html>";

        // SMTP settings for the confirmation email
        $confirmMail->isSMTP();
        $confirmMail->Host = $smtpHost;
        $confirmMail->SMTPAuth = $smtpAuth;
        $confirmMail->Username = $smtpUsername;
        $confirmMail->Password = $smtpPassword;
        $confirmMail->SMTPSecure = $smtpSecure;
        $confirmMail->Port = $smtpPort;

        // Set sender and recipient for the confirmation email
        $confirmMail->setFrom('basedtalentsnoreply@gmail.com', 'Based Talents');
        $confirmMail->addAddress($email); // User's email

        // Email content for confirmation email
        $confirmMail->isHTML(true);
        $confirmMail->Subject = "Based Confirmation Email #$uniqueId";
        $confirmMail->Body = "<p>Dear $firstName $lastName,</p>
            <p>Thank you for submitting your application</p>
            <p>We will review your application and get back to you shortly.</p>
            <p>Best regards,<br>Based Talents Team</p>";
            

        // Attempt to send the confirmation email
        $confirmMail->send();

        // If the confirmation email is sent successfully, proceed to send the company email

        // SMTP settings for the company email
        $companyMail->isSMTP();
        $companyMail->Host = $smtpHost;
        $companyMail->SMTPAuth = $smtpAuth;
        $companyMail->Username = $smtpUsername;
        $companyMail->Password = $smtpPassword;
        $companyMail->SMTPSecure = $smtpSecure;
        $companyMail->Port = $smtpPort;

        // Set sender and recipient for the company email
        $companyMail->setFrom('basedtalentsnoreply@gmail.com', 'Based Talents');
        $companyMail->addAddress('lee.arthur2000@gmail.com'); // Company email

        // Set the email body for the company email
        $companyMail->isHTML(true);
        $companyMail->Subject = "Test Form Submission #$uniqueId";
        $companyMail->Body = $message;  // Use the message body built earlier

        // Send the company email
        $companyMail->send();

        // If both emails are sent successfully, redirect the user
        header('Location: thank-you.php');
        exit; // Ensure no further code is executed after redirection

    } catch (Exception $e) {
        // Redirect to the error page
        header('Location: error.php');
        exit(); // Terminate script after redirecting
    }
}
?>
