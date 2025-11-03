import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginRecoveryAuthnCodeInput(props: PageProps<Extract<KcContext, { pageId: "login-recovery-authn-code-input.ftl" }>, I18n>) {
  const { kcContext, i18n, Template } = props;

  const { url, messagesPerField, recoveryAuthnCodesInputBean } = kcContext;

  const { msg, msgStr } = i18n;

  return (
    <Template
      {...props}
      headerNode={msg("auth-recovery-code-header")}
      displayMessage={!messagesPerField.existsError("recoveryCodeInput")}
    >
      <form id="kc-recovery-code-login-form" action={url.loginAction} method="post" className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="recoveryCodeInput">
            {msg("auth-recovery-code-prompt", `${recoveryAuthnCodesInputBean.codeNumber}`)}
          </Label>
          <Input
            tabIndex={1}
            id="recoveryCodeInput"
            name="recoveryCodeInput"
            aria-invalid={messagesPerField.existsError("recoveryCodeInput")}
            autoComplete="off"
            type="text"
            className="h-10"
            autoFocus
          />
          {messagesPerField.existsError("recoveryCodeInput") && (
            <Alert variant="destructive">
              <AlertDescription
                id="input-error"
                aria-live="polite"
                dangerouslySetInnerHTML={{
                  __html: kcSanitize(messagesPerField.get("recoveryCodeInput"))
                }}
              />
            </Alert>
          )}
        </div>

        <div className="space-y-4">
          <Button type="submit" name="login" id="kc-login" className="w-full">
            {msgStr("doLogIn")}
          </Button>
        </div>
      </form>
    </Template>
  );
}
