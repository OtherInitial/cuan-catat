import * as React from 'react';

interface ResetPasswordEmailProps {
  userName: string;
  resetLink: string;
}

export const ResetPasswordEmail: React.FC<ResetPasswordEmailProps> = ({
  userName,
  resetLink,
}) => (
  <html lang="id">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Reset Password</title>
    </head>
    <body style={styles.body}>
      <main style={styles.main}>
        <div style={styles.container}>
          <h1 style={styles.heading}>Reset Password Anda</h1>
          
          <p style={styles.text}>Halo {userName},</p>
          
          <p style={styles.text}>
            Kami menerima permintaan untuk mereset password akun Cuan Catat Anda. 
            Klik tombol di bawah ini untuk melanjutkan. Link ini akan kedaluwarsa dalam 1 jam.
          </p>
          
          <a
            href={resetLink}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.button}
          >
            Reset Password
          </a>
          
          <p style={styles.text}>
            Jika tombol di atas tidak berfungsi, silakan salin dan tempel URL berikut 
            di browser Anda:
          </p>
          
          {/* Link Fallback */}
          <a
            href={resetLink}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            {resetLink}
          </a>
          
          <hr style={styles.hr} />
          
          <p style={styles.footer}>
            Jika Anda tidak merasa meminta reset password, Anda bisa mengabaikan email ini 
            dengan aman.
          </p>
        </div>
      </main>
    </body>
  </html>
);

const styles: { [key: string]: React.CSSProperties } = {
  body: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    backgroundColor: '#f4f4f7',
    margin: 0,
    padding: 0,
  },
  main: {
    width: '100%',
    padding: '20px 0',
  },
  container: {
    maxWidth: '580px',
    margin: '0 auto',
    padding: '40px',
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#1a1a1a',
    marginTop: 0,
  },
  text: {
    fontSize: '16px',
    lineHeight: 1.6,
    color: '#333333',
    marginBottom: '20px',
  },
  button: {
    display: 'inline-block',
    padding: '14px 24px',
    backgroundColor: '#000000', // Hitam (sesuai tema Cuan Catat)
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 500,
    fontSize: '16px',
    textAlign: 'center' as const,
  },
  link: {
    color: '#000000',
    textDecoration: 'underline',
    wordBreak: 'break-all' as const,
  },
  hr: {
    borderColor: '#e0e0e0',
    borderWidth: '0.5px',
    margin: '30px 0',
  },
  footer: {
    fontSize: '14px',
    color: '#888888',
    lineHeight: 1.5,
  },
};

export default ResetPasswordEmail;