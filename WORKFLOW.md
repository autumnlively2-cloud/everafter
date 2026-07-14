<!-- managed:linked-repos -->
## Linked Repositories
- autumnlively2-cloud/everafter
<!-- /managed:linked-repos -->

# Shipyard Engineering — Code Workflow

## Branch Strategy
- `main` — production-ready code. All merges here are deployable.
- `feat/*` — feature branches (e.g. `feat/user-auth`, `feat/landing-page`)
- `fix/*` — bug fix branches
- `chore/*` — tooling, config, dependencies

## PR Process
1. Branch off `main` with a descriptive name
2. Write code, push to origin
3. Open a pull request against `main`
4. PR title follows conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`
5. PR description includes: what changed, why, and how to verify
6. All tests must pass before merge
7. At least 1 approval required (Technical Lead reviews)

## Review Checklist
- [ ] Tests pass
- [ ] New code has tests (>80% coverage on new code)
- [ ] No dead code, commented-out code, or console.logs
- [ ] Follows clean architecture (backend) / component patterns (frontend)
- [ ] Works in dark mode (frontend)
- [ ] Responsive (frontend)

## Merge Strategy
- Squash merge — keeps a clean `main` history
- PR author is the commit author

## CI
- GitHub Actions runs lint → test → build on every PR
- CI must pass before merge