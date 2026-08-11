import { useEffect, useState } from "react";

import { FormProvider } from "react-hook-form";

import { useProfile } from "../hooks";
import { useProfileForm } from "../hooks";

import ProfileHeader from "./ProfileHeader";
import ProfessionalInfoCard from "./ProfessionalInfoCard";
import AboutCard from "./AboutCard";
import SkillsCard from "./SkillsCard";
import { useUpdateProfile } from "../hooks";

export default function ProfileContainer() {

  const {
    data: profile,
    isLoading,
    isError,
  } = useProfile();

  const {
    form,
    toRequest,
  } = useProfileForm();

  const [isEditing, setIsEditing] = useState(false);

  const updateProfile = useUpdateProfile();

  useEffect(() => {
    if (!profile) return;

    form.reset({
      headline: profile.headline ?? "",
      bio: profile.bio ?? "",
      yearsOfExperience:
        profile.yearsOfExperience?.toString() ?? "",
      githubUrl: profile.githubUrl ?? "",
      linkedInUrl: profile.linkedInUrl ?? "",
      skills: profile.skills,
    });
  }, [profile]);

  
  const handleEdit = () => {
    if (isEditing && profile) {
      form.reset({
        headline: profile.headline ?? "",
        bio: profile.bio ?? "",
        yearsOfExperience:
          profile.yearsOfExperience?.toString() ?? "",
        githubUrl: profile.githubUrl ?? "",
        linkedInUrl: profile.linkedInUrl ?? "",
        skills: profile.skills,
      });
    }

    setIsEditing((prev) => !prev);
  };

  const handleSave = form.handleSubmit(async (values) => {
    try {
      await updateProfile.mutateAsync(toRequest(values));
      setIsEditing(false);

    } catch (error) {
      console.error(error);
    }
  });

  if (isLoading) {
    return (
      <div className="p-6">
        Loading profile...
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="p-6 text-red-500">
        Failed to load profile.
      </div>
    );
  }

  return (
    <FormProvider {...form}>

      <div className="space-y-6">

        <ProfileHeader
          profile={profile}
          isEditing={isEditing}
          onEdit={handleEdit}
          onSave={handleSave}
          isSaving={updateProfile.isPending}
        />

        <ProfessionalInfoCard
          editable={isEditing}
        />

        <AboutCard
          editable={isEditing}
        />

        <SkillsCard
          editable={isEditing}
        />

      </div>

    </FormProvider>
  );
}