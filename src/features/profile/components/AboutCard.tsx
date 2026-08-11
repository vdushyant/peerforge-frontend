import { Textarea } from "@/components/ui/textarea";

import { useFormContext } from "react-hook-form";

import type { ProfileFormValues } from "../types";

interface AboutCardProps {
  editable: boolean;
}

export default function AboutCard({
  editable,
}: AboutCardProps) {

  const {
    register,
    getValues,
  } = useFormContext<ProfileFormValues>();

  return (
    <div className="rounded-xl border border-white/10 bg-card p-6">

      <h3 className="mb-4 text-lg font-semibold">
        About
      </h3>

      {editable ? (

        <Textarea
          rows={6}
          placeholder="Tell other users about yourself..."
          {...register("bio")}
        />

      ) : (

        <p className="leading-7">

          {getValues("bio") || (

            <span className="italic text-muted-foreground">
              Tell other users about yourself, your interests, and your technical background.
            </span>

          )}

        </p>

      )}

    </div>
  );
}