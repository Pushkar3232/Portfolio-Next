import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Pushkar Shinde',
  description: 'Privacy Policy for the Pushkar Shinde portfolio website.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">We value your privacy.</p>

        <section className="mt-10 space-y-6 text-base leading-7">
          <p>
            Our website may display ads served by Google AdSense. These ads may use cookies to show relevant advertisements to users.
          </p>
          <p>
            We may collect basic information such as browser type, device information, and usage data to improve our services.
          </p>
          <p>We do not sell or share your personal data with third parties.</p>
          <p>
            By using our website, you consent to our Privacy Policy.
          </p>
          <p>
            If you have any questions, contact us at [your email].
          </p>
        </section>
      </div>
    </main>
  )
}
