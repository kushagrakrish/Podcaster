"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import GeneratePodcast from "@/components/GeneratePodcast";
import GenerateThumbnail from "@/components/GenerateThumbnail";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "convex/react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  podcastTitle: z.string().min(2),
  podcastDescription: z.string().min(2),
});
const CreatePodcastPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [imageUrl, setImageUrl] = useState("");

  const [audioUrl, setAudioUrl] = useState("");
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [audioDuration, setAudioDuration] = useState(0);

  const [voicePrompt, setVoicePrompt] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const createPodcast = useMutation(api.podcasts.createPodcast);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const podcast = await createPodcast({
        podcastTitle: data.podcastTitle,
        podcastDescription: data.podcastDescription,
        audioUrl,
        imageUrl,
        imagePrompt,
        voicePrompt,
        views: 0,
        audioDuration,
        audioStorageId: audioStorageId!,
        imageStorageId: imageStorageId!,
      });

      toast({ title: "Podcast created" });
      router.push("/");
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className='mt-10 flex flex-col'>
      {" "}
      <h1 className='text-20 font-bold text-white-1'>Create Podcasts</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mt-12 flex w-full flex-col'
        >
          <div className='flex flex-col gap-[30px] border-b border-black-5 pb-10'>
            <FormField
              control={form.control}
              name='podcastTitle'
              render={({ field }) => (
                <FormItem className='flex flex-col gap-2.5'>
                  <FormLabel className='text-16 font-bold text-white-1'>
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className='input-class focus-visible:ring-offset-orange-1 placeholder:text-sm'
                      placeholder='JSM Pro Podcast'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-white-1' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='podcastDescription'
              render={({ field }) => (
                <FormItem className='flex flex-col gap-2.5'>
                  <FormLabel className='text-16 font-bold text-white-1'>
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className='input-class focus-visible:ring-offset-orange-1 placeholder:text-sm'
                      placeholder='Write a short Podcast description'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-white-1' />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col pt-10'>
            <GeneratePodcast
              setAudioStorageId={setAudioStorageId}
              setAudio={setAudioUrl}
              //   voiceType={voiceType!}
              audio={audioUrl}
              voicePrompt={voicePrompt}
              setVoicePrompt={setVoicePrompt}
              setAudioDuration={setAudioDuration}
            />
            <GenerateThumbnail
              setImage={setImageUrl}
              setImageStorageId={setImageStorageId}
              image={imageUrl}
              imagePrompt={imagePrompt}
              setImagePrompt={setImagePrompt}
            />
            <div className='mt-10 w-full'>
              <Button
                type='submit'
                className='text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1'
                disabled={!audioUrl || !imageUrl || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    Submitting
                    <Loader size={20} className='animate-spin ml-2' />
                  </>
                ) : (
                  "Submit & Publish Podcast"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreatePodcastPage;
