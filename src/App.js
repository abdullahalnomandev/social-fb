/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";

function App() {
  const [profile, setProfile] = useState(null);

  return (
    <div>
      {!profile ? (
        <LoginSocialFacebook
          // scope="name user_posts, email, read_insights, pages_manage_instant_articles, pages_show_list, read_page_mailboxes, ads_management, business_management, pages_messaging, instagram_basic, instagram_manage_comments, instagram_content_publish, publish_to_groups, instagram_manage_messages, page_events, pages_read_engagement, pages_manage_metadata"
          // redirect_uri="http://localhost:3000/account/login"
          appId="773303087736335"
          onResolve={(response) => {
            console.log(response);
            setProfile(response.data);
          }}
          onReject={(error) => {
            console.log(error);
          }}
        >
          <FacebookLoginButton />
        </LoginSocialFacebook>
      ) : (
        ""
      )}

      {profile ? (
        <div style={{ margin: "auto", width: "400px" }}>
          <h1>{profile.name}</h1>
          <img
            style={{ widht: "100px", height: "100px", borderRadius: "100%" }}
            src={profile.picture.data.url}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
