"use client";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
const Bread = ({ href, text }: { href: string; text: string }) => {
  return (
    <Breadcrumbs size="lg">
      <BreadcrumbItem href="/admin/words">词组管理</BreadcrumbItem>
      <BreadcrumbItem href={href}>{text}</BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default Bread;
