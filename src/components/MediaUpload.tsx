import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, X, Image, Video, Play, Pause } from "lucide-react";

interface MediaUploadProps {
  onMediaSelect: (file: File, previewUrl: string, type: "image" | "video") => void;
  onClear: () => void;
  currentMedia: { url: string; type: "image" | "video" } | null;
}

const MediaUpload = ({ onMediaSelect, onClear, currentMedia }: MediaUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      alert("Please upload an image or video file");
      return;
    }

    const url = URL.createObjectURL(file);
    onMediaSelect(file, url, isImage ? "image" : "video");
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Card className="glass-card p-6 border-border/50">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Upload className="w-5 h-5 text-primary" />
        Upload Media
      </h3>

      {!currentMedia ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer
            flex flex-col items-center justify-center gap-4 min-h-[200px]
            ${isDragging 
              ? "border-primary bg-primary/10 scale-[1.02]" 
              : "border-border/50 hover:border-primary/50 hover:bg-muted/50"
            }
          `}
        >
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
              <Image className="w-7 h-7 text-primary" />
            </div>
            <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
              <Video className="w-7 h-7 text-accent" />
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-foreground font-medium">
              {isDragging ? "Drop your file here" : "Drag & drop or click to upload"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Supports images (JPG, PNG) and videos (MP4, MOV)
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden bg-muted/50">
          {currentMedia.type === "image" ? (
            <img
              src={currentMedia.url}
              alt="Uploaded media"
              className="w-full h-auto max-h-[400px] object-contain"
            />
          ) : (
            <div className="relative">
              <video
                ref={videoRef}
                src={currentMedia.url}
                className="w-full h-auto max-h-[400px] object-contain"
                onEnded={() => setIsPlaying(false)}
              />
              <button
                onClick={togglePlayPause}
                className="absolute inset-0 flex items-center justify-center bg-background/20 hover:bg-background/30 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-primary-foreground" />
                  ) : (
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  )}
                </div>
              </button>
            </div>
          )}

          <Button
            variant="destructive"
            size="icon"
            className="absolute top-3 right-3"
            onClick={onClear}
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm">
            <span className="text-xs font-medium text-foreground capitalize">
              {currentMedia.type}
            </span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default MediaUpload;
