"use client";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
const Bread = ({ href, text }: { href: string; text: string }) => {
  return (
    <Breadcrumbs size="lg" className="text-foreground">
      <BreadcrumbItem href={href}>{text}</BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default Bread;
