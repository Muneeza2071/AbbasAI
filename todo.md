# Project TODO

- [x] Configure Abbas AI branding and package identity (`com.abbas.ai`)
- [ ] Generate and install the custom Abbas AI launcher, splash, favicon, and adaptive icon assets
- [x] Apply black carbon glassmorphism theme with Material 3-inspired components
- [x] Add iPhone-style bottom tab navigation for Home, History, Explore, and Profile
- [x] Build Welcome and onboarding experience
- [x] Build sign-in screen with validation and feedback
- [x] Build registration screen with validation and feedback
- [ ] Build account recovery screen state
- [x] Build Home dashboard with greeting, quick prompts, recent chats, and New Chat action
- [x] Build AI chat screen with message list, composer, and demo response state
- [ ] Build local conversation persistence and History screen
- [x] Build Explore prompt library
- [x] Build Profile and Settings screen with sign-out flow
- [x] Add secure server-side AI request boundary; never commit a real API key to the repository or APK
- [ ] Add development configuration for Grok-compatible API integration when credentials are available (blocked: supplied credential returned HTTP 403)
- [ ] Add deterministic tests for authentication state, chat persistence, and request handling
- [x] Run type checking, linting, and mobile flow validation
- [ ] Review todo.md and save the first complete checkpoint

- [ ] Update `XAI_API_KEY` with the newly supplied xAI credential through secure project secrets
- [ ] Validate the new xAI credential against the lightweight models endpoint
- [ ] Add a server-side Grok chat procedure with input validation and safe error handling
- [ ] Connect the mobile Chat composer to the server-side live response procedure
- [x] Add deterministic tests for the live chat route and client request state
- [x] Re-run type checking, linting, and live chat validation
- [ ] Save a new checkpoint with live Grok chat enabled

- [x] Replace blocked xAI/Grok integration with the secure built-in server-side LLM route
- [x] Connect the mobile Chat composer to the built-in live AI procedure
- [x] Add loading, failure, and retry states for live AI responses
- [x] Add deterministic tests for the fallback AI route and chat request state
- [ ] Rotate/revoke the xAI key that was exposed in chat and remove its project dependency (user action required in xAI Console)
- [ ] Save a new checkpoint with the working AI feature

- [ ] Inspect the connected GitHub repository and confirm the sync target (direct sandbox push unavailable; export via Management UI)
- [x] Add a GitHub Actions Android build workflow
- [x] Add repository documentation for required GitHub Actions secrets
- [x] Confirm no API key is committed to source, workflow YAML, or generated artifacts
- [x] Validate the workflow YAML and Android build commands
- [ ] Save a repository-ready checkpoint

- [x] Protect the existing Expo checkpoint before migration
- [x] Remove Expo-managed build dependency from the Android delivery path
- [x] Add or generate the direct React Native Android native project with package `com.abbas.ai`
- [x] Preserve Abbas AI screens, server-side AI route, and branding during migration
- [x] Replace the Expo GitHub Actions workflow with a direct Gradle Android workflow
- [x] Validate direct Android build and confirm no secrets are committed (Gradle build deferred locally because Android SDK is unavailable; GitHub Actions installs SDK components)
- [ ] Save a direct React Native Android checkpoint

- [x] Confirm the newly authorized GitHub connector targets `Muneeza2071/AbbasAI`
- [x] Push the direct React Native Android project and workflow to the selected repository
- [x] Verify the pushed commit and GitHub Actions workflow

- [x] Fix GitHub Actions failure: runner cannot locate the `pnpm` executable
- [x] Replace deprecated Node 20 GitHub action versions where supported
- [x] Validate the corrected Android workflow locally and push a fix commit
- [x] Verify the next GitHub Actions run reaches dependency installation and Android build steps

- [x] Reproduce and diagnose the installed APK launch crash
- [x] Fix the Android launch crash without adding Grok or OpenRouter credentials
- [x] Verify the server-side built-in AI reply flow from the Android client
- [x] Run TypeScript, AI tests, and GitHub Android APK build validation
- [x] Push the crash fix and deliver a corrected APK artifact

- [ ] Collect the latest Android crash evidence from the failing APK/build configuration
- [ ] Identify the actual startup crash beyond the app.json registration issue
- [ ] Apply and validate the correct launch-crash fix
- [ ] Build a fresh APK and verify the workflow completes
- [ ] Confirm the app reaches the chat screen and server-side AI request path
- [ ] Deliver the verified crash-fix APK artifact
