"use client";

import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, Eye, Heart, MessageCircle, Share2, Save } from 'lucide-react';
import { VeltProvider } from '@veltdev/react';
import { useAppUser } from "@/app/userAuth/useAppUser";
import { useVeltAuthProvider } from '@/components/velt/VeltInitializeUser';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const LexicalEditor = dynamic(() => import('@/components/editor/lexical-editor').then(mod => mod.LexicalEditor), { ssr: false });
const VeltCollaboration = dynamic(() => import('@/components/velt/VeltCollaboration').then(mod => mod.VeltCollaboration), { ssr: false });


const VELT_API_KEY = process.env.NEXT_PUBLIC_VELT_API_KEY!;

function HomeContent() {
  const { authProvider } = useVeltAuthProvider();
  const { user } = useAppUser();

  return (
    <VeltProvider apiKey={VELT_API_KEY} authProvider={authProvider}>
      <VeltCollaboration />
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Create Your Next Story
              </h1>
              <p className="text-muted-foreground text-lg">
                Express your thoughts with our advanced rich text editor
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Editor Section */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Article Editor</CardTitle>
                        <CardDescription>
                          Write your article with rich formatting options
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Save className="h-4 w-4 mr-2" />
                          Save Draft
                        </Button>
                        <Button size="sm">
                          Publish
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <LexicalEditor />
                  </CardContent>
                </Card>

                {/* Article Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Article Settings</CardTitle>
                    <CardDescription>
                      Configure your article settings and metadata
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Tags</label>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary">Technology</Badge>
                        <Badge variant="secondary">Writing</Badge>
                        <Badge variant="secondary">Tips</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Category</label>
                        <p className="text-sm text-muted-foreground">Tech Blog</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Reading Time</label>
                        <p className="text-sm text-muted-foreground">5 min read</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Stats Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Writing Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Words</span>
                      </div>
                      <span className="font-medium">1,247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Characters</span>
                      </div>
                      <span className="font-medium">6,890</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Paragraphs</span>
                      </div>
                      <span className="font-medium">12</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Author Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Author</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user?.photoUrl} />
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">Senior Writer</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Articles */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Articles</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      'Getting Started with React',
                      'Modern CSS Techniques',
                      'JavaScript Best Practices'
                    ].map((title, index) => (
                      <div key={index} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                        <h4 className="font-medium text-sm mb-1">{title}</h4>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>2 days ago</span>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              24
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              8
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </VeltProvider>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}