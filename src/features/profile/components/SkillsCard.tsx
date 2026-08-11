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
    <div className="rounded-xl border border-white/10 bg-card p-6">

      <h3 className="mb-5 text-lg font-semibold">
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
                  className="rounded-full bg-violet-600/15 px-4 py-2 text-sm font-medium text-violet-400"
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