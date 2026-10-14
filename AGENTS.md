# Verification

- Run application regression tests with `node --test application-regression.test.cjs`. These use mocked MySQL and SMTP dependencies and do not contact production services. They check schema migration SQL, technical-support validation and inserts, connection cleanup, and rendered admin answers.
- Run TypeScript checking with `npx tsc --noEmit --incremental false`.
- Run the production build with `npm run build`; do not pipe through output truncation commands, which can hide the actual exit status.
- `lib/db.ts` verifies SMTP when imported if all `EMAIL_*` settings are present. For offline build verification, explicitly set `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, and `EMAIL_FROM` to empty strings in the build process environment to avoid contacting the mail server.
- The local shell is Windows PowerShell; use separate tool calls instead of Bash `&&` chains.
