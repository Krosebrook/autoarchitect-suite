# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2026-01-09
### Fixed
- Resolved `UNKNOWN` status in `docs/ARCHITECTURE.md` regarding orchestration patterns.
- Resolved `UNKNOWN` status in `docs/SECURITY.md` regarding prompt injection and NHI/API key storage.
- Implemented `scripts/build-llms-docs.py` to fix documentation automation.
- Generated `llms-full.txt` context file.

## [0.1.0] - 2025-05-22
### Added
- Repository baseline established.
- Documentation Governance Policy (DOC_POLICY).
- Documentation Authority Agent (DAA) system prompt.
- `llms-full.txt` build automation script.
- GitHub Actions CI for documentation validation.
- Minimal shells for ARCHITECTURE, SECURITY, and FRAMEWORK documentation.

---
**Source**: git|code
**Locator**: services/geminiService.ts, vite.config.ts, scripts/build-llms-docs.py
**Confidence**: HIGH
**Last Verified**: 2026-01-09