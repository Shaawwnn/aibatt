import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Convo from "./Convo";
import SearchIcon from "@mui/icons-material/Search";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import SearchResult from "./SearchResult";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import CloseIcon from "@mui/icons-material/Close";

const Search = props => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots

        setUser(doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const handleKey = e => {
  //   if (e.code === "Enter" || e.keyCode == 13) {
  //     handleSearch();
  //   }

  //   //e.code === "Enter" && handleSearch();
  // };

  const handleSelect = async () => {
    //check if past convo exists
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const response = await getDoc(doc(db, "chats", combinedId));

      if (!response.exists()) {
        //create chats in collection
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });
        //create user chat

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }

    setUsername("");
    setUser(null);
  };

  //get realtime conversations
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), doc => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleChoose = u => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <SearchContainer result={username}>
      <div className="search-panel">
        <span onClick={props.openSearch}>
          <SearchIcon />
        </span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Find User"
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
          <button style={{ display: "none" }}></button>
        </form>
        {props.width < 577 && (
          <i className="close-icon" onClick={props.closeSearch}>
            <CloseIcon />
          </i>
        )}
      </div>
      {user ? (
        <div className="search-results" onClick={() => handleSelect()}>
          <SearchResult img={user.photoURL} name={user.displayName} />
        </div>
      ) : (
        <div className="search-results">
          <p>User not found.</p>
        </div>
      )}

      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map(chat => (
          <div key={chat[0]} onClick={() => handleChoose(chat[1].userInfo)}>
            <Convo
              name={chat[1].userInfo.displayName}
              img={chat[1].userInfo.photoURL}
              lastMsg={chat[1].lastMessage?.text}
            />
          </div>
        ))}
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = styled.div`
  overflow-y: auto;
  height: 100%;
  overflow: scroll;
  .search-panel {
    display: flex;
    width: 100%;
    padding: 5px;
    align-items: center;
    padding-left: 20px;
    position: relative;

    input {
      margin-left: 10px;
      @media screen and (max-width: 577px) {
        max-width: 110px;
      }
    }

    span {
      padding: 10px 0 0 0;
      color: #929292;
    }

    .close-icon {
      right: 20px;
      top: 12px;
      color: #aaaaaa;
    }
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    background-color: transparent;
    padding: 10px;
    color: #ddddf7;
  }

  .convos {
    max-height: 900px;
    width: 100%;
  }

  .search-results {
    border-bottom: 2px solid orange;
    display: ${props => !props.result && "none"};
  }
`;
