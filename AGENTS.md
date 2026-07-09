# AGENTS.md

## Rules

- Keep the public facade close to the web Canvas API unless differences are deliberate and documented.
- Keep renderer details behind the `CanvasRenderer` interface.
- Prefer small, tested Canvas API increments over broad unverified surface area.
- Support the JavaScript renderer first for correctness and portability.
- Add unit tests for API behavior and PNG encoding; add e2e, WPT, or pdf.js coverage for visible rendering or integration changes.
- Update `docs/API_MATRIX.md` and `docs/WPT_COMPATIBILITY.md` when Canvas API methods are implemented or updated.
- Do not replace user changes without explicit permission.
