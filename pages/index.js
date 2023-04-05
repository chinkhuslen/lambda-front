import axios from "axios";
import { useState } from "react";

const uploadFile = async (fileType) => {
  const url = await getSignedURL(fileType);
  console.log(url);
  putFile(url, fileType);
};

const putFile = async (url, fileType) => {
  let formData = new FormData();
  formData.append("file", fileType);
  console.log(fileType);
  console.log(url);
  try {
    const res = await axios.put(`${url}`, fileType, {
      headers: {
        "Content-Type": fileType.type,
      },
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

const getSignedURL = async (fileType) => {
  let res;
  try {
    res = await axios.post(
      "https://msdf6jb1k2.execute-api.us-east-1.amazonaws.com/dev/",
      {
        fileType: fileType.type,
        fileName: fileType.name,
      }
    );
    console.log(res);
  } catch (error) {
    res = error;
    console.log(res.data);
  }
  return res.data;
};

export default function Home() {
  const [fileType, setFileType] = useState("");
  const changeHandler = (event) => {
    setFileType(event.target.files[0]);
  };
  return (
    <>
      <div>Upload pic</div>
      <input type="file" onChange={changeHandler} />
      <button onClick={() => uploadFile(fileType)}>Submit</button>
    </>
  );
}
