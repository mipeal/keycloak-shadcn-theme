import type { JSX } from "keycloakify/tools/JSX";
import { useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type UpdateEmailProps = PageProps<Extract<KcContext, { pageId: "update-email.ftl" }>, I18n> & {
  UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
  doMakeUserConfirmPassword: boolean;
};

export default function UpdateEmail(props: UpdateEmailProps) {
  const { kcContext, i18n, Template, UserProfileFormFields, doMakeUserConfirmPassword } = props;

  const { msg, msgStr } = i18n;

  const [isFormSubmittable, setIsFormSubmittable] = useState(false);

  const { url, messagesPerField, isAppInitiatedAction } = kcContext;

  return (
    <Template {...props} displayMessage={messagesPerField.exists("global")} displayRequiredFields headerNode={msg("updateEmailTitle")}>
      <div className="w-full max-w-md">
        <div className="py-2 px-4 sm:rounded-lg sm:px-6">
          <form id="kc-update-email-form" className="space-y-6" action={url.loginAction} method="post">
            <UserProfileFormFields
              kcContext={kcContext}
              i18n={i18n}
              onIsFormSubmittableValueChange={setIsFormSubmittable}
              doMakeUserConfirmPassword={doMakeUserConfirmPassword}
              kcClsx={() => ""}
            />

            <div className="flex items-center space-x-2">
              <Checkbox id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true} />
              <Label htmlFor="logout-sessions" className="text-sm font-medium text-white/90">
                {msg("logoutOtherSessions")}
              </Label>
            </div>

            <div className="flex gap-4">
              <Button disabled={!isFormSubmittable} type="submit" className={isAppInitiatedAction ? "w-full" : "flex-1"}>
                {msgStr("doSubmit")}
              </Button>
              {isAppInitiatedAction && (
                <Button variant="outline" className="flex-1" type="submit" name="cancel-aia" value="true">
                  {msg("doCancel")}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Template>
  );
}
