import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { mobileTrpc } from './lib/mobile-trpc';

const colors = {
  bg: '#07090C',
  surface: '#11151B',
  border: '#26313D',
  text: '#F5F7FA',
  muted: '#9BA6B2',
  cyan: '#65E8FF',
  violet: '#9B7BFF',
  green: '#56E39F',
  error: '#FF6B7A',
};

type RouteName = 'Welcome' | 'Login' | 'Register' | 'Main' | 'Chat';
type TabName = 'Home' | 'History' | 'Explore' | 'Profile';
type NavContextValue = {
  navigate: (name: RouteName | TabName, params?: { prompt?: string }) => void;
  replace: (name: RouteName) => void;
  goBack: () => void;
  tab: TabName;
  chatPrompt?: string;
};
const NavContext = createContext<NavContextValue | null>(null);
function useNav() {
  const value = useContext(NavContext);
  if (!value) throw new Error('Navigation context is unavailable');
  return value;
}

function Screen({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.screen}>
      {children}
    </SafeAreaView>
  );
}
function PrimaryButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
    >
      <Text style={styles.primaryText}>{title}</Text>
    </Pressable>
  );
}
function Icon({ label }: { label: string }) {
  return (
    <Text style={{ color: colors.cyan, fontSize: 18, fontWeight: '800' }}>
      {label}
    </Text>
  );
}

function Welcome() {
  const nav = useNav();
  return (
    <Screen>
      <View style={styles.welcomeTop}>
        <View style={styles.logo}>
          <Icon label="✦" />
        </View>
        <Text style={styles.eyebrow}>ABBAS AI</Text>
        <Text style={styles.hero}>Think it.{'\n'}Make it real.</Text>
        <Text style={styles.subtitle}>
          A focused AI workspace for your ideas, code, study, and everyday
          momentum.
        </Text>
      </View>
      <View>
        <View style={styles.infoCard}>
          <Icon label="✓" />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={styles.cardTitle}>Your space, your control</Text>
            <Text style={styles.cardSub}>Private-by-design conversations</Text>
          </View>
        </View>
        <PrimaryButton
          title="Create your account"
          onPress={() => nav.navigate('Register')}
        />
        <Pressable
          onPress={() => nav.navigate('Login')}
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>I already have an account</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

function AuthForm({ register }: { register: boolean }) {
  const nav = useNav();
  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable onPress={() => nav.goBack()} style={styles.back}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>
        <Text style={styles.title}>
          {register ? 'Create your space.' : 'Welcome back.'}
        </Text>
        <Text style={styles.subtitle}>
          {register
            ? 'A calm place to think, build, and move forward.'
            : 'Sign in to continue your focused workspace.'}
        </Text>
        <View style={{ marginTop: 28, gap: 14 }}>
          {register && <Field label="Your name" placeholder="Abbas Hussain" />}
          <Field
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
          />
          <Field
            label={register ? 'Create password' : 'Password'}
            placeholder={register ? 'At least 8 characters' : 'Your password'}
            secureTextEntry
          />
        </View>
        {!register && (
          <Pressable style={{ alignSelf: 'flex-end', marginTop: 14 }}>
            <Text style={styles.linkText}>Forgot password?</Text>
          </Pressable>
        )}
        <View style={{ marginTop: 24 }}>
          <PrimaryButton
            title={register ? 'Create account' : 'Sign in'}
            onPress={() => nav.replace('Main')}
          />
        </View>
        <View style={styles.inline}>
          <Text style={styles.cardSub}>
            {register ? 'Already have an account? ' : 'New to Abbas AI? '}
          </Text>
          <Pressable
            onPress={() => nav.replace(register ? 'Login' : 'Register')}
          >
            <Text style={styles.linkText}>
              {register ? 'Sign in' : 'Create account'}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}
function Field({
  label,
  placeholder,
  keyboardType,
  secureTextEntry,
}: {
  label: string;
  placeholder: string;
  keyboardType?: 'email-address';
  secureTextEntry?: boolean;
}) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#697785"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={styles.input}
      />
    </View>
  );
}

