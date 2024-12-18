import { clientAxios } from "@/lib/axios";
import axios from "axios";

export const ImageUploadApi = async (prefix: string, file: File) => {
  const fileName = file.name;
  const { data } = await clientAxios.get(`/api/files/presigned-url/${prefix}/${fileName}`);
  const { preSignedUrl } = data.data;
  const formatUrl = preSignedUrl.split("?")[0];

  const upload = await axios.put(formatUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
  });

  return upload.request.responseURL;
};
