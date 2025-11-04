import { useState, useReducer, useEffect } from "react";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function Password(props: PageProps<Extract<KcContext, { pageId: "password.ftl" }>, I18n>) {
  const { kcContext, i18n, Template } = props;

  const { url, password, account, stateChecker } = kcContext;
  const { msgStr, msg } = i18n;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [newPasswordConfirmError, setNewPasswordConfirmError] = useState("");
  const [hasNewPasswordBlurred, setHasNewPasswordBlurred] = useState(false);
  const [hasNewPasswordConfirmBlurred, setHasNewPasswordConfirmBlurred] = useState(false);

  const [isCurrentPasswordRevealed, toggleCurrentPasswordRevealed] = useReducer((state: boolean) => !state, false);
  const [isNewPasswordRevealed, toggleNewPasswordRevealed] = useReducer((state: boolean) => !state, false);
  const [isNewPasswordConfirmRevealed, toggleNewPasswordConfirmRevealed] = useReducer((state: boolean) => !state, false);

  useEffect(() => {
    const currentPasswordInput = document.getElementById("password");
    if (currentPasswordInput instanceof HTMLInputElement) {
      currentPasswordInput.type = isCurrentPasswordRevealed ? "text" : "password";
    }
  }, [isCurrentPasswordRevealed]);

  useEffect(() => {
    const newPasswordInput = document.getElementById("password-new");
    if (newPasswordInput instanceof HTMLInputElement) {
      newPasswordInput.type = isNewPasswordRevealed ? "text" : "password";
    }
  }, [isNewPasswordRevealed]);

  useEffect(() => {
    const newPasswordConfirmInput = document.getElementById("password-confirm");
    if (newPasswordConfirmInput instanceof HTMLInputElement) {
      newPasswordConfirmInput.type = isNewPasswordConfirmRevealed ? "text" : "password";
    }
  }, [isNewPasswordConfirmRevealed]);

  const checkNewPassword = (newPassword: string) => {
    if (!password.passwordSet) {
      return;
    }

    if (newPassword === currentPassword) {
      setNewPasswordError(msgStr("newPasswordSameAsOld"));
    } else {
      setNewPasswordError("");
    }
  };

  const checkNewPasswordConfirm = (newPasswordConfirm: string) => {
    if (newPasswordConfirm === "") {
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      setNewPasswordConfirmError(msgStr("passwordConfirmNotMatch"));
    } else {
      setNewPasswordConfirmError("");
    }
  };

  return (
    <Template
      {...{
        kcContext: {
          ...kcContext,
          message: (() => {
            if (newPasswordError !== "") {
              return {
                type: "error",
                summary: newPasswordError
              };
            }

            if (newPasswordConfirmError !== "") {
              return {
                type: "error",
                summary: newPasswordConfirmError
              };
            }

            return kcContext.message;
          })()
        },
        i18n,
        doUseDefaultCss: props.doUseDefaultCss,
        classes: props.classes
      }}
      active="password"
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{msg("changePasswordHtmlTitle")}</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-info rounded-full" />
        </div>

        <div className="flex items-center justify-end mb-4">
          <span className="text-sm text-muted-foreground">{msg("allFieldsRequired")}</span>
        </div>

        <form action={url.passwordUrl} method="post" className="space-y-6">
          <input
            type="text"
            id="username"
            name="username"
            value={account.username ?? ""}
            autoComplete="username"
            readOnly
            style={{ display: "none" }}
          />

          {password.passwordSet && (
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                {msg("password")}
              </Label>
              <div className="relative">
                <Input
                  type="password"
                  id="password"
                  name="password"
                  autoFocus
                  autoComplete="current-password"
                  value={currentPassword}
                  onChange={event => setCurrentPassword(event.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-accent transition-colors duration-200"
                  onClick={toggleCurrentPasswordRevealed}
                  aria-label={isCurrentPasswordRevealed ? "Hide password" : "Show password"}
                  aria-controls="password"
                >
                  {isCurrentPasswordRevealed ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                </Button>
              </div>
            </div>
          )}

          <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />

          <div className="space-y-2">
            <Label htmlFor="password-new" className="text-sm font-medium">
              {msg("passwordNew")}
            </Label>
            <div className="relative">
              <Input
                type="password"
                id="password-new"
                name="password-new"
                autoComplete="new-password"
                value={newPassword}
                onChange={event => {
                  const newPassword = event.target.value;
                  setNewPassword(newPassword);
                  if (hasNewPasswordBlurred) {
                    checkNewPassword(newPassword);
                  }
                }}
                onBlur={() => {
                  setHasNewPasswordBlurred(true);
                  checkNewPassword(newPassword);
                }}
                className={newPasswordError ? "border-destructive" : ""}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-accent transition-colors duration-200"
                onClick={toggleNewPasswordRevealed}
                aria-label={isNewPasswordRevealed ? "Hide password" : "Show password"}
                aria-controls="password-new"
              >
                {isNewPasswordRevealed ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
              </Button>
            </div>
            {newPasswordError && (
              <p className="text-sm text-destructive" aria-live="polite">
                {newPasswordError}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password-confirm" className="text-sm font-medium">
              {msg("passwordConfirm")}
            </Label>
            <div className="relative">
              <Input
                type="password"
                id="password-confirm"
                name="password-confirm"
                autoComplete="new-password"
                value={newPasswordConfirm}
                onChange={event => {
                  const newPasswordConfirm = event.target.value;
                  setNewPasswordConfirm(newPasswordConfirm);
                  if (hasNewPasswordConfirmBlurred) {
                    checkNewPasswordConfirm(newPasswordConfirm);
                  }
                }}
                onBlur={() => {
                  setHasNewPasswordConfirmBlurred(true);
                  checkNewPasswordConfirm(newPasswordConfirm);
                }}
                className={newPasswordConfirmError ? "border-destructive" : ""}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-accent transition-colors duration-200"
                onClick={toggleNewPasswordConfirmRevealed}
                aria-label={isNewPasswordConfirmRevealed ? "Hide password" : "Show password"}
                aria-controls="password-confirm"
              >
                {isNewPasswordConfirmRevealed ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
              </Button>
            </div>
            {newPasswordConfirmError && (
              <p className="text-sm text-destructive" aria-live="polite">
                {newPasswordConfirmError}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <Button
              disabled={newPasswordError !== "" || newPasswordConfirmError !== ""}
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
