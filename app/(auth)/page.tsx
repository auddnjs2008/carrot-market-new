import Link from 'next/link';
import "@/lib/db";

export default function Home() {
  return (
    <div className='p-6 flex flex-col items-center justify-between min-h-screen'>
      <div className="flex flex-col gap-5 my-auto *:font-medium">
        <span className="text-9xl flex flex-col  items-center gap-2">🥕</span>
        <h1 className="text-4xl">당근</h1>
        <h2 className="text-2xl">당근 마켓에 어서오세요!</h2>
      </div>
      <div className="flex flex-col items-center gap-2 w-full">
        <Link href="/create-account" className="primary-btn py-2.5 text-lg">시작하기</Link>
        <div className='flex gap-2 '>
          <span>이미 계정이 있나요?</span>
          <Link href="/login" className='hover:underline'>로그인</Link>
        </div>
      </div>
    </div>
  );
}
