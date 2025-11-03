import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export default function LoginPageExpired(props: PageProps<Extract<KcContext, { pageId: "login-page-expired.ftl" }>, I18n>) {
  const { kcContext, i18n, Template } = props;
  const { url } = kcContext;
  const { msg } = i18n;

  return (
    <Template {...props} displayMessage={false} headerNode={msg("pageExpiredTitle")}>
      <div className="w-full max-w-md">
        <div className="py-2 px-4 sm:rounded-lg sm:px-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="space-y-4">
              <p className="flex items-center gap-1 flex-wrap">
                {msg("pageExpiredMsg1")}{" "}
                <Button variant="link" className="h-auto p-0 text-blue-300 hover:text-blue-200" asChild>
                  <a href={url.loginRestartFlowUrl} id="loginRestartLink">{msg("doClickHere")}</a>
                </Button>
                .
              </p>
              <p className="flex items-center gap-1 flex-wrap">
                {msg("pageExpiredMsg2")}{" "}
                <Button variant="link" className="h-auto p-0 text-blue-300 hover:text-blue-200" asChild>
                  <a href={url.loginAction} id="loginContinueLink">{msg("doClickHere")}</a>
                </Button>
                .
              </p>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </Template>
  );
}
