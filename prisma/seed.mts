// Seed: superuser + migrate static board posts into DB.
// Run: npx tsx --env-file=.env.local prisma/seed.mts
// .env.local is an ignored generated mirror of .env.development.local; see scripts/flatten-env.py.
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.ts";

const connectionString =
  process.env.MCELL_DATABASE_URL ?? process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString: connectionString! });
const prisma = new PrismaClient({ adapter });

interface SeedPost {
  id: number;
  category: string;
  title: string;
  author: string;
  date: string;
  views?: number;
  body?: string;
  attachment?: { name: string; size: string; href: string };
}

const staticPosts: Array<[string, SeedPost[]]> = [
  // [board, posts] — mirrors src/data/boards.ts (kept in sync manually for seed only)
  ["notices", [
    {
      id: 164948916,
      category: "공지사항",
      title: "[2021년 10월13일] 주식회사 엠셀 신주발행 결의 공고",
      author: "탈퇴한 회원",
      date: "2025-06-05",
      views: 241,
      body: `<p>주식회사 엠셀 제3자배정 신주발행 공고</p>
<p>1. 신주의 종류와수 : 기명식 제1종 상환전환우선주식 61,250주</p>
<p>2. 신주의 발행가액 : 1주당 13,061원</p>
<p>3. 신주의 납입기일 : 2021년 10월 29일</p>
<p>4. 신주의 인수방법 : 상법 제418조 및 당사 정관 제9조 제2항에 의거하여 제3자배정 방법으로 함</p>
<p>5. 신주의 주금납입은행 : 주식회사 우리은행 분당미금역금융센터지점</p>
<p>- 다 은 -</p>
<p>2021년 10월 13일</p>
<p>주식회사 엠셀<br/>경기도 성남시 수정구 대왕판교로 815, 아이씨티문화융합센터 407호(시흥동,판교창조경제밸리기업지원허브)<br/>대표이사 지 승 현</p>`,
    },
    { id: 164948904, category: "공지사항", title: "[Notice] 2019.03.29 기업설명회 후기", author: "탈퇴한 회원", date: "2025-06-05", views: 212 },
    { id: 164948890, category: "공지사항", title: "Notice & News Brochure [ 동작센싱 스마트 레깅스 시제품 개발 ]", author: "탈퇴한 회원", date: "2025-06-05", views: 239 },
  ]],
  ["updates", [
    { id: 170823706, category: "소식", title: "주주명부 기준일 설정 공고", author: "지승현", date: "2026-04-13", views: 90 },
    {
      id: 170823268,
      category: "소식",
      title: "주주명부 기준일 설정 공고 (2026년)",
      author: "지승현",
      date: "2026-04-13",
      views: 90,
      body: `<p>주주명부 기준일 설정 공고</p>
<p>상법 제354조 및 당사 정관에 의거하여, 당사는 주주총회에서 의결권을 행사할 주주를 확정하기 위하여 다음과 같이 기준일을 설정하였음을 공고합니다.</p>
<ul>
<li>기준일: 2026년 4월 27일</li>
</ul>
<p>상기 기준일 현재 주주명부에 기재되어 있는 주주에게 의결권이 부여됩니다.</p>
<p>2026년 4월 13일<br/>주식회사 엠셀<br/>대표이사 지승현</p>`,
    },
    { id: 164949068, category: "소식", title: "Notice & News Brochure [ 설날 인사말 ]", author: "탈퇴한 회원", date: "2025-06-05", views: 176 },
    { id: 164949037, category: "소식", title: "Notice & News Brochure [ 사업계획서 ]", author: "탈퇴한 회원", date: "2025-06-05", views: 191 },
    { id: 164949008, category: "소식", title: "[ CEO 새해 인사말 ] 새해 복 많이 받으세요~", author: "탈퇴한 회원", date: "2025-06-05", views: 377 },
  ]],
  ["catalog", [
    {
      id: 165574527,
      category: "카달로그",
      title: "엠셀 카달로그",
      author: "관리자",
      date: "2025-06-17",
      body: "엠셀 카달로그입니다.",
      attachment: {
        name: "250513 엠셀_카달로그_수정안_최종.pdf",
        size: "14295KB",
        href: "/assets/pdf/mcell-catalog.pdf",
      },
    },
  ]],
  ["portfolio", []],
];

async function main() {
  // 1. Superuser (NORMAL role in DB; superuser status derives from SUPERUSER_EMAIL)
  const suEmail = process.env.SUPERUSER_EMAIL?.trim().toLowerCase();
  if (suEmail) {
    const suName = process.env.SUPERUSER_NAME?.trim() || "슈퍼관리자";
    const suPassword = process.env.SUPERUSER_PASSWORD;
    if (!suPassword) {
      console.log("SUPERUSER_PASSWORD not set — skipping superuser credential creation");
    } else {
      const { auth } = await import("../src/lib/auth.ts");
      const existing = await prisma.user.findUnique({ where: { email: suEmail } });
      if (!existing) {
        const res = await auth.api.signUpEmail({
          body: { email: suEmail, password: suPassword, name: suName },
          headers: new Headers({ "x-seed": "1" }),
        });
        console.log("superuser created:", Boolean(res?.user));
      } else {
        console.log("superuser already exists");
      }
    }
  } else {
    console.log("SUPERUSER_EMAIL not set — skipping");
  }

  // 2. Board posts (idempotent: skip if board already has rows)
  for (const [board, posts] of staticPosts) {
    const count = await prisma.boardPost.count({ where: { board } });
    if (count > 0) {
      console.log(`board ${board}: ${count} rows already exist — skipping`);
      continue;
    }
    for (const p of posts) {
      const { attachment, date: _date, id: _legacyId, ...data } = p;
      await prisma.boardPost.create({
        data: {
          ...data,
          board,
          views: p.views ?? 0,
          published: true,
          createdAt: new Date(p.date),
          attachment: attachment ? { create: attachment } : undefined,
        },
      });
    }
    console.log(`board ${board}: seeded ${posts.length} posts`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });