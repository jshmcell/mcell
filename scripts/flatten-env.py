"""Flatten .env.development.local ${VAR} references into .env.local for Prisma CLI."""
import io
import re

env = io.open(".env.development.local", encoding="utf-8").read()
vals = {}
order = []
for line in env.splitlines():
    line = line.strip()
    if not line or line.startswith("#") or "=" not in line:
        continue
    k, _, v = line.partition("=")
    k = k.strip()
    v = v.strip().strip('"')
    m = re.search(r"\$\{(\w+)\}", v)
    if m and m.group(1) in vals:
        v = v.replace(m.group(0), vals[m.group(1)])
    if k not in vals:
        order.append(k)
    vals[k] = v

out = []
for k in order:
    v = vals[k]
    if re.search(r"\$\{", v):
        continue
    out.append(f'{k}="{v}"')
io.open(".env.local", "w", encoding="utf-8", newline="\n").write("\n".join(out) + "\n")
print("wrote .env.local with", len(out), "flat vars")
print("DATABASE_URL set:", "DATABASE_URL" in vals and "${" not in vals.get("DATABASE_URL", "$"))
print("DIRECT_URL set:", "DIRECT_URL" in vals and "${" not in vals.get("DIRECT_URL", "$"))