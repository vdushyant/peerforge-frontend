import { Input } from "@/components/ui/input";

import { useFormContext } from "react-hook-form";

import type { ProfileFormValues } from "../types";

interface SkillsCardProps {
  editable: boolean;
}

export default function SkillsCard({
  editable,
}: SkillsCardProps) {

  const {
    getValues,
  } = useFormContext<ProfileFormValues>();

  const skills = getValues("skills");

  return (
    <div className="relative overflow-hidden rounded-[1.35rem] border-0 bg-[#0e171c] p-6 shadow-lg shadow-black/10 ring-1 ring-inset ring-white/[0.08]">

      <h3 className="mb-5 text-lg font-semibold tracking-tight">
        Skills
      </h3>

      {editable ? (

        <>
          <Input
            placeholder="Java, Spring Boot, React"
            defaultValue={skills.join(", ")}
            disabled
          />

          <p className="mt-2 text-sm text-muted-foreground">
            Skills editing will be available in the next iteration.
          </p>
        </>

      ) : (

        <>
          {skills.length === 0 ? (

            <p className="italic text-muted-foreground">
              Add your technical skills to help others understand your expertise.
            </p>

          ) : (

            <div className="flex flex-wrap gap-3">

              {skills.map((skill) => (

                <span
                  key={skill}
                  className="rounded-full border border-emerald-100/10 bg-emerald-200/[0.07] px-4 py-2 text-sm font-medium text-emerald-100"
                >
                  {skill}
                </span>

              ))}

            </div>

          )}
        </>

      )}

    </div>
  );
}
