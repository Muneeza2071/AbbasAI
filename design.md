# Abbas AI — Mobile Interface Design Plan

## Product Direction

Abbas AI is an Android-first personal AI assistant designed for fast, one-handed use in portrait orientation. The visual language combines a near-black carbon texture, translucent glass panels, restrained cyan-violet accents, Material 3 component behavior, and iPhone-style bottom tab navigation. The interface should feel premium without becoming visually noisy: depth comes from layered surfaces, subtle borders, soft shadows, and short motion transitions.

## Screen List

| Screen | Primary content and functionality |
|---|---|
| Welcome / Onboarding | Abbas AI identity, short value proposition, privacy/security note, and actions to Sign in or Create account. |
| Sign in | Email and password fields, password visibility toggle, validation feedback, forgot-password entry point, and sign-in action. |
| Register | Name, email, password, confirm password, terms acknowledgement, and account creation action. |
| Home Dashboard | Greeting, quick prompt suggestions, recent conversations, usage/status card, and a prominent New Chat action. |
| Chat | Conversation header, message list, assistant/user message bubbles, copy action, regenerate action, composer, send button, and loading state. |
| Conversation History | Searchable list of saved conversations with timestamps, delete/archive actions, and tap-through to Chat. |
| Explore / Prompt Library | Curated prompt cards for coding, study, writing, and productivity; tapping a card opens a prefilled chat composer. |
| Profile / Settings | User identity, appearance preference, notification/privacy controls, API status explanation, and sign-out action. |
| Account Recovery | Email input and recovery feedback state; this remains a functional placeholder until an email provider is configured. |

## Navigation Model

The app uses an iPhone-style bottom tab bar with four destinations: **Home**, **History**, **Explore**, and **Profile**. The Chat screen is opened as a focused stack route from Home, History, or Explore and uses a back button in the top-left. Authentication screens sit outside the tab layout. All screens use safe-area-aware containers and portrait-first spacing suitable for thumb reach.

## Key User Flows

### New AI Conversation

1. The user opens Home and taps **New chat** or a quick prompt card.
2. Abbas AI opens the Chat screen with the prompt composer focused.
3. The user writes a message and taps Send.
4. The user message appears immediately, followed by a clear loading indicator.
5. The AI response is rendered in an assistant bubble with copy and regenerate actions.
6. The conversation is persisted locally and becomes available in History.

### Authentication

1. The user opens Abbas AI and sees Welcome.
2. The user chooses Sign in or Create account.
3. Form fields validate inline and submit feedback is shown without dead ends.
4. On success, the user enters Home; on failure, the form remains populated with a concise error message.
5. Sign out returns the user to Welcome and clears the local session state.

### Explore a Prompt

1. The user opens Explore and selects a category or prompt card.
2. Abbas AI opens Chat with the selected prompt prefilled but not sent.
3. The user edits the prompt and sends it when ready.

## Visual System

### Color Choices

| Token | Color | Use |
|---|---|---|
| Carbon background | `#07090C` | Main screen background and app chrome |
| Carbon surface | `#11151B` | Primary cards and input surfaces |
| Glass surface | `rgba(255,255,255,0.07)` | Translucent elevated panels |
| Glass border | `rgba(255,255,255,0.14)` | Card outlines and separators |
| Primary cyan | `#65E8FF` | Main actions, active navigation, focus states |
| Accent violet | `#9B7BFF` | Secondary highlights and gradient depth |
| Primary text | `#F5F7FA` | Headings and high-emphasis content |
| Secondary text | `#9BA6B2` | Supporting labels and timestamps |
| Assistant tint | `#17232D` | Assistant message bubbles |
| User tint | `#24345C` | User message bubbles |
| Success | `#56E39F` | Connected/success states |
| Error | `#FF6B7A` | Validation and request errors |

### Components and Motion

Cards use 18–24 px corner radii, a 1 px glass border, and restrained elevation. Primary buttons use a cyan-to-violet gradient only where contrast remains accessible. Press feedback uses a small scale reduction around 0.97 and opacity change; screen transitions use short fade/slide timing rather than dramatic bouncing. A subtle animated orb or gradient glow may appear in the Home hero, but it must not compete with the chat content or reduce performance on low-end Android devices.

## Accessibility and One-Handed Use

Touch targets should be at least 44–48 px, critical actions should remain in the lower half of the screen when practical, and text must remain readable against carbon surfaces. Form errors should be communicated both through color and text. The keyboard must not hide the composer, and chat history should use efficient list rendering rather than a mapped ScrollView.

## Security Boundary

The first personal prototype may use a development-only API configuration, but the production architecture must keep the Grok credential outside the client bundle. The preferred path is a server-side proxy or built-in server LLM route, with the mobile client sending authenticated chat requests to the server. No real API key should be committed to GitHub, bundled into the APK, or written into source files.
