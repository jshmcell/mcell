import type { Locale } from "./config";

export interface AdminDict {
  layout: {
    title: string;
    tabs: { href: string; label: string }[];
    backToAccount: string;
    superLabel: string;
    adminLabel: string;
    desktopOnly: string;
    desktopOnlyHint: string;
  };
  dashboard: {
    totalUsers: string;
    newThisMonth: (n: number) => string;
    admins: string;
    adminsSub: string;
    inquiries: string;
    unprocessed: (n: number) => string;
    posts: string;
    hidden: (n: number) => string;
    quickLinks: string;
    links: { href: string; label: string; desc: string }[];
    notice: string;
    noticeLines: string[];
  };
  users: {
    searchPlaceholder: string;
    search: string;
    thEmail: string;
    thName: string;
    thRole: string;
    thJoined: string;
    thManage: string;
    super: string;
    admin: string;
    normal: string;
    locked: string;
    empty: string;
  };
  roleControls: {
    processing: string;
    promote: string;
    adminBadge: string;
    demote: string;
    failed: string;
  };
  inquiries: {
    filters: { key: string; label: string }[];
    company: string;
    manager: string;
    phone: string;
    email: string;
    address: string;
    oem: string;
    empty: string;
    failed: string;
    statusLabels: Record<string, string>;
  };
  boards: {
    meta: { key: string; label: string; base: string }[];
    defaultCategory: Record<string, string>;
    newPost: string;
    thTitle: string;
    thStatus: string;
    thDate: string;
    thViews: string;
    thManage: string;
    published: string;
    hidden: string;
    edit: string;
    del: string;
    confirmDelete: string;
    empty: string;
    formNew: string;
    formEdit: string;
    categoryPh: string;
    titlePh: string;
    bodyPh: string;
    attNamePh: string;
    attSizePh: string;
    attHrefPh: string;
    save: string;
    processing: string;
    cancel: string;
    failed: string;
  };
  settings: {
    blurb: string;
    groups: Record<string, string>;
    footnote: string;
    save: string;
    saving: string;
    saved: string;
    failed: string;
  };
  content: {
    blurb: string;
    groups: Record<string, string>;
    kinds: Record<string, string>;
    ko: string;
    en: string;
    sharedUrlNote: string;
    urlPh: string;
    upload: string;
    uploading: string;
    uploadFailed: string;
    preview: string;
    save: string;
    saving: string;
    saved: string;
    failed: string;
    invalidUrl: string;
    invalidVideo: string;
    fallbackNote: string;
    previewHint: string;
  };
}

