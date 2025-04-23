import { api } from "@/convex/_generated/api";
import { GeneratePodcastProps } from "@/types";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useAction, useMutation } from "convex/react";
import { Loader } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Todo -> Move this custom hook to another file

const useGeneratePodcast = ({
  setAudio,
  //   voiceType,
  voicePrompt,
  setAudioStorageId,
}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);

  const getPodcastAudio = useAction(api.openai.generateAudioAction);

  const getAudioUrl = useMutation(api.podcasts.getUrl);

  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio("");

    if (!voicePrompt) {
      toast({
        title: "Please provide a prompt to generate a podcast",
        variant: "destructive",
      });
      return setIsGenerating(false);
    }
    try {
      const response = await getPodcastAudio({
        input: voicePrompt,
      });

      const blob = new Blob([response], { type: "audio/mpeg" });
      const fileName = `podcast-${uuidv4()}.mp3`;
      const file = new File([blob], fileName, { type: "audio/mpeg" });

      const uploaded = await startUpload([file]);
      console.log(uploaded);
      if (
        !uploaded ||
        !(uploaded[0]?.response as { storageId: string })?.storageId
      ) {
        throw new Error("Upload failed: No storageId returned.");
      }

      const storageId = (uploaded[0].response as any).storageId;

      setAudioStorageId(storageId);

      const audioUrl = await getAudioUrl({ storageId });
      if (!audioUrl) {
        throw new Error("Failed to resolve audio URL.");
      }

      setAudio(audioUrl);
      toast({
        title: "Podcast generated successfully",
      });
    } catch (error) {
      console.log("Error generating podcast", error);
      toast({
        title: "Error creating a podcast",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return { isGenerating, generatePodcast };
};

interface IGenerateProps {}
const GeneratePodcast = (props: GeneratePodcastProps) => {
  //   const [isGenerating, setIsGenerating] = useState(false);

  const { isGenerating, generatePodcast } = useGeneratePodcast(props);
  return (
    <>
      <div>
        <div className='flex flex-col gap-2.5'>
          <Label className='text-16 font-bold text-white-1'>
            AI Prompt to generate Podcast
          </Label>
          <Textarea
            className='input-class font-light focus-visible:ring-offset-orange-1'
            placeholder='Provide text to generate audio'
            rows={5}
            value={props.voicePrompt}
            onChange={(e) => props.setVoicePrompt(e.target.value)}
          />
        </div>
        <div className='mt-5 w-full max-w-[200px]'>
          <Button
            type='button'
            className='text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1'
            onClick={generatePodcast}
          >
            {isGenerating ? (
              <>
                Generating
                <Loader size={20} className='animate-spin ml-2' />
              </>
            ) : (
              "Generate"
            )}
          </Button>
          {props.audio && (
            <audio
              src={props.audio}
              autoPlay
              controls // Add this to show the play/pause controls
              className='mt-5'
              onLoadedMetadata={(e) =>
                props.setAudioDuration(e.currentTarget.duration)
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default GeneratePodcast;
