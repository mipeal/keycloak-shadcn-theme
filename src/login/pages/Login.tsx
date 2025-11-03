import { useEffect, useReducer, useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { assert } from "keycloakify/tools/assert";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, RotateCcw } from "lucide-react";
import { ProviderIcon } from "../lib/providerIcons";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
  const { kcContext, i18n, Template } = props;
  const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;
  const { msg, msgStr } = i18n;
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  return (
    <Template
      {...props}
      displayMessage={!messagesPerField.existsError("username", "password")}
      headerNode={msg("loginAccountTitle")}
      displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
      infoNode={
        <div className="flex items-center justify-center gap-2 text-white/90">
          <span>{msg("noAccount")}</span>
          <Button
            variant="link"
            className="h-auto p-0 font-medium text-blue-300 hover:text-blue-200 hover:no-underline"
            asChild
          >
            <a tabIndex={8} href={url.registrationUrl}>
              {msg("doRegister")}
            </a>
          </Button>
        </div>
      }
      socialProvidersNode={
        <>
          {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
            <div id="kc-social-providers" className="mt-6 w-full">
              <div className="relative flex items-center mb-4">
                <div className="flex-1 border-t border-white/20" />
                <span className="px-4 text-sm text-white/70">{msg("identity-provider-login-label")}</span>
                <div className="flex-1 border-t border-white/20" />
              </div>
              <ul className={`grid ${social.providers.length > 6 ? 'grid-cols-3' : social.providers.length > 3 ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
                {social.providers.map((p) => (
                  <li key={p.alias}>
                    <a
                      id={`social-${p.alias}`}
                      className="flex items-center justify-center px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl shadow-sm text-sm font-medium text-white hover:bg-white/10 transition-all duration-200"
                      style={{ backdropFilter: 'blur(12px)' }}
                      href={p.loginUrl}
                    >
                      <ProviderIcon alias={p.alias} size={20} className="mr-2" />
                      <span dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      }
    >
      {realm.password && (
        <form
          onSubmit={() => {
            setIsLoginButtonDisabled(true);
            return true;
          }}
          action={url.loginAction}
          method="post"
          className="space-y-5"
        >
          {!usernameHidden && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white/90 mb-2">
                {!realm.loginWithEmailAllowed ? msg("username") : !realm.registrationEmailAsUsername ? msg("usernameOrEmail") : msg("email")}
              </label>
              <Input
                tabIndex={2}
                id="username"
                name="username"
                defaultValue={login.username ?? ""}
                type="text"
                autoFocus
                autoComplete="username"
                aria-invalid={messagesPerField.existsError("username", "password")}
                className="h-11 bg-white/5 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-500/50"
                style={{ backdropFilter: 'blur(12px)' }}
              />
              {messagesPerField.existsError("username", "password") && (
                <p className="mt-2 text-sm text-red-300" id="input-error" aria-live="polite">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                    }}
                  />
                </p>
              )}
            </div>
          )}

          {usernameHidden && auth.showUsername && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white/90 mb-2">
                {!realm.loginWithEmailAllowed ? msg("username") : !realm.registrationEmailAsUsername ? msg("usernameOrEmail") : msg("email")}
              </label>
              <div className="relative">
                <Input
                  tabIndex={2}
                  id="username"
                  name="username"
                  defaultValue={auth.attemptedUsername ?? ""}
                  type="text"
                  disabled
                  className="h-11 bg-white/5 backdrop-blur-sm border-white/20 text-white/70 pr-10"
                  style={{ backdropFilter: 'blur(12px)' }}
                />
                <a
                  href={url.loginRestartFlowUrl}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/90 transition-colors"
                  title={msgStr("restartLoginTooltip")}
                >
                  <RotateCcw size={16} />
                </a>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">
              {msg("password")}
            </label>
            <PasswordWrapper i18n={i18n} passwordInputId="password">
              <Input
                tabIndex={3}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={messagesPerField.existsError("username", "password")}
                className="h-11 bg-white/5 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-500/50"
                style={{ backdropFilter: 'blur(12px)' }}
              />
            </PasswordWrapper>
            {usernameHidden && messagesPerField.existsError("username", "password") && (
              <p className="mt-2 text-sm text-red-300" id="input-error" aria-live="polite">
                <span
                  dangerouslySetInnerHTML={{
                    __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                  }}
                />
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            {realm.rememberMe && !usernameHidden && (
              <div className="flex items-center space-x-2">
                <Checkbox id="rememberMe" name="rememberMe" defaultChecked={!!login.rememberMe} className="border-white/30 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                <label
                  htmlFor="rememberMe"
                  className="text-sm font-medium text-white/90 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {msg("rememberMe")}
                </label>
              </div>
            )}
            {realm.resetPasswordAllowed && (
              <div className="text-sm">
                <Button variant="link" className="h-auto p-0 text-blue-300 hover:text-blue-200" asChild>
                  <a tabIndex={6} href={url.loginResetCredentialsUrl}>{msg("doForgotPassword")}</a>
                </Button>
              </div>
            )}
          </div>

          <div>
            <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
            <Button 
              disabled={isLoginButtonDisabled} 
              name="login" 
              type="submit" 
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {msgStr("doLogIn")}
            </Button>
          </div>
        </form>
      )}
    </Template>
  );
}

function PasswordWrapper(props: { i18n: I18n; passwordInputId: string; children: JSX.Element }) {
  const { i18n, passwordInputId, children } = props;
  const { msgStr } = i18n;
  const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer((state: boolean) => !state, false);

  useEffect(() => {
    const passwordInputElement = document.getElementById(passwordInputId);
    assert(passwordInputElement instanceof HTMLInputElement);
    passwordInputElement.type = isPasswordRevealed ? "text" : "password";
  }, [isPasswordRevealed]);

  return (
    <div className="relative">
      {children}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full px-3 hover:bg-white/10 transition-colors duration-200"
        onClick={toggleIsPasswordRevealed}
        aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
        aria-controls={passwordInputId}
      >
        {isPasswordRevealed ? <EyeOff className="h-4 w-4 text-white/60" /> : <Eye className="h-4 w-4 text-white/60" />}
      </Button>
    </div>
  );
}
