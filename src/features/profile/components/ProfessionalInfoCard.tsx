import {
  Briefcase,
  Globe,
  Link,
} from "lucide-react";

import { Input } from "@/components/ui/input";

import { useFormContext } from "react-hook-form";

import type { ProfileFormValues } from "../types";

interface ProfessionalInfoCardProps {
  editable: boolean;
}

export default function ProfessionalInfoCard({
  editable,
}: ProfessionalInfoCardProps) {

  const {
    register,
    getValues,
  } = useFormContext<ProfileFormValues>();

  return (
    <div className="rounded-xl border border-white/10 bg-card p-6">

      <h3 className="mb-6 text-lg font-semibold">
        Professional Information
      </h3>

      <div className="space-y-5">

        {/* Headline */}

        <div>

          <p className="mb-2 text-sm text-muted-foreground">
            Headline
          </p>

          {editable ? (

            <Input
              placeholder="Senior Backend Engineer"
              {...register("headline")}
            />

          ) : (

            <p>
              {getValues("headline") || (
                <span className="italic text-muted-foreground">
                  No headline added yet.
                </span>
              )}
            </p>

          )}

        </div>

        {/* Experience */}

        <div className="flex items-start gap-3">

          <Briefcase className="mt-2 h-5 w-5 text-violet-400" />

          <div className="flex-1">

            <p className="mb-2 text-sm text-muted-foreground">
              Experience
            </p>

            {editable ? (

              <Input
                type="number"
                step="0.5"
                {...register("yearsOfExperience")}
              />

            ) : (

              <p>

                {getValues("yearsOfExperience")
                  ? `${getValues("yearsOfExperience")} years`
                  : "Not specified"}

              </p>

            )}

          </div>

        </div>

        {/* GitHub */}

        <div className="flex items-start gap-3">

          <Globe className="mt-2 h-5 w-5 text-violet-400" />

          <div className="flex-1">

            <p className="mb-2 text-sm text-muted-foreground">
              GitHub
            </p>

            {editable ? (

              <Input
                placeholder="https://github.com/username"
                {...register("githubUrl")}
              />

            ) : (

              <p>

                {getValues("githubUrl") || (
                  <span className="text-muted-foreground">
                    Add your GitHub profile
                  </span>
                )}

              </p>

            )}

          </div>

        </div>

        {/* LinkedIn */}

        <div className="flex items-start gap-3">

          <Link className="mt-2 h-5 w-5 text-violet-400" />

          <div className="flex-1">

            <p className="mb-2 text-sm text-muted-foreground">
              LinkedIn
            </p>

            {editable ? (

              <Input
                placeholder="https://linkedin.com/in/username"
                {...register("linkedInUrl")}
              />

            ) : (

              <p>

                {getValues("linkedInUrl") || (
                  <span className="text-muted-foreground">
                    Add your LinkedIn profile
                  </span>
                )}

              </p>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}