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
    <div className="relative overflow-hidden rounded-[1.35rem] border-0 bg-[#0e171c] p-6 shadow-lg shadow-black/10 ring-1 ring-inset ring-white/[0.08]">

      <h3 className="mb-4 text-lg font-semibold tracking-tight">
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
