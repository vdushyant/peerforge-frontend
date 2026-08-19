import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import MentorProfileForm from "../components/MentorProfileForm";
import { useMyMentorProfile } from "../hooks/useMyMentorProfile";
import MentorAvailabilityCard from "../components/MentorAvailabilityCard";

export default function MentorDashboardPage() {
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: mentorProfile,
    isLoading,
    isError,
  } = useMyMentorProfile();

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">
          Loading mentor profile...
        </p>
      </div>
    );
  }

  if (isError || !mentorProfile) {
    return (
      <div className="p-6">
        <p className="text-destructive">
          Unable to load your mentor profile.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-semibold">
          Mentor Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your mentor profile and track your mentoring activity.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Status</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="font-medium">
            {mentorProfile.approvalStatus}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Mentor Profile</CardTitle>

          {!isEditing && (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </CardHeader>

        <CardContent>
          {isEditing ? (
            <MentorProfileForm
              profile={mentorProfile}
              onCancel={() => setIsEditing(false)}
              onSuccess={() => setIsEditing(false)}
            />
          ) : (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium">
                  About
                </p>

                <p className="mt-1 text-muted-foreground">
                  {mentorProfile.about}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">
                  Hourly Rate
                </p>

                <p className="mt-1 text-2xl font-semibold">
                  ₹{mentorProfile.hourlyRate}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sessions Completed</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-semibold">
              {mentorProfile.sessionsCompleted}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Rating</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-semibold">
              {mentorProfile.averageRating.toFixed(1)}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <MentorAvailabilityCard />
    </div>
  );
}