const fetchCustomers = async () => {
  const response = await fetch(
    "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers"
  );
  const data = await response.json();
  return data._embedded.customers;
};

const fetchTrainings = async () => {
  const response = await fetch(
    "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings"
  );
  const data = await response.json();
  return data;
};

const addCustomer = async (customer) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  };
  const response = await fetch(
    "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers",
    options
  );
  const data = await response.json();
  return data;
};

const updateCustomer = async ({ url, customer }) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const deleteCustomer = async (url) => {
  const options = {
    method: "DELETE",
  };

  if (window.confirm("Do you really want to delete customer?")) {
    const response = await fetch(url, options);
  }
};

export {
  fetchCustomers,
  fetchTrainings,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
