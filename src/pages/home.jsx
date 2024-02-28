import React, { useState, useEffect } from "react";
import "../App.css";
import { TypeAnimation } from "react-type-animation";
import { IoSparklesSharp } from "react-icons/io5";
import { GoPeople, GoGitPullRequest, GoRepo, GoStar } from "react-icons/go";
import { Link } from "react-router-dom";
import GlobeComponent from "../components/GlobeComponent";
import { HiOutlineLink } from "react-icons/hi";
import { IoLogoTwitter } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";

const Home = () => {
  const [redirectPage, setRedirectPage] = useState(false);
  const [typed, setTyped] = useState(" ");
  const [loading, setLoading] = useState(false);
  const [userslist, setUsersList] = useState([]);
  const [showusers, setShowusers] = useState(false);
  const [userfulldetail, setUserfulldetail] = useState([]);
  const [page, setPage] = useState(1);

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
  }, [typed, showusers, page]);

  const handletyped = (event) => {
    setTyped(event.target.value);
  };
  const Handleshow = () => {
    setShowusers(true);
  };

  const showMorebtn = () => {
    setPage(page + 1);
    setShowusers(true);
  };

  const prevPagebtn = () => {
    setPage(page - 1);
    setShowusers(true);
  };

  const redirectpage = () => {
    setRedirectPage(true);
  };

  const redirectprevpage = () => {
    setRedirectPage(false);
  };
  return (
    <div className="flex">
      {redirectPage ? (
        <div className="swiperightanimation  w-screen sm:w-1/2 m-20 mt-8">
          <arrow className="cursor-pointer" onClick={redirectprevpage}>
            <IoIosArrowBack />
          </arrow>
          <div className="relative overflow-scroll items-center mt-40 sm:ml-7 ml-0 p-2 w-full">
            <section className="relative flex justify-start gap-8 flex-col sm:flex-row">
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
                  <div className="flex items-center space-x-2">
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
              {!loading && userslist.length > 0 && (
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
                            <div className="mb-3">{user.bio}</div>

                            {user.company ? (
                              <div>Work: {user.company}</div>
                            ) : (
                              ""
                            )}
                            <div>
                              followers:{user.followers} Repositories:
                              {user.public_repos}{" "}
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <span>
                              {user.blog ? (
                                <a href={user.blog}>
                                  <HiOutlineLink />
                                </a>
                              ) : (
                                ""
                              )}
                            </span>
                            <span>
                              {user.email ? (
                                <a href={`mailto:${user.email}`}>email</a>
                              ) : null}
                            </span>{" "}
                            <span>
                              {user.twitter_username ? (
                                <a
                                  href={`https://twitter.com/${user.twitter_username}`}
                                >
                                  <IoLogoTwitter />
                                </a>
                              ) : (
                                ""
                              )}
                            </span>
                          </div>
                        </li>
                      </>
                    ))}
                  </ul>
                  <section className="flex justify-between relative">
                    {page > 1 ? (
                      <button className="pagesbtn" onClick={prevPagebtn}>
                        Prev Page
                      </button>
                    ) : (
                      ""
                    )}
                    <button className="pagesbtn" onClick={showMorebtn}>
                      Show More
                    </button>
                  </section>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="swipeleftanimation w-1/2 m-20 sm:mt-40 ">
          <div className="HomeContainer">
            <h1 className="text-gray-100 leading-[1.1] max-w-[53rem ] text-6xl md:text-7xl">
              Find Top Developers in{" "}
              <div>
                <TypeAnimation
                  sequence={[
                    "New Delhi",
                    3000,
                    "London",
                    3000,
                    "Germany",
                    3000,
                  ]}
                  cursor={true}
                  repeat={Infinity}
                  className="typinganimation"
                />
              </div>
            </h1>
            <div className="relative pb-4 select-none text-center font-Hublot text-gray-300 text-xl max-w-[33rem] leading-20 pt-4 fade-in2">
              Start by entering the location you want to rank software
              developers from. Ranks are based on{" "}
              <span className="text-white">
                <GoPeople className="inline align-text-bottom" /> followers
              </span>
              ,{" "}
              <span className="text-white">
                <GoStar className="inline align-text-bottom" /> stars
              </span>
              ,{" "}
              <span className="text-white">
                <GoGitPullRequest className="inline align-text-bottom" />{" "}
                commits
              </span>{" "}
              and{" "}
              <span className="text-white">
                <GoRepo className="inline align-text-bottom" /> repos.
              </span>
            </div>

            <Link
              onClick={redirectpage}
              className="get-started-button font-mono select-none fade-in3"
            >
              <IoSparklesSharp className="inline align-text-top" /> Get Started
            </Link>
            {/* <button onClick={redirectpage}>Redirect</button> */}
          </div>
        </div>
      )}

      <div>
        <div className="w-1/2 fixed">
          <GlobeComponent/>
        </div>
      </div>
    </div>
  );
};

export default Home;
