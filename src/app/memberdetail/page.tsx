"use client";

import Header from "../components/layouts/Header";
import Link from "next/link";

export default function MemberDetail() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--sub3)]">
      <Header />
      <div className="px-5 py-10">
        <div className="max-w-4xl mx-auto text-center">
          <img src="/img/avatar_1.png" alt="Daiki Nakamori" className="w-48 h-48 rounded-full mx-auto" />
          <h1 className="text-2xl font-bold mt-4">Daiki Nakamori</h1>
          <p className="text-lg mt-2">インタラクティブデザイナー, Tokyo</p>
          <p className="mt-4">Daikiはインタラクティブデザインにおいて10年以上の経験を持ち、多くの成功したプロジェクトをリードしてきました。</p>
        </div>
      </div>
    </div>
  );
}