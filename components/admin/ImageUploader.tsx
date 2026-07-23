"use client";

import { useRef, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Upload, Loader2, X } from "lucide-react";
import { storage, db } from "@/lib/firebase";
import { useToast } from "@/components/admin/Toast";

export default function ImageUploader({
  value,
  onChange,
  folder = "uploads",
}: {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { show } = useToast();

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const path = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      // Index into the media library collection so it's browsable there too.
      await addDoc(collection(db, "media"), {
        name: file.name,
        url,
        path,
        type: file.type,
        size: file.size,
        createdAt: serverTimestamp(),
      });

      onChange(url);
      show("Image uploaded", "success");
    } catch (err) {
      console.error("Upload failed:", err);
      show("Upload failed. Please try again.", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {value ? (
        <div className="relative w-full max-w-xs overflow-hidden rounded-xl border border-white/[0.08]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Uploaded" className="aspect-video w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex w-full max-w-xs flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.15] bg-white/[0.02] py-8 text-sm text-mist-500 transition-colors hover:border-forge-cyan/40 hover:text-white disabled:opacity-60"
        >
          {uploading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Upload className="h-5 w-5" />
          )}
          {uploading ? "Uploading..." : "Click to upload image"}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
