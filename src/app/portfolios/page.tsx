"use client";

import Header from "../components/layouts/Header";
import Link from "next/link";

export default function Portfolio() {
  return (
    <div className="flex flex-col h-screen bg-[var(--sub3)]">
      <Header />
      <div className="mt-20 px-5">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/portfoliodetail" className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
            <img src="/img/image1.png" alt="Description of image 1" />
            <div className="text-center mt-2">
              <p className="font-bold">プロジェクト名</p>
              <p>評価: ★★★★★</p>
              <p>メンバー: 名前 名前 名前</p>
              <p>スキル: 技術 技術 技術</p>
            </div>
          </Link>
          <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
            <img src="/img/image2.png" alt="Description of image 2" />
            <div className="text-center mt-2">
              <p className="font-bold">プロジェクト名</p>
              <p>評価: ★★★★★</p>
              <p>メンバー: 名前 名前 名前</p>
              <p>スキル: 技術 技術 技術</p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
            <img src="/img/image1.png" alt="Description of image 3" />
            <div className="text-center mt-2">
              <p className="font-bold">プロジェクト名</p>
              <p>評価: ★★★★★</p>
              <p>メンバー: 名前 名前 名前</p>
              <p>スキル: 技術 技術 技術</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}