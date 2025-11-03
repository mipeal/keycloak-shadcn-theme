import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginX509Info(props: PageProps<Extract<KcContext, { pageId: "login-x509-info.ftl" }>, I18n>) {
  const { kcContext, i18n, Template } = props;

  const { url, x509 } = kcContext;

  const { msg, msgStr } = i18n;

  return (
    <Template {...props} headerNode={msg("doLogIn")}>
      <div className="w-full max-w-md">
        <div className="py-2 px-4 sm:rounded-lg sm:px-6">
          <form id="kc-x509-login-info" className="space-y-6" action={url.loginAction} method="post">
            <div className="space-y-2">
              <Label htmlFor="certificate_subjectDN">{msg("clientCertificate")}</Label>
              {x509.formData.subjectDN ? (
                <div className="p-3 bg-muted rounded-md">
                  <p id="certificate_subjectDN" className="text-sm break-all">
                    {x509.formData.subjectDN}
                  </p>
                </div>
              ) : (
                <div className="p-3 bg-muted rounded-md">
                  <p id="certificate_subjectDN" className="text-sm text-muted-foreground">
                    {msg("noCertificate")}
                  </p>
                </div>
              )}
            </div>

            {x509.formData.isUserEnabled && (
              <div className="space-y-2">
                <Label htmlFor="username">{msg("doX509Login")}</Label>
                <div className="p-3 bg-muted rounded-md">
                  <p id="username" className="text-sm font-medium">
                    {x509.formData.username}
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button type="submit" name="login" id="kc-login" className="flex-1">
                {msgStr("doContinue")}
              </Button>
              {x509.formData.isUserEnabled && (
                <Button type="submit" name="cancel" id="kc-cancel" variant="outline" className="flex-1">
                  {msgStr("doIgnore")}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Template>
  );
}
