export default function LandingPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>{{PROJECT_NAME}}</h1>
      <p>Your app description here.</p>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <a href="https://apps.apple.com/app/your-app-id" target="_blank" rel="noopener noreferrer">
          Download on the App Store
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.yourcompany.{{PROJECT_NAME}}" target="_blank" rel="noopener noreferrer">
          Get it on Google Play
        </a>
      </div>
    </main>
  );
}
