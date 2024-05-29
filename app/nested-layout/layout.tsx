export default function FirstLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="text-center mt-6">
      <p>Layout 1</p>
      {children}
    </main>
  )
}
