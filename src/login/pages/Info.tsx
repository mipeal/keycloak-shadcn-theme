import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";

export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
  const { kcContext, i18n, Template } = props;
  const { advancedMsgStr, msg } = i18n;
  const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;

  return (
    <Template
      {...props}
      displayMessage={false}
      headerNode={
        <span
          dangerouslySetInnerHTML={{
            __html: kcSanitize(messageHeader ?? message.summary)
          }}
        />
      }
    >
      <div className="w-full max-w-md">
        <div className="py-2 px-4 sm:rounded-lg sm:px-6">
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription
              className="space-y-4"
              dangerouslySetInnerHTML={{
                __html: kcSanitize(
                  (() => {
                    let html = message.summary;

                    if (requiredActions) {
                      html += " <strong class='font-medium'>";
                      html += requiredActions.map((requiredAction) => advancedMsgStr(`requiredAction.${requiredAction}`)).join(", ");
                      html += "</strong>";
                    }

                    return html;
                  })()
                )
              }}
            />
          </Alert>

          {!skipLink && (
            <div className="mt-6 flex flex-col gap-3">
              {pageRedirectUri && (
                <Button variant="link" className="h-auto p-0 text-blue-300 hover:text-blue-200" asChild>
                  <a href={pageRedirectUri}>{msg("backToApplication")}</a>
                </Button>
              )}
              {actionUri && (
                <Button variant="link" className="h-auto p-0 text-blue-300 hover:text-blue-200" asChild>
                  <a href={actionUri}>{msg("proceedWithAction")}</a>
                </Button>
              )}
              {client.baseUrl && !pageRedirectUri && !actionUri && (
                <Button variant="link" className="h-auto p-0 text-blue-300 hover:text-blue-200" asChild>
                  <a href={client.baseUrl}>{msg("backToApplication")}</a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Template>
  );
}
