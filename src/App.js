import React, { useEffect, useState } from "react";
import data from "./data/data.json";

function App() {
  const [collegelist, setCollegelist] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageno, setPageno] = useState(1);
  const [sortBy, setSortBy] = useState(""); // sorting by fees
  const [sortingorder, setSortingorder] = useState("asc"); // sorting by ascending order


  useEffect(() => {
    setCollegelist(data);
    }, []);

  useEffect(() => {
    if (sortBy) {
      const sortedlist = [...collegelist].sort((a,b) => {
        if (sortingorder === "asc") {
          if (a[sortBy] > b[sortBy]) {
            return 1;
          }
          if (a[sortBy] < b[sortBy]) {
            return -1;
          }
        } else {
          if (a[sortBy] < b[sortBy]) {
            return 1;
          }
          if (a[sortBy] > b[sortBy]) {
            return -1;
          }
        }
        return 0;
      });
      setCurrentPage(sortedlist);
    } else {
      setCurrentPage(collegelist);
    }
  }, [sortBy, collegelist]);

  useEffect(() => {
    if (searchName) {
      const filteredcollegelist = collegelist.filter(college => college.collegeName.toLowerCase().includes(searchName.toLowerCase()));
      setCurrentPage(filteredcollegelist);
    } else {
      setCurrentPage(collegelist);
    }
  }, [searchName, collegelist]);

  useEffect(() => {
    const startIndex = (pageno - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentPage(collegelist.slice(startIndex, endIndex));
  },[collegelist, itemsPerPage, pageno]);

  const handleSort = (sortkey) => {
    if (sortkey === sortBy) {
      setSortingorder(sortingorder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(sortkey);
      setSortingorder("asc");
    }
  };

  
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
      if (bottom) {
        setItemsPerPage(prevPage => prevPage + 10);
      }
  };

  return (

      <div className="m-2 w-full items-center">
        <div className="items-center flex flex-row">
          <input
            type="text"
            placeholder="Enter college name"
            className="p-2 m-4 ml-6 w-4/5 rounded-sm bg-white items-center border-blue-400 border-2"
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
          />
          <div className="sort-selection ml-6 flex flex-row mr-6">
          <label htmlFor="sort">Sort By:</label>
          <select
            name="sort"
            id="sort"
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="courseFee">Fees</option>
            <option value="CD_rank">CD Rank</option>
            <option value="user_rating">User Review</option>
          </select>
          <button onClick={() => setSortingorder(sortingorder === "asc" ? "desc" : "asc")}>
            {sortingorder === "asc" ? "⬆️" : "⬇️"}
          </button>
          </div>
        </div>
        <div className="p-5 h-screen overflow-auto">
        <table onScroll={handleScroll} className="w-full border-collapse border-2 border-gray-300">
        <thead>
          <tr>
            <th className="bg-teal-400 text-base font-bold text-white relative text-left pl-2 border-gray-300 border-2 w-1/14">CD Rank</th>
            <th className="bg-teal-400 text-base font-bold text-white relative text-left p-4 border-gray-300 border-2 w-5/14">Colleges</th>
            <th className="bg-teal-400 text-base font-bold text-white relative text-left p-4 border-gray-300 border-2 w-2/14">Course Fees</th>
            <th className="bg-teal-400 text-base font-bold text-white relative text-left p-4 border-gray-300 border-2 w-2/14"> Placement</th>
            <th className="bg-teal-400 text-base font-bold text-white relative text-left p-4 border-gray-300 border-2 w-2/14">User Reviews</th>
            <th className="bg-teal-400 text-base font-bold text-white relative text-left p-4 border-gray-300 border-2 w-2/14">Ranking</th>
          </tr>
        </thead>
        <tbody>
          {currentPage.map(college => (
            <tr key={college.id} className={`${college.isFeatured ? 'bg-orange-200': ''} `}>
              <td className="font-bold text-blue-500 p-4 border-gray-300 border-2">
                #{college.CD_rank}
              </td>
              <td className="p-4 border-gray-300 border-2">
                {college.isFeatured && (
                  
                  <div className="relative -mt-4 mb-6">
                    <div className="top-[-4px] left-16 bg-red-500 pl-6 absolute text-white rounded-b-2xl  ml-15/100 z-[2px] w-[10vw]">Featured</div>
                  </div>
                
                )}
                <span className="inline-flex items-center gap-4">
                  <img className="w-10 h-max-10" src={college.image} alt="College-logo" />
                  <div><p className="text-xl font-semibold text-blue-400">{college.collegeName}</p>
                  <p className="text-sm font-medium text-gray-500">{college.collegelocation}</p>
                  <p className="font-semibold text-sm text-orange-500 ">{college.course}</p>
                  <p className="font-medium text-sm text-gray-600">JEE-Advanced 2023 Cutoff: {college.cutoff}</p>
                  </div>
                </span>
                <div className="flex justify-between font-medium text-sm mt-4">
                  <p className="text-orange-600"> Apply Now</p>
                  <p className="text-green-600"> Download Brochure</p>
                  <p>Add to Compare</p>
                </div>

                </td>
                <td className="p-3 text-gray-600 text-sm font-semibold leading-loose border-gray-300 border-2"> <div>
                  <p className="text-green-600 font-bold text-base">Rs.{college.courseFee}</p>
                  <p>BE/BTech</p>
                  <p>- 1st Year Fees</p>
                  <p className="text-orange-600 text-base">Compare Fees</p>
                  </div></td>
                <td className="p-3 text-gray-600 text-sm font-semibold leading-loose border-gray-300 border-2"><div>
                <p className="text-green-600 font-bold text-base">Rs.{college.avgPackage}</p>
                <p>Average Package</p>
                <p className="text-green-600 font-bold text-base">Rs.{college.highestPackage}</p>
                <p>Highest Package</p>
                <p className="text-orange-600 text-base">Compare Placement</p>
                </div></td>
                <td className="p-3 text-sm text-gray-600 font-semibold border-gray-300 border-2">
                  <div>
                    <p className="text-lg ">{college.user_rating}/10</p>
                    <p>Based on {college.users} User Reviews</p>
                    <p className="text-amber-700">Best in {college.bestin}</p>
                  </div></td>
                <td className="text-gray-600 font-semibold border-gray-300 border-2">#{college.ranking}/455 in India</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
  );
};

export default App; 