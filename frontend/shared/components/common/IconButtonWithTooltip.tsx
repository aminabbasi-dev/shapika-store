// components/common/IconButtonWithTooltip.tsx
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

interface Props {
  icon: ReactNode;
  tooltip: string;
  onClick?: () => void;
  className?: string;
  "aria-label"?: string;
}

export default function IconButtonWithTooltip({
  icon,
  tooltip,
  onClick,
  className,
  "aria-label": ariaLabel,
}: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClick}
          className={cn(
            "transition-colors",
            "hover:bg-accent hover:text-accent-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className,
          )}
          aria-label={ariaLabel || tooltip}
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