const ko: AdminDict = {
  layout: {
    title: "관리자 대시보드",
    tabs: [
      { href: "/admin", label: "현황" },
      { href: "/admin/users", label: "회원 관리" },
      { href: "/admin/inquiries", label: "문의 관리" },
      { href: "/admin/boards", label: "게시판 관리" },
      { href: "/admin/pages", label: "페이지 콘텐츠" },
      { href: "/admin/settings", label: "사이트 설정" },
    ],
    backToAccount: "마이페이지로 돌아가기",
    superLabel: "슈퍼관리자",
    adminLabel: "관리자",
    desktopOnly: "데스크톱에서 이용해 주세요",
    desktopOnlyHint:
      "관리자 화면은 데스크톱(넓은 화면) 전용입니다. PC에서 접속해 주세요.",
  },
  dashboard: {
    totalUsers: "총 회원",
    newThisMonth: (n) => `이번 달 신규 ${n}`,
    admins: "관리자",
    adminsSub: "일반회원 외 권한",
    inquiries: "문의",
    unprocessed: (n) => `미처리 ${n}`,
    posts: "게시물",
    hidden: (n) => `숨김 ${n}`,
    quickLinks: "바로가기",
    links: [
      { href: "/admin/users", label: "회원 관리", desc: "권한 변경 (NORMAL ↔ ADMIN)" },
      { href: "/admin/inquiries", label: "문의 관리", desc: "접수된 모든 폼 데이터" },
      { href: "/admin/boards", label: "게시판 관리", desc: "공지/소식/카달로그/포트폴리오 CRUD" },
      { href: "/admin/pages", label: "페이지 콘텐츠", desc: "홈/회사 소개 등 문구 관리" },
    ],
    notice: "안내",
    noticeLines: [
      "슈퍼관리자는 SUPERUSER_EMAIL 로 지정되며 관리자 임명/해제가 모두 가능합니다.",
      "일반 관리자는 임명만 가능합니다 (강등 불가).",
      "게시물 CRUD와 문의 상태 변경은 각 관리 페이지에서 수행합니다.",
    ],
  },
  users: {
    searchPlaceholder: "이메일 또는 이름 검색",
    search: "검색",
    thEmail: "이메일",
    thName: "이름",
    thRole: "권한",
    thJoined: "가입일",
    thManage: "관리",
    super: "슈퍼관리자",
    admin: "관리자",
    normal: "일반회원",
    locked: "변경 불가",
    empty: "검색 결과가 없습니다.",
  },
  roleControls: {
    processing: "처리 중...",
    promote: "관리자로 승격",
    adminBadge: "관리자",
    demote: "강등",
    failed: "실패",
  },
  inquiries: {
    filters: [
      { key: "", label: "전체" },
      { key: "new", label: "미처리" },
      { key: "in_progress", label: "처리중" },
      { key: "done", label: "완료" },
    ],
    company: "업체명: ",
    manager: "담당자: ",
    phone: "연락처: ",
    email: "이메일: ",
    address: "주소: ",
    oem: "OEM/ODM: ",
    empty: "문의 내역이 없습니다.",
    failed: "실패",
    statusLabels: { new: "미처리", in_progress: "처리중", done: "완료" },
  },
  boards: {
    meta: [
      { key: "notices", label: "공지사항", base: "/news/notices" },
      { key: "updates", label: "소식", base: "/news/updates" },
      { key: "catalog", label: "카달로그", base: "/library/catalog" },
      { key: "portfolio", label: "포트폴리오", base: "/library/portfolio" },
    ],
    defaultCategory: {
      notices: "공지사항",
      updates: "소식",
      catalog: "카달로그",
      portfolio: "포트폴리오",
    },
    newPost: "새 게시물",
    thTitle: "제목",
    thStatus: "상태",
    thDate: "작성일",
    thViews: "조회",
    thManage: "관리",
    published: "공개",
    hidden: "숨김",
    edit: "수정",
    del: "삭제",
    confirmDelete: "이 게시물을 삭제할까요?",
    empty: "게시물이 없습니다. [새 게시물]로 추가하세요.",
    formNew: "작성",
    formEdit: "수정",
    categoryPh: "카테고리 (예: 공지사항)",
    titlePh: "제목",
    bodyPh: "본문 (HTML 허용)",
    attNamePh: "첨부파일 이름",
    attSizePh: "크기 표시 (예: 14295KB)",
    attHrefPh: "파일 경로 (예: /assets/pdf/mcell-catalog.pdf)",
    save: "저장",
    processing: "처리 중...",
    cancel: "취소",
    failed: "실패",
  },
  settings: {
    blurb: "사이트 전역에 반영되는 회사·연락처·소셜 정보를 관리합니다.",
    groups: { company: "회사 및 연락처 정보", social: "소셜 링크" },
    footnote:
      "값이 비어 있으면 데이터 파일의 기본 문구가 표시됩니다. 입력한 값은 사이트 모든 페이지의 헤더·푸터에 반영됩니다.",
    save: "저장",
    saving: "처리 중...",
    saved: "저장됨",
    failed: "실패",
  },
  content: {
    blurb: "페이지의 문구·이미지·영상을 관리합니다. 언어별로 저장되며, 비어 있으면 기본값이 표시됩니다.",
    groups: {
      home: "홈",
      shop: "SHOP",
      partnership: "제휴 및 문의",
    },
    kinds: {
      text: "텍스트",
      textarea: "문단",
      image: "이미지",
      video: "영상",
      url: "링크",
    },
    ko: "한국어",
    en: "English",
    sharedUrlNote: "링크는 언어 공통으로 저장됩니다.",
    urlPh: "https://… 또는 /assets/…",
    upload: "파일 업로드",
    uploading: "업로드 중...",
    uploadFailed: "업로드 실패",
    preview: "미리보기",
    save: "저장",
    saving: "처리 중...",
    saved: "저장됨",
    failed: "실패",
    invalidUrl:
      "올바르지 않은 URL입니다. /assets/… 또는 https://… 형식으로 입력해 주세요.",
    invalidVideo:
      "영상은 .mp4 또는 .webm URL이어야 합니다.",
    fallbackNote: "값이 비어 있으면 데이터 파일의 기본값이 표시됩니다 (영어가 비어 있으면 한국어가 표시됩니다).",
    previewHint:
      "왼쪽에서 섹션을 펼쳐 값을 수정한 뒤 [저장]을 누르세요. 이 미리보기에 즉시 반영됩니다.",
  },
};

