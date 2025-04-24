"use client";

import EmptyState from "@/components/EmptyState";
import PodcastCard from "@/components/PodcastCard";
import ProfileCard from "@/components/ProfileCard";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";

const ProfilePage = ({
  params: { profileId },
}: {
  params: { profileId: string };
}) => {
  const user = useQuery(api?.users?.getUserById, {
    clerkId: profileId,
  });
  const authorPodcastData = useQuery(api.podcasts.getPodcastByAuthorId, {
    authorId: profileId,
  });

  return (
    <section className='mt-9 flex flex-col'>
      <h1 className='text-20 font-bold text-white-1 max-md:text-center'>
        Podcaster Profile
      </h1>
      <div className='mt-6 flex flex-col gap-6 max-md:items-center md:flex-row'>
        <ProfileCard
          podcastData={authorPodcastData! as any}
          imageUrl={user?.imageUrl!}
          userFirstName={user?.name!}
        />
      </div>
      <section className='mt-10'>
        <h1 className='text-20 font-bold text-white-1 max-md:text-center'>
          All Podcasts
        </h1>
        <div className='mt-5 grid grid-cols-1 lg:grid-cols-3'>
          {authorPodcastData && authorPodcastData?.podcasts?.length > 0 ? (
            authorPodcastData?.podcasts?.map((item) => (
              <PodcastCard
                key={item?._id}
                imgUrl={item?.imageUrl!}
                title={item?.podcastTitle}
                description={item?.podcastDescription}
                podcastId={item?._id}
              />
            ))
          ) : (
            <EmptyState
              title='No podcasts found'
              buttonLink='/home/discover'
              buttonText='Discover more podcasts'
            />
          )}
        </div>
      </section>
    </section>
  );
};

export default ProfilePage;
