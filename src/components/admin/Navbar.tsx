"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link, Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signout } from "@/lib/actions/authenticate";

export default function Nav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBlurred
      isBordered
    >
      <NavbarBrand>
        <p className="font-bold text-inherit">GUSSGAME</p>
        <Button isIconOnly as={Link} href="/" target="_blank" variant="light">
          🎲
        </Button>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathname === "/admin/words"}>
          <Link
            color={pathname === "/admin/words" ? "primary" : "foreground"}
            href="/admin/words"
          >
            词组管理
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/admin/rooms"}>
          <Link
            color={pathname === "/admin/rooms" ? "primary" : "foreground"}
            href="/admin/rooms"
          >
            房间管理
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/admin/users"}>
          <Link
            color={pathname === "/admin/users" ? "primary" : "foreground"}
            href="/admin/users"
          >
            用户管理
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="invisible sm:visible">
        <NavbarItem>
          <Button color="primary" onPress={() => signout()} variant="flat">
            注销
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarMenu>
        <NavbarMenuItem key="words">
          <Link
            onPress={() => {
              setIsMenuOpen(false);
            }}
            color={pathname === "/admin/words" ? "primary" : "foreground"}
            className="w-full"
            href="/admin/words"
            size="lg"
          >
            词组管理
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="rooms">
          <Link
            onPress={() => {
              setIsMenuOpen(false);
            }}
            color={pathname === "/admin/rooms" ? "primary" : "foreground"}
            className="w-full"
            href="/admin/rooms"
            size="lg"
          >
            房间管理
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="users">
          <Link
            onPress={() => {
              setIsMenuOpen(false);
            }}
            color={pathname === "/admin/users" ? "primary" : "foreground"}
            className="w-full"
            href="/admin/users"
            size="lg"
          >
            用户管理
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="signout">
          <Link
            onPress={() => {
              setIsMenuOpen(false);
              signout();
            }}
            color="foreground"
            className="w-full"
            href="/admin/login"
            size="lg"
          >
            注销
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