const en: AdminDict = {
  layout: {
    title: "Admin Dashboard",
    tabs: [
      { href: "/admin", label: "Overview" },
      { href: "/admin/users", label: "Users" },
      { href: "/admin/inquiries", label: "Inquiries" },
      { href: "/admin/boards", label: "Boards" },
      { href: "/admin/pages", label: "Page Content" },
      { href: "/admin/settings", label: "Site Settings" },
    ],
    backToAccount: "Back to My Page",
    superLabel: "Super admin",
    adminLabel: "Admin",
    desktopOnly: "Please use a desktop screen",
    desktopOnlyHint:
      "The admin dashboard is only available on desktop-sized screens. Please sign in from a PC.",
  },
  dashboard: {
    totalUsers: "Total users",
    newThisMonth: (n) => `New this month: ${n}`,
    admins: "Admins",
    adminsSub: "Privileged roles",
    inquiries: "Inquiries",
    unprocessed: (n) => `Unprocessed: ${n}`,
    posts: "Posts",
    hidden: (n) => `Hidden: ${n}`,
    quickLinks: "Quick links",
    links: [
      { href: "/admin/users", label: "Users", desc: "Change roles (NORMAL ↔ ADMIN)" },
      { href: "/admin/inquiries", label: "Inquiries", desc: "All submitted form data" },
      { href: "/admin/boards", label: "Boards", desc: "Notices/updates/catalog/portfolio CRUD" },
      { href: "/admin/pages", label: "Page Content", desc: "Manage home/shop copy and media" },
    ],
    notice: "Notes",
    noticeLines: [
      "The super admin is set via SUPERUSER_EMAIL and can appoint/remove admins.",
      "Regular admins can only appoint (no demotion).",
      "Post CRUD and inquiry status changes happen on each admin page.",
    ],
  },
  users: {
    searchPlaceholder: "Search by email or name",
    search: "Search",
    thEmail: "Email",
    thName: "Name",
    thRole: "Role",
    thJoined: "Joined",
    thManage: "Manage",
    super: "Super admin",
    admin: "Admin",
    normal: "Member",
    locked: "Locked",
    empty: "No results.",
  },
  roleControls: {
    processing: "Working...",
    promote: "Promote to admin",
    adminBadge: "Admin",
    demote: "Demote",
    failed: "Failed",
  },
  inquiries: {
    filters: [
      { key: "", label: "All" },
      { key: "new", label: "New" },
      { key: "in_progress", label: "In progress" },
      { key: "done", label: "Done" },
    ],
    company: "Company: ",
    manager: "Contact: ",
    phone: "Phone: ",
    email: "Email: ",
    address: "Address: ",
    oem: "OEM/ODM: ",
    empty: "No inquiries.",
    failed: "Failed",
    statusLabels: { new: "New", in_progress: "In progress", done: "Done" },
  },
  boards: {
    meta: [
      { key: "notices", label: "Notices", base: "/news/notices" },
      { key: "updates", label: "Updates", base: "/news/updates" },
      { key: "catalog", label: "Catalog", base: "/library/catalog" },
      { key: "portfolio", label: "Portfolio", base: "/library/portfolio" },
    ],
    defaultCategory: {
      notices: "Notices",
      updates: "Updates",
      catalog: "Catalog",
      portfolio: "Portfolio",
    },
    newPost: "New post",
    thTitle: "Title",
    thStatus: "Status",
    thDate: "Date",
    thViews: "Views",
    thManage: "Manage",
    published: "Published",
    hidden: "Hidden",
    edit: "Edit",
    del: "Delete",
    confirmDelete: "Delete this post?",
    empty: "No posts. Add one with [New post].",
    formNew: "Create",
    formEdit: "Edit",
    categoryPh: "Category (e.g. Notices)",
    titlePh: "Title",
    bodyPh: "Body (HTML allowed)",
    attNamePh: "Attachment name",
    attSizePh: "Display size (e.g. 14295KB)",
    attHrefPh: "File path (e.g. /assets/pdf/mcell-catalog.pdf)",
    save: "Save",
    processing: "Working...",
    cancel: "Cancel",
    failed: "Failed",
  },
  settings: {
    blurb: "Manage company, contact and social info applied site-wide.",
    groups: { company: "Company & contact", social: "Social links" },
    footnote:
      "Empty values fall back to the defaults in the data files. Values apply to the header/footer on every page.",
    save: "Save",
    saving: "Working...",
    saved: "Saved",
    failed: "Failed",
  },
  content: {
    blurb: "Manage page copy, images and videos. Saved per language; empty values show defaults.",
    groups: {
      home: "Home",
      shop: "SHOP",
      partnership: "Partnership",
    },
    kinds: {
      text: "Text",
      textarea: "Paragraph",
      image: "Image",
      video: "Video",
      url: "Link",
    },
    ko: "Korean",
    en: "English",
    sharedUrlNote: "Links are saved once for both languages.",
    urlPh: "https://… or /assets/…",
    upload: "Upload file",
    uploading: "Uploading...",
    uploadFailed: "Upload failed",
    preview: "Preview",
    save: "Save",
    saving: "Working...",
    saved: "Saved",
    failed: "Failed",
    invalidUrl:
      "Invalid URL. Use an /assets/… path or a full https://… URL.",
    invalidVideo:
      "Videos must be an .mp4 or .webm URL.",
    fallbackNote: "Empty values show file defaults (empty English falls back to Korean).",
    previewHint:
      "Expand a section on the left, edit the values, then press Save — this preview updates instantly.",
  },
};

export const adminDict: Record<Locale, AdminDict> = { ko, en };
