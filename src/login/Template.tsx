import { useEffect, useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    headerNode,
    infoNode = null,
    socialProvidersNode = null,
    children,
    documentTitle,
    bodyClassName,
    kcContext,
    i18n
  } = props;

  const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;
  const { realm, auth, url, message, isAppInitiatedAction } = kcContext;
  const [backgroundImageLoaded, setBackgroundImageLoaded] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.title = documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName);

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
    img.src = new URL("./assets/img/norway_cyber_background.png", import.meta.url).href;
  }, [documentTitle, realm.displayName, msgStr]);

  // Sync theme state with DOM changes (e.g., from external sources)
  useEffect(() => {
    const updateThemeState = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    // Check on mount
    updateThemeState();

    // Watch for class changes on html element
    const observer = new MutationObserver(updateThemeState);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  useSetClassName({
    qualifiedName: "body",
    className: bodyClassName ?? "min-h-screen relative overflow-hidden"
  });

  const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss: false });

  if (!isReadyToRender) {
    return null;
  }

  // --- Utility Component for Message/Alert Display ---
  const MessageIcon = () => {
    switch (message?.type) {
      case "success":
        return (
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        );
      case "warning":
        return (
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case "error":
        return (
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case "info":
      default:
        return (
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
  // ----------------------------------------------------

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

  return (
    <div className="min-h-screen relative overflow-y-auto bg-background">

      {/* Background Image */}
      <div
        className={`fixed inset-0 transition-opacity duration-1000 ${backgroundImageLoaded ? 'opacity-20 dark:opacity-30' : 'opacity-0'
          }`}
        style={{
          backgroundImage: `url(${new URL("./assets/img/norway_cyber_background.png", import.meta.url).href})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        aria-hidden="true"
      />

      {/* Overlay for better text readability - darker in light mode to reduce brightness */}
      <div className="fixed inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/95 dark:from-background/95 dark:via-background/90 dark:to-background/95" aria-hidden="true" />

      {/* Header Controls */}
      <header className="relative z-10 w-full flex justify-end items-center p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Theme Toggle */}
          <ThemeToggle isDark={isDark} onToggle={handleThemeToggle} />

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
                className="appearance-none glass-strong border border-border rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 pr-8 sm:pr-10 text-sm font-medium text-foreground shadow-md focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 min-h-[44px] sm:min-h-[40px] cursor-pointer"
                aria-label="Select language"
              >
                {enabledLanguages.map(({ languageTag, label }) => (
                  <option key={languageTag} value={languageTag} className="bg-card text-foreground">
                    {label}
                  </option>
                ))}
              </select>
              <svg className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Container */}
      <main className="relative z-10 flex items-start justify-center min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-120px)] px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        <div className="w-full max-w-md lg:max-w-lg">
          {/* Main Logo and Branding */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-3 gradient-text">
              Norwegian Cyber Range
            </h1>
          </div>

          {/* Main Card */}
          <div className="glass-strong rounded-2xl sm:rounded-3xl shadow-xl lg:shadow-2xl border border-border p-6 sm:p-8 lg:p-10">

            {/* Page Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3 sm:mb-4">{headerNode}</h2>
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-info mx-auto rounded-full" />
            </div>

            {/* Required Fields Indicator */}
            {displayRequiredFields && (
              <div className="text-xs sm:text-sm text-muted-foreground mb-6 text-center">
                <span className="text-destructive">*</span> Required
              </div>
            )}

            {/* Message/Alert Display */}
            {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
              <div className={`mb-6 sm:mb-8 p-4 sm:p-5 rounded-xl border backdrop-blur-sm ${getMessageStyles()}`} role="alert">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="shrink-0 pt-0.5">
                    <MessageIcon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold mb-1.5 sm:mb-2">
                      {MessageTypeHeader()}
                    </h3>
                    <div className="text-sm sm:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
                  </div>
                </div>
              </div>
            )}

            {/* Page Content */}
            <div className="space-y-4 sm:space-y-6">
              {children}
            </div>

            {/* Social Providers */}
            {socialProvidersNode && (
              <div className="mt-6 sm:mt-8">
                {socialProvidersNode}
              </div>
            )}

            {/* Try Another Way Link */}
            {auth !== undefined && auth.showTryAnotherWayLink && (
              <form id="kc-select-try-another-way-form" action={url.loginAction} method="post" className="mt-6 sm:mt-8 text-center">
                <input type="hidden" name="tryAnotherWay" value="on" />
                <button
                  type="submit"
                  className="inline-flex items-center text-sm sm:text-base font-medium text-primary hover:text-primary/80 transition-colors duration-200 min-h-[44px] sm:min-h-[40px]"
                  aria-label={msgStr("doTryAnotherWay")}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {msg("doTryAnotherWay")}
                </button>
              </form>
            )}
          </div>

          {/* Footer Info */}
          {displayInfo && (
            <footer className="mt-6 sm:mt-8 lg:mt-10 text-center">
              <div className="text-xs sm:text-sm text-muted-foreground space-y-3 sm:space-y-4">
                {infoNode}
                <div className="flex items-center justify-center gap-2 sm:gap-4 pt-4 sm:pt-6 border-t border-border">
                  <span className="text-xs sm:text-sm">© NCR</span>
                </div>
              </div>
            </footer>
          )}
        </div>
      </main>
    </div>
  );
}

// Theme Toggle Component
interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 glass-strong border border-border rounded-xl text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 shadow-md focus:ring-2 focus:ring-ring focus:outline-none min-h-[44px] sm:min-h-[40px]"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        // Dark mode active - show sun icon (click to switch to light)
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        // Light mode active - show moon icon (click to switch to dark)
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}