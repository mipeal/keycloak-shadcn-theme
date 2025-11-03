import { PageProps } from "keycloakify/login/pages/PageProps";
import { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginOauth2DeviceVerifyUserCode(
  props: PageProps<Extract<KcContext, { pageId: "login-oauth2-device-verify-user-code.ftl" }>, I18n>
) {
  const { kcContext, i18n, Template } = props;
  const { url } = kcContext;

  const { msg, msgStr } = i18n;

  return (
    <Template {...props} headerNode={msg("oauth2DeviceVerificationTitle")}>
      <form id="kc-user-verify-device-user-code-form" className="space-y-6" action={url.oauth2DeviceVerificationAction} method="post">
        <div className="space-y-2">
          <Label htmlFor="device-user-code">{msg("verifyOAuth2DeviceUserCode")}</Label>
          <Input id="device-user-code" name="device_user_code" autoComplete="off" type="text" autoFocus />
        </div>

        <Button type="submit" className="w-full">
          {msgStr("doSubmit")}
        </Button>
      </form>
    </Template>
  );
}
