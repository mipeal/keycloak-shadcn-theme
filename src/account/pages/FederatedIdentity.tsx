import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link2, Plus, X } from "lucide-react";

export default function FederatedIdentity(props: PageProps<Extract<KcContext, { pageId: "federatedIdentity.ftl" }>, I18n>) {
    const { kcContext, i18n, Template } = props;

    const { url, federatedIdentity, stateChecker } = kcContext;
    const { msg } = i18n;

    return (
        <Template {...props} active="social">
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">{msg("federatedIdentitiesHtmlTitle")}</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary to-info rounded-full" />
                </div>

                <div className="space-y-4">
                    {federatedIdentity.identities.map(identity => (
                        <Card key={identity.providerId}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-foreground">
                                    <Link2 className="h-5 w-5 text-foreground" />
                                    {identity.displayName}
                                </CardTitle>
                                <CardDescription>
                                    {identity.connected ? (
                                        <Badge variant="default" className="bg-green-700 text-white">
                                            Connected
                                        </Badge>
                                    ) : (
                                        <Badge variant="destructive" className="text-foreground">Not Connected</Badge>
                                    )}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor={identity.providerId} className="text-sm font-medium text-foreground">
                                        Username
                                    </Label>
                                    <Input
                                        id={identity.providerId}
                                        disabled
                                        value={identity.userName || "Not connected"}
                                        className="font-mono text-foreground"
                                    />
                                </div>

                                {identity.connected ? (
                                    federatedIdentity.removeLinkPossible && (
                                        <form action={url.socialUrl} method="post" className="inline">
                                            <input type="hidden" name="stateChecker" value={stateChecker} />
                                            <input type="hidden" name="action" value="remove" />
                                            <input type="hidden" name="providerId" value={identity.providerId} />
                                            <Button
                                                type="submit"
                                                variant="destructive"
                                                id={`remove-link-${identity.providerId}`}
                                                className="text-destructive-foreground"
                                            >
                                                <X className="h-4 w-4 mr-2" />
                                                {msg("doRemove")}
                                            </Button>
                                        </form>
                                    )
                                ) : (
                                    <form action={url.socialUrl} method="post" className="inline">
                                        <input type="hidden" name="stateChecker" value={stateChecker} />
                                        <input type="hidden" name="action" value="add" />
                                        <input type="hidden" name="providerId" value={identity.providerId} />
                                        <Button
                                            type="submit"
                                            id={`add-link-${identity.providerId}`}
                                            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            {msg("doAdd")}
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </Template>
    );
}
