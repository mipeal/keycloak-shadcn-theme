import "@/global.css";
import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";
import { ThemeProvider } from "@/components/theme-provider";

import Login from "./pages/Login";
import LoginOtp from "./pages/LoginOtp";
import LoginPageExpired from "./pages/LoginPageExpired";
import LoginResetPassword from "./pages/LoginResetPassword";
import LoginUpdatePassword from "./pages/LoginUpdatePassword";
import LoginVerifyEmail from "./pages/LoginVerifyEmail";
import LogoutConfirm from "./pages/LogoutConfirm";
import Register from "./pages/Register";
import Error from "./pages/Error";
import Info from "./pages/Info";
import LoginUsername from "./pages/LoginUsername";
import LoginPassword from "./pages/LoginPassword";
import Code from "./pages/Code";
import DeleteAccountConfirm from "./pages/DeleteAccountConfirm";
import DeleteCredential from "./pages/DeleteCredential";
import FrontchannelLogout from "./pages/FrontchannelLogout";
import IdpReviewUserProfile from "./pages/IdpReviewUserProfile";
import LoginConfigTotp from "./pages/LoginConfigTotp";
import LoginIdpLinkConfirm from "./pages/LoginIdpLinkConfirm";
import LoginIdpLinkConfirmOverride from "./pages/LoginIdpLinkConfirmOverride";
import LoginIdpLinkEmail from "./pages/LoginIdpLinkEmail";
import LoginOauth2DeviceVerifyUserCode from "./pages/LoginOauth2DeviceVerifyUserCode";
import LoginOauthGrant from "./pages/LoginOauthGrant";
import LoginPasskeysConditionalAuthenticate from "./pages/LoginPasskeysConditionalAuthenticate";
import LoginRecoveryAuthnCodeConfig from "./pages/LoginRecoveryAuthnCodeConfig";
import LoginRecoveryAuthnCodeInput from "./pages/LoginRecoveryAuthnCodeInput";
import LoginResetOtp from "./pages/LoginResetOtp";
import LoginUpdateProfile from "./pages/LoginUpdateProfile";
import LoginX509Info from "./pages/LoginX509Info";
import SamlPostForm from "./pages/SamlPostForm";
import SelectAuthenticator from "./pages/SelectAuthenticator";
import Terms from "./pages/Terms";
import UpdateEmail from "./pages/UpdateEmail";
import WebauthnAuthenticate from "./pages/WebauthnAuthenticate";
import WebauthnError from "./pages/WebauthnError";
import WebauthnRegister from "./pages/WebauthnRegister";

const UserProfileFormFields = lazy(() => import("./UserProfileFormFields"));

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
  const { kcContext } = props;

  const { i18n } = useI18n({ kcContext });

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="keycloak-theme">
      <Suspense>
        {(() => {
          switch (kcContext.pageId) {
            case "login.ftl":
              return <Login {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "login-username.ftl":
              return <LoginUsername {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "login-password.ftl":
              return <LoginPassword {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "login-reset-password.ftl":
              return <LoginResetPassword {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "login-verify-email.ftl":
              return <LoginVerifyEmail {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "login-otp.ftl":
              return <LoginOtp {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "info.ftl":
              return <Info {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "error.ftl":
              return <Error {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "login-update-password.ftl":
              return <LoginUpdatePassword {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "login-page-expired.ftl":
              return <LoginPageExpired {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "logout-confirm.ftl":
              return <LogoutConfirm {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "register.ftl":
              return (
                <Register
                  {...{ kcContext, i18n, classes }}
                  Template={Template}
                  UserProfileFormFields={UserProfileFormFields}
                  doMakeUserConfirmPassword={true}
                  doUseDefaultCss={true}
                />
              );
            case "code.ftl":
              return <Code {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "delete-account-confirm.ftl":
              return <DeleteAccountConfirm {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "delete-credential.ftl":
              return <DeleteCredential {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "frontchannel-logout.ftl":
              return <FrontchannelLogout {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "idp-review-user-profile.ftl":
              return (
                <IdpReviewUserProfile
                  {...{ kcContext, i18n, classes }}
                  Template={Template}
                  UserProfileFormFields={UserProfileFormFields}
                  doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                  doUseDefaultCss={true}
                />
              );
            case "login-config-totp.ftl":
              return <LoginConfigTotp {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "login-idp-link-confirm.ftl":
              return <LoginIdpLinkConfirm {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "login-idp-link-confirm-override.ftl":
              return <LoginIdpLinkConfirmOverride {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "login-idp-link-email.ftl":
              return <LoginIdpLinkEmail {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "login-oauth2-device-verify-user-code.ftl":
              return <LoginOauth2DeviceVerifyUserCode {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "login-oauth-grant.ftl":
              return <LoginOauthGrant {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "login-passkeys-conditional-authenticate.ftl":
              return <LoginPasskeysConditionalAuthenticate {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "login-recovery-authn-code-config.ftl":
              return <LoginRecoveryAuthnCodeConfig {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "login-recovery-authn-code-input.ftl":
              return <LoginRecoveryAuthnCodeInput {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "login-reset-otp.ftl":
              return <LoginResetOtp {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "login-update-profile.ftl":
              return (
                <LoginUpdateProfile
                  {...{ kcContext, i18n, classes }}
                  Template={Template}
                  UserProfileFormFields={UserProfileFormFields}
                  doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                  doUseDefaultCss={true}
                />
              );
            case "login-x509-info.ftl":
              return <LoginX509Info {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "saml-post-form.ftl":
              return <SamlPostForm {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "select-authenticator.ftl":
              return <SelectAuthenticator {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "terms.ftl":
              return <Terms {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "update-email.ftl":
              return (
                <UpdateEmail
                  {...{ kcContext, i18n, classes }}
                  Template={Template}
                  UserProfileFormFields={UserProfileFormFields}
                  doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                  doUseDefaultCss={true}
                />
              );
            case "webauthn-authenticate.ftl":
              return <WebauthnAuthenticate {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "webauthn-error.ftl":
              return <WebauthnError {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            case "webauthn-register.ftl":
              return <WebauthnRegister {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
            default:
              return (
                <DefaultPage
                  kcContext={kcContext}
                  i18n={i18n}
                  classes={classes}
                  Template={Template}
                  doUseDefaultCss={true}
                  UserProfileFormFields={UserProfileFormFields}
                  doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
              );
          }
        })()}
      </Suspense>
    </ThemeProvider>
  );
}

const classes = {} satisfies { [key in ClassKey]?: string };
