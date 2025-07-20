<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "georgearrev@gmail.com";
    $name = htmlspecialchars($_POST["name"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars($_POST["subject"]);
    $message = htmlspecialchars($_POST["message"]);

    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";

    $body = "Pesan baru dari website kontak:\n\n";
    $body .= "Nama: $name\n";
    $body .= "Email: $email\n";
    $body .= "Subjek: $subject\n\n";
    $body .= "Pesan:\n$message\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('Pesan berhasil dikirim!'); window.history.back();</script>";
    } else {
        echo "<script>alert('Pesan gagal dikirim. Silakan coba lagi.'); window.history.back();</script>";
    }
} else {
    http_response_code(403);
    echo "Permintaan tidak diizinkan.";
}
?>
