import PageLayout from "@/components/layout/PageLayout"

export default function ConfirmationPage() {
  return (
    <PageLayout>
      <main className="flex-1 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-[var(--text)]">Check your inbox</h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            We've sent a confirmation link to your email. Click it to activate your account.
          </p>
        </div>
      </main>
    </PageLayout>
  )
}
