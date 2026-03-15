import { NextRequest, NextResponse } from 'next/server';

const APP_STORE_URL = 'https://apps.apple.com/app/your-app-id';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.yourcompany.{{PROJECT_NAME}}';
const APP_SCHEME = '{{PROJECT_NAME}}';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const userAgent = request.headers.get('user-agent') || '';

  // Try deep link first, then fallback to store
  const deepLink = `${APP_SCHEME}://referral/${code}`;

  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);

  const fallbackUrl = isAndroid ? PLAY_STORE_URL : APP_STORE_URL;

  // Serve an HTML page that attempts deep link then falls back to store
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Opening app...</title>
</head>
<body>
  <p>Redirecting you to the app...</p>
  <script>
    window.location.href = "${deepLink}";
    setTimeout(function() {
      window.location.href = "${fallbackUrl}";
    }, 2000);
  </script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
