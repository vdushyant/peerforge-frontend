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
    <div className="relative overflow-hidden rounded-[1.5rem] border-0 bg-[radial-gradient(ellipse_at_90%_0%,rgba(55,211,157,0.11),transparent_36%),#0e171c] p-5 shadow-lg shadow-black/10 ring-1 ring-inset ring-white/[0.08] sm:p-7">

      <div className="flex flex-wrap items-start justify-between gap-5">

        <div className="flex min-w-0 items-center gap-4 sm:gap-5">

          <Avatar className="h-16 w-16 ring-2 ring-emerald-200/15 sm:h-20 sm:w-20">
            <AvatarFallback className="bg-emerald-200/[0.12] text-xl font-bold text-emerald-100">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 space-y-1">

            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {profile.firstName} {profile.lastName}
            </h2>

            <p className="text-muted-foreground">
              {profile.headline ?? "Add a professional headline"}
            </p>

            <p className="text-sm text-muted-foreground">
              {profile.email}
            </p>

            <div className="mt-2 flex flex-wrap gap-2">

              {profile.roles.map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-emerald-100/10 bg-emerald-200/[0.08] px-3 py-1 text-xs font-medium text-emerald-100"
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
