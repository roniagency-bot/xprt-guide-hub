import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { GHL_FORMS, ghlFormUrl, type GhlFormKey } from "@/lib/ghl-forms";

type GhlFormButtonProps = {
  form: GhlFormKey;
  children: ReactNode;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  asChild?: ButtonProps["asChild"];
  successMessage?: string;
};

function FormIframe({
  form,
  pathname,
  onSubmitted,
}: {
  form: GhlFormKey;
  pathname: string;
  onSubmitted: () => void;
}) {
  const cfg = GHL_FORMS[form];
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      // GHL widget messages come from leadconnectorhq / xprtinsurance subdomain.
      const origin = event.origin || "";
      if (
        !origin.includes("leadconnectorhq.com") &&
        !origin.includes("xprtinsurance.com")
      ) {
        return;
      }
      const data = event.data;
      // Height resize messages
      if (data && typeof data === "object") {
        const maybeHeight =
          (data as { height?: number; payload?: { height?: number } }).height ??
          (data as { payload?: { height?: number } }).payload?.height;
        if (typeof maybeHeight === "number" && iframeRef.current) {
          iframeRef.current.style.height = `${Math.max(maybeHeight, 480)}px`;
        }
        const type =
          (data as { type?: string }).type ??
          (data as { event?: string }).event ??
          "";
        if (
          typeof type === "string" &&
          (type.includes("form_submission") || type === "FORM_SUBMITTED" || type === "form:submitted")
        ) {
          onSubmitted();
        }
      } else if (typeof data === "string") {
        // Some GHL widgets post string events like "form_height_580"
        const m = data.match(/form_height[:_-]?(\d+)/i);
        if (m && iframeRef.current) {
          iframeRef.current.style.height = `${Math.max(parseInt(m[1], 10), 480)}px`;
        }
        if (/form_submission|form_submitted/i.test(data)) {
          onSubmitted();
        }
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onSubmitted]);

  return (
    <div className="relative w-full">
      {!loaded && (
        <div className="grid h-[480px] w-full place-items-center text-sm text-muted-foreground">
          Loading form…
        </div>
      )}
      <iframe
        ref={iframeRef}
        title={cfg.title}
        src={ghlFormUrl(form, pathname)}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="block w-full"
        style={{ height: loaded ? 640 : 0, border: 0 }}
      />
    </div>
  );
}

export function GhlFormButton({
  form,
  children,
  variant,
  size,
  className,
  asChild,
  successMessage = "Thanks — we received your submission.",
}: GhlFormButtonProps) {
  const cfg = GHL_FORMS[form];
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  const handleSubmitted = () => {
    toast.success(successMessage);
    setOpen(false);
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant={variant} size={size} className={className} asChild={asChild}>
            {children}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[92vh]">
          <DrawerHeader>
            <DrawerTitle>{cfg.title}</DrawerTitle>
            <DrawerDescription>{cfg.description}</DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-2 pb-6">
            {open && (
              <FormIframe form={form} pathname={location.pathname} onSubmitted={handleSubmitted} />
            )}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className} asChild={asChild}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{cfg.title}</DialogTitle>
          <DialogDescription>{cfg.description}</DialogDescription>
        </DialogHeader>
        {open && (
          <FormIframe form={form} pathname={location.pathname} onSubmitted={handleSubmitted} />
        )}
      </DialogContent>
    </Dialog>
  );
}
