import Link from "next/link";
import Header from "../components/layouts/Header";
import { getPortfolios } from '@/../libs/client'; // パスの修正が必要な場合は適宜行ってください

export default async function PortfolioPage() {
  const portfolios = await getPortfolios();

  if (!portfolios) {
    return <h1>No Contents</h1>;
  }

  return (
    <div className="flex flex-col h-screen bg-[var(--sub3)]">
      <Header />
      <div className="mt-20 px-5">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolios.map((portfolio) => ( // 変数名を `portfolio` に変更
            <Link key={portfolio.id} href={`/portfoliodetail/${portfolio.id}`} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
              <img src={portfolio.pj_image} alt={portfolio.pj_name} />
              <div className="text-center mt-2">
                <p className="font-bold">{portfolio.pj_name}</p>
                <p>タグ: {portfolio.pj_tags.join(', ')}</p>
                <p>メンバー: {portfolio.pj_members.join(', ')}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