function Home() {
  const nav = useNav();
  const cards = [
    ['Build something', 'Turn an idea into a clear plan'],
    ['Study smarter', 'Explain any topic simply'],
    ['Code review', 'Find bugs and improve your code'],
  ];
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.row}>
          <View>
            <Text style={styles.eyebrow}>ABBAS AI</Text>
            <Text style={styles.title}>Good evening, Abbas.</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AH</Text>
          </View>
        </View>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>PERSONAL INTELLIGENCE</Text>
          <Text style={styles.heroCardTitle}>What are we creating today?</Text>
          <Text style={styles.cardSub}>
            Your private space for ideas, code, and focused thinking.
          </Text>
          <Pressable
            onPress={() => nav.navigate('Chat', {})}
            style={styles.smallButton}
          >
            <Text style={styles.primaryText}>＋ New chat</Text>
          </Pressable>
        </View>
        <Text style={styles.section}>Start with an idea</Text>
        <Text style={styles.cardSub}>Jump into a focused workflow</Text>
        {cards.map(([title, sub]) => (
          <Pressable
            key={title}
            onPress={() => nav.navigate('Chat', { prompt: sub })}
            style={styles.listCard}
          >
            <View style={styles.iconBox}>
              <Icon label="✦" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.cardTitle}>{title}</Text>
              <Text style={styles.cardSub}>{sub}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}
        <Text style={[styles.section, { marginTop: 28 }]}>Recent chats</Text>
        <View style={styles.empty}>
          <Text style={styles.cardTitle}>
            Your conversations will appear here
          </Text>
          <Text style={styles.cardSub}>
            Start a chat and keep your best thinking close.
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

function History() {
  const nav = useNav();
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>History</Text>
        <Text style={styles.subtitle}>Your ideas, kept in one place.</Text>
        <Pressable
          onPress={() => nav.navigate('Chat', {})}
          style={styles.empty}
        >
          <View style={styles.logo}>
            <Icon label="＋" />
          </View>
          <Text style={[styles.cardTitle, { marginTop: 14 }]}>
            Start your first conversation
          </Text>
          <Text style={[styles.cardSub, { textAlign: 'center', marginTop: 6 }]}>
            Your saved chats will appear in this space.
          </Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}
function Explore() {
  const nav = useNav();
  const prompts = [
    'Design a clean structure for my next project.',
    'Explain a difficult lesson in simple steps.',
    'Help me write a clear professional message.',
    'Create a realistic plan for today.',
  ];
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.subtitle}>
          Start with a prompt made for your goal.
        </Text>
        {prompts.map((prompt, i) => (
          <Pressable
            key={prompt}
            onPress={() => nav.navigate('Chat', { prompt })}
            style={styles.listCard}
          >
            <View style={styles.iconBox}>
              <Icon label={i % 2 ? '✧' : '✦'} />
            </View>
            <Text style={[styles.cardTitle, { flex: 1, marginLeft: 12 }]}>
              {prompt}
            </Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}
function Profile() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Make Abbas AI feel like yours.</Text>
        <View style={styles.profileCard}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarText}>AH</Text>
          </View>
          <View style={{ marginLeft: 14 }}>
            <Text style={styles.cardTitle}>Abbas Hussain</Text>
            <Text style={styles.cardSub}>Personal workspace</Text>
          </View>
        </View>
        {[
          'Appearance · Carbon dark mode',
          'Privacy & security · Protected conversations',
          'AI preferences · Response style and language',
        ].map(item => (
          <View key={item} style={styles.listCard}>
            <Icon label="•" />
            <Text style={[styles.cardTitle, { marginLeft: 14 }]}>{item}</Text>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

function Chat({ prompt }: { prompt?: string }) {
  const [input, setInput] = useState(prompt ?? '');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hey Abbas. I’m ready when you are. What should we work on?',
    },
  ]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const send = async () => {
    const text = input.trim();
    if (!text || pending) return;
    const next = [...messages, { role: 'user' as const, text }];
    setMessages(next);
    setInput('');
    setPending(true);
    setError(false);
    try {
      const result = await mobileTrpc.ai.chat.mutate({
        messages: next.map(m => ({
          role: m.role as 'user' | 'assistant',
          content: m.text,
        })),
      });
      setMessages(current => [
        ...current,
        { role: 'assistant', text: result.text },
      ]);
    } catch {
      setError(true);
      setMessages(current => [
        ...current,
        {
          role: 'assistant',
          text: 'I couldn’t reach the AI service right now. Please try again.',
        },
      ]);
    } finally {
      setPending(false);
    }
  };
  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.chatHeader}>
          <Text style={styles.title}>New conversation</Text>
          <Text style={styles.cardSub}>Abbas AI · Secure server</Text>
        </View>
        <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
          {messages.map((m, i) => (
            <View
              key={`${i}-${m.text}`}
              style={[
                styles.bubble,
                m.role === 'user' ? styles.userBubble : styles.assistantBubble,
              ]}
            >
              <Text style={styles.cardSub}>
                {m.role === 'user' ? 'You' : 'Abbas AI'}
              </Text>
              <Text style={styles.message}>{m.text}</Text>
            </View>
          ))}
          {pending && <ActivityIndicator color={colors.cyan} />}
        </ScrollView>
        {error && (
          <Text style={styles.error}>
            The server could not complete that request.
          </Text>
        )}
        <View style={styles.composer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Message Abbas AI..."
            placeholderTextColor="#697785"
            multiline
            style={styles.composerInput}
          />
          <Pressable onPress={send} style={styles.send}>
            <Text style={styles.primaryText}>↑</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

function MainTabs() {
  const nav = useNav();
  const screens = { Home, History, Explore, Profile };
  const CurrentScreen = screens[nav.tab];
  const tabs: Array<[TabName, string]> = [
    ['Home', '⌂'],
    ['History', '◷'],
    ['Explore', '✦'],
    ['Profile', '●'],
  ];
  return (
    <View style={styles.mainShell}>
      <CurrentScreen />
      <View style={styles.tabBar}>
        {tabs.map(([name, icon]) => (
          <Pressable
            key={name}
            onPress={() => nav.navigate(name)}
            style={[styles.tabItem, nav.tab === name && styles.tabItemActive]}
          >
            <Text
              style={[styles.tabIcon, nav.tab === name && styles.tabIconActive]}
            >
              {icon}
            </Text>
            <Text
              style={[
                styles.tabLabel,
                nav.tab === name && styles.tabLabelActive,
              ]}
            >
              {name}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default function App() {
  const [route, setRoute] = useState<RouteName>('Welcome');
  const [tab, setTab] = useState<TabName>('Home');
  const [chatPrompt, setChatPrompt] = useState<string | undefined>();
  const nav = useMemo<NavContextValue>(
    () => ({
      tab,
      chatPrompt,
      navigate: (name, params) => {
        if (
          name === 'Home' ||
          name === 'History' ||
          name === 'Explore' ||
          name === 'Profile'
        ) {
          setTab(name);
          setRoute('Main');
          return;
        }
        if (name === 'Chat') setChatPrompt(params?.prompt);
        setRoute(name);
      },
      replace: name => setRoute(name),
      goBack: () => setRoute(route === 'Chat' ? 'Main' : 'Welcome'),
    }),
    [chatPrompt, route, tab],
  );

  return (
    <SafeAreaProvider>
      <NavContext.Provider value={nav}>
        {route === 'Welcome' && <Welcome />}
        {route === 'Login' && <AuthForm register={false} />}
        {route === 'Register' && <AuthForm register />}
        {route === 'Main' && <MainTabs />}
        {route === 'Chat' && <Chat prompt={chatPrompt} />}
      </NavContext.Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: 20 },
  content: { paddingTop: 12, paddingBottom: 32 },
  welcomeTop: { flex: 1, paddingTop: 18 },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#65E8FF55',
    backgroundColor: '#13242D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyebrow: {
    marginTop: 18,
    color: colors.cyan,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 3,
  },
  hero: {
    marginTop: 16,
    color: colors.text,
    fontSize: 48,
    lineHeight: 55,
    fontWeight: '800',
  },
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: {
    marginTop: 10,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginBottom: 18,
  },
  cardTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
  cardSub: { color: colors.muted, fontSize: 13, lineHeight: 19 },
  primaryButton: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.cyan,
  },
  primaryText: { color: '#071016', fontWeight: '800' },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
  linkButton: { alignItems: 'center', padding: 16 },
  linkText: { color: colors.cyan, fontWeight: '700' },
  back: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  backText: { color: colors.text, fontSize: 30, lineHeight: 32 },
  label: { color: colors.text, fontWeight: '700', marginBottom: 8 },
  input: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 15,
    color: colors.text,
  },
  inline: { flexDirection: 'row', justifyContent: 'center', marginTop: 26 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#24345C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLarge: {
    width: 62,
    height: 62,
    borderRadius: 18,
    backgroundColor: '#24345C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: colors.cyan, fontWeight: '800' },
  heroCard: {
    marginTop: 24,
    padding: 20,
    borderRadius: 24,
    backgroundColor: '#17202B',
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroCardTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    marginTop: 12,
    marginBottom: 8,
  },
  smallButton: {
    alignSelf: 'flex-start',
    marginTop: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: colors.cyan,
  },
  section: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 26,
    marginBottom: 6,
  },
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginTop: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#1B2934',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: { color: colors.muted, fontSize: 26 },
  empty: {
    alignItems: 'center',
    padding: 26,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginTop: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginTop: 24,
  },
  chatHeader: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  bubble: { maxWidth: '88%', padding: 14, borderRadius: 16 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#24345C' },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#17232D',
    borderWidth: 1,
    borderColor: colors.border,
  },
  message: { color: colors.text, fontSize: 15, lineHeight: 22, marginTop: 6 },
  error: { color: colors.error, textAlign: 'center', fontSize: 12, padding: 8 },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 8,
    marginBottom: 8,
  },
  composerInput: {
    flex: 1,
    color: colors.text,
    paddingHorizontal: 10,
    paddingVertical: 10,
    maxHeight: 100,
  },
  send: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: colors.cyan,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainShell: { flex: 1, backgroundColor: colors.bg },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: Platform.OS === 'android' ? 10 : 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: '#0B0F14',
  },
  tabItem: { flex: 1, alignItems: 'center', gap: 3, paddingVertical: 5 },
  tabItemActive: {
    backgroundColor: '#13242D',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  tabIcon: { color: colors.muted, fontSize: 18, fontWeight: '800' },
  tabIconActive: { color: colors.cyan },
  tabLabel: { color: colors.muted, fontSize: 10, fontWeight: '700' },
  tabLabelActive: { color: colors.cyan },
});
