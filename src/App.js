/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { LoginSocialFacebook } from "reactjs-social-login";
// import { FacebookLoginButton } from "react-social-login-buttons";
import axios from "axios";
import { createButton } from "react-social-login-buttons";

function App() {
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

  const config = {
    text: " Continue with Facebook",
    icon: "facebook",
    iconFormat: (name) => `fa fa-${name}`,
    style: { background: "#3b5998", width: "300px" },
    activeStyle: { background: "#293e69" }
  };
  const MyFacebookLoginButton = createButton(config);


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
          <MyFacebookLoginButton></MyFacebookLoginButton>
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
    </div>
  );
}

export default App;
