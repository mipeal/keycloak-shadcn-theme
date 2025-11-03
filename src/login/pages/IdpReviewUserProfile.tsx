import type { JSX } from "keycloakify/tools/JSX";
import { useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";

type IdpReviewUserProfileProps = PageProps<Extract<KcContext, { pageId: "idp-review-user-profile.ftl" }>, I18n> & {
  UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
  doMakeUserConfirmPassword: boolean;
};

export default function IdpReviewUserProfile(props: IdpReviewUserProfileProps) {
  const { kcContext, i18n, Template, UserProfileFormFields, doMakeUserConfirmPassword } = props;

  const { msg, msgStr } = i18n;

  const { url, messagesPerField } = kcContext;

  const [isFomSubmittable, setIsFomSubmittable] = useState(false);

  return (
    <Template {...props} displayMessage={messagesPerField.exists("global")} displayRequiredFields headerNode={msg("loginIdpReviewProfileTitle")}>
      <form id="kc-idp-review-profile-form" className="space-y-6" action={url.loginAction} method="post">
        <UserProfileFormFields
          kcContext={kcContext}
          i18n={i18n}
          onIsFormSubmittableValueChange={setIsFomSubmittable}
          kcClsx={() => ""}
          doMakeUserConfirmPassword={doMakeUserConfirmPassword}
        />
        <Button type="submit" disabled={!isFomSubmittable} className="w-full">
          {msgStr("doSubmit")}
        </Button>
      </form>
    </Template>
  );
}
