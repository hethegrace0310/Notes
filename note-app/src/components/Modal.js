import { useState } from "react";
import React, { useEffect } from "react";
import { getCurrentUserAPI, updateUserAPI } from "../api/userAPI";

const DEFAULT_SOL_ID = "62584d5ca227c82e9c3c4b0d";

const Modal = ({ profile, setProfile }) => {
  useEffect(() => {
    let id = localStorage.getItem("userId");
    if (!id) {
      id = DEFAULT_SOL_ID;
      localStorage.setItem("userId", DEFAULT_SOL_ID);
    }
    function fetchData() {
      getCurrentUserAPI(id)
        .then((profile) => {
          setProfile(profile);
        })
        .catch((err) => {
          console.error("Error retrieving note data: " + err);
        });
    }
    fetchData();
  }, []);

  const handleChangeProfile = (e) => {
    //Update PUT
    setProfile((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };
  const onSave = async (e) => {
    e.preventDefault();
    await updateUserAPI({ ...profile, _id: DEFAULT_SOL_ID })
      .then((response) => {
        console.log("Updated user on the server");
      })
      .catch((err) => {
        console.log(profile);
        console.error("Error updating user data: " + err);
      });
    closeModal();
    console.log(profile);
  };
  // const closeModal = () => {
  //   document.getElementById("editP").style.display = "none";
  // };

  const closeModal = () => {
    document.getElementById("modal-background").style.display = "none";
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
    setProfile({
      ...profile,
      colorScheme: changeUserColor,
    });
  };

  // //save Profile
  // const saveWholeProfile = () => {
  //   // localStorage.setItem("profile-data", JSON.stringify(profile));
  //   /**
  //    *
  //    */

  //   useEffect(() => {
  //     //retreiving all formValues GET
  //     function fetchData() {
  //       getCurrentUserAPI()
  //         .then((profile) => {
  //           setProfile(profile);
  //         })
  //         .catch((err) => {
  //           console.error("Error retrieving note data: " + err);
  //         });
  //     }
  //     fetchData();
  //   }, []);
  // };

  // useEffect(() => {
  //   const savedProfile = JSON.parse(localStorage.getItem("profile-data"));

  //   if (savedProfile) {
  //     setProfile(savedProfile);
  //   }
  // }, []);

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
