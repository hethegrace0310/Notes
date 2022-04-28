import { useState } from "react";
import React, { useEffect } from "react";
import {
  logoutAPI,
  updateUserAPI,
  uploadImageToCloudinaryAPIMethod,
} from "../api/userAPI";

const Modal = ({ profile, setProfile, setUserdata }) => {
  const [img, setImg] = useState(null);

  const handleChangeProfile = (e) => {
    //Update PUT
    setProfile((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    console.log("New File Selected");

    let newImg = profile.profileImage;

    if (img) {
      const formData = new FormData();
      // TODO: You need to create an "unsigned" upload preset on your Cloudinary account
      // Then enter the text for that here.
      const unsignedUploadPreset = "hwnhe2xc";
      formData.append("file", img);
      formData.append("upload_preset", unsignedUploadPreset);

      console.log("Cloudinary upload");
      const response = await uploadImageToCloudinaryAPIMethod(formData);
      console.log("Upload success");
      console.dir(response);

      newImg = response.url;
    } else if (img == "") {
      newImg = "";
    }

    // Now the URL gets saved to the author
    const updatedProfile = { ...profile, profileImage: newImg };
    // setProfile(updatedProfile);
    updateUserAPI(updatedProfile)
      .then((response) => {
        setProfile(updatedProfile);
        console.log("Updated user on the server");
      })
      .catch((err) => {
        console.log(profile);
        console.error("Error updating user data: " + err);
      });

    closeModal();
  };

  const closeModal = () => {
    document.getElementById("modal-background").style.display = "none";
    console.log(profile);
    setImg(null);
    // window.location.reload();
  };

  const saveUserName = (changeUserName) => {
    setProfile({
      ...profile,
      name: changeUserName,
    });
  };

  const saveUserEmail = (changeUserEmail) => {
    setProfile({
      ...profile,
      email: changeUserEmail,
    });
  };

  const saveUserColorScheme = (changeUserColor) => {
    console.log(changeUserColor);
    setProfile({
      ...profile,
      colorScheme: changeUserColor,
    });
  };

  const handleImageSelected = (event) => {
    console.log("New File Selected");
    if (event.target.files && event.target.files[0]) {
      setImg(event.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    if (profile.profileImage) {
      // let updatedProfile = { ...profile, profileImage: "" };
      // setProfile(updatedProfile);
      setImg("");
    }
  };

  const logout = async () => {
    console.log("logout");
    await logoutAPI();
    // setUserdata(undefined);
    setProfile(undefined);
  };

  useEffect(() => {
    console.log(img);
  }, [img]);

  return (
    <div className="modal-background" id="modal-background">
      <div className="additional-modal-div">
        <div className="modal-popup">
          <div className="edit-profile">
            <div className="edit-profile-title">
              <div>Edit Profile</div>
              <div className="material-icons clickable" onClick={closeModal}>
                lc_close
              </div>
            </div>
            <div className="edit-profile-pic">
              <div className="onemore-edit-profile-pic">
                <div>
                  <img
                    src={
                      img
                        ? URL.createObjectURL(img)
                        : !(profile.profileImage == "") && img != ""
                        ? profile?.profileImage
                        : "/img/initial-img.png"
                    }
                    alt="profile"
                    className="profile-img"
                  />
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <label className="add-new-image clickable" htmlFor="input-file">
                  Add New Image
                </label>
                <input
                  style={{ display: "none" }}
                  type="file"
                  name="image"
                  accept="image/*"
                  id="input-file"
                  onChange={handleImageSelected}
                />
              </div>
              <div>
                <div
                  className="remove-image clickable"
                  onClick={handleRemoveImage}
                >
                  Remove Image
                </div>
              </div>
            </div>

            <form>
              <div className="edit-profile-info">
                <div>
                  <div className="edit-profile-info-name">Name</div>
                  <input
                    className="edit-profile-info-name"
                    type="text"
                    value={profile?.name || ""}
                    onChange={(e) => saveUserName(e.target.value)}
                  />
                </div>
                <div>
                  <div className="edit-profile-info-email">Email</div>
                  <input
                    className="edit-profile-info-email"
                    type="text"
                    value={profile?.email || ""}
                    onChange={(e) => saveUserEmail(e.target.value)}
                  />
                </div>
                <div>
                  <div className="edit-profile-info-color">Color Scheme</div>
                  <select
                    value={profile?.colorScheme || ""}
                    onChange={(e) => saveUserColorScheme(e.target.value)}
                  >
                    <option value="Light">Light</option>
                    <option value="Dark">Dark</option>
                  </select>
                </div>
              </div>

              <div className="edit-profile-save-logout">
                <input
                  type="submit"
                  value="Save"
                  className="b-edit-profile-save"
                  onClick={onSave}
                />
                <div
                  className="b-edit-profile-logout clickable"
                  onClick={logout}
                >
                  Logout
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
