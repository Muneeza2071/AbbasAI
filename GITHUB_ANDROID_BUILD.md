# Abbas AI Android Build on GitHub

The repository now contains a **bare React Native Android project** with a native `android/` Gradle folder. Expo and Expo Router are not used by the Android build. The workflow at `.github/workflows/android-build.yml` installs dependencies, runs the mobile TypeScript check, builds a debug APK directly with Gradle, and uploads `app-debug.apk` as the `abbas-ai-debug-apk` artifact.

## Run the build

Open the repository on GitHub, select **Actions**, choose **Build Abbas AI Android APK**, press **Run workflow**, and wait for the job to finish. Open the completed run, scroll to **Artifacts**, download `abbas-ai-debug-apk`, unzip it, and install `app-debug.apk` on an Android phone.

## Live server URL

The mobile client currently points to the active public Abbas AI server endpoint in `lib/mobile-trpc.ts`, so the debug APK can call the live server route. Before long-term production packaging, replace that endpoint with a stable deployed server URL. This URL is public routing configuration, not an API key.

Do not add `XAI_API_KEY`, Manus credentials, or any other private token to source files, workflow YAML, the APK, or public repository variables. The current Abbas AI chat uses the secure server-side LLM route, so an xAI key is not required by the mobile build.

## Current build type

This workflow creates a **debug APK** for personal testing. A release APK for Play Store distribution requires a signing keystore and should be added later through encrypted GitHub Actions Secrets, never committed to the repository.
