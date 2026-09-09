import { put } from "@vercel/blob";
import { getActor } from "@/lib/roles";

const IMAGE_MIMES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
const VIDEO_MIMES = ["video/mp4", "video/webm"];
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const MAX_VIDEO_BYTES = 64 * 1024 * 1024;

/**
 * 관리자 미디어 업로드 — Vercel Blob 공개 URL 반환.
 * BLOB_READ_WRITE_TOKEN 미설정 시 500 + 안내 메시지 (URL 직접 입력은 항상 가능).
 */
export async function POST(req: Request) {
  const actor = await getActor();
  if (!actor?.isAdmin) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  let file: unknown = null;
  try {
    const form = await req.formData();
    file = form.get("file");
  } catch {
    return Response.json({ error: "Invalid form data" }, { status: 400 });
  }
  if (!(file instanceof File) || file.size === 0) {
    return Response.json({ error: "No file" }, { status: 400 });
  }

  const isImage = IMAGE_MIMES.includes(file.type);
  const isVideo = VIDEO_MIMES.includes(file.type);
  if (!isImage && !isVideo) {
    return Response.json({ error: "Unsupported file type" }, { status: 400 });
  }
  if (file.size > (isImage ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES)) {
    return Response.json({ error: "File too large" }, { status: 400 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json(
      {
        error:
          "BLOB_READ_WRITE_TOKEN is not set. Add it to the Vercel project environment (Storage → Blob → .env.local) or paste an image/video URL instead.",
      },
      { status: 500 },
    );
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_") || "upload";
  try {
    const blob = await put(`content/${Date.now()}-${safeName}`, file, {
      access: "public",
      contentType: file.type,
      // Pass the read-write token explicitly: the SDK prefers OIDC (VERCEL_OIDC_TOKEN)
      // over BLOB_READ_WRITE_TOKEN, but OIDC is not available in the local dev
      // environment. When the token is unset (e.g. production), OIDC is used instead.
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return Response.json({ url: blob.url });
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message.includes("private store")
          ? "Upload storage is not configured for public access. Add a public Blob store to the project settings (Storage → Blob) or paste an image/video URL instead."
          : err.message
        : "Upload failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
