export interface BoardPost {
  id: number;
  category: string;
  title: string;
  author: string;
  date: string;
  /** 조회수 (목록 표시용) */
  views?: number;
  /** 게시물 본문 (카달로그 등 뷰 페이지가 있는 게시물) */
  body?: string;
  attachment?: { name: string; size: string; href: string };
  thumb?: string;
}

export const boards: Record<string, { label: string; posts: BoardPost[] }> = {
  portfolio: { label: "포트폴리오", posts: [] },
  catalog: {
    label: "카달로그",
    posts: [
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
    ],
  },
  notices: {
    label: "공지사항",
    posts: [
      {
        id: 164948916,
        category: "공지사항",
        title: "[2021년 10월13일] 주식회사 엠셀 신주발행 결의 공고",
        author: "탈퇴한 회원",
        date: "2025-06-05",
        views: 241,
      },
      {
        id: 164948904,
        category: "공지사항",
        title: "[Notice] 2019.03.29 기업설명회 후기",
        author: "탈퇴한 회원",
        date: "2025-06-05",
        views: 212,
      },
      {
        id: 164948890,
        category: "공지사항",
        title: "Notice & News Brochure [ 동작센싱 스마트 레깅스 시제품 개발 ]",
        author: "탈퇴한 회원",
        date: "2025-06-05",
        views: 239,
      },
    ],
  },
  updates: {
    label: "소식",
    posts: [
      {
        id: 170823706,
        category: "소식",
        title: "주주명부 기준일 설정 공고",
        author: "지승현",
        date: "2026-04-13",
        views: 90,
      },
      {
        id: 170823268,
        category: "소식",
        title: "주주명부 기준일 설정 공고 (2026년)",
        author: "지승현",
        date: "2026-04-13",
        views: 90,
      },
      {
        id: 164949068,
        category: "소식",
        title: "Notice & News Brochure [ 설날 인사말 ]",
        author: "탈퇴한 회원",
        date: "2025-06-05",
        views: 176,
      },
      {
        id: 164949037,
        category: "소식",
        title: "Notice & News Brochure [ 사업계획서 ]",
        author: "탈퇴한 회원",
        date: "2025-06-05",
        views: 191,
      },
      {
        id: 164949008,
        category: "소식",
        title: "[ CEO 새해 인사말 ] 새해 복 많이 받으세요~",
        author: "탈퇴한 회원",
        date: "2025-06-05",
        views: 377,
      },
    ],
  },
};

/** 뉴스 배너 (원본 /45·/46 공용, thumbnail/20250530/ab3b53993fa77.jpg) */
export const newsBand = "/assets/img/ab3b53993fa77.jpg";