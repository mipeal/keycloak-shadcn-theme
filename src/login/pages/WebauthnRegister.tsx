import { useScript } from "keycloakify/login/pages/WebauthnRegister.useScript";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Key } from "lucide-react";

export default function WebauthnRegister(props: PageProps<Extract<KcContext, { pageId: "webauthn-register.ftl" }>, I18n>) {
  const { kcContext, i18n, Template } = props;

  const { url, isSetRetry, isAppInitiatedAction } = kcContext;

  const { msg, msgStr } = i18n;

  const authButtonId = "authenticateWebAuthnButton";

  useScript({
    authButtonId,
    kcContext,
    i18n
  });

  return (
    <Template
      {...props}
      headerNode={
        <div className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          {msg("webauthn-registration-title")}
        </div>
      }
    >
      <div className="w-full max-w-md">
        <div className="py-2 px-4 sm:rounded-lg sm:px-6">
          <form id="register" className="space-y-6" action={url.loginAction} method="post">
            <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
            <input type="hidden" id="attestationObject" name="attestationObject" />
            <input type="hidden" id="publicKeyCredentialId" name="publicKeyCredentialId" />
            <input type="hidden" id="authenticatorLabel" name="authenticatorLabel" />
            <input type="hidden" id="transports" name="transports" />
            <input type="hidden" id="error" name="error" />
            
            <div className="flex items-center space-x-2">
              <Checkbox id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true} />
              <Label htmlFor="logout-sessions" className="text-sm font-medium text-white/90">
                {msg("logoutOtherSessions")}
              </Label>
            </div>
          </form>

          <div className="space-y-4 mt-6">
            <Button type="submit" className="w-full" id={authButtonId}>
              {msgStr("doRegisterSecurityKey")}
            </Button>

            {!isSetRetry && isAppInitiatedAction && (
              <form action={url.loginAction} id="kc-webauthn-settings-form" method="post">
                <Button type="submit" variant="outline" className="w-full" id="cancelWebAuthnAIA" name="cancel-aia" value="true">
                  {msg("doCancel")}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Template>
  );
}
