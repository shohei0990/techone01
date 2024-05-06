// microCMS api の 初期設定
import { createClient } from 'microcms-js-sdk';

export type Portfolio = {
    id: string;
    pj_name: string;
    pj_image: string; // 最初の画像のURLのみを保持
    pj_members: string[]; // メンバー名の配列
    pj_tags: string[]; // タグ名の配列
}

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
    console.log("ポートフォリオデータの取得を開始します。"); // 関数開始時のログ
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

    console.log("全ポートフォリオデータ:", portfolios); // 最終的なポートフォリオの配列をログ出力
    return portfolios;
}

/*
export type Blog = {
    id: string;
    title: string;
    body: string;   
}

// ブログ一覧を取得
export const getBlogs = async () => {
    const blogs = await client.getList<Blog>({
    endpoint: "test00"
    });
    return blogs;
}

// ブログの詳細を取得
export const getDetail = async (contentId: string) => {
    const blog = await client.getListDetail<Blog>({
        endpoint: "test00",
        contentId,
    });
    return blog;
};
*/
