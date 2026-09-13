import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("fast mode is honest about same-session review", async () => {
  const [readme, prompt] = await Promise.all([
    read("README.md"),
    read("prompts/all-in-one.md"),
  ]);

  assert.match(readme, /same session/i);
  assert.match(prompt, /not an independent review/i);
  assert.doesNotMatch(readme, /go to sleep|while you sleep|overnight crew/i);
});

test("builder and reviewer require real verification", async () => {
  const [builder, reviewer] = await Promise.all([
    read("prompts/builder.md"),
    read("prompts/reviewer.md"),
  ]);

  assert.match(builder, /run the project.*tests/i);
  assert.match(builder, /do not commit, push, open or update a pull request, merge, or deploy/i);
  assert.match(reviewer, /inspect the git diff/i);
  assert.match(reviewer, /run the relevant tests/i);
  assert.match(reviewer, /cannot run.*NEEDS_FIX/i);
});

test("public guidance does not send vulnerability details to public issues", async () => {
  const policy = await read("SECURITY.md");
  assert.match(policy, /security\/advisories\/new/);
  assert.doesNotMatch(policy, /Open a GitHub issue/i);
});

test("license file contains only the standard MIT license", async () => {
  const license = await read("LICENSE");
  assert.match(license, /^MIT License\n/);
  assert.match(license, /SOFTWARE\.\n?$/);
  assert.doesNotMatch(license, /do whatever|ship it|⭐/i);
});

test("workflow actions are pinned to full commit SHAs", async () => {
  const workflow = await read(".github/workflows/security-baseline.yml");
  const actionRefs = [...workflow.matchAll(/uses:\s+[^@\s]+@([^\s]+)/g)].map((match) => match[1]);

  assert.ok(actionRefs.length > 0);
  for (const ref of actionRefs) {
    assert.match(ref, /^[0-9a-f]{40}$/);
  }
});

test("README contains no dead Gumroad link", async () => {
  const readme = await read("README.md");
  assert.doesNotMatch(readme, /gumroad\.com/i);
});

test("misleading sleep-era cover is removed", async () => {
  const readme = await read("README.md");
  assert.doesNotMatch(readme, /cover\.jpg/i);

  await assert.rejects(read("cover.jpg"), { code: "ENOENT" });
});
