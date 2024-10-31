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

export { fetchCustomers, fetchTrainings };
