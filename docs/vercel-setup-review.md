# Vercel Setup Review

## Current Setup Status

### ✅ Vercel Project

| Item | Status | Value |
|------|--------|-------|
| Project linked | ✅ | `dr-notes-nco` |
| Project ID | ✅ | `prj_ktwv1RFQbtm3ALmOoaCykh2TkdOY` |
| Org ID | ✅ | `team_zymythw2HYK6eImavRIB2V4r` |
| Root Directory | ✅ | `app` |

### ✅ Environment Variables (Vercel)

| Variable | Production | Preview |
|----------|:----------:|:-------:|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | ✅ |

### ✅ GitHub Secrets

| Secret | Status |
|--------|--------|
| `VERCEL_TOKEN` | ✅ |
| `VERCEL_ORG_ID` | ✅ |
| `VERCEL_PROJECT_ID` | ✅ |

### ✅ Branch Protection (main)

| Rule | Status |
|------|--------|
| Required: `test` | ✅ |
| Required: `secret-scan` | ✅ |
| Required: `dependency-scan` | ✅ |
| Require 1 approval | ✅ |
| Dismiss stale reviews | ✅ |

### ✅ Environment Protection

| Environment | Reviewers |
|-------------|-----------|
| `production` | `ChanOoDev` (required) |

### ✅ Deployment Protection

| Setting | Status |
|---------|--------|
| Vercel Authentication (Production) | Disabled ✅ |
| Vercel Authentication (Preview) | Disabled ✅ |

---

## New Setup Checklist

If setting up from scratch, ensure all items are completed:

### Phase 1: Vercel Project

- [ ] Create Vercel account at https://vercel.com
- [ ] Create new project at https://vercel.com/new
- [ ] Import GitHub repository
- [ ] Set **Root Directory** to `app`
- [ ] Deploy successfully (first deploy)

### Phase 2: Environment Variables

**In Vercel Dashboard → Settings → Environment Variables:**

- [ ] Add `NEXT_PUBLIC_SUPABASE_URL` (Production + Preview)
- [ ] Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Production + Preview)

**In GitHub → Settings → Secrets and variables → Actions:**

- [ ] Add `VERCEL_TOKEN` (from https://vercel.com/account/tokens)
- [ ] Add `VERCEL_ORG_ID` (from `.vercel/repo.json`)
- [ ] Add `VERCEL_PROJECT_ID` (from `.vercel/project.json`)

### Phase 3: GitHub Environments

- [ ] Create `production` environment
- [ ] Add required reviewers to `production`
- [ ] (Optional) Create `preview` environment

### Phase 4: Branch Protection

**In GitHub → Settings → Branches → main:**

- [ ] Enable "Require status checks to pass"
- [ ] Add required checks: `test`, `secret-scan`, `dependency-scan`
- [ ] Enable "Require pull request reviews" (1 approval)
- [ ] Enable "Dismiss stale reviews"

### Phase 5: Deployment Protection

**In Vercel → Settings → Deployment Protection:**

- [ ] Disable "Vercel Authentication" for Production
- [ ] Disable "Vercel Authentication" for Preview

### Phase 6: Workflow Files

- [ ] `.github/workflows/deploy.yml` (main pipeline)
- [ ] `.github/workflows/ci.yml` (PR checks)
- [ ] `.github/workflows/security.yml` (security scans)
- [ ] `.gitattributes` (enforce LF line endings)

### Phase 7: Verification

- [ ] Create test PR → CI runs
- [ ] Merge PR → Deploy pipeline runs
- [ ] UAT deploys automatically
- [ ] Production requires manual approval
- [ ] Site accessible at production URL

---

## Common Issues

| Issue | Fix |
|-------|-----|
| 404 on site | Check Root Directory = `app` |
| 500 INTERNAL_SERVER_ERROR | Add missing env vars in Vercel |
| "Project not found" in CI | Update `VERCEL_PROJECT_ID` secret |
| YAML syntax error | Use LF line endings, quote strings |
| Manual approval not showing | Add reviewers to `production` environment |
| Preview blocked by auth | Disable Deployment Protection in Vercel |

---

## Useful Commands

```bash
# Link to Vercel project
cd app && npx vercel link --project <project-name>

# Check env vars
cd app && npx vercel env ls

# Add env var
cd app && npx vercel env add <name> <environment>

# Deploy manually
cd app && npx vercel --prod --yes

# Check CI status
gh pr checks <pr-number>

# View deployment logs
npx vercel logs <url>
```
