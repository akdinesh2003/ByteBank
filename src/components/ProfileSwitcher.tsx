
"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { profiles } from "@/lib/data";
import type { Profile } from "@/lib/types";
import { ChevronsUpDown } from "lucide-react";

export function ProfileSwitcher() {
  const [selectedProfile, setSelectedProfile] = useState<Profile>(profiles[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-auto items-center justify-start gap-2 px-2"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={selectedProfile.avatar}
              alt={selectedProfile.name}
              data-ai-hint="avatar"
            />
            <AvatarFallback>{selectedProfile.initials}</AvatarFallback>
          </Avatar>
          <div className="hidden flex-col items-start md:flex">
            <span className="font-medium">{selectedProfile.name}</span>
            <span className="text-xs text-muted-foreground">Profile</span>
          </div>
          <ChevronsUpDown className="ml-2 hidden h-4 w-4 text-muted-foreground md:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Switch Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {profiles.map((profile) => (
          <DropdownMenuItem
            key={profile.id}
            onSelect={() => setSelectedProfile(profile)}
          >
            <Avatar className="mr-2 h-6 w-6">
              <AvatarImage
                src={profile.avatar}
                alt={profile.name}
                data-ai-hint="avatar"
              />
              <AvatarFallback>{profile.initials}</AvatarFallback>
            </Avatar>
            {profile.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
