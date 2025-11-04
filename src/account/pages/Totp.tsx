import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2, QrCode } from "lucide-react";

export default function Totp(props: PageProps<Extract<KcContext, { pageId: "totp.ftl" }>, I18n>) {
    const { kcContext, i18n, Template } = props;

    const { totp, mode, url, messagesPerField, stateChecker } = kcContext;
    const { msg, msgStr, advancedMsg } = i18n;

    return (
        <Template {...props} active="totp">
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">{msg("authenticatorTitle")}</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary to-info rounded-full" />
                </div>

                {totp.otpCredentials.length === 0 && (
                    <div className="flex items-center justify-end mb-4">
                        <span className="text-sm text-muted-foreground">
                            <span className="text-destructive">*</span> {msg("requiredFields")}
                        </span>
                    </div>
                )}

                {totp.enabled && totp.otpCredentials.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>{msg("configureAuthenticators")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-lg border border-border/50 overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted/30 border-b border-border/30">
                                            <TableHead className="py-3 px-10 font-semibold text-foreground">{msg("mobile")}</TableHead>
                                            {totp.otpCredentials.length > 1 && <TableHead className="py-3 px-6 font-semibold text-foreground">ID</TableHead>}
                                            <TableHead className="py-3 px-6 font-semibold text-foreground">{msg("totpDeviceName")}</TableHead>
                                            <TableHead className="text-right py-3 px-6 font-semibold text-foreground">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {totp.otpCredentials.map((credential, index) => (
                                            <TableRow key={index} className="hover:bg-accent/30 transition-colors">
                                                <TableCell className="py-4 px-6 text-foreground">
                                                    <Badge variant="secondary" className="text-foreground">{msg("mobile")}</Badge>
                                                </TableCell>
                                                {totp.otpCredentials.length > 1 && (
                                                    <TableCell className="font-mono text-sm py-4 px-6 text-foreground">{credential.id}</TableCell>
                                                )}
                                                <TableCell className="py-4 px-6 text-foreground font-medium">{credential.userLabel || <span className="text-muted-foreground italic">Unnamed device</span>}</TableCell>
                                                <TableCell className="text-right py-4 px-6 text-foreground">
                                                    <form action={url.totpUrl} method="post" className="inline-flex items-center">
                                                        <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />
                                                        <input type="hidden" id="submitAction" name="submitAction" value="Delete" />
                                                        <input type="hidden" id="credentialId" name="credentialId" value={credential.id} />
                                                        <Button
                                                            type="submit"
                                                            variant="destructive"
                                                            size="icon"
                                                            id={`remove-mobile-${index}`}
                                                            aria-label="Delete authenticator"
                                                            className="text-destructive-foreground"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </form>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {!totp.enabled && (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>{msg("totpStep1")}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside space-y-2 text-sm text-foreground">
                                    {totp.supportedApplications?.map(app => (
                                        <li key={app} className="text-foreground">{advancedMsg(app)}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {mode && mode == "manual" ? (
                            <Card>
                                <CardHeader>
                                    <CardTitle>{msg("totpManualStep2")}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label className="text-sm font-medium text-foreground mb-2 block">Secret Key</Label>
                                        <div className="p-4 bg-muted rounded-lg font-mono text-sm break-all text-foreground border border-border">
                                            {totp.totpSecretEncoded}
                                        </div>
                                    </div>
                                    <Button variant="outline" asChild className="text-foreground hover:text-foreground">
                                        <a href={totp.qrUrl} id="mode-barcode" className="flex items-center">
                                            <QrCode className="h-4 w-4 mr-2" />
                                            {msg("totpScanBarcode")}
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card>
                                <CardHeader>
                                    <CardTitle>{msg("totpStep2")}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-center">
                                        <img
                                            id="kc-totp-secret-qr-code"
                                            src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
                                            alt="QR Code"
                                            className="border border-border rounded-lg shadow-sm"
                                        />
                                    </div>
                                    <Button variant="outline" asChild className="text-foreground hover:text-foreground">
                                        <a href={totp.manualUrl} id="mode-manual">
                                            {msg("totpUnableToScan")}
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {(mode && mode == "manual") && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>{msg("totpManualStep3")}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside space-y-2 text-sm text-foreground">
                                        <li id="kc-totp-type" className="text-foreground">
                                            <span className="font-medium">{msg("totpType")}:</span> {msg(`totp.${totp.policy.type}`)}
                                        </li>
                                        <li id="kc-totp-algorithm" className="text-foreground">
                                            <span className="font-medium">{msg("totpAlgorithm")}:</span> {totp.policy.getAlgorithmKey()}
                                        </li>
                                        <li id="kc-totp-digits" className="text-foreground">
                                            <span className="font-medium">{msg("totpDigits")}:</span> {totp.policy.digits}
                                        </li>
                                        {totp.policy.type === "totp" ? (
                                            <li id="kc-totp-period" className="text-foreground">
                                                <span className="font-medium">{msg("totpInterval")}:</span> {totp.policy.period}
                                            </li>
                                        ) : (
                                            <li id="kc-totp-counter" className="text-foreground">
                                                <span className="font-medium">{msg("totpCounter")}:</span> {totp.policy.initialCounter}
                                            </li>
                                        )}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader>
                                <CardTitle>{msg("totpStep3")}</CardTitle>
                                <CardDescription>{msg("totpStep3DeviceName")}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form action={url.totpUrl} id="kc-totp-settings-form" method="post" className="space-y-6">
                                    <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />

                                    <div className="space-y-2">
                                        <Label htmlFor="totp" className="text-sm font-medium text-foreground">
                                            {msg("authenticatorCode")} <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            type="text"
                                            id="totp"
                                            name="totp"
                                            autoComplete="off"
                                            className={messagesPerField.existsError("totp") ? "border-destructive" : ""}
                                            aria-invalid={messagesPerField.existsError("totp")}
                                        />
                                        {messagesPerField.existsError("totp") && (
                                            <p className="text-sm text-destructive" id="input-error-otp-code" aria-live="polite">
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: kcSanitize(messagesPerField.get("totp"))
                                                    }}
                                                />
                                            </p>
                                        )}
                                    </div>

                                    <input type="hidden" id="totpSecret" name="totpSecret" value={totp.totpSecret} />
                                    {mode && <input type="hidden" id="mode" value={mode} />}

                                    <div className="space-y-2">
                                        <Label htmlFor="userLabel" className="text-sm font-medium text-foreground">
                                            {msg("totpDeviceName")}
                                            {totp.otpCredentials.length >= 1 && <span className="text-destructive ml-1">*</span>}
                                        </Label>
                                        <Input
                                            type="text"
                                            id="userLabel"
                                            name="userLabel"
                                            autoComplete="off"
                                            className={messagesPerField.existsError("userLabel") ? "border-destructive" : ""}
                                            aria-invalid={messagesPerField.existsError("userLabel")}
                                        />
                                        {messagesPerField.existsError("userLabel") && (
                                            <p className="text-sm text-destructive" id="input-error-otp-label" aria-live="polite">
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: kcSanitize(messagesPerField.get("userLabel"))
                                                    }}
                                                />
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                                        <Button
                                            type="submit"
                                            id="cancelTOTPBtn"
                                            name="submitAction"
                                            value="Cancel"
                                            variant="outline"
                                            className="text-foreground hover:text-foreground"
                                        >
                                            {msg("doCancel")}
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                                            id="saveTOTPBtn"
                                            value={msgStr("doSave")}
                                        >
                                            {msg("doSave")}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </Template>
    );
}
