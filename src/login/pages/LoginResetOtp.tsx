import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function LoginResetOtp(props: PageProps<Extract<KcContext, { pageId: "login-reset-otp.ftl" }>, I18n>) {
  const { kcContext, i18n, Template } = props;

  const { url, messagesPerField, configuredOtpCredentials } = kcContext;

  const { msg, msgStr } = i18n;

  return (
    <Template {...props} displayMessage={!messagesPerField.existsError("totp")} headerNode={msg("doLogIn")}>
      <div className="w-full max-w-md">
        <div className="py-2 px-4 sm:rounded-lg sm:px-6">
          <form id="kc-otp-reset-form" className="space-y-6" action={url.loginAction} method="post">
            <div className="space-y-4">
              <p id="kc-otp-reset-form-description" className="text-sm text-muted-foreground">
                {msg("otp-reset-description")}
              </p>
              <RadioGroup name="selectedCredentialId" defaultValue={configuredOtpCredentials.selectedCredentialId}>
                {configuredOtpCredentials.userOtpCredentials.map((otpCredential, index) => (
                  <div key={otpCredential.id} className="flex items-center space-x-2 p-3 border rounded-md hover:bg-accent">
                    <RadioGroupItem value={otpCredential.id} id={`kc-otp-credential-${index}`} />
                    <Label htmlFor={`kc-otp-credential-${index}`} className="flex-1 cursor-pointer">
                      {otpCredential.userLabel}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <Button id="kc-otp-reset-form-submit" type="submit" className="w-full">
                {msgStr("doSubmit")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Template>
  );
}
