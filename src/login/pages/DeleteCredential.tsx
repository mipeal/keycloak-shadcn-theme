import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext} from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function DeleteCredential(props: PageProps<Extract<KcContext, { pageId: "delete-credential.ftl" }>, I18n>) {
  const { kcContext, i18n, Template } = props;

  const { msgStr, msg } = i18n;

  const { url, credentialLabel } = kcContext;

  return (
    <Template {...props} displayMessage={false} headerNode={msg("deleteCredentialTitle", credentialLabel)}>
      <div className="w-full max-w-md">
        <div className="py-2 px-4 sm:rounded-lg sm:px-6">
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{msg("deleteCredentialMessage", credentialLabel)}</AlertDescription>
          </Alert>
          <form className="flex gap-4" action={url.loginAction} method="POST">
            <Button type="submit" name="accept" id="kc-accept" variant="destructive" className="flex-1">
              {msgStr("doConfirmDelete")}
            </Button>
            <Button type="submit" name="cancel-aia" id="kc-decline" variant="outline" className="flex-1">
              {msgStr("doCancel")}
            </Button>
          </form>
        </div>
      </div>
    </Template>
  );
}
