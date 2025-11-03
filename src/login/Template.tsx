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

  useEffect(() => {
    document.title = documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName);
    
    // Preload background image
    const img = new Image();
    img.onload = () => setBackgroundImageLoaded(true);
    img.src = new URL("./assets/img/norway_cyber_background.png", import.meta.url).href;
  }, [documentTitle, realm.displayName, msgStr]);

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
          <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        );
      case "warning": 
        return (
          <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case "error": 
        return (
          <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case "info":
      default: 
        return (
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  // ----------------------------------------------------

  return (
    <div className="min-h-screen relative overflow-y-auto bg-gradient-to-br from-gray-900 via-blue-900/30 to-cyan-900/20">
      
      {/* Background Image */}
      <div 
        className={`fixed inset-0 transition-opacity duration-1000 ${
          backgroundImageLoaded ? 'opacity-30' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${new URL("./assets/img/norway_cyber_background.png", import.meta.url).href})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Overlay for better text readability */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900/80 via-blue-900/60 to-cyan-900/50" />

      {/* Norwegian Cyber Range Header */}
      <div className="relative z-10 w-full flex justify-end items-center p-6 max-w-7xl mx-auto">
        {/* Right side - Controls */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Language Selector */}
          {enabledLanguages.length > 1 && (
            <div className="relative">
              <select
                value={currentLanguage.languageTag}
                onChange={(e) => {
                  const selected = enabledLanguages.find(({ languageTag }) => languageTag === e.target.value);
                  if (selected) {
                    window.location.href = selected.href;
                  }
                }}
                className="appearance-none bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 pr-8 text-sm font-medium text-white shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                style={{ backdropFilter: 'blur(12px)' }}
              >
                {enabledLanguages.map(({ languageTag, label }) => (
                  <option key={languageTag} value={languageTag} className="bg-gray-800 text-white">
                    {label}
                  </option>
                ))}
              </select>
              <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex items-start justify-center min-h-[calc(100vh-120px)] px-4 py-8">
        <div className="w-full max-w-md">          
          {/* Main Logo and Branding */}
          <div className="text-center mb-8">
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white mb-2">
                Norwegian Cyber Range
              </h1>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8" style={{ backdropFilter: 'blur(16px)' }}>
          
            {/* Page Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">{headerNode}</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"></div>
            </div>

            {/* Required Fields Indicator */}
            {displayRequiredFields && (
              <div className="text-sm text-white/70 mb-6 text-center">
                <span className="text-red-400">*</span> Required fields
              </div>
            )}

            {/* Message/Alert Display */}
            {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
              <div className={`mb-6 p-4 rounded-xl border backdrop-blur-sm ${
                message.type === "error" 
                  ? "bg-red-500/10 border-red-400/30 text-red-100" 
                  : message.type === "warning" 
                    ? "bg-yellow-500/10 border-yellow-400/30 text-yellow-100"
                    : message.type === "info" 
                      ? "bg-blue-500/10 border-blue-400/30 text-blue-100"
                      : "bg-green-500/10 border-green-400/30 text-green-100"
              }`}>
              <div className="flex items-start">
                <div className="shrink-0 pt-0.5">
                  <MessageIcon />
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-semibold mb-1">
                    {MessageTypeHeader()}
                  </h3>
                  <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
                </div>
              </div>
            </div>
          )}

              {/* Page Content */}
              <div className="space-y-6">
                {children}
              </div>

              {/* Social Providers */}
              {socialProvidersNode}

              {/* Try Another Way Link */}
              {auth !== undefined && auth.showTryAnotherWayLink && (
                <form id="kc-select-try-another-way-form" action={url.loginAction} method="post" className="mt-6 text-center">
                  <input type="hidden" name="tryAnotherWay" value="on" />
                  <a
                    href="#"
                    id="try-another-way"
                    onClick={() => {
                      (document.forms as any)["kc-select-try-another-way-form"].submit();
                      return false;
                    }}
                    className="inline-flex items-center text-sm font-medium text-blue-300 hover:text-blue-200 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {msg("doTryAnotherWay")}
                  </a>
                </form>
              )}
          </div>

          {/* Footer Info */}
          {displayInfo && (
            <div className="mt-8 text-center">
              <div className="text-sm text-white/60 space-y-2">
                {infoNode}
                <div className="flex items-center justify-center space-x-2 pt-4 border-t border-white/10">
                  <span className="text-xs font-medium">© Norwegian Cyber Range</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Theme Toggle Component
function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={() => {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        }
      }}
      className="inline-flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200 shadow-lg"
      style={{ backdropFilter: 'blur(12px)' }}
      title="Toggle theme"
    >
      <svg className="w-5 h-5 sun-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      <svg className="w-5 h-5 moon-icon hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </button>
  );
}