import React, { useState, useEffect } from 'react';
import axios from 'axios';
import loading from './assest/images/Loading.gif';
import Pagination from './Pagination';
import UserTable from './user/UserTable';
import SearchIcon from './assest/images/search.png';
const UsersPage = () => {

  const [users, setUsers] = useState([]);
  const [filtterItems, setfiltterItems] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [searchValue, setSearchValue] = useState('');
  // const [currentPage, setCurrentPage] = useState(1);
  const [flageLoadind, setflageLoadind] = useState('false');
  const [isDisplaySearch, setDisplaySearch] = useState('false');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    console.log("useEffect",currentPage)
    fetchUsers();
  }, [pageSize,currentPage]);
  
  const fetchUsers = async () => {
    try {
      setflageLoadind('false')
      const response = await axios.get(
        `https://dummyjson.com/users/?limit=${pageSize}&skip=${((currentPage+1) - 1) * pageSize}`
      );
      setflageLoadind('true');
      setUsers(response.data.users);
      setTotalPages(response.data["total"]);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handlePageSizeChange = async (event) => {
    setPageSize(parseInt(event.target.value));
    const response = await axios.get(
      `https://dummyjson.com/users/?limit=${parseInt(event.target.value)}&skip=${((currentPage+1) - 1) * pageSize}`
    );
    setfiltterItems(response.data.users)
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
    const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(event.target.value.toLowerCase()) || user.id === parseInt(event.target.value)
    );
    setfiltterItems(filteredUsers)
  };
    const handleSearchIconClick = () => {
      if(isDisplaySearch==="true"){
        setDisplaySearch("false")
      }
      else{
        setDisplaySearch("true")
      }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // Pagination settings
  const itemsPerPage = pageSize;
  const pageCount = Math.ceil(totalPages / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = users.slice(startIndex, endIndex);
  return (
    <div className='space'>
      <div>
        <label htmlFor="pageSize">Page Size: </label>
        <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <div>
        <button onClick={handleSearchIconClick}>
        <img src={SearchIcon} alt="Search Icon" style={{
          width: '15pt',
          height: '15pt',
          alignItems:'center',
          display:"inline-block"
        }} />
        </button>
        {isDisplaySearch==="true" ? (<input
          type="text"
          value={searchValue}
          onChange={handleSearchInputChange}
          placeholder="Search"
        />):(
          <div></div>
        )}
        
      </div>
      
      {users.length === 0 ? (
        <label>No users found.</label>
      ) :
      flageLoadind==='false'? (
        <img src={loading} alt="Loading..." />
      ) : 
      filtterItems.length === 0 ?(
        <UserTable data={users} />
      ):(<UserTable data={filtterItems} />)}
      <div>
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      </div>
      {/* <div>
        {Array.from({length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePaginationClick(page)}
              disabled={page === currentPage}
            >
              {page}
            </button>
          )
        )}
      </div> */}
    </div>
  );

};

export default UsersPage;












