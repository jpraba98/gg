"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArticleManager } from "@/components/sections/staff/article-manager";
import { CommentModerator } from "@/components/sections/staff/comment-moderator";
import { MediaManager } from "@/components/sections/staff/media-manager";
import { ApplicationViewer } from "@/components/sections/staff/application-viewer";
import { UserManager } from "@/components/sections/staff/user-manager";

export function StaffDashboardTabs({
  userId,
  isAdmin,
}: {
  userId: string;
  isAdmin: boolean;
}) {
  return (
    <Tabs defaultValue="articles">
      <TabsList className="flex-wrap justify-start">
        <TabsTrigger value="articles">Articles</TabsTrigger>
        <TabsTrigger value="comments">Comments</TabsTrigger>
        <TabsTrigger value="media">Media</TabsTrigger>
        <TabsTrigger value="applications">Applications</TabsTrigger>
        {isAdmin && <TabsTrigger value="users">Users</TabsTrigger>}
      </TabsList>

      <TabsContent value="articles">
        <ArticleManager userId={userId} />
      </TabsContent>
      <TabsContent value="comments">
        <CommentModerator />
      </TabsContent>
      <TabsContent value="media">
        <MediaManager />
      </TabsContent>
      <TabsContent value="applications">
        <ApplicationViewer />
      </TabsContent>
      {isAdmin && (
        <TabsContent value="users">
          <UserManager currentUserId={userId} />
        </TabsContent>
      )}
    </Tabs>
  );
}
