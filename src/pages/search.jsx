import React, { useState, useEffect } from "react";
import GlobeComponent from "../components/GlobeComponent";
import { HiOutlineLink } from "react-icons/hi";
import { IoLogoTwitter } from "react-icons/io5";

const Search = () => {
  const [typed, setTyped] = useState(" ");
  const [loading, setLoading] = useState(false);
  const [userslist, setUsersList] = useState([]);
  const [showusers, setShowusers] = useState(false);
  const [userfulldetail, setUserfulldetail] = useState([]);
  const [page, setPage] = useState(1);
  const[apilimit, setApilimit] = useState(false);
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/search/users?q=location:${typed}&sort=followers&order=desc&per_page=10&page=${page}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        const userList = responseData.items.filter(
          (user) => user.type === "User"
        );
        console.log(userList);
        setUsersList(userList);

        const userDetailsPromises = userList.map(async (user) => {
            const userDetailResponse = await fetch(
              `https://api.github.com/users/${user.login}`
            );
            const userDetails = await userDetailResponse.json();
            if (userDetails && userDetails.message && userDetails.documentation_url) {
              setApilimit(true);
              console.log("cheksjdk")
            }
          
            return userDetails;
          });
  
          const userDetailsResults = await Promise.all(userDetailsPromises);
          console.log(userDetailsResults);
          setUserfulldetail(userDetailsResults);
        
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (showusers) {
      fetchData();
      setShowusers(false);
    }
  }, [typed, showusers,page]);

  const handletyped = (event) => {
    setTyped(event.target.value);
  };
  const Handleshow = () => {
    setShowusers(true);
  };

  const showMorebtn = () =>{
    setPage(page + 1);
    setShowusers(true);
  }

  const prevPagebtn = () =>{
    setPage(page - 1);
    setShowusers(true);
  }

  

  return (
    <>
      <div className="flex relative justify-between text-white">
        <div className="relative w-1/2 overflow-scroll items-center mt-40 ml-7 p-2">
          <section className="relative justify-start gap-8 flex flex-col md:flex-row">
            <input
              onChange={handletyped}
              type="text"
              placeholder="Enter Location"
              style={{ color: "white" }}
              className="relative inputsearchbtn p-5"
            />
            <button onClick={Handleshow} className="get-started-button">
              show users
            </button>
          </section>
          <div>
            {loading && (
              <div>
                <div className="flex items-center relative space-x-2 mt-5">
                  <div className="animate-pulse rounded-full bg-gray-500 h-12 w-12"></div>
                  <div className="space-y-2">
                    <div className="animate-pulse rounded-md bg-gray-500 h-4 w-[200px]">
                      {" "}
                    </div>
                    <div className="animate-pulse rounded-md bg-gray-500 h-4 w-[170px]">
                      {" "}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {setApilimit? (<div className="relative text-white">You have exceeded the limit. Please try after some time</div>):(<div>{!loading && userslist.length > 0 && (
              <div className="relative mt-7">
                <ul>
                  {userfulldetail.map((user) => (
                    <>
                      <li key={user.id} className="github-user">
                        <div className="flex items-center mb-2 gap-3">
                          <img
                            src={user.avatar_url}
                            alt="/"
                            className="h-12 w-12 rounded-full"
                          />
                          <span>{user.name}</span>
                        </div>
                        <div>
                            <div className="mb-3">
                            {user.bio}
                            </div>

                            {user.company ? <div>Work: {user.company}</div>: ""}
                            <div>followers:{user.followers}{" "}Repositories:{user.public_repos}{" "}</div>
                        </div>
                        <div className="flex gap-4">
                            <span>
                            {user.blog? <a href = {user.blog}><HiOutlineLink /></a> : ""}
                            </span>
                            <span>{user.email ? <a href = {`mailto:${user.email}`}>email</a>: null}</span>{" "}
                            <span>{user.twitter_username ? <a href = {`https://twitter.com/${user.twitter_username}`}><IoLogoTwitter /></a> : ""}</span>
                        </div>
                      </li>
                    </>
                  ))}
                </ul>
                <section className="flex justify-between">
                  {page > 1 ? 
                  <button className="pagesbtn" onClick={prevPagebtn}>Prev Page</button> : ""
                  }
                  <button className="pagesbtn" onClick={showMorebtn}>Show More</button>
                </section>
              </div>
            )}</div>)}
            
          </div>
        </div>
        <div className="relative w-1/2">
          <div className="fixed">
            <GlobeComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
