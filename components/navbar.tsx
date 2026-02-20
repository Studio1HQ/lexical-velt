"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import { Menu, PenTool, BookOpen, Users, Settings, TrendingUp, X, Sparkles } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Write', icon: PenTool, description: 'Create new content' },
    { name: 'Articles', icon: BookOpen, description: 'Browse all posts' },
    { name: 'Community', icon: Users, description: 'Connect with writers' },
    { name: 'Analytics', icon: TrendingUp, description: 'View your stats' },
    { name: 'Settings', icon: Settings, description: 'Manage preferences' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
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
              Professional Writing Platform
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
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

        <div className="flex items-center space-x-3">
          <Button 
            variant="default" 
            size="sm" 
            className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-200"
          >
            <PenTool className="h-4 w-4" />
            <span>New Post</span>
          </Button>
          <ThemeToggle />
          
          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="relative">
                <Menu className={`h-5 w-5 transition-all duration-200 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
                <X className={`absolute h-5 w-5 transition-all duration-200 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
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
                      <p className="text-xs text-muted-foreground">Professional Writing</p>
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
                  <div
                    key={item.name}
                    className="group cursor-pointer"
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start space-x-3 h-12 group-hover:bg-accent/50 transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-5 w-5 group-hover:text-primary transition-colors" />
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </div>
                    </Button>
                  </div>
                ))}
                </div>

                {/* Mobile Footer */}
                <div className="p-6 border-t bg-muted/20">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Theme
                    </div>
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