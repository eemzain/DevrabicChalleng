import React, { useState, useEffect } from 'react';
import axios from 'axios';
import loading from './assest/images/Loading.gif';
import Pagination from './Pagination';
import ProductTable from './prodect/ProductTable';
import SearchIcon from './assest/images/search.png';

const ProductsPage = () => {
  const [products, setproducts] = useState([]);
  const [filtterItems, setfiltterItems] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [searchValue, setSearchValue] = useState('');
  const [isDisplaySearch, setDisplaySearch] = useState('false');
  // const [currentPage, setCurrentPage] = useState(1);
  const [flageLoadind, setflageLoadind] = useState('false');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    console.log("efff");
    fetchproducts();
  }, [pageSize,currentPage]);
  
  const fetchproducts = async () => {
    try {
      setflageLoadind('false')
      
      const response = await axios.get(
        `https://dummyjson.com/products/?limit=${pageSize}&skip=${((currentPage+1) - 1) * pageSize}`
      );
      setflageLoadind('true');
      setproducts(response.data.products);
      setTotalPages(response.data["total"]);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handlePageSizeChange = async (event) => {
    setPageSize(parseInt(event.target.value));
    const response = await axios.get(
      `https://dummyjson.com/products/?limit=${parseInt(event.target.value)}&skip=${((currentPage+1) - 1) * pageSize}`
    );
    setfiltterItems(response.data.products)
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
    const filteredproducts = products.filter((prodect) =>
    prodect.title.toLowerCase().includes(event.target.value.toLowerCase()) || prodect.brand.toLowerCase().includes(event.target.value.toLowerCase())|| prodect.category.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setfiltterItems(filteredproducts)
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
  const currentPageData = products.slice(startIndex, endIndex);
  return (
    <div>
      <div>
        <label htmlFor="pageSize">Page Size: </label>
        <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <div >
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
      
      {products.length === 0 ? (
        <label>No products found.</label>
      ) :
      flageLoadind==='false'? (
        <img src={loading} alt="Loading..." />
      ) : 
      filtterItems.length === 0 ?(
        <ProductTable data={products} />
      ):(<ProductTable data={filtterItems} />)}
      <div>
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      </div>
    </div>
  );
};

export default ProductsPage;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ProductsPage = () => {
//   const [pageSize, setPageSize] = useState(5);
//   const [searchValue, setSearchValue] = useState('');
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchProducts();
//   }, [pageSize, currentPage]);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(
//         `https://dummyjson.com/products/?limit=${pageSize}&skip=${(currentPage - 1) * pageSize}`
//       );
//       setProducts(response.data);
//       setTotalPages(Math.ceil(response.headers['x-total-count'] / pageSize));
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const handlePageSizeChange = (event) => {
//     setPageSize(Number(event.target.value));
//     setCurrentPage(1);
//   };

//   const handleSearchIconClick = () => {
//     // Implement search filtering on the client-side
//     const filteredProducts = products.filter((product) =>
//       Object.values(product).some((value) =>
//         String(value).includes(searchValue)
//       )
//     );
//     setProducts(filteredProducts);
//   };

//   const handlePaginationClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div>
//       <h1>Products</h1>
//       <div>
//         Page Size:
//         <select value={pageSize} onChange={handlePageSizeChange}>
//           <option value={5}>5</option>
//           <option value={10}>10</option>
//           <option value={20}>20</option>
//           <option value={50}>50</option>
//         </select>
//       </div>
//       <div>
//         <button onClick={handleSearchIconClick}>Search icon</button>
//         <input
//           type="text"
//           value={searchValue}
//           onChange={(e) => setSearchValue(e.target.value)}
//         />
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Price</th>
//             {/* Include additional columns as needed */}
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id}>
//               <td>{product.id}</td>
//               <td>{product.name}</td>
//               <td>{product.price}</td>
//               {/* Render additional fields */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div>
//         {Array.from({ length: totalPages }, (_, index) => index + 1).map(
//           (page) => (
//             <button
//               key={page}
//               onClick={() => handlePaginationClick(page)}
//               disabled={page === currentPage}
//             >
//               {page}
//             </button>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;