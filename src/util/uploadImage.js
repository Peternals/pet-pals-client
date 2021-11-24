import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

// for uploading sigle image (owner and carer)
export const submitPic = async (imageInput) => {
  try {
    const formData = new FormData();
    formData.append("file", imageInput);

    const response = await axios.post(
      `${REACT_APP_SERVER_URL}/pic/upload`,
      formData
    );
    return response.data[0].filename;
  } catch (err) {
    console.log(err);
  }
};

// for uploading multiple image (pets)

export const submitPicForPet = async (imageInput) => {
  try {
    const formData = new FormData();
    [...imageInput].forEach((image) => {
      formData.append("file", image);
      formData.append("name", Date.now() + image.name);
    });
    const response = await axios.post(
      `${REACT_APP_SERVER_URL}/pic/upload`,
      formData
    );

    return response.data.map((res) => res.filename);
  } catch (err) {
    console.log(err);
  }
};
