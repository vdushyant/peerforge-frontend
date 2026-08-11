import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import type { Profile } from "../types";

interface ProfileHeaderProps {
  profile: Profile;
  isEditing: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onSave: () => void;
}

export default function ProfileHeader({
  profile,
  isEditing,
  isSaving,
  onEdit,
  onSave,
}: ProfileHeaderProps) {
  const initials =
    `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase();

  return (
    <div className="rounded-xl border border-white/10 bg-card p-6">

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-5">

          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-xl font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">

            <h2 className="text-2xl font-bold">
              {profile.firstName} {profile.lastName}
            </h2>

            <p className="text-muted-foreground">
              {profile.headline ?? "Add a professional headline"}
            </p>

            <p className="text-sm text-muted-foreground">
              {profile.email}
            </p>

            <div className="mt-2 flex gap-2">

              {profile.roles.map((role) => (
                <span
                  key={role}
                  className="rounded-full bg-violet-600/20 px-3 py-1 text-xs font-medium text-violet-400"
                >
                  {role}
                </span>
              ))}

            </div>

          </div>

        </div>

        {!isEditing ? (

          <Button onClick={onEdit}>
            Edit Profile
          </Button>

        ) : (

          <div className="flex gap-3">

            <Button
              variant="outline"
              onClick={onEdit}
            >
              Cancel
            </Button>

            <Button
              onClick={onSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>

          </div>

        )}

      </div>

    </div>
  );
}