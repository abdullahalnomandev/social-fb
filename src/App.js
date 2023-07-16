/* eslint-disable jsx-a11y/alt-text */
// import { useState } from "react";
// import { LoginSocialFacebook } from "reactjs-social-login";
// // import { FacebookLoginButton } from "react-social-login-buttons";
// import axios from "axios";
// import { createButton } from "react-social-login-buttons";

// function App() {
//   const [profile, setProfile] = useState(null);
//   const [accounts, setAccounts] = useState([]);
//   const [selectedValue, setSelectedValue] = useState(null);

//   const getAccounts = async (token) => {
//     try {
//       const { data } = await axios.get(
//         `https://graph.facebook.com/me/accounts?access_token=${token}`
//       );
//       setAccounts(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleChange = (event) => {
//     setSelectedValue(event.target.value);
//   };

//   const selectedAccount = accounts?.data?.find(
//     (acc) => acc?.id === selectedValue
//   );

//   const handleFormSubmit = (e) => {
//     console.log(selectedValue);
//     console.log("Selected Account", selectedAccount);
//     e.preventDefault();
//   };

//   const config = {
//     text: " Continue with Facebook",
//     icon: "facebook",
//     iconFormat: (name) => `fa fa-${name}`,
//     style: { background: "#3b5998", width: "300px" },
//     activeStyle: { background: "#293e69" },
//   };
//   const MyFacebookLoginButton = createButton(config);

//   return (
//     <div>
//       {!profile ? (
//         <LoginSocialFacebook
//           scope="instagram_manage_insights, pages_messaging, pages_read_engagement,pages_manage_metadata,public_profile, email, pages_show_list, business_management, instagram_basic, instagram_manage_comments, instagram_manage_messages, page_events, pages_read_engagement, pages_manage_metadata, pages_messaging"
//           appId="773303087736335"
//           onResolve={(response) => {
//             console.log(response);
//             setProfile(response.data);
//             getAccounts(response.data.accessToken);
//           }}
//           onReject={(error) => {
//             console.log(error);
//           }}
//         >
//           <MyFacebookLoginButton></MyFacebookLoginButton>
//         </LoginSocialFacebook>
//       ) : (
//         ""
//       )}

//       {profile ? (
//         <div style={{ margin: "auto", width: "" }}>
//           <h1>{profile.name}</h1>
//           <p
//             style={{ width: "100px", color: "red" }}
//           >{`"${profile.accessToken}"`}</p>
//           <img
//             style={{ widht: "100px", height: "100px", borderRadius: "100%" }}
//             src={profile.picture.data.url}
//           />
//         </div>
//       ) : (
//         ""
//       )}
//       {accounts?.data?.length && (
//         <form action="" onSubmit={handleFormSubmit}>
//           <select name="" id="" onChange={handleChange}>
//             {accounts.data.map((data) => (
//               <option value={data.id}>{data.name}</option>
//             ))}
//           </select>
//           {selectedValue && <input type="submit" value="Next" />}
//         </form>
//       )}
//     </div>
//   );
// }

// export default App;

// import Link from "next/link";

// const Instagram = () => {
//   return <Link href="/api/meta/instagram" className="px-3 py-2 text-blue bg-blue"></Link>;
// };

// export default Instagram;

import axios from "axios";
import React, { useEffect, useState } from "react";

const IndexPage = () => {
  const [profile, setProfile] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

  const getAccounts = async (token) => {
    try {
      const { data } = await axios.get(
        `https://graph.facebook.com/me/accounts?access_token=${token}`
      );
      setAccounts(data);
    } catch (error) {
      console.log(error);
    }
  };
     const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const selectedAccount = accounts?.data?.find(
    (acc) => acc?.id === selectedValue
  );

  const handleFormSubmit = (e) => {
    console.log(selectedValue);
    console.log("Selected Account", selectedAccount);
    e.preventDefault();
  };

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "773303087736335",
        cookie: true,
        xfbml: true,
        version: "v17.0",
      });

      window.FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

  }, [profile]);

  const statusChangeCallback = (response) => {
    if (response.status === "connected") {
      console.log(response);
      console.log("token", response?.authResponse?.accessToken);
      setProfile(response?.authResponse);
      getAccounts(response?.authResponse?.accessToken);
    } else {
      console.log("Not authenticated");
    }
  };
  function checkLoginState() {
    window.FB.getLoginStatus(function (response) {
      statusChangeCallback(response);
    });
  }

  return (
    <>
      <button
        className="fb-login-button"
        data-scope="public_profile, email, pages_show_list, business_management, instagram_basic, instagram_manage_comments, instagram_manage_messages, page_events, pages_read_engagement, pages_manage_metadata, pages_messaging"
        data-onlogin={checkLoginState}
      >
        Click
      </button>
      {profile ? (
        <div style={{ margin: "auto", width: "" }}>
          <h1>{profile.name}</h1>
          <p
            style={{ width: "100px", color: "red" }}
          >{`"${profile.accessToken}"`}</p>
          <img
            style={{ widht: "100px", height: "100px", borderRadius: "100%" }}
            src={profile.picture.data.url}
          />
        </div>
      ) : (
        ""
      )}

       {profile ? (
         <div style={{ margin: "auto", width: "" }}>
           <h1>{profile.name}</h1>
           <p
             style={{ width: "100px", color: "red" }}
           >{`"${profile.accessToken}"`}</p>
           <img
             style={{ widht: "100px", height: "100px", borderRadius: "100%" }}
             src={profile.picture.data.url}
           />
         </div>
       ) : (
         ""
       )}
       {accounts?.data?.length && (
         <form action="" onSubmit={handleFormSubmit}>
           <select name="" id="" onChange={handleChange}>
             {accounts.data.map((data) => (
               <option value={data.id}>{data.name}</option>
             ))}
           </select>
           {selectedValue && <input type="submit" value="Next" />}
         </form>
       )}
    </>
  );
};

export default IndexPage;
