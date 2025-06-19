import React from 'react';
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AuthFormCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  actions: React.ReactNode;
  footerLinks?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  footerClassName?: string;
  headerClassName?: string;
}

const AuthFormCard: React.FC<AuthFormCardProps> = ({
  title,
  description,
  icon,
  children,
  actions,
  footerLinks,
  className,
  contentClassName,
  footerClassName,
  headerClassName,
}) => {
  console.log('AuthFormCard loaded for title:', title);

  return (
    <Card className={cn("w-full max-w-md shadow-lg", className)}>
      <CardHeader className={cn("text-center", headerClassName)}>
        {icon && <div className="mb-4 flex justify-center">{icon}</div>}
        <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
        {description && (
          <CardDescription className="mt-1 text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className={cn("grid gap-4", contentClassName)}>
        {children}
      </CardContent>
      <CardFooter className={cn("flex flex-col items-stretch gap-4 pt-6", footerClassName)}>
        <div className="w-full">
          {actions}
        </div>
        {footerLinks && (
          <div className="mt-2 text-center text-sm text-muted-foreground">
            {footerLinks}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default AuthFormCard;