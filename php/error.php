<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error Occurred</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
        }
        h1 {
            font-size: 24px;
            color: #f44336; /* Red for error */
        }
        p {
            font-size: 16px;
            color: #333;
        }
        .small-text {
            font-size: 14px;
            color: #888;
        }
        .btn {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #f44336; /* Red button for error */
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            transition: background-color 0.3s ease;
        }
        .btn:hover {
            background-color: #d32f2f;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Error: Invalid Email</h1>
        <p class="small-text">There was an issue with your email submission. Please double-check your information and try again.</p>

        <!-- Return to website button -->
        <a href="index.html" class="btn">Return to Homepage</a>
    </div>
</body>
</html>
