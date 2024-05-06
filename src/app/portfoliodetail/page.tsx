"use client";

import Header from "../components/layouts/Header";
import Image from 'next/image';
import Link from "next/link";

export default function PortfolioDetail() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--sub3)]">
      <Header />
      <div className="px-5 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="mt-8 mb-8">
            <Image src="/img/image1.png" alt="プロジェクトの詳細画像" width={500} height={300} className="mx-auto rounded-lg shadow-lg" />
          </div>
          <div className="text-lg">
            <h1 className="text-2xl font-bold mb-3">プロジェクト名</h1>
            <p>ここにプロジェクトの詳細な説明が入ります。この部分にはプロジェクトの目的、使用技術、達成した成果などが記載されます。</p>
          </div>
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">プロジェクトメンバー</h2>
            <div className="grid grid-cols-3 gap-4">
              <Link href="/memberdetail/daiki">
                <div className="cursor-pointer">
                  <Image src="/img/avatar_1.png" alt="Daiki Nakamori" width={96} height={96} className="rounded-full" />
                  <p className="mt-2">Daiki Nakamori</p>
                  <p className="text-sm text-gray-600">インタラクティブデザイナー, Tokyo</p>
                </div>
              </Link>
              <Link href="/memberdetail/emiko">
                <div className="cursor-pointer">
                  <Image src="/img/avatar_2.png" alt="Emiko Kudo" width={96} height={96} className="rounded-full" />
                  <p className="mt-2">Emiko Kudo</p>
                  <p className="text-sm text-gray-600">開発者, Tokyo</p>
                </div>
              </Link>
              <Link href="/memberdetail/erika">
                <div className="cursor-pointer">
                  <Image src="/img/avatar_3.png" alt="Erika Oba" width={96} height={96} className="rounded-full" />
                  <p className="mt-2">Erika Oba</p>
                  <p className="text-sm text-gray-600">プロジェクトマネージャー, Tokyo</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}