import NFCComponent from '@/components/nfcReader'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>NFC Reader</p>
      <NFCComponent/>
    </main>
  )
}
