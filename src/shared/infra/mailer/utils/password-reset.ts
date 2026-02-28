const passwordResetEmailHtmlTemplate = (code: string) => 
`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            color: #333;
        }
        .code-container {
            text-align: center;
            margin: 30px 0;
            padding: 20px;
            background-color: #f8f9fa;
            border: 2px dashed #007bff;
            border-radius: 6px;
        }
        .code {
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 5px;
            color: #007bff;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #888;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Redefinição de Senha</h2>
            <p>Você solicitou a alteração da sua senha. Use o código abaixo para continuar:</p>
        </div>
        
        <div class="code-container">
            <span class="code">${code}</span> </div>

        <p style="color: #555; line-height: 1.5;">
            Este código é válido por <strong>10 minutos</strong>. Se você não solicitou esta alteração, ignore este e-mail por segurança.
        </p>

        <div class="footer">
            <p>&copy; 2026 Clube de Descontos. Todos os direitos reservados.</p>
        </div>
    </div>
</body>
</html>
`

export { passwordResetEmailHtmlTemplate };