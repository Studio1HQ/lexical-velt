"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Menu,
  PenTool,
  BookOpen,
  Users,
  Settings,
  TrendingUp,
  X,
  Sparkles,
} from "lucide-react";
import { predefinedUser, useAppUser } from "@/app/userAuth/useAppUser";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VeltNotificationsTool, VeltPresence, VeltSidebarButton } from "@veltdev/react";
import { useTheme } from "next-themes";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppUser();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { theme } = useTheme()
  const handleUserSwitch = (userId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("user", userId);
    router.push(`${pathname}?${params.toString()}`);
  };

  const navItems = [
    { name: "Write", icon: PenTool, description: "Create new content" },
    { name: "Articles", icon: BookOpen, description: "Browse all posts" },
    { name: "Community", icon: Users, description: "Connect with writers" },
    { name: "Analytics", icon: TrendingUp, description: "View your stats" },
    { name: "Settings", icon: Settings, description: "Manage preferences" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <PenTool className="h-7 w-7 text-primary" />
            <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
              WriteFlow
            </span>
            <span className="text-xs text-muted-foreground hidden sm:block">
              Collaborative Rich Editor
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-accent/50 transition-all duration-200 hover:scale-105 group"
            >
              <item.icon className="h-4 w-4 group-hover:text-primary transition-colors" />
              <span className="font-medium">{item.name}</span>
            </Button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-3">
            {/* hide in the mobile view */}
            <div className="hidden lg:flex items-center gap-2">
              <VeltPresence/>
              <VeltNotificationsTool darkMode={theme === "dark"} />
            </div>
            <VeltSidebarButton darkMode={theme === "dark"} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-primary/20 hover:border-primary/50 transition-colors"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user?.photoUrl} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="max-w-[80px] truncate hidden sm:inline-block font-medium">
                    {user?.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Switch User (Demo)</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {predefinedUser.map((currentUser, index) => (
                  <DropdownMenuItem
                    key={currentUser.userId}
                    onClick={() => handleUserSwitch(currentUser.userId)}
                    className="flex items-center space-x-3 p-3 cursor-pointer hover:!bg-gray-100 dark:hover:!bg-gray-700"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={currentUser.photoUrl}
                        alt={currentUser.name}
                      />
                      <AvatarFallback className="text-xs">
                        {currentUser.name}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-white/70">
                        {currentUser.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-white/60">
                        {currentUser.email}
                      </div>
                    </div>
                    {user?.userId === currentUser.userId && (
                      <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="relative">
                <Menu
                  className={`h-5 w-5 transition-all duration-200 ${isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
                />
                <X
                  className={`absolute h-5 w-5 transition-all duration-200 ${isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}
                />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] p-0">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <PenTool className="h-6 w-6 text-primary" />
                      <Sparkles className="absolute -top-1 -right-1 h-2.5 w-2.5 text-yellow-500 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-lg font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
                        WriteFlow
                      </span>
                      <p className="text-xs text-muted-foreground">
                        Professional Writing
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Navigation Items */}
                <div className="flex flex-col space-y-2 p-6 flex-1">
                  <Button
                    variant="default"
                    className="w-full justify-start space-x-3 h-12 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 mb-4"
                    onClick={() => setIsOpen(false)}
                  >
                    <PenTool className="h-5 w-5" />
                    <span className="font-medium">New Post</span>
                  </Button>

                  {navItems.map((item) => (
                    <div key={item.name} className="group cursor-pointer">
                      <Button
                        variant="ghost"
                        className="w-full justify-start space-x-3 h-12 group-hover:bg-accent/50 transition-all duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-5 w-5 group-hover:text-primary transition-colors" />
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        </div>
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Mobile Footer */}
                <div className="p-6 border-t bg-muted/20">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Theme</div>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
