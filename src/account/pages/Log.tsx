import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

export default function Log(props: PageProps<Extract<KcContext, { pageId: "log.ftl" }>, I18n>) {
    const { kcContext, i18n, Template } = props;

    const { log } = kcContext;
    const { msg } = i18n;

    return (
        <Template {...props} active="log">
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">{msg("accountLogHtmlTitle")}</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary to-info rounded-full" />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-foreground">
                            <FileText className="h-5 w-5 text-foreground" />
                            Event Log
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-lg border border-border/50 overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30 border-b border-border/30">
                                        <TableHead className="py-3 px-6 font-semibold text-foreground">{msg("date")}</TableHead>
                                        <TableHead className="py-3 px-6 font-semibold text-foreground">{msg("event")}</TableHead>
                                        <TableHead className="py-3 px-6 font-semibold text-foreground">IP Address</TableHead>
                                        <TableHead className="py-3 px-6 font-semibold text-foreground">{msg("client")}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {log && log.events && log.events.length > 0 ? (
                                        log.events.map((event: any, index: number) => (
                                            <TableRow key={index} className="hover:bg-accent/30 transition-colors">
                                                <TableCell className="py-4 px-6 text-foreground">{event.date}</TableCell>
                                                <TableCell className="py-4 px-6 text-foreground">
                                                    <Badge variant="secondary" className="text-foreground">{event.event}</Badge>
                                                </TableCell>
                                                <TableCell className="font-mono text-sm py-4 px-6 text-foreground">{event.ipAddress}</TableCell>
                                                <TableCell className="py-4 px-6 text-foreground">{event.client || "-"}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center text-muted-foreground py-8 px-6">
                                                No events found
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Template>
    );
}