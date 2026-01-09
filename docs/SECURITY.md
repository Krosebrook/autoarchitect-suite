# Security Posture

## Threat Model
The application operates as a Client-Side Progressive Web App (PWA).

### Primary Threat Actors
1. **Malicious Inputs**: Prompt injection targeting Gemini models.
2. **Local Data Theft**: Unauthorized access to browser IndexedDB storage.
3. **API Exfiltration**: Interception of Gemini API traffic.

## Prompt Injection
- **Status**: VERIFIED
- **Locator**: services/geminiService.ts
- **Details**: No client-side sanitation or escaping is performed on user input before passing to Gemini models. The system relies exclusively on Gemini's internal safety filters and the provided `systemInstruction` guardrails.
- **Confidence**: HIGH
- **Last Verified**: 2026-01-09

## NHI (Non-Human Identity)
- **Status**: VERIFIED
- **Locator**: vite.config.ts, services/geminiService.ts
- **Details**: `GEMINI_API_KEY` is injected at build-time using Vite's `define` configuration. As this is a client-side PWA, the API key is theoretically extractable from the minified production bundles.
- **Confidence**: HIGH
- **Last Verified**: 2026-01-09

## Egress
Egress is restricted to `googleapis.com` for model interaction and `esm.sh` / `gstatic.com` for library loading.

## Patch Policy
Third-party dependencies are loaded via `esm.sh` with specific version tags (e.g., `@google/genai@1.34.0`).

## Incident Response
In case of suspected API key compromise, rotate the key in the execution environment immediately.

## Kill Switch
Documentation automation kill-switch: `DOC_AUTOMATION_ENABLED=false`.

---
**Source**: code|config  
**Locator**: services/geminiService.ts, index.html, vite.config.ts
**Confidence**: HIGH
**Last Verified**: 2026-01-09