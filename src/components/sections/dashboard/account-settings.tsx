"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export function AccountSettings({
  userId,
  initialDisplayName,
  initialNotifyEmail,
}: {
  userId: string;
  initialDisplayName: string;
  initialNotifyEmail: boolean;
}) {
  const supabase = createClient();
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [notifyEmail, setNotifyEmail] = useState(initialNotifyEmail);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  const [newPassword, setNewPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  async function handleProfileSave(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setSavingProfile(true);
    setProfileError(null);
    setProfileSaved(false);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName, notify_email: notifyEmail })
      .eq("id", userId);
    setSavingProfile(false);
    if (error) {
      setProfileError(error.message);
      return;
    }
    setProfileSaved(true);
  }

  async function handlePasswordSave(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    setSavingPassword(true);
    setPasswordError(null);
    setPasswordSaved(false);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSavingPassword(false);
    if (error) {
      setPasswordError(error.message);
      return;
    }
    setNewPassword("");
    setPasswordSaved(true);
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Card className="p-6">
        <h3 className="font-display text-xl text-white">Profile</h3>
        <form onSubmit={handleProfileSave} className="mt-4 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-text-secondary">
            <input
              type="checkbox"
              checked={notifyEmail}
              onChange={(e) => setNotifyEmail(e.target.checked)}
              className="h-4 w-4 rounded border-border bg-surface accent-drip-500"
            />
            Email me about new features and events
          </label>
          {profileError && <p className="text-xs text-red-400">{profileError}</p>}
          {profileSaved && <p className="text-xs text-drip-500">Saved.</p>}
          <Button type="submit" size="sm" disabled={savingProfile}>
            {savingProfile ? "Saving..." : "Save Profile"}
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="font-display text-xl text-white">Password</h3>
        <form onSubmit={handlePasswordSave} className="mt-4 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          {passwordError && <p className="text-xs text-red-400">{passwordError}</p>}
          {passwordSaved && <p className="text-xs text-drip-500">Password updated.</p>}
          <Button type="submit" size="sm" disabled={savingPassword}>
            {savingPassword ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
