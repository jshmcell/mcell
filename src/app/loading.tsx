/**
 * 라우트 전환 로딩 — 동적 [id] 라우트 등에서 짧은 지연 시 스켈레톤 대신 표시.
 * SmartImage 스켈레톤과 같은 네이비 스피너.
 */
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-white">
      <span className="h-7 w-7 animate-spin rounded-full border-2 border-navy-900/15 border-t-navy-900" />
    </div>
  );
}
