// microCMS api の 初期設定
import { createClient } from 'microcms-js-sdk';

export type Portfolio = {
    id: string;
    pj_name: string;
    pj_image: string; // 最初の画像のURLのみを保持
    pj_members: string[]; // メンバー名の配列
    pj_tags: string[]; // タグ名の配列
}

export type PortfolioDetail = {
    id: string;
    pj_name: string;
    pj_intro: string;
    pj_images: string[]; // 複数の画像URLを保持
    pj_members: {
        id: string; // メンバーのIDを追加
        name: string;
        icon: string;
        job: string;
    }[]; // メンバーの情報を保持
    pj_tags: string[]; // タグ名の配列
}

export type Member = {
    id: string;
    name: string;
    icon: string;
    intro: string;
    role: string[];
    job: string;
};

if (!process.env.SERVICE_DOMAIN) {
    throw new Error("SERVICE_DOMAIN is required");
}

if (!process.env.API_KEY) {
    throw new Error("API_KEY is required");
}

export const client = createClient({
    serviceDomain: process.env.SERVICE_DOMAIN,
    apiKey: process.env.API_KEY,
});

// ポートフォリオ一覧を取得し、必要なデータのみを抽出する関数
export const getPortfolios = async () => {
    const response = await client.getList<any>({ endpoint: "port" });

    const portfolios = response.contents.map((item: any) => {
        const portfolio = {
            id: item.id,
            pj_name: item.pj_name,
            pj_image: item.pj_image[0].url, // 最初の画像のURL
            pj_members: item.pj_member.map((member: any) => member.name), // メンバー名の配列
            pj_tags: item.pj_tag.map((tag: any) => tag.name) // タグ名の配列
        };
        return portfolio;
    });

    return portfolios;
}

// 特定のポートフォリオの詳細データを取得する関数
export const getPortfolioDetail = async (contentId: string) => {
    console.log(`ポートフォリオ(id: ${contentId})の詳細データの取得を開始します。`);
    const response = await client.getListDetail<any>({ endpoint: "port", contentId });

    const portfolioDetail: PortfolioDetail = {
        id: response.id,
        pj_name: response.pj_name,
        pj_intro: response.pj_intro,
        pj_images: response.pj_image.map((image: any) => image.url),
        pj_members: response.pj_member.map((member: any) => ({
            id: member.id, // メンバーのIDを追加
            name: member.name,
            icon: member.icon.url,
            job: member.job,
        })),
        pj_tags: response.pj_tag.map((tag: any) => tag.name),
    };

    return portfolioDetail;
};


export const getMember = async (id: string): Promise<Member> => {
    const data = await client.getListDetail<any>({ endpoint: "member", contentId: id });
    return {
        id: data.id,
        name: data.name,
        icon: data.icon.url,
        intro: data.intro,
        role: data.role,
        job: data.job,
    };
};

export const getMembers = async (): Promise<Member[]> => {
    const data = await client.getList<any>({ endpoint: "member" });
    return data.contents.map((member: any) => ({
        id: member.id,
        name: member.name,
        icon: member.icon.url,
        intro: member.intro,
        role: member.role,
        job: member.job,
    }));
};