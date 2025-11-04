import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Account(props: PageProps<Extract<KcContext, { pageId: "account.ftl" }>, I18n>) {
  const { kcContext, i18n, Template } = props;

  const { url, realm, messagesPerField, stateChecker, account, referrer } = kcContext;
  const { msg } = i18n;

  return (
    <Template {...props} active="account">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{msg("editAccountHtmlTitle")}</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-info rounded-full" />
        </div>

        <div className="flex items-center justify-end mb-4">
          <span className="text-sm text-muted-foreground">
            <span className="text-destructive">*</span> {msg("requiredFields")}
          </span>
        </div>

        <form action={url.accountUrl} method="post" className="space-y-6">
          <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />

          {!realm.registrationEmailAsUsername && (
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                {msg("username")}
                {realm.editUsernameAllowed && <span className="text-destructive ml-1">*</span>}
              </Label>
              <Input
                type="text"
                id="username"
                name="username"
                disabled={!realm.editUsernameAllowed}
                defaultValue={account.username ?? ""}
                className={clsx(messagesPerField.existsError("username") && "border-destructive")}
                aria-invalid={messagesPerField.existsError("username")}
              />
              {messagesPerField.existsError("username") && (
                <p className="text-sm text-destructive" aria-live="polite">
                  {messagesPerField.get("username")}
                </p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              {msg("email")} <span className="text-destructive">*</span>
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              autoFocus
              defaultValue={account.email ?? ""}
              className={clsx(messagesPerField.existsError("email") && "border-destructive")}
              aria-invalid={messagesPerField.existsError("email")}
            />
            {messagesPerField.existsError("email") && (
              <p className="text-sm text-destructive" aria-live="polite">
                {messagesPerField.get("email")}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium">
              {msg("firstName")} <span className="text-destructive">*</span>
            </Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              defaultValue={account.firstName ?? ""}
              className={clsx(messagesPerField.existsError("firstName") && "border-destructive")}
              aria-invalid={messagesPerField.existsError("firstName")}
            />
            {messagesPerField.existsError("firstName") && (
              <p className="text-sm text-destructive" aria-live="polite">
                {messagesPerField.get("firstName")}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium">
              {msg("lastName")} <span className="text-destructive">*</span>
            </Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              defaultValue={account.lastName ?? ""}
              className={clsx(messagesPerField.existsError("lastName") && "border-destructive")}
              aria-invalid={messagesPerField.existsError("lastName")}
            />
            {messagesPerField.existsError("lastName") && (
              <p className="text-sm text-destructive" aria-live="polite">
                {messagesPerField.get("lastName")}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            {referrer !== undefined && (
              <Button variant="outline" asChild>
                <a href={referrer?.url}>{msg("backToApplication")}</a>
              </Button>
            )}
            <Button
              type="submit"
              name="submitAction"
              value="Cancel"
              variant="outline"
            >
              {msg("doCancel")}
            </Button>
            <Button
              type="submit"
              name="submitAction"
              value="Save"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              {msg("doSave")}
            </Button>
          </div>
        </form>
      </div>
    </Template>
  );
}
