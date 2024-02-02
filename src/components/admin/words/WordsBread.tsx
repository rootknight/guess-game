"use client";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
const Bread = ({ href, text }: { href: string; text: string }) => {
  return (
    <Breadcrumbs size="lg">
      <BreadcrumbItem href={href}>{text}</BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default Bread;
