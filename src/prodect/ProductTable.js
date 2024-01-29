import React from 'react';

const ProductTable = ({data }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th   >
            #
          </th>
          <th >
            image
            </th>
          <th   >
          Title
          </th>
          
          <th   >
          Price
          </th>
          <th   >
          Rating
          </th>
          <th   >
          Brand
          </th>
          <th   >
          Category
          </th>
          <th   >
          Stock
          </th>
          {/* Add more table headers here */}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item) => (
          <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <img src={item.images[0]} alt="Image"
                />
              </td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.rating}</td>
              <td>{item.brand}</td>
              <td>{item.category}</td>
              <td>{item.stock}</td>
            {/* Add more table cells here */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;