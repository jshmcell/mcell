# Extraction notes (Phase 0)

## Assets
- 83 images (48 jpg, 35 png) + 1 PDF → `public/assets/img/`, `public/assets/pdf/mcell-catalog.pdf`
- Full URL↔file map: `extract/assets-map.txt`
- Raw page HTML: `extract/html/*.html` (12 pages), vendor custom css: `extract/custom.cm.css`
- Source CDN prefix: `https://cdn.imweb.me/upload/S202504304f5e903696e3b/...` (site media), `.../thumbnail/...` (favicons)

## Catalog PDF
- Board post idx=165574527, title "엠셀 카달로그", 14.6MB, saved as `mcell-catalog.pdf`

## Key computed values (from vendor css + inline styles)
- Container: 1280px, side padding 40px
- Header: 108px inline-col-group height; scroll-fixed navy `rgba(23,55,94,0.9)`; logo 30px; nav 16px/40px, padding 0 15px
- Dropdown: white, 13px #474747, padding 12px 20px, hover bg #93cddd white text, shadow 0 6px 12px rgba(0,0,0,.175), 0.3s fade
- Search button: #00B8FF bg, icon type01
- Full-screen hero: `height: calc(100vh - 108px)` (992px+), `calc(100vh - 106px)` mobile
- Marquee: "MCELL TECHNOLOGIES" outline text strip (owl carousel, infinite loop)
- Section bg hover swap: normal_logo opacity 0 → scroll_logo 1
- Buttons: `.btn` navy #17375e, border rgba(39,57,125,.2), hover border #27397d; btn-primary span white
- Body font: Pretendard (variable), theme-color #363636

## Home page sections (in order, from home.html ids)
1. s202504302c9aa0eea2f4b — header (navy bg)
2. hero full_screen_show owl slider (orange fiber bg image 9e084a2b4a973.jpg etc.)
3. s20250508a49e0f0e19067 — tagline "Empower Heat, Shape Innovation" + 스마트 발열 기술로...
4. s20250611cb95d22feefd8 — white wave bg (2196b9531ec1e.jpg) + "기술은 에너지 혁신을 만든다"
5. media/parallax section
6. 기술력 소개 바로가기 → /31 button
7. certification carousel — 18 certificate imgs, owl, dots
8. About company → /33
9. partnership bg (handshake img 06285cdf4dddb.jpg) → 제휴 및 문의 바로가기 → /44
10. footer navy

## Board pages structure
- sub-hero: page title + subnav chips (포트폴리오/카달로그, 공지사항/소식)
- list header: "카달로그 1" + search textbox
- row: category icon, title link, 관리자, date 2025-06-17
- partnership form fields: 업체명, 담당자(회사명), 연락처, 이메일, 주소, OEM/ODM radio, 개발내용 textarea → 문의하기