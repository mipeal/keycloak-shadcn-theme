import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
  const { kcContext, i18n, Template } = props;
  const { message, client, skipLink } = kcContext;
  const { msg } = i18n;

  return (
    <Template {...props} displayMessage={false} headerNode={msg("errorTitle")}>
      <div className="w-full max-w-md">
        <div className="py-2 px-4 sm:rounded-lg sm:px-6">
          <Alert variant="destructive">
            <CircleX className="h-4 w-4" />
            <AlertDescription
              dangerouslySetInnerHTML={{
                __html: kcSanitize(message.summary)
              }}
            />
          </Alert>
          {!skipLink && client?.baseUrl && (
            <div className="mt-6 text-center">
              <Button variant="link" className="h-auto p-0 text-blue-300 hover:text-blue-200" asChild>
                <a id="backToApplication" href={client.baseUrl}>{msg("backToApplication")}</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Template>
  );
}
