/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import axios from "axios";

function App() {
  const [profile, setProfile] = useState(null);
  const [accounts, setAccounts] = useState([])

  console.log("accounts",accounts);
  const getAccounts = async (token) => {
    try {
      const {data} = await axios.get(  `https://graph.facebook.com/me/accounts?access_token=${token}`);
      setAccounts(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!profile ? (
        <LoginSocialFacebook
          // scope="name user_posts, email, read_insights, pages_manage_instant_articles, pages_show_list, read_page_mailboxes, ads_management, business_management, pages_messaging, instagram_basic, instagram_manage_comments, instagram_content_publish, publish_to_groups, instagram_manage_messages, page_events, pages_read_engagement, pages_manage_metadata"
          // redirect_uri="http://localhost:3000/account/login"
          // appId="773303087736335"
          appId="773303087736335"
          onResolve={(response) => {
            console.log(response);
            setProfile(response.data);
            getAccounts(response.data.accessToken);
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

      {accounts.length && (
        <form action="">
          <select name="" id="">
            {accounts.data.map(({ name }) => (
              <option value={name}>{name}</option>
            ))}
          </select>
        </form>
      )}
    </div>
  );
}

export default App;
