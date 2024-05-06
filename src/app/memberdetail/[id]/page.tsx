import Header from '../../components/layouts/Header';
import Image from 'next/image';

interface Member {
  name: string;
  role: string;
  location: string;
  description: string;
  image: string;
}

// 仮のデータソース
const members: Record<string, Member> = {
  daiki: {
    name: "Daiki Nakamori",
    role: "インタラクティブデザイナー",
    location: "Tokyo",
    description: "Daikiはインタラクティブデザインにおいて10年以上の経験を持ち、多くの成功したプロジェクトをリードしてきました。",
    image: "/img/avatar_1.png"
  },
  emiko: {
    name: "Emiko Kudo",
    role: "開発者",
    location: "Tokyo",
    description: "Emikoはフロントエンドとバックエンドの両方で活躍しています。",
    image: "/img/avatar_2.png"
  },
  erika: {
    name: "Erika Oba",
    role: "プロジェクトマネージャー",
    location: "Tokyo",
    description: "Erikaはプロジェクトのスケジュールとチームの管理を得意としています。",
    image: "/img/avatar_3.png"
  }
};

export async function generateStaticParams() {
  return Object.keys(members).map((id) => ({ id }));
}

interface Props {
  params: { id: string };
}

export default function MemberDetail({ params }: Props) {
  const member = members[params.id];

  if (!member) {
    return <div>メンバーが見つかりませんでした。</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[var(--sub3)]">
      <Header />
      <div className="px-5 py-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mt-12">{/* 上部の余白を追加 */}
            <Image 
              src={member.image}
              alt={member.name}
              width={200} 
              height={200}
              className="rounded-full mx-auto"
            />
          </div>
          <h1 className="text-2xl font-bold mt-8">{member.name}</h1>
          <p className="text-lg mt-2">{member.role}, {member.location}</p>
          <p className="mt-4">{member.description}</p>
        </div>
      </div>
    </div>
  );
}