import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <style jsx global>
          {`
            body {
              font-family: 'Helvetica', 'Arial', sans-serif;
              margin: 0;
              padding: 0;
            }
          `}
        </style>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
