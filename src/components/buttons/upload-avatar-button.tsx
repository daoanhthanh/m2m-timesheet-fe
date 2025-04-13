import React, { useState } from "react";

import type { GetProp, UploadFile, UploadProps } from "antd";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { endpoints } from "@/utils/endpoints";
import { useTranslation } from "react-i18next";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type Props = {
  className?: string;
  onUploadSuccess?: (file: UploadFile) => void;
};

export const UploadAvatarButton: React.FC<Props> = ({
  className,
  onUploadSuccess,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { t } = useTranslation();

  const onChange: UploadProps["onChange"] = async ({ fileList }) => {
    fileList = fileList.slice(-1);
    setFileList(fileList);

    // Handle the response from the backend
    const lastFile = fileList[0];
    if (lastFile?.status === "done" && lastFile.response?.data.atp) {
      // console.log("Temporary Avatar Path:", lastFile.response.data.atp);
      if (onUploadSuccess) {
        onUploadSuccess(lastFile);
      }
    }
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <div className={className}>
      <ImgCrop rotationSlider cropShape={"round"}>
        <Upload
          action={endpoints.uploadAvatar}
          withCredentials
          listType="picture-circle"
          fileList={fileList}
          headers={{}}
          multiple={false}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length
            ? t("buttons.uploadImage.edit")
            : t("buttons.uploadImage.add")}
        </Upload>
      </ImgCrop>
    </div>
  );
};
