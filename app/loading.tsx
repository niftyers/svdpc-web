import Image from "next/image"

export default function PageLoading() {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-zinc-50 px-4">
      <div className="flex max-w-sm flex-col items-center gap-6 text-center">
        <div className="relative w-42 sm:w-60">
          <Image
            src="/logo.png"
            alt="Greenland Bio Organic Fertilizer"
            width={400}
            height={160}
            priority
            className="h-auto w-full"
          />
        </div>
        <div className="mt-6 size-8 animate-spin rounded-full border-5 border-slate-200 border-t-emerald-600" />
        <p className="text-sm text-zinc-600 sm:text-xs">
          Please wait a moment
          <br />
          We are getting everything ready.
        </p>
      </div>
    </div>
  )
}
