import React from 'react';

const UserTable = ({ data }) => {
  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th >
              #
            </th>
            <th >
              image
            </th>
            <th >
              Name
            </th>
            <th >
              Gender
            </th>
            <th  >
              BirthDate
            </th>
            <th  >
              Email
            </th>
            <th  >
              Phone
            </th>
            <th  >
              Address
            </th>
            {/* Add more table headers here */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td className="p-4">
                <img src={item.image} alt="Image"
                />
              </td>
              <td>{item.firstName}</td>
              <td>{item.gender}</td>
              <td>{item.birthDate}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.address.address}</td>
              {/* Add more table cells here */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default UserTable;