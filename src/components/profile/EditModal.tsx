import { useUploadImages } from "@/hooks/useUplaodImages";
import { updateUser } from "@/services/user";
import { UpdateUserPayload } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

interface EditProfileModalProps {
  name: string;
  userId: string;
  about?: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  name,
  userId,
  about,
  setModal,
}) => {
  const [inputAbout, setAbout] = useState(about || "");
  const [cover, setCover] = useState<File | null>(null);
  const [profile, setProfile] = useState<File | null>(null);

  const payload: UpdateUserPayload = {};

  const queryClient = useQueryClient();

  const { isUploading, uploadFunc } = useUploadImages();

  const { mutate, isPending: isUpdating } = useMutation({
    mutationKey: ["user", userId],
    mutationFn: (payload: UpdateUserPayload) => updateUser(userId, payload),
    onSuccess: () => {
      setModal(false);
      queryClient.invalidateQueries();
    },
  });

  const handleSubmit = async () => {
    if (profile || cover) {
      const formData = new FormData();

      if (profile) formData.append("files", profile);

      if (cover) formData.append("files", cover);

      const links = await uploadFunc(formData);

      console.log(links);

      if (profile) payload.profileUrl = links[0];

      if (cover) payload.coverUrl = profile ? links[1] : links[0];
    }

    if (inputAbout) payload.about = inputAbout;

    mutate(payload);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-slate-800 opacity-50"
        onClick={() => setModal(false)}
      ></div>

      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg z-10">
        <h2 className="text-2xl text-primary font-semibold mb-4">{name}</h2>

        <div className="mb-4">
          <label className="block text-slate-400 font-medium mb-2">
            Edit About
          </label>
          <textarea
            className="w-full p-2 bg-white rounded-lg border-2 outline-none border-slate-300 text-primary"
            rows={4}
            value={inputAbout}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Write about yourself..."
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-slate-400 font-medium mb-2">
            Upload New Profile Picture
          </label>
          <input
            type="file"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            onChange={(event) => {
              if (event?.target?.files?.[0]) setProfile(event.target.files[0]);
            }}
          />
        </div>

        <div className="mb-4">
          <label className="block text-slate-400 font-medium mb-2">
            Upload New Cover Photo
          </label>
          <input
            type="file"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            onChange={(event) => {
              if (event?.target?.files?.[0]) setCover(event.target.files[0]);
            }}
          />
        </div>

        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded-md mr-2"
            onClick={() => setModal(false)}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            {isUploading || isUpdating ? (
              <span className="loading loading-dots loading-xs" />
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
