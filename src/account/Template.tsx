import { useEffect, useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "./Template.useInitialize";
import type { TemplateProps } from "./TemplateProps";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { Button } from "@/components/ui/button";
import {
  User,
  Lock,
  Shield,
  Link2,
  Monitor,
  Grid,
  FileText,
  LogOut,
  ChevronRight,
  Moon,
  Sun
} from "lucide-react";

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, active, children, displayMessage = true } = props;

  const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;
  const { url, features, realm, message, referrer } = kcContext;
  const [backgroundImageLoaded, setBackgroundImageLoaded] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    document.title = msgStr("accountManagementTitle");

    // Check initial theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    }
    setIsDark(shouldBeDark);

    // Preload background image
    const img = new Image();
    img.onload = () => setBackgroundImageLoaded(true);
    img.src = new URL("../login/assets/img/norway_cyber_background.png", import.meta.url).href;
  }, [msgStr]);

  // Sync theme state with DOM changes
  useEffect(() => {
    const updateThemeState = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    updateThemeState();

    const observer = new MutationObserver(updateThemeState);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  useSetClassName({
    qualifiedName: "body",
    className: "min-h-screen relative overflow-hidden"
  });

  const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

  if (!isReadyToRender) {
    return null;
  }

  const handleThemeToggle = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Message/Alert Display Component
  const MessageIcon = () => {
    switch (message?.type) {
      case "success":
        return (
          <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        );
      case "warning":
        return (
          <svg className="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case "error":
        return (
          <svg className="w-5 h-5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case "info":
      default:
        return (
          <svg className="w-5 h-5 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const MessageTypeHeader = () => {
    switch (message?.type) {
      case "success": return "Success";
      case "warning": return "Warning";
      case "error": return "Error";
      case "info":
      default: return "Info";
    }
  };

  const getMessageStyles = () => {
    switch (message?.type) {
      case "error":
        return "bg-destructive/10 border-destructive/30 text-destructive-foreground";
      case "warning":
        return "bg-warning/10 border-warning/30 text-warning-foreground";
      case "info":
        return "bg-info/10 border-info/30 text-info-foreground";
      case "success":
      default:
        return "bg-success/10 border-success/30 text-success-foreground";
    }
  };

  const navItems = [
    { id: "account", label: msg("account"), href: url.accountUrl, icon: User },
    ...(features.passwordUpdateSupported ? [{ id: "password", label: msg("password"), href: url.passwordUrl, icon: Lock }] : []),
    { id: "totp", label: msg("authenticator"), href: url.totpUrl, icon: Shield },
    ...(features.identityFederation ? [{ id: "social", label: msg("federatedIdentity"), href: url.socialUrl, icon: Link2 }] : []),
    { id: "sessions", label: msg("sessions"), href: url.sessionsUrl, icon: Monitor },
    { id: "applications", label: msg("applications"), href: url.applicationsUrl, icon: Grid },
    ...(features.log ? [{ id: "log", label: msg("log"), href: url.logUrl, icon: FileText }] : []),
    ...(realm.userManagedAccessAllowed && features.authorization ? [{ id: "authorization", label: msg("myResources"), href: url.resourceUrl, icon: Grid }] : []),
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background Image */}
      <div
        className={`fixed inset-0 transition-opacity duration-1000 ${backgroundImageLoaded ? 'opacity-20 dark:opacity-30' : 'opacity-0'}`}
        style={{
          backgroundImage: `url(${new URL("../login/assets/img/norway_cyber_background.png", import.meta.url).href})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        aria-hidden="true"
      />

      {/* Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/95 dark:from-background/95 dark:via-background/90 dark:to-background/95" aria-hidden="true" />

      {/* Main Layout */}
      <div className="relative z-10 flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 glass-strong border-r border-border flex flex-col`}>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {sidebarOpen && (
              <h1 className="text-xl font-bold gradient-text">Account Console</h1>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="ml-auto"
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              <ChevronRight className={`h-4 w-4 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </a>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border space-y-2">
            {referrer?.url && sidebarOpen && (
              <a
                href={referrer.url}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5 rotate-180 shrink-0" />
                <span className="font-medium">{msg("backTo", referrer.name)}</span>
              </a>
            )}
            <a
              href={url.getLogoutUrl()}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                "text-destructive hover:bg-destructive/10 hover:text-destructive"
              )}
            >
              <LogOut className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span className="font-medium">{msg("doSignOut")}</span>}
            </a>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <header className="glass-strong border-b border-border px-6 py-4 flex items-center justify-end">
            <div className="flex items-center gap-4">
              {!sidebarOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open sidebar"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex items-center justify-end gap-3">
              {/* Theme Toggle */}
              <Button
                variant="outline"
                size="icon"
                onClick={handleThemeToggle}
                className="glass-strong border border-border rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-200 shadow-sm min-h-[40px] min-w-[40px]"
                aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                title={isDark ? "Switch to light theme" : "Switch to dark theme"}
              >
                {isDark ? (
                  <Sun className="w-10 h-10 text-foreground" />
                ) : (
                  <Moon className="w-10 h-10 text-foreground" />
                )}
              </Button>

              {/* Language Selector */}
              {enabledLanguages.length > 1 && (
                <div className="relative">
                  <label htmlFor="language-selector" className="sr-only">Select language</label>
                  <select
                    id="language-selector"
                    value={currentLanguage.languageTag}
                    onChange={(e) => {
                      const selected = enabledLanguages.find(({ languageTag }) => languageTag === e.target.value);
                      if (selected) {
                        window.location.href = selected.href;
                      }
                    }}
                    className="appearance-none glass-strong border border-border rounded-xl px-4 py-2 pr-10 text-sm font-medium text-foreground bg-background/50 backdrop-blur-sm shadow-sm hover:bg-background/70 focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 min-h-[40px] cursor-pointer"
                    aria-label="Select language"
                  >
                    {enabledLanguages.map(({ languageTag, label }) => (
                      <option key={languageTag} value={languageTag} className="bg-card text-foreground">
                        {label}
                      </option>
                    ))}
                  </select>
                  <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              )}
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-5xl mx-auto">
              {/* Message/Alert Display */}
              {displayMessage && message !== undefined && (
                <div className={`mb-6 p-4 rounded-xl border backdrop-blur-sm ${getMessageStyles()}`} role="alert">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 pt-0.5">
                      <MessageIcon />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold mb-1.5">
                        {MessageTypeHeader()}
                      </h3>
                      <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Page Content */}
              <div className="glass-strong rounded-2xl shadow-xl border border-border p-6 sm:p-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
