import { useState } from "react";
import React, { useEffect } from "react";

const Modal = ({ profile, setProfile }) => {
  const closeModal = () => {
    document.getElementById("modal-background").style.display = "none";
  };

  const saveUserName = (changeUserName) => {
    setProfile({
      ...profile,
      userName: changeUserName,
    });
  };

  const saveUserEmail = (changeUserEmail) => {
    setProfile({
      ...profile,
      userEmail: changeUserEmail,
    });
  };

  const saveUserColorScheme = (changeUserColor) => {
    setProfile({
      ...profile,
      userColorScheme: changeUserColor,
    });
  };

  //save Profile
  const saveWholeProfile = () => {
    localStorage.setItem("profile-data", JSON.stringify(profile));
  };

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile-data"));

    if (savedProfile) {
      setProfile(savedProfile);
    }
  }, []);

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
                <div className="profile-picture-button"></div>
              </div>
              <div>
                <div className="add-new-image clickable">Add New Image</div>
              </div>
              <div>
                <div className="remove-image clickable">Remove Image</div>
              </div>
            </div>

            <form>
              <div className="edit-profile-info">
                <div>
                  <div className="edit-profile-info-name">Name</div>
                  <input
                    className="edit-profile-info-name"
                    type="text"
                    value={profile?.userName || ""}
                    onChange={(e) => {
                      saveUserName(e.currentTarget.value);
                    }}
                  />
                </div>
                <div>
                  <div className="edit-profile-info-email">Email</div>
                  <input
                    className="edit-profile-info-email"
                    type="text"
                    value={profile?.userEmail || ""}
                    onChange={(e) => {
                      saveUserEmail(e.currentTarget.value);
                    }}
                  />
                </div>
                <div>
                  <div className="edit-profile-info-color">Color Scheme</div>
                  <select
                    value={profile?.userColorScheme || ""}
                    onChange={(e) => {
                      saveUserColorScheme(e.currentTarget.value);
                    }}
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
                  onClick={saveWholeProfile}
                />
                <div className="b-edit-profile-logout clickable">Logout</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
